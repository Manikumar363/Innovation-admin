import React, { useRef, useState } from 'react';
import { Upload, RefreshCw, X, CheckCircle2 } from 'lucide-react';
import { uploadService } from '../../services/uploadService';
import { toast } from 'react-toastify';

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  placeholder?: string;
  helperText?: string;
  className?: string;
  compact?: boolean;
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  folder = 'cms-uploads',
  placeholder = 'https://...',
  helperText,
  className = '',
  compact = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadSuccess(false);
      const url = await uploadService.uploadImage(file, folder);
      onChange(url);
      setUploadSuccess(true);
      toast.success('Image uploaded successfully!');
      setTimeout(() => setUploadSuccess(false), 3000);
    } catch (err: any) {
      console.error('File upload error:', err);
      toast.error(err.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleClear = () => {
    onChange('');
    setUploadSuccess(false);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-semibold text-white/70 block uppercase tracking-wider">
            {label}
          </label>
          {uploadSuccess && (
            <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
              <CheckCircle2 className="w-3 h-3" /> Uploaded to storage
            </span>
          )}
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {compact ? (
        // Compact Layout (for small cards, e.g. brand logos and company cards)
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={value || ''}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
            />
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#F68E2D]/20 hover:bg-[#F68E2D] text-[#F68E2D] hover:text-white border border-[#F68E2D]/40 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50 shrink-0"
              title="Upload image from computer"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" /> Upload
                </>
              )}
            </button>
            {value && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-white/40 hover:text-red-400 rounded-lg hover:bg-white/10 transition-colors"
                title="Clear image"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        // Standard Layout with Image Input & Upload Controls
        <div className="space-y-2">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
              {value && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                  title="Clear image"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="px-3.5 py-2 rounded-lg text-xs font-semibold bg-[#F68E2D] hover:bg-[#e28124] text-white shadow-md shadow-[#F68E2D]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shrink-0"
            >
              {isUploading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" /> Upload File
                </>
              )}
            </button>
          </div>

          {helperText && (
            <p className="text-[11px] text-white/40">{helperText}</p>
          )}
        </div>
      )}
    </div>
  );
};
