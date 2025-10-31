import { motion } from 'framer-motion';
import { Sparkles, Zap, Shield, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import GlassCard from '../components/GlassCard';
import MouseFollower from '../components/MouseFollower';

export default function Home() {
  const [authUrl, setAuthUrl] = useState('');

  useEffect(() => {
    getAuthUrl();
  }, []);

  const getAuthUrl = async () => {
    try {
      const response = await axios.get('/auth/discord/url');
      setAuthUrl(response.data.url);
    } catch (error) {
      console.error('Failed to get auth URL:', error);
    }
  };

  const handleLogin = () => {
    if (authUrl) {
      window.location.href = authUrl;
    }
  };

  const features = [
    {
      icon: Sparkles,
      title: 'Custom Status',
      description: 'Tạo trạng thái Discord độc đáo với tên và hình ảnh riêng'
    },
    {
      icon: Clock,
      title: 'Tự Động Hoá',
      description: 'Trạng thái được duy trì ngay cả khi bạn offline'
    },
    {
      icon: Zap,
      title: 'Cực Nhanh',
      description: 'Cập nhật trạng thái ngay lập tức, mọi lúc mọi nơi'
    },
    {
      icon: Shield,
      title: 'An Toàn',
      description: 'Bảo mật tuyệt đối với OAuth Discord chính thức'
    }
  ];

  return (
    <div className="min-h-screen animated-gradient overflow-hidden relative">
      <MouseFollower />
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary-400 to-primary-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-500/50">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-primary-200 to-white bg-clip-text text-transparent">
            Discord Custom Status
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Tạo và duy trì trạng thái Discord độc đáo của bạn với giao diện liquid glass tuyệt đẹp
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="btn-primary text-lg px-8 py-4"
          >
            <span className="flex items-center gap-2">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Đăng Nhập Với Discord
            </span>
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
            >
              <GlassCard hover>
                <div className="p-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-primary-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-primary-500/50">
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <GlassCard>
            <div className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Giao Diện Liquid Glass</h2>
              <div className="aspect-video bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl flex items-center justify-center border border-white/10">
                <div className="text-center">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary-400 animate-pulse-slow" />
                  <p className="text-gray-400">Đăng nhập để trải nghiệm giao diện tuyệt đẹp</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  );
}
