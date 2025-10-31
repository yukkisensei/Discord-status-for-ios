import { motion } from 'framer-motion';
import { Loader } from 'lucide-react';

export default function LoadingScreen() {
  return (
    <div className="min-h-screen animated-gradient flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="inline-block mb-4"
        >
          <Loader className="w-16 h-16 text-primary-400" />
        </motion.div>
        <h2 className="text-2xl font-bold text-white">Đang tải...</h2>
      </motion.div>
    </div>
  );
}
