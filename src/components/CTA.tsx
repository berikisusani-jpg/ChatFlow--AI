import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-48 bg-bg-dark">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-5xl md:text-7xl font-display font-medium tracking-tight text-white mb-10 leading-tight">
            Stop replying to repetitive <br />
            <span className="text-white/30">customer messages manually.</span>
          </h2>

          <div className="flex justify-center pt-8">
            <Link
              to="/dashboard"
              className="px-10 py-5 rounded-2xl bg-white text-bg-dark font-bold text-lg hover:scale-[1.05] active:scale-95 transition-all shadow-huge"
            >
              Watch AI Reply Live
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
