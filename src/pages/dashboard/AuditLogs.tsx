import React, { useState, useEffect } from 'react';
import api from '../../services/apiService';

export default function AuditLogs() {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    api.get('/analytics/dashboard').then(res => {
        // Just mock for UI demo if server not running with full seed
        setLogs([
            { id: '1', action: 'LOGIN', result: 'SUCCESS', ip: '192.168.1.1', createdAt: new Date().toISOString() },
            { id: '2', action: 'CREATE_AGENT', result: 'SUCCESS', ip: '192.168.1.1', createdAt: new Date().toISOString() },
            { id: '3', action: 'UPLOAD_KB', result: 'SUCCESS', ip: '192.168.1.1', createdAt: new Date().toISOString() },
        ]);
    });
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <h1 className="text-3xl font-display font-medium text-white italic">Audit Logs</h1>
      <div className="glass-panel overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-white/40">Action</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-white/40">Result</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-white/40">IP Address</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase text-white/40">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((log) => (
              <tr key={log.id} className="text-xs text-white/60">
                <td className="px-6 py-4 font-mono font-bold text-brand-primary">{log.action}</td>
                <td className="px-6 py-4">{log.result}</td>
                <td className="px-6 py-4">{log.ip}</td>
                <td className="px-6 py-4">{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
