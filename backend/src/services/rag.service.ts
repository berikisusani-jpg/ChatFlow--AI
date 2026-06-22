import { GoogleGenerativeAI } from "@google/genai";
import { prisma } from "../config/db";
import { config } from "../config";
import pdf from 'pdf-parse';
import mammoth from 'mammoth';
import { parse } from 'csv-parse/sync';

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

export const extractText = async (fileBuffer: Buffer, fileType: string) => {
    if (fileType === 'application/pdf') {
        const data = await pdf(fileBuffer);
        return data.text;
    }
    if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        const data = await mammoth.extractRawText({ buffer: fileBuffer });
        return data.value;
    }
    if (fileType === 'text/csv') {
        const records = parse(fileBuffer.toString());
        return records.map((r: any) => r.join(' ')).join('\n');
    }
    return fileBuffer.toString();
};

export const createEmbeddings = async (text: string) => {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
};

export const chunkText = (text: string, size: number = 1000, overlap: number = 200) => {
    const chunks = [];
    let start = 0;
    while (start < text.length) {
        chunks.push(text.slice(start, start + size));
        start += size - overlap;
    }
    return chunks;
};

export const processDocument = async (kbId: string, content: string) => {
    const chunks = chunkText(content);

    for (const chunk of chunks) {
        const embedding = await createEmbeddings(chunk);

        await prisma.$executeRaw`
            INSERT INTO "DocumentChunk" (id, content, "knowledgeBaseId", embedding)
            VALUES (${Math.random().toString(36).substring(7)}, ${chunk}, ${kbId}, ${embedding}::vector)
        `;
    }
};

export const searchKnowledge = async (agentId: string, query: string) => {
    const queryEmbedding = await createEmbeddings(query);

    const results: any[] = await prisma.$queryRaw`
        SELECT content, (embedding <=> ${queryEmbedding}::vector) as distance
        FROM "DocumentChunk"
        JOIN "KnowledgeBase" ON "DocumentChunk"."knowledgeBaseId" = "KnowledgeBase".id
        WHERE "KnowledgeBase"."agentId" = ${agentId}
        ORDER BY distance ASC
        LIMIT 5
    `;

    return results.map(r => r.content).join('\n\n');
};
