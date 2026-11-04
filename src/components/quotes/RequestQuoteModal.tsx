import React, { useState, useEffect } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-toastify';
import { quoteService, type QuoteRequestItem } from '../../services/quoteService';

interface RequestQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  productName?: string;
  productId?: string;
  onSuccess?: (quote: QuoteRequestItem) => void;
}

export const RequestQuoteModal: React.FC<RequestQuoteModalProps> = ({
  isOpen,
  onClose,
  productName = 'Patient Monitor',
  productId = '',
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    productName: productName || 'Patient Monitor',
    fullName: '',
    companyName: '',
    businessEmail: '',
    phoneNumber: '',
    quantity: 1,
    additionalRequirements: '',
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        productName: productName || 'Patient Monitor',
      }));
      setSubmitted(false);
    }
  }, [isOpen, productName]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(1, parseInt(value, 10) || 1) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.fullName.trim()) {
      toast.error('Please enter your full name');
      return;
    }
    if (!formData.companyName.trim()) {
      toast.error('Please enter your company name');
      return;
    }
    if (!formData.businessEmail.trim()) {
      toast.error('Please enter your business email');
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(formData.businessEmail.trim())) {
      toast.error('Please enter a valid business email');
      return;
    }
    if (!formData.phoneNumber.trim()) {
      toast.error('Please enter your phone number');
      return;
    }

    setLoading(true);
    try {
      const created = await quoteService.submitQuote({
        productName: formData.productName,
        productId,
        fullName: formData.fullName,
        companyName: formData.companyName,
        businessEmail: formData.businessEmail,
        phoneNumber: formData.phoneNumber,
        quantity: formData.quantity,
        additionalRequirements: formData.additionalRequirements,
        source: 'website',
      });

      setSubmitted(true);
      toast.success('Quote request submitted successfully!');
      if (onSuccess) onSuccess(created);

      // Auto close after 1.5s
      setTimeout(() => {
        onClose();
        // Reset form
        setFormData({
          productName: productName || 'Patient Monitor',
          fullName: '',
          companyName: '',
          businessEmail: '',
          phoneNumber: '',
          quantity: 1,
          additionalRequirements: '',
        });
      }, 1500);
    } catch (err: any) {
      console.error('Error submitting quote:', err);
      toast.error(err.message || 'Failed to submit quote request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-2xl bg-[#121622] border border-white/10 shadow-2xl overflow-hidden p-6 sm:p-7 text-white"
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
            <h3 className="text-xl font-bold text-white">Thank You!</h3>
            <p className="text-sm text-white/60 max-w-sm">
              Your quote request for <span className="text-white font-semibold">"{formData.productName}"</span> has been received. Our team will contact you shortly.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="mb-6 space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Request a Quote
              </h2>
              <p className="text-xs sm:text-sm text-white/60">
                Tell us about your requirements, and our team will get in touch with you.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product / Service Name Field */}
              <div>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  placeholder="Product or Service Name"
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-[#191f30] border border-white/10 text-white placeholder-white/40 focus:outline-none focus:border-red-500/80 transition-colors"
                />
              </div>

              {/* Full Name & Company Name */}
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
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#191f30] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/90 mb-1.5">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Enter your company name"
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#191f30] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-colors"
                  />
                </div>
              </div>

              {/* Business Email & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-medium text-white/90 mb-1.5">
                    Business Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    placeholder="Enter your business email"
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#191f30] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/90 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    required
                    className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#191f30] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-colors"
                  />
                </div>
              </div>

              {/* Required Quantity */}
              <div>
                <label className="block text-xs font-medium text-white/90 mb-1.5">
                  Required Quantity <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#191f30] border border-white/10 text-white focus:outline-none focus:border-red-500/80 transition-colors"
                />
              </div>

              {/* Additional Requirements */}
              <div>
                <label className="block text-xs font-medium text-white/90 mb-1.5">
                  Additional Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="additionalRequirements"
                  rows={3}
                  value={formData.additionalRequirements}
                  onChange={handleChange}
                  placeholder="Tell us more about your requirements"
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#191f30] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500/80 transition-colors resize-none"
                />
              </div>

              {/* Submit Button (Maroon/Red button matching screenshot) */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-4 rounded-xl font-semibold text-sm text-white bg-[#701620] hover:bg-[#851824] active:bg-[#5a1018] border border-red-500/30 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Quote Request'
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
