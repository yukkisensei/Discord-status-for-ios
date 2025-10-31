import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, Loader, Save, X } from 'lucide-react';
import axios from 'axios';

export default function StatusForm({ status, onUpdate }) {
  const [formData, setFormData] = useState({
    name: status?.name || '',
    emoji: status?.emoji || '',
    imageUrl: status?.imageUrl || '',
    startTime: status?.startTime ? new Date(status.startTime).toISOString().slice(0, 16) : ''
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(status?.imageUrl || '');
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setFormData(prev => ({ ...prev, imageUrl: response.data.url }));
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Không thể tải lên hình ảnh. Vui lòng thử lại.');
      setPreview(formData.imageUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageUrl: '' }));
    setPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await axios.post('/api/status', {
        ...formData,
        startTime: formData.startTime || new Date().toISOString(),
        enabled: true
      });
      
      onUpdate(response.data);
      alert('Status đã được cập nhật thành công!');
    } catch (error) {
      console.error('Failed to save status:', error);
      alert('Không thể lưu status. Vui lòng thử lại.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Status Name */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Tên Trạng Thái *
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ví dụ: Đang chơi game..."
          required
          maxLength={128}
          className="input-glass"
        />
        <p className="text-xs text-gray-400 mt-1">
          {formData.name.length}/128 ký tự
        </p>
      </div>

      {/* Emoji */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Emoji (Tùy chọn)
        </label>
        <input
          type="text"
          name="emoji"
          value={formData.emoji}
          onChange={handleChange}
          placeholder="😎"
          maxLength={2}
          className="input-glass"
        />
        <p className="text-xs text-gray-400 mt-1">
          Thêm emoji để làm nổi bật status của bạn
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Hình Ảnh Status (Tùy chọn)
        </label>
        
        {preview ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
          >
            <div className="aspect-video bg-slate-800/50 rounded-xl overflow-hidden border border-white/10">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 p-2 bg-red-500/80 backdrop-blur-sm rounded-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video glass glass-hover rounded-xl flex flex-col items-center justify-center cursor-pointer border-2 border-dashed border-white/20 hover:border-primary-500/50 transition-colors"
          >
            {uploading ? (
              <>
                <Loader className="w-12 h-12 text-primary-400 animate-spin mb-2" />
                <p className="text-gray-400">Đang tải lên...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <p className="text-gray-300 font-semibold">Click để tải hình ảnh</p>
                <p className="text-sm text-gray-400 mt-1">PNG, JPG, GIF (Max 5MB)</p>
              </>
            )}
          </motion.div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Start Time */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-300">
          Thời Gian Bắt Đầu (Tùy chọn)
        </label>
        <input
          type="datetime-local"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          className="input-glass"
        />
        <p className="text-xs text-gray-400 mt-1">
          Để trống để sử dụng thời gian hiện tại
        </p>
      </div>

      {/* Submit Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={saving || uploading || !formData.name}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {saving ? (
          <>
            <Loader className="w-5 h-5 animate-spin" />
            Đang lưu...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Lưu Status
          </>
        )}
      </motion.button>
    </form>
  );
}
