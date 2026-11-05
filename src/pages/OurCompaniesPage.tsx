import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Building2,
  Save,
  Eye,
  RefreshCw,
  Plus,
  Trash2,
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Layers,
  X,
  Palette,
} from 'lucide-react';
import { DashboardLayout } from '../components/ui/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageUploadField } from '../components/ui/ImageUploadField';
import {
  cmsService,
  type CmsOurCompaniesData,
  type OurCompanyItem,
  initialCmsOurCompaniesData,
} from '../services/cmsService';

const COLOR_PRESETS = [
  { label: 'Red (Projects Innovator)', value: 'red', hex: '#E53E3E', border: 'border-red-500/40', badge: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { label: 'Blue (Attractive / Medics)', value: 'blue', hex: '#3182CE', border: 'border-blue-500/40', badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { label: 'Emerald (Investment)', value: 'emerald', hex: '#10B981', border: 'border-emerald-500/40', badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
  { label: 'Purple (Enterprise)', value: 'purple', hex: '#805AD5', border: 'border-purple-500/40', badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { label: 'Amber (Orange Accent)', value: 'amber', hex: '#F68E2D', border: 'border-amber-500/40', badge: 'bg-[#F68E2D]/20 text-[#F68E2D] border-[#F68E2D]/30' },
];

export const OurCompaniesPage: React.FC = () => {
  const [data, setData] = useState<CmsOurCompaniesData>(initialCmsOurCompaniesData);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'ar'>('en');
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [previewLang, setPreviewLang] = useState<'en' | 'ar'>('en');

  const ensureDefaults = (res?: Partial<CmsOurCompaniesData>): CmsOurCompaniesData => ({
    ...initialCmsOurCompaniesData,
    tagline: { ...initialCmsOurCompaniesData.tagline, ...(res?.tagline || {}) },
    title: { ...initialCmsOurCompaniesData.title, ...(res?.title || {}) },
    description: { ...initialCmsOurCompaniesData.description, ...(res?.description || {}) },
    companies:
      Array.isArray(res?.companies) && res.companies.length > 0
        ? res.companies.map((c, i) => ({
            id: c.id || `company-${i + 1}`,
            name: { en: c.name?.en || `Company #${i + 1}`, ar: c.name?.ar || `شركة #${i + 1}` },
            description: { en: c.description?.en || '', ar: c.description?.ar || '' },
            logoUrl: c.logoUrl || '',
            websiteUrl: c.websiteUrl || (i === 0 ? '/projects-innovator' : i === 1 ? '/attractive' : '/medics-innovator'),
            color: c.color || (i === 0 ? 'red' : 'blue'),
            order: c.order || i + 1,
            isActive: c.isActive !== false,
          }))
        : initialCmsOurCompaniesData.companies,
    isActive: res?.isActive !== false,
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await cmsService.getOurCompanies();
      setData(ensureDefaults(res));
    } catch (err: any) {
      console.error('Failed to load Our Companies:', err);
      toast.error('Failed to load Our Companies section from server. Loading fallback.');
      setData(initialCmsOurCompaniesData);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await cmsService.updateOurCompanies(data);
      if (res.data) {
        setData(ensureDefaults(res.data));
      }
      toast.success(res.message || 'Our Companies section updated successfully!');
    } catch (err: any) {
      console.error('Failed to save Our Companies:', err);
      toast.error(err.message || 'Failed to save Our Companies section');
    } finally {
      setSaving(false);
    }
  };

  const handleResetToDefault = () => {
    if (window.confirm('Reset this section to the default 3 interlinked division companies?')) {
      setData(initialCmsOurCompaniesData);
      toast.info('Reset to default division companies. Click "Save Changes" to publish.');
    }
  };

  const handleAddCompany = () => {
    const nextIdx = (data.companies?.length || 0) + 1;
    const newComp: OurCompanyItem = {
      id: `company-${Date.now()}`,
      name: { en: `New Division #${nextIdx}`, ar: `قسم جديد #${nextIdx}` },
      description: { en: 'Brief summary of the division services and market focus.', ar: 'نبذة موجزة عن خدمات هذا القسم ومجالات عمله.' },
      logoUrl: '',
      websiteUrl: `/company-${nextIdx}`,
      color: nextIdx % 2 === 0 ? 'blue' : 'red',
      order: nextIdx,
      isActive: true,
    };
    setData((prev) => ({
      ...prev,
      companies: [...(prev.companies || []), newComp],
    }));
    toast.success('New company card added');
  };

  const handleDeleteCompany = (index: number) => {
    if (window.confirm('Delete this division company card?')) {
      setData((prev) => ({
        ...prev,
        companies: prev.companies.filter((_, i) => i !== index),
      }));
      toast.info('Company card removed');
    }
  };

  const handleCompanyItemChange = (index: number, field: keyof OurCompanyItem, value: any) => {
    setData((prev) => {
      const list = [...prev.companies];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, companies: list };
    });
  };

  const handleCompanyBilingualChange = (
    index: number,
    field: 'name' | 'description',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setData((prev) => {
      const list = [...prev.companies];
      list[index] = {
        ...list[index],
        [field]: {
          ...(list[index][field] || { en: '', ar: '' }),
          [lang]: value,
        },
      };
      return { ...prev, companies: list };
    });
  };

  const getColorClass = (colorName?: string) => {
    switch (colorName?.toLowerCase()) {
      case 'red':
        return {
          badge: 'bg-red-500/20 text-red-400 border-red-500/30',
          border: 'border-red-500/40',
          glow: 'shadow-red-500/10',
          text: 'text-red-400',
        };
      case 'emerald':
      case 'green':
        return {
          badge: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
          border: 'border-emerald-500/40',
          glow: 'shadow-emerald-500/10',
          text: 'text-emerald-400',
        };
      case 'purple':
        return {
          badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
          border: 'border-purple-500/40',
          glow: 'shadow-purple-500/10',
          text: 'text-purple-400',
        };
      case 'amber':
      case 'orange':
        return {
          badge: 'bg-[#F68E2D]/20 text-[#F68E2D] border-[#F68E2D]/30',
          border: 'border-[#F68E2D]/40',
          glow: 'shadow-[#F68E2D]/10',
          text: 'text-[#F68E2D]',
        };
      case 'blue':
      default:
        return {
          badge: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
          border: 'border-blue-500/40',
          glow: 'shadow-blue-500/10',
          text: 'text-blue-400',
        };
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-[#F68E2D] animate-spin" />
            <p className="text-sm text-white/60">Loading Our Companies section...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-7xl mx-auto pb-16">
        {/* TOP BAR / HEADER */}
        <div className="bg-[#14112E] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F68E2D]/20 text-[#F68E2D] border border-[#F68E2D]/30 uppercase tracking-widest flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  Divisions & Subsidiaries
                </span>
                <span className="text-xs text-white/40">Independent Website Section</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {data.isActive !== false ? 'Published (Active)' : 'Draft (Inactive)'}
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Our Companies
              </h1>
              <p className="text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
                Manages the <strong>Specialized Companies & Divisions</strong> showcase placed below the Enquiries section.
                Interlinks the three core projects: <strong>Project Innovator</strong>, <strong>Attractive</strong>, and <strong>Medics Innovator</strong>.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {/* Language Switcher */}
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setActiveLangTab('en')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeLangTab === 'en' ? 'bg-[#F68E2D] text-white shadow-md' : 'text-white/70 hover:text-white'
                  }`}
                >
                  🇬🇧 EN
                </button>
                <button
                  type="button"
                  onClick={() => setActiveLangTab('ar')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                    activeLangTab === 'ar' ? 'bg-[#F68E2D] text-white shadow-md' : 'text-white/70 hover:text-white'
                  }`}
                >
                  🇸🇦 AR
                </button>
              </div>

              {/* Preview Button */}
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowPreviewModal(true)}
                className="border-white/10 text-white hover:bg-white/10 flex items-center gap-1.5 text-xs py-2 cursor-pointer"
              >
                <Eye className="w-4 h-4 text-[#F68E2D]" />
                <span>Live Preview</span>
              </Button>

              {/* Reset to Defaults */}
              <Button
                type="button"
                variant="outline"
                onClick={handleResetToDefault}
                className="border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-1 text-xs py-2 cursor-pointer"
                title="Reset to default 3 companies"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </Button>

              {/* Save Button */}
              <Button
                type="button"
                disabled={saving}
                onClick={handleSave}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                <Save className={`w-4 h-4 ${saving ? 'animate-spin' : ''}`} />
                <span>{saving ? 'Saving...' : 'Save Changes'}</span>
              </Button>
            </div>
          </div>
        </div>

        {/* INTERLINKED PROJECTS SHORTCUT BANNER */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-950/40 via-purple-950/30 to-[#14112E] border border-blue-500/20 shadow-xl space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Interlinked Group Projects & Pages
              </span>
            </div>
            <span className="text-[11px] text-white/50">
              Each company below links directly to its standalone entity page
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <Link
              to="/cms?tab=projects-innovator"
              className="p-3 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-500/30 flex items-center justify-between group transition-all"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-red-400 block group-hover:text-red-300">
                  Projects Innovator
                </span>
                <span className="text-[10px] text-white/50 font-mono">/projects-innovator</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/cms?tab=attractive"
              className="p-3 rounded-xl bg-blue-950/20 hover:bg-blue-950/40 border border-blue-500/30 flex items-center justify-between group transition-all"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-blue-400 block group-hover:text-blue-300">
                  Attractive Group
                </span>
                <span className="text-[10px] text-white/50 font-mono">/attractive</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              to="/cms?tab=medics-innovator"
              className="p-3 rounded-xl bg-cyan-950/20 hover:bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between group transition-all"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-cyan-400 block group-hover:text-cyan-300">
                  Medics Innovator
                </span>
                <span className="text-[10px] text-white/50 font-mono">/medics-innovator</span>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>

        {/* SECTION 1: SECTION HEADER & DESCRIPTION */}
        <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                  1
                </span>
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <span>Section Header & Introductory Narrative</span>
                    <span className="text-xs text-white/50 font-normal">
                      ({activeLangTab === 'ar' ? 'الترويسة والنص التمهيدي' : 'Section Headline & Narrative'})
                    </span>
                  </CardTitle>
                  <p className="text-xs text-white/50">
                    Defines the section banner title, category tagline, and description
                  </p>
                </div>
              </div>

              {/* Status Switch */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/60">Status:</span>
                <button
                  type="button"
                  onClick={() => setData({ ...data, isActive: !data.isActive })}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    data.isActive !== false
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-white/10 text-white/50 border border-white/20'
                  }`}
                >
                  {data.isActive !== false ? '● Active (Displayed)' : '○ Inactive (Hidden)'}
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeLangTab === 'en' ? (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                      🇬🇧 Section Tagline
                      <span className="text-white/40 text-[11px]">(Category label above title)</span>
                    </label>
                    <input
                      type="text"
                      value={data.tagline?.en || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tagline: { ...(data.tagline || { en: '', ar: '' }), en: e.target.value },
                        })
                      }
                      placeholder="SPECIALIZED COMPANIES & DIVISIONS"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-white/70 flex items-center gap-1.5">
                      🇬🇧 Main Title
                      <span className="text-white/40 text-[11px]">(Main headline)</span>
                    </label>
                    <input
                      type="text"
                      value={data.title?.en || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          title: { ...(data.title || { en: '', ar: '' }), en: e.target.value },
                        })
                      }
                      placeholder="Our Companies"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm font-bold focus:outline-none focus:border-[#F68E2D]"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-white/70">
                      🇬🇧 Section Description
                    </label>
                    <textarea
                      rows={3}
                      value={data.description?.en || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          description: { ...(data.description || { en: '', ar: '' }), en: e.target.value },
                        })
                      }
                      placeholder="Discover the specialized companies driving innovation and excellence across our group..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none leading-relaxed"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#F68E2D] block text-right">
                      🇸🇦 شارة القسم (Tagline) بالعربية
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={data.tagline?.ar || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          tagline: { ...(data.tagline || { en: '', ar: '' }), ar: e.target.value },
                        })
                      }
                      placeholder="الشركات والأقسام المتخصصة"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-[#F68E2D] block text-right">
                      🇸🇦 عنوان القسم بالعربية (Title)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={data.title?.ar || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          title: { ...(data.title || { en: '', ar: '' }), ar: e.target.value },
                        })
                      }
                      placeholder="شركاتنا"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm font-bold focus:outline-none focus:border-[#F68E2D] text-right"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-semibold text-[#F68E2D] block text-right">
                      🇸🇦 الوصف التوضيحي بالعربية (Description)
                    </label>
                    <textarea
                      rows={3}
                      dir="rtl"
                      value={data.description?.ar || ''}
                      onChange={(e) =>
                        setData({
                          ...data,
                          description: { ...(data.description || { en: '', ar: '' }), ar: e.target.value },
                        })
                      }
                      placeholder="استكشف الشركات المتخصصة التي تقود الابتكار والتميز عبر مجموعتنا..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none leading-relaxed"
                    />
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* SECTION 2: DIVISION COMPANIES CARDS (3) */}
        <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-black text-sm flex items-center justify-center border border-blue-500/30">
                  {data.companies?.length || 0}
                </span>
                <div>
                  <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                    <span>Division Companies Cards ({data.companies?.length || 0})</span>
                    <span className="text-xs text-white/50 font-normal">
                      ({activeLangTab === 'ar' ? 'بطاقات الكيانات والشركات' : 'Project Cards with Logo, Color & Dedicated Link'})
                    </span>
                  </CardTitle>
                  <p className="text-xs text-white/50">
                    Configured companies interlinking <strong>Projects Innovator</strong>, <strong>Attractive</strong>, and <strong>Medics Innovator</strong>
                  </p>
                </div>
              </div>

              <Button
                type="button"
                size="sm"
                onClick={handleAddCompany}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/20"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Division Card</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(data.companies || []).map((comp, cIdx) => {
                const colorStyle = getColorClass(comp.color);
                return (
                  <div
                    key={comp.id || cIdx}
                    className={`p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] border ${colorStyle.border} space-y-5 relative transition-all group flex flex-col justify-between shadow-xl`}
                  >
                    {/* Top Row: Index + Color Badge + Delete */}
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-white/10 text-white font-bold text-xs flex items-center justify-center border border-white/15">
                          #{cIdx + 1}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase tracking-wider ${colorStyle.badge}`}>
                          {comp.color || 'blue'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleDeleteCompany(cIdx)}
                        className="text-white/40 hover:text-red-400 p-1.5 rounded-md hover:bg-red-500/10 transition-colors cursor-pointer"
                        title="Delete company card"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Logo Image Upload */}
                    <div className="space-y-1.5">
                      <ImageUploadField
                        label={activeLangTab === 'ar' ? 'شعار الشركة' : 'Company Logo'}
                        value={comp.logoUrl || ''}
                        onChange={(url) => handleCompanyItemChange(cIdx, 'logoUrl', url)}
                        folder="companies"
                      />
                    </div>

                    {/* Company Name */}
                    {activeLangTab === 'en' ? (
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/70">🇬🇧 Company Name</label>
                        <input
                          type="text"
                          value={comp.name?.en || ''}
                          onChange={(e) => handleCompanyBilingualChange(cIdx, 'name', 'en', e.target.value)}
                          placeholder="e.g. Projects Innovator"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold focus:outline-none focus:border-[#F68E2D]"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#F68E2D] block text-right">
                          🇸🇦 اسم الشركة بالعربية
                        </label>
                        <input
                          type="text"
                          dir="rtl"
                          value={comp.name?.ar || ''}
                          onChange={(e) => handleCompanyBilingualChange(cIdx, 'name', 'ar', e.target.value)}
                          placeholder="مثال: مبتكر المشاريع"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      </div>
                    )}

                    {/* Company Description */}
                    {activeLangTab === 'en' ? (
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                        <textarea
                          rows={3}
                          value={comp.description?.en || ''}
                          onChange={(e) => handleCompanyBilingualChange(cIdx, 'description', 'en', e.target.value)}
                          placeholder="Delivering innovative solutions..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] resize-none leading-relaxed"
                        />
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#F68E2D] block text-right">
                          🇸🇦 الوصف بالعربية
                        </label>
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={comp.description?.ar || ''}
                          onChange={(e) => handleCompanyBilingualChange(cIdx, 'description', 'ar', e.target.value)}
                          placeholder="تقديم حلول مبتكرة..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] text-right resize-none leading-relaxed"
                        />
                      </div>
                    )}

                    {/* Color Preset Selector */}
                    <div className="space-y-2 pt-2 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <label className="text-[11px] font-semibold text-white/60 flex items-center gap-1.5">
                          <Palette className="w-3.5 h-3.5 text-white/50" />
                          Card Color Theme
                        </label>
                        <span className="text-[10px] text-white/40 uppercase font-mono">
                          {comp.color || 'blue'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {COLOR_PRESETS.map((p) => (
                          <button
                            key={p.value}
                            type="button"
                            onClick={() => handleCompanyItemChange(cIdx, 'color', p.value)}
                            className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${
                              comp.color === p.value
                                ? 'scale-125 border-white shadow-md'
                                : 'border-transparent opacity-60 hover:opacity-100 hover:scale-110'
                            }`}
                            style={{ backgroundColor: p.hex }}
                            title={p.label}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Explore URL / Target Route */}
                    <div className="space-y-1.5 pt-2 border-t border-white/5">
                      <label className="text-[11px] font-semibold text-white/60 flex items-center justify-between">
                        <span>Explore URL / Route</span>
                        <span className="text-white/40 text-[10px]">(Dedicated Page)</span>
                      </label>
                      <input
                        type="text"
                        value={comp.websiteUrl || ''}
                        onChange={(e) => handleCompanyItemChange(cIdx, 'websiteUrl', e.target.value)}
                        placeholder="/projects-innovator"
                        className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-mono focus:outline-none focus:border-[#F68E2D]"
                      />
                    </div>

                    {/* Direct Navigation Button */}
                    <div className="pt-2">
                      <a
                        href={comp.websiteUrl || '#'}
                        target={comp.websiteUrl?.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#F68E2D]/40 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-all group-hover:bg-[#F68E2D]/10 group-hover:text-[#F68E2D]"
                      >
                        <span>Visit {comp.name?.en || 'Company Page'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ----------------- LIVE PREVIEW MODAL ----------------- */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#03091F] border border-white/15 rounded-3xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#03091F]/95 backdrop-blur-md border-b border-white/10 p-4 sm:p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>Our Companies — Website Live Preview</span>
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewLang('en')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    previewLang === 'en' ? 'bg-[#F68E2D] text-white shadow-md' : 'bg-white/5 text-white/70 hover:text-white'
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewLang('ar')}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer ${
                    previewLang === 'ar' ? 'bg-[#F68E2D] text-white shadow-md' : 'bg-white/5 text-white/70 hover:text-white'
                  }`}
                >
                  🇸🇦 العربية
                </button>
                <button
                  type="button"
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Live Render */}
            <div className="p-6 sm:p-12 space-y-12" dir={previewLang === 'ar' ? 'rtl' : 'ltr'}>
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-3">
                <div className="inline-block px-3.5 py-1 rounded-full bg-[#F68E2D]/15 border border-[#F68E2D]/30 text-[#F68E2D] text-xs font-bold uppercase tracking-widest">
                  {data.tagline?.[previewLang] || (previewLang === 'ar' ? 'الشركات والأقسام المتخصصة' : 'SPECIALIZED COMPANIES & DIVISIONS')}
                </div>
                <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  {data.title?.[previewLang] || (previewLang === 'ar' ? 'شركاتنا' : 'Our Companies')}
                </h2>
                <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-2xl mx-auto">
                  {data.description?.[previewLang]}
                </p>
              </div>

              {/* 3 Companies Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(data.companies || []).map((comp, idx) => {
                  const colorStyle = getColorClass(comp.color);
                  return (
                    <div
                      key={comp.id || idx}
                      className={`p-6 rounded-3xl bg-[#0b1028]/95 border ${colorStyle.border} hover:border-[#F68E2D]/60 shadow-2xl space-y-6 text-center flex flex-col justify-between transition-all group hover:-translate-y-1`}
                    >
                      <div className="space-y-5">
                        {/* Company Logo in clean framed canvas */}
                        <div className="w-full h-24 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-3">
                          {comp.logoUrl ? (
                            <img
                              src={comp.logoUrl}
                              alt={comp.name?.[previewLang]}
                              className="max-h-16 max-w-full object-contain filter brightness-125 group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white/40">
                              <Building2 className="w-6 h-6" />
                            </div>
                          )}
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-2">
                          <h3 className={`text-lg sm:text-xl font-black text-white group-hover:${colorStyle.text} transition-colors`}>
                            {comp.name?.[previewLang]}
                          </h3>
                          <p className="text-xs text-white/70 leading-relaxed line-clamp-3 font-normal">
                            {comp.description?.[previewLang]}
                          </p>
                        </div>
                      </div>

                      {/* Explore CTA Button */}
                      <a
                        href={comp.websiteUrl || '#'}
                        className={`w-full py-3 px-4 rounded-full bg-white/10 hover:bg-white text-white hover:text-slate-900 border border-white/20 font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer`}
                      >
                        <span>{previewLang === 'ar' ? 'استكشف الشركة' : 'Explore Company'}</span>
                        {previewLang === 'ar' ? (
                          <ArrowLeft className="w-3.5 h-3.5" />
                        ) : (
                          <ArrowRight className="w-3.5 h-3.5" />
                        )}
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
