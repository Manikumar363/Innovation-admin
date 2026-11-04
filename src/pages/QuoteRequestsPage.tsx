import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  Mail,
  Phone,
  Building2,
  Clock,
  Download,
  AlertCircle,
  FileSpreadsheet,
  CheckCircle2,
  UserCheck,
  Send,
  X,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { DashboardLayout } from '../components/ui/dashboard-layout';
import { RequestQuoteModal } from '../components/quotes/RequestQuoteModal';
import {
  quoteService,
  type QuoteRequestItem,
  type QuoteStatus,
  type QuoteStats,
} from '../services/quoteService';

export const QuoteRequestsPage: React.FC = () => {
  const [quotes, setQuotes] = useState<QuoteRequestItem[]>([]);
  const [stats, setStats] = useState<QuoteStats>({
    all: 0,
    pending: 0,
    in_review: 0,
    contacted: 0,
    completed: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeStatusTab, setActiveStatusTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequestItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Detail Modal editable admin notes
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Fetch Quotes
  const fetchQuotes = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      const res = await quoteService.getQuotes({
        status: activeStatusTab,
        search: searchQuery,
      });
      setQuotes(res.data || []);
      if (res.stats) setStats(res.stats);
    } catch (err: any) {
      console.error('Error fetching quotes:', err);
      toast.error(err.message || 'Failed to load quote requests');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [activeStatusTab, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchQuotes();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchQuotes]);

  // Handle Quick Status Change
  const handleStatusChange = async (id: string, newStatus: QuoteStatus) => {
    try {
      const updated = await quoteService.updateQuoteStatus(id, newStatus);
      setQuotes((prev) => prev.map((q) => (q._id === id ? updated : q)));
      if (selectedQuote && selectedQuote._id === id) {
        setSelectedQuote(updated);
      }
      // Re-fetch stats in background
      fetchQuotes(true);
      toast.success(`Quote status updated to "${formatStatus(newStatus)}"`);
    } catch (err: any) {
      console.error('Error updating status:', err);
      toast.error(err.message || 'Failed to update quote status');
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await quoteService.deleteQuote(id);
      setQuotes((prev) => prev.filter((q) => q._id !== id));
      setDeleteConfirmId(null);
      if (selectedQuote && selectedQuote._id === id) {
        setIsDetailModalOpen(false);
        setSelectedQuote(null);
      }
      fetchQuotes(true);
      toast.success('Quote request deleted successfully');
    } catch (err: any) {
      console.error('Error deleting quote:', err);
      toast.error(err.message || 'Failed to delete quote request');
    }
  };

  // Open Details Modal
  const openDetails = (quote: QuoteRequestItem) => {
    setSelectedQuote(quote);
    setAdminNotes(quote.adminNotes || '');
    setIsDetailModalOpen(true);
  };

  // Save Admin Notes
  const handleSaveAdminNotes = async () => {
    if (!selectedQuote) return;
    setSavingNotes(true);
    try {
      const updated = await quoteService.updateQuoteStatus(
        selectedQuote._id,
        selectedQuote.status,
        adminNotes
      );
      setSelectedQuote(updated);
      setQuotes((prev) => prev.map((q) => (q._id === updated._id ? updated : q)));
      toast.success('Admin notes saved successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save notes');
    } finally {
      setSavingNotes(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (quotes.length === 0) {
      toast.info('No quote requests available to export');
      return;
    }

    const headers = [
      'Product Name',
      'Quantity',
      'Full Name',
      'Company Name',
      'Business Email',
      'Phone Number',
      'Additional Requirements',
      'Status',
      'Created Date',
    ];

    const rows = quotes.map((q) => [
      `"${(q.productName || '').replace(/"/g, '""')}"`,
      q.quantity || 1,
      `"${(q.fullName || '').replace(/"/g, '""')}"`,
      `"${(q.companyName || '').replace(/"/g, '""')}"`,
      `"${(q.businessEmail || '').replace(/"/g, '""')}"`,
      `"${(q.phoneNumber || '').replace(/"/g, '""')}"`,
      `"${(q.additionalRequirements || '').replace(/"/g, '""')}"`,
      q.status || 'pending',
      new Date(q.createdAt).toLocaleString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `quote_requests_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Quotations exported to CSV');
  };

  const formatStatus = (s: QuoteStatus | string) => {
    switch (s) {
      case 'pending':
        return 'Pending Review';
      case 'in_review':
        return 'In Review';
      case 'contacted':
        return 'Contacted Client';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return s;
    }
  };

  const getStatusBadge = (s: QuoteStatus | string) => {
    switch (s) {
      case 'pending':
        return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
      case 'in_review':
        return 'bg-blue-500/15 text-blue-400 border border-blue-500/30';
      case 'contacted':
        return 'bg-purple-500/15 text-purple-400 border border-purple-500/30';
      case 'completed':
        return 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30';
      case 'cancelled':
        return 'bg-rose-500/15 text-rose-400 border border-rose-500/30';
      default:
        return 'bg-white/10 text-white/70 border border-white/20';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Quote Requests
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-600/20 border border-red-500/30 text-red-400">
                {stats.all} Total
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Manage, review, and follow up on customer product quotation requests from the website.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => fetchQuotes(true)}
              disabled={refreshing}
              className="px-3.5 py-2 text-xs font-medium rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              title="Refresh quote list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-medium rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
              title="Export all quotations to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {/* Test Quote Modal Button */}
            <button
              onClick={() => setIsTestModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#7c1420] to-[#961c28] hover:from-[#8c1724] hover:to-[#a7202c] text-white border border-red-500/30 shadow-lg shadow-red-900/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Test Quote</span>
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total */}
          <div className="p-4 rounded-2xl bg-[#0f1429] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/60">Total Quotations</span>
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                <FileSpreadsheet className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white mt-2">
              {stats.all}
            </div>
            <span className="text-[11px] text-white/40">All-time received</span>
          </div>

          {/* Card 2: Pending */}
          <div className="p-4 rounded-2xl bg-[#0f1429] border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-amber-400">Pending Review</span>
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-amber-400 mt-2">
              {stats.pending}
            </div>
            <span className="text-[11px] text-amber-300/60">Awaiting initial action</span>
          </div>

          {/* Card 3: In Review / Contacted */}
          <div className="p-4 rounded-2xl bg-[#0f1429] border border-blue-500/20 relative overflow-hidden group hover:border-blue-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-blue-400">In Progress</span>
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-blue-400 mt-2">
              {stats.in_review + stats.contacted}
            </div>
            <span className="text-[11px] text-blue-300/60">
              {stats.in_review} review • {stats.contacted} contacted
            </span>
          </div>

          {/* Card 4: Completed */}
          <div className="p-4 rounded-2xl bg-[#0f1429] border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-400">Completed</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
              {stats.completed}
            </div>
            <span className="text-[11px] text-emerald-300/60">Fulfilled quotes</span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-3 sm:p-4 rounded-2xl bg-[#0f1429] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
            {[
              { id: 'all', label: 'All', count: stats.all },
              { id: 'pending', label: 'Pending', count: stats.pending },
              { id: 'in_review', label: 'In Review', count: stats.in_review },
              { id: 'contacted', label: 'Contacted', count: stats.contacted },
              { id: 'completed', label: 'Completed', count: stats.completed },
              { id: 'cancelled', label: 'Cancelled', count: stats.cancelled },
            ].map((tab) => {
              const active = activeStatusTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveStatusTab(tab.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    active
                      ? 'bg-[#F68E2D] text-white shadow-md shadow-[#F68E2D]/20 font-semibold'
                      : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      active ? 'bg-black/30 text-white' : 'bg-white/10 text-white/50'
                    }`}
                  >
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product, name, company..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Quotations Table */}
        <div className="rounded-2xl bg-[#0f1429] border border-white/10 overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#F68E2D] animate-spin" />
              <p className="text-xs text-white/60">Loading quotation requests...</p>
            </div>
          ) : quotes.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">No Quotation Requests Found</h3>
              <p className="text-xs text-white/50 max-w-sm">
                {searchQuery || activeStatusTab !== 'all'
                  ? 'No quotations match your current search or filter criteria. Try resetting filters.'
                  : 'No customer quotation requests have been submitted yet. Click "Submit Test Quote" to create a sample.'}
              </p>
              <button
                onClick={() => setIsTestModalOpen(true)}
                className="mt-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#7c1420] hover:bg-[#8c1724] text-white border border-red-500/30 transition-colors"
              >
                Submit Test Quote
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Product / Item</th>
                    <th className="py-3.5 px-4 font-semibold">Customer & Company</th>
                    <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                    <th className="py-3.5 px-4 font-semibold text-center">Qty</th>
                    <th className="py-3.5 px-4 font-semibold">Submitted</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {quotes.map((quote) => (
                    <tr
                      key={quote._id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Product */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white text-sm group-hover:text-red-400 transition-colors">
                          {quote.productName || 'General Product'}
                        </div>
                        {quote.additionalRequirements && (
                          <div className="text-[11px] text-white/40 truncate max-w-xs mt-0.5">
                            "{quote.additionalRequirements}"
                          </div>
                        )}
                      </td>

                      {/* Customer & Company */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white/90">
                          {quote.fullName}
                        </div>
                        <div className="flex items-center gap-1.5 text-white/50 text-[11px] mt-0.5">
                          <Building2 className="w-3 h-3 text-[#F68E2D]" />
                          <span>{quote.companyName}</span>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4">
                        <div className="space-y-0.5">
                          <a
                            href={`mailto:${quote.businessEmail}`}
                            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
                            title="Send email"
                          >
                            <Mail className="w-3 h-3 shrink-0" />
                            <span className="truncate max-w-[170px]">
                              {quote.businessEmail}
                            </span>
                          </a>
                          <a
                            href={`tel:${quote.phoneNumber}`}
                            className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
                            title="Call customer"
                          >
                            <Phone className="w-3 h-3 shrink-0 text-emerald-400" />
                            <span>{quote.phoneNumber}</span>
                          </a>
                        </div>
                      </td>

                      {/* Quantity */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-block px-2.5 py-1 rounded-lg bg-white/5 font-mono font-bold text-white/90 border border-white/10">
                          {quote.quantity}
                        </span>
                      </td>

                      {/* Submitted Date */}
                      <td className="py-3.5 px-4 text-white/50 text-[11px] whitespace-nowrap">
                        <div>
                          {new Date(quote.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-white/30 text-[10px]">
                          {new Date(quote.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={quote.status}
                          onChange={(e) =>
                            handleStatusChange(quote._id, e.target.value as QuoteStatus)
                          }
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/20 transition-all ${getStatusBadge(
                            quote.status
                          )}`}
                        >
                          <option value="pending" className="bg-[#14112E] text-amber-400">
                            ⏳ Pending Review
                          </option>
                          <option value="in_review" className="bg-[#14112E] text-blue-400">
                            🔍 In Review
                          </option>
                          <option value="contacted" className="bg-[#14112E] text-purple-400">
                            💬 Contacted Client
                          </option>
                          <option value="completed" className="bg-[#14112E] text-emerald-400">
                            ✅ Completed
                          </option>
                          <option value="cancelled" className="bg-[#14112E] text-rose-400">
                            ❌ Cancelled
                          </option>
                        </select>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openDetails(quote)}
                            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="View quote details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(quote._id)}
                            className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                            title="Delete quotation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-2xl bg-[#14112E] border border-white/10 p-6 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/30">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Delete Quote Request?</h3>
              <p className="text-xs text-white/60">
                Are you sure you want to permanently delete this quotation request? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-white/5 hover:bg-white/10 text-white/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors"
                >
                  Confirm Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Full Details Drawer / Modal */}
        {isDetailModalOpen && selectedQuote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div
              className="relative w-full max-w-2xl rounded-2xl bg-[#141828] border border-white/10 shadow-2xl p-6 sm:p-8 text-white space-y-6 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${getStatusBadge(
                        selectedQuote.status
                      )}`}
                    >
                      {formatStatus(selectedQuote.status)}
                    </span>
                    <span className="text-xs text-white/40">
                      ID: {selectedQuote._id}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                    {selectedQuote.productName}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDetailModalOpen(false)}
                  className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Grid Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Customer Details */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block">
                    Customer Information
                  </span>
                  <div>
                    <div className="text-xs text-white/50">Full Name</div>
                    <div className="text-sm font-semibold text-white">
                      {selectedQuote.fullName}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Company</div>
                    <div className="text-sm font-semibold text-white">
                      {selectedQuote.companyName}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block">
                    Contact Channels
                  </span>
                  <div>
                    <div className="text-xs text-white/50">Business Email</div>
                    <a
                      href={`mailto:${selectedQuote.businessEmail}?subject=Regarding Quote for ${selectedQuote.productName}`}
                      className="text-sm font-semibold text-blue-400 hover:underline flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      {selectedQuote.businessEmail}
                    </a>
                  </div>
                  <div>
                    <div className="text-xs text-white/50">Phone Number</div>
                    <a
                      href={`tel:${selectedQuote.phoneNumber}`}
                      className="text-sm font-semibold text-emerald-400 hover:underline flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      {selectedQuote.phoneNumber}
                    </a>
                  </div>
                </div>
              </div>

              {/* Product & Quantity Card */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block">
                  Product Requirements
                </span>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white font-medium">
                    Requested Item: <span className="text-red-400 font-bold">{selectedQuote.productName}</span>
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-white/10 text-white font-mono font-bold text-xs">
                    Quantity: {selectedQuote.quantity}
                  </span>
                </div>
                {selectedQuote.additionalRequirements ? (
                  <div className="mt-3 pt-3 border-t border-white/5">
                    <span className="text-xs text-white/50 block mb-1">
                      Additional Requirements & Notes:
                    </span>
                    <p className="text-xs text-white/80 bg-white/5 p-3 rounded-lg whitespace-pre-wrap leading-relaxed">
                      {selectedQuote.additionalRequirements}
                    </p>
                  </div>
                ) : (
                  <div className="text-xs text-white/40 italic">
                    No additional requirements provided.
                  </div>
                )}
              </div>

              {/* Status Update & Admin Notes */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block">
                    Admin Status & Internal Notes
                  </span>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-white/60">Status:</label>
                    <select
                      value={selectedQuote.status}
                      onChange={(e) =>
                        handleStatusChange(selectedQuote._id, e.target.value as QuoteStatus)
                      }
                      className={`px-3 py-1 text-xs font-semibold rounded-lg ${getStatusBadge(
                        selectedQuote.status
                      )}`}
                    >
                      <option value="pending" className="bg-[#14112E] text-amber-400">
                        ⏳ Pending Review
                      </option>
                      <option value="in_review" className="bg-[#14112E] text-blue-400">
                        🔍 In Review
                      </option>
                      <option value="contacted" className="bg-[#14112E] text-purple-400">
                        💬 Contacted Client
                      </option>
                      <option value="completed" className="bg-[#14112E] text-emerald-400">
                        ✅ Completed
                      </option>
                      <option value="cancelled" className="bg-[#14112E] text-rose-400">
                        ❌ Cancelled
                      </option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <textarea
                    rows={2}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add internal notes for team members regarding this quotation..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={savingNotes}
                      onClick={handleSaveAdminNotes}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      {savingNotes ? 'Saving...' : 'Save Notes'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[11px] text-white/40">
                  Received on {new Date(selectedQuote.createdAt).toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedQuote.businessEmail}?subject=Quote for ${selectedQuote.productName}&body=Dear ${selectedQuote.fullName},%0D%0A%0D%0AThank you for your quote request regarding ${selectedQuote.productName}.`}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setIsDetailModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Test Quote Modal (Exact UI from screenshot) */}
        <RequestQuoteModal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
          productName="Patient Monitor"
          onSuccess={() => {
            fetchQuotes(true);
          }}
        />
      </div>
    </DashboardLayout>
  );
};
