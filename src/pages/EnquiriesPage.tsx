import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  Mail,
  Clock,
  Download,
  AlertCircle,
  CheckCircle2,
  UserCheck,
  Send,
  X,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { DashboardLayout } from '../components/ui/dashboard-layout';
import { SendEnquiryModal } from '../components/enquiries/SendEnquiryModal';
import {
  enquiryService,
  type EnquiryItem,
  type EnquiryStatus,
  type EnquiryStats,
} from '../services/enquiryService';

export const EnquiriesPage: React.FC = () => {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [stats, setStats] = useState<EnquiryStats>({
    all: 0,
    pending: 0,
    in_review: 0,
    contacted: 0,
    resolved: 0,
    cancelled: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeStatusTab, setActiveStatusTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Detail Modal editable admin notes
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  // Fetch Enquiries
  const fetchEnquiries = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      const res = await enquiryService.getEnquiries({
        status: activeStatusTab,
        search: searchQuery,
      });
      setEnquiries(res.data || []);
      if (res.stats) setStats(res.stats);
    } catch (err: any) {
      console.error('Error fetching enquiries:', err);
      toast.error(err.message || 'Failed to load enquiries');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [activeStatusTab, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEnquiries();
    }, 250);
    return () => clearTimeout(timer);
  }, [fetchEnquiries]);

  // Handle Quick Status Change
  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    try {
      const updated = await enquiryService.updateEnquiryStatus(id, newStatus);
      setEnquiries((prev) => prev.map((e) => (e._id === id ? updated : e)));
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry(updated);
      }
      fetchEnquiries(true);
      toast.success(`Enquiry status updated to "${formatStatus(newStatus)}"`);
    } catch (err: any) {
      console.error('Error updating status:', err);
      toast.error(err.message || 'Failed to update enquiry status');
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    try {
      await enquiryService.deleteEnquiry(id);
      setEnquiries((prev) => prev.filter((e) => e._id !== id));
      setDeleteConfirmId(null);
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setIsDetailModalOpen(false);
        setSelectedEnquiry(null);
      }
      fetchEnquiries(true);
      toast.success('Enquiry deleted successfully');
    } catch (err: any) {
      console.error('Error deleting enquiry:', err);
      toast.error(err.message || 'Failed to delete enquiry');
    }
  };

  // Open Details Modal
  const openDetails = (enquiry: EnquiryItem) => {
    setSelectedEnquiry(enquiry);
    setAdminNotes(enquiry.adminNotes || '');
    setIsDetailModalOpen(true);
  };

  // Save Admin Notes
  const handleSaveAdminNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    try {
      const updated = await enquiryService.updateEnquiryStatus(
        selectedEnquiry._id,
        selectedEnquiry.status,
        adminNotes
      );
      setSelectedEnquiry(updated);
      setEnquiries((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
      toast.success('Admin notes saved successfully');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save notes');
    } finally {
      setSavingNotes(false);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      toast.info('No enquiries available to export');
      return;
    }

    const headers = [
      'Full Name',
      'Email Address',
      'Subject',
      'Message',
      'Status',
      'Created Date',
    ];

    const rows = enquiries.map((e) => [
      `"${(e.fullName || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.subject || '').replace(/"/g, '""')}"`,
      `"${(e.message || '').replace(/"/g, '""')}"`,
      e.status || 'pending',
      new Date(e.createdAt).toLocaleString(),
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `customer_enquiries_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Enquiries exported to CSV');
  };

  const formatStatus = (s: EnquiryStatus | string) => {
    switch (s) {
      case 'pending':
        return 'Pending Review';
      case 'in_review':
        return 'In Review';
      case 'contacted':
        return 'Contacted';
      case 'resolved':
        return 'Resolved';
      case 'cancelled':
        return 'Cancelled';
      default:
        return s;
    }
  };

  const getStatusBadge = (s: EnquiryStatus | string) => {
    switch (s) {
      case 'pending':
        return 'bg-amber-500/15 text-amber-400 border border-amber-500/30';
      case 'in_review':
        return 'bg-blue-500/15 text-blue-400 border border-blue-500/30';
      case 'contacted':
        return 'bg-purple-500/15 text-purple-400 border border-purple-500/30';
      case 'resolved':
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
                Customer Enquiries
              </h1>
              <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-red-600/20 border border-red-500/30 text-red-400">
                {stats.all} Total
              </span>
            </div>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Track, review, and follow up on customer inquiries and service questions from the website.
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => fetchEnquiries(true)}
              disabled={refreshing}
              className="px-3.5 py-2 text-xs font-medium rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50"
              title="Refresh enquiry list"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 text-xs font-medium rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
              title="Export all enquiries to CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            {/* Test Enquiry Modal Button */}
            <button
              onClick={() => setIsTestModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#7c1420] to-[#961c28] hover:from-[#8c1724] hover:to-[#a7202c] text-white border border-red-500/30 shadow-lg shadow-red-900/20 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Test Enquiry</span>
            </button>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total */}
          <div className="p-4 rounded-2xl bg-[#0f1429] border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/60">Total Enquiries</span>
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80">
                <MessageSquare className="w-4 h-4" />
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
            <span className="text-[11px] text-amber-300/60">Awaiting response</span>
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

          {/* Card 4: Resolved */}
          <div className="p-4 rounded-2xl bg-[#0f1429] border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-emerald-400">Resolved</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-400 mt-2">
              {stats.resolved}
            </div>
            <span className="text-[11px] text-emerald-300/60">Closed enquiries</span>
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
              { id: 'resolved', label: 'Resolved', count: stats.resolved },
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
              placeholder="Search name, email, subject..."
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

        {/* Enquiries Data Table */}
        <div className="rounded-2xl bg-[#0f1429] border border-white/10 overflow-hidden shadow-xl">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center space-y-3">
              <RefreshCw className="w-8 h-8 text-[#F68E2D] animate-spin" />
              <p className="text-xs text-white/60">Loading customer enquiries...</p>
            </div>
          ) : enquiries.length === 0 ? (
            <div className="p-16 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">No Enquiries Found</h3>
              <p className="text-xs text-white/50 max-w-sm">
                {searchQuery || activeStatusTab !== 'all'
                  ? 'No enquiries match your current search or filter criteria. Try resetting filters.'
                  : 'No customer enquiries have been submitted yet. Click "Submit Test Enquiry" to create a sample.'}
              </p>
              <button
                onClick={() => setIsTestModalOpen(true)}
                className="mt-2 px-4 py-2 text-xs font-semibold rounded-xl bg-[#7c1420] hover:bg-[#8c1724] text-white border border-red-500/30 transition-colors"
              >
                Submit Test Enquiry
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[0.02] text-white/50 text-[11px] uppercase tracking-wider">
                    <th className="py-3.5 px-4 font-semibold">Customer</th>
                    <th className="py-3.5 px-4 font-semibold">Subject</th>
                    <th className="py-3.5 px-4 font-semibold">Message Preview</th>
                    <th className="py-3.5 px-4 font-semibold">Submitted</th>
                    <th className="py-3.5 px-4 font-semibold">Status</th>
                    <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {enquiries.map((enquiry) => (
                    <tr
                      key={enquiry._id}
                      className="hover:bg-white/[0.02] transition-colors group"
                    >
                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white text-sm">
                          {enquiry.fullName}
                        </div>
                        <a
                          href={`mailto:${enquiry.email}`}
                          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-[11px] mt-0.5"
                          title="Email customer"
                        >
                          <Mail className="w-3 h-3 shrink-0" />
                          <span className="truncate max-w-[180px]">{enquiry.email}</span>
                        </a>
                      </td>

                      {/* Subject */}
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-white/90 group-hover:text-red-400 transition-colors max-w-xs truncate">
                          {enquiry.subject}
                        </div>
                      </td>

                      {/* Message Preview */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <p className="text-white/60 text-xs line-clamp-2 leading-relaxed">
                          {enquiry.message}
                        </p>
                      </td>

                      {/* Submitted Date */}
                      <td className="py-3.5 px-4 text-white/50 text-[11px] whitespace-nowrap">
                        <div>
                          {new Date(enquiry.createdAt).toLocaleDateString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-white/30 text-[10px]">
                          {new Date(enquiry.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </div>
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <select
                          value={enquiry.status}
                          onChange={(e) =>
                            handleStatusChange(enquiry._id, e.target.value as EnquiryStatus)
                          }
                          className={`px-2.5 py-1 text-xs font-semibold rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/20 transition-all ${getStatusBadge(
                            enquiry.status
                          )}`}
                        >
                          <option value="pending" className="bg-[#14112E] text-amber-400">
                            ⏳ Pending Review
                          </option>
                          <option value="in_review" className="bg-[#14112E] text-blue-400">
                            🔍 In Review
                          </option>
                          <option value="contacted" className="bg-[#14112E] text-purple-400">
                            💬 Contacted
                          </option>
                          <option value="resolved" className="bg-[#14112E] text-emerald-400">
                            ✅ Resolved
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
                            onClick={() => openDetails(enquiry)}
                            className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            title="View enquiry details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(enquiry._id)}
                            className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-white/10 transition-colors cursor-pointer"
                            title="Delete enquiry"
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
              <h3 className="text-lg font-bold text-white">Delete Enquiry?</h3>
              <p className="text-xs text-white/60">
                Are you sure you want to permanently delete this customer enquiry? This action cannot be undone.
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

        {/* Full Details Modal */}
        {isDetailModalOpen && selectedEnquiry && (
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
                        selectedEnquiry.status
                      )}`}
                    >
                      {formatStatus(selectedEnquiry.status)}
                    </span>
                    <span className="text-xs text-white/40">
                      ID: {selectedEnquiry._id}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mt-1.5">
                    {selectedEnquiry.subject}
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

              {/* Customer Information Card */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                    Customer Name
                  </span>
                  <div className="text-sm font-semibold text-white">
                    {selectedEnquiry.fullName}
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block mb-1">
                    Email Address
                  </span>
                  <a
                    href={`mailto:${selectedEnquiry.email}?subject=Re: ${selectedEnquiry.subject}`}
                    className="text-sm font-semibold text-blue-400 hover:underline flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    {selectedEnquiry.email}
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <div className="p-4 rounded-xl bg-black/30 border border-white/5 space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 block">
                  Enquiry Message
                </span>
                <p className="text-xs sm:text-sm text-white/90 bg-white/5 p-4 rounded-xl leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </p>
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
                      value={selectedEnquiry.status}
                      onChange={(e) =>
                        handleStatusChange(selectedEnquiry._id, e.target.value as EnquiryStatus)
                      }
                      className={`px-3 py-1 text-xs font-semibold rounded-lg ${getStatusBadge(
                        selectedEnquiry.status
                      )}`}
                    >
                      <option value="pending" className="bg-[#14112E] text-amber-400">
                        ⏳ Pending Review
                      </option>
                      <option value="in_review" className="bg-[#14112E] text-blue-400">
                        🔍 In Review
                      </option>
                      <option value="contacted" className="bg-[#14112E] text-purple-400">
                        💬 Contacted
                      </option>
                      <option value="resolved" className="bg-[#14112E] text-emerald-400">
                        ✅ Resolved
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
                    placeholder="Add internal notes for team members regarding this enquiry..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                  />
                  <div className="flex justify-end">
                    <button
                      type="button"
                      disabled={savingNotes}
                      onClick={handleSaveAdminNotes}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                    >
                      {savingNotes ? 'Saving...' : 'Save Notes'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-[11px] text-white/40">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedEnquiry.email}?subject=Re: ${selectedEnquiry.subject}&body=Dear ${selectedEnquiry.fullName},%0D%0A%0D%0AThank you for reaching out to us regarding "${selectedEnquiry.subject}".`}
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

        {/* Test Enquiry Modal (Exact UI from screenshot) */}
        <SendEnquiryModal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
          onSuccess={() => {
            fetchEnquiries(true);
          }}
        />
      </div>
    </DashboardLayout>
  );
};
