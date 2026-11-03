import { API_BASE } from '../config/api';

export interface UploadResponse {
  success: boolean;
  files: Array<{ key: string; url: string }>;
  url?: string;
  message?: string;
}

export const uploadService = {
  /**
   * Upload a single image file via the backend upload API.
   * Can accept an optional folder name (defaults to 'cms-uploads').
   */
  async uploadImage(file: File, folder: string = 'cms-uploads'): Promise<string> {
    if (!file) {
      throw new Error('Please select a file to upload');
    }

    // Client-side file size check (10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      throw new Error('File size exceeds the 10MB limit');
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch(`${API_BASE}/api/upload/public`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Upload failed with status ${res.status}`);
    }

    const data: UploadResponse = await res.json();
    if (!data.success || !data.files || data.files.length === 0) {
      throw new Error(data.message || 'Upload did not return a valid file URL');
    }

    const fileUrl = data.files[0]?.url || data.url || '';
    return fileUrl;
  },

  /**
   * Upload multiple files
   */
  async uploadMultiple(files: File[], folder: string = 'cms-uploads'): Promise<string[]> {
    if (!files || files.length === 0) {
      throw new Error('Please select at least one file to upload');
    }

    const formData = new FormData();
    files.forEach((f) => formData.append('files', f));
    formData.append('folder', folder);

    const res = await fetch(`${API_BASE}/api/upload/file`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Upload failed with status ${res.status}`);
    }

    const data: UploadResponse = await res.json();
    if (!data.success || !data.files) {
      throw new Error(data.message || 'Upload did not return valid file URLs');
    }

    return data.files.map((f) => f.url);
  },
};
