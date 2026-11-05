import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { enquiryService, type EnquiryItem } from '../../services/enquiryService';

interface SendEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
  onSuccess?: (enquiry: EnquiryItem) => void;
}

export const SendEnquiryModal: React.FC<SendEnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = '',
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: defaultSubject || '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        subject: defaultSubject || prev.subject,
      }));
      setSubmitted(false);
    }
  }, [isOpen, defaultSubject]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }
    if (!formData.subject.trim()) {
      toast.error('Please enter a subject');
      return;
    }
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }

    setLoading(true);
    try {
      const created = await enquiryService.submitEnquiry({
        fullName: formData.fullName,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        source: 'website',
      });

      setSubmitted(true);
      toast.success('Enquiry submitted successfully!');
      if (onSuccess) onSuccess(created);

      setTimeout(() => {
        onClose();
        setFormData({
          fullName: '',
          email: '',
          subject: '',
          message: '',
        });
      }, 1500);
    } catch (err: any) {
      console.error('Error submitting enquiry:', err);
      toast.error(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#0f1322] border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-7 text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10 cursor-pointer"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 flex flex-col items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white">Message Sent!</h3>
            <p className="text-sm text-white/60 max-w-sm">
              Thank you for reaching out. Our team will review your enquiry and get back to you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6 space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Send an Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                Have a question or need more information about our services? Fill out the form below, and our team will get back to you.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1: Full Name & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-white/90 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#171c2e] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/90 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#171c2e] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Subject */}
              <div>
                <label className="block text-xs font-medium text-white/90 mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#171c2e] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-colors"
                />
              </div>

              {/* Row 3: Message */}
              <div>
                <label className="block text-xs font-medium text-white/90 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#171c2e] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-[#701620] hover:bg-[#851824] active:bg-[#5a1018] border border-red-500/30 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
