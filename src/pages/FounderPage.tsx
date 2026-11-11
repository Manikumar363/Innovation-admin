import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  UserCheck,
  Save,
  Eye,
  RefreshCw,
  Plus,
  Trash2,
  X,
  Building2,
  FileText,
  Sparkles,
  Image as ImageIcon,
  ArrowUpRight,
  Monitor,
  Smartphone,
} from 'lucide-react';
import { DashboardLayout } from '../components/ui/dashboard-layout';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ImageUploadField } from '../components/ui/ImageUploadField';
import {
  cmsService,
  type CmsFounderData,
  type FounderCompanyItem,
  initialCmsFounderData,
} from '../services/cmsService';

export const FounderPage: React.FC = () => {
  const [data, setData] = useState<CmsFounderData>(initialCmsFounderData);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'ar'>('en');
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [previewLang, setPreviewLang] = useState<'en' | 'ar'>('en');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const ensureDefaults = (res?: Partial<CmsFounderData>): CmsFounderData => ({
    founderProfile: {
      image: res?.founderProfile?.image || initialCmsFounderData.founderProfile.image,
      role: { ...initialCmsFounderData.founderProfile.role, ...(res?.founderProfile?.role || {}) },
      name: { ...initialCmsFounderData.founderProfile.name, ...(res?.founderProfile?.name || {}) },
      subtitle: {
        ...initialCmsFounderData.founderProfile.subtitle,
        ...(res?.founderProfile?.subtitle || {}),
      },
    },
    messageSection: {
      eyebrow: {
        ...initialCmsFounderData.messageSection.eyebrow,
        ...(res?.messageSection?.eyebrow || {}),
      },
      heading: {
        ...initialCmsFounderData.messageSection.heading,
        ...(res?.messageSection?.heading || {}),
      },
      greeting: {
        ...initialCmsFounderData.messageSection.greeting,
        ...(res?.messageSection?.greeting || {}),
      },
      introParagraphs:
        Array.isArray(res?.messageSection?.introParagraphs) &&
        res.messageSection.introParagraphs.length > 0
          ? res.messageSection.introParagraphs
          : initialCmsFounderData.messageSection.introParagraphs,
      companiesHeading: {
        ...initialCmsFounderData.messageSection.companiesHeading,
        ...(res?.messageSection?.companiesHeading || {}),
      },
      companies:
        Array.isArray(res?.messageSection?.companies) &&
        res.messageSection.companies.length > 0
          ? res.messageSection.companies
          : initialCmsFounderData.messageSection.companies,
      closingParagraphs:
        Array.isArray(res?.messageSection?.closingParagraphs) &&
        res.messageSection.closingParagraphs.length > 0
          ? res.messageSection.closingParagraphs
          : initialCmsFounderData.messageSection.closingParagraphs,
      signOff: {
        ...initialCmsFounderData.messageSection.signOff,
        ...(res?.messageSection?.signOff || {}),
      },
      signatureName: {
        ...initialCmsFounderData.messageSection.signatureName,
        ...(res?.messageSection?.signatureName || {}),
      },
    },
    showcaseSection: {
      image: res?.showcaseSection?.image || initialCmsFounderData.showcaseSection.image,
      label: {
        ...initialCmsFounderData.showcaseSection.label,
        ...(res?.showcaseSection?.label || {}),
      },
      title: {
        ...initialCmsFounderData.showcaseSection.title,
        ...(res?.showcaseSection?.title || {}),
      },
      commitmentCard: {
        label: {
          ...initialCmsFounderData.showcaseSection.commitmentCard.label,
          ...(res?.showcaseSection?.commitmentCard?.label || {}),
        },
        title: {
          ...initialCmsFounderData.showcaseSection.commitmentCard.title,
          ...(res?.showcaseSection?.commitmentCard?.title || {}),
        },
        description: {
          ...initialCmsFounderData.showcaseSection.commitmentCard.description,
          ...(res?.showcaseSection?.commitmentCard?.description || {}),
        },
        linkUrl:
          res?.showcaseSection?.commitmentCard?.linkUrl ??
          initialCmsFounderData.showcaseSection.commitmentCard.linkUrl,
      },
      bottomTagline: {
        ...initialCmsFounderData.showcaseSection.bottomTagline,
        ...(res?.showcaseSection?.bottomTagline || {}),
      },
    },
    isActive: res?.isActive !== false,
  });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await cmsService.getCmsFounder();
      setData(ensureDefaults(res));
    } catch (err: any) {
      console.error('Failed to load Founder section:', err);
      setData(initialCmsFounderData);
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
      const res = await cmsService.updateCmsFounder(data);
      if (res.data) {
        setData(ensureDefaults(res.data));
      }
      toast.success(res.message || 'Founder section saved successfully!');
    } catch (err: any) {
      console.error('Failed to save Founder section:', err);
      toast.error(err.message || 'Failed to save Founder section');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        'Reset the Founder section back to its default executive message and layout template?'
      )
    ) {
      return;
    }
    try {
      setSaving(true);
      const fresh = await cmsService.resetFounderToDefaults();
      setData(ensureDefaults(fresh));
      toast.success('Founder section reset to default content!');
    } catch (err: any) {
      console.error('Failed to reset Founder section:', err);
      toast.error('Failed to reset Founder section');
    } finally {
      setSaving(false);
    }
  };

  // Paragraph list helpers
  const handleAddParagraph = (section: 'introParagraphs' | 'closingParagraphs') => {
    setData((prev) => ({
      ...prev,
      messageSection: {
        ...prev.messageSection,
        [section]: [
          ...prev.messageSection[section],
          { en: 'New paragraph text...', ar: 'نص فقرة جديدة...' },
        ],
      },
    }));
  };

  const handleUpdateParagraph = (
    section: 'introParagraphs' | 'closingParagraphs',
    index: number,
    value: string
  ) => {
    setData((prev) => {
      const updated = [...prev.messageSection[section]];
      updated[index] = {
        ...updated[index],
        [activeLangTab]: value,
      };
      return {
        ...prev,
        messageSection: {
          ...prev.messageSection,
          [section]: updated,
        },
      };
    });
  };

  const handleDeleteParagraph = (
    section: 'introParagraphs' | 'closingParagraphs',
    index: number
  ) => {
    if (data.messageSection[section].length <= 1) {
      toast.error('At least one paragraph must remain.');
      return;
    }
    setData((prev) => ({
      ...prev,
      messageSection: {
        ...prev.messageSection,
        [section]: prev.messageSection[section].filter((_, i) => i !== index),
      },
    }));
  };

  // Company list helpers
  const handleAddCompany = () => {
    const nextIdx = data.messageSection.companies.length + 1;
    const newComp: FounderCompanyItem = {
      id: `founder-comp-${Date.now()}`,
      numberBadge: String(nextIdx).padStart(2, '0'),
      name: { en: `New Group Company`, ar: `شركة جديدة بالمجموعة` },
      description: {
        en: 'Brief description of this company and its vision within the group.',
        ar: 'وصف موجز لهذه الشركة ورؤيتها ضمن المجموعة.',
      },
      linkUrl: '/',
      order: nextIdx,
      isActive: true,
    };
    setData((prev) => ({
      ...prev,
      messageSection: {
        ...prev.messageSection,
        companies: [...prev.messageSection.companies, newComp],
      },
    }));
    toast.success('Group company item added');
  };

  const handleDeleteCompany = (index: number) => {
    if (data.messageSection.companies.length <= 1) {
      toast.error('At least one company item must remain.');
      return;
    }
    if (!window.confirm('Remove this company from the Founder message?')) return;
    setData((prev) => ({
      ...prev,
      messageSection: {
        ...prev.messageSection,
        companies: prev.messageSection.companies.filter((_, i) => i !== index),
      },
    }));
  };

  const handleCompanyFieldChange = (
    index: number,
    field: 'numberBadge' | 'linkUrl' | 'name' | 'description',
    value: string
  ) => {
    setData((prev) => {
      const updated = [...prev.messageSection.companies];
      if (!updated[index]) return prev;
      if (field === 'numberBadge' || field === 'linkUrl') {
        updated[index] = { ...updated[index], [field]: value };
      } else {
        updated[index] = {
          ...updated[index],
          [field]: {
            ...updated[index][field],
            [activeLangTab]: value,
          },
        };
      }
      return {
        ...prev,
        messageSection: {
          ...prev.messageSection,
          companies: updated,
        },
      };
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-20">
        {/* TOP HEADER BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#14112E] p-6 rounded-2xl border border-white/10 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 shrink-0">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white flex items-center gap-2 flex-wrap">
                <span>Founder & Executive Message</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-semibold border border-rose-500/30">
                  CMS Section
                </span>
              </h1>
              <p className="text-xs text-white/50 mt-0.5">
                Manage the founder profile card, leadership letter, group companies showcase, and commitment highlight card.
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Bilingual Switcher */}
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

            {/* Reset Defaults Button */}
            <Button
              type="button"
              onClick={handleReset}
              variant="outline"
              size="sm"
              disabled={saving}
              className="border-white/10 text-white/70 hover:text-white hover:bg-white/10 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Reset Founder section to default content"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${saving ? 'animate-spin' : ''}`} />
              Reset Default
            </Button>

            {/* Save Button */}
            <Button
              type="button"
              onClick={handleSave}
              disabled={saving}
              size="sm"
              className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs font-bold px-4 py-2 rounded-lg flex items-center gap-2 cursor-pointer shadow-lg shadow-[#F68E2D]/20"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-white/60 bg-[#0b1028] rounded-2xl border border-white/10">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#F68E2D]" />
            <p className="text-sm">Loading Founder section data...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* CARD 1: TOP FOUNDER PROFILE CARD */}
            <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-300 font-bold text-xs flex items-center justify-center border border-rose-500/30">
                    1
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-white">
                      Top Founder Summary Card
                    </CardTitle>
                    <p className="text-xs text-white/50">
                      Executive portrait, role badge, founder name, and introductory note displayed in the top card.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Portrait Image Upload */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-white/15 bg-white/5 shrink-0">
                        {data.founderProfile.image ? (
                          <img
                            src={data.founderProfile.image}
                            alt={data.founderProfile.name.en}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-white/30">
                            <ImageIcon className="w-6 h-6" />
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-white/60">
                        <p className="font-semibold text-white mb-0.5">Founder Portrait</p>
                        <p>Square photo recommended (e.g. 400x400px).</p>
                      </div>
                    </div>

                    <ImageUploadField
                      label="Portrait Photo URL or Upload"
                      value={data.founderProfile.image}
                      onChange={(url) =>
                        setData((prev) => ({
                          ...prev,
                          founderProfile: { ...prev.founderProfile, image: url },
                        }))
                      }
                      folder="founder"
                      compact
                    />
                  </div>

                  {/* Text Fields */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                        Role Title Badge ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      <input
                        type="text"
                        dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                        value={data.founderProfile.role?.[activeLangTab] || ''}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            founderProfile: {
                              ...prev.founderProfile,
                              role: {
                                ...prev.founderProfile.role,
                                [activeLangTab]: e.target.value,
                              },
                            },
                          }))
                        }
                        placeholder="e.g. FOUNDER & CEO"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                        Founder Name ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      <input
                        type="text"
                        dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                        value={data.founderProfile.name?.[activeLangTab] || ''}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            founderProfile: {
                              ...prev.founderProfile,
                              name: {
                                ...prev.founderProfile.name,
                                [activeLangTab]: e.target.value,
                              },
                            },
                          }))
                        }
                        placeholder="e.g. Dr. Ahmed Dhahir"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                        Card Bottom Caption ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      <input
                        type="text"
                        dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                        value={data.founderProfile.subtitle?.[activeLangTab] || ''}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            founderProfile: {
                              ...prev.founderProfile,
                              subtitle: {
                                ...prev.founderProfile.subtitle,
                                [activeLangTab]: e.target.value,
                              },
                            },
                          }))
                        }
                        placeholder="e.g. A message from our founder"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CARD 2: MESSAGE HEADER & INTRO NARRATIVE */}
            <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-bold text-xs flex items-center justify-center border border-[#F68E2D]/30">
                    2
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-white">
                      Message Heading & Opening Letter
                    </CardTitle>
                    <p className="text-xs text-white/50">
                      Main section eyebrow, display heading, greeting statement, and opening narrative paragraphs.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                      Eyebrow Tagline ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                    </label>
                    <input
                      type="text"
                      dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                      value={data.messageSection.eyebrow?.[activeLangTab] || ''}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          messageSection: {
                            ...prev.messageSection,
                            eyebrow: {
                              ...prev.messageSection.eyebrow,
                              [activeLangTab]: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="e.g. A MESSAGE FROM OUR FOUNDER"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                      Main Section Heading ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                    </label>
                    <input
                      type="text"
                      dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                      value={data.messageSection.heading?.[activeLangTab] || ''}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          messageSection: {
                            ...prev.messageSection,
                            heading: {
                              ...prev.messageSection.heading,
                              [activeLangTab]: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="e.g. Building a Vision for Lasting Impact"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                    Bold Greeting Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <input
                    type="text"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                    value={data.messageSection.greeting?.[activeLangTab] || ''}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        messageSection: {
                          ...prev.messageSection,
                          greeting: {
                            ...prev.messageSection.greeting,
                            [activeLangTab]: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="e.g. Welcome to Mubtaker Group."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                  />
                </div>

                {/* Opening Paragraphs */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-[#F68E2D]" />
                      Opening Narrative Paragraphs ({data.messageSection.introParagraphs.length})
                    </label>
                    <Button
                      type="button"
                      onClick={() => handleAddParagraph('introParagraphs')}
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Paragraph
                    </Button>
                  </div>

                  {data.messageSection.introParagraphs.map((para, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10"
                    >
                      <span className="text-xs font-bold text-white/40 pt-2 w-6 text-center shrink-0">
                        P{idx + 1}
                      </span>
                      <textarea
                        rows={2}
                        dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                        value={para?.[activeLangTab] || ''}
                        onChange={(e) =>
                          handleUpdateParagraph('introParagraphs', idx, e.target.value)
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F68E2D]"
                      />
                      {data.messageSection.introParagraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteParagraph('introParagraphs', idx)}
                          className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                          title="Delete paragraph"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CARD 3: OUR GROUP OF COMPANIES LIST */}
            <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 font-bold text-xs flex items-center justify-center border border-purple-500/30">
                    3
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-white">
                      Group of Companies Spotlight
                    </CardTitle>
                    <p className="text-xs text-white/50">
                      Numbered company blocks (01, 02, 03) embedded inside the Founder's letter.
                    </p>
                  </div>
                </div>

                <Button
                  type="button"
                  onClick={handleAddCompany}
                  variant="outline"
                  size="sm"
                  className="border-white/10 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Company
                </Button>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                    Companies Group Subheading ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                  </label>
                  <input
                    type="text"
                    dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                    value={data.messageSection.companiesHeading?.[activeLangTab] || ''}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        messageSection: {
                          ...prev.messageSection,
                          companiesHeading: {
                            ...prev.messageSection.companiesHeading,
                            [activeLangTab]: e.target.value,
                          },
                        },
                      }))
                    }
                    placeholder="e.g. OUR GROUP OF COMPANIES"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-4">
                  {data.messageSection.companies.map((comp, idx) => (
                    <div
                      key={comp.id || idx}
                      className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 rounded-md bg-rose-950/70 text-rose-400 border border-rose-500/30 font-mono text-xs font-bold">
                            {comp.numberBadge || String(idx + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm font-bold text-white">
                            {comp.name?.[activeLangTab] || comp.name?.en}
                          </span>
                        </div>
                        {data.messageSection.companies.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCompany(idx)}
                            className="p-1.5 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                            title="Delete company"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-[11px] font-semibold text-white/60 uppercase mb-1">
                            Badge #
                          </label>
                          <input
                            type="text"
                            value={comp.numberBadge || ''}
                            onChange={(e) =>
                              handleCompanyFieldChange(idx, 'numberBadge', e.target.value)
                            }
                            placeholder="01"
                            className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white font-mono text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>

                        <div className="md:col-span-5">
                          <label className="block text-[11px] font-semibold text-white/60 uppercase mb-1">
                            Company Name ({activeLangTab === 'en' ? 'EN' : 'AR'})
                          </label>
                          <input
                            type="text"
                            dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                            value={comp.name?.[activeLangTab] || ''}
                            onChange={(e) =>
                              handleCompanyFieldChange(idx, 'name', e.target.value)
                            }
                            placeholder="Company Name"
                            className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>

                        <div className="md:col-span-5">
                          <label className="block text-[11px] font-semibold text-white/60 uppercase mb-1">
                            Target Link URL
                          </label>
                          <input
                            type="text"
                            value={comp.linkUrl || ''}
                            onChange={(e) =>
                              handleCompanyFieldChange(idx, 'linkUrl', e.target.value)
                            }
                            placeholder="/projects-innovator"
                            className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>

                        <div className="md:col-span-12">
                          <label className="block text-[11px] font-semibold text-white/60 uppercase mb-1">
                            Company Description ({activeLangTab === 'en' ? 'EN' : 'AR'})
                          </label>
                          <textarea
                            rows={2}
                            dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                            value={comp.description?.[activeLangTab] || ''}
                            onChange={(e) =>
                              handleCompanyFieldChange(idx, 'description', e.target.value)
                            }
                            placeholder="Brief overview of what the company delivers..."
                            className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* CARD 4: CLOSING PARAGRAPHS & SIGNATURE */}
            <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                    4
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-white">
                      Closing Reflections & Executive Signature
                    </CardTitle>
                    <p className="text-xs text-white/50">
                      Closing statements below the companies list, sign-off message, and founder signature.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-white/80 uppercase tracking-wider flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-emerald-400" />
                      Closing Paragraphs ({data.messageSection.closingParagraphs.length})
                    </label>
                    <Button
                      type="button"
                      onClick={() => handleAddParagraph('closingParagraphs')}
                      variant="outline"
                      size="sm"
                      className="border-white/10 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Paragraph
                    </Button>
                  </div>

                  {data.messageSection.closingParagraphs.map((para, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/10"
                    >
                      <span className="text-xs font-bold text-white/40 pt-2 w-6 text-center shrink-0">
                        P{idx + 1}
                      </span>
                      <textarea
                        rows={2}
                        dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                        value={para?.[activeLangTab] || ''}
                        onChange={(e) =>
                          handleUpdateParagraph('closingParagraphs', idx, e.target.value)
                        }
                        className="flex-1 px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                      />
                      {data.messageSection.closingParagraphs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleDeleteParagraph('closingParagraphs', idx)}
                          className="p-2 text-white/30 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
                          title="Delete paragraph"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-white/5">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                      Bold Sign-off Line ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                    </label>
                    <input
                      type="text"
                      dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                      value={data.messageSection.signOff?.[activeLangTab] || ''}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          messageSection: {
                            ...prev.messageSection,
                            signOff: {
                              ...prev.messageSection.signOff,
                              [activeLangTab]: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="e.g. Thank you for being part of our journey."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                      Signature Name ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                    </label>
                    <input
                      type="text"
                      dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                      value={data.messageSection.signatureName?.[activeLangTab] || ''}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          messageSection: {
                            ...prev.messageSection,
                            signatureName: {
                              ...prev.messageSection.signatureName,
                              [activeLangTab]: e.target.value,
                            },
                          },
                        }))
                      }
                      placeholder="e.g. Dr. Ahmed Dhahir"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CARD 5: RIGHT COLUMN VISUAL SHOWCASE & COMMITMENT CARD */}
            <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
              <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-300 font-bold text-xs flex items-center justify-center border border-sky-500/30">
                    5
                  </span>
                  <div>
                    <CardTitle className="text-base font-bold text-white">
                      Right Side Showcase Image & Commitment Card
                    </CardTitle>
                    <p className="text-xs text-white/50">
                      Architectural visual showcase, overlay headline, overlapping "Our Commitment" card, and bottom tagline.
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  {/* Showcase Image Upload */}
                  <div className="lg:col-span-4 space-y-3">
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/15 bg-white/5">
                      {data.showcaseSection.image ? (
                        <img
                          src={data.showcaseSection.image}
                          alt="Leadership Showcase"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white/30">
                          <Building2 className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    <ImageUploadField
                      label="Showcase Image URL or Upload"
                      value={data.showcaseSection.image}
                      onChange={(url) =>
                        setData((prev) => ({
                          ...prev,
                          showcaseSection: { ...prev.showcaseSection, image: url },
                        }))
                      }
                      folder="founder-showcase"
                      compact
                    />
                  </div>

                  {/* Overlay & Commitment Fields */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                          Image Overlay Label ({activeLangTab === 'en' ? 'EN' : 'AR'})
                        </label>
                        <input
                          type="text"
                          dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                          value={data.showcaseSection.label?.[activeLangTab] || ''}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              showcaseSection: {
                                ...prev.showcaseSection,
                                label: {
                                  ...prev.showcaseSection.label,
                                  [activeLangTab]: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="e.g. LEADERSHIP"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                          Image Overlay Title ({activeLangTab === 'en' ? 'EN' : 'AR'})
                        </label>
                        <input
                          type="text"
                          dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                          value={data.showcaseSection.title?.[activeLangTab] || ''}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              showcaseSection: {
                                ...prev.showcaseSection,
                                title: {
                                  ...prev.showcaseSection.title,
                                  [activeLangTab]: e.target.value,
                                },
                              },
                            }))
                          }
                          placeholder="e.g. A Vision Built on Trust"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>

                    {/* Floating Commitment Card Settings */}
                    <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-4">
                      <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        Commitment Floating Card
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[11px] font-semibold text-white/60 uppercase mb-1">
                            Card Subtitle ({activeLangTab === 'en' ? 'EN' : 'AR'})
                          </label>
                          <input
                            type="text"
                            dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                            value={data.showcaseSection.commitmentCard.label?.[activeLangTab] || ''}
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                showcaseSection: {
                                  ...prev.showcaseSection,
                                  commitmentCard: {
                                    ...prev.showcaseSection.commitmentCard,
                                    label: {
                                      ...prev.showcaseSection.commitmentCard.label,
                                      [activeLangTab]: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            placeholder="Our Commitment"
                            className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-white/60 uppercase mb-1">
                            Card Red Title ({activeLangTab === 'en' ? 'EN' : 'AR'})
                          </label>
                          <input
                            type="text"
                            dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                            value={data.showcaseSection.commitmentCard.title?.[activeLangTab] || ''}
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                showcaseSection: {
                                  ...prev.showcaseSection,
                                  commitmentCard: {
                                    ...prev.showcaseSection.commitmentCard,
                                    title: {
                                      ...prev.showcaseSection.commitmentCard.title,
                                      [activeLangTab]: e.target.value,
                                    },
                                  },
                                },
                              }))
                            }
                            placeholder="Long-Term Value"
                            className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-white/60 uppercase mb-1">
                            Action Link (Optional)
                          </label>
                          <input
                            type="text"
                            value={data.showcaseSection.commitmentCard.linkUrl || ''}
                            onChange={(e) =>
                              setData((prev) => ({
                                ...prev,
                                showcaseSection: {
                                  ...prev.showcaseSection,
                                  commitmentCard: {
                                    ...prev.showcaseSection.commitmentCard,
                                    linkUrl: e.target.value,
                                  },
                                },
                              }))
                            }
                            placeholder="/about"
                            className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white/80 text-sm focus:outline-none focus:border-sky-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-white/60 uppercase mb-1">
                          Card Description ({activeLangTab === 'en' ? 'EN' : 'AR'})
                        </label>
                        <textarea
                          rows={2}
                          dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                          value={
                            data.showcaseSection.commitmentCard.description?.[activeLangTab] || ''
                          }
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              showcaseSection: {
                                ...prev.showcaseSection,
                                commitmentCard: {
                                  ...prev.showcaseSection.commitmentCard,
                                  description: {
                                    ...prev.showcaseSection.commitmentCard.description,
                                    [activeLangTab]: e.target.value,
                                  },
                                },
                              },
                            }))
                          }
                          placeholder="Building lasting partnerships through integrity, innovation, and shared success."
                          className="w-full px-3 py-2 rounded-lg bg-black/30 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                        Bottom Footer Quote ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      <input
                        type="text"
                        dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}
                        value={data.showcaseSection.bottomTagline?.[activeLangTab] || ''}
                        onChange={(e) =>
                          setData((prev) => ({
                            ...prev,
                            showcaseSection: {
                              ...prev.showcaseSection,
                              bottomTagline: {
                                ...prev.showcaseSection.bottomTagline,
                                [activeLangTab]: e.target.value,
                              },
                            },
                          }))
                        }
                        placeholder="e.g. Together, we build opportunities for a better future."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* HIGH-FIDELITY LIVE PREVIEW MODAL MATCHING UPLOADED REFERENCE SCREENSHOT */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col p-2 sm:p-6 overflow-hidden">
          <div className="bg-[#14112E] p-4 rounded-t-2xl border border-white/15 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Founder & Executive Message Live Preview</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-medium">
                  {data.founderProfile.name[previewLang] || data.founderProfile.name.en}
                </span>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Switch */}
              <div className="bg-black/50 p-1 rounded-xl border border-white/10 flex items-center">
                <button
                  type="button"
                  onClick={() => setPreviewLang('en')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewLang === 'en' ? 'bg-[#F68E2D] text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewLang('ar')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    previewLang === 'ar' ? 'bg-[#F68E2D] text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  AR
                </button>
              </div>

              {/* Device Switch */}
              <div className="bg-black/50 p-1 rounded-xl border border-white/10 flex items-center">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    previewDevice === 'desktop'
                      ? 'bg-purple-600 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                  title="Desktop Preview"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                    previewDevice === 'mobile'
                      ? 'bg-purple-600 text-white'
                      : 'text-white/60 hover:text-white'
                  }`}
                  title="Mobile Preview"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 bg-[#0a0b0d] overflow-y-auto rounded-b-2xl border-x border-b border-white/15 p-4 sm:p-10 flex justify-center">
            <div
              dir={previewLang === 'ar' ? 'rtl' : 'ltr'}
              className={`w-full transition-all text-white font-sans space-y-10 ${
                previewDevice === 'mobile'
                  ? 'max-w-md bg-[#0e1013] p-5 rounded-2xl border border-white/10'
                  : 'max-w-6xl'
              }`}
            >
              {/* 1. TOP FOUNDER IDENTITY BANNER */}
              <div className="rounded-2xl bg-[#15171b] border border-white/10 p-5 sm:p-6 shadow-xl">
                <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                  <img
                    src={data.founderProfile.image}
                    alt={data.founderProfile.name[previewLang]}
                    className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <p className="text-[11px] font-bold tracking-widest text-red-500 uppercase">
                      {data.founderProfile.role?.[previewLang] || data.founderProfile.role?.en}
                    </p>
                    <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                      {data.founderProfile.name?.[previewLang] || data.founderProfile.name?.en}
                    </h4>
                    <div className="w-8 h-[2px] bg-red-600 mt-1.5" />
                  </div>
                </div>
                <p className="text-xs text-white/60 mt-3">
                  {data.founderProfile.subtitle?.[previewLang] || data.founderProfile.subtitle?.en}
                </p>
              </div>

              {/* 2. TWO-COLUMN MESSAGE + SHOWCASE LAYOUT */}
              <div
                className={`grid gap-8 items-start ${
                  previewDevice === 'mobile' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'
                }`}
              >
                {/* Left Narrative Column (7 cols) */}
                <div className={previewDevice === 'mobile' ? 'space-y-6' : 'lg:col-span-7 space-y-6'}>
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="w-5 h-[2px] bg-red-600 inline-block" />
                      <span className="text-[11px] font-bold tracking-widest text-red-500 uppercase">
                        {data.messageSection.eyebrow?.[previewLang] ||
                          data.messageSection.eyebrow?.en}
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                      {data.messageSection.heading?.[previewLang] ||
                        data.messageSection.heading?.en}
                    </h2>
                  </div>

                  {/* Narrative Card */}
                  <div className="rounded-2xl bg-[#15171b] border border-white/10 p-6 sm:p-8 space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {data.messageSection.greeting?.[previewLang] ||
                          data.messageSection.greeting?.en}
                      </h3>
                      <div className="space-y-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                        {data.messageSection.introParagraphs.map((p, i) => (
                          <p key={i}>{p?.[previewLang] || p?.en}</p>
                        ))}
                      </div>
                    </div>

                    {/* Group of Companies Subsection */}
                    <div className="pt-2 space-y-3">
                      <p className="text-[11px] font-bold tracking-widest text-red-500 uppercase">
                        {data.messageSection.companiesHeading?.[previewLang] ||
                          data.messageSection.companiesHeading?.en}
                      </p>

                      <div className="space-y-3">
                        {data.messageSection.companies.map((comp, idx) => (
                          <div
                            key={comp.id || idx}
                            className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-start gap-4 hover:border-red-500/30 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/20 text-red-500 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                              {comp.numberBadge || String(idx + 1).padStart(2, '0')}
                            </div>
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-white">
                                {comp.name?.[previewLang] || comp.name?.en}
                              </h4>
                              <p className="text-xs text-white/60 leading-relaxed">
                                {comp.description?.[previewLang] || comp.description?.en}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Closing Paragraphs */}
                    <div className="space-y-3 text-xs sm:text-sm text-white/70 leading-relaxed pt-2">
                      {data.messageSection.closingParagraphs.map((p, i) => (
                        <p key={i}>{p?.[previewLang] || p?.en}</p>
                      ))}
                    </div>

                    {/* Signature */}
                    <div className="pt-5 border-t border-white/10">
                      <p className="text-sm font-bold text-white">
                        {data.messageSection.signOff?.[previewLang] ||
                          data.messageSection.signOff?.en}
                      </p>
                      <p className="text-xs text-white/50 mt-1">
                        {data.messageSection.signatureName?.[previewLang] ||
                          data.messageSection.signatureName?.en}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Showcase Column (5 cols) */}
                <div className={previewDevice === 'mobile' ? 'space-y-4' : 'lg:col-span-5 pt-2'}>
                  <div className="relative">
                    {/* Architectural Image Container */}
                    <div className="relative rounded-2xl overflow-hidden aspect-[4/4.3] border border-white/10 shadow-2xl">
                      <img
                        src={data.showcaseSection.image}
                        alt={data.showcaseSection.title?.[previewLang]}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                      <div className="absolute bottom-10 inset-x-6 space-y-1">
                        <p className="text-[10px] font-bold tracking-widest text-white/70 uppercase">
                          {data.showcaseSection.label?.[previewLang] ||
                            data.showcaseSection.label?.en}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                          {data.showcaseSection.title?.[previewLang] ||
                            data.showcaseSection.title?.en}
                        </h3>
                      </div>
                    </div>

                    {/* Overlapping Commitment Card */}
                    <div className="relative -mt-8 mx-4 sm:ml-6 sm:mr-4 rounded-2xl bg-[#181a20] border border-white/15 p-5 shadow-2xl">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs text-white/60 font-medium mb-1">
                            {data.showcaseSection.commitmentCard.label?.[previewLang] ||
                              data.showcaseSection.commitmentCard.label?.en}
                          </p>
                          <h4 className="text-2xl font-extrabold text-red-600 leading-tight">
                            {data.showcaseSection.commitmentCard.title?.[previewLang] ||
                              data.showcaseSection.commitmentCard.title?.en}
                          </h4>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-red-950/70 border border-red-500/30 flex items-center justify-center text-red-500 shrink-0">
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="text-xs text-white/60 leading-relaxed mt-3">
                        {data.showcaseSection.commitmentCard.description?.[previewLang] ||
                          data.showcaseSection.commitmentCard.description?.en}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Tagline */}
                  <p className="text-[11px] text-white/50 text-center sm:text-left mt-6 px-4">
                    {data.showcaseSection.bottomTagline?.[previewLang] ||
                      data.showcaseSection.bottomTagline?.en}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default FounderPage;
