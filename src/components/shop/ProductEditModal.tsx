import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Image as ImageIcon,
  Trash2,
  Plus,
  CheckCircle2,
  RefreshCw,
  Star,
  Layers,
  FileText,
  Sliders,
  Award,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { uploadService } from '../../services/uploadService';
import type {
  ShopProductCard,
  ShopProductBadge,
  ShopProductSpecification,
} from '../../services/cmsService';

interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: ShopProductCard | null;
  onSave: (updatedProduct: ShopProductCard) => Promise<void>;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave,
}) => {
  const primaryFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  // Active Tab: 'images' | 'info' | 'specs' | 'badges'
  const [activeTab, setActiveTab] = useState<'images' | 'info' | 'specs' | 'badges'>('images');

  // Form State
  const [formData, setFormData] = useState<ShopProductCard | null>(null);
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const [isUploadingPrimary, setIsUploadingPrimary] = useState<boolean>(false);
  const [isUploadingGallery, setIsUploadingGallery] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // New Spec input state
  const [newSpecLabelEn, setNewSpecLabelEn] = useState<string>('');
  const [newSpecLabelAr, setNewSpecLabelAr] = useState<string>('');
  const [newSpecValueEn, setNewSpecValueEn] = useState<string>('');
  const [newSpecValueAr, setNewSpecValueAr] = useState<string>('');

  // New Badge input state
  const [newBadgeEn, setNewBadgeEn] = useState<string>('');
  const [newBadgeAr, setNewBadgeAr] = useState<string>('');

  useEffect(() => {
    if (product) {
      const existingImages = Array.isArray(product.images) && product.images.length > 0
        ? [...product.images]
        : product.image
        ? [product.image]
        : [];

      setFormData({
        ...product,
        image: existingImages[0] || product.image || '',
        images: existingImages,
        specifications: Array.isArray(product.specifications) ? [...product.specifications] : [],
        badges: Array.isArray(product.badges) ? [...product.badges] : [],
      });
      setActiveTab('images');
      setNewImageUrl('');
    } else {
      setFormData(null);
    }
  }, [product, isOpen]);

  if (!isOpen || !formData) return null;

  // Primary image change
  const handlePrimaryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploadingPrimary(true);
      const url = await uploadService.uploadImage(file, 'shop-products');
      
      const currentImages = formData.images || [];
      const updatedImages = currentImages.filter((img) => img !== url);
      const newImagesList = [url, ...updatedImages];

      setFormData((prev) =>
        prev
          ? {
              ...prev,
              image: url,
              images: newImagesList,
            }
          : prev
      );
      toast.success('Primary image uploaded successfully!');
    } catch (err: any) {
      console.error('Primary upload failed:', err);
      toast.error(err.message || 'Failed to upload primary image');
    } finally {
      setIsUploadingPrimary(false);
      if (primaryFileInputRef.current) {
        primaryFileInputRef.current.value = '';
      }
    }
  };

  // Gallery multi-file upload
  const handleGalleryMultipleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    try {
      setIsUploadingGallery(true);
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const url = await uploadService.uploadImage(file, 'shop-products');
          uploadedUrls.push(url);
        } catch (fileErr: any) {
          console.error(`Error uploading file ${file.name}:`, fileErr);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData((prev) => {
          if (!prev) return prev;
          const currentImgs = prev.images || [];
          const combined = [...currentImgs, ...uploadedUrls.filter((u) => !currentImgs.includes(u))];
          return {
            ...prev,
            image: prev.image || combined[0] || '',
            images: combined,
          };
        });
        toast.success(
          `Uploaded ${uploadedUrls.length} image${uploadedUrls.length > 1 ? 's' : ''} to gallery!`
        );
      } else {
        toast.error('Failed to upload selected images.');
      }
    } catch (err: any) {
      console.error('Gallery upload error:', err);
      toast.error(err.message || 'Failed to upload gallery images');
    } finally {
      setIsUploadingGallery(false);
      if (galleryFileInputRef.current) {
        galleryFileInputRef.current.value = '';
      }
    }
  };

  // Add image by URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) {
      toast.error('Please enter a valid image URL');
      return;
    }

    const trimmedUrl = newImageUrl.trim();
    setFormData((prev) => {
      if (!prev) return prev;
      const currentImgs = prev.images || [];
      if (currentImgs.includes(trimmedUrl)) {
        toast.info('Image URL is already in the gallery');
        return prev;
      }
      const combined = [...currentImgs, trimmedUrl];
      return {
        ...prev,
        image: prev.image || combined[0] || '',
        images: combined,
      };
    });
    setNewImageUrl('');
    toast.success('Image added to gallery!');
  };

  // Set an image as primary thumbnail
  const handleSetPrimaryImage = (targetUrl: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const currentImgs = prev.images || [];
      const rest = currentImgs.filter((u) => u !== targetUrl);
      return {
        ...prev,
        image: targetUrl,
        images: [targetUrl, ...rest],
      };
    });
    toast.success('Set as primary image!');
  };

  // Remove image from gallery
  const handleRemoveGalleryImage = (targetUrl: string) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const currentImgs = prev.images || [];
      const updated = currentImgs.filter((u) => u !== targetUrl);
      return {
        ...prev,
        image: prev.image === targetUrl ? updated[0] || '' : prev.image,
        images: updated,
      };
    });
  };

  // Add specification
  const handleAddSpecification = () => {
    if (!newSpecLabelEn.trim() && !newSpecValueEn.trim()) {
      toast.error('Specification label and value cannot be empty');
      return;
    }
    const newSpec: ShopProductSpecification = {
      id: `spec-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      label: {
        en: newSpecLabelEn.trim() || newSpecLabelAr.trim(),
        ar: newSpecLabelAr.trim() || newSpecLabelEn.trim(),
      },
      value: {
        en: newSpecValueEn.trim() || newSpecValueAr.trim(),
        ar: newSpecValueAr.trim() || newSpecValueEn.trim(),
      },
    };

    setFormData((prev) =>
      prev
        ? {
            ...prev,
            specifications: [...(prev.specifications || []), newSpec],
          }
        : prev
    );

    setNewSpecLabelEn('');
    setNewSpecLabelAr('');
    setNewSpecValueEn('');
    setNewSpecValueAr('');
  };

  // Remove specification
  const handleRemoveSpecification = (id: string, index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const nextSpecs = (prev.specifications || []).filter(
        (s, i) => (s.id ? s.id !== id : i !== index)
      );
      return { ...prev, specifications: nextSpecs };
    });
  };

  // Add badge
  const handleAddBadge = () => {
    if (!newBadgeEn.trim() && !newBadgeAr.trim()) {
      toast.error('Badge title cannot be empty');
      return;
    }
    const newBadge: ShopProductBadge = {
      id: `badge-${Date.now()}`,
      en: newBadgeEn.trim() || newBadgeAr.trim(),
      ar: newBadgeAr.trim() || newBadgeEn.trim(),
    };
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            badges: [...(prev.badges || []), newBadge],
          }
        : prev
    );
    setNewBadgeEn('');
    setNewBadgeAr('');
  };

  // Remove badge
  const handleRemoveBadge = (id: string, index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      const nextBadges = (prev.badges || []).filter(
        (b, i) => (b.id ? b.id !== id : i !== index)
      );
      return { ...prev, badges: nextBadges };
    });
  };

  // Submit & Save
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name?.en?.trim() && !formData.name?.ar?.trim()) {
      toast.error('Product Name is required');
      return;
    }

    try {
      setIsSaving(true);
      // Ensure primary image matches images[0] if exists
      const imagesList = formData.images && formData.images.length > 0 ? formData.images : [];
      const primaryImage = imagesList[0] || formData.image || '';

      const cleanedProduct: ShopProductCard = {
        ...formData,
        image: primaryImage,
        images: imagesList.length > 0 ? imagesList : (primaryImage ? [primaryImage] : []),
        slug: formData.slug || formData.id || 'product',
      };

      await onSave(cleanedProduct);
      toast.success('Product and images updated successfully!');
      onClose();
    } catch (err: any) {
      console.error('Error saving product:', err);
      toast.error(err.message || 'Failed to save product changes');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0d1226] border border-white/15 rounded-2xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* MODAL HEADER */}
        <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  Edit Product & Image Gallery
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-emerald-400 border border-white/10">
                  {formData.slug || formData.id}
                </span>
              </div>
              <p className="text-xs text-white/50">
                Update product images, bilingual details, specifications, and certification badges.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* NAVIGATION TABS */}
        <div className="px-6 bg-black/40 border-b border-white/10 flex items-center gap-2 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('images')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'images'
                ? 'border-emerald-400 text-emerald-300 bg-white/[0.02]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Product Images & Gallery ({formData.images?.length || (formData.image ? 1 : 0)})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('info')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'info'
                ? 'border-emerald-400 text-emerald-300 bg-white/[0.02]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            Basic Info & Descriptions
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'specs'
                ? 'border-emerald-400 text-emerald-300 bg-white/[0.02]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Key Specifications ({formData.specifications?.length || 0})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`py-3 px-3.5 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap ${
              activeTab === 'badges'
                ? 'border-emerald-400 text-emerald-300 bg-white/[0.02]'
                : 'border-transparent text-white/60 hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            Badges & Certifications ({formData.badges?.length || 0})
          </button>
        </div>

        {/* TAB CONTENTS (SCROLLABLE) */}
        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: PRODUCT IMAGES & GALLERY */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              {/* PRIMARY IMAGE SECTION */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span>Primary Thumbnail Image</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      The main image displayed on shop cards and as the default hero image.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      ref={primaryFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handlePrimaryImageUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploadingPrimary}
                      onClick={() => primaryFileInputRef.current?.click()}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isUploadingPrimary ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          Upload New Thumbnail
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <div className="w-28 h-28 rounded-xl border border-white/15 bg-black/50 overflow-hidden flex items-center justify-center shrink-0">
                    {formData.image ? (
                      <img
                        src={formData.image}
                        alt="Primary Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center p-2 text-white/30 text-xs flex flex-col items-center gap-1">
                        <ImageIcon className="w-6 h-6 text-white/20" />
                        <span>No image</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <label className="text-xs text-white/70 block">
                      Or edit Primary Image Direct URL:
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={formData.image || ''}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFormData((prev) => {
                            if (!prev) return prev;
                            const cur = prev.images || [];
                            const updated = cur.length > 0 ? [val, ...cur.slice(1)] : [val];
                            return {
                              ...prev,
                              image: val,
                              images: updated,
                            };
                          });
                        }}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="flex-1 px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500"
                      />
                      {formData.image && (
                        <button
                          type="button"
                          onClick={() => {
                            setFormData((prev) => (prev ? { ...prev, image: '' } : prev));
                          }}
                          className="p-2 text-white/40 hover:text-red-400 transition-colors"
                          title="Clear Primary Image"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* MULTIPLE GALLERY IMAGES SECTION */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      <span>Product Gallery Photos ({formData.images?.length || 0})</span>
                    </h3>
                    <p className="text-xs text-white/50">
                      Upload multiple high-resolution photos for the interactive product gallery slider.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      ref={galleryFileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryMultipleUpload}
                      className="hidden"
                    />
                    <button
                      type="button"
                      disabled={isUploadingGallery}
                      onClick={() => galleryFileInputRef.current?.click()}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {isUploadingGallery ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          Uploading Multiple...
                        </>
                      ) : (
                        <>
                          <Upload className="w-3.5 h-3.5" />
                          Upload Multiple Images
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* ADD BY URL INPUT */}
                <div className="flex items-center gap-2 p-2 rounded-lg bg-black/30 border border-white/10">
                  <input
                    type="text"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="Paste an external image URL here (https://...)"
                    className="flex-1 px-3 py-1.5 text-xs rounded bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-1.5 rounded text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add URL
                  </button>
                </div>

                {/* GALLERY GRID */}
                {(!formData.images || formData.images.length === 0) ? (
                  <div className="py-8 text-center border-2 border-dashed border-white/10 rounded-xl space-y-2">
                    <ImageIcon className="w-8 h-8 text-white/20 mx-auto" />
                    <p className="text-xs text-white/50">
                      No gallery photos added yet. Click &quot;Upload Multiple Images&quot; or paste image URLs above.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {formData.images.map((imgUrl, i) => {
                      const isPrimary = formData.image === imgUrl || i === 0;
                      return (
                        <div
                          key={`gallery-${i}`}
                          className={`relative group rounded-xl border overflow-hidden bg-black/40 p-2 space-y-2 transition-all ${
                            isPrimary
                              ? 'border-emerald-500/60 shadow-lg shadow-emerald-950/40 bg-emerald-500/[0.04]'
                              : 'border-white/10 hover:border-white/25'
                          }`}
                        >
                          <div className="relative aspect-video rounded-lg overflow-hidden bg-black/60">
                            <img
                              src={imgUrl}
                              alt={`Photo ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                            {isPrimary && (
                              <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-600 text-white flex items-center gap-1 shadow">
                                <Star className="w-2.5 h-2.5 fill-white" /> Primary
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between text-[11px] pt-1">
                            <span className="text-white/40 font-mono text-[10px]">#{i + 1}</span>

                            <div className="flex items-center gap-1">
                              {!isPrimary && (
                                <button
                                  type="button"
                                  onClick={() => handleSetPrimaryImage(imgUrl)}
                                  className="px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 hover:bg-emerald-600 text-white transition-colors"
                                  title="Make Primary Thumbnail"
                                >
                                  Make Primary
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(imgUrl)}
                                className="p-1 rounded text-red-400 hover:text-white hover:bg-red-600/30 transition-colors"
                                title="Remove photo"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: BASIC INFO & DESCRIPTIONS */}
          {activeTab === 'info' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">
                    Product Name (English) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name?.en || ''}
                    onChange={(e) =>
                      setFormData((p) =>
                        p
                          ? { ...p, name: { en: e.target.value, ar: p.name?.ar || '' } }
                          : p
                      )
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">
                    Product Name (Arabic)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.name?.ar || ''}
                    onChange={(e) =>
                      setFormData((p) =>
                        p
                          ? { ...p, name: { en: p.name?.en || '', ar: e.target.value } }
                          : p
                      )
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">
                    Brand / Manufacturer (EN)
                  </label>
                  <input
                    type="text"
                    value={formData.brand?.en || ''}
                    onChange={(e) =>
                      setFormData((p) =>
                        p
                          ? { ...p, brand: { en: e.target.value, ar: p.brand?.ar || '' } }
                          : p
                      )
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">
                    Brand / Manufacturer (AR)
                  </label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.brand?.ar || ''}
                    onChange={(e) =>
                      setFormData((p) =>
                        p
                          ? { ...p, brand: { en: p.brand?.en || '', ar: e.target.value } }
                          : p
                      )
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">
                    SKU / Slug
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) =>
                      setFormData((p) => (p ? { ...p, slug: e.target.value } : p))
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* SHORT DESCRIPTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">
                    Short Summary (English) (Card overview)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description?.en || ''}
                    onChange={(e) =>
                      setFormData((p) =>
                        p
                          ? {
                              ...p,
                              description: {
                                en: e.target.value,
                                ar: p.description?.ar || '',
                              },
                            }
                          : p
                      )
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-white/70 block mb-1">
                    Short Summary (Arabic)
                  </label>
                  <textarea
                    rows={2}
                    dir="rtl"
                    value={formData.description?.ar || ''}
                    onChange={(e) =>
                      setFormData((p) =>
                        p
                          ? {
                              ...p,
                              description: {
                                en: p.description?.en || '',
                                ar: e.target.value,
                              },
                            }
                          : p
                      )
                    }
                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* FULL DESCRIPTION HTML */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-white/70 block">
                      Full Description HTML (English)
                    </label>
                    <span className="text-[10px] text-white/40">HTML or plain text</span>
                  </div>
                  <textarea
                    rows={5}
                    value={formData.productDescription?.en || ''}
                    onChange={(e) =>
                      setFormData((p) =>
                        p
                          ? {
                              ...p,
                              productDescription: {
                                en: e.target.value,
                                ar: p.productDescription?.ar || '',
                              },
                            }
                          : p
                      )
                    }
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-white/70 block">
                      Full Description HTML (Arabic)
                    </label>
                    <span className="text-[10px] text-white/40">HTML or plain text</span>
                  </div>
                  <textarea
                    rows={5}
                    dir="rtl"
                    value={formData.productDescription?.ar || ''}
                    onChange={(e) =>
                      setFormData((p) =>
                        p
                          ? {
                              ...p,
                              productDescription: {
                                en: p.productDescription?.en || '',
                                ar: e.target.value,
                              },
                            }
                          : p
                      )
                    }
                    className="w-full px-3 py-2 text-xs font-mono rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: KEY SPECIFICATIONS */}
          {activeTab === 'specs' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Add New Specification
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={newSpecLabelEn}
                    onChange={(e) => setNewSpecLabelEn(e.target.value)}
                    placeholder="Label (EN): e.g. Display"
                    className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    value={newSpecLabelAr}
                    onChange={(e) => setNewSpecLabelAr(e.target.value)}
                    placeholder="Label (AR): الشاشة"
                    className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white"
                  />
                  <input
                    type="text"
                    value={newSpecValueEn}
                    onChange={(e) => setNewSpecValueEn(e.target.value)}
                    placeholder="Value (EN): e.g. 15.6 inch TFT LCD"
                    className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    value={newSpecValueAr}
                    onChange={(e) => setNewSpecValueAr(e.target.value)}
                    placeholder="Value (AR): 15.6 بوصة"
                    className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddSpecification}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Specification Item
                </button>
              </div>

              {/* SPECS LIST */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white/70">
                  Current Specifications ({formData.specifications?.length || 0})
                </h4>

                {(!formData.specifications || formData.specifications.length === 0) ? (
                  <p className="text-xs text-white/40 italic p-4 text-center border border-white/5 rounded-xl">
                    No specifications added for this product yet.
                  </p>
                ) : (
                  <div className="divide-y divide-white/5 border border-white/10 rounded-xl bg-black/40 overflow-hidden">
                    {formData.specifications.map((s, idx) => (
                      <div
                        key={s.id || idx}
                        className="p-3 flex items-center justify-between text-xs gap-3 hover:bg-white/[0.02]"
                      >
                        <div className="flex-1 grid grid-cols-2 gap-2">
                          <div>
                            <span className="text-white/50 block text-[10px]">Label (EN / AR)</span>
                            <span className="font-semibold text-white">{s.label?.en}</span>
                            {s.label?.ar && (
                              <span className="text-[#F68E2D] block text-[11px]">{s.label.ar}</span>
                            )}
                          </div>
                          <div>
                            <span className="text-white/50 block text-[10px]">Value (EN / AR)</span>
                            <span className="font-semibold text-emerald-300">{s.value?.en}</span>
                            {s.value?.ar && (
                              <span className="text-emerald-400/80 block text-[11px]">{s.value.ar}</span>
                            )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveSpecification(s.id || '', idx)}
                          className="p-1.5 text-white/40 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: BADGES & CERTIFICATIONS */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  Add Certification Badge
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <input
                    type="text"
                    value={newBadgeEn}
                    onChange={(e) => setNewBadgeEn(e.target.value)}
                    placeholder="Badge (EN): e.g. CE Certified, FDA Registered"
                    className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white"
                  />
                  <input
                    type="text"
                    dir="rtl"
                    value={newBadgeAr}
                    onChange={(e) => setNewBadgeAr(e.target.value)}
                    placeholder="Badge (AR): معتمد من CE"
                    className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleAddBadge}
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Badge
                </button>
              </div>

              {/* CURRENT BADGES CHIPS */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white/70">
                  Current Badges ({formData.badges?.length || 0})
                </h4>

                <div className="flex flex-wrap gap-2">
                  {(!formData.badges || formData.badges.length === 0) ? (
                    <p className="text-xs text-white/40 italic p-4 text-center w-full border border-white/5 rounded-xl">
                      No badges or certifications added yet.
                    </p>
                  ) : (
                    formData.badges.map((b, idx) => (
                      <div
                        key={b.id || idx}
                        className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white flex items-center gap-2"
                      >
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        <span className="font-semibold">{b.en}</span>
                        {b.ar && <span className="text-[#F68E2D] text-[11px]">({b.ar})</span>}
                        <button
                          type="button"
                          onClick={() => handleRemoveBadge(b.id || '', idx)}
                          className="text-white/40 hover:text-red-400 transition-colors ml-1"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* MODAL FOOTER */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between shrink-0">
            <span className="text-xs text-white/50">
              Photos uploaded here are immediately stored and linked to this product.
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                disabled={isSaving}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-900/30 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Save Product Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditModal;
