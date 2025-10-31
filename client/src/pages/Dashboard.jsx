import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Image, Clock, Power, Sparkles, User } from 'lucide-react';
import axios from 'axios';
import GlassCard from '../components/GlassCard';
import StatusForm from '../components/StatusForm';
import WorkerSetup from '../components/WorkerSetup';
import MouseFollower from '../components/MouseFollower';
import { format } from 'date-fns';

export default function Dashboard({ user, setUser }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatus();
  }, []);

  const fetchStatus = async () => {
    try {
      const response = await axios.get('/api/status');
      setStatus(response.data);
    } catch (error) {
      console.error('Failed to fetch status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      setUser(null);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleToggle = async () => {
    try {
      const response = await axios.post('/api/status/toggle');
      setStatus(response.data);
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const avatarUrl = user.avatar
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`
    : '/default-avatar.png';

  return (
    <div className="min-h-screen animated-gradient overflow-hidden relative">
      <MouseFollower />
      
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <GlassCard>
            <div className="p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={avatarUrl}
                  alt={user.username}
                  className="w-16 h-16 rounded-full border-4 border-primary-500/50 shadow-lg shadow-primary-500/50"
                />
                <div>
                  <h1 className="text-2xl font-bold flex items-center gap-2">
                    <User className="w-6 h-6 text-primary-400" />
                    {user.username}
                  </h1>
                  <p className="text-gray-400">Discord ID: {user.discordId}</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                Đăng Xuất
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Status Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <GlassCard>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary-400" />
                  Tạo Custom Status
                </h2>
                <StatusForm status={status} onUpdate={setStatus} />
              </div>
            </GlassCard>
          </motion.div>

          {/* Status Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Status Preview */}
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Power className={`w-5 h-5 ${status?.enabled ? 'text-green-400' : 'text-gray-400'}`} />
                  Trạng Thái
                </h3>
                
                <AnimatePresence mode="wait">
                  {status?.enabled ? (
                    <motion.div
                      key="active"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="space-y-4"
                    >
                      {status.imageUrl && (
                        <div className="aspect-square bg-slate-800/50 rounded-xl overflow-hidden border border-white/10">
                          <img
                            src={status.imageUrl}
                            alt="Status"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      
                      <div className="space-y-2">
                        {status.name && (
                          <div className="flex items-start gap-2">
                            <Sparkles className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-400">Tên trạng thái</p>
                              <p className="font-semibold">{status.name}</p>
                            </div>
                          </div>
                        )}
                        
                        {status.emoji && (
                          <div className="flex items-start gap-2">
                            <span className="text-2xl">{status.emoji}</span>
                            <div>
                              <p className="text-sm text-gray-400">Emoji</p>
                            </div>
                          </div>
                        )}
                        
                        {status.startTime && (
                          <div className="flex items-start gap-2">
                            <Clock className="w-5 h-5 text-primary-400 mt-1 flex-shrink-0" />
                            <div>
                              <p className="text-sm text-gray-400">Bắt đầu từ</p>
                              <p className="font-semibold">
                                {format(new Date(status.startTime), 'dd/MM/yyyy HH:mm')}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleToggle}
                        className="w-full px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl font-semibold shadow-lg shadow-red-500/50 transition-all duration-300"
                      >
                        Tắt Status
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="inactive"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-8"
                    >
                      <div className="w-16 h-16 mx-auto mb-4 bg-slate-800/50 rounded-full flex items-center justify-center">
                        <Power className="w-8 h-8 text-gray-600" />
                      </div>
                      <p className="text-gray-400 mb-4">Status chưa được bật</p>
                      {status?.name && (
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleToggle}
                          className="w-full btn-primary"
                        >
                          Bật Status
                        </motion.button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>

            {/* Worker Setup */}
            <WorkerSetup user={user} />

            {/* Info Card */}
            <GlassCard>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Thông Tin</h3>
                <div className="space-y-3 text-sm text-gray-300">
                  <p className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    Status sẽ được duy trì ngay cả khi bạn offline
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    Hệ thống tự động cập nhật mỗi 5 phút
                  </p>
                  <p className="flex items-start gap-2">
                    <span className="text-primary-400">•</span>
                    Hình ảnh được lưu trữ an toàn trên Cloudinary
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
