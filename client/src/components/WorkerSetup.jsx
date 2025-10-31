import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Power, Loader, AlertCircle, CheckCircle, RefreshCw, Copy, Check } from 'lucide-react';
import axios from 'axios';
import GlassCard from './GlassCard';

export default function WorkerSetup({ user }) {
  const [workerStatus, setWorkerStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenInput, setTokenInput] = useState('');
  const [settingUp, setSettingUp] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchWorkerStatus();
    const interval = setInterval(fetchWorkerStatus, 10000); // Check mỗi 10s
    return () => clearInterval(interval);
  }, []);

  const fetchWorkerStatus = async () => {
    try {
      const response = await axios.get('/api/worker/status');
      setWorkerStatus(response.data);
    } catch (error) {
      console.error('Failed to fetch worker status:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupWorker = async () => {
    if (!tokenInput.trim()) return;

    setSettingUp(true);
    try {
      await axios.post('/api/worker/setup', { userToken: tokenInput });
      setTokenInput('');
      await fetchWorkerStatus();
      alert('✅ Worker đã được kích hoạt! Discord status sẽ tự động cập nhật.');
    } catch (error) {
      console.error('Setup failed:', error);
      alert('❌ Setup thất bại. Vui lòng kiểm tra lại token.');
    } finally {
      setSettingUp(false);
    }
  };

  const stopWorker = async () => {
    if (!confirm('Bạn có chắc muốn tắt worker?')) return;

    try {
      await axios.post('/api/worker/stop');
      await fetchWorkerStatus();
    } catch (error) {
      console.error('Stop failed:', error);
      alert('❌ Không thể tắt worker');
    }
  };

  const restartWorker = async () => {
    try {
      await axios.post('/api/worker/restart');
      await fetchWorkerStatus();
      alert('✅ Worker đã restart!');
    } catch (error) {
      console.error('Restart failed:', error);
      alert('❌ Restart thất bại');
    }
  };

  const tokenGuideCode = `window.webpackChunkdiscord_app.push([
  [Math.random()],
  {},
  req => {
    for (const m of Object.keys(req.c)
      .map(x => req.c[x].exports)
      .filter(x => x)) {
      if (m.default?.getToken) {
        return m.default.getToken();
      }
    }
  }
]);`;

  const copyCode = () => {
    navigator.clipboard.writeText(tokenGuideCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <GlassCard>
        <div className="p-6 text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto text-primary-400" />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Power className="w-6 h-6 text-primary-400" />
            24/7 Worker
          </h3>
          
          <AnimatePresence mode="wait">
            {workerStatus?.workerRunning ? (
              <motion.div
                key="running"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-400 rounded-full"
              >
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Running</span>
              </motion.div>
            ) : workerStatus?.workerEnabled ? (
              <motion.div
                key="starting"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full"
              >
                <Loader className="w-4 h-4 animate-spin" />
                <span className="text-sm font-semibold">Starting...</span>
              </motion.div>
            ) : (
              <motion.div
                key="offline"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-2 px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full"
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full" />
                <span className="text-sm font-semibold">Offline</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Worker Error */}
        {workerStatus?.workerError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-red-300 font-semibold">Worker Error</p>
              <p className="text-sm text-red-200 mt-1">{workerStatus.workerError}</p>
            </div>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {workerStatus?.workerEnabled ? (
            <motion.div
              key="active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Status Info */}
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
                <div className="flex items-center gap-2 text-green-400 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold">Worker Active</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">
                  Discord status được tự động cập nhật 24/7
                </p>
                {workerStatus.lastStatusUpdate && (
                  <p className="text-xs text-gray-400">
                    Last update: {new Date(workerStatus.lastStatusUpdate).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={restartWorker}
                  className="flex-1 btn-secondary flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Restart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={stopWorker}
                  className="flex-1 px-4 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/20 rounded-xl font-semibold transition-all duration-300"
                >
                  Stop Worker
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="inactive"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {/* Warning */}
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-yellow-300 font-semibold mb-1">⚠️ Lưu Ý Quan Trọng</p>
                    <p className="text-yellow-200/80">
                      Tính năng này sử dụng Discord user token và có thể vi phạm Discord TOS. 
                      Sử dụng với rủi ro của bạn. Chúng tôi không chịu trách nhiệm nếu tài khoản bị khóa.
                    </p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <details className="glass rounded-xl overflow-hidden">
                <summary className="cursor-pointer p-4 font-semibold text-primary-400 hover:bg-white/5 transition-colors">
                  📖 Hướng Dẫn Lấy Discord Token
                </summary>
                <div className="p-4 pt-0 space-y-3 text-sm text-gray-300">
                  <div>
                    <p className="font-semibold text-white mb-1">Bước 1:</p>
                    <p>Mở Discord Web: <a href="https://discord.com/app" target="_blank" rel="noopener" className="text-primary-400 hover:underline">discord.com/app</a></p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Bước 2:</p>
                    <p>Nhấn <kbd className="px-2 py-1 bg-slate-700 rounded">F12</kbd> hoặc <kbd className="px-2 py-1 bg-slate-700 rounded">Ctrl+Shift+I</kbd></p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Bước 3:</p>
                    <p className="mb-2">Chọn tab Console, paste code sau:</p>
                    <div className="relative">
                      <pre className="bg-slate-900 p-3 rounded overflow-x-auto text-xs">
                        <code>{tokenGuideCode}</code>
                      </pre>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={copyCode}
                        className="absolute top-2 right-2 p-2 bg-slate-700 hover:bg-slate-600 rounded transition-colors"
                        title="Copy code"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </motion.button>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Bước 4:</p>
                    <p>Nhấn Enter, copy token xuất hiện (bắt đầu với "mfa." hoặc dài ~70 ký tự)</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white mb-1">Bước 5:</p>
                    <p>Paste token vào ô bên dưới và click "Activate Worker"</p>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/20 rounded p-3">
                    <p className="text-red-300 font-semibold">🔒 Bảo Mật:</p>
                    <p className="text-red-200 text-xs mt-1">
                      KHÔNG SHARE token này với bất kỳ ai khác! Token này có toàn quyền truy cập tài khoản Discord của bạn.
                    </p>
                  </div>
                </div>
              </details>

              {/* Token Input */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-300">
                  Discord User Token
                </label>
                <input
                  type="password"
                  placeholder="Paste your Discord token here..."
                  value={tokenInput}
                  onChange={(e) => setTokenInput(e.target.value)}
                  className="input-glass mb-3"
                  disabled={settingUp}
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={setupWorker}
                  disabled={!tokenInput.trim() || settingUp}
                  className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {settingUp ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Setting up...
                    </>
                  ) : (
                    <>
                      <Power className="w-5 h-5" />
                      Activate Worker
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </GlassCard>
  );
}
