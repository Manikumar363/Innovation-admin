import { API_BASE } from '../config/api';

export type QuoteStatus = 'pending' | 'in_review' | 'contacted' | 'completed' | 'cancelled';

export interface QuoteRequestItem {
  _id: string;
  productName: string;
  productId?: string;
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  quantity: number;
  additionalRequirements?: string;
  status: QuoteStatus;
  adminNotes?: string;
  source?: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuoteStats {
  all: number;
  pending: number;
  in_review: number;
  contacted: number;
  completed: number;
  cancelled: number;
}

export interface GetQuotesResponse {
  success: boolean;
  count: number;
  total: number;
  stats: QuoteStats;
  data: QuoteRequestItem[];
}

export interface CreateQuotePayload {
  productName: string;
  productId?: string;
  fullName: string;
  companyName: string;
  businessEmail: string;
  phoneNumber: string;
  quantity: number;
  additionalRequirements?: string;
  source?: string;
}

export const quoteService = {
  /**
   * Fetch all quote requests with optional filtering and search
   */
  async getQuotes(params?: {
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<GetQuotesResponse> {
    const query = new URLSearchParams();
    if (params?.status && params.status !== 'all') query.append('status', params.status);
    if (params?.search && params.search.trim()) query.append('search', params.search.trim());
    if (params?.page) query.append('page', params.page.toString());
    if (params?.limit) query.append('limit', params.limit.toString());

    const qs = query.toString() ? `?${query.toString()}` : '';
    const res = await fetch(`${API_BASE}/api/quotes${qs}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch quote requests');
    }

    return res.json();
  },

  /**
   * Fetch a single quote by ID
   */
  async getQuoteById(id: string): Promise<QuoteRequestItem> {
    const res = await fetch(`${API_BASE}/api/quotes/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch quote details');
    }

    const json = await res.json();
    return json.data;
  },

  /**
   * Submit a new quote request (public end-user or test submission)
   */
  async submitQuote(payload: CreateQuotePayload): Promise<QuoteRequestItem> {
    const res = await fetch(`${API_BASE}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to submit quote request');
    }

    return json.data;
  },

  /**
   * Update a quote request status or admin notes
   */
  async updateQuoteStatus(
    id: string,
    status: QuoteStatus,
    adminNotes?: string
  ): Promise<QuoteRequestItem> {
    const res = await fetch(`${API_BASE}/api/quotes/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, adminNotes }),
    });

    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message || 'Failed to update quote request status');
    }

    return json.data;
  },

  /**
   * Delete a quote request
   */
  async deleteQuote(id: string): Promise<void> {
    const res = await fetch(`${API_BASE}/api/quotes/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to delete quote request');
    }
  },
};
