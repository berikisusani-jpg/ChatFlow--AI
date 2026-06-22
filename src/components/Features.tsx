import { motion } from 'framer-motion';
import { MessageSquare, Database, Users } from 'lucide-react';

const FEATURES = [
  {
    icon: <MessageSquare className="w-6 h-6 text-brand-primary" />,
    title: "AI Auto Replies",
    description: "Instantly answer common customer questions without picking up your phone."
  },
  {
    icon: <Database className="w-6 h-6 text-brand-secondary" />,
    title: "FAQ Training",
    description: "Teach the AI about your business using simple FAQs. The more it knows, the better it helps."
  },
  {
    icon: <Users className="w-6 h-6 text-brand-primary" />,
    title: "Human Handoff",
    description: "Take over conversations anytime. The AI knows when to step back and let you talk."
  }
];

export default function Features() {
  return (
    <section className="py-32 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-3xl border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-10 group-hover:bg-white/10 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-white/40 leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
