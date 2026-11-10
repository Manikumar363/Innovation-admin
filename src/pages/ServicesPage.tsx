import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  Microscope,
  FlaskConical,
  Stethoscope,
  ShieldCheck,
  Save,
  Eye,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  X,
  CheckCircle2,
  Layers,
  Sparkles,
  Smartphone,
  Monitor,
  Target,
  Crosshair,
  Cpu,
  Headphones,
  Award,
  CheckCheck,
  HeartHandshake,
  Activity,
  Users,
  Building2,
  Truck,
  FileCheck,
} from 'lucide-react';
import { DashboardLayout } from '../components/ui/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  cmsService,
  type ServicePageData,
  defaultServicePagesData,
} from '../services/cmsService';
import { API_BASE } from '../config/api';

// Lucide icon helper mapping
const ICON_COMPONENTS: Record<string, React.FC<{ className?: string }>> = {
  Microscope,
  FlaskConical,
  Stethoscope,
  ShieldCheck,
  Target,
  Crosshair,
  Cpu,
  Headphones,
  Award,
  CheckCheck,
  HeartHandshake,
  Activity,
  Users,
  Building2,
  Truck,
  FileCheck,
  Layers,
  Sparkles,
  CheckCircle2,
};

const AVAILABLE_ICONS = [
  'Microscope',
  'FlaskConical',
  'Stethoscope',
  'ShieldCheck',
  'Crosshair',
  'Target',
  'Cpu',
  'Headphones',
  'Award',
  'CheckCheck',
  'HeartHandshake',
  'Activity',
  'Users',
  'Building2',
  'Truck',
  'FileCheck',
];

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<ServicePageData[]>(defaultServicePagesData);
  const [activeSlug, setActiveSlug] = useState<string>('medical-laboratory-equipment');
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'ar'>('en');
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewLang, setPreviewLang] = useState<'en' | 'ar'>('en');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Form state for creating a new service
  const [newServiceForm, setNewServiceForm] = useState<Partial<ServicePageData>>({
    slug: '',
    title: { en: '', ar: '' },
    subtitle: { en: '', ar: '' },
    icon: 'Microscope',
    overview: {
      badge: { en: 'SERVICE SOLUTIONS', ar: 'حلول الخدمات' },
      heading: { en: 'Advanced Solutions for Better Outcomes', ar: 'حلول متقدمة لنتائج أفضل' },
      paragraphs: [
        { en: 'We provide specialized solutions designed to meet rigorous standards.', ar: 'نقدم حلولاً متخصصة مصممة لتلبية أعلى المعايير.' },
        { en: 'Our comprehensive portfolio supports clinical excellence and efficiency.', ar: 'تدعم محفظتنا الشاملة التميز السريري والكفاءة التشغيلية.' },
      ],
      keyFeaturesTitle: { en: 'Key Features', ar: 'الميزات الرئيسية' },
      keyFeatures: [
        { id: 'feat-1', icon: 'Crosshair', title: { en: 'Precision', ar: 'الدقة العالية' }, description: { en: 'Engineered for consistent precision.', ar: 'مصممة لدقة متناهية ومستمرة.' } },
        { id: 'feat-2', icon: 'ShieldCheck', title: { en: 'Reliability', ar: 'الموثوقية' }, description: { en: 'Dependable performance in every environment.', ar: 'أداء يعتمد عليه في جميع البيئات.' } },
      ],
    },
    whyChoose: {
      badge: { en: 'WHY CHOOSE OUR SOLUTIONS', ar: 'لماذا تختار حلولنا' },
      heading: { en: '', ar: '' },
      items: [
        { id: 'why-1', icon: 'CheckCircle2', text: { en: 'Tailored to facility needs', ar: 'حلول مخصصة لاحتياجات المنشأة' } },
        { id: 'why-2', icon: 'CheckCircle2', text: { en: 'Strict quality compliance', ar: 'امتثال صارم لمعايير الجودة' } },
      ],
    },
    ctaBanner: {
      heading: { en: 'Find the Right Solution', ar: 'اعثر على الحل المناسب' },
      description: { en: 'Contact our team to discuss your requirements.', ar: 'اتصل بفريقنا لمناقشة متطلباتك.' },
      buttonText: { en: 'Submit Quote Request', ar: 'طلب عرض أسعار' },
      buttonLink: '/quotes',
    },
  });

  // Load all services on mount
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        const data = await cmsService.getAllServices();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setServices(data);
          setActiveSlug((prev) => (data.some((s) => s.slug === prev) ? prev : data[0].slug));
        }
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // Current active service
  const currentService = services.find((s) => s.slug === activeSlug) || services[0] || defaultServicePagesData[0];

  // Helper to update current service state
  const updateCurrentService = (updater: (prev: ServicePageData) => ServicePageData) => {
    setServices((prevList) =>
      prevList.map((item) => (item.slug === activeSlug ? updater(item) : item))
    );
  };

  // Save current active service
  const handleSaveCurrentService = async () => {
    if (!currentService) return;
    try {
      setSaving(true);
      const targetId = currentService._id || currentService.slug;
      const res = await cmsService.updateServicePage(targetId, currentService);
      if (res.success) {
        toast.success(`"${currentService.title[activeLangTab] || currentService.title.en}" saved successfully!`);
      } else {
        toast.warn(res.message || 'Saved locally');
      }
    } catch (err: any) {
      console.error('Error saving service:', err);
      toast.error('Failed to save service changes');
    } finally {
      setSaving(false);
    }
  };

  // Reset to default 4 services
  const handleResetDefaults = async () => {
    if (
      !window.confirm(
        'Are you sure you want to reset all 4 services to their default content (as shown in the reference image)? Custom modifications will be reset.'
      )
    ) {
      return;
    }
    try {
      setSaving(true);
      const res = await cmsService.resetServicesToDefaults();
      setServices(res);
      setActiveSlug(res[0]?.slug || 'medical-laboratory-equipment');
      toast.success('Successfully reset to the 4 default service pages!');
    } catch (err: any) {
      console.error('Error resetting services:', err);
      toast.error('Failed to reset services');
    } finally {
      setSaving(false);
    }
  };

  // Create new service
  const handleCreateNewService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceForm.title?.en) {
      toast.error('English title is required');
      return;
    }
    const cleanSlug = (
      newServiceForm.slug ||
      newServiceForm.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    ).trim();

    try {
      setSaving(true);
      const payload: Partial<ServicePageData> = {
        ...newServiceForm,
        slug: cleanSlug,
        whyChoose: {
          ...newServiceForm.whyChoose,
          badge: newServiceForm.whyChoose?.badge || { en: 'WHY CHOOSE OUR SOLUTIONS', ar: 'لماذا تختار حلولنا' },
          heading: newServiceForm.whyChoose?.heading || newServiceForm.title,
          items: newServiceForm.whyChoose?.items || [],
        },
      };

      const res = await cmsService.createServicePage(payload);
      if (res.success && res.data) {
        toast.success(`Service "${res.data.title.en}" created successfully!`);
        setServices((prev) => [...prev, res.data!]);
        setActiveSlug(res.data.slug);
        setIsAddModalOpen(false);
      }
    } catch (err: any) {
      console.error('Error creating service:', err);
      toast.error('Failed to create new service');
    } finally {
      setSaving(false);
    }
  };

  // Delete service
  const handleDeleteService = async (slugToDelete: string) => {
    if (services.length <= 1) {
      toast.error('At least one service page must remain.');
      return;
    }
    const toDelete = services.find((s) => s.slug === slugToDelete);
    if (!window.confirm(`Are you sure you want to delete "${toDelete?.title.en || slugToDelete}"?`)) {
      return;
    }

    try {
      setSaving(true);
      await cmsService.deleteServicePage(toDelete?._id || slugToDelete);
      const remaining = services.filter((s) => s.slug !== slugToDelete);
      setServices(remaining);
      setActiveSlug(remaining[0].slug);
      toast.success('Service deleted successfully');
    } catch (err: any) {
      console.error('Error deleting service:', err);
      toast.error('Failed to delete service');
    } finally {
      setSaving(false);
    }
  };

  // Icon render helper
  const renderIcon = (name: string, className = 'w-4 h-4') => {
    const Component = ICON_COMPONENTS[name] || Microscope;
    return <Component className={className} />;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        {/* TOP BAR / PAGE HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#14112E] p-6 rounded-2xl border border-white/10 shadow-xl">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Microscope className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>Services & Business Areas</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-semibold border border-purple-500/30">
                    Common Reusable Layout
                  </span>
                </h1>
                <p className="text-xs text-white/50 mt-0.5">
                  Placed under Our Companies. Manage the 4 specialized service pages independently using the verified common layout.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Language Switcher */}
            <div className="bg-black/40 p-1 rounded-xl border border-white/10 flex items-center">
              <button
                type="button"
                onClick={() => setActiveLangTab('en')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLangTab === 'en'
                    ? 'bg-[#F68E2D] text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                English (EN)
              </button>
              <button
                type="button"
                onClick={() => setActiveLangTab('ar')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeLangTab === 'ar'
                    ? 'bg-[#F68E2D] text-white shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                العربية (AR)
              </button>
            </div>

            {/* Live Preview Button */}
            <Button
              type="button"
              onClick={() => {
                setPreviewLang(activeLangTab);
                setIsPreviewOpen(true);
              }}
              variant="outline"
              size="sm"
              className="border-white/10 text-white/80 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1.5 cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5 text-sky-400" />
              Live Preview
            </Button>

            {/* Reset to Defaults Button */}
            <Button
              type="button"
              onClick={handleResetDefaults}
              variant="outline"
              size="sm"
              disabled={saving}
              className="border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Reset 4 services to default content matching reference image"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${saving ? 'animate-spin' : ''}`} />
              Reset 4 Services
            </Button>

            {/* Add New Service Button */}
            <Button
              type="button"
              onClick={() => {
                setNewServiceForm({
                  slug: '',
                  title: { en: '', ar: '' },
                  subtitle: { en: '', ar: '' },
                  icon: 'Microscope',
                  order: services.length + 1,
                  isActive: true,
                  overview: {
                    badge: { en: 'SERVICE SOLUTIONS', ar: 'حلول الخدمات' },
                    heading: { en: 'Advanced Solutions for Better Outcomes', ar: 'حلول متقدمة لنتائج أفضل' },
                    paragraphs: [
                      { en: 'We provide comprehensive solutions tailored for your operational requirements.', ar: 'نقدم حلولاً متكاملة مخصصة لمتطلباتكم التشغيلية.' },
                      { en: 'Our portfolio supports accurate workflows and reliable everyday performance.', ar: 'تدعم محفظتنا سير العمل الدقيق والأداء اليومي الموثوق.' },
                    ],
                    keyFeaturesTitle: { en: 'Key Features', ar: 'الميزات الرئيسية' },
                    keyFeatures: [
                      { id: `feat-${Date.now()}-1`, icon: 'Crosshair', title: { en: 'Diagnostic Precision', ar: 'دقة التشخيص' }, description: { en: 'Engineered for consistent and reliable results.', ar: 'مصممة لنتائج موثوقة ومتسقة.' } },
                      { id: `feat-${Date.now()}-2`, icon: 'ShieldCheck', title: { en: 'Reliable Performance', ar: 'أداء معتمد' }, description: { en: 'Tested for maximum durability and compliance.', ar: 'تم اختبارها لتحقيق أقصى درجات المتانة والامتثال.' } },
                    ],
                  },
                  whyChoose: {
                    badge: { en: 'WHY CHOOSE OUR SOLUTIONS', ar: 'لماذا تختار حلولنا' },
                    heading: { en: '', ar: '' },
                    items: [
                      { id: `why-${Date.now()}-1`, icon: 'CheckCircle2', text: { en: 'Support for clinical and laboratory operations', ar: 'دعم شامل للعمليات السريرية والمخبرية' } },
                      { id: `why-${Date.now()}-2`, icon: 'CheckCircle2', text: { en: 'Equipment options for different facility requirements', ar: 'خيارات تناسب مختلف متطلبات المنشآت' } },
                    ],
                  },
                  ctaBanner: {
                    heading: { en: 'Find the Right Solution for Your Facility', ar: 'اعثر على الحل المناسب لمنشأتك' },
                    description: { en: 'Contact our team to discuss your medical and laboratory equipment requirements.', ar: 'اتصل بفريقنا لمناقشة متطلبات الأجهزة والمعدات.' },
                    buttonText: { en: 'Submit Quote Request', ar: 'طلب عرض أسعار' },
                    buttonLink: '/quotes',
                  },
                });
                setIsAddModalOpen(true);
              }}
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New Service
            </Button>

            {/* Save Active Service Button */}
            <Button
              type="button"
              onClick={handleSaveCurrentService}
              disabled={saving}
              size="sm"
              className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F68E2D]/20"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Service'}
            </Button>
          </div>
        </div>

        {/* 4 SERVICE SELECTOR TABS (Matching the 4 specified in prompt) */}
        <div className="bg-[#0b1028] p-3 rounded-2xl border border-white/10 shadow-lg">
          <div className="flex items-center justify-between px-3 py-2 border-b border-white/5 mb-3">
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-purple-400" />
              Select Service Page to Edit ({services.length} Total Services)
            </span>
            <span className="text-[11px] text-white/40">
              Active endpoint: <code className="text-purple-300 font-mono">/services/{currentService?.slug}</code>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {services.map((srv, idx) => {
              const isSelected = srv.slug === activeSlug;
              return (
                <div
                  key={srv.slug || idx}
                  onClick={() => setActiveSlug(srv.slug)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-br from-purple-900/40 via-[#14112E] to-purple-950/40 border-purple-500 shadow-lg shadow-purple-500/20'
                      : 'bg-white/5 hover:bg-white/[0.08] border-white/10 text-white/80'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-purple-500 text-white shadow-md'
                            : 'bg-white/10 text-white/60 group-hover:text-white'
                        }`}
                      >
                        {renderIcon(srv.icon, 'w-4 h-4')}
                      </div>
                      <div>
                        <h4
                          className={`text-xs font-bold leading-tight ${
                            isSelected ? 'text-white' : 'text-white/90'
                          }`}
                        >
                          {srv.title[activeLangTab] || srv.title.en}
                        </h4>
                        <span className="text-[10px] text-white/40 font-mono block mt-0.5 truncate max-w-[150px]">
                          /{srv.slug}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px]">
                    <span
                      className={`px-2 py-0.5 rounded-full font-semibold ${
                        srv.isActive
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {srv.isActive ? 'Active' : 'Draft'}
                    </span>

                    {services.length > 1 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteService(srv.slug);
                        }}
                        className="text-white/30 hover:text-red-400 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                        title="Delete service page"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ACTIVE SERVICE PAGE EDITOR */}
        {loading ? (
          <div className="p-12 text-center text-white/60 bg-[#0b1028] rounded-2xl border border-white/10">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-purple-400" />
            <p className="text-sm">Loading service page details...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* CARD 1: GENERAL PAGE META & HERO HEADER */}
            <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
                    1
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <span>Page Meta & Top Hero Header</span>
                      <span className="text-xs text-white/40 font-normal">
                        ({currentService.title.en})
                      </span>
                    </CardTitle>
                    <p className="text-xs text-white/50">
                      The top banner displaying the big service title and introductory subtitle as seen in reference image.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={`${API_BASE}/services/${currentService.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 font-mono bg-sky-950/40 px-2.5 py-1 rounded-lg border border-sky-500/30"
                  >
                    <span>Test API: /services/{currentService.slug}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Title */}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Page Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                    </label>
                    <input
                      type="text"
                      dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                      value={currentService.title[activeLangTab] || ''}
                      onChange={(e) =>
                        updateCurrentService((prev) => ({
                          ...prev,
                          title: { ...prev.title, [activeLangTab]: e.target.value },
                          whyChoose: {
                            ...prev.whyChoose,
                            heading: { ...prev.whyChoose.heading, [activeLangTab]: e.target.value },
                          },
                        }))
                      }
                      placeholder={activeLangTab === 'ar' ? 'مثال: المعدات الطبية والمخبرية' : 'e.g. Medical & Laboratory Equipment'}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 ${
                        activeLangTab === 'ar' ? 'text-right' : ''
                      }`}
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                      URL Slug
                    </label>
                    <input
                      type="text"
                      value={currentService.slug}
                      onChange={(e) =>
                        updateCurrentService((prev) => ({
                          ...prev,
                          slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                        }))
                      }
                      placeholder="e.g. medical-laboratory-equipment"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-purple-300 font-mono placeholder-white/30 text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Subtitle */}
                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                    Hero Subtitle / Short Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <textarea
                    rows={2}
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                    value={currentService.subtitle[activeLangTab] || ''}
                    onChange={(e) =>
                      updateCurrentService((prev) => ({
                        ...prev,
                        subtitle: { ...prev.subtitle, [activeLangTab]: e.target.value },
                      }))
                    }
                    placeholder={
                      activeLangTab === 'ar'
                        ? 'مثال: حلول شاملة للأجهزة الطبية ومعدات الفحص والاختبارات المخبرية.'
                        : 'e.g. Comprehensive medical device solutions and laboratory testing equipment.'
                    }
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 resize-none ${
                      activeLangTab === 'ar' ? 'text-right' : ''
                    }`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-3 border-t border-white/10">
                  {/* Icon Select */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Service Category Icon
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/40 flex items-center justify-center shrink-0">
                        {renderIcon(currentService.icon, 'w-5 h-5')}
                      </div>
                      <select
                        value={currentService.icon}
                        onChange={(e) =>
                          updateCurrentService((prev) => ({
                            ...prev,
                            icon: e.target.value,
                          }))
                        }
                        className="flex-1 px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 cursor-pointer"
                      >
                        {AVAILABLE_ICONS.map((ic) => (
                          <option key={ic} value={ic} className="bg-[#14112E] text-white">
                            {ic}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Publication Status
                    </label>
                    <div className="flex items-center gap-3 pt-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          updateCurrentService((prev) => ({
                            ...prev,
                            isActive: !prev.isActive,
                          }))
                        }
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                          currentService.isActive
                            ? 'bg-emerald-600/30 text-emerald-400 border border-emerald-500/40'
                            : 'bg-white/5 text-white/50 border border-white/10'
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            currentService.isActive ? 'bg-emerald-400' : 'bg-white/40'
                          }`}
                        />
                        {currentService.isActive ? 'Active (Published)' : 'Draft (Unpublished)'}
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CARD 2: SPLIT OVERVIEW & KEY FEATURES (Section 1 in Image) */}
            <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 font-bold text-xs flex items-center justify-center border border-red-500/30">
                    2
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <span>Section 1: Split Overview & Key Features Card</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-600/20 text-red-300 font-mono text-[10px]">
                        Matches Reference UI Image
                      </span>
                    </CardTitle>
                    <p className="text-xs text-white/50">
                      Left column contains red sub-tagline, main heading, and narrative paragraphs; Right column contains the dark &quot;Key Features&quot; card.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* LEFT SIDE: OVERVIEW NARRATIVE */}
                  <div className="space-y-4 p-5 rounded-2xl bg-white/[0.02] border border-white/10">
                    <h3 className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5 pb-2 border-b border-white/10">
                      <span>Left Column (Narrative Overview)</span>
                    </h3>

                    {/* Red Badge Eyebrow */}
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 uppercase mb-1">
                        Eyebrow / Sub-Tagline (Red Uppercase)
                      </label>
                      <input
                        type="text"
                        dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                        value={currentService.overview.badge[activeLangTab] || ''}
                        onChange={(e) =>
                          updateCurrentService((prev) => ({
                            ...prev,
                            overview: {
                              ...prev.overview,
                              badge: { ...prev.overview.badge, [activeLangTab]: e.target.value },
                            },
                          }))
                        }
                        placeholder={activeLangTab === 'ar' ? 'مثال: حلول المعدات الطبية' : 'e.g. MEDICAL EQUIPMENT SOLUTIONS'}
                        className={`w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-red-500/30 text-red-300 font-bold uppercase tracking-wider focus:outline-none focus:border-red-500 ${
                          activeLangTab === 'ar' ? 'text-right' : ''
                        }`}
                      />
                    </div>

                    {/* Main Heading */}
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 uppercase mb-1">
                        Main Section Heading
                      </label>
                      <input
                        type="text"
                        dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                        value={currentService.overview.heading[activeLangTab] || ''}
                        onChange={(e) =>
                          updateCurrentService((prev) => ({
                            ...prev,
                            overview: {
                              ...prev.overview,
                              heading: { ...prev.overview.heading, [activeLangTab]: e.target.value },
                            },
                          }))
                        }
                        placeholder={
                          activeLangTab === 'ar'
                            ? 'مثال: معدات متقدمة لتحقيق أفضل النتائج الصحية'
                            : 'e.g. Advanced Equipment for Better Healthcare Outcomes'
                        }
                        className={`w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white font-bold focus:outline-none focus:border-purple-500 ${
                          activeLangTab === 'ar' ? 'text-right' : ''
                        }`}
                      />
                    </div>

                    {/* Paragraphs */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-white/70 uppercase">
                          Narrative Paragraphs ({currentService.overview.paragraphs.length})
                        </label>
                        <button
                          type="button"
                          onClick={() =>
                            updateCurrentService((prev) => ({
                              ...prev,
                              overview: {
                                ...prev.overview,
                                paragraphs: [
                                  ...prev.overview.paragraphs,
                                  { en: '', ar: '' },
                                ],
                              },
                            }))
                          }
                          className="text-[11px] text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer font-medium"
                        >
                          <Plus className="w-3 h-3" /> Add Paragraph
                        </button>
                      </div>

                      {currentService.overview.paragraphs.map((p, pIdx) => (
                        <div key={pIdx} className="relative">
                          <div className="flex items-center justify-between text-[10px] text-white/40 mb-1">
                            <span>Paragraph #{pIdx + 1}</span>
                            {currentService.overview.paragraphs.length > 1 && (
                              <button
                                type="button"
                                onClick={() =>
                                  updateCurrentService((prev) => ({
                                    ...prev,
                                    overview: {
                                      ...prev.overview,
                                      paragraphs: prev.overview.paragraphs.filter((_, i) => i !== pIdx),
                                    },
                                  }))
                                }
                                className="text-white/30 hover:text-red-400 p-0.5"
                                title="Remove paragraph"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                          <textarea
                            rows={3}
                            dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                            value={p[activeLangTab] || ''}
                            onChange={(e) =>
                              updateCurrentService((prev) => {
                                const newP = [...prev.overview.paragraphs];
                                newP[pIdx] = { ...newP[pIdx], [activeLangTab]: e.target.value };
                                return {
                                  ...prev,
                                  overview: { ...prev.overview, paragraphs: newP },
                                };
                              })
                            }
                            placeholder={`Enter paragraph #${pIdx + 1}...`}
                            className={`w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white/90 placeholder-white/30 focus:outline-none focus:border-purple-500 resize-none ${
                              activeLangTab === 'ar' ? 'text-right' : ''
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* RIGHT SIDE: KEY FEATURES CARD */}
                  <div className="space-y-4 p-5 rounded-2xl bg-[#14112E] border border-white/15 shadow-xl">
                    <div className="flex items-center justify-between pb-2 border-b border-white/10">
                      <h3 className="text-xs font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-red-500" />
                        <span>Right Column: Key Features Card</span>
                      </h3>
                      <button
                        type="button"
                        onClick={() =>
                          updateCurrentService((prev) => ({
                            ...prev,
                            overview: {
                              ...prev.overview,
                              keyFeatures: [
                                ...prev.overview.keyFeatures,
                                {
                                  id: `feat-${Date.now()}`,
                                  icon: 'ShieldCheck',
                                  title: { en: 'New Feature', ar: 'ميزة جديدة' },
                                  description: { en: '', ar: '' },
                                },
                              ],
                            },
                          }))
                        }
                        className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer font-medium"
                      >
                        <Plus className="w-3 h-3" /> Add Feature Item
                      </button>
                    </div>

                    {/* Features Card Title */}
                    <div>
                      <label className="block text-[11px] font-semibold text-white/70 uppercase mb-1">
                        Card Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      <input
                        type="text"
                        dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                        value={currentService.overview.keyFeaturesTitle[activeLangTab] || ''}
                        onChange={(e) =>
                          updateCurrentService((prev) => ({
                            ...prev,
                            overview: {
                              ...prev.overview,
                              keyFeaturesTitle: {
                                ...prev.overview.keyFeaturesTitle,
                                [activeLangTab]: e.target.value,
                              },
                            },
                          }))
                        }
                        placeholder={activeLangTab === 'ar' ? 'مثال: الميزات الرئيسية' : 'e.g. Key Features'}
                        className={`w-full px-3 py-2 text-xs rounded-lg bg-black/40 border border-white/10 text-white font-bold focus:outline-none focus:border-red-500 ${
                          activeLangTab === 'ar' ? 'text-right' : ''
                        }`}
                      />
                    </div>

                    {/* Feature Items List */}
                    <div className="space-y-3">
                      {currentService.overview.keyFeatures.map((feat, fIdx) => (
                        <div
                          key={feat.id || fIdx}
                          className="p-3.5 rounded-xl bg-black/30 border border-white/10 space-y-2.5 relative group hover:border-red-500/40 transition-all"
                        >
                          <div className="flex items-center justify-between pb-1.5 border-b border-white/5">
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-red-950/60 border border-red-500/50 flex items-center justify-center text-red-400">
                                {renderIcon(feat.icon, 'w-3.5 h-3.5')}
                              </div>
                              <span className="text-xs font-bold text-white">
                                Feature #{fIdx + 1}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {/* Icon select */}
                              <select
                                value={feat.icon}
                                onChange={(e) =>
                                  updateCurrentService((prev) => {
                                    const list = [...prev.overview.keyFeatures];
                                    list[fIdx] = { ...list[fIdx], icon: e.target.value };
                                    return {
                                      ...prev,
                                      overview: { ...prev.overview, keyFeatures: list },
                                    };
                                  })
                                }
                                className="px-2 py-0.5 rounded text-[10px] bg-black/50 border border-white/10 text-white cursor-pointer"
                              >
                                {AVAILABLE_ICONS.map((ic) => (
                                  <option key={ic} value={ic} className="bg-[#14112E] text-white">
                                    {ic}
                                  </option>
                                ))}
                              </select>

                              {currentService.overview.keyFeatures.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateCurrentService((prev) => ({
                                      ...prev,
                                      overview: {
                                        ...prev.overview,
                                        keyFeatures: prev.overview.keyFeatures.filter((_, i) => i !== fIdx),
                                      },
                                    }))
                                  }
                                  className="text-white/30 hover:text-red-400 p-1 rounded"
                                  title="Delete feature"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>

                          <div className="space-y-1.5">
                            <input
                              type="text"
                              dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                              value={feat.title[activeLangTab] || ''}
                              onChange={(e) =>
                                updateCurrentService((prev) => {
                                  const list = [...prev.overview.keyFeatures];
                                  list[fIdx] = {
                                    ...list[fIdx],
                                    title: { ...list[fIdx].title, [activeLangTab]: e.target.value },
                                  };
                                  return {
                                    ...prev,
                                    overview: { ...prev.overview, keyFeatures: list },
                                  };
                                })
                              }
                              placeholder={activeLangTab === 'ar' ? 'عنوان الميزة' : 'Feature Title'}
                              className={`w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/50 border border-white/10 text-white font-semibold focus:outline-none focus:border-red-500 ${
                                activeLangTab === 'ar' ? 'text-right' : ''
                              }`}
                            />

                            <textarea
                              rows={2}
                              dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                              value={feat.description[activeLangTab] || ''}
                              onChange={(e) =>
                                updateCurrentService((prev) => {
                                  const list = [...prev.overview.keyFeatures];
                                  list[fIdx] = {
                                    ...list[fIdx],
                                    description: { ...list[fIdx].description, [activeLangTab]: e.target.value },
                                  };
                                  return {
                                    ...prev,
                                    overview: { ...prev.overview, keyFeatures: list },
                                  };
                                })
                              }
                              placeholder={activeLangTab === 'ar' ? 'وصف الميزة...' : 'Feature Description...'}
                              className={`w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/50 border border-white/10 text-white/80 placeholder-white/30 focus:outline-none focus:border-red-500 resize-none ${
                                activeLangTab === 'ar' ? 'text-right' : ''
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CARD 3: WHY CHOOSE OUR SOLUTIONS (Section 2 in Image) */}
            <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 font-bold text-xs flex items-center justify-center border border-red-500/30">
                    3
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <span>Section 2: Why Choose Our Solutions</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-600/20 text-red-300 font-mono text-[10px]">
                        4 Horizontal Highlights Cards
                      </span>
                    </CardTitle>
                    <p className="text-xs text-white/50">
                      Red subtitle &quot;WHY CHOOSE OUR SOLUTIONS&quot;, section heading, and the 4 horizontal cards with red check icons.
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={() =>
                    updateCurrentService((prev) => ({
                      ...prev,
                      whyChoose: {
                        ...prev.whyChoose,
                        items: [
                          ...prev.whyChoose.items,
                          {
                            id: `why-${Date.now()}`,
                            icon: 'CheckCircle2',
                            text: { en: 'New reason item', ar: 'عنصر جديد' },
                          },
                        ],
                      },
                    }))
                  }
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Highlight Card
                </Button>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Eyebrow Badge */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Eyebrow Tagline (Red Uppercase)
                    </label>
                    <input
                      type="text"
                      dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                      value={currentService.whyChoose.badge[activeLangTab] || ''}
                      onChange={(e) =>
                        updateCurrentService((prev) => ({
                          ...prev,
                          whyChoose: {
                            ...prev.whyChoose,
                            badge: { ...prev.whyChoose.badge, [activeLangTab]: e.target.value },
                          },
                        }))
                      }
                      placeholder={activeLangTab === 'ar' ? 'مثال: لماذا تختار حلولنا' : 'e.g. WHY CHOOSE OUR SOLUTIONS'}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-red-500/30 text-red-300 font-bold uppercase tracking-wider text-sm focus:outline-none focus:border-red-500 ${
                        activeLangTab === 'ar' ? 'text-right' : ''
                      }`}
                    />
                  </div>

                  {/* Heading */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Section Heading
                    </label>
                    <input
                      type="text"
                      dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                      value={currentService.whyChoose.heading[activeLangTab] || ''}
                      onChange={(e) =>
                        updateCurrentService((prev) => ({
                          ...prev,
                          whyChoose: {
                            ...prev.whyChoose,
                            heading: { ...prev.whyChoose.heading, [activeLangTab]: e.target.value },
                          },
                        }))
                      }
                      placeholder={activeLangTab === 'ar' ? 'مثال: المعدات الطبية والمخبرية' : 'e.g. Medical & Laboratory Equipment'}
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-purple-500 ${
                        activeLangTab === 'ar' ? 'text-right' : ''
                      }`}
                    />
                  </div>
                </div>

                {/* 4 Cards Grid */}
                <div className="space-y-3 pt-3 border-t border-white/10">
                  <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                    Reason & Value Highlight Cards ({currentService.whyChoose.items.length})
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentService.whyChoose.items.map((item, iIdx) => (
                      <div
                        key={item.id || iIdx}
                        className="p-4 rounded-xl bg-white/5 hover:bg-white/[0.08] border border-white/10 relative group space-y-3 flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between pb-2 border-b border-white/5">
                          <div className="flex items-center gap-1.5 text-red-400">
                            <CheckCircle2 className="w-4 h-4" />
                            <span className="text-[11px] font-bold text-white/70">Card #{iIdx + 1}</span>
                          </div>
                          {currentService.whyChoose.items.length > 1 && (
                            <button
                              type="button"
                              onClick={() =>
                                updateCurrentService((prev) => ({
                                  ...prev,
                                  whyChoose: {
                                    ...prev.whyChoose,
                                    items: prev.whyChoose.items.filter((_, i) => i !== iIdx),
                                  },
                                }))
                              }
                              className="text-white/30 hover:text-red-400 p-0.5"
                              title="Delete card"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          )}
                        </div>

                        <textarea
                          rows={3}
                          dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                          value={item.text[activeLangTab] || ''}
                          onChange={(e) =>
                            updateCurrentService((prev) => {
                              const list = [...prev.whyChoose.items];
                              list[iIdx] = {
                                ...list[iIdx],
                                text: { ...list[iIdx].text, [activeLangTab]: e.target.value },
                              };
                              return {
                                ...prev,
                                whyChoose: { ...prev.whyChoose, items: list },
                              };
                            })
                          }
                          placeholder={
                            activeLangTab === 'ar'
                              ? 'مثال: دعم شامل للعمليات السريرية والمخبرية'
                              : 'e.g. Support for clinical and laboratory operations'
                          }
                          className={`w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-red-500 resize-none ${
                            activeLangTab === 'ar' ? 'text-right' : ''
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CARD 4: BOTTOM CTA BANNER (Section 3 in Image) */}
            <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
                    4
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                      <span>Section 3: Bottom Call-To-Action Banner</span>
                    </CardTitle>
                    <p className="text-xs text-white/50">
                      Bottom conversion box with facility inquiry headline and contact prompt.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Heading */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Banner Heading ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                    </label>
                    <input
                      type="text"
                      dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                      value={currentService.ctaBanner.heading[activeLangTab] || ''}
                      onChange={(e) =>
                        updateCurrentService((prev) => ({
                          ...prev,
                          ctaBanner: {
                            ...prev.ctaBanner,
                            heading: { ...prev.ctaBanner.heading, [activeLangTab]: e.target.value },
                          },
                        }))
                      }
                      placeholder={
                        activeLangTab === 'ar'
                          ? 'مثال: اعثر على المعدات المناسبة لمنشأتك'
                          : 'e.g. Find the Right Equipment for Your Facility'
                      }
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold focus:outline-none focus:border-purple-500 ${
                        activeLangTab === 'ar' ? 'text-right' : ''
                      }`}
                    />
                  </div>

                  {/* Button Link */}
                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                      Button Link / Action Route
                    </label>
                    <input
                      type="text"
                      value={currentService.ctaBanner.buttonLink || '/quotes'}
                      onChange={(e) =>
                        updateCurrentService((prev) => ({
                          ...prev,
                          ctaBanner: { ...prev.ctaBanner, buttonLink: e.target.value },
                        }))
                      }
                      placeholder="/quotes or /enquiries"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                    Banner Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <textarea
                    rows={2}
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                    value={currentService.ctaBanner.description[activeLangTab] || ''}
                    onChange={(e) =>
                      updateCurrentService((prev) => ({
                        ...prev,
                        ctaBanner: {
                          ...prev.ctaBanner,
                          description: { ...prev.ctaBanner.description, [activeLangTab]: e.target.value },
                        },
                      }))
                    }
                    placeholder={
                      activeLangTab === 'ar'
                        ? 'مثال: اتصل بفريقنا لمناقشة متطلبات الأجهزة واستكشاف أنسب الحلول.'
                        : 'e.g. Contact our team to discuss your medical and laboratory equipment requirements and explore suitable solutions.'
                    }
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 resize-none ${
                      activeLangTab === 'ar' ? 'text-right' : ''
                    }`}
                  />
                </div>

                {/* Button Text */}
                <div className="max-w-md">
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                    Button Label ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <input
                    type="text"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                    value={currentService.ctaBanner.buttonText?.[activeLangTab] || ''}
                    onChange={(e) =>
                      updateCurrentService((prev) => ({
                        ...prev,
                        ctaBanner: {
                          ...prev.ctaBanner,
                          buttonText: {
                            ...(prev.ctaBanner.buttonText || { en: '', ar: '' }),
                            [activeLangTab]: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder={activeLangTab === 'ar' ? 'طلب عرض أسعار' : 'Submit Quote Request'}
                    className={`w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 ${
                      activeLangTab === 'ar' ? 'text-right' : ''
                    }`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* BOTTOM FLOATING SAVE BAR */}
        <div className="fixed bottom-6 right-6 z-30">
          <Button
            type="button"
            onClick={handleSaveCurrentService}
            disabled={saving}
            className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-sm font-bold px-6 py-3 rounded-xl flex items-center gap-2.5 cursor-pointer shadow-2xl shadow-[#F68E2D]/40 hover:scale-105 transition-all"
          >
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : `Save "${currentService?.title[activeLangTab] || currentService?.title.en}"`}
          </Button>
        </div>
      </div>

      {/* ADD NEW SERVICE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#14112E] border border-white/15 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl my-8">
            <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Add New Service Page</h3>
                  <p className="text-xs text-white/50">
                    Creates an independent service page using the verified reusable layout.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-white/40 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewService} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase mb-1">
                  Service Title (English) *
                </label>
                <input
                  type="text"
                  required
                  value={newServiceForm.title?.en || ''}
                  onChange={(e) =>
                    setNewServiceForm({
                      ...newServiceForm,
                      title: { ...(newServiceForm.title || { en: '', ar: '' }), en: e.target.value },
                    })
                  }
                  placeholder="e.g. Clinical Engineering Solutions"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase mb-1">
                  Service Title (Arabic)
                </label>
                <input
                  type="text"
                  dir="rtl"
                  value={newServiceForm.title?.ar || ''}
                  onChange={(e) =>
                    setNewServiceForm({
                      ...newServiceForm,
                      title: { ...(newServiceForm.title || { en: '', ar: '' }), ar: e.target.value },
                    })
                  }
                  placeholder="مثال: حلول الهندسة السريرية"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 text-right"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase mb-1">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    value={newServiceForm.slug || ''}
                    onChange={(e) =>
                      setNewServiceForm({
                        ...newServiceForm,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      })
                    }
                    placeholder="auto-generated from title"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-purple-300 font-mono text-sm focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase mb-1">
                    Icon
                  </label>
                  <select
                    value={newServiceForm.icon || 'Microscope'}
                    onChange={(e) => setNewServiceForm({ ...newServiceForm, icon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500 cursor-pointer"
                  >
                    {AVAILABLE_ICONS.map((ic) => (
                      <option key={ic} value={ic} className="bg-[#14112E] text-white">
                        {ic}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 uppercase mb-1">
                  Subtitle / Tagline (English)
                </label>
                <textarea
                  rows={2}
                  value={newServiceForm.subtitle?.en || ''}
                  onChange={(e) =>
                    setNewServiceForm({
                      ...newServiceForm,
                      subtitle: { ...(newServiceForm.subtitle || { en: '', ar: '' }), en: e.target.value },
                    })
                  }
                  placeholder="Short introductory description..."
                  className="w-full px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-white/60 hover:text-white border-white/10 text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2"
                >
                  {saving ? 'Creating...' : 'Create Service Page'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HIGH-FIDELITY LIVE PREVIEW MODAL (Matching Reference UI Image) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-6 overflow-hidden">
          {/* Modal Header */}
          <div className="bg-[#14112E] p-4 rounded-t-2xl border border-white/15 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Frontend Reusable Service Page Live Preview</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                    /{currentService.slug}
                  </span>
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switch */}
              <div className="bg-black/50 p-1 rounded-xl border border-white/10 flex items-center">
                <button
                  type="button"
                  onClick={() => setPreviewLang('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    previewLang === 'en' ? 'bg-[#F68E2D] text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewLang('ar')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    previewLang === 'ar' ? 'bg-[#F68E2D] text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  AR
                </button>
              </div>

              {/* Device Toggle */}
              <div className="bg-black/50 p-1 rounded-xl border border-white/10 flex items-center">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg transition-all ${
                    previewDevice === 'desktop' ? 'bg-purple-600 text-white' : 'text-white/60 hover:text-white'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg transition-all ${
                    previewDevice === 'mobile' ? 'bg-purple-600 text-white' : 'text-white/60 hover:text-white'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Body / Frontend Website Canvas */}
          <div className="flex-1 bg-black overflow-y-auto rounded-b-2xl border-x border-b border-white/15 p-4 sm:p-10 flex justify-center">
            <div
              dir={previewLang === 'ar' ? 'rtl' : 'ltr'}
              className={`w-full transition-all text-white font-sans ${
                previewDevice === 'mobile' ? 'max-w-md bg-[#05070f] p-6 rounded-2xl border border-white/10' : 'max-w-6xl'
              }`}
            >
              {/* 1. HERO BANNER */}
              <div className="mb-14">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
                  {currentService.title[previewLang] || currentService.title.en}
                </h1>
                <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                  {currentService.subtitle[previewLang] || currentService.subtitle.en}
                </p>
              </div>

              {/* 2. SPLIT SECTION (Section 1 in Screenshot) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20">
                {/* Left Narrative (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <span className="text-xs font-bold text-red-500 tracking-wider uppercase block">
                    {currentService.overview.badge[previewLang] || currentService.overview.badge.en}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {currentService.overview.heading[previewLang] || currentService.overview.heading.en}
                  </h2>
                  <div className="space-y-4 pt-2 text-xs sm:text-sm text-white/70 leading-relaxed">
                    {currentService.overview.paragraphs.map((p, idx) => (
                      <p key={idx}>{p[previewLang] || p.en}</p>
                    ))}
                  </div>
                </div>

                {/* Right Key Features Card (5 cols) */}
                <div className="lg:col-span-5 bg-[#0f1422] rounded-2xl p-6 sm:p-7 border border-white/10 shadow-2xl">
                  <h3 className="text-base font-bold text-white mb-6">
                    {currentService.overview.keyFeaturesTitle[previewLang] || currentService.overview.keyFeaturesTitle.en}
                  </h3>

                  <div className="space-y-6">
                    {currentService.overview.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-red-950/80 border border-red-500/40 flex items-center justify-center shrink-0 text-red-500 mt-0.5">
                          {renderIcon(feat.icon, 'w-4 h-4')}
                        </div>
                        <div>
                          <h4 className="text-xs sm:text-sm font-bold text-white mb-1">
                            {feat.title[previewLang] || feat.title.en}
                          </h4>
                          <p className="text-xs text-white/60 leading-relaxed">
                            {feat.description[previewLang] || feat.description.en}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. WHY CHOOSE OUR SOLUTIONS SECTION */}
              <div className="mb-20">
                <div className="mb-6">
                  <span className="text-xs font-bold text-red-500 tracking-wider uppercase block mb-1">
                    {currentService.whyChoose.badge[previewLang] || currentService.whyChoose.badge.en}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {currentService.whyChoose.heading[previewLang] || currentService.whyChoose.heading.en}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {currentService.whyChoose.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-[#0f1422] border border-white/10 flex items-start gap-3.5 hover:border-red-500/40 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-full bg-red-950/80 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <p className="text-xs font-medium text-white/80 leading-relaxed">
                        {item.text[previewLang] || item.text.en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. BOTTOM CTA BANNER */}
              <div className="p-8 sm:p-10 rounded-2xl bg-[#0f1422] border border-white/10 relative overflow-hidden shadow-2xl">
                <div className="max-w-2xl space-y-3">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {currentService.ctaBanner.heading[previewLang] || currentService.ctaBanner.heading.en}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                    {currentService.ctaBanner.description[previewLang] || currentService.ctaBanner.description.en}
                  </p>
                  {currentService.ctaBanner.buttonText && (
                    <div className="pt-2">
                      <button
                        type="button"
                        className="px-5 py-2.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide transition-all shadow-lg shadow-red-600/30"
                      >
                        {currentService.ctaBanner.buttonText[previewLang] || currentService.ctaBanner.buttonText.en}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ServicesPage;
