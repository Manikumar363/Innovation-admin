import { API_BASE } from '../config/api';

export type EnquiryStatus = 'pending' | 'in_review' | 'contacted' | 'resolved' | 'cancelled';

export interface EnquiryItem {
  _id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  adminNotes?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryStats {
  all: number;
  pending: number;
  in_review: number;
  contacted: number;
  resolved: number;
  cancelled: number;
}

export interface GetEnquiriesResponse {
  success: boolean;
  count: number;
  total: number;
  stats: EnquiryStats;
  data: EnquiryItem[];
}

export interface CreateEnquiryPayload {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  source?: string;
}

export const enquiryService = {
  /**
   * Fetch all enquiries with optional status filter, search, and pagination
   */
  async getEnquiries(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<GetEnquiriesResponse> {
    const query = new URLSearchParams();
    if (params?.status && params.status !== 'all') query.append('status', params.status);
    if (params?.search && params.search.trim()) query.append('search', params.search.trim());
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await fetch(`${API_BASE}/api/enquiries${qs}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch enquiries');
    }

    return res.json();
  },

  /**
   * Fetch a single enquiry by ID
   */
  async getEnquiryById(id: string): Promise<EnquiryItem> {
    const res = await fetch(`${API_BASE}/api/enquiries/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch enquiry details');
    }

    const json = await res.json();
    return json.data;
  },

  /**
   * Submit a new enquiry (public end-user or admin test)
   */
  async submitEnquiry(payload: CreateEnquiryPayload): Promise<EnquiryItem> {
    const res = await fetch(`${API_BASE}/api/enquiries`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to submit enquiry');
    }

    return json.data;
  },

  /**
   * Update an enquiry's status or admin notes
   */
  async updateEnquiryStatus(
    id: string,
    status: EnquiryStatus,
    adminNotes?: string
  ): Promise<EnquiryItem> {
    const res = await fetch(`${API_BASE}/api/enquiries/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes }),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to update enquiry status');
    }

    return json.data;
  },

  /**
   * Delete an enquiry
   */
  async deleteEnquiry(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/enquiries/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to delete enquiry');
    }
  },
};
