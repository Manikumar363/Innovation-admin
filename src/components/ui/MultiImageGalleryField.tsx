import React, { useRef, useState } from 'react';
import {
  Images,
  Plus,
  RefreshCw,
  Trash2,
  ArrowLeft,
  ArrowRight,
  Star,
  Upload,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { uploadService } from '../../services/uploadService';
import { ImageUploadField } from './ImageUploadField';

interface MultiImageGalleryFieldProps {
  label?: string;
  images: string[];
  onChange: (images: string[]) => void;
  folder?: string;
}

/**
 * Multi-image gallery uploader and manager for Shop products.
 * Index 0 acts as the primary card thumbnail.
 */
export const MultiImageGalleryField: React.FC<MultiImageGalleryFieldProps> = ({
  label = 'Product Images Gallery',
  images,
  onChange,
  folder = 'shop',
}) => {
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [newUrlInput, setNewUrlInput] = useState('');

  const handleMultiFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const files = Array.from(fileList);
    try {
      setIsUploading(true);
      const uploadedUrls = await uploadService.uploadMultiple(files, folder);
      const validUrls = uploadedUrls.filter(Boolean);
      if (validUrls.length > 0) {
        onChange([...(images || []), ...validUrls]);
        toast.success(`${validUrls.length} image${validUrls.length > 1 ? 's' : ''} uploaded!`);
      }
    } catch (err: any) {
      console.error('Multi-image upload error:', err);
      toast.error(err.message || 'Failed to upload images');
    } finally {
      setIsUploading(false);
      if (multiFileInputRef.current) {
        multiFileInputRef.current.value = '';
      }
    }
  };

  const handleAddUrlSlot = () => {
    const trimmed = newUrlInput.trim();
    onChange([...(images || []), trimmed]);
    setNewUrlInput('');
  };

  const handleUpdateAt = (index: number, url: string) => {
    const next = [...images];
    next[index] = url;
    onChange(next);
  };

  const handleRemoveAt = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const handleMove = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const handleSetPrimary = (index: number) => {
    if (index === 0 || index >= images.length) return;
    const next = [...images];
    const [picked] = next.splice(index, 1);
    next.unshift(picked);
    onChange(next);
    toast.success('Primary product image updated');
  };

  return (
    <div className="p-3.5 bg-black/20 rounded-lg border border-white/5 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Images className="w-4 h-4 text-[#F68E2D]" />
          <label className="text-xs font-semibold text-white/85">{label}</label>
          <span className="text-[11px] text-white/40">
            ({images.length} {images.length === 1 ? 'image' : 'images'})
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={multiFileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleMultiFileSelect}
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={() => multiFileInputRef.current?.click()}
            className="px-2.5 py-1 text-[11px] font-semibold rounded bg-[#F68E2D]/20 hover:bg-[#F68E2D] text-[#F68E2D] hover:text-white border border-[#F68E2D]/40 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-3 h-3" />
                Upload Multiple Images
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleAddUrlSlot}
            className="px-2.5 py-1 text-[11px] rounded bg-white/10 hover:bg-white/15 text-white/90 transition-all flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            Add Image Slot
          </button>
        </div>
      </div>

      {images.length === 0 ? (
        <div className="border border-dashed border-white/15 rounded-lg p-5 text-center text-xs text-white/40">
          No product images added yet. Click &ldquo;Upload Multiple Images&rdquo; or &ldquo;Add Image Slot&rdquo; to add gallery photos.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {images.map((imgUrl, idx) => (
            <div
              key={`gallery-img-${idx}`}
              className="rounded-lg bg-white/[0.04] border border-white/10 p-2.5 space-y-2"
            >
              <div className="relative h-28 rounded-md overflow-hidden bg-black/40 border border-white/5">
                {imgUrl ? (
                  <img
                    src={imgUrl}
                    alt={`Product gallery ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[11px] text-white/30">
                    Empty Image Slot
                  </div>
                )}

                <span
                  className={`absolute top-1.5 left-1.5 px-2 py-0.5 rounded text-[10px] font-bold ${
                    idx === 0
                      ? 'bg-[#F68E2D] text-white'
                      : 'bg-black/70 text-white/80 border border-white/15'
                  }`}
                >
                  {idx === 0 ? 'Primary #1' : `#${idx + 1}`}
                </span>

                <div className="absolute top-1.5 right-1.5 flex items-center gap-1">
                  {idx > 0 && (
                    <button
                      type="button"
                      onClick={() => handleSetPrimary(idx)}
                      className="p-1 rounded bg-black/70 hover:bg-[#F68E2D] text-white/80 hover:text-white transition-colors cursor-pointer"
                      title="Set as Primary Image"
                    >
                      <Star className="w-3 h-3" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => handleMove(idx, -1)}
                    disabled={idx === 0}
                    className="p-1 rounded bg-black/70 hover:bg-white/20 text-white/80 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Move Left"
                  >
                    <ArrowLeft className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMove(idx, 1)}
                    disabled={idx === images.length - 1}
                    className="p-1 rounded bg-black/70 hover:bg-white/20 text-white/80 disabled:opacity-30 transition-colors cursor-pointer"
                    title="Move Right"
                  >
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveAt(idx)}
                    className="p-1 rounded bg-black/70 hover:bg-red-600 text-red-300 hover:text-white transition-colors cursor-pointer"
                    title="Remove Image"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <ImageUploadField
                compact
                folder={folder}
                value={imgUrl}
                onChange={(url) => handleUpdateAt(idx, url)}
                placeholder="Paste URL or upload..."
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
