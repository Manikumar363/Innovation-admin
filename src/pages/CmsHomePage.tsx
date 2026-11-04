import React, { useState, useEffect } from 'react';
import {
  Plus,
  Trash2,
  Image as ImageIcon,
  Eye,
  RefreshCw,
  Sparkles,
  Building2,
  MapPin,
  Layers,
  X,
  User,
  Shield,
  Zap,
  Edit3,
  Home,
  Info,
  ShoppingBag,
  TrendingUp,
  FolderGit2,
  Users2,
  Mail,
  SlidersHorizontal,
  Search,
  ArrowLeft,
  Briefcase,
  Award,
  History,
  Target,
  Compass,
  HeartHandshake,
  Save,
  Download,
  FileText,
  Upload,
  ArrowUpRight,
  Stethoscope,
  Phone
} from 'lucide-react';
import { DashboardLayout } from '../components/ui/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { toast } from 'react-toastify';
import { ImageUploadField } from '../components/ui/ImageUploadField';
import {
  LucideIconSelect,
  LucideIcon,
  CORE_VALUES_ICONS,
  HISTORY_ICONS,
  PURPOSE_ICONS,
  OBJECTIVES_ICONS,
  COMPANY_CARD_ICONS,
  SERVICES_SOLUTION_ICONS,
  BUSINESS_AREA_ICONS,
  PROJECTS_INNOVATOR_AREA_ICONS,
  ALL_LUCIDE_ICONS,
} from '../components/ui/LucideIconSelect';
import {
  cmsService,
  initialCmsHomeData,
  ALL_CMS_TABS,
  type CmsHomeData,
  type TrustedBrand,
  type SectorItem,
  type CompanyItem,
  type PurposeTag,
  type CmsTabConfig,
  type CmsAboutData,
  type AboutJourneyItem,
  type AboutStatItem,
  type AboutLeaderItem,
  type AboutManagementDivision,
  type AboutManagementMember,
  type AboutCoreValueItem,
  type AboutHistoryItem,
  type AboutObjectiveItem,
  initialCmsAboutData,
  initialCmsCompanyData,
  type CmsCompanyData,
  type CompanyCard,
  type CompanyPrincipleItem,
  type CmsServicesData,
  type ServiceFeatureCard,
  type BusinessAreaCard,
  initialCmsServicesData,
  type CmsShopData,
  type ShopProductCard,
  type ShopProductBadge,
  initialCmsShopData,
  type CmsProjectsData,
  type ProjectCard,
  initialCmsProjectsData,
  type CmsPartnersData,
  type PartnerCard,
  initialCmsPartnersData,
  type CmsContactData,
  initialCmsContactData,
  type CmsInvestmentData,
  type InvestmentDriverItem,
  type InvestmentSectorItem,
  type InvestmentFactorItem,
  initialCmsInvestmentData,
  type CmsProjectsInnovatorData,
  type BrandLogoItem,
  type ProjectsInnovatorHeroBannerSection,
  type ProjectsInnovatorAboutSection,
  type ProjectsInnovatorWorkTogetherSection,
  initialCmsProjectsInnovatorData,
  type CmsAttractiveData,
  type CmsMedicsInnovatorData,
  initialCmsAttractiveData,
  initialCmsMedicsInnovatorData
} from '../services/cmsService';
import { API_BASE } from '../config/api';

interface CmsHomePageProps {
  role?: string;
}

export const CmsHomePage: React.FC<CmsHomePageProps> = ({ role = 'admin' }) => {
  const [data, setData] = useState<CmsHomeData>(initialCmsHomeData);
  const [aboutData, setAboutData] = useState<CmsAboutData>(initialCmsAboutData);
  const [companyData, setCompanyData] = useState<CmsCompanyData>(initialCmsCompanyData);
  const [servicesData, setServicesData] = useState<CmsServicesData>(initialCmsServicesData);
  const [shopData, setShopData] = useState<CmsShopData>(initialCmsShopData);
  const [projectsData, setProjectsData] = useState<CmsProjectsData>(initialCmsProjectsData);
  const [partnersData, setPartnersData] = useState<CmsPartnersData>(initialCmsPartnersData);
  const [contactData, setContactData] = useState<CmsContactData>(initialCmsContactData);
  const [investmentData, setInvestmentData] = useState<CmsInvestmentData>(initialCmsInvestmentData);
  const [projectsInnovatorData, setProjectsInnovatorData] = useState<CmsProjectsInnovatorData>(initialCmsProjectsInnovatorData);
  const [attractiveData, setAttractiveData] = useState<CmsAttractiveData>(initialCmsAttractiveData);
  const [medicsInnovatorData, setMedicsInnovatorData] = useState<CmsMedicsInnovatorData>(initialCmsMedicsInnovatorData);

  const ensureAttractiveDefaults = (res: CmsAttractiveData): CmsAttractiveData => ({
    ...initialCmsAttractiveData,
    ...res,
    heroBannerSection: {
      ...initialCmsAttractiveData.heroBannerSection,
      ...(res?.heroBannerSection || {}),
    },
    brandsSection: {
      ...initialCmsAttractiveData.brandsSection,
      ...(res?.brandsSection || {}),
      brands: res?.brandsSection?.brands && res.brandsSection.brands.length > 0
        ? res.brandsSection.brands
        : initialCmsAttractiveData.brandsSection.brands,
    },
    aboutSection: {
      ...initialCmsAttractiveData.aboutSection,
      ...(res?.aboutSection || {}),
    },
    productsSection: {
      ...initialCmsAttractiveData.productsSection,
      ...(res?.productsSection || {}),
      products: res?.productsSection?.products && res.productsSection.products.length > 0
        ? res.productsSection.products
        : initialCmsAttractiveData.productsSection.products,
    },
    workTogetherSection: {
      ...initialCmsAttractiveData.workTogetherSection,
      ...(res?.workTogetherSection || {}),
    },
  });

  const ensureMedicsInnovatorDefaults = (res: CmsMedicsInnovatorData): CmsMedicsInnovatorData => ({
    ...initialCmsMedicsInnovatorData,
    ...res,
    heroBannerSection: {
      ...initialCmsMedicsInnovatorData.heroBannerSection,
      ...(res?.heroBannerSection || {}),
    },
    brandsSection: {
      ...initialCmsMedicsInnovatorData.brandsSection,
      ...(res?.brandsSection || {}),
      brands: res?.brandsSection?.brands && res.brandsSection.brands.length > 0
        ? res.brandsSection.brands
        : initialCmsMedicsInnovatorData.brandsSection.brands,
    },
    aboutSection: {
      ...initialCmsMedicsInnovatorData.aboutSection,
      ...(res?.aboutSection || {}),
    },
    productsSection: {
      ...initialCmsMedicsInnovatorData.productsSection,
      ...(res?.productsSection || {}),
      products: res?.productsSection?.products && res.productsSection.products.length > 0
        ? res.productsSection.products
        : initialCmsMedicsInnovatorData.productsSection.products,
    },
    workTogetherSection: {
      ...initialCmsMedicsInnovatorData.workTogetherSection,
      ...(res?.workTogetherSection || {}),
    },
  });

  const ensureProjectsInnovatorDefaults = (res: CmsProjectsInnovatorData): CmsProjectsInnovatorData => ({
    ...initialCmsProjectsInnovatorData,
    ...res,
    heroBannerSection: {
      ...initialCmsProjectsInnovatorData.heroBannerSection,
      ...(res?.heroBannerSection || {}),
    },
    brandsSection: {
      ...initialCmsProjectsInnovatorData.brandsSection,
      ...(res?.brandsSection || {}),
      brands: res?.brandsSection?.brands && res.brandsSection.brands.length > 0
        ? res.brandsSection.brands
        : initialCmsProjectsInnovatorData.brandsSection.brands,
    },
    aboutSection: {
      ...initialCmsProjectsInnovatorData.aboutSection,
      ...(res?.aboutSection || {}),
    },
    businessAreasSection: {
      ...initialCmsProjectsInnovatorData.businessAreasSection,
      ...(res?.businessAreasSection || {}),
      areas: res?.businessAreasSection?.areas && res.businessAreasSection.areas.length > 0
        ? res.businessAreasSection.areas
        : initialCmsProjectsInnovatorData.businessAreasSection.areas,
    },
    workTogetherSection: {
      ...initialCmsProjectsInnovatorData.workTogetherSection,
      ...(res?.workTogetherSection || {}),
    },
  });

  const ensureContactDefaults = (res: CmsContactData): CmsContactData => ({
    ...initialCmsContactData,
    ...res,
    headerSection: {
      ...initialCmsContactData.headerSection,
      ...(res?.headerSection || {}),
    },
    corporateOfficeSection: {
      ...initialCmsContactData.corporateOfficeSection,
      ...(res?.corporateOfficeSection || {}),
    },
  });

  const ensurePartnersDefaults = (res: CmsPartnersData): CmsPartnersData => ({
    ...initialCmsPartnersData,
    ...res,
    headerSection: {
      ...initialCmsPartnersData.headerSection,
      ...(res?.headerSection || {}),
      partners: res?.headerSection?.partners && res.headerSection.partners.length > 0
        ? res.headerSection.partners
        : initialCmsPartnersData.headerSection.partners,
    },
    bannerSection: {
      ...initialCmsPartnersData.bannerSection,
      ...(res?.bannerSection || {}),
    },
  });

  const ensureProjectsDefaults = (res: CmsProjectsData): CmsProjectsData => ({
    ...initialCmsProjectsData,
    ...res,
    headerSection: {
      ...initialCmsProjectsData.headerSection,
      ...(res?.headerSection || {}),
      projects: res?.headerSection?.projects && res.headerSection.projects.length > 0
        ? res.headerSection.projects
        : initialCmsProjectsData.headerSection.projects,
    },
    bannerSection: {
      ...initialCmsProjectsData.bannerSection,
      ...(res?.bannerSection || {}),
    },
  });

  const ensureShopDefaults = (res: CmsShopData): CmsShopData => ({
    ...initialCmsShopData,
    ...res,
    headerSection: {
      ...initialCmsShopData.headerSection,
      ...(res?.headerSection || {}),
      products: res?.headerSection?.products && res.headerSection.products.length > 0
        ? res.headerSection.products
        : initialCmsShopData.headerSection.products,
    },
  });

  const ensureServicesDefaults = (res: CmsServicesData): CmsServicesData => ({
    ...initialCmsServicesData,
    ...res,
    headerSection: {
      ...initialCmsServicesData.headerSection,
      ...(res?.headerSection || {}),
      cards: res?.headerSection?.cards && res.headerSection.cards.length > 0
        ? res.headerSection.cards
        : initialCmsServicesData.headerSection.cards,
    },
    businessAreasSection: {
      ...initialCmsServicesData.businessAreasSection,
      ...(res?.businessAreasSection || {}),
      cards: res?.businessAreasSection?.cards && res.businessAreasSection.cards.length > 0
        ? res.businessAreasSection.cards
        : initialCmsServicesData.businessAreasSection.cards,
    },
  });

  const ensureCompanyDefaults = (res: CmsCompanyData): CmsCompanyData => ({
    ...initialCmsCompanyData,
    ...res,
    headerSection: {
      ...initialCmsCompanyData.headerSection,
      ...(res?.headerSection || {}),
    },
    whoWeAreSection: {
      ...initialCmsCompanyData.whoWeAreSection,
      ...(res?.whoWeAreSection || {}),
      cards: res?.whoWeAreSection?.cards && res.whoWeAreSection.cards.length > 0
        ? res.whoWeAreSection.cards
        : initialCmsCompanyData.whoWeAreSection.cards,
    },
    whatGuidesUsSection: {
      ...initialCmsCompanyData.whatGuidesUsSection,
      ...(res?.whatGuidesUsSection || {}),
      principles: res?.whatGuidesUsSection?.principles && res.whatGuidesUsSection.principles.length > 0
        ? res.whatGuidesUsSection.principles
        : initialCmsCompanyData.whatGuidesUsSection.principles,
      downloadBox: {
        ...initialCmsCompanyData.whatGuidesUsSection.downloadBox,
        ...(res?.whatGuidesUsSection?.downloadBox || {}),
      },
    },
  });
  const [tabsConfig, setTabsConfig] = useState<CmsTabConfig[]>(ALL_CMS_TABS);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'ar'>('en');
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [previewLang, setPreviewLang] = useState<'en' | 'ar'>('en');

  // Navigation mode: 'grid' (overview cards) or 'editor' (editing entire page)
  const [viewMode, setViewMode] = useState<'grid' | 'editor'>('grid');
  const [editingTabId, setEditingTabId] = useState<string>('home');

  // Filter tag & Search
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    loadData();
  }, []);


  // Helper to safely ensure all 10 About Us sections have complete defaults
  const ensureAboutDefaults = (res: CmsAboutData): CmsAboutData => ({
    ...initialCmsAboutData,
    ...res,
    headerSection: { ...initialCmsAboutData.headerSection, ...(res?.headerSection || {}) },
    heritageSection: { ...initialCmsAboutData.heritageSection, ...(res?.heritageSection || {}) },
    journeySection: {
      ...initialCmsAboutData.journeySection,
      ...(res?.journeySection || {}),
      items: res?.journeySection?.items && res.journeySection.items.length > 0
        ? res.journeySection.items
        : initialCmsAboutData.journeySection.items,
    },
    impactSection: {
      ...initialCmsAboutData.impactSection,
      ...(res?.impactSection || {}),
      stats: res?.impactSection?.stats && res.impactSection.stats.length > 0
        ? res.impactSection.stats
        : initialCmsAboutData.impactSection.stats,
    },
    leadershipSection: {
      ...initialCmsAboutData.leadershipSection,
      ...(res?.leadershipSection || {}),
      leaders: res?.leadershipSection?.leaders && res.leadershipSection.leaders.length > 0
        ? res.leadershipSection.leaders
        : initialCmsAboutData.leadershipSection.leaders,
    },
    managementSection: {
      ...initialCmsAboutData.managementSection,
      ...(res?.managementSection || {}),
      divisions: res?.managementSection?.divisions && res.managementSection.divisions.length > 0
        ? res.managementSection.divisions
        : initialCmsAboutData.managementSection.divisions,
    },
    coreValuesSection: {
      ...initialCmsAboutData.coreValuesSection,
      ...(res?.coreValuesSection || {}),
      values: res?.coreValuesSection?.values && res.coreValuesSection.values.length > 0
        ? res.coreValuesSection.values
        : initialCmsAboutData.coreValuesSection.values,
    },
    historySection: {
      ...initialCmsAboutData.historySection,
      ...(res?.historySection || {}),
      items: res?.historySection?.items && res.historySection.items.length > 0
        ? res.historySection.items
        : initialCmsAboutData.historySection.items,
    },
    purposeSection: {
      ...initialCmsAboutData.purposeSection,
      ...(res?.purposeSection || {}),
      objectives: res?.purposeSection?.objectives && res.purposeSection.objectives.length > 0
        ? res.purposeSection.objectives
        : initialCmsAboutData.purposeSection.objectives,
    },
    bannerSection: {
      ...initialCmsAboutData.bannerSection,
      ...(res?.bannerSection || {}),
    },
  });

  // Helper to render icon component dynamically via Lucide library
  const renderCustomIcon = (iconName: string, className = "w-5 h-5") => {
    return <LucideIcon name={iconName} className={className} />;
  };

  const ensureHomeDefaults = (res: CmsHomeData): CmsHomeData => ({
    ...initialCmsHomeData,
    ...res,
    hero: { ...initialCmsHomeData.hero, ...(res.hero || {}) },
    trustedBrands: res.trustedBrands || initialCmsHomeData.trustedBrands,
    aboutSectorsSection: {
      ...initialCmsHomeData.aboutSectorsSection,
      ...(res.aboutSectorsSection || {}),
      sectors: res.aboutSectorsSection?.sectors || initialCmsHomeData.aboutSectorsSection.sectors,
    },
    companiesSection: {
      ...initialCmsHomeData.companiesSection,
      ...(res.companiesSection || {}),
      companies: (res.companiesSection?.companies || initialCmsHomeData.companiesSection.companies).map((c, i) => ({
        ...c,
        color: c.color || (i === 0 ? 'red' : 'blue'),
      })),
    },
    purposeSection: {
      ...initialCmsHomeData.purposeSection,
      ...(res.purposeSection || {}),
      tags: res.purposeSection?.tags || initialCmsHomeData.purposeSection.tags,
    },
    bannerSection: {
      ...initialCmsHomeData.bannerSection,
      ...(res.bannerSection || {}),
    },
  });

    const ensureInvestmentDefaults = (res: CmsInvestmentData): CmsInvestmentData => ({
    ...initialCmsInvestmentData,
    ...res,
    headerSection: {
      ...initialCmsInvestmentData.headerSection,
      ...(res?.headerSection || {}),
    },
    missionSection: {
      ...initialCmsInvestmentData.missionSection,
      ...(res?.missionSection || {}),
    },
    driversSection: {
      ...initialCmsInvestmentData.driversSection,
      ...(res?.driversSection || {}),
      drivers: res?.driversSection?.drivers && res.driversSection.drivers.length > 0
        ? res.driversSection.drivers
        : initialCmsInvestmentData.driversSection.drivers,
    },
    sectorsSection: {
      ...initialCmsInvestmentData.sectorsSection,
      ...(res?.sectorsSection || {}),
      sectors: res?.sectorsSection?.sectors && res.sectorsSection.sectors.length > 0
        ? res.sectorsSection.sectors
        : initialCmsInvestmentData.sectorsSection.sectors,
    },
    environmentSection: {
      ...initialCmsInvestmentData.environmentSection,
      ...(res?.environmentSection || {}),
      factors: res?.environmentSection?.factors && res.environmentSection.factors.length > 0
        ? res.environmentSection.factors
        : initialCmsInvestmentData.environmentSection.factors,
      foundationBox: {
        ...initialCmsInvestmentData.environmentSection.foundationBox,
        ...(res?.environmentSection?.foundationBox || {}),
      },
    },
    bannerSection: {
      ...initialCmsInvestmentData.bannerSection,
      ...(res?.bannerSection || {}),
    },
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const [homeRes, aboutRes, companyRes, servicesRes, shopRes, projectsRes, partnersRes, contactRes, investmentRes, projectsInnovatorRes, attractiveRes, medicsInnovatorRes] = await Promise.all([
        cmsService.getCmsHome(),
        cmsService.getCmsAbout(),
        cmsService.getCmsCompany(),
        cmsService.getCmsServices(),
        cmsService.getCmsShop(),
        cmsService.getCmsProjects(),
        cmsService.getCmsPartners(),
        cmsService.getCmsContact(),
        cmsService.getCmsInvestment(),
        cmsService.getCmsProjectsInnovator(),
        cmsService.getCmsAttractive(),
        cmsService.getCmsMedicsInnovator(),
      ]);
      setData(ensureHomeDefaults(homeRes));
      if (aboutRes) {
        setAboutData(ensureAboutDefaults(aboutRes));
      }
      if (companyRes) {
        setCompanyData(ensureCompanyDefaults(companyRes));
      }
      if (servicesRes) {
        setServicesData(ensureServicesDefaults(servicesRes));
      }
      if (shopRes) {
        setShopData(ensureShopDefaults(shopRes));
      }
      if (projectsRes) {
        setProjectsData(ensureProjectsDefaults(projectsRes));
      }
      if (partnersRes) {
        setPartnersData(ensurePartnersDefaults(partnersRes));
      }
      if (contactRes) {
        setContactData(ensureContactDefaults(contactRes));
      }
      if (investmentRes) {
        setInvestmentData(ensureInvestmentDefaults(investmentRes));
      }
      if (projectsInnovatorRes) {
        setProjectsInnovatorData(ensureProjectsInnovatorDefaults(projectsInnovatorRes));
      }
      if (attractiveRes) {
        setAttractiveData(ensureAttractiveDefaults(attractiveRes));
      }
      if (medicsInnovatorRes) {
        setMedicsInnovatorData(ensureMedicsInnovatorDefaults(medicsInnovatorRes));
      }
      const loadedTabs = cmsService.getAllTabs();
      setTabsConfig(loadedTabs);
    } catch (err) {
      console.error('Error loading CMS data:', err);
      toast.error('Failed to load CMS data from server');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenPageEditor = (tabId: string) => {
    setEditingTabId(tabId);
    setViewMode('editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToOverview = () => {
    setViewMode('grid');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveHomeData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsHome(data);
      toast.success('Home page sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save home page sections');
    } finally {
      setSaving(false);
    }
  };


  // Save About Us Data

  // ==================== COMPANY PROFILE HANDLERS ====================

  // ==================== SERVICES HANDLERS ====================
  const handleSaveServicesData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsServices(servicesData);
      toast.success('Services sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Services sections');
    } finally {
      setSaving(false);
    }
  };

  // Section 1: Solution Feature Cards
  const handleAddServiceCard = () => {
    const newCard: ServiceFeatureCard = {
      id: `card-serv-${Date.now()}`,
      icon: 'Microscope',
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
    };
    setServicesData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        cards: [...(prev.headerSection?.cards || []), newCard],
      },
    }));
    toast.success('New service solution card added');
  };

  const handleRemoveServiceCard = (index: number) => {
    setServicesData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        cards: prev.headerSection.cards.filter((_, i) => i !== index),
      },
    }));
  };

  const handleServiceCardChange = (
    index: number,
    field: 'icon' | 'title' | 'description',
    langOrVal: string,
    val?: string
  ) => {
    setServicesData((prev) => {
      const list = [...(prev.headerSection?.cards || [])];
      if (field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        headerSection: {
          ...prev.headerSection,
          cards: list,
        },
      };
    });
  };

  // Section 2: Business Area Cards
  const handleAddBusinessAreaCard = () => {
    const newCard: BusinessAreaCard = {
      id: `card-area-${Date.now()}`,
      icon: 'Microscope',
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
      linkUrl: '',
    };
    setServicesData((prev) => ({
      ...prev,
      businessAreasSection: {
        ...prev.businessAreasSection,
        cards: [...(prev.businessAreasSection?.cards || []), newCard],
      },
    }));
    toast.success('New business area added');
  };

  const handleRemoveBusinessAreaCard = (index: number) => {
    setServicesData((prev) => ({
      ...prev,
      businessAreasSection: {
        ...prev.businessAreasSection,
        cards: prev.businessAreasSection.cards.filter((_, i) => i !== index),
      },
    }));
  };

  const handleBusinessAreaCardChange = (
    index: number,
    field: 'icon' | 'title' | 'description' | 'linkUrl',
    langOrVal: string,
    val?: string
  ) => {
    setServicesData((prev) => {
      const list = [...(prev.businessAreasSection?.cards || [])];
      if (field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        businessAreasSection: {
          ...prev.businessAreasSection,
          cards: list,
        },
      };
    });
  };

  const handleSaveShopData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsShop(shopData);
      toast.success('Shop page products updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Shop page products');
    } finally {
      setSaving(false);
    }
  };

  // Section 1: Shop Products Handlers
  const handleAddProduct = () => {
    const newProduct: ShopProductCard = {
      id: `prod-${Date.now()}`,
      image: '',
      brand: { en: '', ar: '' },
      name: { en: '', ar: '' },
      description: { en: '', ar: '' },
      badges: [{ id: `badge-${Date.now()}-1`, en: 'CE Certified', ar: 'معتمد من CE' }],
      buttonText: { en: 'Request a Quote', ar: 'طلب عرض أسعار' },
      buttonUrl: '/contact',
    };
    setShopData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        products: [...(prev.headerSection?.products || []), newProduct],
      },
    }));
    toast.success('New product added');
  };

  const handleRemoveProduct = (index: number) => {
    setShopData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        products: prev.headerSection.products.filter((_, i) => i !== index),
      },
    }));
  };

  const handleProductChange = (
    index: number,
    field: 'image' | 'buttonUrl' | 'brand' | 'name' | 'description' | 'buttonText',
    langOrVal: string,
    val?: string
  ) => {
    setShopData((prev) => {
      const list = [...(prev.headerSection?.products || [])];
      if (field === 'brand' || field === 'name' || field === 'description' || field === 'buttonText') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        headerSection: {
          ...prev.headerSection,
          products: list,
        },
      };
    });
  };

  // Product Badges Handlers
  const handleAddProductBadge = (prodIndex: number) => {
    const newBadge: ShopProductBadge = {
      id: `b-${Date.now()}`,
      en: 'New Badge',
      ar: 'شارة جديدة',
    };
    setShopData((prev) => {
      const list = [...(prev.headerSection?.products || [])];
      list[prodIndex] = {
        ...list[prodIndex],
        badges: [...(list[prodIndex].badges || []), newBadge],
      };
      return {
        ...prev,
        headerSection: {
          ...prev.headerSection,
          products: list,
        },
      };
    });
    toast.success('New certification badge added');
  };

  const handleRemoveProductBadge = (prodIndex: number, badgeIndex: number) => {
    setShopData((prev) => {
      const list = [...(prev.headerSection?.products || [])];
      list[prodIndex] = {
        ...list[prodIndex],
        badges: list[prodIndex].badges.filter((_, i) => i !== badgeIndex),
      };
      return {
        ...prev,
        headerSection: {
          ...prev.headerSection,
          products: list,
        },
      };
    });
  };

  const handleProductBadgeChange = (
    prodIndex: number,
    badgeIndex: number,
    lang: 'en' | 'ar',
    val: string
  ) => {
    setShopData((prev) => {
      const list = [...(prev.headerSection?.products || [])];
      const badges = [...(list[prodIndex].badges || [])];
      badges[badgeIndex] = {
        ...badges[badgeIndex],
        [lang]: val,
      };
      list[prodIndex] = {
        ...list[prodIndex],
        badges,
      };
      return {
        ...prev,
        headerSection: {
          ...prev.headerSection,
          products: list,
        },
      };
    });
  };

  const handleSaveProjectsData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsProjects(projectsData);
      toast.success('Projects page sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Projects page sections');
    } finally {
      setSaving(false);
    }
  };

  // Section 1: Projects Handlers
  const handleAddProject = () => {
    const newProject: ProjectCard = {
      id: `proj-${Date.now()}`,
      category: { en: 'Innovation', ar: 'الابتكار' },
      status: { en: 'Ongoing', ar: 'قيد التنفيذ' },
      statusType: 'ongoing',
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
      linkUrl: '',
    };
    setProjectsData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        projects: [...(prev.headerSection?.projects || []), newProject],
      },
    }));
    toast.success('New project card added');
  };

  const handleRemoveProject = (index: number) => {
    setProjectsData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        projects: prev.headerSection.projects.filter((_, i) => i !== index),
      },
    }));
  };

  const handleProjectChange = (
    index: number,
    field: 'category' | 'status' | 'statusType' | 'title' | 'description' | 'linkUrl',
    langOrVal: string,
    val?: string
  ) => {
    setProjectsData((prev) => {
      const list = [...(prev.headerSection?.projects || [])];
      if (field === 'category' || field === 'status' || field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else if (field === 'statusType') {
        list[index] = {
          ...list[index],
          statusType: langOrVal as 'completed' | 'ongoing' | 'planned',
          status: {
            en: langOrVal === 'completed' ? 'Completed' : langOrVal === 'planned' ? 'Planned' : 'Ongoing',
            ar: langOrVal === 'completed' ? 'مكتمل' : langOrVal === 'planned' ? 'مخطط له' : 'قيد التنفيذ',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        headerSection: {
          ...prev.headerSection,
          projects: list,
        },
      };
    });
  };

  // Section 2: Banner Handlers
  const handleProjectsBannerChange = (
    field: 'tagline' | 'title' | 'description' | 'primaryButtonText' | 'primaryButtonUrl' | 'secondaryButtonText' | 'secondaryButtonUrl',
    langOrVal: string,
    val?: string
  ) => {
    setProjectsData((prev) => {
      if (
        field === 'tagline' ||
        field === 'title' ||
        field === 'description' ||
        field === 'primaryButtonText' ||
        field === 'secondaryButtonText'
      ) {
        return {
          ...prev,
          bannerSection: {
            ...prev.bannerSection,
            [field]: {
              ...prev.bannerSection[field],
              [langOrVal as 'en' | 'ar']: val || '',
            },
          },
        };
      }
      return {
        ...prev,
        bannerSection: {
          ...prev.bannerSection,
          [field]: langOrVal,
        },
      };
    });
  };

  const handleSavePartnersData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsPartners(partnersData);
      toast.success('Partners page sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Partners page sections');
    } finally {
      setSaving(false);
    }
  };

  // Section 1: Partners Handlers
  const handleAddPartner = () => {
    const newPartner: PartnerCard = {
      id: `partner-${Date.now()}`,
      logoUrl: '',
      category: { en: 'Technology Partner', ar: 'شريك تكنولوجي' },
      name: { en: '', ar: '' },
      description: { en: '', ar: '' },
      websiteUrl: 'https://',
      linkText: { en: 'Visit website', ar: 'زيارة الموقع' },
    };
    setPartnersData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        partners: [...(prev.headerSection?.partners || []), newPartner],
      },
    }));
    toast.success('New partner card added');
  };

  const handleRemovePartner = (index: number) => {
    setPartnersData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        partners: prev.headerSection.partners.filter((_, i) => i !== index),
      },
    }));
  };

  const handlePartnerChange = (
    index: number,
    field: 'logoUrl' | 'websiteUrl' | 'category' | 'name' | 'description' | 'linkText',
    langOrVal: string,
    val?: string
  ) => {
    setPartnersData((prev) => {
      const list = [...(prev.headerSection?.partners || [])];
      if (field === 'category' || field === 'name' || field === 'description' || field === 'linkText') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        headerSection: {
          ...prev.headerSection,
          partners: list,
        },
      };
    });
  };

  // Section 2: Banner Handlers
  const handlePartnersBannerChange = (
    field: 'tagline' | 'title' | 'description' | 'primaryButtonText' | 'primaryButtonUrl' | 'secondaryButtonText' | 'secondaryButtonUrl',
    langOrVal: string,
    val?: string
  ) => {
    setPartnersData((prev) => {
      if (
        field === 'tagline' ||
        field === 'title' ||
        field === 'description' ||
        field === 'primaryButtonText' ||
        field === 'secondaryButtonText'
      ) {
        return {
          ...prev,
          bannerSection: {
            ...prev.bannerSection,
            [field]: {
              ...prev.bannerSection[field],
              [langOrVal as 'en' | 'ar']: val || '',
            },
          },
        };
      }
      return {
        ...prev,
        bannerSection: {
          ...prev.bannerSection,
          [field]: langOrVal,
        },
      };
    });
  };

  const handleSaveContactData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsContact(contactData);
      toast.success('Contact page sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Contact page sections');
    } finally {
      setSaving(false);
    }
  };

  
  // Save Investment Data
  const handleSaveInvestmentData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsInvestment(investmentData);
      toast.success('Investment page sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Investment sections');
    } finally {
      setSaving(false);
    }
  };

  // ==================== PROJECTS INNOVATOR HANDLERS ====================
  const handleSaveProjectsInnovatorData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsProjectsInnovator(projectsInnovatorData);
      toast.success('Projects Innovator sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Projects Innovator sections');
    } finally {
      setSaving(false);
    }
  };

  const handlePIHeroBannerChange = (field: keyof ProjectsInnovatorHeroBannerSection, value: any) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      heroBannerSection: {
        ...prev.heroBannerSection,
        [field]: value,
      },
    }));
  };

  const handlePIHeroBannerBilingualChange = (
    field: 'logoText' | 'title' | 'titleHighlight' | 'description' | 'primaryButtonText' | 'secondaryButtonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      heroBannerSection: {
        ...prev.heroBannerSection,
        [field]: {
          ...prev.heroBannerSection[field],
          [lang]: value,
        },
      },
    }));
  };

  const handlePIBrandsTitleChange = (lang: 'en' | 'ar', value: string) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      brandsSection: {
        ...prev.brandsSection,
        title: {
          ...prev.brandsSection.title,
          [lang]: value,
        },
      },
    }));
  };

  const handlePIBrandItemChange = (index: number, field: keyof BrandLogoItem, value: string) => {
    setProjectsInnovatorData((prev) => {
      const updated = [...prev.brandsSection.brands];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        brandsSection: {
          ...prev.brandsSection,
          brands: updated,
        },
      };
    });
  };

  const handleAddPIBrand = () => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      brandsSection: {
        ...prev.brandsSection,
        brands: [
          ...prev.brandsSection.brands,
          {
            id: `brand-${Date.now()}`,
            name: 'New Brand',
            logoUrl: '',
          },
        ],
      },
    }));
  };

  const handleDeletePIBrand = (index: number) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      brandsSection: {
        ...prev.brandsSection,
        brands: prev.brandsSection.brands.filter((_, i) => i !== index),
      },
    }));
  };

  const handlePIAboutChange = (field: keyof ProjectsInnovatorAboutSection, value: any) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        [field]: value,
      },
    }));
  };

  const handlePIAboutBilingualChange = (
    field: 'tagline' | 'title' | 'description',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        [field]: {
          ...prev.aboutSection[field],
          [lang]: value,
        },
      },
    }));
  };

  const handlePIBusinessAreasHeaderChange = (
    field: 'title' | 'description',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      businessAreasSection: {
        ...prev.businessAreasSection,
        [field]: {
          ...prev.businessAreasSection[field],
          [lang]: value,
        },
      },
    }));
  };

  const handlePIBusinessAreaItemChange = (index: number, field: 'icon' | 'linkUrl', value: string) => {
    setProjectsInnovatorData((prev) => {
      const updated = [...prev.businessAreasSection.areas];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        businessAreasSection: {
          ...prev.businessAreasSection,
          areas: updated,
        },
      };
    });
  };

  const handlePIBusinessAreaBilingualChange = (
    index: number,
    field: 'title' | 'description',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setProjectsInnovatorData((prev) => {
      const updated = [...prev.businessAreasSection.areas];
      updated[index] = {
        ...updated[index],
        [field]: {
          ...updated[index][field],
          [lang]: value,
        },
      };
      return {
        ...prev,
        businessAreasSection: {
          ...prev.businessAreasSection,
          areas: updated,
        },
      };
    });
  };

  const handleAddPIBusinessArea = () => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      businessAreasSection: {
        ...prev.businessAreasSection,
        areas: [
          ...prev.businessAreasSection.areas,
          {
            id: `area-${Date.now()}`,
            icon: 'microscope',
            title: { en: 'New Business Area', ar: 'مجال عمل جديد' },
            description: { en: 'Comprehensive solutions and services description.', ar: 'وصف شامل للحلول والخدمات.' },
            linkUrl: '/services',
          },
        ],
      },
    }));
  };

  const handleDeletePIBusinessArea = (index: number) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      businessAreasSection: {
        ...prev.businessAreasSection,
        areas: prev.businessAreasSection.areas.filter((_, i) => i !== index),
      },
    }));
  };

  const handlePIWorkTogetherChange = (field: keyof ProjectsInnovatorWorkTogetherSection, value: any) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      workTogetherSection: {
        ...prev.workTogetherSection,
        [field]: value,
      },
    }));
  };

  const handlePIWorkTogetherBilingualChange = (
    field: 'tagline' | 'title' | 'description' | 'primaryButtonText' | 'secondaryButtonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setProjectsInnovatorData((prev) => ({
      ...prev,
      workTogetherSection: {
        ...prev.workTogetherSection,
        [field]: {
          ...prev.workTogetherSection[field],
          [lang]: value,
        },
      },
    }));
  };

  // ==================== ATTRACTIVE HANDLERS ====================
  const handleSaveAttractiveData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsAttractive(attractiveData);
      toast.success('Attractive sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Attractive sections');
    } finally {
      setSaving(false);
    }
  };

  const handleAttHeroBannerChange = (field: keyof ProjectsInnovatorHeroBannerSection, value: any) => {
    setAttractiveData((prev) => ({
      ...prev,
      heroBannerSection: {
        ...prev.heroBannerSection,
        [field]: value,
      },
    }));
  };

  const handleAttHeroBannerBilingualChange = (
    field: 'logoText' | 'title' | 'titleHighlight' | 'description' | 'primaryButtonText' | 'secondaryButtonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setAttractiveData((prev) => ({
      ...prev,
      heroBannerSection: {
        ...prev.heroBannerSection,
        [field]: {
          ...prev.heroBannerSection[field],
          [lang]: value,
        },
      },
    }));
  };

  const handleAttBrandsTitleChange = (lang: 'en' | 'ar', value: string) => {
    setAttractiveData((prev) => ({
      ...prev,
      brandsSection: {
        ...prev.brandsSection,
        title: {
          ...prev.brandsSection.title,
          [lang]: value,
        },
      },
    }));
  };

  const handleAttBrandItemChange = (index: number, field: keyof BrandLogoItem, value: string) => {
    setAttractiveData((prev) => {
      const updated = [...prev.brandsSection.brands];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        brandsSection: {
          ...prev.brandsSection,
          brands: updated,
        },
      };
    });
  };

  const handleAddAttBrand = () => {
    setAttractiveData((prev) => ({
      ...prev,
      brandsSection: {
        ...prev.brandsSection,
        brands: [
          ...prev.brandsSection.brands,
          {
            id: `brand-${Date.now()}`,
            name: 'New Brand',
            logoUrl: '',
          },
        ],
      },
    }));
  };

  const handleDeleteAttBrand = (index: number) => {
    setAttractiveData((prev) => ({
      ...prev,
      brandsSection: {
        ...prev.brandsSection,
        brands: prev.brandsSection.brands.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAttAboutChange = (field: keyof ProjectsInnovatorAboutSection, value: any) => {
    setAttractiveData((prev) => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        [field]: value,
      },
    }));
  };

  const handleAttAboutBilingualChange = (
    field: 'tagline' | 'title' | 'description',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setAttractiveData((prev) => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        [field]: {
          ...prev.aboutSection[field],
          [lang]: value,
        },
      },
    }));
  };

  // Products Handlers for Attractive
  const handleAttProductsHeaderBilingualChange = (
    field: 'title' | 'description' | 'viewAllButtonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setAttractiveData((prev) => ({
      ...prev,
      productsSection: {
        ...prev.productsSection,
        [field]: {
          ...prev.productsSection[field],
          [lang]: value,
        },
      },
    }));
  };

  const handleAttProductsChange = (field: 'viewAllButtonUrl', value: string) => {
    setAttractiveData((prev) => ({
      ...prev,
      productsSection: {
        ...prev.productsSection,
        [field]: value,
      },
    }));
  };

  const handleAttProductItemChange = (index: number, field: 'image' | 'buttonUrl', value: string) => {
    setAttractiveData((prev) => {
      const updated = [...prev.productsSection.products];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleAttProductItemBilingualChange = (
    index: number,
    field: 'brand' | 'name' | 'description' | 'buttonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setAttractiveData((prev) => {
      const updated = [...prev.productsSection.products];
      updated[index] = {
        ...updated[index],
        [field]: {
          ...updated[index][field],
          [lang]: value,
        },
      };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleAddAttProduct = () => {
    setAttractiveData((prev) => ({
      ...prev,
      productsSection: {
        ...prev.productsSection,
        products: [
          ...prev.productsSection.products,
          {
            id: `prod-${Date.now()}`,
            image: '',
            brand: { en: 'MedTech', ar: 'ميدتيك' },
            name: { en: 'New Product', ar: 'منتج جديد' },
            description: { en: 'High-grade equipment designed for professional use.', ar: 'معدات عالية الجودة مصممة للاستخدام الاحترافي.' },
            badges: [
              { id: `b-${Date.now()}-1`, en: 'CE Certified', ar: 'معتمد من CE' }
            ],
            buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
            buttonUrl: '/contact',
          },
        ],
      },
    }));
  };

  const handleDeleteAttProduct = (index: number) => {
    setAttractiveData((prev) => ({
      ...prev,
      productsSection: {
        ...prev.productsSection,
        products: prev.productsSection.products.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAddAttProductBadge = (productIndex: number) => {
    setAttractiveData((prev) => {
      const updated = [...prev.productsSection.products];
      updated[productIndex] = {
        ...updated[productIndex],
        badges: [
          ...updated[productIndex].badges,
          {
            id: `badge-${Date.now()}`,
            en: 'New Badge',
            ar: 'شارة جديدة',
          },
        ],
      };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleDeleteAttProductBadge = (productIndex: number, badgeIndex: number) => {
    setAttractiveData((prev) => {
      const updated = [...prev.productsSection.products];
      updated[productIndex] = {
        ...updated[productIndex],
        badges: updated[productIndex].badges.filter((_, i) => i !== badgeIndex),
      };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleAttProductBadgeBilingualChange = (
    productIndex: number,
    badgeIndex: number,
    lang: 'en' | 'ar',
    value: string
  ) => {
    setAttractiveData((prev) => {
      const updated = [...prev.productsSection.products];
      const badges = [...updated[productIndex].badges];
      badges[badgeIndex] = {
        ...badges[badgeIndex],
        [lang]: value,
      };
      updated[productIndex] = {
        ...updated[productIndex],
        badges,
      };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleAttWorkTogetherChange = (field: keyof ProjectsInnovatorWorkTogetherSection, value: any) => {
    setAttractiveData((prev) => ({
      ...prev,
      workTogetherSection: {
        ...prev.workTogetherSection,
        [field]: value,
      },
    }));
  };

  const handleAttWorkTogetherBilingualChange = (
    field: 'tagline' | 'title' | 'description' | 'primaryButtonText' | 'secondaryButtonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setAttractiveData((prev) => ({
      ...prev,
      workTogetherSection: {
        ...prev.workTogetherSection,
        [field]: {
          ...prev.workTogetherSection[field],
          [lang]: value,
        },
      },
    }));
  };

  // ==================== MEDICS INNOVATOR HANDLERS ====================
  const handleSaveMedicsInnovatorData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsMedicsInnovator(medicsInnovatorData);
      toast.success('Medics Innovator sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Medics Innovator sections');
    } finally {
      setSaving(false);
    }
  };

  const handleMIHeroBannerChange = (field: keyof ProjectsInnovatorHeroBannerSection, value: any) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      heroBannerSection: {
        ...prev.heroBannerSection,
        [field]: value,
      },
    }));
  };

  const handleMIHeroBannerBilingualChange = (
    field: 'logoText' | 'title' | 'titleHighlight' | 'description' | 'primaryButtonText' | 'secondaryButtonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      heroBannerSection: {
        ...prev.heroBannerSection,
        [field]: {
          ...prev.heroBannerSection[field],
          [lang]: value,
        },
      },
    }));
  };

  const handleMIBrandsTitleChange = (lang: 'en' | 'ar', value: string) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      brandsSection: {
        ...prev.brandsSection,
        title: {
          ...prev.brandsSection.title,
          [lang]: value,
        },
      },
    }));
  };

  const handleMIBrandItemChange = (index: number, field: keyof BrandLogoItem, value: string) => {
    setMedicsInnovatorData((prev) => {
      const updated = [...prev.brandsSection.brands];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        brandsSection: {
          ...prev.brandsSection,
          brands: updated,
        },
      };
    });
  };

  const handleAddMIBrand = () => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      brandsSection: {
        ...prev.brandsSection,
        brands: [
          ...prev.brandsSection.brands,
          {
            id: `brand-${Date.now()}`,
            name: 'New Brand',
            logoUrl: '',
          },
        ],
      },
    }));
  };

  const handleDeleteMIBrand = (index: number) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      brandsSection: {
        ...prev.brandsSection,
        brands: prev.brandsSection.brands.filter((_, i) => i !== index),
      },
    }));
  };

  const handleMIAboutChange = (field: keyof ProjectsInnovatorAboutSection, value: any) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        [field]: value,
      },
    }));
  };

  const handleMIAboutBilingualChange = (
    field: 'tagline' | 'title' | 'description',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      aboutSection: {
        ...prev.aboutSection,
        [field]: {
          ...prev.aboutSection[field],
          [lang]: value,
        },
      },
    }));
  };

  // Products Handlers for Medics Innovator
  const handleMIProductsHeaderBilingualChange = (
    field: 'title' | 'description' | 'viewAllButtonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      productsSection: {
        ...prev.productsSection,
        [field]: {
          ...prev.productsSection[field],
          [lang]: value,
        },
      },
    }));
  };

  const handleMIProductsChange = (field: 'viewAllButtonUrl', value: string) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      productsSection: {
        ...prev.productsSection,
        [field]: value,
      },
    }));
  };

  const handleMIProductItemChange = (index: number, field: 'image' | 'buttonUrl', value: string) => {
    setMedicsInnovatorData((prev) => {
      const updated = [...prev.productsSection.products];
      updated[index] = { ...updated[index], [field]: value };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleMIProductItemBilingualChange = (
    index: number,
    field: 'brand' | 'name' | 'description' | 'buttonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setMedicsInnovatorData((prev) => {
      const updated = [...prev.productsSection.products];
      updated[index] = {
        ...updated[index],
        [field]: {
          ...updated[index][field],
          [lang]: value,
        },
      };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleAddMIProduct = () => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      productsSection: {
        ...prev.productsSection,
        products: [
          ...prev.productsSection.products,
          {
            id: `prod-${Date.now()}`,
            image: '',
            brand: { en: 'MedTech', ar: 'ميدتيك' },
            name: { en: 'New Clinical Equipment', ar: 'جهاز سريري جديد' },
            description: { en: 'Advanced medical diagnostic solution designed for healthcare institutions.', ar: 'حل تشخيصي طبي متقدم مصمم للمؤسسات الصحية.' },
            badges: [
              { id: `b-${Date.now()}-1`, en: 'CE Certified', ar: 'معتمد من CE' }
            ],
            buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
            buttonUrl: '/contact',
          },
        ],
      },
    }));
  };

  const handleDeleteMIProduct = (index: number) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      productsSection: {
        ...prev.productsSection,
        products: prev.productsSection.products.filter((_, i) => i !== index),
      },
    }));
  };

  const handleAddMIProductBadge = (productIndex: number) => {
    setMedicsInnovatorData((prev) => {
      const updated = [...prev.productsSection.products];
      updated[productIndex] = {
        ...updated[productIndex],
        badges: [
          ...updated[productIndex].badges,
          {
            id: `badge-${Date.now()}`,
            en: 'New Badge',
            ar: 'شارة جديدة',
          },
        ],
      };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleDeleteMIProductBadge = (productIndex: number, badgeIndex: number) => {
    setMedicsInnovatorData((prev) => {
      const updated = [...prev.productsSection.products];
      updated[productIndex] = {
        ...updated[productIndex],
        badges: updated[productIndex].badges.filter((_, i) => i !== badgeIndex),
      };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleMIProductBadgeBilingualChange = (
    productIndex: number,
    badgeIndex: number,
    lang: 'en' | 'ar',
    value: string
  ) => {
    setMedicsInnovatorData((prev) => {
      const updated = [...prev.productsSection.products];
      const badges = [...updated[productIndex].badges];
      badges[badgeIndex] = {
        ...badges[badgeIndex],
        [lang]: value,
      };
      updated[productIndex] = {
        ...updated[productIndex],
        badges,
      };
      return {
        ...prev,
        productsSection: {
          ...prev.productsSection,
          products: updated,
        },
      };
    });
  };

  const handleMIWorkTogetherChange = (field: keyof ProjectsInnovatorWorkTogetherSection, value: any) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      workTogetherSection: {
        ...prev.workTogetherSection,
        [field]: value,
      },
    }));
  };

  const handleMIWorkTogetherBilingualChange = (
    field: 'tagline' | 'title' | 'description' | 'primaryButtonText' | 'secondaryButtonText',
    lang: 'en' | 'ar',
    value: string
  ) => {
    setMedicsInnovatorData((prev) => ({
      ...prev,
      workTogetherSection: {
        ...prev.workTogetherSection,
        [field]: {
          ...prev.workTogetherSection[field],
          [lang]: value,
        },
      },
    }));
  };


  // Section 1: Header Handlers
  const handleInvestmentHeaderChange = (field: 'title' | 'description', lang: 'en' | 'ar', val: string) => {
    setInvestmentData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        [field]: {
          ...prev.headerSection[field],
          [lang]: val,
        },
      },
    }));
  };

  // Section 2: Mission Handlers
  const handleInvestmentMissionChange = (
    field: 'tagline' | 'title' | 'description' | 'image',
    langOrVal: string,
    val?: string
  ) => {
    setInvestmentData((prev) => {
      if (field === 'image') {
        return {
          ...prev,
          missionSection: {
            ...prev.missionSection,
            image: langOrVal,
          },
        };
      }
      return {
        ...prev,
        missionSection: {
          ...prev.missionSection,
          [field]: {
            ...prev.missionSection[field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        },
      };
    });
  };

  // Section 3: Macroeconomic Drivers Handlers
  const handleAddInvestmentDriver = () => {
    const nextNum = String(investmentData.driversSection.drivers.length + 1).padStart(2, '0');
    const newDriver: InvestmentDriverItem = {
      id: `driver-${Date.now()}`,
      number: nextNum,
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
    };
    setInvestmentData((prev) => ({
      ...prev,
      driversSection: {
        ...prev.driversSection,
        drivers: [...prev.driversSection.drivers, newDriver],
      },
    }));
    toast.success('New macroeconomic driver added');
  };

  const handleRemoveInvestmentDriver = (index: number) => {
    setInvestmentData((prev) => ({
      ...prev,
      driversSection: {
        ...prev.driversSection,
        drivers: prev.driversSection.drivers.filter((_, i) => i !== index),
      },
    }));
  };

  const handleInvestmentDriverChange = (
    index: number,
    field: 'number' | 'title' | 'description',
    langOrVal: string,
    val?: string
  ) => {
    setInvestmentData((prev) => {
      const list = [...prev.driversSection.drivers];
      if (field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          number: langOrVal,
        };
      }
      return {
        ...prev,
        driversSection: {
          ...prev.driversSection,
          drivers: list,
        },
      };
    });
  };

  // Section 4: Focus Sectors Handlers
  const handleAddInvestmentSector = () => {
    const nextNum = String(investmentData.sectorsSection.sectors.length + 1).padStart(2, '0');
    const newSector: InvestmentSectorItem = {
      id: `sector-${Date.now()}`,
      number: nextNum,
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
      linkUrl: '',
    };
    setInvestmentData((prev) => ({
      ...prev,
      sectorsSection: {
        ...prev.sectorsSection,
        sectors: [...prev.sectorsSection.sectors, newSector],
      },
    }));
    toast.success('New focus sector added');
  };

  const handleRemoveInvestmentSector = (index: number) => {
    setInvestmentData((prev) => ({
      ...prev,
      sectorsSection: {
        ...prev.sectorsSection,
        sectors: prev.sectorsSection.sectors.filter((_, i) => i !== index),
      },
    }));
  };

  const handleInvestmentSectorChange = (
    index: number,
    field: 'number' | 'title' | 'description' | 'linkUrl',
    langOrVal: string,
    val?: string
  ) => {
    setInvestmentData((prev) => {
      const list = [...prev.sectorsSection.sectors];
      if (field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        sectorsSection: {
          ...prev.sectorsSection,
          sectors: list,
        },
      };
    });
  };

  // Section 5: Environment Handlers
  const handleAddInvestmentFactor = () => {
    const newFactor: InvestmentFactorItem = {
      id: `factor-${Date.now()}`,
      icon: 'Shield',
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
    };
    setInvestmentData((prev) => ({
      ...prev,
      environmentSection: {
        ...prev.environmentSection,
        factors: [...prev.environmentSection.factors, newFactor],
      },
    }));
    toast.success('New investment factor added');
  };

  const handleRemoveInvestmentFactor = (index: number) => {
    setInvestmentData((prev) => ({
      ...prev,
      environmentSection: {
        ...prev.environmentSection,
        factors: prev.environmentSection.factors.filter((_, i) => i !== index),
      },
    }));
  };

  const handleInvestmentFactorChange = (
    index: number,
    field: 'icon' | 'title' | 'description',
    langOrVal: string,
    val?: string
  ) => {
    setInvestmentData((prev) => {
      const list = [...prev.environmentSection.factors];
      if (field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          icon: langOrVal,
        };
      }
      return {
        ...prev,
        environmentSection: {
          ...prev.environmentSection,
          factors: list,
        },
      };
    });
  };

  const handleInvestmentFoundationChange = (field: 'title' | 'description', lang: 'en' | 'ar', val: string) => {
    setInvestmentData((prev) => ({
      ...prev,
      environmentSection: {
        ...prev.environmentSection,
        foundationBox: {
          ...prev.environmentSection.foundationBox,
          [field]: {
            ...prev.environmentSection.foundationBox[field],
            [lang]: val,
          },
        },
      },
    }));
  };

  // Section 6: Banner Handlers
  const handleInvestmentBannerChange = (
    field: 'tagline' | 'title' | 'description' | 'primaryButtonText' | 'primaryButtonUrl' | 'secondaryButtonText' | 'secondaryButtonUrl',
    langOrVal: string,
    val?: string
  ) => {
    setInvestmentData((prev) => {
      if (field === 'primaryButtonUrl' || field === 'secondaryButtonUrl') {
        return {
          ...prev,
          bannerSection: {
            ...prev.bannerSection,
            [field]: langOrVal,
          },
        };
      }
      return {
        ...prev,
        bannerSection: {
          ...prev.bannerSection,
          [field]: {
            ...prev.bannerSection[field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        },
      };
    });
  };

// Section 1: Contact Us & Enquiry Header Handler
  const handleContactHeaderChange = (
    field: 'title' | 'description' | 'enquiryTitle' | 'enquiryDescription',
    lang: 'en' | 'ar',
    val: string
  ) => {
    setContactData((prev) => ({
      ...prev,
      headerSection: {
        ...prev.headerSection,
        [field]: {
          ...prev.headerSection[field],
          [lang]: val,
        },
      },
    }));
  };

  // Section 2: Corporate Office & Map Handler
  const handleContactCorporateChange = (
    field:
      | 'tagline'
      | 'title'
      | 'description'
      | 'addressLabel'
      | 'addressLine1'
      | 'addressLine2'
      | 'addressCityCountry'
      | 'emailLabel'
      | 'emailValue'
      | 'phoneLabel'
      | 'phoneValue'
      | 'mapLocationUrl'
      | 'mapEmbedUrl'
      | 'mapButtonText',
    langOrVal: string,
    val?: string
  ) => {
    setContactData((prev) => {
      if (
        field === 'tagline' ||
        field === 'title' ||
        field === 'description' ||
        field === 'addressLabel' ||
        field === 'addressLine1' ||
        field === 'addressLine2' ||
        field === 'addressCityCountry' ||
        field === 'emailLabel' ||
        field === 'phoneLabel' ||
        field === 'mapButtonText'
      ) {
        return {
          ...prev,
          corporateOfficeSection: {
            ...prev.corporateOfficeSection,
            [field]: {
              ...prev.corporateOfficeSection[field],
              [langOrVal as 'en' | 'ar']: val || '',
            },
          },
        };
      }
      return {
        ...prev,
        corporateOfficeSection: {
          ...prev.corporateOfficeSection,
          [field]: langOrVal,
        },
      };
    });
  };

  const handleSaveCompanyData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsCompany(companyData);
      toast.success('Company Profile sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save Company Profile sections');
    } finally {
      setSaving(false);
    }
  };

  // Section 2: Who We Are Cards Handlers
  const handleAddCompanyCard = () => {
    const newCard: CompanyCard = {
      id: `card-${Date.now()}`,
      icon: 'Building2',
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
    };
    setCompanyData((prev) => ({
      ...prev,
      whoWeAreSection: {
        ...prev.whoWeAreSection,
        cards: [...(prev.whoWeAreSection?.cards || []), newCard],
      },
    }));
    toast.success('New company pillar card added');
  };

  const handleRemoveCompanyCard = (index: number) => {
    setCompanyData((prev) => ({
      ...prev,
      whoWeAreSection: {
        ...prev.whoWeAreSection,
        cards: prev.whoWeAreSection.cards.filter((_, i) => i !== index),
      },
    }));
  };

  const handleCompanyCardChange = (
    index: number,
    field: 'icon' | 'title' | 'description',
    langOrVal: string,
    val?: string
  ) => {
    setCompanyData((prev) => {
      const list = [...(prev.whoWeAreSection?.cards || [])];
      if (field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        whoWeAreSection: {
          ...prev.whoWeAreSection,
          cards: list,
        },
      };
    });
  };

  // Section 3: Principles Handlers
  const handleAddPrinciple = () => {
    const newP: CompanyPrincipleItem = {
      id: `p-${Date.now()}`,
      en: '',
      ar: '',
    };
    setCompanyData((prev) => ({
      ...prev,
      whatGuidesUsSection: {
        ...prev.whatGuidesUsSection,
        principles: [...(prev.whatGuidesUsSection?.principles || []), newP],
      },
    }));
    toast.success('New principle pill added');
  };

  const handleRemovePrinciple = (index: number) => {
    setCompanyData((prev) => ({
      ...prev,
      whatGuidesUsSection: {
        ...prev.whatGuidesUsSection,
        principles: prev.whatGuidesUsSection.principles.filter((_, i) => i !== index),
      },
    }));
  };

  const handlePrincipleChange = (index: number, lang: 'en' | 'ar', val: string) => {
    setCompanyData((prev) => {
      const list = [...(prev.whatGuidesUsSection?.principles || [])];
      list[index] = {
        ...list[index],
        [lang]: val,
      };
      return {
        ...prev,
        whatGuidesUsSection: {
          ...prev.whatGuidesUsSection,
          principles: list,
        },
      };
    });
  };

  const handleSaveAboutData = async () => {
    try {
      setSaving(true);
      await cmsService.updateCmsAbout(aboutData);
      toast.success('About Us page sections updated successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save About Us sections');
    } finally {
      setSaving(false);
    }
  };

  // About Section 3: Journey Management
  const handleAddJourneyItem = () => {
    const nextNum = String((aboutData.journeySection.items.length + 1)).padStart(2, '0');
    const newItem: AboutJourneyItem = {
      id: `journey-${Date.now()}`,
      number: nextNum,
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
    };
    setAboutData((prev) => ({
      ...prev,
      journeySection: {
        ...prev.journeySection,
        items: [...prev.journeySection.items, newItem],
      },
    }));
    toast.success('New journey milestone added');
  };

  const handleRemoveJourneyItem = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      journeySection: {
        ...prev.journeySection,
        items: prev.journeySection.items.filter((_, i) => i !== index),
      },
    }));
  };

  const handleJourneyItemChange = (
    index: number,
    field: 'number' | 'title' | 'description',
    langOrVal: string,
    val?: string
  ) => {
    setAboutData((prev) => {
      const list = [...prev.journeySection.items];
      if (field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        journeySection: {
          ...prev.journeySection,
          items: list,
        },
      };
    });
  };

  // About Section 4: Stat Boxes Management
  const handleAddStatItem = () => {
    const newStat: AboutStatItem = {
      id: `stat-${Date.now()}`,
      number: '100+',
      description: { en: 'New Metric', ar: 'مقياس جديد' },
    };
    setAboutData((prev) => ({
      ...prev,
      impactSection: {
        ...prev.impactSection,
        stats: [...prev.impactSection.stats, newStat],
      },
    }));
    toast.success('New stat box added');
  };

  const handleRemoveStatItem = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      impactSection: {
        ...prev.impactSection,
        stats: prev.impactSection.stats.filter((_, i) => i !== index),
      },
    }));
  };

  const handleStatItemChange = (
    index: number,
    field: 'number' | 'description',
    langOrVal: string,
    val?: string
  ) => {
    setAboutData((prev) => {
      const list = [...prev.impactSection.stats];
      if (field === 'description') {
        list[index] = {
          ...list[index],
          description: {
            ...list[index].description,
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          number: langOrVal,
        };
      }
      return {
        ...prev,
        impactSection: {
          ...prev.impactSection,
          stats: list,
        },
      };
    });
  };


  // Section 5: Leadership Handlers
  const handleAddLeader = () => {
    const newLeader: AboutLeaderItem = {
      id: `leader-${Date.now()}`,
      name: { en: '', ar: '' },
      role: { en: '', ar: '' },
      image: '',
    };
    setAboutData((prev) => ({
      ...prev,
      leadershipSection: {
        ...prev.leadershipSection,
        leaders: [...(prev.leadershipSection?.leaders || []), newLeader],
      },
    }));
    toast.success('New leader added');
  };

  const handleRemoveLeader = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      leadershipSection: {
        ...prev.leadershipSection,
        leaders: prev.leadershipSection.leaders.filter((_, i) => i !== index),
      },
    }));
  };

  const handleLeaderChange = (
    index: number,
    field: 'name' | 'role' | 'image',
    langOrVal: string,
    val?: string
  ) => {
    setAboutData((prev) => {
      const list = [...(prev.leadershipSection?.leaders || [])];
      if (field === 'name' || field === 'role') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        leadershipSection: {
          ...prev.leadershipSection,
          leaders: list,
        },
      };
    });
  };

  // Section 6: Management Team Handlers
  const handleAddDivision = () => {
    const newDiv: AboutManagementDivision = {
      id: `div-${Date.now()}`,
      badge: 'NEW',
      companyName: { en: '', ar: '' },
      description: { en: '', ar: '' },
      linkText: { en: '', ar: '' },
      linkUrl: '',
      logoUrl: '',
      members: [],
    };
    setAboutData((prev) => ({
      ...prev,
      managementSection: {
        ...prev.managementSection,
        divisions: [...(prev.managementSection?.divisions || []), newDiv],
      },
    }));
    toast.success('New management division added');
  };

  const handleRemoveDivision = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      managementSection: {
        ...prev.managementSection,
        divisions: prev.managementSection.divisions.filter((_, i) => i !== index),
      },
    }));
  };

  const handleDivisionChange = (
    dIdx: number,
    field: 'badge' | 'companyName' | 'description' | 'linkText' | 'linkUrl' | 'logoUrl',
    langOrVal: string,
    val?: string
  ) => {
    setAboutData((prev) => {
      const list = [...(prev.managementSection?.divisions || [])];
      if (field === 'companyName' || field === 'description' || field === 'linkText') {
        list[dIdx] = {
          ...list[dIdx],
          [field]: {
            ...list[dIdx][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[dIdx] = {
          ...list[dIdx],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        managementSection: {
          ...prev.managementSection,
          divisions: list,
        },
      };
    });
  };

  const handleAddDivisionMember = (dIdx: number) => {
    const newMember: AboutManagementMember = {
      id: `member-${Date.now()}`,
      name: { en: '', ar: '' },
      role: { en: '', ar: '' },
      image: '',
    };
    setAboutData((prev) => {
      const list = [...(prev.managementSection?.divisions || [])];
      list[dIdx] = {
        ...list[dIdx],
        members: [...(list[dIdx].members || []), newMember],
      };
      return {
        ...prev,
        managementSection: {
          ...prev.managementSection,
          divisions: list,
        },
      };
    });
    toast.success('Management member added');
  };

  const handleRemoveDivisionMember = (dIdx: number, mIdx: number) => {
    setAboutData((prev) => {
      const list = [...(prev.managementSection?.divisions || [])];
      list[dIdx] = {
        ...list[dIdx],
        members: list[dIdx].members.filter((_, i) => i !== mIdx),
      };
      return {
        ...prev,
        managementSection: {
          ...prev.managementSection,
          divisions: list,
        },
      };
    });
  };

  const handleDivisionMemberChange = (
    dIdx: number,
    mIdx: number,
    field: 'name' | 'role' | 'image',
    langOrVal: string,
    val?: string
  ) => {
    setAboutData((prev) => {
      const list = [...(prev.managementSection?.divisions || [])];
      const members = [...(list[dIdx].members || [])];
      if (field === 'name' || field === 'role') {
        members[mIdx] = {
          ...members[mIdx],
          [field]: {
            ...members[mIdx][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        members[mIdx] = {
          ...members[mIdx],
          [field]: langOrVal,
        };
      }
      list[dIdx] = { ...list[dIdx], members };
      return {
        ...prev,
        managementSection: {
          ...prev.managementSection,
          divisions: list,
        },
      };
    });
  };

  // Section 7: Core Values Handlers
  const handleAddCoreValue = () => {
    const nextNum = String((aboutData.coreValuesSection?.values?.length || 0) + 1).padStart(2, '0');
    const newVal: AboutCoreValueItem = {
      id: `val-${Date.now()}`,
      number: nextNum,
      icon: 'ShieldCheck',
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
    };
    setAboutData((prev) => ({
      ...prev,
      coreValuesSection: {
        ...prev.coreValuesSection,
        values: [...(prev.coreValuesSection?.values || []), newVal],
      },
    }));
    toast.success('New core value added');
  };

  const handleRemoveCoreValue = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      coreValuesSection: {
        ...prev.coreValuesSection,
        values: prev.coreValuesSection.values.filter((_, i) => i !== index),
      },
    }));
  };

  const handleCoreValueChange = (
    index: number,
    field: 'number' | 'icon' | 'title' | 'description',
    langOrVal: string,
    val?: string
  ) => {
    setAboutData((prev) => {
      const list = [...(prev.coreValuesSection?.values || [])];
      if (field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        coreValuesSection: {
          ...prev.coreValuesSection,
          values: list,
        },
      };
    });
  };

  // Section 8: History & Ownership Handlers
  const handleAddHistoryItem = () => {
    const nextNum = String((aboutData.historySection?.items?.length || 0) + 1).padStart(2, '0');
    const newItem: AboutHistoryItem = {
      id: `hist-${Date.now()}`,
      number: nextNum,
      icon: 'History',
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
    };
    setAboutData((prev) => ({
      ...prev,
      historySection: {
        ...prev.historySection,
        items: [...(prev.historySection?.items || []), newItem],
      },
    }));
    toast.success('New history card added');
  };

  const handleRemoveHistoryItem = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      historySection: {
        ...prev.historySection,
        items: prev.historySection.items.filter((_, i) => i !== index),
      },
    }));
  };

  const handleHistoryItemChange = (
    index: number,
    field: 'number' | 'icon' | 'title' | 'description',
    langOrVal: string,
    val?: string
  ) => {
    setAboutData((prev) => {
      const list = [...(prev.historySection?.items || [])];
      if (field === 'title' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        historySection: {
          ...prev.historySection,
          items: list,
        },
      };
    });
  };

  // Section 9: Purpose Objectives Handlers
  const handleAddObjective = () => {
    const nextNum = String((aboutData.purposeSection?.objectives?.length || 0) + 1).padStart(2, '0');
    const newObj: AboutObjectiveItem = {
      id: `obj-${Date.now()}`,
      number: nextNum,
      icon: 'Target',
      title: { en: '', ar: '' },
    };
    setAboutData((prev) => ({
      ...prev,
      purposeSection: {
        ...prev.purposeSection,
        objectives: [...(prev.purposeSection?.objectives || []), newObj],
      },
    }));
    toast.success('New priority objective added');
  };

  const handleRemoveObjective = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      purposeSection: {
        ...prev.purposeSection,
        objectives: prev.purposeSection.objectives.filter((_, i) => i !== index),
      },
    }));
  };

  const handleObjectiveChange = (
    index: number,
    field: 'number' | 'icon' | 'title',
    langOrVal: string,
    val?: string
  ) => {
    setAboutData((prev) => {
      const list = [...(prev.purposeSection?.objectives || [])];
      if (field === 'title') {
        list[index] = {
          ...list[index],
          title: {
            ...list[index].title,
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        purposeSection: {
          ...prev.purposeSection,
          objectives: list,
        },
      };
    });
  };

  const handleSaveOtherPageData = (tabId: string) => {
    try {
      setSaving(true);
      cmsService.saveAllTabs(tabsConfig);
      toast.success(`${tabId.toUpperCase()} page sections saved successfully!`);
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save page sections');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Reset all sections to initial template?')) {
      setData(initialCmsHomeData);
      setTabsConfig(ALL_CMS_TABS);
      await cmsService.updateCmsHome(initialCmsHomeData);
      cmsService.saveAllTabs(ALL_CMS_TABS);
      toast.success('CMS content reset to default');
    }
  };

  // Brand Management
  const handleAddBrand = () => {
    const newBrand: TrustedBrand = {
      name: 'New Partner',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: 'https://example.com',
    };
    setData((prev) => ({
      ...prev,
      trustedBrands: [...prev.trustedBrands, newBrand],
    }));
    toast.success('New brand added');
  };

  const handleRemoveBrand = (index: number) => {
    setData((prev) => ({
      ...prev,
      trustedBrands: prev.trustedBrands.filter((_, i) => i !== index),
    }));
  };

  const handleBrandChange = (index: number, field: keyof TrustedBrand, val: string) => {
    setData((prev) => {
      const updated = [...prev.trustedBrands];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, trustedBrands: updated };
    });
  };

  // Section 3 Sector Management (Headings Only)
  const handleAddSector = () => {
    const newSector: SectorItem = {
      id: `sector-${Date.now()}`,
      title: {
        en: '',
        ar: '',
      },
      description: {
        en: '',
        ar: '',
      },
      icon: '',
    };
    setData((prev) => ({
      ...prev,
      aboutSectorsSection: {
        ...prev.aboutSectorsSection,
        sectors: [...prev.aboutSectorsSection.sectors, newSector],
      },
    }));
    toast.success('New sector heading added');
  };

  const handleRemoveSector = (index: number) => {
    setData((prev) => ({
      ...prev,
      aboutSectorsSection: {
        ...prev.aboutSectorsSection,
        sectors: prev.aboutSectorsSection.sectors.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSectorChange = (
    index: number,
    lang: 'en' | 'ar',
    val: string
  ) => {
    setData((prev) => {
      const updatedSectors = [...prev.aboutSectorsSection.sectors];
      updatedSectors[index] = {
        ...updatedSectors[index],
        title: {
          ...updatedSectors[index].title,
          [lang]: val,
        },
      };
      return {
        ...prev,
        aboutSectorsSection: {
          ...prev.aboutSectorsSection,
          sectors: updatedSectors,
        },
      };
    });
  };

  // Section 4: Specialized Companies Management
  const handleAddCompany = () => {
    const newComp: CompanyItem = {
      id: `comp-${Date.now()}`,
      name: { en: '', ar: '' },
      description: { en: '', ar: '' },
      logoUrl: '',
      websiteUrl: '',
      color: 'blue',
    };
    setData((prev) => ({
      ...prev,
      companiesSection: {
        ...prev.companiesSection,
        companies: [...(prev.companiesSection?.companies || []), newComp],
      },
    }));
    toast.success('New specialized company added');
  };

  const handleRemoveCompany = (index: number) => {
    setData((prev) => ({
      ...prev,
      companiesSection: {
        ...prev.companiesSection,
        companies: prev.companiesSection.companies.filter((_, i) => i !== index),
      },
    }));
  };

  const handleCompanyChange = (
    index: number,
    field: 'name' | 'description' | 'logoUrl' | 'websiteUrl' | 'color',
    langOrVal: string,
    val?: string
  ) => {
    setData((prev) => {
      const list = [...(prev.companiesSection?.companies || [])];
      if (field === 'name' || field === 'description') {
        list[index] = {
          ...list[index],
          [field]: {
            ...list[index][field],
            [langOrVal as 'en' | 'ar']: val || '',
          },
        };
      } else {
        list[index] = {
          ...list[index],
          [field]: langOrVal,
        };
      }
      return {
        ...prev,
        companiesSection: {
          ...prev.companiesSection,
          companies: list,
        },
      };
    });
  };

  // Section 5: Purpose Tags Management
  const handleAddPurposeTag = () => {
    const newTag: PurposeTag = {
      id: `tag-${Date.now()}`,
      title: { en: '', ar: '' },
      description: { en: '', ar: '' },
    };
    setData((prev) => ({
      ...prev,
      purposeSection: {
        ...prev.purposeSection,
        tags: [...(prev.purposeSection?.tags || []), newTag],
      },
    }));
    toast.success('New purpose tag added');
  };

  const handleRemovePurposeTag = (index: number) => {
    setData((prev) => ({
      ...prev,
      purposeSection: {
        ...prev.purposeSection,
        tags: prev.purposeSection.tags.filter((_, i) => i !== index),
      },
    }));
  };

  const handlePurposeTagChange = (
    index: number,
    field: 'title' | 'description',
    lang: 'en' | 'ar',
    val: string
  ) => {
    setData((prev) => {
      const list = [...(prev.purposeSection?.tags || [])];
      list[index] = {
        ...list[index],
        [field]: {
          ...list[index][field],
          [lang]: val,
        },
      };
      return {
        ...prev,
        purposeSection: {
          ...prev.purposeSection,
          tags: list,
        },
      };
    });
  };

  // Other Page Section Item Change
  const handleOtherItemChange = (
    tabId: string,
    groupId: string,
    itemId: string,
    field: 'title' | 'subtitle',
    lang: 'en' | 'ar',
    val: string
  ) => {
    const now = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    setTabsConfig((prevTabs) =>
      prevTabs.map((tab) => {
        if (tab.id !== tabId) return tab;
        return {
          ...tab,
          groups: tab.groups.map((group) => {
            if (group.id !== groupId) return group;
            return {
              ...group,
              items: group.items.map((it) => {
                if (it.id !== itemId) return it;
                return {
                  ...it,
                  lastUpdated: now,
                  [field]: {
                    ...it[field],
                    [lang]: val,
                  },
                };
              }),
            };
          }),
        };
      })
    );
  };

  // Helper for Card Icon Badge (Matching Reference Screenshot)
  const renderCardHeaderIcon = (color: string, iconName?: string) => {
    let borderBgText = 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400';
    if (color === 'purple') borderBgText = 'border-purple-500/30 bg-purple-500/10 text-purple-400';
    if (color === 'orange') borderBgText = 'border-[#F68E2D]/30 bg-[#F68E2D]/10 text-[#F68E2D]';
    if (color === 'red') borderBgText = 'border-rose-500/30 bg-rose-500/10 text-rose-400';
    if (color === 'blue') borderBgText = 'border-sky-500/30 bg-sky-500/10 text-sky-400';

    let IconComp = Layers;
    if (iconName === 'Home' || iconName === 'Sparkles') IconComp = Home;
    else if (iconName === 'Info') IconComp = Info;
    else if (iconName === 'Building2') IconComp = Building2;
    else if (iconName === 'Zap') IconComp = Zap;
    else if (iconName === 'ShoppingBag') IconComp = ShoppingBag;
    else if (iconName === 'TrendingUp') IconComp = TrendingUp;
    else if (iconName === 'FolderGit2') IconComp = FolderGit2;
    else if (iconName === 'Users2') IconComp = Users2;
    else if (iconName === 'Mail') IconComp = Mail;
    else if (iconName === 'Shield') IconComp = Shield;

    return (
      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 ${borderBgText}`}>
        <IconComp className="w-5 h-5" />
      </div>
    );
  };

  const getTitleColorClass = (color: string) => {
    if (color === 'green') return 'text-emerald-400';
    if (color === 'blue') return 'text-sky-400';
    if (color === 'purple') return 'text-purple-400';
    if (color === 'orange') return 'text-[#F68E2D]';
    if (color === 'red') return 'text-rose-400';
    return 'text-white';
  };

  // Filter tabs for grid view
  const filteredTabs = tabsConfig.filter((t) => {
    const matchesCategory = selectedCategory === 'all' || t.id === selectedCategory;
    const matchesSearch =
      t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.labelAr.includes(searchQuery) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeEditingTab = tabsConfig.find((t) => t.id === editingTabId) || tabsConfig[0];

  if (loading) {
    return (
      <DashboardLayout role={role}>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
          <RefreshCw className="w-8 h-8 animate-spin text-[#F68E2D]" />
          <p className="text-xs text-white/50">Loading CMS portal data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role={role}>
      <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">

        {/* ----------------- VIEW 1: OVERVIEW CARD GRID ----------------- */}
        {viewMode === 'grid' && (
          <>
            {/* Top Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F68E2D]/20 text-[#F68E2D] border border-[#F68E2D]/30 flex items-center gap-1">
                    <SlidersHorizontal className="w-3 h-3" /> Content Management System
                  </span>
                  <span className="text-xs text-white/40">Portal Administration</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  CMS Portal
                </h1>
                <p className="text-sm text-white/60 mt-0.5">
                  Click the Edit button in the top right of any section card to open and edit all its sections.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  variant="outline"
                  onClick={() => setShowPreviewModal(true)}
                  className="border-white/10 text-white hover:bg-white/10 flex items-center gap-1.5 text-xs py-2 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5 text-[#F68E2D]" />
                  Live Preview
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="border-white/10 text-white/70 hover:text-white hover:bg-white/10 flex items-center gap-1 text-xs py-2 cursor-pointer"
                  title="Reset all sections to default template"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Filter pills and search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === 'all'
                      ? 'bg-[#F68E2D] text-white shadow-md shadow-[#F68E2D]/20'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  All Sections ({tabsConfig.length})
                </button>
                {tabsConfig.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-[#F68E2D] text-white shadow-md shadow-[#F68E2D]/20'
                        : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search sections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-[#14112E] border border-white/10 rounded-lg text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </div>

            {/* 2-COLUMN GRID OF SECTION CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              
              {/* CARD 1: HOME PAGE (Sections 1 through 6) */}
              {(selectedCategory === 'all' || selectedCategory === 'home') && (
                <div className="bg-[#14112E] border border-white/10 hover:border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  {/* Card Header with Edit button in TOP RIGHT */}
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {renderCardHeaderIcon('green', 'Home')}
                      <div>
                        <h3 className="text-base font-bold text-emerald-400">
                          Home Page
                        </h3>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Homepage hero, executive founder, trusted partners, sectors, divisions & CTA banner.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('home')}
                      className="p-2.5 rounded-xl border border-sky-500/30 text-sky-400 hover:text-white hover:bg-sky-500/20 transition-all cursor-pointer shrink-0 shadow-sm flex items-center justify-center group"
                      title="Edit Entire Home Page"
                    >
                      <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  {/* Section Rows (NO EDIT BUTTONS ON ROWS) */}
                  <div className="divide-y divide-white/5 flex-1 flex flex-col justify-start">
                    {/* Section I */}
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section I: Hero & Founder Details
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Main Title, Tagline, Description & Founder Profile
                        </p>
                      </div>
                    </div>

                    {/* Section II */}
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section II: Trusted Brands
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Partner logos carousel ({data.trustedBrands.length} brands configured)
                        </p>
                      </div>
                    </div>

                    {/* Section III */}
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section III: About & Our Sectors
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Feature image, location, and priority sector pill tags ({data.aboutSectorsSection.sectors.length} sectors)
                        </p>
                      </div>
                    </div>

                    {/* Section IV: Specialized Companies */}
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section IV: Specialized Companies & Divisions
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Three specialized group entities with logos & descriptions ({data.companiesSection?.companies?.length || 0} companies)
                        </p>
                      </div>
                    </div>

                    {/* Section V: Vision & Mission */}
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section V: Purpose, Vision & Mission
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Guiding principles, purpose tags & infographic diagram ({data.purposeSection?.tags?.length || 0} tags)
                        </p>
                      </div>
                    </div>

                    {/* Section VI: CTA Banner */}
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section VI: Call-To-Action Banner
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          High-converting gradient banner with tagline, description & CTA actions
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* OTHER CARDS: ABOUT US, COMPANY PROFILE, SERVICES, SHOP, INVESTMENT, PROJECTS, PARTNERS, CONTACT */}
              {/* CARD 2: ABOUT US (Dedicated 4 Sections Matching Reference Image) */}
              {(selectedCategory === 'all' || selectedCategory === 'about') && (
                <div className="bg-[#14112E] border border-white/10 hover:border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {renderCardHeaderIcon('green', 'Info')}
                      <div>
                        <h3 className="text-base font-bold text-emerald-400">
                          About Us
                        </h3>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Company heritage, foundation story, journey milestones, and impact achievements.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('about')}
                      className="p-2.5 rounded-xl border border-sky-500/30 text-sky-400 hover:text-white hover:bg-sky-500/20 transition-all cursor-pointer shrink-0 shadow-sm flex items-center justify-center group"
                      title="Edit Entire About Us Page"
                    >
                      <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>

                  <div className="divide-y divide-white/5 flex-1 flex flex-col justify-start">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Page Header & Overview
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Title: &quot;{activeLangTab === 'ar' ? aboutData.headerSection.title.ar : aboutData.headerSection.title.en}&quot; & core introductory summary
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 2: Our Heritage & Story
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Heritage narrative, foundation photo, and established badge ({aboutData.heritageSection.badgeYear})
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 3: Evolving Through Opportunity (Journey)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Chronological evolution milestones ({aboutData.journeySection.items.length} milestone cards)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 4: Our Impact in Numbers
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Numerical metrics & statistics ({aboutData.impactSection.stats.length} key metric boxes)
                        </p>
                      </div>
                    </div>
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 5: Our Leadership
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Executive leadership profiles ({aboutData.leadershipSection?.leaders?.length || 0} leaders)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 6: Our Management Team
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Specialized divisions ({aboutData.managementSection?.divisions?.length || 0} companies) with nested management teams
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 7: Our Core Values
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          What We Stand For ({aboutData.coreValuesSection?.values?.length || 0} core value principles)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 8: Our History & Ownership
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Background foundations & shareholding structure ({aboutData.historySection?.items?.length || 0} cards)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 9: Our Purpose & Objectives
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Committed to Shared Progress & priority objectives ({aboutData.purposeSection?.objectives?.length || 0} priorities)
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 10: Let's Work Together Banner
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Call-to-action banner with quotation and contact triggers
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              
              {/* CARD 3: COMPANY PROFILE (Dedicated 3 Sections Matching Reference Images) */}
              {filteredTabs.some((t) => t.id === 'company') && (
                <div className="bg-[#14112E] border border-sky-500/30 hover:border-sky-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  {/* Card Header with Edit button in TOP RIGHT */}
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-sky-500/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-sky-500/30 bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-sky-400">
                            Company Profile
                          </h3>
                          <span className="text-xs text-sky-400/70 font-normal">
                            (ملف الشركة)
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Corporate identity, vision, mission, and guiding principles
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('company')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Page
                    </button>
                  </div>

                  {/* Section List Inside Card */}
                  <div className="divide-y divide-white/5 flex-1">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Company Profile (Hero Header)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Main page title, introductory narrative & scope
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 2: Who We Are
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Building Opportunities tagline, dual paragraphs & {companyData.whoWeAreSection.cards.length} corporate pillars
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 3: What Guides Us
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Principles Behind Our Work, {companyData.whatGuidesUsSection.principles.length} principle pills & PDF profile download box
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}


              {/* CARD 4: SERVICES (Dedicated 2 Sections Matching Reference Images) */}
              {filteredTabs.some((t) => t.id === 'services') && (
                <div className="bg-[#14112E] border border-purple-500/30 hover:border-purple-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  {/* Card Header with Edit button in TOP RIGHT */}
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-purple-500/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-purple-400">
                            Services
                          </h3>
                          <span className="text-xs text-purple-400/70 font-normal">
                            (الخدمات)
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Medical equipment, laboratory supplies, and healthcare solutions
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('services')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Page
                    </button>
                  </div>

                  {/* Section List Inside Card */}
                  <div className="divide-y divide-white/5 flex-1">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Our Services (Header & Solutions)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Main page title, introductory narrative & {servicesData.headerSection.cards.length} solution cards
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 2: Our Business Areas
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Division sectors & services forming Projects Innovator ({servicesData.businessAreasSection.cards.length} business areas)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 5: SHOP & MEDICAL EQUIPMENT (Dedicated Products Section Matching Reference Image) */}
              {filteredTabs.some((t) => t.id === 'shop') && (
                <div className="bg-[#14112E] border border-orange-500/30 hover:border-orange-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  {/* Card Header with Edit button in TOP RIGHT */}
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-orange-500/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-400 flex items-center justify-center shrink-0">
                        <ShoppingBag className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-orange-400">
                            Shop
                          </h3>
                          <span className="text-xs text-orange-400/70 font-normal">
                            (المتجر)
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Medical equipment, healthcare products catalog & quote requests
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('shop')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Page
                    </button>
                  </div>

                  {/* Section List Inside Card */}
                  <div className="divide-y divide-white/5 flex-1">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Our Products (Catalog & Quotes)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Main page title, introductory narrative & {shopData.headerSection.products.length} products with certifications and quote CTAs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 6: PROJECTS (Dedicated 2 Sections Matching Reference Images) */}
              {filteredTabs.some((t) => t.id === 'projects') && (
                <div className="bg-[#14112E] border border-purple-500/30 hover:border-purple-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  {/* Card Header with Edit button in TOP RIGHT */}
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-purple-500/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-purple-500/30 bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                        <FolderGit2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-purple-400">
                            Projects
                          </h3>
                          <span className="text-xs text-purple-400/70 font-normal">
                            (المشاريع)
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Smart city, digital transformation, sustainable energy & CTA banner
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('projects')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Page
                    </button>
                  </div>

                  {/* Section List Inside Card */}
                  <div className="divide-y divide-white/5 flex-1">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Our Projects (Strategic Portfolio)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Main page title, introductory narrative & {projectsData.headerSection.projects.length} strategic project cards
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 2: Let's Work Together (Banner)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          High-converting CTA luxury banner with Get a Quote & Contact buttons
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 7: PARTNERS (Dedicated 2 Sections Matching Reference Images) */}
              {filteredTabs.some((t) => t.id === 'partners') && (
                <div className="bg-[#14112E] border border-blue-500/30 hover:border-blue-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  {/* Card Header with Edit button in TOP RIGHT */}
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-blue-500/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                        <Users2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-blue-400">
                            Partners
                          </h3>
                          <span className="text-xs text-blue-400/70 font-normal">
                            (الشركاء)
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Global technology alliances, corporate collaborators & CTA banner
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('partners')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Page
                    </button>
                  </div>

                  {/* Section List Inside Card */}
                  <div className="divide-y divide-white/5 flex-1">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Our Partners (Alliance Showcase)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Main page title, introductory narrative & {partnersData.headerSection.partners.length} global partner cards
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 2: Let's Work Together (Banner)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          High-converting CTA luxury banner with Get a Quote & Contact buttons
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 8: CONTACT (Dedicated 2 Sections Matching Reference Images) */}
              {filteredTabs.some((t) => t.id === 'contact') && (
                <div className="bg-[#14112E] border border-red-500/30 hover:border-red-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  {/* Card Header with Edit button in TOP RIGHT */}
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-red-500/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-red-400">
                            Contact
                          </h3>
                          <span className="text-xs text-red-400/70 font-normal">
                            (اتصل بنا)
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Corporate office location, headquarters address, enquiry channels & maps
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('contact')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Page
                    </button>
                  </div>

                  {/* Section List Inside Card */}
                  <div className="divide-y divide-white/5 flex-1">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Contact Us & Send an Enquiry
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Main page title, introductory text, and enquiry submission headlines
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 2: Get in Touch with Us (Corporate Office & Map)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          HQ address, email, phone number, and interactive Google Map integration
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              
                {/* CARD 9: INVESTMENT (Dedicated 6 Sections Matching Reference Images) */}
                {filteredTabs.some((t) => t.id === 'investment') && (
                  <div className="bg-[#14112E] border border-emerald-500/30 hover:border-emerald-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                    {/* Card Header with Edit button in TOP RIGHT */}
                    <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-emerald-500/[0.04]">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0">
                          <TrendingUp className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-emerald-400">
                              Investment
                            </h3>
                            <span className="text-xs text-emerald-400/70 font-normal">
                              (الاستثمار)
                            </span>
                          </div>
                          <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                            Opportunities, institutional mission, macroeconomic drivers, focus sectors & environment
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenPageEditor('investment')}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit Page
                      </button>
                    </div>

                    {/* Section List Inside Card */}
                    <div className="divide-y divide-white/5 flex-1">
                      <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">
                              Section 1: Investment Opportunities Header
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              Active
                            </span>
                          </div>
                          <p className="text-[11px] text-white/50">
                            Headline: &quot;{investmentData.headerSection.title[activeLangTab] || 'Investment Opportunities'}&quot;
                          </p>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">
                              Section 2: Institutional Mission
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              Active
                            </span>
                          </div>
                          <p className="text-[11px] text-white/50">
                            National growth solutions, 3 narrative pillars, and metrics dashboard graphic
                          </p>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">
                              Section 3: Macroeconomic Drivers
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              Active
                            </span>
                          </div>
                          <p className="text-[11px] text-white/50">
                            Why invest in Iraq now? ({investmentData.driversSection.drivers.length} macroeconomic drivers)
                          </p>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">
                              Section 4: Our Focus Sectors
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              Active
                            </span>
                          </div>
                          <p className="text-[11px] text-white/50">
                            Industry, real estate, energy, agriculture & tech ({investmentData.sectorsSection.sectors.length} focus areas)
                          </p>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">
                              Section 5: The Investment Environment
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              Active
                            </span>
                          </div>
                          <p className="text-[11px] text-white/50">
                            Encouraging factors ({investmentData.environmentSection.factors.length} factors) and foundation for investment
                          </p>
                        </div>
                      </div>

                      <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-white">
                              Section 6: Let's Work Together Banner
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              Active
                            </span>
                          </div>
                          <p className="text-[11px] text-white/50">
                            Luxury high-converting CTA banner with Quote & Contact routing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                            {/* CARD 10: PROJECTS INNOVATOR (Dedicated 5 Sections Matching Reference Images) */}
              {filteredTabs.some((t) => t.id === 'projects-innovator') && (
                <div className="bg-[#14112E] border border-red-500/30 hover:border-red-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  {/* Card Header with Edit button in TOP RIGHT */}
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-red-500/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-red-500/30 bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-red-400">
                            Projects Innovator
                          </h3>
                          <span className="text-xs text-red-400/70 font-normal">
                            (مبتكر المشاريع)
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Holding entity banner, brand logos, about profile, business areas, and work together banner
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('projects-innovator')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-red-600 hover:bg-red-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Page
                    </button>
                  </div>

                  {/* Section List Inside Card */}
                  <div className="divide-y divide-white/5 flex-1">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Hero Banner
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Building Tomorrow Through Innovation headline, buttons & skyscraper architecture
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 2: Brand Logos ({projectsInnovatorData.brandsSection.brands.length} Brands)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Trusted brands and industry leaders partner logos
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 3: About Projects Innovator
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Holding entity platform for sustainable growth narrative & headquarters image
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 4: Our Business Areas ({projectsInnovatorData.businessAreasSection.areas.length} Areas)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Medical Equipment, Laboratory Supplies, and Healthcare Solutions
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 5: Let's Work Together Banner
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Moves business forward banner with Quote & Contact links
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 11: ATTRACTIVE */}
              {filteredTabs.some((t) => t.id === 'attractive') && (
                <div className="bg-[#14112E] border border-blue-500/30 hover:border-blue-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-blue-500/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-blue-400">
                            Attractive
                          </h3>
                          <span className="text-xs text-blue-400/70 font-normal">
                            (أتراكتيف)
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Attractive company hero banner, brands, about profile, products catalog showcase, and partnership banner
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('attractive')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Page
                    </button>
                  </div>

                  <div className="divide-y divide-white/5 flex-1">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Hero Banner
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Building Tomorrow Through Innovation headline, buttons & hero background
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 2: Brand Logos ({attractiveData.brandsSection.brands.length} Brands)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Trusted brands and industry leaders partner logos
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 3: About Attractive
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Platform for sustainable growth narrative & headquarters image
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 4: Our Products ({attractiveData.productsSection.products.length} Products)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Patient Monitor, Ultrasound, Infusion Pump, certifications & quote actions
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 5: Let's Work Together Banner
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Partnership banner with Quote & Contact links
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* CARD 12: MEDICS INNOVATOR */}
              {filteredTabs.some((t) => t.id === 'medics-innovator') && (
                <div className="bg-[#14112E] border border-blue-500/30 hover:border-blue-500/50 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between">
                  <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4 bg-blue-500/[0.04]">
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-blue-400">
                            Medics Innovator
                          </h3>
                          <span className="text-xs text-blue-400/70 font-normal">
                            (ميديكس إنوفيتور)
                          </span>
                        </div>
                        <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                          Medics Innovator clinical division hero, brands, healthcare products, and consultation banner
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOpenPageEditor('medics-innovator')}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Page
                    </button>
                  </div>

                  <div className="divide-y divide-white/5 flex-1">
                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 1: Hero Banner
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Advancing Healthcare headline, buttons & clinical environment background
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 2: Brand Logos ({medicsInnovatorData.brandsSection.brands.length} Brands)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Medical equipment manufacturers and clinical partners
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 3: About Medics Innovator
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Clinical excellence narrative & medical center architecture image
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 4: Our Products ({medicsInnovatorData.productsSection.products.length} Products)
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Patient Monitor, Ultrasound, Infusion Pump, CE/FDA/ISO badges & quote actions
                        </p>
                      </div>
                    </div>

                    <div className="p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-semibold text-white">
                            Section 5: Let's Work Together Banner
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active
                          </span>
                        </div>
                        <p className="text-[11px] text-white/50">
                          Medical facility partnership banner with consultation and quote actions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* OTHER CARDS: UNHANDLED TABS */}
              {filteredTabs
                .filter((t) => t.id !== 'home' && t.id !== 'about' && t.id !== 'company' && t.id !== 'services' && t.id !== 'shop' && t.id !== 'projects' && t.id !== 'partners' && t.id !== 'contact' && t.id !== 'investment' && t.id !== 'projects-innovator' && t.id !== 'attractive' && t.id !== 'medics-innovator')
                .map((tab) => {
                  let cardColor = 'green';
                  if (tab.id === 'company') cardColor = 'blue';
                  else if (tab.id === 'services') cardColor = 'purple';
                  else if (tab.id === 'shop') cardColor = 'orange';
                  else if (tab.id === 'investment') cardColor = 'green';
                  else if (tab.id === 'projects') cardColor = 'purple';
                  else if (tab.id === 'partners') cardColor = 'blue';
                  else if (tab.id === 'contact') cardColor = 'red';

                  return (
                    <div
                      key={tab.id}
                      className="bg-[#14112E] border border-white/10 hover:border-white/20 rounded-2xl shadow-xl overflow-hidden transition-all flex flex-col justify-between"
                    >
                      {/* Card Header with Edit button in TOP RIGHT */}
                      <div className="p-6 border-b border-white/5 flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          {renderCardHeaderIcon(cardColor, tab.iconName)}
                          <div>
                            <h3 className={`text-base font-bold ${getTitleColorClass(cardColor)}`}>
                              {tab.label}
                            </h3>
                            <p className="text-xs text-white/60 mt-0.5 leading-relaxed">
                              {tab.description}
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleOpenPageEditor(tab.id)}
                          className="p-2.5 rounded-xl border border-sky-500/30 text-sky-400 hover:text-white hover:bg-sky-500/20 transition-all cursor-pointer shrink-0 shadow-sm flex items-center justify-center group"
                          title={`Edit Entire ${tab.label} Page`}
                        >
                          <Edit3 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                      </div>

                      {/* Section Rows */}
                      <div className="divide-y divide-white/5 flex-1 flex flex-col justify-start">
                        {tab.groups.flatMap((grp) => grp.items).map((item) => (
                          <div
                            key={item.id}
                            className="p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-semibold text-white">
                                  {activeLangTab === 'ar' ? item.title.ar : item.title.en}
                                </span>
                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                  Active
                                </span>
                              </div>
                              {item.subtitle && (
                                <p className="text-xs text-white/50 line-clamp-1">
                                  {activeLangTab === 'ar' ? item.subtitle.ar : item.subtitle.en}
                                </p>
                              )}
                              <p className="text-[11px] text-white/40">
                                Last updated: <span className="text-white/60">{item.lastUpdated}</span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}

        {/* ----------------- VIEW 2: FULL PAGE EDITOR ----------------- */}
        {viewMode === 'editor' && (
          <div className="space-y-6">
            {/* Editor Top Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handleBackToOverview}
                  className="border-white/10 text-white hover:bg-white/10 flex items-center gap-2 text-xs py-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-[#F68E2D]" />
                  Back to CMS Overview
                </Button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
                    Editing {activeEditingTab.label}{' '}
                    <span className="text-sm font-normal text-[#F68E2D]">
                      ({activeEditingTab.labelAr})
                    </span>
                  </h1>
                  <p className="text-xs text-white/60">
                    Edit all sections for this page below with full bilingual English & Arabic controls.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {/* Language Switcher: EN / AR direct toggle */}
                <div className="bg-white/5 border border-white/10 rounded-lg p-1 flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('en')}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeLangTab === 'en' ? 'bg-[#F68E2D] text-white shadow-md shadow-[#F68E2D]/20' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>🇬🇧</span> EN
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLangTab('ar')}
                    className={`px-3.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeLangTab === 'ar' ? 'bg-[#F68E2D] text-white shadow-md shadow-[#F68E2D]/20' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <span>🇸🇦</span> AR
                  </button>
                </div>

                <Button
                  onClick={editingTabId === 'home' ? handleSaveHomeData : editingTabId === 'about' ? handleSaveAboutData : editingTabId === 'company' ? handleSaveCompanyData : editingTabId === 'services' ? handleSaveServicesData : editingTabId === 'shop' ? handleSaveShopData : editingTabId === 'projects' ? handleSaveProjectsData : editingTabId === 'partners' ? handleSavePartnersData : editingTabId === 'contact' ? handleSaveContactData : editingTabId === 'investment' ? handleSaveInvestmentData : editingTabId === 'projects-innovator' ? handleSaveProjectsInnovatorData : editingTabId === 'attractive' ? handleSaveAttractiveData : editingTabId === 'medics-innovator' ? handleSaveMedicsInnovatorData : () => handleSaveOtherPageData(editingTabId)}
                  disabled={saving}
                  className="bg-[#F68E2D] hover:bg-[#e28124] text-white font-semibold text-xs px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-lg shadow-[#F68E2D]/20 cursor-pointer"
                >
                  {saving ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" /> Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* IF EDITING HOME PAGE (Sections 1 through 6) */}
            {editingTabId === 'home' && (
              <div className="space-y-8">
                
                {/* SECTION 1: HERO & FOUNDER */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                        1
                      </span>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section I: Hero & Founder Details
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Main Title, Heading Tag, Core Description, and Founder Executive Profile
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Main Title */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Main Title
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <div>
                            <span className="text-[11px] text-white/50 flex items-center gap-1 mb-1">
                              🇬🇧 English Main Title
                            </span>
                            <input
                              type="text"
                              value={data.hero.mainTitle.en}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  hero: {
                                    ...data.hero,
                                    mainTitle: { ...data.hero.mainTitle, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="e.g. Driving Innovation for the Next Generation"
                              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        )}
                        {activeLangTab === 'ar' && (
                          <div>
                            <span className="text-[11px] text-[#F68E2D] flex items-center gap-1 mb-1 font-medium">
                              🇸🇦 العنوان الرئيسي بالعربية
                            </span>
                            <input
                              type="text"
                              dir="rtl"
                              value={data.hero.mainTitle.ar}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  hero: {
                                    ...data.hero,
                                    mainTitle: { ...data.hero.mainTitle, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="مثال: قيادة الابتكار للجيل القادم"
                              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Heading Tag */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Heading Tag / Subtitle
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <div>
                            <span className="text-[11px] text-white/50 flex items-center gap-1 mb-1">
                              🇬🇧 English Tagline
                            </span>
                            <input
                              type="text"
                              value={data.hero.headingTag.en}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  hero: {
                                    ...data.hero,
                                    headingTag: { ...data.hero.headingTag, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="e.g. Empowering Visionaries & Sustainable Growth"
                              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        )}
                        {activeLangTab === 'ar' && (
                          <div>
                            <span className="text-[11px] text-[#F68E2D] flex items-center gap-1 mb-1 font-medium">
                              🇸🇦 الشعار / الوسم الفرعي بالعربية
                            </span>
                            <input
                              type="text"
                              dir="rtl"
                              value={data.hero.headingTag.ar}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  hero: {
                                    ...data.hero,
                                    headingTag: { ...data.hero.headingTag, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="مثال: تمكين أصحاب الرؤى والنمو المستدام"
                              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Main Description */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Main Hero Description
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <div>
                            <span className="text-[11px] text-white/50 flex items-center gap-1 mb-1">
                              🇬🇧 English Description
                            </span>
                            <textarea
                              rows={3}
                              value={data.hero.description.en}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  hero: {
                                    ...data.hero,
                                    description: { ...data.hero.description, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="Enter detailed English description..."
                              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                            />
                          </div>
                        )}
                        {activeLangTab === 'ar' && (
                          <div>
                            <span className="text-[11px] text-[#F68E2D] flex items-center gap-1 mb-1 font-medium">
                              🇸🇦 الوصف الرئيسي بالعربية
                            </span>
                            <textarea
                              rows={3}
                              dir="rtl"
                              value={data.hero.description.ar}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  hero: {
                                    ...data.hero,
                                    description: { ...data.hero.description, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="أدخل الوصف المفصل باللغة العربية..."
                              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Founder Box */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="w-4 h-4 text-[#F68E2D]" />
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                          Founder Executive Details
                        </h3>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start bg-white/5 p-4 rounded-xl border border-white/5">
                        <div className="flex flex-col items-center gap-3 text-center">
                          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#F68E2D] shadow-md bg-black/40">
                            {data.hero.founder.image ? (
                              <img
                                src={data.hero.founder.image}
                                alt="Founder"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                                }}
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white/40">
                                <User className="w-10 h-10" />
                              </div>
                            )}
                          </div>
                          <div className="w-full">
                            <ImageUploadField
                              label="Founder Photo"
                              compact
                              folder="founder"
                              value={data.hero.founder.image || ''}
                              onChange={(url) =>
                                setData({
                                  ...data,
                                  hero: {
                                    ...data.hero,
                                    founder: { ...data.hero.founder, image: url },
                                  },
                                })
                              }
                              placeholder="Photo URL or upload from device"
                            />
                          </div>
                        </div>

                        <div className="lg:col-span-2 space-y-4">
                          <div className="w-full">
                            {activeLangTab === 'en' && (
                              <div>
                                <span className="text-[11px] text-white/50 block mb-1">🇬🇧 Founder Name</span>
                                <input
                                  type="text"
                                  value={data.hero.founder.name.en}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      hero: {
                                        ...data.hero,
                                        founder: {
                                          ...data.hero.founder,
                                          name: { ...data.hero.founder.name, en: e.target.value },
                                        },
                                      },
                                    })
                                  }
                                  placeholder="Dr. Tariq Al-Mansoor"
                                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>
                            )}
                            {activeLangTab === 'ar' && (
                              <div>
                                <span className="text-[11px] text-[#F68E2D] block mb-1 text-right">
                                  🇸🇦 اسم المؤسس بالعربية
                                </span>
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={data.hero.founder.name.ar}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      hero: {
                                        ...data.hero,
                                        founder: {
                                          ...data.hero.founder,
                                          name: { ...data.hero.founder.name, ar: e.target.value },
                                        },
                                      },
                                    })
                                  }
                                  placeholder="د. طارق المنصور"
                                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              </div>
                            )}
                          </div>

                          <div className="w-full">
                            {activeLangTab === 'en' && (
                              <div>
                                <span className="text-[11px] text-white/50 block mb-1">🇬🇧 Founder Bio</span>
                                <textarea
                                  rows={2}
                                  value={data.hero.founder.description.en}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      hero: {
                                        ...data.hero,
                                        founder: {
                                          ...data.hero.founder,
                                          description: { ...data.hero.founder.description, en: e.target.value },
                                        },
                                      },
                                    })
                                  }
                                  placeholder="Executive bio and credentials..."
                                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                                />
                              </div>
                            )}
                            {activeLangTab === 'ar' && (
                              <div>
                                <span className="text-[11px] text-[#F68E2D] block mb-1 text-right">
                                  🇸🇦 نبذة عن المؤسس بالعربية
                                </span>
                                <textarea
                                  rows={2}
                                  dir="rtl"
                                  value={data.hero.founder.description.ar}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      hero: {
                                        ...data.hero,
                                        founder: {
                                          ...data.hero.founder,
                                          description: { ...data.hero.founder.description, ar: e.target.value },
                                        },
                                      },
                                    })
                                  }
                                  placeholder="السيرة الذاتية التنفيذية..."
                                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 2: TRUSTED BRANDS */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                          2
                        </span>
                        <div>
                          <CardTitle className="text-base font-bold text-white">
                            Section II: Trusted Brands & Partners
                          </CardTitle>
                          <p className="text-xs text-white/50">
                            Partner and investor logos displayed in the trusted brands slider ({data.trustedBrands.length} brands)
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={handleAddBrand}
                        className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#F68E2D]/20 self-start sm:self-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Brand
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {data.trustedBrands.map((brand, bIdx) => (
                        <div
                          key={bIdx}
                          className="p-4 rounded-xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-3 relative transition-all group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white/70">Brand #{bIdx + 1}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveBrand(bIdx)}
                              className="text-white/40 hover:text-red-400 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                              title="Delete Brand"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="h-14 bg-black/40 rounded-lg flex items-center justify-center p-2 border border-white/5">
                            {brand.logoUrl ? (
                              <img
                                src={brand.logoUrl}
                                alt={brand.name}
                                className="max-h-full max-w-full object-contain filter brightness-110"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80';
                                }}
                              />
                            ) : (
                              <ImageIcon className="w-6 h-6 text-white/20" />
                            )}
                          </div>

                          <div>
                            <label className="text-[11px] text-white/60 block mb-1">Brand Name</label>
                            <input
                              type="text"
                              value={brand.name}
                              onChange={(e) => handleBrandChange(bIdx, 'name', e.target.value)}
                              placeholder="e.g. Aramco Ventures"
                              className="w-full px-2.5 py-1.5 text-xs rounded bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>

                          <div>
                            <ImageUploadField
                              label="Logo Image"
                              compact
                              folder="brands"
                              value={brand.logoUrl}
                              onChange={(url) => handleBrandChange(bIdx, 'logoUrl', url)}
                              placeholder="Logo URL or upload"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 3: ABOUT & OUR SECTORS */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                        3
                      </span>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section III: About & Our Sectors
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Feature Image, Location, Section Description, and Sector Headings (as pill tags)
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
                      <div className="space-y-3">
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider">
                          Feature Image
                        </label>
                        <div className="relative rounded-xl overflow-hidden h-40 bg-black/40 border border-white/10 flex items-center justify-center">
                          {data.aboutSectorsSection.image ? (
                            <img
                              src={data.aboutSectorsSection.image}
                              alt="Section preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80';
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-white/30" />
                          )}
                        </div>
                        <ImageUploadField
                          folder="sectors"
                          value={data.aboutSectorsSection.image || ''}
                          onChange={(url) =>
                            setData({
                              ...data,
                              aboutSectorsSection: {
                                ...data.aboutSectorsSection,
                                image: url,
                              },
                            })
                          }
                          placeholder="Image URL or upload file"
                        />
                      </div>

                      <div className="lg:col-span-2 space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5">
                            Section Title
                          </label>
                          <div className="w-full">
                            {activeLangTab === 'en' && (
                              <div>
                                <span className="text-[11px] text-white/50 block mb-1">🇬🇧 English Title</span>
                                <input
                                  type="text"
                                  value={data.aboutSectorsSection.title.en}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      aboutSectorsSection: {
                                        ...data.aboutSectorsSection,
                                        title: { ...data.aboutSectorsSection.title, en: e.target.value },
                                      },
                                    })
                                  }
                                  placeholder="e.g. A Diversified Group Built on Excellence"
                                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>
                            )}
                            {activeLangTab === 'ar' && (
                              <div>
                                <span className="text-[11px] text-[#F68E2D] block mb-1 text-right font-medium">
                                  🇸🇦 عنوان القسم بالعربية
                                </span>
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={data.aboutSectorsSection.title.ar}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      aboutSectorsSection: {
                                        ...data.aboutSectorsSection,
                                        title: { ...data.aboutSectorsSection.title, ar: e.target.value },
                                      },
                                    })
                                  }
                                  placeholder="مثال: مجموعة متنوعة مبنية على التميز"
                                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#F68E2D]" /> Location Details
                          </label>
                          <div className="w-full">
                            {activeLangTab === 'en' && (
                              <div>
                                <span className="text-[11px] text-white/50 block mb-1">🇬🇧 English Location</span>
                                <input
                                  type="text"
                                  value={data.aboutSectorsSection.location.en}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      aboutSectorsSection: {
                                        ...data.aboutSectorsSection,
                                        location: { ...data.aboutSectorsSection.location, en: e.target.value },
                                      },
                                    })
                                  }
                                  placeholder="e.g. Arasat Street, Karrada, Baghdad, Iraq"
                                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>
                            )}
                            {activeLangTab === 'ar' && (
                              <div>
                                <span className="text-[11px] text-[#F68E2D] block mb-1 text-right font-medium">
                                  🇸🇦 الموقع الجغرافي بالعربية
                                </span>
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={data.aboutSectorsSection.location.ar}
                                  onChange={(e) =>
                                    setData({
                                      ...data,
                                      aboutSectorsSection: {
                                        ...data.aboutSectorsSection,
                                        location: { ...data.aboutSectorsSection.location, ar: e.target.value },
                                      },
                                    })
                                  }
                                  placeholder="مثال: شارع العرصات، الكرادة، بغداد، العراق"
                                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Description
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <div>
                            <span className="text-[11px] text-white/50 block mb-1">🇬🇧 English Description</span>
                            <textarea
                              rows={3}
                              value={data.aboutSectorsSection.description.en}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  aboutSectorsSection: {
                                    ...data.aboutSectorsSection,
                                    description: { ...data.aboutSectorsSection.description, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="Mobtaker Group is a multi-sector group..."
                              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                            />
                          </div>
                        )}
                        {activeLangTab === 'ar' && (
                          <div>
                            <span className="text-[11px] text-[#F68E2D] block mb-1 text-right font-medium">
                              🇸🇦 وصف القسم بالعربية
                            </span>
                            <textarea
                              rows={3}
                              dir="rtl"
                              value={data.aboutSectorsSection.description.ar}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  aboutSectorsSection: {
                                    ...data.aboutSectorsSection,
                                    description: { ...data.aboutSectorsSection.description, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="مجموعة مبتكر هي مجموعة متعددة القطاعات..."
                              className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Sectors List (Headings Only) */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#F68E2D]" />
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                              Our Sectors ({data.aboutSectorsSection.sectors.length})
                            </h3>
                          </div>
                          <p className="text-xs text-white/50 mt-0.5">
                            Sector headings displayed as interactive pill tags in the website UI.
                          </p>
                        </div>
                        <Button
                          onClick={handleAddSector}
                          className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#F68E2D]/20 self-start sm:self-auto"
                        >
                          <Plus className="w-3.5 h-3.5" /> Add Sector
                        </Button>
                      </div>

                      {/* Live Pill Preview Matching Exact Website UI */}
                      <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
                        <span className="text-[11px] font-semibold text-white/60 uppercase tracking-wider block">
                          {activeLangTab === 'ar' ? 'معاينة قطاعاتنا في الموقع (Live Sectors Preview)' : 'Our Sectors Live Preview'}
                        </span>
                        <div className="flex flex-wrap items-center gap-2 pt-1" dir={activeLangTab === 'ar' ? 'rtl' : 'ltr'}>
                          {data.aboutSectorsSection.sectors.length === 0 ? (
                            <span className="text-xs text-white/40 italic">
                              No sectors yet. Click &quot;Add Sector&quot; above to add one.
                            </span>
                          ) : (
                            data.aboutSectorsSection.sectors.map((sec, idx) => (
                              <span
                                key={sec.id || idx}
                                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/15 text-white shadow-sm transition-all"
                              >
                                {activeLangTab === 'ar' ? (sec.title.ar || 'قطاع جديد') : (sec.title.en || 'New Sector')}
                              </span>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Sector Headings Inputs List */}
                      <div className="space-y-2.5">
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider">
                          Sector Headings ({activeLangTab === 'en' ? '🇬🇧 English' : '🇸🇦 العربية'})
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                          {data.aboutSectorsSection.sectors.map((sector, sIdx) => (
                            <div
                              key={sector.id || sIdx}
                              className="p-3 rounded-xl bg-white/5 hover:bg-white/[0.08] border border-white/10 flex items-center gap-2.5 transition-all group"
                            >
                              <span className="w-7 h-7 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] text-xs font-bold flex items-center justify-center shrink-0">
                                {sIdx + 1}
                              </span>

                              <div className="flex-1 min-w-0">
                                {activeLangTab === 'en' && (
                                  <input
                                    type="text"
                                    value={sector.title.en}
                                    onChange={(e) => handleSectorChange(sIdx, 'en', e.target.value)}
                                    placeholder="e.g. Healthcare..."
                                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                )}
                                {activeLangTab === 'ar' && (
                                  <input
                                    type="text"
                                    dir="rtl"
                                    value={sector.title.ar}
                                    onChange={(e) => handleSectorChange(sIdx, 'ar', e.target.value)}
                                    placeholder="مثال: الرعاية الصحية..."
                                    className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveSector(sIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                                title="Remove sector"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 4: SPECIALIZED COMPANIES & DIVISIONS */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                          4
                        </span>
                        <div>
                          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                            <Briefcase className="w-4 h-4 text-[#F68E2D]" />
                            Section IV: Specialized Companies & Divisions
                          </CardTitle>
                          <p className="text-xs text-white/50">
                            Three specialized group divisions with company logo, name, description, and explore link ({data.companiesSection?.companies?.length || 0} companies)
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={handleAddCompany}
                        className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#F68E2D]/20 self-start sm:self-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Company
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Section Tagline */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Tagline
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={data.companiesSection?.tagline?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                companiesSection: {
                                  ...data.companiesSection,
                                  tagline: { ...(data.companiesSection?.tagline || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. OUR COMPANIES"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={data.companiesSection?.tagline?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                companiesSection: {
                                  ...data.companiesSection,
                                  tagline: { ...(data.companiesSection?.tagline || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: شركاتنا المتخصصة"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Section Title */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Main Section Title
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={data.companiesSection?.title?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                companiesSection: {
                                  ...data.companiesSection,
                                  title: { ...(data.companiesSection?.title || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. Three Specialized Divisions. One Group"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={data.companiesSection?.title?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                companiesSection: {
                                  ...data.companiesSection,
                                  title: { ...(data.companiesSection?.title || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: ثلاثة أقسام متخصصة. مجموعة واحدة"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Section Short Description */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Short Description
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <textarea
                            rows={2}
                            value={data.companiesSection?.description?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                companiesSection: {
                                  ...data.companiesSection,
                                  description: { ...(data.companiesSection?.description || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="Discover the specialized companies driving innovation and excellence across our group."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <textarea
                            rows={2}
                            dir="rtl"
                            value={data.companiesSection?.description?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                companiesSection: {
                                  ...data.companiesSection,
                                  description: { ...(data.companiesSection?.description || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="اكتشف الشركات المتخصصة التي تقود الابتكار والتميز عبر مجموعتنا."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                          />
                        )}
                      </div>
                    </div>

                    {/* Companies Cards List */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Division Companies Cards ({data.companiesSection?.companies?.length || 0})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(data.companiesSection?.companies || []).map((comp, cIdx) => (
                          <div
                            key={comp.id || cIdx}
                            className="p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-4 relative transition-all group flex flex-col justify-between"
                          >
                            <div className="space-y-3">
                              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                <span className="text-xs font-bold text-[#F68E2D]">
                                  Company #{cIdx + 1}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCompany(cIdx)}
                                  className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                  title="Delete company"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Logo preview and URL */}
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">Company Logo</label>
                                <div className="h-16 bg-white/90 rounded-xl p-2 flex items-center justify-center border border-white/10 mb-2">
                                  {comp.logoUrl ? (
                                    <img
                                      src={comp.logoUrl}
                                      alt="Company logo"
                                      className="max-h-full max-w-full object-contain"
                                      onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80';
                                      }}
                                    />
                                  ) : (
                                    <ImageIcon className="w-6 h-6 text-black/30" />
                                  )}
                                </div>
                                <ImageUploadField
                                  compact
                                  folder="companies"
                                  value={comp.logoUrl}
                                  onChange={(url) => handleCompanyChange(cIdx, 'logoUrl', url)}
                                  placeholder="Logo URL or upload"
                                />
                              </div>

                              {/* Company Name */}
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">Company Name</label>
                                {activeLangTab === 'en' && (
                                  <input
                                    type="text"
                                    value={comp.name.en}
                                    onChange={(e) => handleCompanyChange(cIdx, 'name', 'en', e.target.value)}
                                    placeholder="e.g. Projects Innovator"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                )}
                                {activeLangTab === 'ar' && (
                                  <input
                                    type="text"
                                    dir="rtl"
                                    value={comp.name.ar}
                                    onChange={(e) => handleCompanyChange(cIdx, 'name', 'ar', e.target.value)}
                                    placeholder="مثال: مبتكر المشاريع"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                )}
                              </div>

                              {/* Company Description */}
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">Description</label>
                                {activeLangTab === 'en' && (
                                  <textarea
                                    rows={3}
                                    value={comp.description.en}
                                    onChange={(e) => handleCompanyChange(cIdx, 'description', 'en', e.target.value)}
                                    placeholder="Delivering innovative construction and infrastructure solutions..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                  />
                                )}
                                {activeLangTab === 'ar' && (
                                  <textarea
                                    rows={3}
                                    dir="rtl"
                                    value={comp.description.ar}
                                    onChange={(e) => handleCompanyChange(cIdx, 'description', 'ar', e.target.value)}
                                    placeholder="تقديم حلول بناء وبنية تحتية مبتكرة..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                                  />
                                )}
                              </div>

                              {/* Website / Explore URL */}
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">Explore URL / Route</label>
                                <input
                                  type="text"
                                  value={comp.websiteUrl || ''}
                                  onChange={(e) => handleCompanyChange(cIdx, 'websiteUrl', e.target.value)}
                                  placeholder="/projects-innovator"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>

                              {/* Card Color (Red / Blue) */}
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <label className="text-[11px] text-white/60 block">
                                    {activeLangTab === 'ar' ? 'لون البطاقة (Color)' : 'Card Color'}
                                  </label>
                                  <span
                                    className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full flex items-center gap-1.5 transition-all"
                                    style={{
                                      backgroundColor: (comp.color || 'blue').toLowerCase() === 'red' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(59, 130, 246, 0.15)',
                                      color: (comp.color || 'blue').toLowerCase() === 'red' ? '#f87171' : '#60a5fa',
                                      border: `1px solid ${(comp.color || 'blue').toLowerCase() === 'red' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(59, 130, 246, 0.3)'}`,
                                    }}
                                  >
                                    <span
                                      className="w-1.5 h-1.5 rounded-full"
                                      style={{
                                        backgroundColor: (comp.color || 'blue').toLowerCase() === 'red' ? '#ef4444' : '#3b82f6',
                                      }}
                                    />
                                    {(comp.color || 'blue').toUpperCase()}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <select
                                    value={comp.color || 'blue'}
                                    onChange={(e) => handleCompanyChange(cIdx, 'color', e.target.value)}
                                    className="flex-1 px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] cursor-pointer"
                                  >
                                    <option value="red" className="bg-[#14112E] text-red-400">🔴 Red {activeLangTab === 'ar' ? '(أحمر)' : ''}</option>
                                    <option value="blue" className="bg-[#14112E] text-blue-400">🔵 Blue {activeLangTab === 'ar' ? '(أزرق)' : ''}</option>
                                  </select>
                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => handleCompanyChange(cIdx, 'color', 'red')}
                                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                                        (comp.color || 'blue').toLowerCase() === 'red'
                                          ? 'bg-red-600/90 text-white border-red-500 shadow-md shadow-red-500/30'
                                          : 'bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10'
                                      }`}
                                    >
                                      Red
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleCompanyChange(cIdx, 'color', 'blue')}
                                      className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                                        (comp.color || 'blue').toLowerCase() === 'blue'
                                          ? 'bg-blue-600/90 text-white border-blue-500 shadow-md shadow-blue-500/30'
                                          : 'bg-white/5 text-white/50 border-white/10 hover:text-white hover:bg-white/10'
                                      }`}
                                    >
                                      Blue
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 5: PURPOSE, VISION & MISSION */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                          5
                        </span>
                        <div>
                          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                            <Target className="w-4 h-4 text-[#F68E2D]" />
                            Section V: Purpose, Vision & Mission
                          </CardTitle>
                          <p className="text-xs text-white/50">
                            Core strategic purpose, vision & mission cards, and guiding principles infographic image
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={handleAddPurposeTag}
                        className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#F68E2D]/20 self-start sm:self-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Purpose Tag
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Section Tagline */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Tagline
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={data.purposeSection?.tagline?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                purposeSection: {
                                  ...data.purposeSection,
                                  tagline: { ...(data.purposeSection?.tagline || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. OUR PURPOSE"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={data.purposeSection?.tagline?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                purposeSection: {
                                  ...data.purposeSection,
                                  tagline: { ...(data.purposeSection?.tagline || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: هدفنا ورسالتنا"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Section Title */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Main Section Title
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={data.purposeSection?.title?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                purposeSection: {
                                  ...data.purposeSection,
                                  title: { ...(data.purposeSection?.title || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. Driven by Vision. Defined by Purpose."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={data.purposeSection?.title?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                purposeSection: {
                                  ...data.purposeSection,
                                  title: { ...(data.purposeSection?.title || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: مدفوعون بالرؤية. محددون بالهدف."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Short Description
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <textarea
                            rows={2}
                            value={data.purposeSection?.description?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                purposeSection: {
                                  ...data.purposeSection,
                                  description: { ...(data.purposeSection?.description || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="We bring businesses and people together through strategic investment..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <textarea
                            rows={2}
                            dir="rtl"
                            value={data.purposeSection?.description?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                purposeSection: {
                                  ...data.purposeSection,
                                  description: { ...(data.purposeSection?.description || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="نجمع بين الشركات والأفراد من خلال الاستثمار الاستراتيجي..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                          />
                        )}
                      </div>
                    </div>

                    {/* Infographic Image URL & Preview */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <ImageIcon className="w-3.5 h-3.5 text-[#F68E2D]" />
                        Vision & Mission Infographic Image
                      </label>
                      <div className="space-y-3">
                        <div className="h-44 rounded-xl overflow-hidden bg-black/40 border border-white/10 flex items-center justify-center">
                          {data.purposeSection?.image ? (
                            <img
                              src={data.purposeSection.image}
                              alt="Vision & Mission diagram"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80';
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-10 h-10 text-white/20" />
                          )}
                        </div>
                        <ImageUploadField
                          folder="infographics"
                          value={data.purposeSection?.image || ''}
                          onChange={(url) =>
                            setData({
                              ...data,
                              purposeSection: {
                                ...data.purposeSection,
                                image: url,
                              },
                            })
                          }
                          placeholder="Infographic diagram URL or upload"
                          helperText="Upload diagram image file directly or enter remote URL"
                        />
                      </div>
                    </div>

                    {/* Purpose Tags List */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Purpose & Guiding Principles Cards ({data.purposeSection?.tags?.length || 0})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(data.purposeSection?.tags || []).map((tag, tIdx) => (
                          <div
                            key={tag.id || tIdx}
                            className="p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-3 relative transition-all group"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                                <Compass className="w-3.5 h-3.5" /> Principle #{tIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemovePurposeTag(tIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete tag"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Tag Title */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">Title</label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={tag.title.en}
                                  onChange={(e) => handlePurposeTagChange(tIdx, 'title', 'en', e.target.value)}
                                  placeholder="e.g. Our Vision"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={tag.title.ar}
                                  onChange={(e) => handlePurposeTagChange(tIdx, 'title', 'ar', e.target.value)}
                                  placeholder="مثال: رؤيتنا"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            {/* Tag Description */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">Description</label>
                              {activeLangTab === 'en' && (
                                <textarea
                                  rows={3}
                                  value={tag.description.en}
                                  onChange={(e) => handlePurposeTagChange(tIdx, 'description', 'en', e.target.value)}
                                  placeholder="To create meaningful opportunities for businesses and individuals..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <textarea
                                  rows={3}
                                  dir="rtl"
                                  value={tag.description.ar}
                                  onChange={(e) => handlePurposeTagChange(tIdx, 'description', 'ar', e.target.value)}
                                  placeholder="خلق فرص ذات مغزى للشركات والأفراد..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 6: CTA BANNER */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                        6
                      </span>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <Zap className="w-4 h-4 text-[#F68E2D]" />
                          Section VI: Call-To-Action Banner
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Full-width gradient conversion banner with title, tagline, description, and action buttons
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Banner Live Preview Box Matching User's Image */}
                    <div className="relative rounded-2xl overflow-hidden p-8 sm:p-12 text-center shadow-2xl bg-gradient-to-r from-[#701020] via-[#851828] to-[#450812] border border-red-500/20 space-y-4">
                      <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/20 text-white/80 border border-white/15">
                        {activeLangTab === 'ar' ? (data.bannerSection?.tagline?.ar || 'لنعمل معاً') : (data.bannerSection?.tagline?.en || "LET'S WORK TOGETHER")}
                      </div>
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
                        {activeLangTab === 'ar' ? (data.bannerSection?.title?.ar || 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.') : (data.bannerSection?.title?.en || "Let's Build Something That Moves Business Forward.")}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
                        {activeLangTab === 'ar' ? (data.bannerSection?.description?.ar || 'هل تبحث عن منتجات طبية، أو معدات، أو حلول صيدلانية، أو خدمات أعمال؟') : (data.bannerSection?.description?.en || 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.')}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                        <span className="px-5 py-2.5 rounded-full text-xs font-bold bg-white text-[#701020] shadow-md flex items-center gap-1.5">
                          {activeLangTab === 'ar' ? (data.bannerSection?.primaryButtonText?.ar || 'احصل على عرض سعر') : (data.bannerSection?.primaryButtonText?.en || 'Get a Quote')} &rarr;
                        </span>
                        <span className="px-5 py-2.5 rounded-full text-xs font-bold bg-transparent border border-white/40 text-white hover:bg-white/10">
                          {activeLangTab === 'ar' ? (data.bannerSection?.secondaryButtonText?.ar || 'اتصل بنا') : (data.bannerSection?.secondaryButtonText?.en || 'Contact Us')}
                        </span>
                      </div>
                    </div>

                    {/* Tagline input */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Banner Tagline
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={data.bannerSection?.tagline?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  tagline: { ...(data.bannerSection?.tagline || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. LET'S WORK TOGETHER"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={data.bannerSection?.tagline?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  tagline: { ...(data.bannerSection?.tagline || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: لنعمل معاً"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Title input */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Banner Main Title
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={data.bannerSection?.title?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  title: { ...(data.bannerSection?.title || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. Let's Build Something That Moves Business Forward."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={data.bannerSection?.title?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  title: { ...(data.bannerSection?.title || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: دعنا نبني شيئاً يدفع الأعمال إلى الأمام."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Description input */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Banner Short Description
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <textarea
                            rows={3}
                            value={data.bannerSection?.description?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  description: { ...(data.bannerSection?.description || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="Looking for medical products, equipment, pharmaceutical solutions..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <textarea
                            rows={3}
                            dir="rtl"
                            value={data.bannerSection?.description?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  description: { ...(data.bannerSection?.description || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="هل تبحث عن منتجات طبية، أو معدات، أو حلول صيدلانية..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                          />
                        )}
                      </div>
                    </div>

                    {/* Button configurations */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      <div>
                        <label className="text-xs font-semibold text-white/80 block mb-1">
                          Primary Button Text ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                        </label>
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={data.bannerSection?.primaryButtonText?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  primaryButtonText: { ...(data.bannerSection?.primaryButtonText || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="Get a Quote"
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={data.bannerSection?.primaryButtonText?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  primaryButtonText: { ...(data.bannerSection?.primaryButtonText || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="احصل على عرض سعر"
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-white/80 block mb-1">
                          Secondary Button Text ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                        </label>
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={data.bannerSection?.secondaryButtonText?.en || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  secondaryButtonText: { ...(data.bannerSection?.secondaryButtonText || { en: '', ar: '' }), en: e.target.value },
                                },
                              })
                            }
                            placeholder="Contact Us"
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={data.bannerSection?.secondaryButtonText?.ar || ''}
                            onChange={(e) =>
                              setData({
                                ...data,
                                bannerSection: {
                                  ...data.bannerSection,
                                  secondaryButtonText: { ...(data.bannerSection?.secondaryButtonText || { en: '', ar: '' }), ar: e.target.value },
                                },
                              })
                            }
                            placeholder="اتصل بنا"
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            )}

                        {/* IF EDITING ABOUT US PAGE (Sections 1 through 4) */}
            {editingTabId === 'about' && (
              <div className="space-y-8">
                {/* SECTION 1: PAGE HEADER & OVERVIEW */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                        1
                      </span>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 1: Page Header & Overview
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Main page title and primary introductory description
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Main Title */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Page Title
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={aboutData.headerSection.title.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                headerSection: {
                                  ...aboutData.headerSection,
                                  title: { ...aboutData.headerSection.title, en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. About Us"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={aboutData.headerSection.title.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                headerSection: {
                                  ...aboutData.headerSection,
                                  title: { ...aboutData.headerSection.title, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: من نحن"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Page Subtitle / Description */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Page Subtitle / Overview Description
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <textarea
                            rows={3}
                            value={aboutData.headerSection.description.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                headerSection: {
                                  ...aboutData.headerSection,
                                  description: { ...aboutData.headerSection.description, en: e.target.value },
                                },
                              })
                            }
                            placeholder="Discover our heritage, explore our journey of evolution..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <textarea
                            rows={3}
                            dir="rtl"
                            value={aboutData.headerSection.description.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                headerSection: {
                                  ...aboutData.headerSection,
                                  description: { ...aboutData.headerSection.description, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="اكتشف تراثنا، واستكشف مسيرة تطورنا..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                          />
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 2: OUR HERITAGE */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                        2
                      </span>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <History className="w-4 h-4 text-[#F68E2D]" />
                          Section 2: Our Heritage & Foundation
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Heritage narrative, foundation photo, and established year badge overlay
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Tagline */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Tagline
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={aboutData.heritageSection.tagline.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                heritageSection: {
                                  ...aboutData.heritageSection,
                                  tagline: { ...aboutData.heritageSection.tagline, en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. OUR HERITAGE"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={aboutData.heritageSection.tagline.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                heritageSection: {
                                  ...aboutData.heritageSection,
                                  tagline: { ...aboutData.heritageSection.tagline, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: تراثنا وعراقتنا"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Main Title
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={aboutData.heritageSection.title.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                heritageSection: {
                                  ...aboutData.heritageSection,
                                  title: { ...aboutData.heritageSection.title, en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. Built on Trust. Driven by Ambition."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={aboutData.heritageSection.title.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                heritageSection: {
                                  ...aboutData.heritageSection,
                                  title: { ...aboutData.heritageSection.title, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: مبني على الثقة. مدفوع بالطموح."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Description
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <textarea
                            rows={3}
                            value={aboutData.heritageSection.description.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                heritageSection: {
                                  ...aboutData.heritageSection,
                                  description: { ...aboutData.heritageSection.description, en: e.target.value },
                                },
                              })
                            }
                            placeholder="Mobtaker Group brings together specialized businesses under a shared commitment..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <textarea
                            rows={3}
                            dir="rtl"
                            value={aboutData.heritageSection.description.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                heritageSection: {
                                  ...aboutData.heritageSection,
                                  description: { ...aboutData.heritageSection.description, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="تجمع مجموعة مبتكر بين الشركات المتخصصة..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                          />
                        )}
                      </div>
                    </div>

                    {/* Heritage Photo & Established Badge Overlay */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-white/10 items-start">
                      <div className="space-y-3">
                        <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider">
                          Heritage Feature Photo
                        </label>
                        <div className="relative rounded-2xl overflow-hidden h-48 bg-black/40 border border-white/10 flex items-center justify-center group">
                          {aboutData.heritageSection.image ? (
                            <img
                              src={aboutData.heritageSection.image}
                              alt="Heritage preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80';
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-10 h-10 text-white/20" />
                          )}

                          {/* Live preview of badge over photo */}
                          <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-left shadow-lg">
                            <span className="block text-sm font-extrabold text-red-500">
                              {aboutData.heritageSection.badgeYear || '2017'}
                            </span>
                            <span className="block text-[10px] text-white/70 uppercase tracking-wider">
                              {activeLangTab === 'ar' ? (aboutData.heritageSection.badgeText.ar || 'سنة التأسيس') : (aboutData.heritageSection.badgeText.en || 'Established')}
                            </span>
                          </div>
                        </div>

                        <ImageUploadField
                          folder="about-heritage"
                          value={aboutData.heritageSection.image}
                          onChange={(url) =>
                            setAboutData({
                              ...aboutData,
                              heritageSection: { ...aboutData.heritageSection, image: url },
                            })
                          }
                          placeholder="Photo URL or upload from device"
                        />
                      </div>

                      {/* Tagline Content: Established Badge controls */}
                      <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/5">
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#F68E2D]" />
                          Tagline Content (Established Badge Overlay)
                        </h4>
                        <p className="text-xs text-white/50">
                          The highlighted badge overlay displayed on the heritage photo (as shown in the reference UI).
                        </p>

                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">Badge Year (Number)</label>
                          <input
                            type="text"
                            value={aboutData.heritageSection.badgeYear}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                heritageSection: { ...aboutData.heritageSection, badgeYear: e.target.value },
                              })
                            }
                            placeholder="e.g. 2017"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">
                            Badge Text Label ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                          </label>
                          {activeLangTab === 'en' && (
                            <input
                              type="text"
                              value={aboutData.heritageSection.badgeText.en}
                              onChange={(e) =>
                                setAboutData({
                                  ...aboutData,
                                  heritageSection: {
                                    ...aboutData.heritageSection,
                                    badgeText: { ...aboutData.heritageSection.badgeText, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="e.g. Established"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          )}
                          {activeLangTab === 'ar' && (
                            <input
                              type="text"
                              dir="rtl"
                              value={aboutData.heritageSection.badgeText.ar}
                              onChange={(e) =>
                                setAboutData({
                                  ...aboutData,
                                  heritageSection: {
                                    ...aboutData.heritageSection,
                                    badgeText: { ...aboutData.heritageSection.badgeText, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="مثال: سنة التأسيس"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 3: EVOLVING THROUGH OPPORTUNITY (OUR JOURNEY) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                          3
                        </span>
                        <div>
                          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-[#F68E2D]" />
                            Section 3: Journey & Milestones Cards
                          </CardTitle>
                          <p className="text-xs text-white/50">
                            Chronological evolution steps with number, title, and description ({aboutData.journeySection.items.length} cards)
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={handleAddJourneyItem}
                        className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#F68E2D]/20 self-start sm:self-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Milestone Card
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Tagline */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Tagline
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={aboutData.journeySection.tagline.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                journeySection: {
                                  ...aboutData.journeySection,
                                  tagline: { ...aboutData.journeySection.tagline, en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. OUR JOURNEY"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={aboutData.journeySection.tagline.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                journeySection: {
                                  ...aboutData.journeySection,
                                  tagline: { ...aboutData.journeySection.tagline, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: مسيرتنا"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Main Title
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={aboutData.journeySection.title.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                journeySection: {
                                  ...aboutData.journeySection,
                                  title: { ...aboutData.journeySection.title, en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. Evolving Through Opportunity"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={aboutData.journeySection.title.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                journeySection: {
                                  ...aboutData.journeySection,
                                  title: { ...aboutData.journeySection.title, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: التطور من خلال الفرص"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Description
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <textarea
                            rows={2}
                            value={aboutData.journeySection.description.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                journeySection: {
                                  ...aboutData.journeySection,
                                  description: { ...aboutData.journeySection.description, en: e.target.value },
                                },
                              })
                            }
                            placeholder="Our journey reflects a commitment to adapting, expanding, and creating lasting value..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <textarea
                            rows={2}
                            dir="rtl"
                            value={aboutData.journeySection.description.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                journeySection: {
                                  ...aboutData.journeySection,
                                  description: { ...aboutData.journeySection.description, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="تعكس مسيرتنا التزاماً بالتكيف والتوسع وخلق قيمة دائمة..."
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                          />
                        )}
                      </div>
                    </div>

                    {/* Milestone Cards List (Repeats with Add Button: number, title, description) */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Milestone Cards ({aboutData.journeySection.items.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {aboutData.journeySection.items.map((item, jIdx) => (
                          <div
                            key={item.id || jIdx}
                            className="p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-4 relative transition-all group"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <div className="flex items-center gap-2">
                                <label className="text-[11px] text-white/50">Number:</label>
                                <input
                                  type="text"
                                  value={item.number}
                                  onChange={(e) => handleJourneyItemChange(jIdx, 'number', e.target.value)}
                                  placeholder="01"
                                  className="w-16 px-2.5 py-1 text-xs font-bold text-red-400 rounded bg-black/40 border border-white/15 focus:outline-none focus:border-red-500"
                                />
                              </div>

                              <button
                                type="button"
                                onClick={() => handleRemoveJourneyItem(jIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete milestone"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Milestone Title */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">Milestone Title</label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={item.title.en}
                                  onChange={(e) => handleJourneyItemChange(jIdx, 'title', 'en', e.target.value)}
                                  placeholder="e.g. Building a Strong Foundation"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={item.title.ar}
                                  onChange={(e) => handleJourneyItemChange(jIdx, 'title', 'ar', e.target.value)}
                                  placeholder="مثال: بناء أساس قوي"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            {/* Milestone Description */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">Description</label>
                              {activeLangTab === 'en' && (
                                <textarea
                                  rows={3}
                                  value={item.description.en}
                                  onChange={(e) => handleJourneyItemChange(jIdx, 'description', 'en', e.target.value)}
                                  placeholder="Establishing trusted relationships and developing a foundation..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <textarea
                                  rows={3}
                                  dir="rtl"
                                  value={item.description.ar}
                                  onChange={(e) => handleJourneyItemChange(jIdx, 'description', 'ar', e.target.value)}
                                  placeholder="بناء علاقات موثوقة وتطوير أساس لنمو الأعمال المستدام..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 4: OUR IMPACT IN NUMBERS (3 STAT BOXES) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-[#F68E2D]/20 text-[#F68E2D] font-black text-sm flex items-center justify-center border border-[#F68E2D]/30">
                          4
                        </span>
                        <div>
                          <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                            <Award className="w-4 h-4 text-[#F68E2D]" />
                            Section 4: Our Impact in Numbers (Stat Boxes)
                          </CardTitle>
                          <p className="text-xs text-white/50">
                            Key quantitative indicators and milestone achievements ({aboutData.impactSection.stats.length} stat boxes)
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={handleAddStatItem}
                        className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs py-1.5 px-3 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#F68E2D]/20 self-start sm:self-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Stat Box
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Tagline */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Tagline
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={aboutData.impactSection.tagline.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                impactSection: {
                                  ...aboutData.impactSection,
                                  tagline: { ...aboutData.impactSection.tagline, en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. OUR ACHIEVEMENTS"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={aboutData.impactSection.tagline.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                impactSection: {
                                  ...aboutData.impactSection,
                                  tagline: { ...aboutData.impactSection.tagline, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: إنجازاتنا"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-xs font-semibold text-white/80 uppercase tracking-wider mb-2">
                        Section Main Title
                      </label>
                      <div className="w-full">
                        {activeLangTab === 'en' && (
                          <input
                            type="text"
                            value={aboutData.impactSection.title.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                impactSection: {
                                  ...aboutData.impactSection,
                                  title: { ...aboutData.impactSection.title, en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. Our Impact in Numbers"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <input
                            type="text"
                            dir="rtl"
                            value={aboutData.impactSection.title.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                impactSection: {
                                  ...aboutData.impactSection,
                                  title: { ...aboutData.impactSection.title, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: أثرنا بالأرقام"
                            className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Stat Boxes List (Number, Description) */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Key Metric Stat Boxes ({aboutData.impactSection.stats.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {aboutData.impactSection.stats.map((stat, sIdx) => (
                          <div
                            key={stat.id || sIdx}
                            className="p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-4 relative transition-all group"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-xs font-bold text-red-400">
                                Stat Box #{sIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveStatItem(sIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete stat box"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Stat Number */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">Metric Number</label>
                              <input
                                type="text"
                                value={stat.number}
                                onChange={(e) => handleStatItemChange(sIdx, 'number', e.target.value)}
                                placeholder="e.g. 20+, 500+, 140+"
                                className="w-full px-3 py-2 text-sm font-black text-red-500 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-red-500"
                              />
                            </div>

                            {/* Stat Description */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={stat.description.en}
                                  onChange={(e) => handleStatItemChange(sIdx, 'description', 'en', e.target.value)}
                                  placeholder="e.g. Years of Excellence"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={stat.description.ar}
                                  onChange={(e) => handleStatItemChange(sIdx, 'description', 'ar', e.target.value)}
                                  placeholder="مثال: سنوات من التميز"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
 
                {/* SECTION 5: OUR LEADERSHIP (IMAGE 6) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center font-bold text-white text-xs">
                        5
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 5: Our Leadership
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Tagline, title, description, and executive leadership profiles
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddLeader}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Leader
                    </Button>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Tagline */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Tagline ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.leadershipSection.tagline.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              leadershipSection: {
                                ...aboutData.leadershipSection,
                                tagline: { ...aboutData.leadershipSection.tagline, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. OUR LEADERSHIP"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.leadershipSection.tagline.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              leadershipSection: {
                                ...aboutData.leadershipSection,
                                tagline: { ...aboutData.leadershipSection.tagline, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: قيادتنا"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.leadershipSection.title.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              leadershipSection: {
                                ...aboutData.leadershipSection,
                                title: { ...aboutData.leadershipSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. The People Behind Our Progress"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.leadershipSection.title.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              leadershipSection: {
                                ...aboutData.leadershipSection,
                                title: { ...aboutData.leadershipSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: الأشخاص الذين يقودون تقدمنا"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={aboutData.leadershipSection.description.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              leadershipSection: {
                                ...aboutData.leadershipSection,
                                description: { ...aboutData.leadershipSection.description, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Meet the leadership and teams working together to deliver quality..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={aboutData.leadershipSection.description.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              leadershipSection: {
                                ...aboutData.leadershipSection,
                                description: { ...aboutData.leadershipSection.description, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: تعرف على القيادة والفرق التي تعمل معاً لتقديم الجودة..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* Repeating Leaders List */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Leadership Members ({aboutData.leadershipSection.leaders.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {aboutData.leadershipSection.leaders.map((leader, lIdx) => (
                          <div
                            key={leader.id || lIdx}
                            className="p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-4 relative transition-all"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-xs font-bold text-red-400">
                                Leader #{lIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveLeader(lIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete leader"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Image Upload */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Leader Photo (Portrait)
                              </label>
                              <ImageUploadField
                                value={leader.image || ''}
                                onChange={(url) => handleLeaderChange(lIdx, 'image', url)}
                                folder="leadership"
                                label="Upload Leader Photo"
                              />
                            </div>

                            {/* Name */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Full Name ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={leader.name.en}
                                  onChange={(e) => handleLeaderChange(lIdx, 'name', 'en', e.target.value)}
                                  placeholder="e.g. Dr. Ahmed Dhahir"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={leader.name.ar}
                                  onChange={(e) => handleLeaderChange(lIdx, 'name', 'ar', e.target.value)}
                                  placeholder="مثال: د. أحمد ظاهر"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            {/* Role */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Designation / Role ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={leader.role.en}
                                  onChange={(e) => handleLeaderChange(lIdx, 'role', 'en', e.target.value)}
                                  placeholder="e.g. Founder & CEO"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={leader.role.ar}
                                  onChange={(e) => handleLeaderChange(lIdx, 'role', 'ar', e.target.value)}
                                  placeholder="مثال: المؤسس والمدير التنفيذي"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 6: OUR MANAGEMENT TEAM (IMAGE 7) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center font-bold text-white text-xs">
                        6
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 6: Our Management Team
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Group divisions with company logos, links, and nested management team members
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddDivision}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Division
                    </Button>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.managementSection.title.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              managementSection: {
                                ...aboutData.managementSection,
                                title: { ...aboutData.managementSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Our Management Team"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.managementSection.title.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              managementSection: {
                                ...aboutData.managementSection,
                                title: { ...aboutData.managementSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: فريق إدارتنا"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Divisions List */}
                    <div className="pt-4 border-t border-white/10 space-y-6">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Specialized Divisions ({aboutData.managementSection.divisions.length})
                      </h4>

                      <div className="space-y-6">
                        {aboutData.managementSection.divisions.map((division, dIdx) => (
                          <div
                            key={division.id || dIdx}
                            className="p-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-5 transition-all"
                          >
                            <div className="flex items-center justify-between pb-3 border-b border-white/10">
                              <div className="flex items-center gap-3">
                                <span className="px-2.5 py-1 rounded-md text-xs font-black bg-red-600/30 text-red-400 border border-red-500/30">
                                  {division.badge || `DIV ${dIdx + 1}`}
                                </span>
                                <span className="text-sm font-bold text-white">
                                  {division.companyName.en || `Division #${dIdx + 1}`}
                                </span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveDivision(dIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete division"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {/* Short Badge */}
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">
                                  Short Badge (e.g. PI, AT, MI)
                                </label>
                                <input
                                  type="text"
                                  value={division.badge}
                                  onChange={(e) => handleDivisionChange(dIdx, 'badge', e.target.value)}
                                  placeholder="e.g. PI"
                                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>

                              {/* Company Logo */}
                              <div className="md:col-span-2">
                                <label className="text-[11px] text-white/60 block mb-1">
                                  Company Logo
                                </label>
                                <ImageUploadField
                                  value={division.logoUrl || ''}
                                  onChange={(url) => handleDivisionChange(dIdx, 'logoUrl', url)}
                                  folder="divisions"
                                  label="Upload Division Logo"
                                />
                              </div>
                            </div>

                            {/* Company Name */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Company Name ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={division.companyName.en}
                                  onChange={(e) => handleDivisionChange(dIdx, 'companyName', 'en', e.target.value)}
                                  placeholder="e.g. Projects Innovator"
                                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={division.companyName.ar}
                                  onChange={(e) => handleDivisionChange(dIdx, 'companyName', 'ar', e.target.value)}
                                  placeholder="مثال: مبتكر المشاريع"
                                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <textarea
                                  rows={2}
                                  value={division.description.en}
                                  onChange={(e) => handleDivisionChange(dIdx, 'description', 'en', e.target.value)}
                                  placeholder="e.g. Delivering innovative construction and infrastructure solutions..."
                                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <textarea
                                  rows={2}
                                  dir="rtl"
                                  value={division.description.ar}
                                  onChange={(e) => handleDivisionChange(dIdx, 'description', 'ar', e.target.value)}
                                  placeholder="مثال: تقديم حلول بناء وبنية تحتية مبتكرة تشكل مساحات حديثة..."
                                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                                />
                              )}
                            </div>

                            {/* Link Text and URL */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">
                                  Link Text ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                                </label>
                                {activeLangTab === 'en' && (
                                  <input
                                    type="text"
                                    value={division.linkText.en}
                                    onChange={(e) => handleDivisionChange(dIdx, 'linkText', 'en', e.target.value)}
                                    placeholder="e.g. Projects Innovator ↗"
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                )}
                                {activeLangTab === 'ar' && (
                                  <input
                                    type="text"
                                    dir="rtl"
                                    value={division.linkText.ar}
                                    onChange={(e) => handleDivisionChange(dIdx, 'linkText', 'ar', e.target.value)}
                                    placeholder="مثال: مبتكر المشاريع ↗"
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                )}
                              </div>
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">
                                  Link URL
                                </label>
                                <input
                                  type="text"
                                  value={division.linkUrl}
                                  onChange={(e) => handleDivisionChange(dIdx, 'linkUrl', e.target.value)}
                                  placeholder="e.g. /companies/projects-innovator"
                                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>
                            </div>

                            {/* Nested Management Members */}
                            <div className="pt-4 border-t border-white/10 space-y-4">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold text-white/70 uppercase tracking-wider">
                                  Management Members ({division.members?.length || 0})
                                </span>
                                <button
                                  type="button"
                                  onClick={() => handleAddDivisionMember(dIdx)}
                                  className="text-xs text-red-400 hover:text-red-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                  Add Member
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(division.members || []).map((member, mIdx) => (
                                  <div
                                    key={member.id || mIdx}
                                    className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-3 relative group"
                                  >
                                    <div className="flex items-center justify-between pb-1 border-b border-white/10">
                                      <span className="text-[10px] font-bold text-red-400">
                                        Member #{mIdx + 1}
                                      </span>
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveDivisionMember(dIdx, mIdx)}
                                        className="text-white/40 hover:text-red-400 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                                        title="Delete member"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                    </div>

                                    {/* Member Photo */}
                                    <div>
                                      <label className="text-[10px] text-white/50 block mb-1">
                                        Member Photo
                                      </label>
                                      <ImageUploadField
                                        value={member.image || ''}
                                        onChange={(url) => handleDivisionMemberChange(dIdx, mIdx, 'image', url)}
                                        folder="management"
                                        label="Upload Photo"
                                      />
                                    </div>

                                    {/* Member Name */}
                                    <div>
                                      <label className="text-[10px] text-white/50 block mb-1">
                                        Member Name ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                                      </label>
                                      {activeLangTab === 'en' && (
                                        <input
                                          type="text"
                                          value={member.name.en}
                                          onChange={(e) => handleDivisionMemberChange(dIdx, mIdx, 'name', 'en', e.target.value)}
                                          placeholder="e.g. Management Member 1"
                                          className="w-full px-2.5 py-1 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                        />
                                      )}
                                      {activeLangTab === 'ar' && (
                                        <input
                                          type="text"
                                          dir="rtl"
                                          value={member.name.ar}
                                          onChange={(e) => handleDivisionMemberChange(dIdx, mIdx, 'name', 'ar', e.target.value)}
                                          placeholder="مثال: عضو الإدارة 1"
                                          className="w-full px-2.5 py-1 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                        />
                                      )}
                                    </div>

                                    {/* Member Role */}
                                    <div>
                                      <label className="text-[10px] text-white/50 block mb-1">
                                        Role / Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                                      </label>
                                      {activeLangTab === 'en' && (
                                        <input
                                          type="text"
                                          value={member.role.en}
                                          onChange={(e) => handleDivisionMemberChange(dIdx, mIdx, 'role', 'en', e.target.value)}
                                          placeholder="e.g. General Manager"
                                          className="w-full px-2.5 py-1 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                        />
                                      )}
                                      {activeLangTab === 'ar' && (
                                        <input
                                          type="text"
                                          dir="rtl"
                                          value={member.role.ar}
                                          onChange={(e) => handleDivisionMemberChange(dIdx, mIdx, 'role', 'ar', e.target.value)}
                                          placeholder="مثال: المدير العام"
                                          className="w-full px-2.5 py-1 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                        />
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 7: OUR CORE VALUES (IMAGE 8) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center font-bold text-white text-xs">
                        7
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 7: Our Core Values
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          What We Stand For - 6 core value cards with icons, numbers, and principles
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddCoreValue}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Core Value
                    </Button>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Tagline */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Tagline ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.coreValuesSection.tagline.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              coreValuesSection: {
                                ...aboutData.coreValuesSection,
                                tagline: { ...aboutData.coreValuesSection.tagline, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. WHAT WE STAND FOR"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.coreValuesSection.tagline.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              coreValuesSection: {
                                ...aboutData.coreValuesSection,
                                tagline: { ...aboutData.coreValuesSection.tagline, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: ما نؤمن به وندافع عنه"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.coreValuesSection.title.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              coreValuesSection: {
                                ...aboutData.coreValuesSection,
                                title: { ...aboutData.coreValuesSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Our Core Values"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.coreValuesSection.title.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              coreValuesSection: {
                                ...aboutData.coreValuesSection,
                                title: { ...aboutData.coreValuesSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: قيمنا الجوهرية"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={aboutData.coreValuesSection.description.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              coreValuesSection: {
                                ...aboutData.coreValuesSection,
                                description: { ...aboutData.coreValuesSection.description, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. The principles that guide our decisions, shape our actions..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={aboutData.coreValuesSection.description.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              coreValuesSection: {
                                ...aboutData.coreValuesSection,
                                description: { ...aboutData.coreValuesSection.description, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: المبادئ التي توجه قراراتنا وتشكل أفعالنا..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* Core Values 3x2 Grid */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Core Value Cards ({aboutData.coreValuesSection.values.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {aboutData.coreValuesSection.values.map((val, vIdx) => (
                          <div
                            key={val.id || vIdx}
                            className="p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-4 relative transition-all"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-xs font-bold text-red-400">
                                Value #{vIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveCoreValue(vIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete value"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {/* Number Badge */}
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">Badge</label>
                                <input
                                  type="text"
                                  value={val.number}
                                  onChange={(e) => handleCoreValueChange(vIdx, 'number', e.target.value)}
                                  placeholder="01"
                                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-red-400 font-bold focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>

                              {/* Lucide Icon Dropdown */}
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">Lucide Icon</label>
                                <LucideIconSelect
                                  value={val.icon}
                                  onChange={(newIcon) => handleCoreValueChange(vIdx, 'icon', newIcon)}
                                  options={CORE_VALUES_ICONS}
                                />
                              </div>
                            </div>

                            {/* Title */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={val.title.en}
                                  onChange={(e) => handleCoreValueChange(vIdx, 'title', 'en', e.target.value)}
                                  placeholder="e.g. Relationships"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={val.title.ar}
                                  onChange={(e) => handleCoreValueChange(vIdx, 'title', 'ar', e.target.value)}
                                  placeholder="مثال: العلاقات"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <textarea
                                  rows={2}
                                  value={val.description.en}
                                  onChange={(e) => handleCoreValueChange(vIdx, 'description', 'en', e.target.value)}
                                  placeholder="e.g. We build lasting relationships through trust..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <textarea
                                  rows={2}
                                  dir="rtl"
                                  value={val.description.ar}
                                  onChange={(e) => handleCoreValueChange(vIdx, 'description', 'ar', e.target.value)}
                                  placeholder="مثال: نبني علاقات دائمة من خلال الثقة والشفافية..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 8: OUR HISTORY & OWNERSHIP (IMAGE 9) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center font-bold text-white text-xs">
                        8
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 8: Our History & Ownership
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Brief history, foundations, and shareholding structure cards
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddHistoryItem}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Card
                    </Button>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Tagline */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Tagline ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.historySection.tagline.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              historySection: {
                                ...aboutData.historySection,
                                tagline: { ...aboutData.historySection.tagline, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. OUR BACKGROUND"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.historySection.tagline.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              historySection: {
                                ...aboutData.historySection,
                                tagline: { ...aboutData.historySection.tagline, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: خلفيتنا وتاريخنا"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.historySection.title.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              historySection: {
                                ...aboutData.historySection,
                                title: { ...aboutData.historySection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Our History & Ownership"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.historySection.title.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              historySection: {
                                ...aboutData.historySection,
                                title: { ...aboutData.historySection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: تاريخنا وهيكلية الملكية"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={aboutData.historySection.description.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              historySection: {
                                ...aboutData.historySection,
                                description: { ...aboutData.historySection.description, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Discover the foundations of our business, the expertise behind our journey..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={aboutData.historySection.description.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              historySection: {
                                ...aboutData.historySection,
                                description: { ...aboutData.historySection.description, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: اكتشف أسس أعمالنا، والخبرة الكامنة وراء مسيرتنا..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* History Items List */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        History & Ownership Cards ({aboutData.historySection.items.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {aboutData.historySection.items.map((item, hIdx) => (
                          <div
                            key={item.id || hIdx}
                            className="p-6 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-4 relative transition-all"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-xs font-bold text-red-400">
                                Card #{hIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveHistoryItem(hIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete card"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              {/* Number Badge */}
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">Badge</label>
                                <input
                                  type="text"
                                  value={item.number}
                                  onChange={(e) => handleHistoryItemChange(hIdx, 'number', e.target.value)}
                                  placeholder="01"
                                  className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-red-400 font-bold focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>

                              {/* Lucide Icon Dropdown */}
                              <div>
                                <label className="text-[11px] text-white/60 block mb-1">Lucide Icon</label>
                                <LucideIconSelect
                                  value={item.icon}
                                  onChange={(newIcon) => handleHistoryItemChange(hIdx, 'icon', newIcon)}
                                  options={HISTORY_ICONS}
                                />
                              </div>
                            </div>

                            {/* Title */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Card Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={item.title.en}
                                  onChange={(e) => handleHistoryItemChange(hIdx, 'title', 'en', e.target.value)}
                                  placeholder="e.g. Brief History"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={item.title.ar}
                                  onChange={(e) => handleHistoryItemChange(hIdx, 'title', 'ar', e.target.value)}
                                  placeholder="مثال: نبذة تاريخية"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Content Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <textarea
                                  rows={4}
                                  value={item.description.en}
                                  onChange={(e) => handleHistoryItemChange(hIdx, 'description', 'en', e.target.value)}
                                  placeholder="e.g. Salama was established in 2020..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <textarea
                                  rows={4}
                                  dir="rtl"
                                  value={item.description.ar}
                                  onChange={(e) => handleHistoryItemChange(hIdx, 'description', 'ar', e.target.value)}
                                  placeholder="مثال: تأسست سالاما عام 2020، ومقرها الرئيسي في بغداد..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 9: OUR PURPOSE & OBJECTIVES (IMAGE 10) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center font-bold text-white text-xs">
                        9
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 9: Our Purpose & Objectives
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Clear objectives, shared progress commitment highlight, and priority pillars
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddObjective}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Objective
                    </Button>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Tagline */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Tagline ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.purposeSection.tagline.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              purposeSection: {
                                ...aboutData.purposeSection,
                                tagline: { ...aboutData.purposeSection.tagline, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. OUR PURPOSE"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.purposeSection.tagline.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              purposeSection: {
                                ...aboutData.purposeSection,
                                tagline: { ...aboutData.purposeSection.tagline, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: هدفنا ورؤيتنا"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.purposeSection.title.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              purposeSection: {
                                ...aboutData.purposeSection,
                                title: { ...aboutData.purposeSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Driving Progress Through Clear Objectives"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.purposeSection.title.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              purposeSection: {
                                ...aboutData.purposeSection,
                                title: { ...aboutData.purposeSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: دفع عجلة التقدم عبر أهداف واضحة"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={aboutData.purposeSection.description.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              purposeSection: {
                                ...aboutData.purposeSection,
                                description: { ...aboutData.purposeSection.description, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. We partner with like-minded organizations to promote sustainability..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={aboutData.purposeSection.description.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              purposeSection: {
                                ...aboutData.purposeSection,
                                description: { ...aboutData.purposeSection.description, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: نتعاون مع المنظمات ذات التوجه المشترك لتعزيز الاستدامة..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* Left Highlight Card Settings */}
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                      <div className="flex items-center gap-2">
                        <HeartHandshake className="w-4 h-4 text-red-500" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Highlight Box (Committed to Shared Progress)
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-[11px] text-white/60 block mb-1">
                            Highlight Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                          </label>
                          {activeLangTab === 'en' && (
                            <input
                              type="text"
                              value={aboutData.purposeSection.highlightTitle.en}
                              onChange={(e) =>
                                setAboutData({
                                  ...aboutData,
                                  purposeSection: {
                                    ...aboutData.purposeSection,
                                    highlightTitle: { ...aboutData.purposeSection.highlightTitle, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="e.g. Committed to Shared Progress"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          )}
                          {activeLangTab === 'ar' && (
                            <input
                              type="text"
                              dir="rtl"
                              value={aboutData.purposeSection.highlightTitle.ar}
                              onChange={(e) =>
                                setAboutData({
                                  ...aboutData,
                                  purposeSection: {
                                    ...aboutData.purposeSection,
                                    highlightTitle: { ...aboutData.purposeSection.highlightTitle, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="مثال: ملتزمون بالتقدم المشترك"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          )}
                        </div>

                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">Lucide Icon</label>
                          <LucideIconSelect
                            value={aboutData.purposeSection.highlightIcon}
                            onChange={(newIcon) =>
                              setAboutData({
                                ...aboutData,
                                purposeSection: {
                                  ...aboutData.purposeSection,
                                  highlightIcon: newIcon,
                                },
                              })
                            }
                            options={PURPOSE_ICONS}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-white/60 block mb-1">
                          Highlight Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                        </label>
                        {activeLangTab === 'en' && (
                          <textarea
                            rows={2}
                            value={aboutData.purposeSection.highlightDescription.en}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                purposeSection: {
                                  ...aboutData.purposeSection,
                                  highlightDescription: { ...aboutData.purposeSection.highlightDescription, en: e.target.value },
                                },
                              })
                            }
                            placeholder="e.g. We believe meaningful results come from responsible management..."
                            className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        )}
                        {activeLangTab === 'ar' && (
                          <textarea
                            rows={2}
                            dir="rtl"
                            value={aboutData.purposeSection.highlightDescription.ar}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                purposeSection: {
                                  ...aboutData.purposeSection,
                                  highlightDescription: { ...aboutData.purposeSection.highlightDescription, ar: e.target.value },
                                },
                              })
                            }
                            placeholder="مثال: نؤمن بأن النتائج ذات المغزى تأتي من الإدارة المسؤولة..."
                            className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                          />
                        )}
                      </div>
                    </div>

                    {/* Right Priorities & Objectives List */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                          Priority Objectives ({aboutData.purposeSection.objectives.length})
                        </h4>
                      </div>

                      <div className="space-y-3">
                        {aboutData.purposeSection.objectives.map((obj, oIdx) => (
                          <div
                            key={obj.id || oIdx}
                            className="p-4 rounded-xl bg-white/5 hover:bg-white/[0.08] border border-white/10 flex flex-col md:flex-row items-center gap-4 transition-all"
                          >
                            <div className="w-16">
                              <label className="text-[10px] text-white/50 block mb-0.5">Badge</label>
                              <input
                                type="text"
                                value={obj.number}
                                onChange={(e) => handleObjectiveChange(oIdx, 'number', e.target.value)}
                                placeholder="01"
                                className="w-full px-2 py-1.5 text-xs rounded bg-black/30 border border-white/10 text-red-400 font-bold focus:outline-none"
                              />
                            </div>

                            <div className="w-48">
                              <label className="text-[10px] text-white/50 block mb-0.5">Lucide Icon</label>
                              <LucideIconSelect
                                value={obj.icon}
                                onChange={(newIcon) => handleObjectiveChange(oIdx, 'icon', newIcon)}
                                options={OBJECTIVES_ICONS}
                              />
                            </div>

                            <div className="flex-1 w-full">
                              <label className="text-[10px] text-white/50 block mb-0.5">
                                Objective Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={obj.title.en}
                                  onChange={(e) => handleObjectiveChange(oIdx, 'title', 'en', e.target.value)}
                                  placeholder="e.g. Effective Project Management"
                                  className="w-full px-3 py-1.5 text-xs rounded bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={obj.title.ar}
                                  onChange={(e) => handleObjectiveChange(oIdx, 'title', 'ar', e.target.value)}
                                  placeholder="مثال: الإدارة الفعالة للمشاريع"
                                  className="w-full px-3 py-1.5 text-xs rounded bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            <button
                              type="button"
                              onClick={() => handleRemoveObjective(oIdx)}
                              className="text-white/40 hover:text-red-400 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer shrink-0 mt-3 md:mt-0"
                              title="Delete objective"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 10: CALL-TO-ACTION BANNER (IMAGE 4) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-rose-700 flex items-center justify-center font-bold text-white text-xs">
                        10
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 10: Let's Work Together Banner
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Crimson gradient banner with action triggers and quotation buttons
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Live Preview Box */}
                    <div className="relative rounded-2xl overflow-hidden p-6 sm:p-8 text-center bg-gradient-to-r from-[#701020] via-[#851828] to-[#450812] border border-red-500/30 space-y-3 shadow-xl">
                      <div className="inline-block px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/30 text-white/80 border border-white/15">
                        {aboutData.bannerSection.tagline[activeLangTab] || "LET'S WORK TOGETHER"}
                      </div>
                      <h3 className="text-lg sm:text-xl font-extrabold text-white">
                        {aboutData.bannerSection.title[activeLangTab] || "Let's Build Something That Moves Business Forward."}
                      </h3>
                      <p className="text-xs text-white/70 max-w-xl mx-auto">
                        {aboutData.bannerSection.description[activeLangTab] || 'Looking for medical products, equipment, pharmaceutical solutions...'}
                      </p>
                      <div className="pt-2 flex items-center justify-center gap-3">
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-white text-[#701020]">
                          {aboutData.bannerSection.primaryButtonText[activeLangTab] || 'Get a Quote'} &rarr;
                        </span>
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-transparent border border-white/40 text-white">
                          {aboutData.bannerSection.secondaryButtonText[activeLangTab] || 'Contact Us'}
                        </span>
                      </div>
                    </div>

                    {/* Tagline */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Tagline ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.bannerSection.tagline.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              bannerSection: {
                                ...aboutData.bannerSection,
                                tagline: { ...aboutData.bannerSection.tagline, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. LET'S WORK TOGETHER"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.bannerSection.tagline.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              bannerSection: {
                                ...aboutData.bannerSection,
                                tagline: { ...aboutData.bannerSection.tagline, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: لنعمل معاً"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={aboutData.bannerSection.title.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              bannerSection: {
                                ...aboutData.bannerSection,
                                title: { ...aboutData.bannerSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Let's Build Something That Moves Business Forward."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={aboutData.bannerSection.title.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              bannerSection: {
                                ...aboutData.bannerSection,
                                title: { ...aboutData.bannerSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: دعونا نبني ما يدفع الأعمال إلى الأمام."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={aboutData.bannerSection.description.en}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              bannerSection: {
                                ...aboutData.bannerSection,
                                description: { ...aboutData.bannerSection.description, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Looking for medical products, equipment, pharmaceutical solutions..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={aboutData.bannerSection.description.ar}
                          onChange={(e) =>
                            setAboutData({
                              ...aboutData,
                              bannerSection: {
                                ...aboutData.bannerSection,
                                description: { ...aboutData.bannerSection.description, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: تبحث عن منتجات طبية، معدات، حلول دوائية أو خدمات تجارية؟"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* Button Text & Links */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <span className="text-xs font-bold text-white block">Primary Button (Solid White)</span>
                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">
                            Button Text ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                          </label>
                          {activeLangTab === 'en' && (
                            <input
                              type="text"
                              value={aboutData.bannerSection.primaryButtonText.en}
                              onChange={(e) =>
                                setAboutData({
                                  ...aboutData,
                                  bannerSection: {
                                    ...aboutData.bannerSection,
                                    primaryButtonText: { ...aboutData.bannerSection.primaryButtonText, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="e.g. Get a Quote"
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                            />
                          )}
                          {activeLangTab === 'ar' && (
                            <input
                              type="text"
                              dir="rtl"
                              value={aboutData.bannerSection.primaryButtonText.ar}
                              onChange={(e) =>
                                setAboutData({
                                  ...aboutData,
                                  bannerSection: {
                                    ...aboutData.bannerSection,
                                    primaryButtonText: { ...aboutData.bannerSection.primaryButtonText, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="مثال: طلب عرض أسعار"
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          )}
                        </div>
                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">Target Link URL</label>
                          <input
                            type="text"
                            value={aboutData.bannerSection.primaryButtonUrl}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                bannerSection: {
                                  ...aboutData.bannerSection,
                                  primaryButtonUrl: e.target.value,
                                },
                              })
                            }
                            placeholder="e.g. /contact"
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <span className="text-xs font-bold text-white block">Secondary Button (Ghost Border)</span>
                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">
                            Button Text ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                          </label>
                          {activeLangTab === 'en' && (
                            <input
                              type="text"
                              value={aboutData.bannerSection.secondaryButtonText.en}
                              onChange={(e) =>
                                setAboutData({
                                  ...aboutData,
                                  bannerSection: {
                                    ...aboutData.bannerSection,
                                    secondaryButtonText: { ...aboutData.bannerSection.secondaryButtonText, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="e.g. Contact Us"
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                            />
                          )}
                          {activeLangTab === 'ar' && (
                            <input
                              type="text"
                              dir="rtl"
                              value={aboutData.bannerSection.secondaryButtonText.ar}
                              onChange={(e) =>
                                setAboutData({
                                  ...aboutData,
                                  bannerSection: {
                                    ...aboutData.bannerSection,
                                    secondaryButtonText: { ...aboutData.bannerSection.secondaryButtonText, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="مثال: تواصل معنا"
                              className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          )}
                        </div>
                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">Target Link URL</label>
                          <input
                            type="text"
                            value={aboutData.bannerSection.secondaryButtonUrl}
                            onChange={(e) =>
                              setAboutData({
                                ...aboutData,
                                bannerSection: {
                                  ...aboutData.bannerSection,
                                  secondaryButtonUrl: e.target.value,
                                },
                              })
                            }
                            placeholder="e.g. /contact"
                            className="w-full px-3 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

               </Card>
              </div>
            )}

            {/* IF EDITING COMPANY PROFILE (3 SECTIONS MATCHING REFERENCE IMAGES) */}
            {editingTabId === 'company' && (
              <div className="space-y-8">
                {/* SECTION 1: COMPANY PROFILE (IMAGE 1) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-700 flex items-center justify-center font-bold text-white text-xs">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 1: Company Profile (Page Header)
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Main page headline and core introductory description
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={companyData.headerSection.title.en}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              headerSection: {
                                ...companyData.headerSection,
                                title: { ...companyData.headerSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Company Profile"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={companyData.headerSection.title.ar}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              headerSection: {
                                ...companyData.headerSection,
                                title: { ...companyData.headerSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: ملف الشركة"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={companyData.headerSection.description.en}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              headerSection: {
                                ...companyData.headerSection,
                                description: { ...companyData.headerSection.description, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Learn more about Mobtaker Group, our vision, and our commitment..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={companyData.headerSection.description.ar}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              headerSection: {
                                ...companyData.headerSection,
                                description: { ...companyData.headerSection.description, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: تعرف أكثر على مجموعة مبتكر، ورؤيتنا، والتزامنا بالابتكار والنمو المستدام."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 2: WHO WE ARE (IMAGE 2) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-700 flex items-center justify-center font-bold text-white text-xs">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 2: Who We Are
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Tagline, headline, dual narrative paragraphs, and 4 corporate pillar cards
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddCompanyCard}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Card
                    </Button>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Tagline */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Tagline ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={companyData.whoWeAreSection.tagline.en}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whoWeAreSection: {
                                ...companyData.whoWeAreSection,
                                tagline: { ...companyData.whoWeAreSection.tagline, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. WHO WE ARE"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={companyData.whoWeAreSection.tagline.ar}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whoWeAreSection: {
                                ...companyData.whoWeAreSection,
                                tagline: { ...companyData.whoWeAreSection.tagline, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: من نحن"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={companyData.whoWeAreSection.title.en}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whoWeAreSection: {
                                ...companyData.whoWeAreSection,
                                title: { ...companyData.whoWeAreSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Building Opportunities Through Innovation and Collaboration"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={companyData.whoWeAreSection.title.ar}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whoWeAreSection: {
                                ...companyData.whoWeAreSection,
                                title: { ...companyData.whoWeAreSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: بناء الفرص من خلال الابتكار والتعاون"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Paragraph 1 */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Narrative Paragraph 1 ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={companyData.whoWeAreSection.description1.en}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whoWeAreSection: {
                                ...companyData.whoWeAreSection,
                                description1: { ...companyData.whoWeAreSection.description1, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Mobtaker Group is a diversified business organization..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={companyData.whoWeAreSection.description1.ar}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whoWeAreSection: {
                                ...companyData.whoWeAreSection,
                                description1: { ...companyData.whoWeAreSection.description1, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: مجموعة مبتكر هي مؤسسة أعمال متنوعة تركز على تحديد الفرص..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* Paragraph 2 */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Narrative Paragraph 2 ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={companyData.whoWeAreSection.description2.en}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whoWeAreSection: {
                                ...companyData.whoWeAreSection,
                                description2: { ...companyData.whoWeAreSection.description2, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. We aim to connect ideas, expertise, and resources..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={companyData.whoWeAreSection.description2.ar}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whoWeAreSection: {
                                ...companyData.whoWeAreSection,
                                description2: { ...companyData.whoWeAreSection.description2, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: نهدف إلى ربط الأفكار والخبرات والموارد لمساعدة الشركات في استكشاف إمكانيات جديدة..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* Repeating Cards List */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Corporate Pillar Cards ({companyData.whoWeAreSection.cards.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {companyData.whoWeAreSection.cards.map((card, cIdx) => (
                          <div
                            key={card.id || cIdx}
                            className="p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-4 relative transition-all"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-xs font-bold text-sky-400">
                                Card #{cIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveCompanyCard(cIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete card"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Lucide Icon Dropdown */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">Lucide Icon</label>
                              <LucideIconSelect
                                value={card.icon}
                                onChange={(newIcon) => handleCompanyCardChange(cIdx, 'icon', newIcon)}
                                options={COMPANY_CARD_ICONS}
                              />
                            </div>

                            {/* Title */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Card Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={card.title.en}
                                  onChange={(e) => handleCompanyCardChange(cIdx, 'title', 'en', e.target.value)}
                                  placeholder="e.g. Our Overview"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={card.title.ar}
                                  onChange={(e) => handleCompanyCardChange(cIdx, 'title', 'ar', e.target.value)}
                                  placeholder="مثال: نظرة عامة"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Card Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <textarea
                                  rows={3}
                                  value={card.description.en}
                                  onChange={(e) => handleCompanyCardChange(cIdx, 'description', 'en', e.target.value)}
                                  placeholder="e.g. We bring together business insight..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <textarea
                                  rows={3}
                                  dir="rtl"
                                  value={card.description.ar}
                                  onChange={(e) => handleCompanyCardChange(cIdx, 'description', 'ar', e.target.value)}
                                  placeholder="مثال: نجمع بين الرؤية التجارية والتعاون والحلول العملية..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 3: WHAT GUIDES US (IMAGE 3) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-sky-700 flex items-center justify-center font-bold text-white text-xs">
                        3
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 3: What Guides Us
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Principles Behind Our Work, pill badges, and downloadable company profile card
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddPrinciple}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Principle
                    </Button>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Tagline */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Tagline ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={companyData.whatGuidesUsSection.tagline.en}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whatGuidesUsSection: {
                                ...companyData.whatGuidesUsSection,
                                tagline: { ...companyData.whatGuidesUsSection.tagline, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. WHAT GUIDES US"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={companyData.whatGuidesUsSection.tagline.ar}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whatGuidesUsSection: {
                                ...companyData.whatGuidesUsSection,
                                tagline: { ...companyData.whatGuidesUsSection.tagline, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: ما يوجهنا"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={companyData.whatGuidesUsSection.title.en}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whatGuidesUsSection: {
                                ...companyData.whatGuidesUsSection,
                                title: { ...companyData.whatGuidesUsSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. The Principles Behind Our Work"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={companyData.whatGuidesUsSection.title.ar}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whatGuidesUsSection: {
                                ...companyData.whatGuidesUsSection,
                                title: { ...companyData.whatGuidesUsSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: المبادئ الكامنة وراء عملنا"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={companyData.whatGuidesUsSection.description.en}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whatGuidesUsSection: {
                                ...companyData.whatGuidesUsSection,
                                description: { ...companyData.whatGuidesUsSection.description, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. We believe sustainable business relationships are built through trust..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={companyData.whatGuidesUsSection.description.ar}
                          onChange={(e) =>
                            setCompanyData({
                              ...companyData,
                              whatGuidesUsSection: {
                                ...companyData.whatGuidesUsSection,
                                description: { ...companyData.whatGuidesUsSection.description, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: نؤمن بأن علاقات الأعمال المستدامة تُبنى من خلال الثقة والمسؤولية والالتزام المشترك بالتقدم."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* Guiding Principles Pills */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                          Guiding Principle Pills ({companyData.whatGuidesUsSection.principles.length})
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {companyData.whatGuidesUsSection.principles.map((pr, pIdx) => (
                          <div
                            key={pr.id || pIdx}
                            className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-2 relative group hover:bg-white/[0.08] transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold text-sky-400">
                                #{pIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemovePrinciple(pIdx)}
                                className="text-white/40 hover:text-red-400 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                                title="Remove principle"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>

                            {activeLangTab === 'en' && (
                              <input
                                type="text"
                                value={pr.en}
                                onChange={(e) => handlePrincipleChange(pIdx, 'en', e.target.value)}
                                placeholder="e.g. Integrity"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                              />
                            )}
                            {activeLangTab === 'ar' && (
                              <input
                                type="text"
                                dir="rtl"
                                value={pr.ar}
                                onChange={(e) => handlePrincipleChange(pIdx, 'ar', e.target.value)}
                                placeholder="مثال: النزاهة"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Download Company Profile Card */}
                    <div className="pt-6 border-t border-white/10 space-y-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-red-500" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Download Our Company Profile Card
                        </h4>
                      </div>

                      <div className="p-5 rounded-2xl bg-[#0b1028] border border-white/10 space-y-4">
                        {/* Box Title */}
                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">
                            Card Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                          </label>
                          {activeLangTab === 'en' && (
                            <input
                              type="text"
                              value={companyData.whatGuidesUsSection.downloadBox.title.en}
                              onChange={(e) =>
                                setCompanyData({
                                  ...companyData,
                                  whatGuidesUsSection: {
                                    ...companyData.whatGuidesUsSection,
                                    downloadBox: {
                                      ...companyData.whatGuidesUsSection.downloadBox,
                                      title: { ...companyData.whatGuidesUsSection.downloadBox.title, en: e.target.value },
                                    },
                                  },
                                })
                              }
                              placeholder="e.g. Download Our Company Profile"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                            />
                          )}
                          {activeLangTab === 'ar' && (
                            <input
                              type="text"
                              dir="rtl"
                              value={companyData.whatGuidesUsSection.downloadBox.title.ar}
                              onChange={(e) =>
                                setCompanyData({
                                  ...companyData,
                                  whatGuidesUsSection: {
                                    ...companyData.whatGuidesUsSection,
                                    downloadBox: {
                                      ...companyData.whatGuidesUsSection.downloadBox,
                                      title: { ...companyData.whatGuidesUsSection.downloadBox.title, ar: e.target.value },
                                    },
                                  },
                                })
                              }
                              placeholder="مثال: تحميل ملف الشركة التعريفي"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          )}
                        </div>

                        {/* Box Description */}
                        <div>
                          <label className="text-[11px] text-white/60 block mb-1">
                            Card Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                          </label>
                          {activeLangTab === 'en' && (
                            <textarea
                              rows={2}
                              value={companyData.whatGuidesUsSection.downloadBox.description.en}
                              onChange={(e) =>
                                setCompanyData({
                                  ...companyData,
                                  whatGuidesUsSection: {
                                    ...companyData.whatGuidesUsSection,
                                    downloadBox: {
                                      ...companyData.whatGuidesUsSection.downloadBox,
                                      description: { ...companyData.whatGuidesUsSection.downloadBox.description, en: e.target.value },
                                    },
                                  },
                                })
                              }
                              placeholder="e.g. Explore our company overview, vision, mission..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] resize-none"
                            />
                          )}
                          {activeLangTab === 'ar' && (
                            <textarea
                              rows={2}
                              dir="rtl"
                              value={companyData.whatGuidesUsSection.downloadBox.description.ar}
                              onChange={(e) =>
                                setCompanyData({
                                  ...companyData,
                                  whatGuidesUsSection: {
                                    ...companyData.whatGuidesUsSection,
                                    downloadBox: {
                                      ...companyData.whatGuidesUsSection.downloadBox,
                                      description: { ...companyData.whatGuidesUsSection.downloadBox.description, ar: e.target.value },
                                    },
                                  },
                                })
                              }
                              placeholder="مثال: استكشف نظرة عامة على شركتنا ورؤيتها ورسالتها ونهجها التجاري..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                            />
                          )}
                        </div>

                        {/* Button Text & PDF URL/Upload */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="text-[11px] text-white/60 block mb-1">
                              Button Label ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                            </label>
                            {activeLangTab === 'en' && (
                              <input
                                type="text"
                                value={companyData.whatGuidesUsSection.downloadBox.buttonText.en}
                                onChange={(e) =>
                                  setCompanyData({
                                    ...companyData,
                                    whatGuidesUsSection: {
                                      ...companyData.whatGuidesUsSection,
                                      downloadBox: {
                                        ...companyData.whatGuidesUsSection.downloadBox,
                                        buttonText: { ...companyData.whatGuidesUsSection.downloadBox.buttonText, en: e.target.value },
                                      },
                                    },
                                  })
                                }
                                placeholder="e.g. Download Company Profile (PDF)"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                              />
                            )}
                            {activeLangTab === 'ar' && (
                              <input
                                type="text"
                                dir="rtl"
                                value={companyData.whatGuidesUsSection.downloadBox.buttonText.ar}
                                onChange={(e) =>
                                  setCompanyData({
                                    ...companyData,
                                    whatGuidesUsSection: {
                                      ...companyData.whatGuidesUsSection,
                                      downloadBox: {
                                        ...companyData.whatGuidesUsSection.downloadBox,
                                        buttonText: { ...companyData.whatGuidesUsSection.downloadBox.buttonText, ar: e.target.value },
                                      },
                                    },
                                  })
                                }
                                placeholder="مثال: تحميل ملف الشركة (PDF)"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            )}
                          </div>

                          <div>
                            <label className="text-[11px] text-white/60 block mb-1">
                              PDF Document URL / File
                            </label>
                            <div className="flex items-center gap-2">
                              <input
                                type="text"
                                value={companyData.whatGuidesUsSection.downloadBox.pdfUrl}
                                onChange={(e) =>
                                  setCompanyData({
                                    ...companyData,
                                    whatGuidesUsSection: {
                                      ...companyData.whatGuidesUsSection,
                                      downloadBox: {
                                        ...companyData.whatGuidesUsSection.downloadBox,
                                        pdfUrl: e.target.value,
                                      },
                                    },
                                  })
                                }
                                placeholder="e.g. https://... or /documents/profile.pdf"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                              />
                              <label className="px-3 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shrink-0">
                                <Upload className="w-3.5 h-3.5" />
                                <span>Upload</span>
                                <input
                                  type="file"
                                  accept=".pdf,application/pdf"
                                  className="hidden"
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const formData = new FormData();
                                    formData.append('file', file);
                                    formData.append('folder', 'company-profile');
                                    const uploadToastId = toast.loading('Uploading PDF...');
                                    try {
                                      const res = await fetch(`${API_BASE}/api/upload/public`, {
                                        method: 'POST',
                                        body: formData,
                                      });
                                      const json = await res.json();
                                      if (json.success && json.url) {
                                        setCompanyData({
                                          ...companyData,
                                          whatGuidesUsSection: {
                                            ...companyData.whatGuidesUsSection,
                                            downloadBox: {
                                              ...companyData.whatGuidesUsSection.downloadBox,
                                              pdfUrl: json.url,
                                              pdfName: file.name,
                                            },
                                          },
                                        });
                                        toast.dismiss(uploadToastId);
                                        toast.success('Company profile PDF uploaded!');
                                      } else {
                                        throw new Error(json.message || 'Upload failed');
                                      }
                                    } catch (err: any) {
                                      toast.dismiss(uploadToastId);
                                      toast.error(err.message || 'PDF upload failed');
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            )}

            {/* IF EDITING SERVICES (2 SECTIONS MATCHING REFERENCE IMAGES) */}
            {editingTabId === 'services' && (
              <div className="space-y-8">
                {/* SECTION 1: OUR SERVICES (IMAGE 1) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center font-bold text-white text-xs">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 1: Our Services (Page Header & Solution Cards)
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Main page headline, healthcare introductory description, and 4 solution cards
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddServiceCard}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Service Card
                    </Button>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={servicesData.headerSection.title.en}
                          onChange={(e) =>
                            setServicesData({
                              ...servicesData,
                              headerSection: {
                                ...servicesData.headerSection,
                                title: { ...servicesData.headerSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Our Services"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={servicesData.headerSection.title.ar}
                          onChange={(e) =>
                            setServicesData({
                              ...servicesData,
                              headerSection: {
                                ...servicesData.headerSection,
                                title: { ...servicesData.headerSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: خدماتنا"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={servicesData.headerSection.description.en}
                          onChange={(e) =>
                            setServicesData({
                              ...servicesData,
                              headerSection: {
                                ...servicesData.headerSection,
                                description: { ...servicesData.headerSection.description, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Discover our medical equipment, laboratory supplies, and healthcare solutions..."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={servicesData.headerSection.description.ar}
                          onChange={(e) =>
                            setServicesData({
                              ...servicesData,
                              headerSection: {
                                ...servicesData.headerSection,
                                description: { ...servicesData.headerSection.description, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: اكتشف معداتنا الطبية ومستلزمات المختبرات والحلول الصحية المصممة لدعم المتخصصين والمنشآت الصحية."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* Repeating Service Solution Cards */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Service Solution Cards ({servicesData.headerSection.cards.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {servicesData.headerSection.cards.map((card, cIdx) => (
                          <div
                            key={card.id || cIdx}
                            className="p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-4 relative transition-all"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-xs font-bold text-purple-400">
                                Solution #{cIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveServiceCard(cIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete solution card"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Lucide Icon Dropdown */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">Lucide Icon</label>
                              <LucideIconSelect
                                value={card.icon}
                                onChange={(newIcon) => handleServiceCardChange(cIdx, 'icon', newIcon)}
                                options={SERVICES_SOLUTION_ICONS}
                              />
                            </div>

                            {/* Title */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={card.title.en}
                                  onChange={(e) => handleServiceCardChange(cIdx, 'title', 'en', e.target.value)}
                                  placeholder="e.g. Comprehensive Medical & Laboratory Solutions"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={card.title.ar}
                                  onChange={(e) => handleServiceCardChange(cIdx, 'title', 'ar', e.target.value)}
                                  placeholder="مثال: حلول طبية ومخبرية شاملة"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <textarea
                                  rows={3}
                                  value={card.description.en}
                                  onChange={(e) => handleServiceCardChange(cIdx, 'description', 'en', e.target.value)}
                                  placeholder="e.g. We provide comprehensive solutions in medical..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <textarea
                                  rows={3}
                                  dir="rtl"
                                  value={card.description.ar}
                                  onChange={(e) => handleServiceCardChange(cIdx, 'description', 'ar', e.target.value)}
                                  placeholder="مثال: نقدم حلولاً شاملة في المعدات والمستلزمات الطبية..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                                />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 2: OUR BUSINESS AREAS (IMAGE 2) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-700 flex items-center justify-center font-bold text-white text-xs">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white">
                          Section 2: Our Business Areas
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Sectors and service divisions forming the Projects Innovator group
                        </p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      onClick={handleAddBusinessAreaCard}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Business Area
                    </Button>
                  </CardHeader>

                  <CardContent className="p-6 space-y-6">
                    {/* Main Title */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Main Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <input
                          type="text"
                          value={servicesData.businessAreasSection.title.en}
                          onChange={(e) =>
                            setServicesData({
                              ...servicesData,
                              businessAreasSection: {
                                ...servicesData.businessAreasSection,
                                title: { ...servicesData.businessAreasSection.title, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Our Business Areas"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D]"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <input
                          type="text"
                          dir="rtl"
                          value={servicesData.businessAreasSection.title.ar}
                          onChange={(e) =>
                            setServicesData({
                              ...servicesData,
                              businessAreasSection: {
                                ...servicesData.businessAreasSection,
                                title: { ...servicesData.businessAreasSection.title, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: مجالات أعمالنا"
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="text-xs font-medium text-white/80 block mb-1">
                        Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                      </label>
                      {activeLangTab === 'en' && (
                        <textarea
                          rows={3}
                          value={servicesData.businessAreasSection.description.en}
                          onChange={(e) =>
                            setServicesData({
                              ...servicesData,
                              businessAreasSection: {
                                ...servicesData.businessAreasSection,
                                description: { ...servicesData.businessAreasSection.description, en: e.target.value },
                              },
                            })
                          }
                          placeholder="e.g. Explore the sectors and services that form the Projects Innovator group."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none"
                        />
                      )}
                      {activeLangTab === 'ar' && (
                        <textarea
                          rows={3}
                          dir="rtl"
                          value={servicesData.businessAreasSection.description.ar}
                          onChange={(e) =>
                            setServicesData({
                              ...servicesData,
                              businessAreasSection: {
                                ...servicesData.businessAreasSection,
                                description: { ...servicesData.businessAreasSection.description, ar: e.target.value },
                              },
                            })
                          }
                          placeholder="مثال: استكشف القطاعات والخدمات التي تشكل مجموعة مبتكر المشاريع."
                          className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                        />
                      )}
                    </div>

                    {/* Repeating Business Areas Cards */}
                    <div className="pt-4 border-t border-white/10 space-y-4">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Business Area Cards ({servicesData.businessAreasSection.cards.length})
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {servicesData.businessAreasSection.cards.map((card, aIdx) => (
                          <div
                            key={card.id || aIdx}
                            className="p-5 rounded-2xl bg-white/5 hover:bg-white/[0.08] border border-white/10 space-y-4 relative transition-all"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <span className="text-xs font-bold text-purple-400">
                                Area #{aIdx + 1}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemoveBusinessAreaCard(aIdx)}
                                className="text-white/40 hover:text-red-400 p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete business area"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Lucide Icon Dropdown */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">Lucide Icon</label>
                              <LucideIconSelect
                                value={card.icon}
                                onChange={(newIcon) => handleBusinessAreaCardChange(aIdx, 'icon', newIcon)}
                                options={BUSINESS_AREA_ICONS}
                              />
                            </div>

                            {/* Title */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Title ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={card.title.en}
                                  onChange={(e) => handleBusinessAreaCardChange(aIdx, 'title', 'en', e.target.value)}
                                  placeholder="e.g. Medical & Laboratory Equipment"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={card.title.ar}
                                  onChange={(e) => handleBusinessAreaCardChange(aIdx, 'title', 'ar', e.target.value)}
                                  placeholder="مثال: المعدات الطبية والمخبرية"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                />
                              )}
                            </div>

                            {/* Description */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Description ({activeLangTab === 'en' ? 'English' : 'Arabic'})
                              </label>
                              {activeLangTab === 'en' && (
                                <textarea
                                  rows={3}
                                  value={card.description.en}
                                  onChange={(e) => handleBusinessAreaCardChange(aIdx, 'description', 'en', e.target.value)}
                                  placeholder="e.g. Comprehensive medical device solutions..."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <textarea
                                  rows={3}
                                  dir="rtl"
                                  value={card.description.ar}
                                  onChange={(e) => handleBusinessAreaCardChange(aIdx, 'description', 'ar', e.target.value)}
                                  placeholder="مثال: حلول شاملة للأجهزة الطبية ومعدات الفحص المخبري."
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                                />
                              )}
                            </div>

                            {/* Navigation Link URL */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">
                                Navigation Target Link (Arrow ↗)
                              </label>
                              <input
                                type="text"
                                value={card.linkUrl}
                                onChange={(e) => handleBusinessAreaCardChange(aIdx, 'linkUrl', e.target.value)}
                                placeholder="e.g. /services/medical-equipment"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

              </div>
            )}

            {/* IF EDITING SHOP PAGE */}
            {editingTabId === 'shop' && (
              <div className="space-y-8">
                {/* SECTION 1: OUR PRODUCTS */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 1: Our Products</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الأول: منتجاتنا)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Main page title, introductory description, and repeating product cards with images, badges, and quote buttons.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Header Title & Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Header Title</label>
                            <input
                              type="text"
                              value={shopData.headerSection.title.en}
                              onChange={(e) =>
                                setShopData({
                                  ...shopData,
                                  headerSection: {
                                    ...shopData.headerSection,
                                    title: { ...shopData.headerSection.title, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="Our Products"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Introductory Description</label>
                            <textarea
                              rows={3}
                              value={shopData.headerSection.description.en}
                              onChange={(e) =>
                                setShopData({
                                  ...shopData,
                                  headerSection: {
                                    ...shopData.headerSection,
                                    description: { ...shopData.headerSection.description, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="Explore our range of medical equipment and healthcare solutions..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان القسم بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={shopData.headerSection.title.ar}
                              onChange={(e) =>
                                setShopData({
                                  ...shopData,
                                  headerSection: {
                                    ...shopData.headerSection,
                                    title: { ...shopData.headerSection.title, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="منتجاتنا"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف التمهيدي بالعربية</label>
                            <textarea
                              rows={3}
                              dir="rtl"
                              value={shopData.headerSection.description.ar}
                              onChange={(e) =>
                                setShopData({
                                  ...shopData,
                                  headerSection: {
                                    ...shopData.headerSection,
                                    description: { ...shopData.headerSection.description, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="استكشف مجموعتنا من المعدات الطبية والحلول الصحية..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Products Grid Manager */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            Products Catalog ({shopData.headerSection.products.length} Items)
                          </h4>
                          <span className="text-xs text-white/50">
                            Cards matching medical products reference
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddProduct}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Product
                        </button>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        {shopData.headerSection.products.map((product, pIdx) => (
                          <div
                            key={product.id || `prod-${pIdx}`}
                            className="bg-[#12162e] border border-white/10 hover:border-white/20 rounded-xl p-5 space-y-5 transition-all shadow-lg"
                          >
                            {/* Product Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-white/5">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-orange-500/10 border border-orange-500/30 text-orange-400">
                                  Product #{pIdx + 1}
                                </span>
                                <span className="text-xs font-semibold text-white">
                                  {activeLangTab === 'ar' ? (product.name?.ar || 'منتج جديد') : (product.name?.en || 'New Product')}
                                </span>
                                {product.brand?.en && (
                                  <span className="text-[11px] text-white/40">
                                    • {product.brand.en}
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveProduct(pIdx)}
                                className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                                title="Remove Product"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Product Image Upload */}
                            <div className="space-y-1.5">
                              <ImageUploadField
                                label="Product Image"
                                compact
                                folder="shop"
                                value={product.image || ''}
                                onChange={(url) => handleProductChange(pIdx, 'image', url)}
                                placeholder="Paste image URL or upload device photo..."
                              />
                            </div>

                            {/* Brand & Name */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {activeLangTab === 'en' ? (
                                <>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-white/70">🇬🇧 Brand / Category</label>
                                    <input
                                      type="text"
                                      value={product.brand?.en || ''}
                                      onChange={(e) => handleProductChange(pIdx, 'brand', 'en', e.target.value)}
                                      placeholder="e.g. MedTech, SonoCare, CareFlow"
                                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-white/70">🇬🇧 Product Name</label>
                                    <input
                                      type="text"
                                      value={product.name?.en || ''}
                                      onChange={(e) => handleProductChange(pIdx, 'name', 'en', e.target.value)}
                                      placeholder="e.g. Patient Monitor, Digital Ultrasound System"
                                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                    />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العلامة التجارية / الفئة</label>
                                    <input
                                      type="text"
                                      dir="rtl"
                                      value={product.brand?.ar || ''}
                                      onChange={(e) => handleProductChange(pIdx, 'brand', 'ar', e.target.value)}
                                      placeholder="مثال: ميدتك، سونوكير، كيرفلو"
                                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                    />
                                  </div>
                                  <div className="space-y-1.5">
                                    <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 اسم المنتج بالعربية</label>
                                    <input
                                      type="text"
                                      dir="rtl"
                                      value={product.name?.ar || ''}
                                      onChange={(e) => handleProductChange(pIdx, 'name', 'ar', e.target.value)}
                                      placeholder="مثال: شاشة مراقبة المريض، نظام الموجات فوق الصوتية الرقمي"
                                      className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                    />
                                  </div>
                                </>
                              )}
                            </div>

                            {/* Description */}
                            <div className="space-y-1.5">
                              {activeLangTab === 'en' ? (
                                <>
                                  <label className="text-xs font-semibold text-white/70">🇬🇧 Product Description</label>
                                  <textarea
                                    rows={2}
                                    value={product.description?.en || ''}
                                    onChange={(e) => handleProductChange(pIdx, 'description', 'en', e.target.value)}
                                    placeholder="A medical monitoring device designed to track vital signs..."
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                  />
                                </>
                              ) : (
                                <>
                                  <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف المنتج بالعربية</label>
                                  <textarea
                                    rows={2}
                                    dir="rtl"
                                    value={product.description?.ar || ''}
                                    onChange={(e) => handleProductChange(pIdx, 'description', 'ar', e.target.value)}
                                    placeholder="جهاز مراقبة طبي مصمم لتتبع العلامات الحيوية ودعم الملاحظة السريرية..."
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                                  />
                                </>
                              )}
                            </div>

                            {/* Certification Badges Manager */}
                            <div className="p-3.5 bg-black/20 rounded-lg border border-white/5 space-y-3">
                              <div className="flex items-center justify-between">
                                <label className="text-xs font-semibold text-white/80 flex items-center gap-2">
                                  <span>Certification Badges & Tags</span>
                                  <span className="text-[11px] text-white/40">({product.badges?.length || 0} badges)</span>
                                </label>
                                <button
                                  type="button"
                                  onClick={() => handleAddProductBadge(pIdx)}
                                  className="px-2.5 py-1 text-[11px] rounded bg-white/10 hover:bg-white/15 text-white/90 transition-all flex items-center gap-1 cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                  Add Badge
                                </button>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                                {(product.badges || []).map((badge, bIdx) => (
                                  <div
                                    key={badge.id || `b-${bIdx}`}
                                    className="flex items-center gap-1.5 p-2 rounded-lg bg-white/5 border border-white/10"
                                  >
                                    <div className="flex-1 space-y-1">
                                      {activeLangTab === 'en' ? (
                                        <input
                                          type="text"
                                          value={badge.en || ''}
                                          onChange={(e) => handleProductBadgeChange(pIdx, bIdx, 'en', e.target.value)}
                                          placeholder="e.g. CE Certified"
                                          className="w-full px-2 py-1 text-[11px] rounded bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                        />
                                      ) : (
                                        <input
                                          type="text"
                                          dir="rtl"
                                          value={badge.ar || ''}
                                          onChange={(e) => handleProductBadgeChange(pIdx, bIdx, 'ar', e.target.value)}
                                          placeholder="مثال: معتمد من CE"
                                          className="w-full px-2 py-1 text-[11px] rounded bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                        />
                                      )}
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveProductBadge(pIdx, bIdx)}
                                      className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-colors"
                                      title="Remove Badge"
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Action Button Settings */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-white/5">
                              {activeLangTab === 'en' ? (
                                <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-white/70">🇬🇧 Action Button Text</label>
                                  <input
                                    type="text"
                                    value={product.buttonText?.en || ''}
                                    onChange={(e) => handleProductChange(pIdx, 'buttonText', 'en', e.target.value)}
                                    placeholder="Request a Quote"
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                </div>
                              ) : (
                                <div className="space-y-1.5">
                                  <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص زر الطلب بالعربية</label>
                                  <input
                                    type="text"
                                    dir="rtl"
                                    value={product.buttonText?.ar || ''}
                                    onChange={(e) => handleProductChange(pIdx, 'buttonText', 'ar', e.target.value)}
                                    placeholder="طلب عرض أسعار"
                                    className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                </div>
                              )}
                              <div className="space-y-1.5">
                                <label className="text-xs font-semibold text-white/70">Target Button URL</label>
                                <input
                                  type="text"
                                  value={product.buttonUrl || ''}
                                  onChange={(e) => handleProductChange(pIdx, 'buttonUrl', e.target.value)}
                                  placeholder="e.g. /contact or /quote"
                                  className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* IF EDITING PROJECTS PAGE */}
            {editingTabId === 'projects' && (
              <div className="space-y-8">
                {/* SECTION 1: OUR PROJECTS */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 1: Our Projects</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الأول: مشاريعنا)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Main page title, introductory description, and repeating strategic project portfolio cards with category and status pills.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Header Title & Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Header Title</label>
                            <input
                              type="text"
                              value={projectsData.headerSection.title.en}
                              onChange={(e) =>
                                setProjectsData({
                                  ...projectsData,
                                  headerSection: {
                                    ...projectsData.headerSection,
                                    title: { ...projectsData.headerSection.title, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="Our Projects"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Introductory Description</label>
                            <textarea
                              rows={3}
                              value={projectsData.headerSection.description.en}
                              onChange={(e) =>
                                setProjectsData({
                                  ...projectsData,
                                  headerSection: {
                                    ...projectsData.headerSection,
                                    description: { ...projectsData.headerSection.description, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="Explore our projects, discover innovative ideas..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان القسم بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={projectsData.headerSection.title.ar}
                              onChange={(e) =>
                                setProjectsData({
                                  ...projectsData,
                                  headerSection: {
                                    ...projectsData.headerSection,
                                    title: { ...projectsData.headerSection.title, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="مشاريعنا"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف التمهيدي بالعربية</label>
                            <textarea
                              rows={3}
                              dir="rtl"
                              value={projectsData.headerSection.description.ar}
                              onChange={(e) =>
                                setProjectsData({
                                  ...projectsData,
                                  headerSection: {
                                    ...projectsData.headerSection,
                                    description: { ...projectsData.headerSection.description, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="استكشف مشاريعنا، واكتشف الأفكار المبتكرة..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Projects Grid Manager */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            Project Initiatives ({projectsData.headerSection.projects.length} Cards)
                          </h4>
                          <span className="text-xs text-white/50">
                            Cards matching reference layout
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddProject}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Project
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectsData.headerSection.projects.map((project, pIdx) => (
                          <div
                            key={project.id || `proj-${pIdx}`}
                            className="bg-[#12162e] border border-white/10 hover:border-white/20 rounded-xl p-5 space-y-4 transition-all shadow-lg flex flex-col justify-between"
                          >
                            <div className="space-y-4">
                              {/* Card Header with index, status preview, and remove button */}
                              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-500/10 border border-purple-500/30 text-purple-400">
                                    #{pIdx + 1}
                                  </span>
                                  <span className="text-xs font-semibold text-white">
                                    {activeLangTab === 'ar' ? (project.title?.ar || 'مشروع جديد') : (project.title?.en || 'New Project')}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span
                                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                                      project.statusType === 'completed'
                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                        : project.statusType === 'planned'
                                        ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                                        : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                    }`}
                                  >
                                    {project.statusType}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveProject(pIdx)}
                                    className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                                    title="Remove Project"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Category and Status Type */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {activeLangTab === 'en' ? (
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-white/70">🇬🇧 Category Tag</label>
                                    <input
                                      type="text"
                                      value={project.category?.en || ''}
                                      onChange={(e) => handleProjectChange(pIdx, 'category', 'en', e.target.value)}
                                      placeholder="e.g. Urban Innovation"
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                    />
                                  </div>
                                ) : (
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 وسم الفئة بالعربية</label>
                                    <input
                                      type="text"
                                      dir="rtl"
                                      value={project.category?.ar || ''}
                                      onChange={(e) => handleProjectChange(pIdx, 'category', 'ar', e.target.value)}
                                      placeholder="مثال: الابتكار الحضري"
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                    />
                                  </div>
                                )}

                                <div className="space-y-1">
                                  <label className="text-[11px] font-semibold text-white/70">Status Lifecycle</label>
                                  <select
                                    value={project.statusType || 'ongoing'}
                                    onChange={(e) => handleProjectChange(pIdx, 'statusType', e.target.value)}
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                                  >
                                    <option value="completed" className="bg-[#12162e] text-white">Completed (مكتمل)</option>
                                    <option value="ongoing" className="bg-[#12162e] text-white">Ongoing (قيد التنفيذ)</option>
                                    <option value="planned" className="bg-[#12162e] text-white">Planned (مخطط له)</option>
                                  </select>
                                </div>
                              </div>

                              {/* Title */}
                              <div className="space-y-1">
                                {activeLangTab === 'en' ? (
                                  <>
                                    <label className="text-[11px] font-semibold text-white/70">🇬🇧 Project Title</label>
                                    <input
                                      type="text"
                                      value={project.title?.en || ''}
                                      onChange={(e) => handleProjectChange(pIdx, 'title', 'en', e.target.value)}
                                      placeholder="e.g. Smart City Development"
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان المشروع بالعربية</label>
                                    <input
                                      type="text"
                                      dir="rtl"
                                      value={project.title?.ar || ''}
                                      onChange={(e) => handleProjectChange(pIdx, 'title', 'ar', e.target.value)}
                                      placeholder="مثال: تطوير المدن الذكية"
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                    />
                                  </>
                                )}
                              </div>

                              {/* Description */}
                              <div className="space-y-1">
                                {activeLangTab === 'en' ? (
                                  <>
                                    <label className="text-[11px] font-semibold text-white/70">🇬🇧 Project Description</label>
                                    <textarea
                                      rows={2}
                                      value={project.description?.en || ''}
                                      onChange={(e) => handleProjectChange(pIdx, 'description', 'en', e.target.value)}
                                      placeholder="Developing intelligent urban solutions that improve infrastructure..."
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف المشروع بالعربية</label>
                                    <textarea
                                      rows={2}
                                      dir="rtl"
                                      value={project.description?.ar || ''}
                                      onChange={(e) => handleProjectChange(pIdx, 'description', 'ar', e.target.value)}
                                      placeholder="تطوير حلول حضرية ذكية تعمل على تحسين البنية التحتية..."
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                                    />
                                  </>
                                )}
                              </div>

                              {/* Link URL */}
                              <div className="space-y-1">
                                <label className="text-[11px] font-semibold text-white/70">Target Project URL</label>
                                <input
                                  type="text"
                                  value={project.linkUrl || ''}
                                  onChange={(e) => handleProjectChange(pIdx, 'linkUrl', e.target.value)}
                                  placeholder="e.g. /projects/smart-city"
                                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 2: LET'S WORK TOGETHER BANNER */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 2: Let's Work Together Banner</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الثاني: بانر لنعمل معاً)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          High-converting luxury call-to-action banner with headline, description, quote trigger, and inquiry contact buttons.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Tagline / Badge</label>
                            <input
                              type="text"
                              value={projectsData.bannerSection.tagline.en}
                              onChange={(e) => handleProjectsBannerChange('tagline', 'en', e.target.value)}
                              placeholder="LET'S WORK TOGETHER"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Main Headline</label>
                            <input
                              type="text"
                              value={projectsData.bannerSection.title.en}
                              onChange={(e) => handleProjectsBannerChange('title', 'en', e.target.value)}
                              placeholder="Let's Build Something That Moves Business Forward."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={projectsData.bannerSection.tagline.ar}
                              onChange={(e) => handleProjectsBannerChange('tagline', 'ar', e.target.value)}
                              placeholder="لنعمل معاً"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان البارز بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={projectsData.bannerSection.title.ar}
                              onChange={(e) => handleProjectsBannerChange('title', 'ar', e.target.value)}
                              placeholder="دعنا نبني شيئاً يدفع الأعمال إلى الأمام."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {activeLangTab === 'en' ? (
                        <>
                          <label className="text-xs font-semibold text-white/70">🇬🇧 Banner Description</label>
                          <textarea
                            rows={3}
                            value={projectsData.bannerSection.description.en}
                            onChange={(e) => handleProjectsBannerChange('description', 'en', e.target.value)}
                            placeholder="Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need."
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        </>
                      ) : (
                        <>
                          <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف البانر بالعربية</label>
                          <textarea
                            rows={3}
                            dir="rtl"
                            value={projectsData.bannerSection.description.ar}
                            onChange={(e) => handleProjectsBannerChange('description', 'ar', e.target.value)}
                            placeholder="هل تبحث عن منتجات طبية، معدات، حلول صيدلانية، أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه."
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                          />
                        </>
                      )}
                    </div>

                    {/* Primary & Secondary Buttons Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      {/* Primary Button */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <span className="text-xs font-bold text-white block">Primary Button (Solid White)</span>
                        {activeLangTab === 'en' ? (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-white/70">🇬🇧 Button Label</label>
                            <input
                              type="text"
                              value={projectsData.bannerSection.primaryButtonText.en}
                              onChange={(e) => handleProjectsBannerChange('primaryButtonText', 'en', e.target.value)}
                              placeholder="Get a Quote"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الأساسي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={projectsData.bannerSection.primaryButtonText.ar}
                              onChange={(e) => handleProjectsBannerChange('primaryButtonText', 'ar', e.target.value)}
                              placeholder="احصل على عرض أسعار"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        )}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Button Target URL</label>
                          <input
                            type="text"
                            value={projectsData.bannerSection.primaryButtonUrl}
                            onChange={(e) => handleProjectsBannerChange('primaryButtonUrl', e.target.value)}
                            placeholder="/contact"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>

                      {/* Secondary Button */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <span className="text-xs font-bold text-white block">Secondary Button (Outlined Transparent)</span>
                        {activeLangTab === 'en' ? (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-white/70">🇬🇧 Button Label</label>
                            <input
                              type="text"
                              value={projectsData.bannerSection.secondaryButtonText.en}
                              onChange={(e) => handleProjectsBannerChange('secondaryButtonText', 'en', e.target.value)}
                              placeholder="Contact Us"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الثانوي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={projectsData.bannerSection.secondaryButtonText.ar}
                              onChange={(e) => handleProjectsBannerChange('secondaryButtonText', 'ar', e.target.value)}
                              placeholder="اتصل بنا"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        )}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Button Target URL</label>
                          <input
                            type="text"
                            value={projectsData.bannerSection.secondaryButtonUrl}
                            onChange={(e) => handleProjectsBannerChange('secondaryButtonUrl', e.target.value)}
                            placeholder="/contact"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* IF EDITING PARTNERS PAGE */}
            {editingTabId === 'partners' && (
              <div className="space-y-8">
                {/* SECTION 1: OUR PARTNERS */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 1: Our Partners</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الأول: شركاؤنا)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Main page title, introductory narrative, and repeating global partner cards with logos, category tags, descriptions, and direct URLs.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Header Title & Description */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Header Title</label>
                            <input
                              type="text"
                              value={partnersData.headerSection.title.en}
                              onChange={(e) =>
                                setPartnersData({
                                  ...partnersData,
                                  headerSection: {
                                    ...partnersData.headerSection,
                                    title: { ...partnersData.headerSection.title, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="Our Partners"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Introductory Description</label>
                            <textarea
                              rows={3}
                              value={partnersData.headerSection.description.en}
                              onChange={(e) =>
                                setPartnersData({
                                  ...partnersData,
                                  headerSection: {
                                    ...partnersData.headerSection,
                                    description: { ...partnersData.headerSection.description, en: e.target.value },
                                  },
                                })
                              }
                              placeholder="Meet the trusted partners who share our vision..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان القسم بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={partnersData.headerSection.title.ar}
                              onChange={(e) =>
                                setPartnersData({
                                  ...partnersData,
                                  headerSection: {
                                    ...partnersData.headerSection,
                                    title: { ...partnersData.headerSection.title, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="شركاؤنا"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف التمهيدي بالعربية</label>
                            <textarea
                              rows={3}
                              dir="rtl"
                              value={partnersData.headerSection.description.ar}
                              onChange={(e) =>
                                setPartnersData({
                                  ...partnersData,
                                  headerSection: {
                                    ...partnersData.headerSection,
                                    description: { ...partnersData.headerSection.description, ar: e.target.value },
                                  },
                                })
                              }
                              placeholder="تعرف على الشركاء الموثوقين الذين يشاركوننا رؤيتنا..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Partners Grid Manager */}
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            Partners Directory ({partnersData.headerSection.partners.length} Partners)
                          </h4>
                          <span className="text-xs text-white/50">
                            Cards matching reference layout
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={handleAddPartner}
                          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Partner
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {partnersData.headerSection.partners.map((partner, pIdx) => (
                          <div
                            key={partner.id || `partner-${pIdx}`}
                            className="bg-[#12162e] border border-white/10 hover:border-white/20 rounded-xl p-5 space-y-4 transition-all shadow-lg flex flex-col justify-between"
                          >
                            <div className="space-y-4">
                              {/* Header row */}
                              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/10 border border-blue-500/30 text-blue-400">
                                    #{pIdx + 1}
                                  </span>
                                  <span className="text-xs font-semibold text-white">
                                    {activeLangTab === 'ar' ? (partner.name?.ar || 'شريك جديد') : (partner.name?.en || 'New Partner')}
                                  </span>
                                  {partner.category?.en && (
                                    <span className="text-[11px] text-red-400">
                                      • {partner.category.en}
                                    </span>
                                  )}
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemovePartner(pIdx)}
                                  className="text-red-400 hover:text-red-300 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer"
                                  title="Remove Partner"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>

                              {/* Logo Upload */}
                              <div className="space-y-1">
                                <ImageUploadField
                                  label="Partner Logo"
                                  compact
                                  folder="partners"
                                  value={partner.logoUrl || ''}
                                  onChange={(url) => handlePartnerChange(pIdx, 'logoUrl', url)}
                                  placeholder="Upload partner brand logo..."
                                />
                              </div>

                              {/* Category and Name */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {activeLangTab === 'en' ? (
                                  <>
                                    <div className="space-y-1">
                                      <label className="text-[11px] font-semibold text-white/70">🇬🇧 Category Tag</label>
                                      <input
                                        type="text"
                                        value={partner.category?.en || ''}
                                        onChange={(e) => handlePartnerChange(pIdx, 'category', 'en', e.target.value)}
                                        placeholder="e.g. Technology Partner"
                                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[11px] font-semibold text-white/70">🇬🇧 Partner Name</label>
                                      <input
                                        type="text"
                                        value={partner.name?.en || ''}
                                        onChange={(e) => handlePartnerChange(pIdx, 'name', 'en', e.target.value)}
                                        placeholder="e.g. Microsoft, Google, AWS"
                                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                      />
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="space-y-1">
                                      <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 وسم الفئة بالعربية</label>
                                      <input
                                        type="text"
                                        dir="rtl"
                                        value={partner.category?.ar || ''}
                                        onChange={(e) => handlePartnerChange(pIdx, 'category', 'ar', e.target.value)}
                                        placeholder="مثال: شريك تكنولوجي"
                                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 اسم الشريك بالعربية</label>
                                      <input
                                        type="text"
                                        dir="rtl"
                                        value={partner.name?.ar || ''}
                                        onChange={(e) => handlePartnerChange(pIdx, 'name', 'ar', e.target.value)}
                                        placeholder="مثال: مايكروسوفت، جوجل"
                                        className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                      />
                                    </div>
                                  </>
                                )}
                              </div>

                              {/* Description */}
                              <div className="space-y-1">
                                {activeLangTab === 'en' ? (
                                  <>
                                    <label className="text-[11px] font-semibold text-white/70">🇬🇧 Description</label>
                                    <textarea
                                      rows={2}
                                      value={partner.description?.en || ''}
                                      onChange={(e) => handlePartnerChange(pIdx, 'description', 'en', e.target.value)}
                                      placeholder="Empowering digital transformation through cloud computing..."
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف الشراكة بالعربية</label>
                                    <textarea
                                      rows={2}
                                      dir="rtl"
                                      value={partner.description?.ar || ''}
                                      onChange={(e) => handlePartnerChange(pIdx, 'description', 'ar', e.target.value)}
                                      placeholder="تمكين التحول الرقمي من خلال الحوسبة السحابية..."
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                                    />
                                  </>
                                )}
                              </div>

                              {/* Website URL & Link Text */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="space-y-1">
                                  <label className="text-[11px] font-semibold text-white/70">Website URL</label>
                                  <input
                                    type="text"
                                    value={partner.websiteUrl || ''}
                                    onChange={(e) => handlePartnerChange(pIdx, 'websiteUrl', e.target.value)}
                                    placeholder="https://partner-website.com"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                </div>
                                {activeLangTab === 'en' ? (
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-white/70">🇬🇧 Link Text</label>
                                    <input
                                      type="text"
                                      value={partner.linkText?.en || ''}
                                      onChange={(e) => handlePartnerChange(pIdx, 'linkText', 'en', e.target.value)}
                                      placeholder="Visit website"
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                    />
                                  </div>
                                ) : (
                                  <div className="space-y-1">
                                    <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الرابط بالعربية</label>
                                    <input
                                      type="text"
                                      dir="rtl"
                                      value={partner.linkText?.ar || ''}
                                      onChange={(e) => handlePartnerChange(pIdx, 'linkText', 'ar', e.target.value)}
                                      placeholder="زيارة الموقع"
                                      className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 2: LET'S WORK TOGETHER BANNER */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 2: Let's Work Together Banner</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الثاني: بانر لنعمل معاً)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          High-converting luxury call-to-action banner with headline, description, quote trigger, and inquiry contact buttons.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Tagline / Badge</label>
                            <input
                              type="text"
                              value={partnersData.bannerSection.tagline.en}
                              onChange={(e) => handlePartnersBannerChange('tagline', 'en', e.target.value)}
                              placeholder="LET'S WORK TOGETHER"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Main Headline</label>
                            <input
                              type="text"
                              value={partnersData.bannerSection.title.en}
                              onChange={(e) => handlePartnersBannerChange('title', 'en', e.target.value)}
                              placeholder="Let's Build Something That Moves Business Forward."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={partnersData.bannerSection.tagline.ar}
                              onChange={(e) => handlePartnersBannerChange('tagline', 'ar', e.target.value)}
                              placeholder="لنعمل معاً"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان البارز بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={partnersData.bannerSection.title.ar}
                              onChange={(e) => handlePartnersBannerChange('title', 'ar', e.target.value)}
                              placeholder="دعنا نبني شيئاً يدفع الأعمال إلى الأمام."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {activeLangTab === 'en' ? (
                        <>
                          <label className="text-xs font-semibold text-white/70">🇬🇧 Banner Description</label>
                          <textarea
                            rows={3}
                            value={partnersData.bannerSection.description.en}
                            onChange={(e) => handlePartnersBannerChange('description', 'en', e.target.value)}
                            placeholder="Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need."
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        </>
                      ) : (
                        <>
                          <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف البانر بالعربية</label>
                          <textarea
                            rows={3}
                            dir="rtl"
                            value={partnersData.bannerSection.description.ar}
                            onChange={(e) => handlePartnersBannerChange('description', 'ar', e.target.value)}
                            placeholder="هل تبحث عن منتجات طبية، معدات، حلول صيدلانية، أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه."
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                          />
                        </>
                      )}
                    </div>

                    {/* Primary & Secondary Buttons Settings */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                      {/* Primary Button */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <span className="text-xs font-bold text-white block">Primary Button (Solid White)</span>
                        {activeLangTab === 'en' ? (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-white/70">🇬🇧 Button Label</label>
                            <input
                              type="text"
                              value={partnersData.bannerSection.primaryButtonText.en}
                              onChange={(e) => handlePartnersBannerChange('primaryButtonText', 'en', e.target.value)}
                              placeholder="Get a Quote"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الأساسي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={partnersData.bannerSection.primaryButtonText.ar}
                              onChange={(e) => handlePartnersBannerChange('primaryButtonText', 'ar', e.target.value)}
                              placeholder="احصل على عرض أسعار"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        )}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Button Target URL</label>
                          <input
                            type="text"
                            value={partnersData.bannerSection.primaryButtonUrl}
                            onChange={(e) => handlePartnersBannerChange('primaryButtonUrl', e.target.value)}
                            placeholder="/contact"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>

                      {/* Secondary Button */}
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                        <span className="text-xs font-bold text-white block">Secondary Button (Outlined Transparent)</span>
                        {activeLangTab === 'en' ? (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-white/70">🇬🇧 Button Label</label>
                            <input
                              type="text"
                              value={partnersData.bannerSection.secondaryButtonText.en}
                              onChange={(e) => handlePartnersBannerChange('secondaryButtonText', 'en', e.target.value)}
                              placeholder="Contact Us"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الثانوي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={partnersData.bannerSection.secondaryButtonText.ar}
                              onChange={(e) => handlePartnersBannerChange('secondaryButtonText', 'ar', e.target.value)}
                              placeholder="اتصل بنا"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        )}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Button Target URL</label>
                          <input
                            type="text"
                            value={partnersData.bannerSection.secondaryButtonUrl}
                            onChange={(e) => handlePartnersBannerChange('secondaryButtonUrl', e.target.value)}
                            placeholder="/contact"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* IF EDITING CONTACT PAGE */}
            {editingTabId === 'contact' && (
              <div className="space-y-8">
                {/* SECTION 1: CONTACT US & SEND AN ENQUIRY */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 1: Contact Us & Send an Enquiry</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الأول: اتصل بنا ونموذج الاستفسار)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Main page headline, introductory overview copy, and enquiry form call-to-action headers.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Main Contact Us Header */}
                    <div className="p-4 rounded-xl bg-[#12162e] border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Page Header (العنوان الرئيسي للصفحة)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeLangTab === 'en' ? (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-white/70">🇬🇧 Header Title</label>
                              <input
                                type="text"
                                value={contactData.headerSection.title.en}
                                onChange={(e) => handleContactHeaderChange('title', 'en', e.target.value)}
                                placeholder="Contact Us"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-white/70">🇬🇧 Header Description</label>
                              <textarea
                                rows={3}
                                value={contactData.headerSection.description.en}
                                onChange={(e) => handleContactHeaderChange('description', 'en', e.target.value)}
                                placeholder="Get in touch with our team to discuss your ideas, explore collaboration opportunities, or learn more about our solutions."
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان الصفحة بالعربية</label>
                              <input
                                type="text"
                                dir="rtl"
                                value={contactData.headerSection.title.ar}
                                onChange={(e) => handleContactHeaderChange('title', 'ar', e.target.value)}
                                placeholder="اتصل بنا"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف الصفحة بالعربية</label>
                              <textarea
                                rows={3}
                                dir="rtl"
                                value={contactData.headerSection.description.ar}
                                onChange={(e) => handleContactHeaderChange('description', 'ar', e.target.value)}
                                placeholder="تواصل مع فريقنا لمناقشة أفكارك واستكشاف فرص التعاون أو معرفة المزيد عن حلولنا."
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Send an Enquiry Sub-header */}
                    <div className="p-4 rounded-xl bg-[#12162e] border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Enquiry Form Header (عنوان ونصوص نموذج الاستفسار)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeLangTab === 'en' ? (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-white/70">🇬🇧 Enquiry Section Title</label>
                              <input
                                type="text"
                                value={contactData.headerSection.enquiryTitle.en}
                                onChange={(e) => handleContactHeaderChange('enquiryTitle', 'en', e.target.value)}
                                placeholder="Send an Enquiry"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-white/70">🇬🇧 Enquiry Description</label>
                              <textarea
                                rows={3}
                                value={contactData.headerSection.enquiryDescription.en}
                                onChange={(e) => handleContactHeaderChange('enquiryDescription', 'en', e.target.value)}
                                placeholder="Have a question or need more information about our services? Fill out the form below, and our team will get back to you."
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان قسم الاستفسار بالعربية</label>
                              <input
                                type="text"
                                dir="rtl"
                                value={contactData.headerSection.enquiryTitle.ar}
                                onChange={(e) => handleContactHeaderChange('enquiryTitle', 'ar', e.target.value)}
                                placeholder="أرسل استفسارك"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف قسم الاستفسار بالعربية</label>
                              <textarea
                                rows={3}
                                dir="rtl"
                                value={contactData.headerSection.enquiryDescription.ar}
                                onChange={(e) => handleContactHeaderChange('enquiryDescription', 'ar', e.target.value)}
                                placeholder="هل لديك سؤال أو تحتاج إلى مزيد من المعلومات حول خدماتنا؟ املأ النموذج أدناه وسيقوم فريقنا بالرد عليك."
                                className="w-full px-3 py-2 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 2: GET IN TOUCH WITH US (CORPORATE OFFICE & MAP) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 2: Get in Touch with Us (Corporate Office & Map)</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الثاني: المكتب الرئيسي وتفاصيل التواصل)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Headquarters address, official inquiry email, phone helpline, and Google Maps integration.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Header info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Tagline</label>
                            <input
                              type="text"
                              value={contactData.corporateOfficeSection.tagline.en}
                              onChange={(e) => handleContactCorporateChange('tagline', 'en', e.target.value)}
                              placeholder="GET IN TOUCH"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Title</label>
                            <input
                              type="text"
                              value={contactData.corporateOfficeSection.title.en}
                              onChange={(e) => handleContactCorporateChange('title', 'en', e.target.value)}
                              placeholder="Corporate Office"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوسم الفرعي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={contactData.corporateOfficeSection.tagline.ar}
                              onChange={(e) => handleContactCorporateChange('tagline', 'ar', e.target.value)}
                              placeholder="تواصل معنا"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={contactData.corporateOfficeSection.title.ar}
                              onChange={(e) => handleContactCorporateChange('title', 'ar', e.target.value)}
                              placeholder="المكتب الرئيسي"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      {activeLangTab === 'en' ? (
                        <>
                          <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                          <textarea
                            rows={2}
                            value={contactData.corporateOfficeSection.description.en}
                            onChange={(e) => handleContactCorporateChange('description', 'en', e.target.value)}
                            placeholder="Visit our headquarters or contact our team for enquiries and collaboration opportunities."
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                          />
                        </>
                      ) : (
                        <>
                          <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                          <textarea
                            rows={2}
                            dir="rtl"
                            value={contactData.corporateOfficeSection.description.ar}
                            onChange={(e) => handleContactCorporateChange('description', 'ar', e.target.value)}
                            placeholder="تفضل بزيارة مقرنا الرئيسي أو تواصل مع فريقنا للاستفسارات وفرص التعاون."
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right resize-none"
                          />
                        </>
                      )}
                    </div>

                    {/* Address Box */}
                    <div className="p-4 rounded-xl bg-[#12162e] border border-white/10 space-y-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Office Physical Address (العنوان الفعلي)
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeLangTab === 'en' ? (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-semibold text-white/70">🇬🇧 Address Label</label>
                              <input
                                type="text"
                                value={contactData.corporateOfficeSection.addressLabel.en}
                                onChange={(e) => handleContactCorporateChange('addressLabel', 'en', e.target.value)}
                                placeholder="Office Address"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-semibold text-white/70">🇬🇧 Headquarters Name</label>
                              <input
                                type="text"
                                value={contactData.corporateOfficeSection.addressLine1.en}
                                onChange={(e) => handleContactCorporateChange('addressLine1', 'en', e.target.value)}
                                placeholder="Mobtaker Group Headquarters"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-semibold text-white/70">🇬🇧 District / Area</label>
                              <input
                                type="text"
                                value={contactData.corporateOfficeSection.addressLine2.en}
                                onChange={(e) => handleContactCorporateChange('addressLine2', 'en', e.target.value)}
                                placeholder="Al-Mansour District"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-semibold text-white/70">🇬🇧 City & Country</label>
                              <input
                                type="text"
                                value={contactData.corporateOfficeSection.addressCityCountry.en}
                                onChange={(e) => handleContactCorporateChange('addressCityCountry', 'en', e.target.value)}
                                placeholder="Baghdad, Iraq"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 تسمية العنوان</label>
                              <input
                                type="text"
                                dir="rtl"
                                value={contactData.corporateOfficeSection.addressLabel.ar}
                                onChange={(e) => handleContactCorporateChange('addressLabel', 'ar', e.target.value)}
                                placeholder="عنوان المكتب"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 اسم المقر بالعربية</label>
                              <input
                                type="text"
                                dir="rtl"
                                value={contactData.corporateOfficeSection.addressLine1.ar}
                                onChange={(e) => handleContactCorporateChange('addressLine1', 'ar', e.target.value)}
                                placeholder="المقر الرئيسي لمجموعة مبتكر"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 المنطقة / الحي بالعربية</label>
                              <input
                                type="text"
                                dir="rtl"
                                value={contactData.corporateOfficeSection.addressLine2.ar}
                                onChange={(e) => handleContactCorporateChange('addressLine2', 'ar', e.target.value)}
                                placeholder="حي المنصور"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 المدينة والدولة بالعربية</label>
                              <input
                                type="text"
                                dir="rtl"
                                value={contactData.corporateOfficeSection.addressCityCountry.ar}
                                onChange={(e) => handleContactCorporateChange('addressCityCountry', 'ar', e.target.value)}
                                placeholder="بغداد، العراق"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Email and Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Email Box */}
                      <div className="p-4 rounded-xl bg-[#12162e] border border-white/10 space-y-3">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-bold text-white uppercase">Email Contact</span>
                        </div>
                        {activeLangTab === 'en' ? (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-white/70">🇬🇧 Label</label>
                            <input
                              type="text"
                              value={contactData.corporateOfficeSection.emailLabel.en}
                              onChange={(e) => handleContactCorporateChange('emailLabel', 'en', e.target.value)}
                              placeholder="Email Address"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 التسمية بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={contactData.corporateOfficeSection.emailLabel.ar}
                              onChange={(e) => handleContactCorporateChange('emailLabel', 'ar', e.target.value)}
                              placeholder="البريد الإلكتروني"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        )}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Email Address Value</label>
                          <input
                            type="email"
                            value={contactData.corporateOfficeSection.emailValue}
                            onChange={(e) => handleContactCorporateChange('emailValue', e.target.value)}
                            placeholder="info@mobtakergroup.com"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>

                      {/* Phone Box */}
                      <div className="p-4 rounded-xl bg-[#12162e] border border-white/10 space-y-3">
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-red-500" />
                          <span className="text-xs font-bold text-white uppercase">Phone Helpline</span>
                        </div>
                        {activeLangTab === 'en' ? (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-white/70">🇬🇧 Label</label>
                            <input
                              type="text"
                              value={contactData.corporateOfficeSection.phoneLabel.en}
                              onChange={(e) => handleContactCorporateChange('phoneLabel', 'en', e.target.value)}
                              placeholder="Phone Number"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 التسمية بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={contactData.corporateOfficeSection.phoneLabel.ar}
                              onChange={(e) => handleContactCorporateChange('phoneLabel', 'ar', e.target.value)}
                              placeholder="رقم الهاتف"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        )}
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Phone Number Value</label>
                          <input
                            type="text"
                            value={contactData.corporateOfficeSection.phoneValue}
                            onChange={(e) => handleContactCorporateChange('phoneValue', e.target.value)}
                            placeholder="+964 (0) 123 456 789"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Google Map Settings */}
                    <div className="p-4 rounded-xl bg-[#12162e] border border-white/10 space-y-4">
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                        Interactive Google Maps Settings (إعدادات خريطة جوجل)
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Google Maps Destination URL</label>
                          <input
                            type="text"
                            value={contactData.corporateOfficeSection.mapLocationUrl}
                            onChange={(e) => handleContactCorporateChange('mapLocationUrl', e.target.value)}
                            placeholder="https://maps.google.com/?q=Al-Mansour,Baghdad,Iraq"
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-semibold text-white/70">Google Maps Embed URL (iframe)</label>
                          <input
                            type="text"
                            value={contactData.corporateOfficeSection.mapEmbedUrl}
                            onChange={(e) => handleContactCorporateChange('mapEmbedUrl', e.target.value)}
                            placeholder="https://www.google.com/maps/embed?pb=..."
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                        {activeLangTab === 'en' ? (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-white/70">🇬🇧 Map Button Label</label>
                            <input
                              type="text"
                              value={contactData.corporateOfficeSection.mapButtonText.en}
                              onChange={(e) => handleContactCorporateChange('mapButtonText', 'en', e.target.value)}
                              placeholder="Open in Maps"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <label className="text-[11px] font-semibold text-[#F68E2D] block text-right">🇸🇦 نص زر الخريطة بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={contactData.corporateOfficeSection.mapButtonText.ar}
                              onChange={(e) => handleContactCorporateChange('mapButtonText', 'ar', e.target.value)}
                              placeholder="فتح في خرائط جوجل"
                              className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            
            {/* IF EDITING INVESTMENT PAGE (SECTIONS 1 TO 6) */}
            {editingTabId === 'investment' && (
              <div className="space-y-8">
                {/* SECTION 1: INVESTMENT OPPORTUNITIES (IMAGE 1) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        1
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 1: Investment Opportunities Header</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الأول: ترويسة فرص الاستثمار)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Main page title, introductory summary, and value creation overview
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Main Page Title</label>
                            <input
                              type="text"
                              value={investmentData.headerSection.title.en}
                              onChange={(e) => handleInvestmentHeaderChange('title', 'en', e.target.value)}
                              placeholder="Investment Opportunities"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Header Description</label>
                            <textarea
                              rows={3}
                              value={investmentData.headerSection.description.en}
                              onChange={(e) => handleInvestmentHeaderChange('description', 'en', e.target.value)}
                              placeholder="Explore investment opportunities with Mobtaker Group..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان الصفحة بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.headerSection.title.ar}
                              onChange={(e) => handleInvestmentHeaderChange('title', 'ar', e.target.value)}
                              placeholder="فرص الاستثمار"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف ترويسة الصفحة بالعربية</label>
                            <textarea
                              rows={3}
                              dir="rtl"
                              value={investmentData.headerSection.description.ar}
                              onChange={(e) => handleInvestmentHeaderChange('description', 'ar', e.target.value)}
                              placeholder="استكشف فرص الاستثمار مع مجموعة مبتكر..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 2: INSTITUTIONAL MISSION (IMAGE 2) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        2
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 2: Institutional Mission</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الثاني: المهمة المؤسسية)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          National growth solutions narrative and dashboard metrics graphic
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Tagline / Category</label>
                            <input
                              type="text"
                              value={investmentData.missionSection.tagline.en}
                              onChange={(e) => handleInvestmentMissionChange('tagline', 'en', e.target.value)}
                              placeholder="INSTITUTIONAL MISSION"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Main Headline</label>
                            <input
                              type="text"
                              value={investmentData.missionSection.title.en}
                              onChange={(e) => handleInvestmentMissionChange('title', 'en', e.target.value)}
                              placeholder="Best Investment Solutions for Sustainable National Growth"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Narrative Description (Supports multiple paragraphs)</label>
                            <textarea
                              rows={6}
                              value={investmentData.missionSection.description.en}
                              onChange={(e) => handleInvestmentMissionChange('description', 'en', e.target.value)}
                              placeholder="Enter paragraphs about investment hubs, foreign investors, and strategic partners..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.missionSection.tagline.ar}
                              onChange={(e) => handleInvestmentMissionChange('tagline', 'ar', e.target.value)}
                              placeholder="المهمة المؤسسية"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.missionSection.title.ar}
                              onChange={(e) => handleInvestmentMissionChange('title', 'ar', e.target.value)}
                              placeholder="أفضل الحلول الاستثمارية لتحقيق نمو وطني مستدام"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف المهمة المؤسسية بالعربية</label>
                            <textarea
                              rows={6}
                              dir="rtl"
                              value={investmentData.missionSection.description.ar}
                              onChange={(e) => handleInvestmentMissionChange('description', 'ar', e.target.value)}
                              placeholder="أدخل فقرات عن محاور الاستثمار، المستثمرين، والشركاء الاستراتيجيين..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <ImageUploadField
                        label="Mission Graphic / Dashboard Image"
                        value={investmentData.missionSection.image}
                        onChange={(url) => handleInvestmentMissionChange('image', url)}
                        folder="investment"
                        placeholder="Image URL (e.g. dashboard graphic screenshot)"
                        helperText="Upload or enter URL for the institutional mission dashboard graphic"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 3: MACROECONOMIC DRIVERS (IMAGE 3) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        3
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 3: Macroeconomic Drivers</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الثالث: المحركات الاقتصادية الكلية)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Why Invest in Iraq Now? ({investmentData.driversSection.drivers.length} Drivers)
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleAddInvestmentDriver}
                      size="sm"
                      className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Driver
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Tagline</label>
                            <input
                              type="text"
                              value={investmentData.driversSection.tagline.en}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  driversSection: {
                                    ...prev.driversSection,
                                    tagline: { ...prev.driversSection.tagline, en: e.target.value },
                                  },
                                }))
                              }
                              placeholder="MACROECONOMIC DRIVERS"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Main Headline</label>
                            <input
                              type="text"
                              value={investmentData.driversSection.title.en}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  driversSection: {
                                    ...prev.driversSection,
                                    title: { ...prev.driversSection.title, en: e.target.value },
                                  },
                                }))
                              }
                              placeholder="Why Invest in Iraq Now?"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                            <textarea
                              rows={2}
                              value={investmentData.driversSection.description.en}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  driversSection: {
                                    ...prev.driversSection,
                                    description: { ...prev.driversSection.description, en: e.target.value },
                                  },
                                }))
                              }
                              placeholder="Discover the key sectors and economic opportunities shaping Iraq's investment landscape."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.driversSection.tagline.ar}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  driversSection: {
                                    ...prev.driversSection,
                                    tagline: { ...prev.driversSection.tagline, ar: e.target.value },
                                  },
                                }))
                              }
                              placeholder="المحركات الاقتصادية الكلية"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.driversSection.title.ar}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  driversSection: {
                                    ...prev.driversSection,
                                    title: { ...prev.driversSection.title, ar: e.target.value },
                                  },
                                }))
                              }
                              placeholder="لماذا الاستثمار في العراق الآن؟"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                            <textarea
                              rows={2}
                              dir="rtl"
                              value={investmentData.driversSection.description.ar}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  driversSection: {
                                    ...prev.driversSection,
                                    description: { ...prev.driversSection.description, ar: e.target.value },
                                  },
                                }))
                              }
                              placeholder="اكتشف القطاعات الرئيسية والفرص الاقتصادية..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Drivers Cards Grid */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Drivers List ({investmentData.driversSection.drivers.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {investmentData.driversSection.drivers.map((driver, idx) => (
                          <div
                            key={driver.id || idx}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 relative group"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <div className="flex items-center gap-2">
                                <label className="text-xs text-white/50">Number:</label>
                                <input
                                  type="text"
                                  value={driver.number}
                                  onChange={(e) => handleInvestmentDriverChange(idx, 'number', e.target.value)}
                                  placeholder="01"
                                  className="w-14 px-2 py-1 text-xs font-bold text-red-500 rounded bg-black/40 border border-white/15 focus:outline-none focus:border-red-500"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveInvestmentDriver(idx)}
                                className="text-white/40 hover:text-red-400 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete driver"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {activeLangTab === 'en' ? (
                              <>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-white/60">🇬🇧 Title</label>
                                  <input
                                    type="text"
                                    value={driver.title.en}
                                    onChange={(e) => handleInvestmentDriverChange(idx, 'title', 'en', e.target.value)}
                                    placeholder="e.g. Economic Growth"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-white/60">🇬🇧 Description</label>
                                  <textarea
                                    rows={2}
                                    value={driver.description.en}
                                    onChange={(e) => handleInvestmentDriverChange(idx, 'description', 'en', e.target.value)}
                                    placeholder="Growing demand across key industries..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-[#F68E2D] block text-right">🇸🇦 العنوان بالعربية</label>
                                  <input
                                    type="text"
                                    dir="rtl"
                                    value={driver.title.ar}
                                    onChange={(e) => handleInvestmentDriverChange(idx, 'title', 'ar', e.target.value)}
                                    placeholder="النمو الاقتصادي"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                                  <textarea
                                    rows={2}
                                    dir="rtl"
                                    value={driver.description.ar}
                                    onChange={(e) => handleInvestmentDriverChange(idx, 'description', 'ar', e.target.value)}
                                    placeholder="الطلب المتزايد عبر الصناعات الرئيسية..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 4: OUR FOCUS SECTORS (IMAGE 4) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        4
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 4: Our Focus Sectors</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الرابع: قطاعات تركيزنا)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Explore Our Investment Areas ({investmentData.sectorsSection.sectors.length} Focus Sectors)
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleAddInvestmentSector}
                      size="sm"
                      className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Sector
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Tagline</label>
                            <input
                              type="text"
                              value={investmentData.sectorsSection.tagline.en}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  sectorsSection: {
                                    ...prev.sectorsSection,
                                    tagline: { ...prev.sectorsSection.tagline, en: e.target.value },
                                  },
                                }))
                              }
                              placeholder="OUR FOCUS SECTORS"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Main Headline</label>
                            <input
                              type="text"
                              value={investmentData.sectorsSection.title.en}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  sectorsSection: {
                                    ...prev.sectorsSection,
                                    title: { ...prev.sectorsSection.title, en: e.target.value },
                                  },
                                }))
                              }
                              placeholder="Explore Our Investment Areas"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                            <textarea
                              rows={2}
                              value={investmentData.sectorsSection.description.en}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  sectorsSection: {
                                    ...prev.sectorsSection,
                                    description: { ...prev.sectorsSection.description, en: e.target.value },
                                  },
                                }))
                              }
                              placeholder="We focus on strategic sectors with the potential to support economic development..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.sectorsSection.tagline.ar}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  sectorsSection: {
                                    ...prev.sectorsSection,
                                    tagline: { ...prev.sectorsSection.tagline, ar: e.target.value },
                                  },
                                }))
                              }
                              placeholder="قطاعات تركيزنا"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.sectorsSection.title.ar}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  sectorsSection: {
                                    ...prev.sectorsSection,
                                    title: { ...prev.sectorsSection.title, ar: e.target.value },
                                  },
                                }))
                              }
                              placeholder="استكشف مجالاتنا الاستثمارية"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                            <textarea
                              rows={2}
                              dir="rtl"
                              value={investmentData.sectorsSection.description.ar}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  sectorsSection: {
                                    ...prev.sectorsSection,
                                    description: { ...prev.sectorsSection.description, ar: e.target.value },
                                  },
                                }))
                              }
                              placeholder="نركز على القطاعات الاستراتيجية..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Sectors Grid */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Focus Sectors List ({investmentData.sectorsSection.sectors.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {investmentData.sectorsSection.sectors.map((sector, idx) => (
                          <div
                            key={sector.id || idx}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 relative group"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <div className="flex items-center gap-2">
                                <label className="text-xs text-white/50">Number:</label>
                                <input
                                  type="text"
                                  value={sector.number}
                                  onChange={(e) => handleInvestmentSectorChange(idx, 'number', e.target.value)}
                                  placeholder="01"
                                  className="w-14 px-2 py-1 text-xs font-bold text-red-500 rounded bg-black/40 border border-white/15 focus:outline-none focus:border-red-500"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveInvestmentSector(idx)}
                                className="text-white/40 hover:text-red-400 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete sector"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {activeLangTab === 'en' ? (
                              <>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-white/60">🇬🇧 Title</label>
                                  <input
                                    type="text"
                                    value={sector.title.en}
                                    onChange={(e) => handleInvestmentSectorChange(idx, 'title', 'en', e.target.value)}
                                    placeholder="e.g. Industry"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-white/60">🇬🇧 Description</label>
                                  <textarea
                                    rows={2}
                                    value={sector.description.en}
                                    onChange={(e) => handleInvestmentSectorChange(idx, 'description', 'en', e.target.value)}
                                    placeholder="Explore opportunities in industrial development..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-[#F68E2D] block text-right">🇸🇦 العنوان بالعربية</label>
                                  <input
                                    type="text"
                                    dir="rtl"
                                    value={sector.title.ar}
                                    onChange={(e) => handleInvestmentSectorChange(idx, 'title', 'ar', e.target.value)}
                                    placeholder="الصناعة"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                                  <textarea
                                    rows={2}
                                    dir="rtl"
                                    value={sector.description.ar}
                                    onChange={(e) => handleInvestmentSectorChange(idx, 'description', 'ar', e.target.value)}
                                    placeholder="استكشف الفرص في التنمية الصناعية..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                </div>
                              </>
                            )}

                            <div className="space-y-1 pt-1">
                              <label className="text-[11px] text-white/60">Explore Link URL (Arrow ↗)</label>
                              <input
                                type="text"
                                value={sector.linkUrl || ''}
                                onChange={(e) => handleInvestmentSectorChange(idx, 'linkUrl', e.target.value)}
                                placeholder="/investment/industry"
                                className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 5: THE INVESTMENT ENVIRONMENT (IMAGE 5) */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
                        5
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 5: The Investment Environment</span>
                          <span className="text-xs text-white/50 font-normal">(القسم الخامس: البيئة الاستثمارية)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          Factors Encouraging Investment ({investmentData.environmentSection.factors.length} factors) and Foundation Box
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={handleAddInvestmentFactor}
                      size="sm"
                      className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Factor
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Tagline</label>
                            <input
                              type="text"
                              value={investmentData.environmentSection.tagline.en}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  environmentSection: {
                                    ...prev.environmentSection,
                                    tagline: { ...prev.environmentSection.tagline, en: e.target.value },
                                  },
                                }))
                              }
                              placeholder="THE INVESTMENT ENVIRONMENT"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Main Headline</label>
                            <input
                              type="text"
                              value={investmentData.environmentSection.title.en}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  environmentSection: {
                                    ...prev.environmentSection,
                                    title: { ...prev.environmentSection.title, en: e.target.value },
                                  },
                                }))
                              }
                              placeholder="Factors Encouraging Investment"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                            <textarea
                              rows={2}
                              value={investmentData.environmentSection.description.en}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  environmentSection: {
                                    ...prev.environmentSection,
                                    description: { ...prev.environmentSection.description, en: e.target.value },
                                  },
                                }))
                              }
                              placeholder="Several economic and strategic factors can create opportunities..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.environmentSection.tagline.ar}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  environmentSection: {
                                    ...prev.environmentSection,
                                    tagline: { ...prev.environmentSection.tagline, ar: e.target.value },
                                  },
                                }))
                              }
                              placeholder="البيئة الاستثمارية"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.environmentSection.title.ar}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  environmentSection: {
                                    ...prev.environmentSection,
                                    title: { ...prev.environmentSection.title, ar: e.target.value },
                                  },
                                }))
                              }
                              placeholder="عوامل مشجعة على الاستثمار"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                            <textarea
                              rows={2}
                              dir="rtl"
                              value={investmentData.environmentSection.description.ar}
                              onChange={(e) =>
                                setInvestmentData((prev) => ({
                                  ...prev,
                                  environmentSection: {
                                    ...prev.environmentSection,
                                    description: { ...prev.environmentSection.description, ar: e.target.value },
                                  },
                                }))
                              }
                              placeholder="تساهم العديد من العوامل الاقتصادية والاستراتيجية..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Factors Grid */}
                    <div className="space-y-3 pt-4 border-t border-white/10">
                      <h4 className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                        Encouraging Factors Cards ({investmentData.environmentSection.factors.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {investmentData.environmentSection.factors.map((factor, idx) => (
                          <div
                            key={factor.id || idx}
                            className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3 relative group"
                          >
                            <div className="flex items-center justify-between pb-2 border-b border-white/10">
                              <div className="flex items-center gap-2">
                                <LucideIcon name={factor.icon || 'Shield'} className="w-4 h-4 text-red-500" />
                                <span className="text-xs text-white/60 font-semibold">Factor #{idx + 1}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => handleRemoveInvestmentFactor(idx)}
                                className="text-white/40 hover:text-red-400 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
                                title="Delete factor"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            {/* Lucide Icon Selector */}
                            <div>
                              <label className="text-[11px] text-white/60 block mb-1">Lucide Icon</label>
                              <LucideIconSelect
                                value={factor.icon || 'Shield'}
                                onChange={(newIcon) => handleInvestmentFactorChange(idx, 'icon', newIcon)}
                                options={ALL_LUCIDE_ICONS}
                              />
                            </div>

                            {activeLangTab === 'en' ? (
                              <>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-white/60">🇬🇧 Title</label>
                                  <input
                                    type="text"
                                    value={factor.title.en}
                                    onChange={(e) => handleInvestmentFactorChange(idx, 'title', 'en', e.target.value)}
                                    placeholder="e.g. Improving Business Environment"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-white/60">🇬🇧 Description</label>
                                  <textarea
                                    rows={3}
                                    value={factor.description.en}
                                    onChange={(e) => handleInvestmentFactorChange(idx, 'description', 'en', e.target.value)}
                                    placeholder="Ongoing development and institutional initiatives..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                                  />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-[#F68E2D] block text-right">🇸🇦 العنوان بالعربية</label>
                                  <input
                                    type="text"
                                    dir="rtl"
                                    value={factor.title.ar}
                                    onChange={(e) => handleInvestmentFactorChange(idx, 'title', 'ar', e.target.value)}
                                    placeholder="تحسين بيئة الأعمال"
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[11px] text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                                  <textarea
                                    rows={3}
                                    dir="rtl"
                                    value={factor.description.ar}
                                    onChange={(e) => handleInvestmentFactorChange(idx, 'description', 'ar', e.target.value)}
                                    placeholder="تساهم المبادرات المؤسسية..."
                                    className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-black/30 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Building a Foundation for Investment Box */}
                    <div className="space-y-4 pt-4 border-t border-white/10 bg-black/20 p-4 rounded-xl border border-white/5">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                          Building a Foundation for Investment (Bottom Card)
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {activeLangTab === 'en' ? (
                          <>
                            <div className="space-y-1.5 md:col-span-2">
                              <label className="text-xs font-semibold text-white/70">🇬🇧 Foundation Box Title</label>
                              <input
                                type="text"
                                value={investmentData.environmentSection.foundationBox.title.en}
                                onChange={(e) => handleInvestmentFoundationChange('title', 'en', e.target.value)}
                                placeholder="Building a Foundation for Investment"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                              <label className="text-xs font-semibold text-white/70">🇬🇧 Foundation Box Description</label>
                              <textarea
                                rows={4}
                                value={investmentData.environmentSection.foundationBox.description.en}
                                onChange={(e) => handleInvestmentFoundationChange('description', 'en', e.target.value)}
                                placeholder="Mobtaker Group works to help investors explore opportunities in Iraq..."
                                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="space-y-1.5 md:col-span-2">
                              <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان الصندوق التأسيسي بالعربية</label>
                              <input
                                type="text"
                                dir="rtl"
                                value={investmentData.environmentSection.foundationBox.title.ar}
                                onChange={(e) => handleInvestmentFoundationChange('title', 'ar', e.target.value)}
                                placeholder="بناء أساس متين للاستثمار"
                                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            </div>
                            <div className="space-y-1.5 md:col-span-2">
                              <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف الصندوق التأسيسي بالعربية</label>
                              <textarea
                                rows={4}
                                dir="rtl"
                                value={investmentData.environmentSection.foundationBox.description.ar}
                                onChange={(e) => handleInvestmentFoundationChange('description', 'ar', e.target.value)}
                                placeholder="تعمل مجموعة مبتكر على مساعدة المستثمرين..."
                                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                              />
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* SECTION 6: LET'S WORK TOGETHER BANNER */}
                <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                  <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
                        6
                      </div>
                      <div>
                        <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                          <span>Section 6: Let's Work Together Banner</span>
                          <span className="text-xs text-white/50 font-normal">(القسم السادس: بنر لنعمل معاً)</span>
                        </CardTitle>
                        <p className="text-xs text-white/50">
                          High-converting luxury call-to-action banner with headline, description, quote trigger, and inquiry contact buttons.
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                    {/* Live Gradient Preview Box */}
                    <div className="relative rounded-2xl overflow-hidden shadow-xl border border-red-500/30 text-center p-8 bg-gradient-to-br from-[#70101d] via-[#851624] to-[#4e0912]">
                      <div className="relative z-10 max-w-2xl mx-auto space-y-3">
                        <p className="text-xs font-bold text-white/80 tracking-widest uppercase">
                          — {investmentData.bannerSection.tagline[activeLangTab] || "LET'S WORK TOGETHER"} —
                        </p>
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          {investmentData.bannerSection.title[activeLangTab] || "Let's Build Something That Moves Business Forward."}
                        </h3>
                        <p className="text-xs text-white/80 leading-relaxed max-w-xl mx-auto">
                          {investmentData.bannerSection.description[activeLangTab]}
                        </p>
                        <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                          <span className="px-5 py-2 rounded-full bg-white text-[#851624] font-bold text-xs flex items-center gap-1.5 shadow-md">
                            <span>{investmentData.bannerSection.primaryButtonText[activeLangTab] || 'Get a Quote'}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                          <span className="px-5 py-2 rounded-full bg-white/10 text-white border border-white/30 font-semibold text-xs flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            <span>{investmentData.bannerSection.secondaryButtonText[activeLangTab] || 'Contact Us'}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeLangTab === 'en' ? (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Tagline / Badge</label>
                            <input
                              type="text"
                              value={investmentData.bannerSection.tagline.en}
                              onChange={(e) => handleInvestmentBannerChange('tagline', 'en', e.target.value)}
                              placeholder="LET'S WORK TOGETHER"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Main Headline</label>
                            <input
                              type="text"
                              value={investmentData.bannerSection.title.en}
                              onChange={(e) => handleInvestmentBannerChange('title', 'en', e.target.value)}
                              placeholder="Let's Build Something That Moves Business Forward."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Banner Description</label>
                            <textarea
                              rows={2}
                              value={investmentData.bannerSection.description.en}
                              onChange={(e) => handleInvestmentBannerChange('description', 'en', e.target.value)}
                              placeholder="Looking for medical products, equipment, pharmaceutical solutions..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Primary Button Label</label>
                            <input
                              type="text"
                              value={investmentData.bannerSection.primaryButtonText.en}
                              onChange={(e) => handleInvestmentBannerChange('primaryButtonText', 'en', e.target.value)}
                              placeholder="Get a Quote"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-white/70">🇬🇧 Secondary Button Label</label>
                            <input
                              type="text"
                              value={investmentData.bannerSection.secondaryButtonText.en}
                              onChange={(e) => handleInvestmentBannerChange('secondaryButtonText', 'en', e.target.value)}
                              placeholder="Contact Us"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.bannerSection.tagline.ar}
                              onChange={(e) => handleInvestmentBannerChange('tagline', 'ar', e.target.value)}
                              placeholder="لنعمل معاً"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.bannerSection.title.ar}
                              onChange={(e) => handleInvestmentBannerChange('title', 'ar', e.target.value)}
                              placeholder="دعنا نبني شيئاً يدفع الأعمال إلى الأمام."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف البنر بالعربية</label>
                            <textarea
                              rows={2}
                              dir="rtl"
                              value={investmentData.bannerSection.description.ar}
                              onChange={(e) => handleInvestmentBannerChange('description', 'ar', e.target.value)}
                              placeholder="هل تبحث عن منتجات طبية، معدات..."
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الرئيسي</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.bannerSection.primaryButtonText.ar}
                              onChange={(e) => handleInvestmentBannerChange('primaryButtonText', 'ar', e.target.value)}
                              placeholder="احصل على عرض أسعار"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الثانوي</label>
                            <input
                              type="text"
                              dir="rtl"
                              value={investmentData.bannerSection.secondaryButtonText.ar}
                              onChange={(e) => handleInvestmentBannerChange('secondaryButtonText', 'ar', e.target.value)}
                              placeholder="اتصل بنا"
                              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                            />
                          </div>
                        </>
                      )}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/70">Primary Button Target URL</label>
                        <input
                          type="text"
                          value={investmentData.bannerSection.primaryButtonUrl}
                          onChange={(e) => handleInvestmentBannerChange('primaryButtonUrl', e.target.value)}
                          placeholder="/contact"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/70">Secondary Button Target URL</label>
                        <input
                          type="text"
                          value={investmentData.bannerSection.secondaryButtonUrl}
                          onChange={(e) => handleInvestmentBannerChange('secondaryButtonUrl', e.target.value)}
                          placeholder="/contact"
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* IF EDITING PROJECTS INNOVATOR PAGE (SECTIONS 1 TO 5) */}
{editingTabId === 'projects-innovator' && (
  <div className="space-y-8">
    {/* SECTION 1: HERO BANNER (IMAGE 1) */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
            1
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <span>Section 1: Hero Banner</span>
              <span className="text-xs text-white/50 font-normal">(القسم الأول: بانر الواجهة)</span>
            </CardTitle>
            <p className="text-xs text-white/50">
              Logo, headline with colored highlight, description, action buttons, and background image
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Logo URL & Logo Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ImageUploadField
              label={activeLangTab === 'ar' ? 'شعار البانر' : 'Banner Logo'}
              value={projectsInnovatorData.heroBannerSection.logoUrl}
              onChange={(url) => handlePIHeroBannerChange('logoUrl', url)}
              folder="projects-innovator"
            />
          </div>

          <div className="space-y-3">
            {activeLangTab === 'en' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Logo Text</label>
                <input
                  type="text"
                  value={projectsInnovatorData.heroBannerSection.logoText.en}
                  onChange={(e) => handlePIHeroBannerBilingualChange('logoText', 'en', e.target.value)}
                  placeholder="PROJECTS INNOVATOR"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الشعار بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.heroBannerSection.logoText.ar}
                  onChange={(e) => handlePIHeroBannerBilingualChange('logoText', 'ar', e.target.value)}
                  placeholder="شركة مبتكر المشاريع"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            )}
          </div>
        </div>

        {/* Title & Highlight & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Main Title Prefix</label>
                <input
                  type="text"
                  value={projectsInnovatorData.heroBannerSection.title.en}
                  onChange={(e) => handlePIHeroBannerBilingualChange('title', 'en', e.target.value)}
                  placeholder="Building Tomorrow"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400">🇬🇧 Title Highlight (Red Colored)</label>
                <input
                  type="text"
                  value={projectsInnovatorData.heroBannerSection.titleHighlight.en}
                  onChange={(e) => handlePIHeroBannerBilingualChange('titleHighlight', 'en', e.target.value)}
                  placeholder="Through Innovation"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-red-500/30 text-white placeholder-white/30 focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                <textarea
                  rows={3}
                  value={projectsInnovatorData.heroBannerSection.description.en}
                  onChange={(e) => handlePIHeroBannerBilingualChange('description', 'en', e.target.value)}
                  placeholder="Delivering innovative construction and infrastructure solutions..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 بداية العنوان الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.heroBannerSection.title.ar}
                  onChange={(e) => handlePIHeroBannerBilingualChange('title', 'ar', e.target.value)}
                  placeholder="بناء الغد"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400 block text-right">🇸🇦 الجزء المميز باللون الأحمر بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.heroBannerSection.titleHighlight.ar}
                  onChange={(e) => handlePIHeroBannerBilingualChange('titleHighlight', 'ar', e.target.value)}
                  placeholder="من خلال الابتكار"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-red-500/30 text-white placeholder-white/30 focus:outline-none focus:border-red-500 text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={projectsInnovatorData.heroBannerSection.description.ar}
                  onChange={(e) => handlePIHeroBannerBilingualChange('description', 'ar', e.target.value)}
                  placeholder="تقديم حلول مبتكرة في البناء والبنية التحتية لتشكيل المساحات الحديثة..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* Buttons & Background Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-red-400">
              {activeLangTab === 'ar' ? 'الزر الرئيسي (استكشف خدماتنا)' : 'Primary Button (Explore Services)'}
            </h4>
            {activeLangTab === 'en' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Button Label</label>
                <input
                  type="text"
                  value={projectsInnovatorData.heroBannerSection.primaryButtonText.en}
                  onChange={(e) => handlePIHeroBannerBilingualChange('primaryButtonText', 'en', e.target.value)}
                  placeholder="Explore Our Services"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.heroBannerSection.primaryButtonText.ar}
                  onChange={(e) => handlePIHeroBannerBilingualChange('primaryButtonText', 'ar', e.target.value)}
                  placeholder="استكشف خدماتنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الزر (URL)' : 'Button URL'}</label>
              <input
                type="text"
                value={projectsInnovatorData.heroBannerSection.primaryButtonUrl}
                onChange={(e) => handlePIHeroBannerChange('primaryButtonUrl', e.target.value)}
                placeholder="/services"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white/80">
              {activeLangTab === 'ar' ? 'الزر الثانوي (اتصل بنا)' : 'Secondary Button (Contact Us)'}
            </h4>
            {activeLangTab === 'en' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Button Label</label>
                <input
                  type="text"
                  value={projectsInnovatorData.heroBannerSection.secondaryButtonText.en}
                  onChange={(e) => handlePIHeroBannerBilingualChange('secondaryButtonText', 'en', e.target.value)}
                  placeholder="Contact Us"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.heroBannerSection.secondaryButtonText.ar}
                  onChange={(e) => handlePIHeroBannerBilingualChange('secondaryButtonText', 'ar', e.target.value)}
                  placeholder="اتصل بنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الزر (URL)' : 'Button URL'}</label>
              <input
                type="text"
                value={projectsInnovatorData.heroBannerSection.secondaryButtonUrl}
                onChange={(e) => handlePIHeroBannerChange('secondaryButtonUrl', e.target.value)}
                placeholder="/contact"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <ImageUploadField
            label={activeLangTab === 'ar' ? 'صورة خلفية الواجهة (ناطحة سحاب)' : 'Skyscraper Hero Background Image'}
            value={projectsInnovatorData.heroBannerSection.backgroundImageUrl}
            onChange={(url) => handlePIHeroBannerChange('backgroundImageUrl', url)}
            folder="projects-innovator"
          />
        </div>
      </CardContent>
    </Card>

    {/* SECTION 2: BRAND LOGOS (IMAGE 1) */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
              2
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <span>Section 2: Brand Logos</span>
                <span className="text-xs text-white/50 font-normal">(القسم الثاني: شعارات العلامات التجارية)</span>
              </CardTitle>
              <p className="text-xs text-white/50">
                Trusted brands and industry leaders carousel logos
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddPIBrand}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Brand</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-white/70">🇬🇧 Section Title / Tagline</label>
              <input
                type="text"
                value={projectsInnovatorData.brandsSection.title.en}
                onChange={(e) => handlePIBrandsTitleChange('en', e.target.value)}
                placeholder="TRUSTED BRANDS & INDUSTRY LEADERS"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
            </div>
          ) : (
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان القسم / الشعار بالعربية</label>
              <input
                type="text"
                dir="rtl"
                value={projectsInnovatorData.brandsSection.title.ar}
                onChange={(e) => handlePIBrandsTitleChange('ar', e.target.value)}
                placeholder="العلامات التجارية الموثوقة وقادة الصناعة"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
              />
            </div>
          )}
        </div>

        {/* Brands List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {projectsInnovatorData.brandsSection.brands.map((b, idx) => (
            <div
              key={b.id || idx}
              className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/60">Brand #{idx + 1}</span>
                <button
                  type="button"
                  onClick={() => handleDeletePIBrand(idx)}
                  className="text-white/40 hover:text-red-400 p-1 transition-colors cursor-pointer"
                  title="Delete brand"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] text-white/60 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={b.name}
                  onChange={(e) => handlePIBrandItemChange(idx, 'name', e.target.value)}
                  placeholder="Oracle"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <ImageUploadField
                  label={activeLangTab === 'ar' ? 'شعار العلامة التجارية' : 'Brand Logo'}
                  value={b.logoUrl}
                  onChange={(url) => handlePIBrandItemChange(idx, 'logoUrl', url)}
                  folder="projects-innovator"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* SECTION 3: ABOUT PROJECTS INNOVATOR (IMAGE 2) */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
            3
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <span>Section 3: About Projects Innovator</span>
              <span className="text-xs text-white/50 font-normal">(القسم الثالث: عن مبتكر المشاريع)</span>
            </CardTitle>
            <p className="text-xs text-white/50">
              Holding entity overview, sustainable platform narrative, and headquarters visual
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400">🇬🇧 Section Tagline</label>
                <input
                  type="text"
                  value={projectsInnovatorData.aboutSection.tagline.en}
                  onChange={(e) => handlePIAboutBilingualChange('tagline', 'en', e.target.value)}
                  placeholder="ABOUT PROJECTS INNOVATOR"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Headline Title</label>
                <input
                  type="text"
                  value={projectsInnovatorData.aboutSection.title.en}
                  onChange={(e) => handlePIAboutBilingualChange('title', 'en', e.target.value)}
                  placeholder="More Than a Company, A Platform for Sustainable Growth."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Narrative Description</label>
                <textarea
                  rows={4}
                  value={projectsInnovatorData.aboutSection.description.en}
                  onChange={(e) => handlePIAboutBilingualChange('description', 'en', e.target.value)}
                  placeholder="Projects Innovator is the parent and holding entity of Mobtaker Group..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400 block text-right">🇸🇦 شريط العنوان الفرعي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.aboutSection.tagline.ar}
                  onChange={(e) => handlePIAboutBilingualChange('tagline', 'ar', e.target.value)}
                  placeholder="عن مبتكر المشاريع"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.aboutSection.title.ar}
                  onChange={(e) => handlePIAboutBilingualChange('title', 'ar', e.target.value)}
                  placeholder="أكثر من مجرد شركة، منصة للنمو المستدام."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف السردي بالعربية</label>
                <textarea
                  rows={4}
                  dir="rtl"
                  value={projectsInnovatorData.aboutSection.description.ar}
                  onChange={(e) => handlePIAboutBilingualChange('description', 'ar', e.target.value)}
                  placeholder="تعتبر مبتكر المشاريع الكيان القابض والأم لمجموعة مبتكر..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] resize-none text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* Headquarters Building Image */}
        <div className="pt-4 border-t border-white/5">
          <ImageUploadField
            label={activeLangTab === 'ar' ? 'صورة مبنى المقر الرئيسي' : 'Corporate Headquarters Building Image'}
            value={projectsInnovatorData.aboutSection.imageUrl}
            onChange={(url) => handlePIAboutChange('imageUrl', url)}
            folder="projects-innovator"
          />
        </div>
      </CardContent>
    </Card>

    {/* SECTION 4: OUR BUSINESS AREAS (IMAGE 2) */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold text-xs">
              4
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <span>Section 4: Our Business Areas</span>
                <span className="text-xs text-white/50 font-normal">(القسم الرابع: مجالات أعمالنا)</span>
              </CardTitle>
              <p className="text-xs text-white/50">
                Medical & Lab Equipment, Supplies, and Healthcare Solutions cards
              </p>
            </div>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleAddPIBusinessArea}
            className="bg-orange-600 hover:bg-orange-700 text-white text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Business Area</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Header Title & Subtitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Section Title</label>
                <input
                  type="text"
                  value={projectsInnovatorData.businessAreasSection.title.en}
                  onChange={(e) => handlePIBusinessAreasHeaderChange('title', 'en', e.target.value)}
                  placeholder="Our Business Areas"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                <input
                  type="text"
                  value={projectsInnovatorData.businessAreasSection.description.en}
                  onChange={(e) => handlePIBusinessAreasHeaderChange('description', 'en', e.target.value)}
                  placeholder="Explore the sectors and services that form the Projects Innovator group."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان القسم بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.businessAreasSection.title.ar}
                  onChange={(e) => handlePIBusinessAreasHeaderChange('title', 'ar', e.target.value)}
                  placeholder="مجالات أعمالنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.businessAreasSection.description.ar}
                  onChange={(e) => handlePIBusinessAreasHeaderChange('description', 'ar', e.target.value)}
                  placeholder="استكشف القطاعات والخدمات التي تشكل مجموعة مبتكر المشاريع."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* Business Areas Cards List */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          {projectsInnovatorData.businessAreasSection.areas.map((area, idx) => (
            <div
              key={area.id || idx}
              className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-500 font-bold text-xs">
                    {idx + 1}
                  </div>
                  <span className="text-sm font-bold text-white">
                    {activeLangTab === 'ar' ? (area.title.ar || `مجال أعمال #${idx + 1}`) : (area.title.en || `Business Area #${idx + 1}`)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeletePIBusinessArea(idx)}
                  className="text-white/40 hover:text-red-400 p-1.5 transition-colors cursor-pointer"
                  title="Delete business area"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-white/60 mb-1">{activeLangTab === 'ar' ? 'نوع أيقونة Lucide' : 'Lucide Icon Style'}</label>
                  <LucideIconSelect
                    value={area.icon}
                    onChange={(newIcon) => handlePIBusinessAreaItemChange(idx, 'icon', newIcon)}
                    options={PROJECTS_INNOVATOR_AREA_ICONS}
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-white/60 mb-1">{activeLangTab === 'ar' ? 'رابط الوجهة (URL)' : 'Target Link URL'}</label>
                  <input
                    type="text"
                    value={area.linkUrl}
                    onChange={(e) => handlePIBusinessAreaItemChange(idx, 'linkUrl', e.target.value)}
                    placeholder="/services"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              {activeLangTab === 'en' ? (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white/70">🇬🇧 Card Title</label>
                    <input
                      type="text"
                      value={area.title.en}
                      onChange={(e) => handlePIBusinessAreaBilingualChange(idx, 'title', 'en', e.target.value)}
                      placeholder="Medical & Laboratory Equipment"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                    <textarea
                      rows={2}
                      value={area.description.en}
                      onChange={(e) => handlePIBusinessAreaBilingualChange(idx, 'description', 'en', e.target.value)}
                      placeholder="Comprehensive medical device solutions and laboratory testing equipment."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان البطاقة بالعربية</label>
                    <input
                      type="text"
                      dir="rtl"
                      value={area.title.ar}
                      onChange={(e) => handlePIBusinessAreaBilingualChange(idx, 'title', 'ar', e.target.value)}
                      placeholder="الأجهزة الطبية والمخبرية"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white text-right"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={area.description.ar}
                      onChange={(e) => handlePIBusinessAreaBilingualChange(idx, 'description', 'ar', e.target.value)}
                      placeholder="حلول شاملة للأجهزة الطبية ومعدات الاختبارات المختبرية."
                      className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white text-right resize-none"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* SECTION 5: LET'S WORK TOGETHER BANNER (IMAGE 3) */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
            5
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <span>Section 5: Let's Work Together Banner</span>
              <span className="text-xs text-white/50 font-normal">(القسم الخامس: بانر لنعمل معاً)</span>
            </CardTitle>
            <p className="text-xs text-white/50">
              High-impact crimson banner with proposal request and contact routing
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400">🇬🇧 Banner Tagline</label>
                <input
                  type="text"
                  value={projectsInnovatorData.workTogetherSection.tagline.en}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('tagline', 'en', e.target.value)}
                  placeholder="LET'S WORK TOGETHER"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Headline Title</label>
                <input
                  type="text"
                  value={projectsInnovatorData.workTogetherSection.title.en}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('title', 'en', e.target.value)}
                  placeholder="Let's Build Something That Moves Business Forward."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                <textarea
                  rows={3}
                  value={projectsInnovatorData.workTogetherSection.description.en}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('description', 'en', e.target.value)}
                  placeholder="Looking for medical products, equipment, pharmaceutical solutions..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Primary Button Label</label>
                <input
                  type="text"
                  value={projectsInnovatorData.workTogetherSection.primaryButtonText.en}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('primaryButtonText', 'en', e.target.value)}
                  placeholder="Get a Quote"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Secondary Button Label</label>
                <input
                  type="text"
                  value={projectsInnovatorData.workTogetherSection.secondaryButtonText.en}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('secondaryButtonText', 'en', e.target.value)}
                  placeholder="Contact Us"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400 block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.workTogetherSection.tagline.ar}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('tagline', 'ar', e.target.value)}
                  placeholder="دعنا نعمل معاً"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.workTogetherSection.title.ar}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('title', 'ar', e.target.value)}
                  placeholder="دعنا نبني شيئاً يدفع الأعمال إلى الأمام."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={projectsInnovatorData.workTogetherSection.description.ar}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('description', 'ar', e.target.value)}
                  placeholder="هل تبحث عن منتجات طبية، معدات، حلول دوائية، أو خدمات تجارية؟..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white text-right resize-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.workTogetherSection.primaryButtonText.ar}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('primaryButtonText', 'ar', e.target.value)}
                  placeholder="احصل على عرض أسعار"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الثانوي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={projectsInnovatorData.workTogetherSection.secondaryButtonText.ar}
                  onChange={(e) => handlePIWorkTogetherBilingualChange('secondaryButtonText', 'ar', e.target.value)}
                  placeholder="اتصل بنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* Button URLs (Common) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الزر الرئيسي (URL)' : 'Primary Button URL'}</label>
            <input
              type="text"
              value={projectsInnovatorData.workTogetherSection.primaryButtonUrl}
              onChange={(e) => handlePIWorkTogetherChange('primaryButtonUrl', e.target.value)}
              placeholder="/contact"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الزر الثانوي (URL)' : 'Secondary Button URL'}</label>
            <input
              type="text"
              value={projectsInnovatorData.workTogetherSection.secondaryButtonUrl}
              onChange={(e) => handlePIWorkTogetherChange('secondaryButtonUrl', e.target.value)}
              placeholder="/contact"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)}


{/* IF EDITING ATTRACTIVE PAGE (SECTIONS 1 TO 5) */}
{editingTabId === 'attractive' && (
  <div className="space-y-8">
    {/* SECTION 1: HERO BANNER */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
            1
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <span>Section 1: Hero Banner</span>
              <span className="text-xs text-white/50 font-normal">(القسم الأول: بانر الواجهة)</span>
            </CardTitle>
            <p className="text-xs text-white/50">
              Logo, headline with colored highlight, description, action buttons, and background image
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Logo URL & Logo Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ImageUploadField
              label={activeLangTab === 'ar' ? 'شعار البانر' : 'Banner Logo'}
              value={attractiveData.heroBannerSection.logoUrl}
              onChange={(url) => handleAttHeroBannerChange('logoUrl', url)}
              folder="attractive"
            />
          </div>

          <div className="space-y-3">
            {activeLangTab === 'en' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Logo Text</label>
                <input
                  type="text"
                  value={attractiveData.heroBannerSection.logoText.en}
                  onChange={(e) => handleAttHeroBannerBilingualChange('logoText', 'en', e.target.value)}
                  placeholder="ATTRACTIVE"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الشعار بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.heroBannerSection.logoText.ar}
                  onChange={(e) => handleAttHeroBannerBilingualChange('logoText', 'ar', e.target.value)}
                  placeholder="أتراكتيف"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            )}
          </div>
        </div>

        {/* Headline & Colored Highlight & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Main Headline</label>
                <input
                  type="text"
                  value={attractiveData.heroBannerSection.title.en}
                  onChange={(e) => handleAttHeroBannerBilingualChange('title', 'en', e.target.value)}
                  placeholder="Building Tomorrow"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400">🇬🇧 Highlighted Phrase in Accent Color</label>
                <input
                  type="text"
                  value={attractiveData.heroBannerSection.titleHighlight.en}
                  onChange={(e) => handleAttHeroBannerBilingualChange('titleHighlight', 'en', e.target.value)}
                  placeholder="Through Innovation"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-blue-500/30 text-blue-300 font-semibold placeholder-white/30 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Hero Description</label>
                <textarea
                  rows={3}
                  value={attractiveData.heroBannerSection.description.en}
                  onChange={(e) => handleAttHeroBannerBilingualChange('description', 'en', e.target.value)}
                  placeholder="Delivering innovative solutions..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.heroBannerSection.title.ar}
                  onChange={(e) => handleAttHeroBannerBilingualChange('title', 'ar', e.target.value)}
                  placeholder="بناء الغد"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400 block text-right">🇸🇦 العبارة المميزة بلون بارز</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.heroBannerSection.titleHighlight.ar}
                  onChange={(e) => handleAttHeroBannerBilingualChange('titleHighlight', 'ar', e.target.value)}
                  placeholder="من خلال الابتكار"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-blue-500/30 text-blue-300 font-semibold placeholder-white/30 focus:outline-none focus:border-blue-500 text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف الرئيسي للواجهة</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={attractiveData.heroBannerSection.description.ar}
                  onChange={(e) => handleAttHeroBannerBilingualChange('description', 'ar', e.target.value)}
                  placeholder="تقديم حلول مبتكرة..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              {activeLangTab === 'ar' ? 'الزر الرئيسي (أزرق)' : 'Primary Button (BLUE)'}
            </span>
            {activeLangTab === 'en' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Button Text</label>
                <input
                  type="text"
                  value={attractiveData.heroBannerSection.primaryButtonText.en}
                  onChange={(e) => handleAttHeroBannerBilingualChange('primaryButtonText', 'en', e.target.value)}
                  placeholder="Explore Our Services →"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.heroBannerSection.primaryButtonText.ar}
                  onChange={(e) => handleAttHeroBannerBilingualChange('primaryButtonText', 'ar', e.target.value)}
                  placeholder="استكشف خدماتنا ←"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الوجهة (URL)' : 'Target URL'}</label>
              <input
                type="text"
                value={attractiveData.heroBannerSection.primaryButtonUrl}
                onChange={(e) => handleAttHeroBannerChange('primaryButtonUrl', e.target.value)}
                placeholder="/services"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">
              {activeLangTab === 'ar' ? 'الزر الثانوي (تحديد أبيض)' : 'Secondary Button (White Outline)'}
            </span>
            {activeLangTab === 'en' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Button Text</label>
                <input
                  type="text"
                  value={attractiveData.heroBannerSection.secondaryButtonText.en}
                  onChange={(e) => handleAttHeroBannerBilingualChange('secondaryButtonText', 'en', e.target.value)}
                  placeholder="Contact Us"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.heroBannerSection.secondaryButtonText.ar}
                  onChange={(e) => handleAttHeroBannerBilingualChange('secondaryButtonText', 'ar', e.target.value)}
                  placeholder="اتصل بنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الوجهة (URL)' : 'Target URL'}</label>
              <input
                type="text"
                value={attractiveData.heroBannerSection.secondaryButtonUrl}
                onChange={(e) => handleAttHeroBannerChange('secondaryButtonUrl', e.target.value)}
                placeholder="/contact"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <ImageUploadField
            label={activeLangTab === 'ar' ? 'صورة خلفية الواجهة (عمارة حديثة)' : 'Hero Background Image (Architecture)'}
            value={attractiveData.heroBannerSection.backgroundImageUrl}
            onChange={(url) => handleAttHeroBannerChange('backgroundImageUrl', url)}
            folder="attractive"
          />
        </div>
      </CardContent>
    </Card>

    {/* SECTION 2: BRAND LOGOS */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
              2
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <span>Section 2: Brand Logos</span>
                <span className="text-xs text-white/50 font-normal">(القسم الثاني: شعارات العلامات التجارية)</span>
              </CardTitle>
              <p className="text-xs text-white/50">
                Manage partner logos rendered in the brand strip
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddAttBrand}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Brand
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-white/70">🇬🇧 Section Title / Tagline</label>
              <input
                type="text"
                value={attractiveData.brandsSection.title.en}
                onChange={(e) => handleAttBrandsTitleChange('en', e.target.value)}
                placeholder="TRUSTED BRANDS & INDUSTRY LEADERS"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
            </div>
          ) : (
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان القسم بالعربية</label>
              <input
                type="text"
                dir="rtl"
                value={attractiveData.brandsSection.title.ar}
                onChange={(e) => handleAttBrandsTitleChange('ar', e.target.value)}
                placeholder="العلامات التجارية الموثوقة ورواد الصناعة"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
          {attractiveData.brandsSection.brands.map((b, idx) => (
            <div
              key={b.id || idx}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/70">
                  Brand #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteAttBrand(idx)}
                  className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] text-white/60 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={b.name}
                  onChange={(e) => handleAttBrandItemChange(idx, 'name', e.target.value)}
                  placeholder="Brand Name"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <ImageUploadField
                  label={activeLangTab === 'ar' ? 'شعار العلامة التجارية' : 'Brand Logo'}
                  value={b.logoUrl}
                  onChange={(url) => handleAttBrandItemChange(idx, 'logoUrl', url)}
                  folder="attractive"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* SECTION 3: ABOUT */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
            3
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <span>Section 3: About Attractive</span>
              <span className="text-xs text-white/50 font-normal">(القسم الثالث: عن الشركة)</span>
            </CardTitle>
            <p className="text-xs text-white/50">
              Company profile tagline, headline, narrative, and headquarters visual
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400">🇬🇧 Top Tagline</label>
                <input
                  type="text"
                  value={attractiveData.aboutSection.tagline.en}
                  onChange={(e) => handleAttAboutBilingualChange('tagline', 'en', e.target.value)}
                  placeholder="ABOUT ATTRACTIVE"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white uppercase tracking-wider font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 About Title / Headline</label>
                <input
                  type="text"
                  value={attractiveData.aboutSection.title.en}
                  onChange={(e) => handleAttAboutBilingualChange('title', 'en', e.target.value)}
                  placeholder="More Than a Company..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 About Description</label>
                <textarea
                  rows={4}
                  value={attractiveData.aboutSection.description.en}
                  onChange={(e) => handleAttAboutBilingualChange('description', 'en', e.target.value)}
                  placeholder="Descriptive narrative..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400 block text-right">🇸🇦 الشعار الترويجي العلوي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.aboutSection.tagline.ar}
                  onChange={(e) => handleAttAboutBilingualChange('tagline', 'ar', e.target.value)}
                  placeholder="عن أتراكتيف"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان القصة / الرؤية بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.aboutSection.title.ar}
                  onChange={(e) => handleAttAboutBilingualChange('title', 'ar', e.target.value)}
                  placeholder="أكثر من مجرد شركة..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف السردي بالعربية</label>
                <textarea
                  rows={4}
                  dir="rtl"
                  value={attractiveData.aboutSection.description.ar}
                  onChange={(e) => handleAttAboutBilingualChange('description', 'ar', e.target.value)}
                  placeholder="وصف سردي..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-white/5">
          <ImageUploadField
            label={activeLangTab === 'ar' ? 'صورة مبنى المقر الرئيسي' : 'Corporate Headquarters Building Image'}
            value={attractiveData.aboutSection.imageUrl}
            onChange={(url) => handleAttAboutChange('imageUrl', url)}
            folder="attractive"
          />
        </div>
      </CardContent>
    </Card>

    {/* SECTION 4: OUR PRODUCTS (IN PLACE OF OUR BUSINESS AREAS) */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
              4
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <span>Section 4: Our Products</span>
                <span className="text-xs text-white/50 font-normal">(القسم الرابع: منتجاتنا)</span>
              </CardTitle>
              <p className="text-xs text-white/50">
                Featured equipment, diagnostic systems, certification badges, and request quote CTA buttons
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddAttProduct}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/30"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Section Title & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400">🇬🇧 Section Title</label>
                <input
                  type="text"
                  value={attractiveData.productsSection.title.en}
                  onChange={(e) => handleAttProductsHeaderBilingualChange('title', 'en', e.target.value)}
                  placeholder="Our Products"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 View All Button Text</label>
                <input
                  type="text"
                  value={attractiveData.productsSection.viewAllButtonText.en}
                  onChange={(e) => handleAttProductsHeaderBilingualChange('viewAllButtonText', 'en', e.target.value)}
                  placeholder="View All Products"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Section Subtitle / Description</label>
                <textarea
                  rows={2}
                  value={attractiveData.productsSection.description.en}
                  onChange={(e) => handleAttProductsHeaderBilingualChange('description', 'en', e.target.value)}
                  placeholder="Explore our range of high-quality medical equipment..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400 block text-right">🇸🇦 عنوان القسم بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.productsSection.title.ar}
                  onChange={(e) => handleAttProductsHeaderBilingualChange('title', 'ar', e.target.value)}
                  placeholder="منتجاتنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص زر عرض الكل بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.productsSection.viewAllButtonText.ar}
                  onChange={(e) => handleAttProductsHeaderBilingualChange('viewAllButtonText', 'ar', e.target.value)}
                  placeholder="عرض جميع المنتجات"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف الفرعي للقسم بالعربية</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={attractiveData.productsSection.description.ar}
                  onChange={(e) => handleAttProductsHeaderBilingualChange('description', 'ar', e.target.value)}
                  placeholder="استكشف مجموعتنا من المعدات الطبية والحلول..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* View All Target URL (Common) */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <label className="block text-[11px] text-white/60 mb-1">{activeLangTab === 'ar' ? 'رابط زر عرض الكل (URL)' : 'View All Target URL'}</label>
          <input
            type="text"
            value={attractiveData.productsSection.viewAllButtonUrl}
            onChange={(e) => handleAttProductsChange('viewAllButtonUrl', e.target.value)}
            placeholder="/shop"
            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
          />
        </div>

        {/* Products List Cards */}
        <div className="space-y-6 pt-4 border-t border-white/5">
          {attractiveData.productsSection.products.map((prod, prodIdx) => (
            <div
              key={prod.id || prodIdx}
              className="p-5 rounded-2xl bg-[#14112E] border border-blue-500/20 hover:border-blue-500/40 space-y-4 transition-all shadow-xl"
            >
              {/* Product Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                    #{prodIdx + 1}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {activeLangTab === 'ar' ? (prod.name.ar || 'منتج جديد') : (prod.name.en || 'Untitled Product')}
                  </span>
                  <span className="text-xs text-white/50">
                    ({activeLangTab === 'ar' ? (prod.brand.ar || 'العلامة') : (prod.brand.en || 'Brand')})
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteAttProduct(prodIdx)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Product
                </button>
              </div>

              {/* Product Image & Main Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <ImageUploadField
                    label={activeLangTab === 'ar' ? 'صورة المنتج' : 'Product Image'}
                    value={prod.image}
                    onChange={(url) => handleAttProductItemChange(prodIdx, 'image', url)}
                    folder="attractive"
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  {activeLangTab === 'en' ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70">🇬🇧 Brand Tag</label>
                          <input
                            type="text"
                            value={prod.brand.en}
                            onChange={(e) => handleAttProductItemBilingualChange(prodIdx, 'brand', 'en', e.target.value)}
                            placeholder="e.g. MedTech"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70">🇬🇧 Product Name</label>
                          <input
                            type="text"
                            value={prod.name.en}
                            onChange={(e) => handleAttProductItemBilingualChange(prodIdx, 'name', 'en', e.target.value)}
                            placeholder="Patient Monitor"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                        <textarea
                          rows={2}
                          value={prod.description.en}
                          onChange={(e) => handleAttProductItemBilingualChange(prodIdx, 'description', 'en', e.target.value)}
                          placeholder="A medical monitoring device..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70">🇬🇧 Button Text</label>
                          <input
                            type="text"
                            value={prod.buttonText.en}
                            onChange={(e) => handleAttProductItemBilingualChange(prodIdx, 'buttonText', 'en', e.target.value)}
                            placeholder="Request a Quote ↗"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-medium placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/50">Target URL</label>
                          <input
                            type="text"
                            value={prod.buttonUrl}
                            onChange={(e) => handleAttProductItemChange(prodIdx, 'buttonUrl', e.target.value)}
                            placeholder="/contact"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العلامة التجارية بالعربية</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={prod.brand.ar}
                            onChange={(e) => handleAttProductItemBilingualChange(prodIdx, 'brand', 'ar', e.target.value)}
                            placeholder="مثال: ميدتيك"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 اسم المنتج بالعربية</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={prod.name.ar}
                            onChange={(e) => handleAttProductItemBilingualChange(prodIdx, 'name', 'ar', e.target.value)}
                            placeholder="شاشة مراقبة المريض"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                        <textarea
                          rows={2}
                          dir="rtl"
                          value={prod.description.ar}
                          onChange={(e) => handleAttProductItemBilingualChange(prodIdx, 'description', 'ar', e.target.value)}
                          placeholder="جهاز مراقبة طبي مصمم لتتبع العلامات الحيوية..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر بالعربية</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={prod.buttonText.ar}
                            onChange={(e) => handleAttProductItemBilingualChange(prodIdx, 'buttonText', 'ar', e.target.value)}
                            placeholder="طلب عرض أسعار ↗"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-medium placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/50 text-right block">رابط الزر (URL)</label>
                          <input
                            type="text"
                            value={prod.buttonUrl}
                            onChange={(e) => handleAttProductItemChange(prodIdx, 'buttonUrl', e.target.value)}
                            placeholder="/contact"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Badges / Certifications */}
              <div className="pt-3 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-blue-400">
                    {activeLangTab === 'ar' ? 'الشهادات والشارات (معتمد من CE، مسجل لدى FDA، معتمد من ISO)' : 'Certifications & Badges (CE Certified, FDA Registered, ISO Certified)'}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddAttProductBadge(prodIdx)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add Badge
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {prod.badges.map((b, bIdx) => (
                    <div
                      key={b.id || bIdx}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2"
                    >
                      <div className="flex-1">
                        {activeLangTab === 'en' ? (
                          <input
                            type="text"
                            value={b.en}
                            onChange={(e) => handleAttProductBadgeBilingualChange(prodIdx, bIdx, 'en', e.target.value)}
                            placeholder="e.g. CE Certified"
                            className="w-full px-2 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-white"
                          />
                        ) : (
                          <input
                            type="text"
                            dir="rtl"
                            value={b.ar}
                            onChange={(e) => handleAttProductBadgeBilingualChange(prodIdx, bIdx, 'ar', e.target.value)}
                            placeholder="معتمد من CE"
                            className="w-full px-2 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-white text-right"
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteAttProductBadge(prodIdx, bIdx)}
                        className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* SECTION 5: LETS WORK TOGETHER BANNER */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
            5
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <span>Section 5: Let's Work Together Banner</span>
              <span className="text-xs text-white/50 font-normal">(القسم الخامس: بانر لنعمل معاً)</span>
            </CardTitle>
            <p className="text-xs text-white/50">
              Bottom partnership call-to-action banner with quote request & contact buttons
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400">🇬🇧 Top Tagline</label>
                <input
                  type="text"
                  value={attractiveData.workTogetherSection.tagline.en}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('tagline', 'en', e.target.value)}
                  placeholder="— LET'S WORK TOGETHER —"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Headline</label>
                <input
                  type="text"
                  value={attractiveData.workTogetherSection.title.en}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('title', 'en', e.target.value)}
                  placeholder="Let's Build Something That Moves Business Forward."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Banner Description</label>
                <textarea
                  rows={3}
                  value={attractiveData.workTogetherSection.description.en}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('description', 'en', e.target.value)}
                  placeholder="Partner with us to design and deliver..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400">🇬🇧 Primary Button Label</label>
                <input
                  type="text"
                  value={attractiveData.workTogetherSection.primaryButtonText.en}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('primaryButtonText', 'en', e.target.value)}
                  placeholder="Get a Quote ↗"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Secondary Button Label</label>
                <input
                  type="text"
                  value={attractiveData.workTogetherSection.secondaryButtonText.en}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('secondaryButtonText', 'en', e.target.value)}
                  placeholder="Contact Us"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400 block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.workTogetherSection.tagline.ar}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('tagline', 'ar', e.target.value)}
                  placeholder="— لنعمل معاً —"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.workTogetherSection.title.ar}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('title', 'ar', e.target.value)}
                  placeholder="دعنا نبني شيئاً يدفع الأعمال إلى الأمام."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف البانر بالعربية</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={attractiveData.workTogetherSection.description.ar}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('description', 'ar', e.target.value)}
                  placeholder="تشارك معنا لتصميم وتنفيذ..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400 block text-right">🇸🇦 نص الزر الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.workTogetherSection.primaryButtonText.ar}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('primaryButtonText', 'ar', e.target.value)}
                  placeholder="احصل على عرض أسعار ↗"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الثانوي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={attractiveData.workTogetherSection.secondaryButtonText.ar}
                  onChange={(e) => handleAttWorkTogetherBilingualChange('secondaryButtonText', 'ar', e.target.value)}
                  placeholder="اتصل بنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* Action Button URLs (Common) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الزر الرئيسي (URL)' : 'Primary Button URL'}</label>
            <input
              type="text"
              value={attractiveData.workTogetherSection.primaryButtonUrl}
              onChange={(e) => handleAttWorkTogetherChange('primaryButtonUrl', e.target.value)}
              placeholder="/contact"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الزر الثانوي (URL)' : 'Secondary Button URL'}</label>
            <input
              type="text"
              value={attractiveData.workTogetherSection.secondaryButtonUrl}
              onChange={(e) => handleAttWorkTogetherChange('secondaryButtonUrl', e.target.value)}
              placeholder="/contact"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)}


{/* IF EDITING MEDICS INNOVATOR PAGE (SECTIONS 1 TO 5) */}
{editingTabId === 'medics-innovator' && (
  <div className="space-y-8">
    {/* SECTION 1: HERO BANNER */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
            1
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <span>Section 1: Hero Banner</span>
              <span className="text-xs text-white/50 font-normal">(القسم الأول: بانر الواجهة)</span>
            </CardTitle>
            <p className="text-xs text-white/50">
              Logo, headline with colored highlight, description, action buttons, and background image
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Logo URL & Logo Text */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <ImageUploadField
              label={activeLangTab === 'ar' ? 'شعار البانر' : 'Banner Logo'}
              value={medicsInnovatorData.heroBannerSection.logoUrl}
              onChange={(url) => handleMIHeroBannerChange('logoUrl', url)}
              folder="medics-innovator"
            />
          </div>

          <div className="space-y-3">
            {activeLangTab === 'en' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Logo Text</label>
                <input
                  type="text"
                  value={medicsInnovatorData.heroBannerSection.logoText.en}
                  onChange={(e) => handleMIHeroBannerBilingualChange('logoText', 'en', e.target.value)}
                  placeholder="MEDICS INNOVATOR"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الشعار بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.heroBannerSection.logoText.ar}
                  onChange={(e) => handleMIHeroBannerBilingualChange('logoText', 'ar', e.target.value)}
                  placeholder="ميديكس إنوفيتور"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            )}
          </div>
        </div>

        {/* Headline & Colored Highlight & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Main Headline</label>
                <input
                  type="text"
                  value={medicsInnovatorData.heroBannerSection.title.en}
                  onChange={(e) => handleMIHeroBannerBilingualChange('title', 'en', e.target.value)}
                  placeholder="Building Tomorrow"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400">🇬🇧 Highlighted Phrase in Accent Color</label>
                <input
                  type="text"
                  value={medicsInnovatorData.heroBannerSection.titleHighlight.en}
                  onChange={(e) => handleMIHeroBannerBilingualChange('titleHighlight', 'en', e.target.value)}
                  placeholder="Through Innovation"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-blue-500/30 text-blue-300 font-semibold placeholder-white/30 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Hero Description</label>
                <textarea
                  rows={3}
                  value={medicsInnovatorData.heroBannerSection.description.en}
                  onChange={(e) => handleMIHeroBannerBilingualChange('description', 'en', e.target.value)}
                  placeholder="Delivering innovative solutions..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.heroBannerSection.title.ar}
                  onChange={(e) => handleMIHeroBannerBilingualChange('title', 'ar', e.target.value)}
                  placeholder="بناء الغد"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400 block text-right">🇸🇦 العبارة المميزة بلون بارز</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.heroBannerSection.titleHighlight.ar}
                  onChange={(e) => handleMIHeroBannerBilingualChange('titleHighlight', 'ar', e.target.value)}
                  placeholder="من خلال الابتكار"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-blue-500/30 text-blue-300 font-semibold placeholder-white/30 focus:outline-none focus:border-blue-500 text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف الرئيسي للواجهة</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={medicsInnovatorData.heroBannerSection.description.ar}
                  onChange={(e) => handleMIHeroBannerBilingualChange('description', 'ar', e.target.value)}
                  placeholder="تقديم حلول مبتكرة..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              {activeLangTab === 'ar' ? 'الزر الرئيسي (أزرق)' : 'Primary Button (BLUE)'}
            </span>
            {activeLangTab === 'en' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Button Text</label>
                <input
                  type="text"
                  value={medicsInnovatorData.heroBannerSection.primaryButtonText.en}
                  onChange={(e) => handleMIHeroBannerBilingualChange('primaryButtonText', 'en', e.target.value)}
                  placeholder="Explore Our Services →"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.heroBannerSection.primaryButtonText.ar}
                  onChange={(e) => handleMIHeroBannerBilingualChange('primaryButtonText', 'ar', e.target.value)}
                  placeholder="استكشف خدماتنا ←"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الوجهة (URL)' : 'Target URL'}</label>
              <input
                type="text"
                value={medicsInnovatorData.heroBannerSection.primaryButtonUrl}
                onChange={(e) => handleMIHeroBannerChange('primaryButtonUrl', e.target.value)}
                placeholder="/services"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-xs font-bold text-white/70 uppercase tracking-wider block">
              {activeLangTab === 'ar' ? 'الزر الثانوي (تحديد أبيض)' : 'Secondary Button (White Outline)'}
            </span>
            {activeLangTab === 'en' ? (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Button Text</label>
                <input
                  type="text"
                  value={medicsInnovatorData.heroBannerSection.secondaryButtonText.en}
                  onChange={(e) => handleMIHeroBannerBilingualChange('secondaryButtonText', 'en', e.target.value)}
                  placeholder="Contact Us"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            ) : (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.heroBannerSection.secondaryButtonText.ar}
                  onChange={(e) => handleMIHeroBannerBilingualChange('secondaryButtonText', 'ar', e.target.value)}
                  placeholder="اتصل بنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الوجهة (URL)' : 'Target URL'}</label>
              <input
                type="text"
                value={medicsInnovatorData.heroBannerSection.secondaryButtonUrl}
                onChange={(e) => handleMIHeroBannerChange('secondaryButtonUrl', e.target.value)}
                placeholder="/contact"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <ImageUploadField
            label={activeLangTab === 'ar' ? 'صورة خلفية الواجهة (عمارة حديثة)' : 'Hero Background Image (Architecture)'}
            value={medicsInnovatorData.heroBannerSection.backgroundImageUrl}
            onChange={(url) => handleMIHeroBannerChange('backgroundImageUrl', url)}
            folder="medics-innovator"
          />
        </div>
      </CardContent>
    </Card>

    {/* SECTION 2: BRAND LOGOS */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
              2
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <span>Section 2: Brand Logos</span>
                <span className="text-xs text-white/50 font-normal">(القسم الثاني: شعارات العلامات التجارية)</span>
              </CardTitle>
              <p className="text-xs text-white/50">
                Manage partner logos rendered in the brand strip
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddMIBrand}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Brand
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-white/70">🇬🇧 Section Title / Tagline</label>
              <input
                type="text"
                value={medicsInnovatorData.brandsSection.title.en}
                onChange={(e) => handleMIBrandsTitleChange('en', e.target.value)}
                placeholder="TRUSTED BRANDS & INDUSTRY LEADERS"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
              />
            </div>
          ) : (
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان القسم بالعربية</label>
              <input
                type="text"
                dir="rtl"
                value={medicsInnovatorData.brandsSection.title.ar}
                onChange={(e) => handleMIBrandsTitleChange('ar', e.target.value)}
                placeholder="العلامات التجارية الموثوقة ورواد الصناعة"
                className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/5">
          {medicsInnovatorData.brandsSection.brands.map((b, idx) => (
            <div
              key={b.id || idx}
              className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white/70">
                  Brand #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeleteMIBrand(idx)}
                  className="p-1 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div>
                <label className="block text-[11px] text-white/60 mb-1">Brand Name</label>
                <input
                  type="text"
                  value={b.name}
                  onChange={(e) => handleMIBrandItemChange(idx, 'name', e.target.value)}
                  placeholder="Brand Name"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div>
                <ImageUploadField
                  label={activeLangTab === 'ar' ? 'شعار العلامة التجارية' : 'Brand Logo'}
                  value={b.logoUrl}
                  onChange={(url) => handleMIBrandItemChange(idx, 'logoUrl', url)}
                  folder="medics-innovator"
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* SECTION 3: ABOUT */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-bold text-xs">
            3
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <span>Section 3: About Medics Innovator</span>
              <span className="text-xs text-white/50 font-normal">(القسم الثالث: عن الشركة)</span>
            </CardTitle>
            <p className="text-xs text-white/50">
              Company profile tagline, headline, narrative, and headquarters visual
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400">🇬🇧 Top Tagline</label>
                <input
                  type="text"
                  value={medicsInnovatorData.aboutSection.tagline.en}
                  onChange={(e) => handleMIAboutBilingualChange('tagline', 'en', e.target.value)}
                  placeholder="ABOUT MEDICS INNOVATOR"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white uppercase tracking-wider font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 About Title / Headline</label>
                <input
                  type="text"
                  value={medicsInnovatorData.aboutSection.title.en}
                  onChange={(e) => handleMIAboutBilingualChange('title', 'en', e.target.value)}
                  placeholder="More Than a Company..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 About Description</label>
                <textarea
                  rows={4}
                  value={medicsInnovatorData.aboutSection.description.en}
                  onChange={(e) => handleMIAboutBilingualChange('description', 'en', e.target.value)}
                  placeholder="Descriptive narrative..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400 block text-right">🇸🇦 الشعار الترويجي العلوي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.aboutSection.tagline.ar}
                  onChange={(e) => handleMIAboutBilingualChange('tagline', 'ar', e.target.value)}
                  placeholder="عن ميديكس إنوفيتور"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 عنوان القصة / الرؤية بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.aboutSection.title.ar}
                  onChange={(e) => handleMIAboutBilingualChange('title', 'ar', e.target.value)}
                  placeholder="أكثر من مجرد شركة..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف السردي بالعربية</label>
                <textarea
                  rows={4}
                  dir="rtl"
                  value={medicsInnovatorData.aboutSection.description.ar}
                  onChange={(e) => handleMIAboutBilingualChange('description', 'ar', e.target.value)}
                  placeholder="وصف سردي..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            </>
          )}
        </div>

        <div className="pt-4 border-t border-white/5">
          <ImageUploadField
            label={activeLangTab === 'ar' ? 'صورة مبنى المقر الرئيسي' : 'Corporate Headquarters Building Image'}
            value={medicsInnovatorData.aboutSection.imageUrl}
            onChange={(url) => handleMIAboutChange('imageUrl', url)}
            folder="medics-innovator"
          />
        </div>
      </CardContent>
    </Card>

    {/* SECTION 4: OUR PRODUCTS (IN PLACE OF OUR BUSINESS AREAS) */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold text-xs">
              4
            </div>
            <div>
              <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                <span>Section 4: Our Products</span>
                <span className="text-xs text-white/50 font-normal">(القسم الرابع: منتجاتنا)</span>
              </CardTitle>
              <p className="text-xs text-white/50">
                Featured equipment, diagnostic systems, certification badges, and request quote CTA buttons
              </p>
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAddMIProduct}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/30"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        {/* Section Title & Description */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400">🇬🇧 Section Title</label>
                <input
                  type="text"
                  value={medicsInnovatorData.productsSection.title.en}
                  onChange={(e) => handleMIProductsHeaderBilingualChange('title', 'en', e.target.value)}
                  placeholder="Our Products"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 View All Button Text</label>
                <input
                  type="text"
                  value={medicsInnovatorData.productsSection.viewAllButtonText.en}
                  onChange={(e) => handleMIProductsHeaderBilingualChange('viewAllButtonText', 'en', e.target.value)}
                  placeholder="View All Products"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Section Subtitle / Description</label>
                <textarea
                  rows={2}
                  value={medicsInnovatorData.productsSection.description.en}
                  onChange={(e) => handleMIProductsHeaderBilingualChange('description', 'en', e.target.value)}
                  placeholder="Explore our range of high-quality medical equipment..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400 block text-right">🇸🇦 عنوان القسم بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.productsSection.title.ar}
                  onChange={(e) => handleMIProductsHeaderBilingualChange('title', 'ar', e.target.value)}
                  placeholder="منتجاتنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص زر عرض الكل بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.productsSection.viewAllButtonText.ar}
                  onChange={(e) => handleMIProductsHeaderBilingualChange('viewAllButtonText', 'ar', e.target.value)}
                  placeholder="عرض جميع المنتجات"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف الفرعي للقسم بالعربية</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  value={medicsInnovatorData.productsSection.description.ar}
                  onChange={(e) => handleMIProductsHeaderBilingualChange('description', 'ar', e.target.value)}
                  placeholder="استكشف مجموعتنا من المعدات الطبية والحلول..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* View All Target URL (Common) */}
        <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
          <label className="block text-[11px] text-white/60 mb-1">{activeLangTab === 'ar' ? 'رابط زر عرض الكل (URL)' : 'View All Target URL'}</label>
          <input
            type="text"
            value={medicsInnovatorData.productsSection.viewAllButtonUrl}
            onChange={(e) => handleMIProductsChange('viewAllButtonUrl', e.target.value)}
            placeholder="/shop"
            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
          />
        </div>

        {/* Products List Cards */}
        <div className="space-y-6 pt-4 border-t border-white/5">
          {medicsInnovatorData.productsSection.products.map((prod, prodIdx) => (
            <div
              key={prod.id || prodIdx}
              className="p-5 rounded-2xl bg-[#14112E] border border-blue-500/20 hover:border-blue-500/40 space-y-4 transition-all shadow-xl"
            >
              {/* Product Card Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-blue-600/20 text-blue-400 font-bold text-xs flex items-center justify-center">
                    #{prodIdx + 1}
                  </span>
                  <span className="text-sm font-bold text-white">
                    {activeLangTab === 'ar' ? (prod.name.ar || 'منتج جديد') : (prod.name.en || 'Untitled Product')}
                  </span>
                  <span className="text-xs text-white/50">
                    ({activeLangTab === 'ar' ? (prod.brand.ar || 'العلامة') : (prod.brand.en || 'Brand')})
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteMIProduct(prodIdx)}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Delete Product
                </button>
              </div>

              {/* Product Image & Main Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <ImageUploadField
                    label={activeLangTab === 'ar' ? 'صورة المنتج' : 'Product Image'}
                    value={prod.image}
                    onChange={(url) => handleMIProductItemChange(prodIdx, 'image', url)}
                    folder="medics-innovator"
                  />
                </div>

                <div className="md:col-span-2 space-y-3">
                  {activeLangTab === 'en' ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70">🇬🇧 Brand Tag</label>
                          <input
                            type="text"
                            value={prod.brand.en}
                            onChange={(e) => handleMIProductItemBilingualChange(prodIdx, 'brand', 'en', e.target.value)}
                            placeholder="e.g. MedTech"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70">🇬🇧 Product Name</label>
                          <input
                            type="text"
                            value={prod.name.en}
                            onChange={(e) => handleMIProductItemBilingualChange(prodIdx, 'name', 'en', e.target.value)}
                            placeholder="Patient Monitor"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-white/70">🇬🇧 Description</label>
                        <textarea
                          rows={2}
                          value={prod.description.en}
                          onChange={(e) => handleMIProductItemBilingualChange(prodIdx, 'description', 'en', e.target.value)}
                          placeholder="A medical monitoring device..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/70">🇬🇧 Button Text</label>
                          <input
                            type="text"
                            value={prod.buttonText.en}
                            onChange={(e) => handleMIProductItemBilingualChange(prodIdx, 'buttonText', 'en', e.target.value)}
                            placeholder="Request a Quote ↗"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-medium placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/50">Target URL</label>
                          <input
                            type="text"
                            value={prod.buttonUrl}
                            onChange={(e) => handleMIProductItemChange(prodIdx, 'buttonUrl', e.target.value)}
                            placeholder="/contact"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العلامة التجارية بالعربية</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={prod.brand.ar}
                            onChange={(e) => handleMIProductItemBilingualChange(prodIdx, 'brand', 'ar', e.target.value)}
                            placeholder="مثال: ميدتيك"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 اسم المنتج بالعربية</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={prod.name.ar}
                            onChange={(e) => handleMIProductItemBilingualChange(prodIdx, 'name', 'ar', e.target.value)}
                            placeholder="شاشة مراقبة المريض"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 الوصف بالعربية</label>
                        <textarea
                          rows={2}
                          dir="rtl"
                          value={prod.description.ar}
                          onChange={(e) => handleMIProductItemBilingualChange(prodIdx, 'description', 'ar', e.target.value)}
                          placeholder="جهاز مراقبة طبي مصمم لتتبع العلامات الحيوية..."
                          className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر بالعربية</label>
                          <input
                            type="text"
                            dir="rtl"
                            value={prod.buttonText.ar}
                            onChange={(e) => handleMIProductItemBilingualChange(prodIdx, 'buttonText', 'ar', e.target.value)}
                            placeholder="طلب عرض أسعار ↗"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-medium placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-white/50 text-right block">رابط الزر (URL)</label>
                          <input
                            type="text"
                            value={prod.buttonUrl}
                            onChange={(e) => handleMIProductItemChange(prodIdx, 'buttonUrl', e.target.value)}
                            placeholder="/contact"
                            className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Badges / Certifications */}
              <div className="pt-3 border-t border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-blue-400">
                    {activeLangTab === 'ar' ? 'الشهادات والشارات (معتمد من CE، مسجل لدى FDA، معتمد من ISO)' : 'Certifications & Badges (CE Certified, FDA Registered, ISO Certified)'}
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddMIProductBadge(prodIdx)}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    Add Badge
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                  {prod.badges.map((b, bIdx) => (
                    <div
                      key={b.id || bIdx}
                      className="p-2.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-center gap-2"
                    >
                      <div className="flex-1">
                        {activeLangTab === 'en' ? (
                          <input
                            type="text"
                            value={b.en}
                            onChange={(e) => handleMIProductBadgeBilingualChange(prodIdx, bIdx, 'en', e.target.value)}
                            placeholder="e.g. CE Certified"
                            className="w-full px-2 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-white"
                          />
                        ) : (
                          <input
                            type="text"
                            dir="rtl"
                            value={b.ar}
                            onChange={(e) => handleMIProductBadgeBilingualChange(prodIdx, bIdx, 'ar', e.target.value)}
                            placeholder="معتمد من CE"
                            className="w-full px-2 py-1 text-[11px] rounded bg-white/5 border border-white/10 text-white text-right"
                          />
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteMIProductBadge(prodIdx, bIdx)}
                        className="p-1 rounded text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>

    {/* SECTION 5: LETS WORK TOGETHER BANNER */}
    <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
      <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 font-bold text-xs">
            5
          </div>
          <div>
            <CardTitle className="text-base font-bold text-white flex items-center gap-2">
              <span>Section 5: Let's Work Together Banner</span>
              <span className="text-xs text-white/50 font-normal">(القسم الخامس: بانر لنعمل معاً)</span>
            </CardTitle>
            <p className="text-xs text-white/50">
              Bottom partnership call-to-action banner with quote request & contact buttons
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeLangTab === 'en' ? (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400">🇬🇧 Top Tagline</label>
                <input
                  type="text"
                  value={medicsInnovatorData.workTogetherSection.tagline.en}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('tagline', 'en', e.target.value)}
                  placeholder="— LET'S WORK TOGETHER —"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Headline</label>
                <input
                  type="text"
                  value={medicsInnovatorData.workTogetherSection.title.en}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('title', 'en', e.target.value)}
                  placeholder="Let's Build Something That Moves Business Forward."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Banner Description</label>
                <textarea
                  rows={3}
                  value={medicsInnovatorData.workTogetherSection.description.en}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('description', 'en', e.target.value)}
                  placeholder="Partner with us to design and deliver..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400">🇬🇧 Primary Button Label</label>
                <input
                  type="text"
                  value={medicsInnovatorData.workTogetherSection.primaryButtonText.en}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('primaryButtonText', 'en', e.target.value)}
                  placeholder="Get a Quote ↗"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-white/70">🇬🇧 Secondary Button Label</label>
                <input
                  type="text"
                  value={medicsInnovatorData.workTogetherSection.secondaryButtonText.en}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('secondaryButtonText', 'en', e.target.value)}
                  placeholder="Contact Us"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
                />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-red-400 block text-right">🇸🇦 الشعار الفرعي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.workTogetherSection.tagline.ar}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('tagline', 'ar', e.target.value)}
                  placeholder="— لنعمل معاً —"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-semibold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 العنوان الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.workTogetherSection.title.ar}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('title', 'ar', e.target.value)}
                  placeholder="دعنا نبني شيئاً يدفع الأعمال إلى الأمام."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white font-bold placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 وصف البانر بالعربية</label>
                <textarea
                  rows={3}
                  dir="rtl"
                  value={medicsInnovatorData.workTogetherSection.description.ar}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('description', 'ar', e.target.value)}
                  placeholder="تشارك معنا لتصميم وتنفيذ..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white leading-relaxed resize-none placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-blue-400 block text-right">🇸🇦 نص الزر الرئيسي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.workTogetherSection.primaryButtonText.ar}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('primaryButtonText', 'ar', e.target.value)}
                  placeholder="احصل على عرض أسعار ↗"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#F68E2D] block text-right">🇸🇦 نص الزر الثانوي بالعربية</label>
                <input
                  type="text"
                  dir="rtl"
                  value={medicsInnovatorData.workTogetherSection.secondaryButtonText.ar}
                  onChange={(e) => handleMIWorkTogetherBilingualChange('secondaryButtonText', 'ar', e.target.value)}
                  placeholder="اتصل بنا"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D] text-right"
                />
              </div>
            </>
          )}
        </div>

        {/* Action Button URLs (Common) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الزر الرئيسي (URL)' : 'Primary Button URL'}</label>
            <input
              type="text"
              value={medicsInnovatorData.workTogetherSection.primaryButtonUrl}
              onChange={(e) => handleMIWorkTogetherChange('primaryButtonUrl', e.target.value)}
              placeholder="/contact"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-white/50">{activeLangTab === 'ar' ? 'رابط الزر الثانوي (URL)' : 'Secondary Button URL'}</label>
            <input
              type="text"
              value={medicsInnovatorData.workTogetherSection.secondaryButtonUrl}
              onChange={(e) => handleMIWorkTogetherChange('secondaryButtonUrl', e.target.value)}
              placeholder="/contact"
              className="w-full px-3 py-2 text-xs rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#F68E2D]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)}


            {/* IF EDITING ANY OTHER TAB */}
            {editingTabId !== 'home' && editingTabId !== 'about' && editingTabId !== 'company' && editingTabId !== 'services' && editingTabId !== 'shop' && editingTabId !== 'projects' && editingTabId !== 'partners' && editingTabId !== 'contact' && editingTabId !== 'investment' && editingTabId !== 'projects-innovator' && editingTabId !== 'attractive' && editingTabId !== 'medics-innovator' && (
              <div className="space-y-6">
                {activeEditingTab.groups.map((group) => (
                  <Card key={group.id} className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
                    <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4">
                      <div className="flex items-center gap-3">
                        {renderCardHeaderIcon(group.accentColor, group.iconName)}
                        <div>
                          <CardTitle className="text-base font-bold text-white">
                            {activeLangTab === 'ar' ? group.title.ar : group.title.en}
                          </CardTitle>
                          <p className="text-xs text-white/50">
                            {activeLangTab === 'ar' ? group.description.ar : group.description.en}
                          </p>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="p-6 space-y-6">
                      {group.items.map((item) => (
                        <div key={item.id} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-4">
                          <div className="flex items-center justify-between pb-2 border-b border-white/10">
                            <span className="text-xs font-bold text-white uppercase tracking-wider">
                              {item.title.en}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                              Active
                            </span>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-white/80 block mb-1">Title</label>
                            <div className="w-full">
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={item.title.en}
                                  onChange={(e) =>
                                    handleOtherItemChange(activeEditingTab.id, group.id, item.id, 'title', 'en', e.target.value)
                                  }
                                  className="w-full px-3 py-1.5 text-xs rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                                  placeholder="Title (English)"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={item.title.ar}
                                  onChange={(e) =>
                                    handleOtherItemChange(activeEditingTab.id, group.id, item.id, 'title', 'ar', e.target.value)
                                  }
                                  className="w-full px-3 py-1.5 text-xs rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] text-right"
                                  placeholder="العنوان (بالعربية)"
                                />
                              )}
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-semibold text-white/80 block mb-1">Subtitle / Summary</label>
                            <div className="w-full">
                              {activeLangTab === 'en' && (
                                <input
                                  type="text"
                                  value={item.subtitle?.en || ''}
                                  onChange={(e) =>
                                    handleOtherItemChange(activeEditingTab.id, group.id, item.id, 'subtitle', 'en', e.target.value)
                                  }
                                  className="w-full px-3 py-1.5 text-xs rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D]"
                                  placeholder="Subtitle (English)"
                                />
                              )}
                              {activeLangTab === 'ar' && (
                                <input
                                  type="text"
                                  dir="rtl"
                                  value={item.subtitle?.ar || ''}
                                  onChange={(e) =>
                                    handleOtherItemChange(activeEditingTab.id, group.id, item.id, 'subtitle', 'ar', e.target.value)
                                  }
                                  className="w-full px-3 py-1.5 text-xs rounded bg-white/5 border border-white/10 text-white focus:outline-none focus:border-[#F68E2D] text-right"
                                  placeholder="الوصف الفرعي (بالعربية)"
                                />
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* ----------------- LIVE PREVIEW MODAL (ALL 6 HOME SECTIONS) ----------------- */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#03091F] border border-white/15 rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-[#03091F]/90 backdrop-blur-md border-b border-white/10 p-4 sm:p-6 flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <h3 className="text-base font-bold text-white">Live Website Preview</h3>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPreviewLang('en')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                    previewLang === 'en' ? 'bg-[#F68E2D] text-white' : 'bg-white/5 text-white/70'
                  }`}
                >
                  🇬🇧 English
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewLang('ar')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                    previewLang === 'ar' ? 'bg-[#F68E2D] text-white' : 'bg-white/5 text-white/70'
                  }`}
                >
                  🇸🇦 العربية
                </button>
                <button
                  onClick={() => setShowPreviewModal(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 sm:p-10 space-y-16" dir={previewLang === 'ar' ? 'rtl' : 'ltr'}>
              {/* ----------------- ABOUT US PREVIEW (MATCHING REFERENCE IMAGE) ----------------- */}
              {editingTabId === 'about' && (
                <div className="space-y-16 max-w-5xl mx-auto">
                  {/* SECTION 1: ABOUT US HEADER */}
                  <div className="space-y-3">
                    <p className="text-xs text-white/40 tracking-wider">
                      {previewLang === 'ar' ? 'الرئيسية / من نحن' : 'Home / About Us'}
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-black text-white">
                      {aboutData.headerSection.title[previewLang] || 'About Us'}
                    </h1>
                    <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                      {aboutData.headerSection.description[previewLang]}
                    </p>
                  </div>

                  {/* SECTION 2: OUR HERITAGE */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pt-8 border-t border-white/10">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                        <span className="w-6 h-[2px] bg-red-500" />
                        {aboutData.heritageSection.tagline[previewLang] || 'OUR HERITAGE'}
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                        {aboutData.heritageSection.title[previewLang]}
                      </h2>
                      <p className="text-sm text-white/70 leading-relaxed">
                        {aboutData.heritageSection.description[previewLang]}
                      </p>
                    </div>

                    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-72 sm:h-80 bg-black/40">
                      <img
                        src={aboutData.heritageSection.image}
                        alt="Heritage"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <div className="absolute bottom-4 left-4 bg-black/85 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/15 text-left shadow-2xl">
                        <span className="block text-lg font-black text-red-500">
                          {aboutData.heritageSection.badgeYear || '2017'}
                        </span>
                        <span className="block text-[10px] font-bold text-white/80 uppercase tracking-widest">
                          {aboutData.heritageSection.badgeText[previewLang] || 'Established'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 3: EVOLVING THROUGH OPPORTUNITY */}
                  <div className="space-y-8 pt-10 border-t border-white/10 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                        <span className="w-5 h-[2px] bg-red-500" />
                        {aboutData.journeySection.tagline[previewLang] || 'OUR JOURNEY'}
                        <span className="w-5 h-[2px] bg-red-500" />
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {aboutData.journeySection.title[previewLang]}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                        {aboutData.journeySection.description[previewLang]}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                      {aboutData.journeySection.items.map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-8 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-red-500/30 transition-all space-y-3"
                        >
                          <span className="text-xs font-black text-red-500 tracking-widest">
                            {item.number}
                          </span>
                          <h3 className="text-lg font-bold text-white">
                            {item.title[previewLang]}
                          </h3>
                          <p className="text-xs text-white/60 leading-relaxed">
                            {item.description[previewLang]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 4: OUR IMPACT IN NUMBERS */}
                  <div className="space-y-8 pt-10 border-t border-white/10 text-left">
                    <div className="space-y-1">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                        <span className="w-6 h-[2px] bg-red-500" />
                        {aboutData.impactSection.tagline[previewLang] || 'OUR ACHIEVEMENTS'}
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                        {aboutData.impactSection.title[previewLang]}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {aboutData.impactSection.stats.map((stat, idx) => (
                        <div
                          key={stat.id || idx}
                          className="p-8 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-red-500/30 transition-all space-y-2 text-left"
                        >
                          <span className="text-3xl sm:text-4xl font-black text-red-500 block">
                            {stat.number}
                          </span>
                          <p className="text-xs font-medium text-white/70">
                            {stat.description[previewLang]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 5: OUR LEADERSHIP (IMAGE 6) */}
                  <div className="space-y-8 pt-10 border-t border-white/10 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                        <span className="w-5 h-[2px] bg-red-500" />
                        {aboutData.leadershipSection?.tagline?.[previewLang] || 'OUR LEADERSHIP'}
                        <span className="w-5 h-[2px] bg-red-500" />
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {aboutData.leadershipSection?.title?.[previewLang] || 'The People Behind Our Progress'}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                        {aboutData.leadershipSection?.description?.[previewLang]}
                      </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6">
                      {(aboutData.leadershipSection?.leaders || []).map((leader, idx) => (
                        <div
                          key={leader.id || idx}
                          className="p-8 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-red-500/30 transition-all space-y-4 w-72 text-center shadow-xl group"
                        >
                          <div className="relative mx-auto w-28 h-28 rounded-full overflow-hidden border-2 border-red-500/40 p-1 bg-black/40 shadow-inner group-hover:border-red-500 transition-colors">
                            <img
                              src={leader.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'}
                              alt={leader.name?.[previewLang] || 'Leader'}
                              className="w-full h-full object-cover rounded-full"
                              onError={(e) => {
                                e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <h3 className="text-base font-bold text-white">
                              {leader.name?.[previewLang]}
                            </h3>
                            <p className="text-xs font-bold text-red-500 tracking-wide">
                              {leader.role?.[previewLang]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 6: OUR MANAGEMENT TEAM (IMAGE 7) */}
                  <div className="space-y-8 pt-10 border-t border-white/10">
                    <div className="text-center space-y-2">
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {aboutData.managementSection?.title?.[previewLang] || 'Our Management Team'}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {(aboutData.managementSection?.divisions || []).map((div, idx) => (
                        <div
                          key={div.id || idx}
                          className="p-6 sm:p-7 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-red-500/30 transition-all flex flex-col justify-between space-y-6 shadow-xl"
                        >
                          <div className="space-y-4">
                            {/* Top badge and logo */}
                            <div className="flex items-center justify-between">
                              <span className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-500/20 text-red-400 font-black text-xs flex items-center justify-center">
                                {div.badge || `0${idx + 1}`}
                              </span>
                              {div.logoUrl && (
                                <div className="w-14 h-12 bg-white rounded-xl p-1.5 flex items-center justify-center shadow-md">
                                  <img
                                    src={div.logoUrl}
                                    alt={div.companyName?.[previewLang] || 'Division'}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Name & Description */}
                            <div className="space-y-2">
                              <h3 className="text-lg font-bold text-white">
                                {div.companyName?.[previewLang]}
                              </h3>
                              <p className="text-xs text-white/60 leading-relaxed">
                                {div.description?.[previewLang]}
                              </p>
                            </div>

                            {/* Link */}
                            <div>
                              <a
                                href={div.linkUrl || '#'}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-400 transition-colors"
                              >
                                {div.linkText?.[previewLang] || div.companyName?.[previewLang]} &rarr;
                              </a>
                            </div>
                          </div>

                          {/* Management Team Members List */}
                          <div className="pt-4 border-t border-white/10 space-y-3">
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest block">
                              {previewLang === 'ar' ? 'فريق إدارتنا' : 'OUR MANAGEMENT TEAM'}
                            </span>

                            <div className="space-y-3">
                              {(div.members || []).map((member, mIdx) => (
                                <div key={member.id || mIdx} className="flex items-center gap-3">
                                  <img
                                    src={member.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'}
                                    alt={member.name?.[previewLang] || 'Member'}
                                    className="w-9 h-9 rounded-full object-cover border border-white/20 shrink-0"
                                    onError={(e) => {
                                      e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80';
                                    }}
                                  />
                                  <div className="min-w-0">
                                    <h4 className="text-xs font-bold text-white truncate">
                                      {member.name?.[previewLang]}
                                    </h4>
                                    <p className="text-[11px] text-white/50 truncate">
                                      {member.role?.[previewLang]}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 7: OUR CORE VALUES (IMAGE 8) */}
                  <div className="space-y-8 pt-10 border-t border-white/10 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                        <span className="w-5 h-[2px] bg-red-500" />
                        {aboutData.coreValuesSection?.tagline?.[previewLang] || 'WHAT WE STAND FOR'}
                        <span className="w-5 h-[2px] bg-red-500" />
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {aboutData.coreValuesSection?.title?.[previewLang] || 'Our Core Values'}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                        {aboutData.coreValuesSection?.description?.[previewLang]}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                      {(aboutData.coreValuesSection?.values || []).map((val, idx) => (
                        <div
                          key={val.id || idx}
                          className="p-7 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-red-500/30 transition-all space-y-4 relative group"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 flex items-center justify-center">
                              {renderCustomIcon(val.icon, "w-5 h-5")}
                            </div>
                            <span className="text-xs font-black text-white/30 group-hover:text-red-500 transition-colors">
                              {val.number}
                            </span>
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-base font-bold text-white">
                              {val.title?.[previewLang]}
                            </h3>
                            <p className="text-xs text-white/60 leading-relaxed">
                              {val.description?.[previewLang]}
                            </p>
                          </div>

                          <div className="w-8 h-[2px] bg-red-500/60 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 8: OUR HISTORY & OWNERSHIP (IMAGE 9) */}
                  <div className="space-y-8 pt-10 border-t border-white/10 text-left">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                        <span className="w-5 h-[2px] bg-red-500" />
                        {aboutData.historySection?.tagline?.[previewLang] || 'OUR BACKGROUND'}
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {aboutData.historySection?.title?.[previewLang] || 'Our History & Ownership'}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/60 max-w-3xl leading-relaxed">
                        {aboutData.historySection?.description?.[previewLang]}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(aboutData.historySection?.items || []).map((item, idx) => (
                        <div
                          key={item.id || idx}
                          className="p-8 sm:p-10 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-red-500/30 transition-all space-y-5 relative"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-2xl bg-red-600/15 border border-red-500/30 text-red-500 flex items-center justify-center">
                              {renderCustomIcon(item.icon, "w-6 h-6")}
                            </div>
                            <span className="text-sm font-black text-white/30">
                              {item.number}
                            </span>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xl font-bold text-white">
                              {item.title?.[previewLang]}
                            </h3>
                            <div className="w-10 h-[2px] bg-red-500 rounded-full" />
                            <p className="text-xs sm:text-sm text-white/70 leading-relaxed whitespace-pre-line">
                              {item.description?.[previewLang]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 9: OUR PURPOSE & OBJECTIVES (IMAGE 10) */}
                  <div className="space-y-8 pt-10 border-t border-white/10 text-left">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                        <span className="w-5 h-[2px] bg-red-500" />
                        {aboutData.purposeSection?.tagline?.[previewLang] || 'OUR PURPOSE'}
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {aboutData.purposeSection?.title?.[previewLang] || 'Driving Progress Through Clear Objectives'}
                      </h2>
                      <div className="w-12 h-[2px] bg-red-500 rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                      {/* Left narrative & Highlight box */}
                      <div className="space-y-6">
                        <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                          {aboutData.purposeSection?.description?.[previewLang]}
                        </p>

                        <div className="p-6 rounded-2xl bg-[#0b1028]/90 border border-white/10 flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 flex items-center justify-center shrink-0">
                            {renderCustomIcon(aboutData.purposeSection?.highlightIcon || 'HeartHandshake', "w-5 h-5")}
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-white">
                              {aboutData.purposeSection?.highlightTitle?.[previewLang]}
                            </h4>
                            <p className="text-xs text-white/60 leading-relaxed">
                              {aboutData.purposeSection?.highlightDescription?.[previewLang]}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Right Priorities & Objectives */}
                      <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1028]/90 border border-white/10 space-y-6 shadow-xl">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
                            <Target className="w-5 h-5" />
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest block">
                              {aboutData.purposeSection?.objectivesTagline?.[previewLang] || (previewLang === 'ar' ? 'أولوياتنا' : 'OUR PRIORITIES')}
                            </span>
                            <h3 className="text-lg font-bold text-white">
                              {aboutData.purposeSection?.objectivesTitle?.[previewLang] || (previewLang === 'ar' ? 'أهدافنا' : 'Our Objectives')}
                            </h3>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {(aboutData.purposeSection?.objectives || []).map((obj, idx) => (
                            <div
                              key={obj.id || idx}
                              className="p-4 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between gap-4 hover:border-red-500/30 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="text-red-500">
                                  {renderCustomIcon(obj.icon, "w-4 h-4")}
                                </div>
                                <span className="text-xs font-semibold text-white">
                                  {obj.title?.[previewLang]}
                                </span>
                              </div>
                              <span className="text-xs font-black text-white/30">
                                {obj.number}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 10: CALL-TO-ACTION BANNER (IMAGE 4) */}
                  <div className="pt-10 border-t border-white/10">
                    <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center shadow-2xl bg-gradient-to-r from-[#701020] via-[#851828] to-[#450812] border border-red-500/30 space-y-5">
                      <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/20 text-white/80 border border-white/15">
                        {aboutData.bannerSection?.tagline?.[previewLang] || "LET'S WORK TOGETHER"}
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
                        {aboutData.bannerSection?.title?.[previewLang] || "Let's Build Something That Moves Business Forward."}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
                        {aboutData.bannerSection?.description?.[previewLang]}
                      </p>
                      <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={aboutData.bannerSection?.primaryButtonUrl || '#'}
                          className="px-6 py-3 rounded-full text-xs font-bold bg-white text-[#701020] shadow-xl hover:bg-white/90 transition-all cursor-pointer inline-flex items-center gap-1.5"
                        >
                          {aboutData.bannerSection?.primaryButtonText?.[previewLang] || 'Get a Quote'} &rarr;
                        </a>
                        <a
                          href={aboutData.bannerSection?.secondaryButtonUrl || '#'}
                          className="px-6 py-3 rounded-full text-xs font-bold bg-transparent border border-white/40 text-white hover:bg-white/10 transition-all cursor-pointer"
                        >
                          {aboutData.bannerSection?.secondaryButtonText?.[previewLang] || 'Contact Us'}
                        </a>
                      </div>
                    </div>
                  </div>

                </div>
              )}

                            {/* ----------------- COMPANY PROFILE PREVIEW (MATCHING REFERENCE IMAGES) ----------------- */}
              {editingTabId === 'company' && (
                <div className="space-y-16 max-w-5xl mx-auto">
                  {/* SECTION 1: HEADER (IMAGE 1) */}
                  <div className="space-y-3">
                    <p className="text-xs text-white/40 tracking-wider">
                      {previewLang === 'ar' ? 'الرئيسية / ملف الشركة' : 'Home / Company Profile'}
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-black text-white">
                      {companyData.headerSection.title[previewLang] || 'Company Profile'}
                    </h1>
                    <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                      {companyData.headerSection.description[previewLang]}
                    </p>
                  </div>

                  {/* SECTION 2: WHO WE ARE (IMAGE 2) */}
                  <div className="space-y-8 pt-10 border-t border-white/10 text-left">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                        <span className="w-5 h-[2px] bg-red-500" />
                        {companyData.whoWeAreSection.tagline[previewLang] || 'WHO WE ARE'}
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                        {companyData.whoWeAreSection.title[previewLang]}
                      </h2>
                      <div className="space-y-3 text-xs sm:text-sm text-white/70 max-w-4xl leading-relaxed">
                        <p>{companyData.whoWeAreSection.description1[previewLang]}</p>
                        <p>{companyData.whoWeAreSection.description2[previewLang]}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                      {companyData.whoWeAreSection.cards.map((card, idx) => (
                        <div
                          key={card.id || idx}
                          className="p-7 sm:p-8 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-red-500/30 transition-all space-y-4"
                        >
                          <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 flex items-center justify-center">
                            {renderCustomIcon(card.icon, "w-5 h-5")}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold text-white">
                              {card.title[previewLang]}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                              {card.description[previewLang]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 3: WHAT GUIDES US (IMAGE 3) */}
                  <div className="space-y-8 pt-10 border-t border-white/10 text-left">
                    <div className="space-y-3">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
                        <span className="w-5 h-[2px] bg-red-500" />
                        {companyData.whatGuidesUsSection.tagline[previewLang] || 'WHAT GUIDES US'}
                      </div>
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {companyData.whatGuidesUsSection.title[previewLang]}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed">
                        {companyData.whatGuidesUsSection.description[previewLang]}
                      </p>
                    </div>

                    {/* Guiding Principles Pills */}
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {companyData.whatGuidesUsSection.principles.map((pr, idx) => (
                        <span
                          key={pr.id || idx}
                          className="px-5 py-2.5 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-white/90 hover:bg-white/10 transition-colors"
                        >
                          {pr[previewLang] || pr.en}
                        </span>
                      ))}
                    </div>

                    {/* Download Company Profile Card */}
                    <div className="p-8 sm:p-10 rounded-3xl bg-[#0b1028]/90 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
                      <div className="space-y-1.5 max-w-xl">
                        <h3 className="text-lg sm:text-xl font-bold text-white">
                          {companyData.whatGuidesUsSection.downloadBox.title[previewLang]}
                        </h3>
                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                          {companyData.whatGuidesUsSection.downloadBox.description[previewLang]}
                        </p>
                      </div>

                      <a
                        href={companyData.whatGuidesUsSection.downloadBox.pdfUrl || '#'}
                        target="_blank"
                        rel="noreferrer"
                        className="px-6 py-3 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-xl transition-all flex items-center gap-2 shrink-0 cursor-pointer"
                      >
                        <Download className="w-4 h-4" />
                        <span>{companyData.whatGuidesUsSection.downloadBox.buttonText[previewLang] || 'Download Company Profile (PDF)'}</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}


                            {/* ----------------- SERVICES PREVIEW (MATCHING REFERENCE IMAGES) ----------------- */}
              {editingTabId === 'services' && (
                <div className="space-y-16 max-w-5xl mx-auto">
                  {/* SECTION 1: OUR SERVICES (IMAGE 1) */}
                  <div className="space-y-4">
                    <p className="text-xs text-white/40 tracking-wider">
                      {previewLang === 'ar' ? 'الرئيسية / خدماتنا' : 'Home / Our Services'}
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-black text-white">
                      {servicesData.headerSection.title[previewLang] || 'Our Services'}
                    </h1>
                    <p className="text-sm sm:text-base text-white/70 max-w-2xl leading-relaxed">
                      {servicesData.headerSection.description[previewLang]}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                      {servicesData.headerSection.cards.map((card, idx) => (
                        <div
                          key={card.id || idx}
                          className="p-6 sm:p-7 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-red-500/30 transition-all space-y-4 shadow-xl flex flex-col justify-between"
                        >
                          <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 flex items-center justify-center">
                            {renderCustomIcon(card.icon, "w-5 h-5")}
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-base font-bold text-white leading-snug">
                              {card.title[previewLang]}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                              {card.description[previewLang]}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 2: OUR BUSINESS AREAS (IMAGE 2) */}
                  <div className="space-y-8 pt-10 border-t border-white/10 text-center">
                    <div className="space-y-2 max-w-2xl mx-auto">
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        {servicesData.businessAreasSection.title[previewLang] || 'Our Business Areas'}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                        {servicesData.businessAreasSection.description[previewLang]}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      {servicesData.businessAreasSection.cards.map((card, idx) => (
                        <a
                          key={card.id || idx}
                          href={card.linkUrl || '#'}
                          className="p-7 sm:p-8 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-red-500/30 transition-all space-y-4 group relative block cursor-pointer"
                        >
                          <div className="flex items-center justify-between">
                            <div className="w-10 h-10 rounded-xl bg-red-600/15 border border-red-500/30 text-red-500 flex items-center justify-center">
                              {renderCustomIcon(card.icon, "w-5 h-5")}
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-red-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                          </div>

                          <div className="space-y-2">
                            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                              {card.title[previewLang]}
                            </h3>
                            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
                              {card.description[previewLang]}
                            </p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- SHOP PREVIEW (MATCHING REFERENCE IMAGE) ----------------- */}
              {editingTabId === 'shop' && (
                <div className="space-y-10 max-w-6xl mx-auto">
                  {/* SECTION 1: OUR PRODUCTS */}
                  <div className="space-y-3">
                    <p className="text-xs text-white/40 tracking-wider">
                      {previewLang === 'ar' ? 'الرئيسية / المتجر' : 'Home / Shop'}
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-black text-white">
                      {shopData.headerSection.title[previewLang] || 'Our Products'}
                    </h1>
                    <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed">
                      {shopData.headerSection.description[previewLang]}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                      {shopData.headerSection.products.map((product, idx) => (
                        <div
                          key={product.id || idx}
                          className="rounded-2xl bg-[#121624] border border-white/10 hover:border-red-500/30 transition-all p-5 flex flex-col justify-between shadow-2xl group overflow-hidden"
                        >
                          <div>
                            {/* Product Image */}
                            <div className="relative w-full h-52 rounded-xl overflow-hidden bg-black/40 mb-4 border border-white/5">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name[previewLang]}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                                  No Image Uploaded
                                </div>
                              )}
                            </div>

                            {/* Brand & Name */}
                            <div className="space-y-1.5">
                              {product.brand[previewLang] && (
                                <span className="text-xs font-semibold text-white/50 tracking-wider block">
                                  {product.brand[previewLang]}
                                </span>
                              )}
                              <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors">
                                {product.name[previewLang]}
                              </h3>
                              <p className="text-xs text-white/60 leading-relaxed line-clamp-3">
                                {product.description[previewLang]}
                              </p>
                            </div>

                            {/* Badge Pills */}
                            {product.badges && product.badges.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-4">
                                {product.badges.map((badge, bIdx) => (
                                  <span
                                    key={badge.id || bIdx}
                                    className="px-3 py-1 rounded-full text-[11px] font-medium bg-white/5 border border-white/10 text-white/80"
                                  >
                                    {badge[previewLang]}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Action Button */}
                          <div className="pt-6 mt-4 border-t border-white/5">
                            <a
                              href={product.buttonUrl || '#'}
                              className="w-full py-2.5 px-4 rounded-xl bg-[#E51E25] hover:bg-red-700 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-red-900/20"
                            >
                              <span>{product.buttonText[previewLang] || (previewLang === 'ar' ? 'طلب عرض أسعار' : 'Request a Quote')}</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- PROJECTS PREVIEW (MATCHING REFERENCE IMAGES) ----------------- */}
              {editingTabId === 'projects' && (
                <div className="space-y-16 max-w-6xl mx-auto">
                  {/* SECTION 1: OUR PROJECTS (IMAGE 1) */}
                  <div className="space-y-4">
                    <p className="text-xs text-white/40 tracking-wider">
                      {previewLang === 'ar' ? 'الرئيسية / المشاريع' : 'Home / Projects'}
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-black text-white">
                      {projectsData.headerSection.title[previewLang] || 'Our Projects'}
                    </h1>
                    <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed">
                      {projectsData.headerSection.description[previewLang]}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                      {projectsData.headerSection.projects.map((project, idx) => (
                        <div
                          key={project.id || idx}
                          className="rounded-2xl bg-[#141824] border border-white/10 hover:border-white/20 transition-all p-6 flex flex-col justify-between shadow-2xl group min-h-[200px]"
                        >
                          <div>
                            {/* Card Top Row: Category in Red, Status Badge in Pill on Right */}
                            <div className="flex items-center justify-between gap-2 mb-3">
                              <span className="text-xs font-semibold text-red-500 tracking-wider">
                                {project.category[previewLang]}
                              </span>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                                  project.statusType === 'completed'
                                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                    : project.statusType === 'planned'
                                    ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                                    : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                                }`}
                              >
                                {project.status[previewLang] || (project.statusType === 'completed' ? 'Completed' : project.statusType === 'planned' ? 'Planned' : 'Ongoing')}
                              </span>
                            </div>

                            {/* Project Title */}
                            <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                              {project.title[previewLang]}
                            </h3>

                            {/* Project Description */}
                            <p className="text-xs text-white/60 leading-relaxed">
                              {project.description[previewLang]}
                            </p>
                          </div>

                          {project.linkUrl && (
                            <div className="pt-4 mt-2 flex items-center justify-end">
                              <span className="text-[11px] text-white/40 group-hover:text-red-400 flex items-center gap-1 transition-colors">
                                Explore <ArrowUpRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 2: LET'S WORK TOGETHER BANNER (IMAGE 2) */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-red-500/30 text-center p-8 sm:p-14 bg-gradient-to-br from-[#70101d] via-[#851624] to-[#4e0912]">
                    {/* Background subtle silk/gradient lighting effect */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                      {/* Tagline */}
                      <p className="text-xs font-bold text-white/80 tracking-widest uppercase">
                        — {projectsData.bannerSection.tagline[previewLang] || "LET'S WORK TOGETHER"} —
                      </p>

                      {/* Main Headline */}
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                        {projectsData.bannerSection.title[previewLang] || "Let's Build Something That Moves Business Forward."}
                      </h2>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl mx-auto">
                        {projectsData.bannerSection.description[previewLang]}
                      </p>

                      {/* Buttons */}
                      <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                        <a
                          href={projectsData.bannerSection.primaryButtonUrl || '#'}
                          className="px-7 py-3 rounded-full bg-white text-[#851624] hover:bg-white/95 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
                        >
                          <span>{projectsData.bannerSection.primaryButtonText[previewLang] || 'Get a Quote'}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>

                        <a
                          href={projectsData.bannerSection.secondaryButtonUrl || '#'}
                          className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/30 font-semibold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-sm transition-all cursor-pointer"
                        >
                          <Mail className="w-4 h-4" />
                          <span>{projectsData.bannerSection.secondaryButtonText[previewLang] || 'Contact Us'}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- PARTNERS PREVIEW (MATCHING REFERENCE IMAGES) ----------------- */}
              {editingTabId === 'partners' && (
                <div className="space-y-16 max-w-6xl mx-auto">
                  {/* SECTION 1: OUR PARTNERS (IMAGE 1) */}
                  <div className="space-y-4">
                    <p className="text-xs text-white/40 tracking-wider">
                      {previewLang === 'ar' ? 'الرئيسية / الشركاء' : 'Home / Partners'}
                    </p>
                    <h1 className="text-3xl sm:text-5xl font-black text-white">
                      {partnersData.headerSection.title[previewLang] || 'Our Partners'}
                    </h1>
                    <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed">
                      {partnersData.headerSection.description[previewLang]}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                      {partnersData.headerSection.partners.map((partner, idx) => (
                        <div
                          key={partner.id || idx}
                          className="rounded-2xl bg-[#141824] border border-white/10 hover:border-white/20 transition-all p-6 flex flex-col justify-between shadow-2xl group min-h-[300px]"
                        >
                          <div>
                            {/* Inset Logo Box */}
                            <div className="w-full h-28 rounded-xl bg-[#0b0e17] border border-white/5 flex items-center justify-center p-4 mb-5 overflow-hidden">
                              {partner.logoUrl ? (
                                <img
                                  src={partner.logoUrl}
                                  alt={partner.name[previewLang]}
                                  className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-all duration-300"
                                />
                              ) : (
                                <span className="text-white/30 text-xs font-semibold tracking-wider uppercase">
                                  {partner.name[previewLang] || 'Partner Logo'}
                                </span>
                              )}
                            </div>

                            {/* Category Tag */}
                            <span className="text-xs font-semibold text-red-500 tracking-wider block mb-1">
                              {partner.category[previewLang]}
                            </span>

                            {/* Partner Name */}
                            <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                              {partner.name[previewLang]}
                            </h3>

                            {/* Description */}
                            <p className="text-xs text-white/60 leading-relaxed mb-4 line-clamp-3">
                              {partner.description[previewLang]}
                            </p>
                          </div>

                          {/* Link */}
                          <div className="pt-3 border-t border-white/5">
                            <a
                              href={partner.websiteUrl || '#'}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500 hover:text-red-400 transition-colors cursor-pointer"
                            >
                              <span>{partner.linkText[previewLang] || (previewLang === 'ar' ? 'زيارة الموقع' : 'Visit website')}</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* SECTION 2: LET'S WORK TOGETHER BANNER (IMAGE 2) */}
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-red-500/30 text-center p-8 sm:p-14 bg-gradient-to-br from-[#70101d] via-[#851624] to-[#4e0912]">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent pointer-events-none" />

                    <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                      {/* Tagline */}
                      <p className="text-xs font-bold text-white/80 tracking-widest uppercase">
                        — {partnersData.bannerSection.tagline[previewLang] || "LET'S WORK TOGETHER"} —
                      </p>

                      {/* Main Headline */}
                      <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
                        {partnersData.bannerSection.title[previewLang] || "Let's Build Something That Moves Business Forward."}
                      </h2>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl mx-auto">
                        {partnersData.bannerSection.description[previewLang]}
                      </p>

                      {/* Buttons */}
                      <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
                        <a
                          href={partnersData.bannerSection.primaryButtonUrl || '#'}
                          className="px-7 py-3 rounded-full bg-white text-[#851624] hover:bg-white/95 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
                        >
                          <span>{partnersData.bannerSection.primaryButtonText[previewLang] || 'Get a Quote'}</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </a>

                        <a
                          href={partnersData.bannerSection.secondaryButtonUrl || '#'}
                          className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/30 font-semibold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-sm transition-all cursor-pointer"
                        >
                          <Mail className="w-4 h-4" />
                          <span>{partnersData.bannerSection.secondaryButtonText[previewLang] || 'Contact Us'}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- CONTACT PREVIEW (MATCHING REFERENCE IMAGES) ----------------- */}
              {editingTabId === 'contact' && (
                <div className="space-y-16 max-w-6xl mx-auto">
                  {/* SECTION 1: CONTACT US & SEND AN ENQUIRY (IMAGE 1) */}
                  <div className="space-y-10">
                    {/* Breadcrumb & Main Header */}
                    <div className="space-y-3">
                      <p className="text-xs text-white/40 tracking-wider">
                        {previewLang === 'ar' ? 'الرئيسية / اتصل بنا' : 'Home / Contact Us'}
                      </p>
                      <h1 className="text-3xl sm:text-5xl font-black text-white">
                        {contactData.headerSection.title[previewLang] || 'Contact Us'}
                      </h1>
                      <p className="text-xs sm:text-sm text-white/70 max-w-3xl leading-relaxed">
                        {contactData.headerSection.description[previewLang]}
                      </p>
                    </div>

                    {/* Send an Enquiry Form Card */}
                    <div className="rounded-3xl bg-[#141824] border border-white/10 p-6 sm:p-10 shadow-2xl">
                      <div className="space-y-2 mb-8">
                        <h2 className="text-xl sm:text-2xl font-bold text-white">
                          {contactData.headerSection.enquiryTitle[previewLang] || 'Send an Enquiry'}
                        </h2>
                        <p className="text-xs sm:text-sm text-white/60 max-w-2xl leading-relaxed">
                          {contactData.headerSection.enquiryDescription[previewLang]}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/70">
                            {previewLang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                          </label>
                          <input
                            type="text"
                            placeholder={previewLang === 'ar' ? 'أدخل اسمك' : 'Enter your name'}
                            disabled
                            className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e17] border border-white/10 text-white/40 text-xs placeholder-white/20"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-xs font-medium text-white/70">
                            {previewLang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                          </label>
                          <input
                            type="text"
                            placeholder={previewLang === 'ar' ? 'name@example.com' : 'name@example.com'}
                            disabled
                            className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e17] border border-white/10 text-white/40 text-xs placeholder-white/20"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-xs font-medium text-white/70">
                            {previewLang === 'ar' ? 'الموضوع' : 'Subject'}
                          </label>
                          <input
                            type="text"
                            placeholder={previewLang === 'ar' ? 'موضوع الرسالة' : 'How can we help you?'}
                            disabled
                            className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e17] border border-white/10 text-white/40 text-xs placeholder-white/20"
                          />
                        </div>

                        <div className="space-y-1.5 sm:col-span-2">
                          <label className="text-xs font-medium text-white/70">
                            {previewLang === 'ar' ? 'الرسالة' : 'Message'}
                          </label>
                          <textarea
                            rows={4}
                            placeholder={previewLang === 'ar' ? 'اكتب تفاصيل استفسارك هنا...' : 'Write your enquiry details here...'}
                            disabled
                            className="w-full px-4 py-2.5 rounded-xl bg-[#0b0e17] border border-white/10 text-white/40 text-xs placeholder-white/20 resize-none"
                          />
                        </div>
                      </div>

                      <div className="mt-6 flex justify-start">
                        <button
                          type="button"
                          className="px-6 py-3 rounded-xl bg-red-600 text-white font-semibold text-xs sm:text-sm hover:bg-red-500 transition-colors shadow-lg cursor-pointer"
                        >
                          {previewLang === 'ar' ? 'إرسال الرسالة' : 'Send Enquiry'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* SECTION 2: GET IN TOUCH & CORPORATE OFFICE (IMAGE 2) */}
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-red-500 tracking-widest uppercase mb-1">
                        {contactData.corporateOfficeSection.tagline[previewLang] || 'GET IN TOUCH'}
                      </p>
                      <h2 className="text-2xl sm:text-4xl font-black text-white">
                        {contactData.corporateOfficeSection.title[previewLang] || 'Corporate Office'}
                      </h2>
                      <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl leading-relaxed">
                        {contactData.corporateOfficeSection.description[previewLang]}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      {/* Left: Contact Info Card (5 cols) */}
                      <div className="lg:col-span-5 rounded-3xl bg-[#141824] border border-white/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl space-y-6">
                        {/* Address */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white">
                              {contactData.corporateOfficeSection.addressLabel[previewLang] || 'Office Address'}
                            </p>
                            <div className="text-xs text-white/70 leading-relaxed">
                              <p>{contactData.corporateOfficeSection.addressLine1[previewLang]}</p>
                              <p>{contactData.corporateOfficeSection.addressLine2[previewLang]}</p>
                              <p>{contactData.corporateOfficeSection.addressCityCountry[previewLang]}</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-white/5" />

                        {/* Email */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                            <Mail className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white">
                              {contactData.corporateOfficeSection.emailLabel[previewLang] || 'Email Address'}
                            </p>
                            <a
                              href={`mailto:${contactData.corporateOfficeSection.emailValue}`}
                              className="text-xs text-white/70 hover:text-red-400 transition-colors block"
                            >
                              {contactData.corporateOfficeSection.emailValue || 'info@mobtakergroup.com'}
                            </a>
                          </div>
                        </div>

                        <div className="border-t border-white/5" />

                        {/* Phone */}
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shrink-0">
                            <Phone className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white">
                              {contactData.corporateOfficeSection.phoneLabel[previewLang] || 'Phone Number'}
                            </p>
                            <a
                              href={`tel:${contactData.corporateOfficeSection.phoneValue}`}
                              className="text-xs text-white/70 hover:text-red-400 transition-colors block"
                            >
                              {contactData.corporateOfficeSection.phoneValue || '+964 (0) 123 456 789'}
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Right: Map Container with 'Open in Maps' pill button (7 cols) */}
                      <div className="lg:col-span-7 relative rounded-3xl overflow-hidden border border-white/10 bg-[#0b0e17] min-h-[360px] shadow-2xl flex flex-col">
                        {/* Open in Maps floating pill button */}
                        <div className="absolute top-4 left-4 z-10">
                          <a
                            href={contactData.corporateOfficeSection.mapLocationUrl || 'https://maps.google.com/?q=Al-Mansour,Baghdad,Iraq'}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 shadow-2xl transition-all cursor-pointer"
                          >
                            <span>{contactData.corporateOfficeSection.mapButtonText[previewLang] || (previewLang === 'ar' ? 'افتح في الخرائط' : 'Open in Maps')}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" />
                          </a>
                        </div>

                        {/* Google Maps Iframe */}
                        <iframe
                          title="Corporate Office Map"
                          src={contactData.corporateOfficeSection.mapEmbedUrl || 'https://maps.google.com/maps?q=Al-Mansour%2C%20Baghdad%2C%20Iraq&t=&z=13&ie=UTF8&iwloc=&output=embed'}
                          className="w-full h-full min-h-[360px] border-0"
                          loading="lazy"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ----------------- PROJECTS INNOVATOR PREVIEW (MATCHING REFERENCE IMAGES) ----------------- */}
{editingTabId === 'projects-innovator' && (
  <div className="space-y-16 max-w-6xl mx-auto">
    {/* SECTION 1: HERO BANNER (IMAGE 1) */}
    <div
      className="relative rounded-3xl overflow-hidden border border-white/10 bg-cover bg-center p-8 sm:p-14 lg:p-16 min-h-[520px] flex flex-col justify-between shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(10, 15, 35, 0.92) 0%, rgba(10, 15, 35, 0.75) 50%, rgba(10, 15, 35, 0.4) 100%), url(${projectsInnovatorData.heroBannerSection.backgroundImageUrl})`,
      }}
    >
      {/* Top Logo */}
      <div className="flex items-center gap-3">
        {projectsInnovatorData.heroBannerSection.logoUrl ? (
          <img
            src={projectsInnovatorData.heroBannerSection.logoUrl}
            alt="Projects Innovator Logo"
            className="h-10 w-auto object-contain brightness-125"
          />
        ) : (
          <div className="w-9 h-9 rounded-lg bg-red-600 flex items-center justify-center text-white font-black text-sm">
            P
          </div>
        )}
        <div className="text-left">
          <p className="text-[10px] text-white/50 tracking-wider uppercase font-semibold">
            {previewLang === 'ar' ? 'شركة مبتكر المشاريع' : 'PROJECTS INNOVATOR'}
          </p>
          <p className="text-xs font-bold text-white tracking-wide">
            {projectsInnovatorData.heroBannerSection.logoText[previewLang] || 'PROJECTS INNOVATOR'}
          </p>
        </div>
      </div>

      {/* Main Copy */}
      <div className="max-w-2xl space-y-5 my-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-tight">
          {projectsInnovatorData.heroBannerSection.title[previewLang]}{' '}
          <span className="text-red-500">
            {projectsInnovatorData.heroBannerSection.titleHighlight[previewLang]}
          </span>
        </h1>

        <p className="text-xs sm:text-sm text-white/75 leading-relaxed max-w-xl">
          {projectsInnovatorData.heroBannerSection.description[previewLang]}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 flex flex-wrap items-center gap-3">
          <a
            href={projectsInnovatorData.heroBannerSection.primaryButtonUrl || '#'}
            className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <span>{projectsInnovatorData.heroBannerSection.primaryButtonText[previewLang] || 'Explore Our Services'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={projectsInnovatorData.heroBannerSection.secondaryButtonUrl || '#'}
            className="px-6 py-3 rounded-full bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs sm:text-sm shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <span>{projectsInnovatorData.heroBannerSection.secondaryButtonText[previewLang] || 'Contact Us'}</span>
          </a>
        </div>
      </div>

      <div />
    </div>

    {/* SECTION 2: BRAND LOGOS (IMAGE 1) */}
    <div className="space-y-4 py-4 border-y border-white/5 text-center">
      <p className="text-[11px] font-bold text-white/40 tracking-widest uppercase">
        {projectsInnovatorData.brandsSection.title[previewLang] || 'TRUSTED BRANDS & INDUSTRY LEADERS'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 py-4 px-6 bg-white/[0.02] rounded-2xl border border-white/5">
        {projectsInnovatorData.brandsSection.brands.map((brand, idx) => (
          <div
            key={brand.id || idx}
            className="flex items-center gap-2 group opacity-60 hover:opacity-100 transition-opacity"
          >
            {brand.logoUrl ? (
              <img
                src={brand.logoUrl}
                alt={brand.name}
                className="h-7 max-w-[120px] object-contain filter brightness-125"
              />
            ) : (
              <span className="text-xs text-white/60 font-semibold">{brand.name}</span>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* SECTION 3: ABOUT PROJECTS INNOVATOR (IMAGE 2) */}
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-7 space-y-4">
        <p className="text-xs font-bold text-red-500 tracking-widest uppercase">
          {projectsInnovatorData.aboutSection.tagline[previewLang] || 'ABOUT PROJECTS INNOVATOR'}
        </p>

        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
          {projectsInnovatorData.aboutSection.title[previewLang] || 'More Than a Company, A Platform for Sustainable Growth.'}
        </h2>

        <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl">
          {projectsInnovatorData.aboutSection.description[previewLang]}
        </p>
      </div>

      <div className="lg:col-span-5">
        <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
          <img
            src={projectsInnovatorData.aboutSection.imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
            alt="Corporate Headquarters"
            className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>
    </div>

    {/* SECTION 4: OUR BUSINESS AREA (IMAGE 2) */}
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          {projectsInnovatorData.businessAreasSection.title[previewLang] || 'Our Business Areas'}
        </h2>
        <p className="text-xs sm:text-sm text-white/60 max-w-xl mx-auto">
          {projectsInnovatorData.businessAreasSection.description[previewLang]}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {projectsInnovatorData.businessAreasSection.areas.map((area, idx) => (
          <div
            key={area.id || idx}
            className="rounded-2xl bg-[#141824] border border-white/10 hover:border-white/20 p-6 flex flex-col justify-between min-h-[220px] transition-all group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500">
                  <LucideIcon name={area.icon} className="w-5 h-5" />
                </div>

                <a
                  href={area.linkUrl || '#'}
                  className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors cursor-pointer"
                  title="Explore"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                {area.title[previewLang]}
              </h3>

              <p className="text-xs text-white/60 leading-relaxed">
                {area.description[previewLang]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* SECTION 5: LET'S WORK TOGETHER BANNER (IMAGE 3) */}
    <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-red-500/30 text-center p-8 sm:p-14 bg-gradient-to-br from-[#70101d] via-[#851624] to-[#4e0912]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/20 via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto space-y-4">
        {/* Tagline */}
        <p className="text-xs font-bold text-white/80 tracking-widest uppercase">
          — {projectsInnovatorData.workTogetherSection.tagline[previewLang] || "LET'S WORK TOGETHER"} —
        </p>

        {/* Main Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight">
          {projectsInnovatorData.workTogetherSection.title[previewLang] || "Let's Build Something That Moves Business Forward."}
        </h2>

        {/* Description */}
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed max-w-2xl mx-auto">
          {projectsInnovatorData.workTogetherSection.description[previewLang]}
        </p>

        {/* Buttons */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
          <a
            href={projectsInnovatorData.workTogetherSection.primaryButtonUrl || '#'}
            className="px-7 py-3 rounded-full bg-white text-[#851624] hover:bg-white/95 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
          >
            <span>{projectsInnovatorData.workTogetherSection.primaryButtonText[previewLang] || 'Get a Quote'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          <a
            href={projectsInnovatorData.workTogetherSection.secondaryButtonUrl || '#'}
            className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 text-white border border-white/30 font-semibold text-xs sm:text-sm flex items-center gap-2 backdrop-blur-sm transition-all cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>{projectsInnovatorData.workTogetherSection.secondaryButtonText[previewLang] || 'Contact Us'}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
)}


{/* ----------------- ATTRACTIVE PREVIEW ----------------- */}
{editingTabId === 'attractive' && (
  <div className="space-y-16 max-w-6xl mx-auto">
    {/* SECTION 1: HERO BANNER */}
    <div
      className="relative rounded-3xl overflow-hidden border border-white/10 bg-cover bg-center p-8 sm:p-14 lg:p-16 min-h-[520px] flex flex-col justify-between shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(10, 15, 35, 0.92) 0%, rgba(10, 15, 35, 0.75) 50%, rgba(10, 15, 35, 0.4) 100%), url(${attractiveData.heroBannerSection.backgroundImageUrl})`,
      }}
    >
      {/* Top Logo */}
      <div className="flex items-center gap-3">
        {attractiveData.heroBannerSection.logoUrl ? (
          <img
            src={attractiveData.heroBannerSection.logoUrl}
            alt="Attractive Logo"
            className="h-10 w-auto object-contain brightness-125"
          />
        ) : (
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
            A
          </div>
        )}
        <div className="text-left">
          <p className="text-[10px] text-white/50 tracking-wider uppercase font-semibold">
            {previewLang === 'ar' ? 'أتراكتيف' : 'ATTRACTIVE'}
          </p>
          <p className="text-xs font-bold text-white tracking-wide">
            {attractiveData.heroBannerSection.logoText[previewLang] || 'ATTRACTIVE'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl space-y-6 my-10">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
          {attractiveData.heroBannerSection.title[previewLang] || 'Building Tomorrow'}
          {attractiveData.heroBannerSection.titleHighlight[previewLang] && (
            <span className="block text-blue-500 mt-2">
              {attractiveData.heroBannerSection.titleHighlight[previewLang]}
            </span>
          )}
        </h1>

        <p className="text-sm sm:text-base text-white/75 leading-relaxed font-normal max-w-xl">
          {attractiveData.heroBannerSection.description[previewLang]}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {attractiveData.heroBannerSection.primaryButtonText[previewLang] && (
            <a
              href={attractiveData.heroBannerSection.primaryButtonUrl || '#'}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <span>{attractiveData.heroBannerSection.primaryButtonText[previewLang]}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}

          {attractiveData.heroBannerSection.secondaryButtonText[previewLang] && (
            <a
              href={attractiveData.heroBannerSection.secondaryButtonUrl || '#'}
              className="px-6 py-3 rounded-full bg-white text-[#0b1028] hover:bg-white/90 font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md"
            >
              {attractiveData.heroBannerSection.secondaryButtonText[previewLang]}
            </a>
          )}
        </div>
      </div>
      <div />
    </div>

    {/* SECTION 2: BRAND LOGOS */}
    <div className="space-y-6 text-center">
      <p className="text-xs tracking-[0.2em] uppercase font-bold text-white/50">
        {attractiveData.brandsSection.title[previewLang] || 'TRUSTED BRANDS & INDUSTRY LEADERS'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-2">
        {attractiveData.brandsSection.brands.map((b, idx) => (
          <div
            key={b.id || idx}
            className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          >
            {b.logoUrl ? (
              <img
                src={b.logoUrl}
                alt={b.name}
                className="h-7 sm:h-9 w-auto max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all brightness-150"
              />
            ) : (
              <span className="text-xs sm:text-sm font-bold tracking-widest text-white/60">
                {b.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* SECTION 3: ABOUT */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <div className="inline-block text-xs font-bold tracking-wider text-blue-400 uppercase">
          {attractiveData.aboutSection.tagline[previewLang] || 'ABOUT ATTRACTIVE'}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          {attractiveData.aboutSection.title[previewLang]}
        </h2>
        <p className="text-sm text-white/70 leading-relaxed font-normal">
          {attractiveData.aboutSection.description[previewLang]}
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] bg-white/5 shadow-2xl">
        <img
          src={attractiveData.aboutSection.imageUrl}
          alt="Attractive Headquarters"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1028]/80 via-transparent to-transparent" />
      </div>
    </div>

    {/* SECTION 4: OUR PRODUCTS (MATCHING REFERENCE IMAGE) */}
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-500 tracking-tight">
          {attractiveData.productsSection.title[previewLang] || 'Our Products'}
        </h2>
        <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
          {attractiveData.productsSection.description[previewLang]}
        </p>
      </div>

      {/* 3-Column Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {attractiveData.productsSection.products.map((prod, idx) => (
          <div
            key={prod.id || idx}
            className="bg-[#121829] border border-white/10 hover:border-blue-500/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 group"
          >
            {/* Top Product Image */}
            <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
              {prod.image ? (
                <img
                  src={prod.image}
                  alt={prod.name[previewLang] || 'Product'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                  No Image Provided
                </div>
              )}
            </div>

            {/* Product Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-white/50 tracking-wider uppercase block">
                  {prod.brand[previewLang] || 'MedTech'}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {prod.name[previewLang]}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                  {prod.description[previewLang]}
                </p>
              </div>

              {/* Badges */}
              <div className="space-y-4">
                {prod.badges && prod.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {prod.badges.map((b, bIdx) => (
                      <span
                        key={b.id || bIdx}
                        className="px-2.5 py-1 rounded text-[11px] font-medium border border-white/20 bg-white/5 text-white/80"
                      >
                        {b[previewLang]}
                      </span>
                    ))}
                  </div>
                )}

                {/* Blue Request Quote Button */}
                <a
                  href={prod.buttonUrl || '/contact'}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5"
                >
                  <span>{prod.buttonText[previewLang] || 'Request a Quote ↗'}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Centered View All Button */}
      <div className="text-center pt-4">
        <a
          href={attractiveData.productsSection.viewAllButtonUrl || '/shop'}
          className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wider transition-all"
        >
          {attractiveData.productsSection.viewAllButtonText[previewLang] || 'View All Products'}
        </a>
      </div>
    </div>

    {/* SECTION 5: LETS WORK TOGETHER BANNER */}
    <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-blue-900/40 to-slate-900/80 p-8 sm:p-12 text-center shadow-2xl space-y-6">
      <p className="text-xs font-bold tracking-[0.25em] text-blue-400 uppercase">
        {attractiveData.workTogetherSection.tagline[previewLang] || "— LET'S WORK TOGETHER —"}
      </p>

      <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-tight">
        {attractiveData.workTogetherSection.title[previewLang]}
      </h2>

      <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
        {attractiveData.workTogetherSection.description[previewLang]}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        {attractiveData.workTogetherSection.primaryButtonText[previewLang] && (
          <a
            href={attractiveData.workTogetherSection.primaryButtonUrl || '#'}
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
          >
            <span>{attractiveData.workTogetherSection.primaryButtonText[previewLang]}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}

        {attractiveData.workTogetherSection.secondaryButtonText[previewLang] && (
          <a
            href={attractiveData.workTogetherSection.secondaryButtonUrl || '#'}
            className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all"
          >
            {attractiveData.workTogetherSection.secondaryButtonText[previewLang]}
          </a>
        )}
      </div>
    </div>
  </div>
)}


{/* ----------------- MEDICS INNOVATOR PREVIEW ----------------- */}
{editingTabId === 'medics-innovator' && (
  <div className="space-y-16 max-w-6xl mx-auto">
    {/* SECTION 1: HERO BANNER */}
    <div
      className="relative rounded-3xl overflow-hidden border border-white/10 bg-cover bg-center p-8 sm:p-14 lg:p-16 min-h-[520px] flex flex-col justify-between shadow-2xl"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(10, 15, 35, 0.92) 0%, rgba(10, 15, 35, 0.75) 50%, rgba(10, 15, 35, 0.4) 100%), url(${medicsInnovatorData.heroBannerSection.backgroundImageUrl})`,
      }}
    >
      {/* Top Logo */}
      <div className="flex items-center gap-3">
        {medicsInnovatorData.heroBannerSection.logoUrl ? (
          <img
            src={medicsInnovatorData.heroBannerSection.logoUrl}
            alt="Medics Innovator Logo"
            className="h-10 w-auto object-contain brightness-125"
          />
        ) : (
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-sm">
            M
          </div>
        )}
        <div className="text-left">
          <p className="text-[10px] text-white/50 tracking-wider uppercase font-semibold">
            {previewLang === 'ar' ? 'ميديكس إنوفيتور' : 'MEDICS INNOVATOR'}
          </p>
          <p className="text-xs font-bold text-white tracking-wide">
            {medicsInnovatorData.heroBannerSection.logoText[previewLang] || 'MEDICS INNOVATOR'}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl space-y-6 my-10">
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
          {medicsInnovatorData.heroBannerSection.title[previewLang] || 'Building Tomorrow'}
          {medicsInnovatorData.heroBannerSection.titleHighlight[previewLang] && (
            <span className="block text-blue-500 mt-2">
              {medicsInnovatorData.heroBannerSection.titleHighlight[previewLang]}
            </span>
          )}
        </h1>

        <p className="text-sm sm:text-base text-white/75 leading-relaxed font-normal max-w-xl">
          {medicsInnovatorData.heroBannerSection.description[previewLang]}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {medicsInnovatorData.heroBannerSection.primaryButtonText[previewLang] && (
            <a
              href={medicsInnovatorData.heroBannerSection.primaryButtonUrl || '#'}
              className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2"
            >
              <span>{medicsInnovatorData.heroBannerSection.primaryButtonText[previewLang]}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}

          {medicsInnovatorData.heroBannerSection.secondaryButtonText[previewLang] && (
            <a
              href={medicsInnovatorData.heroBannerSection.secondaryButtonUrl || '#'}
              className="px-6 py-3 rounded-full bg-white text-[#0b1028] hover:bg-white/90 font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-md"
            >
              {medicsInnovatorData.heroBannerSection.secondaryButtonText[previewLang]}
            </a>
          )}
        </div>
      </div>
      <div />
    </div>

    {/* SECTION 2: BRAND LOGOS */}
    <div className="space-y-6 text-center">
      <p className="text-xs tracking-[0.2em] uppercase font-bold text-white/50">
        {medicsInnovatorData.brandsSection.title[previewLang] || 'TRUSTED BRANDS & INDUSTRY LEADERS'}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-2">
        {medicsInnovatorData.brandsSection.brands.map((b, idx) => (
          <div
            key={b.id || idx}
            className="flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity"
          >
            {b.logoUrl ? (
              <img
                src={b.logoUrl}
                alt={b.name}
                className="h-7 sm:h-9 w-auto max-w-[120px] object-contain grayscale hover:grayscale-0 transition-all brightness-150"
              />
            ) : (
              <span className="text-xs sm:text-sm font-bold tracking-widest text-white/60">
                {b.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>

    {/* SECTION 3: ABOUT */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      <div className="space-y-6">
        <div className="inline-block text-xs font-bold tracking-wider text-blue-400 uppercase">
          {medicsInnovatorData.aboutSection.tagline[previewLang] || 'ABOUT MEDICS INNOVATOR'}
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
          {medicsInnovatorData.aboutSection.title[previewLang]}
        </h2>
        <p className="text-sm text-white/70 leading-relaxed font-normal">
          {medicsInnovatorData.aboutSection.description[previewLang]}
        </p>
      </div>

      <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/3] bg-white/5 shadow-2xl">
        <img
          src={medicsInnovatorData.aboutSection.imageUrl}
          alt="Medics Innovator Headquarters"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1028]/80 via-transparent to-transparent" />
      </div>
    </div>

    {/* SECTION 4: OUR PRODUCTS (MATCHING REFERENCE IMAGE) */}
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-500 tracking-tight">
          {medicsInnovatorData.productsSection.title[previewLang] || 'Our Products'}
        </h2>
        <p className="text-sm md:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
          {medicsInnovatorData.productsSection.description[previewLang]}
        </p>
      </div>

      {/* 3-Column Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {medicsInnovatorData.productsSection.products.map((prod, idx) => (
          <div
            key={prod.id || idx}
            className="bg-[#121829] border border-white/10 hover:border-blue-500/50 rounded-2xl overflow-hidden flex flex-col justify-between shadow-2xl transition-all duration-300 group"
          >
            {/* Top Product Image */}
            <div className="relative aspect-[16/10] bg-black/40 overflow-hidden">
              {prod.image ? (
                <img
                  src={prod.image}
                  alt={prod.name[previewLang] || 'Product'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-xs">
                  No Image Provided
                </div>
              )}
            </div>

            {/* Product Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-white/50 tracking-wider uppercase block">
                  {prod.brand[previewLang] || 'MedTech'}
                </span>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                  {prod.name[previewLang]}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed line-clamp-3">
                  {prod.description[previewLang]}
                </p>
              </div>

              {/* Badges */}
              <div className="space-y-4">
                {prod.badges && prod.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {prod.badges.map((b, bIdx) => (
                      <span
                        key={b.id || bIdx}
                        className="px-2.5 py-1 rounded text-[11px] font-medium border border-white/20 bg-white/5 text-white/80"
                      >
                        {b[previewLang]}
                      </span>
                    ))}
                  </div>
                )}

                {/* Blue Request Quote Button */}
                <a
                  href={prod.buttonUrl || '/contact'}
                  className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs tracking-wide transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center gap-1.5"
                >
                  <span>{prod.buttonText[previewLang] || 'Request a Quote ↗'}</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Centered View All Button */}
      <div className="text-center pt-4">
        <a
          href={medicsInnovatorData.productsSection.viewAllButtonUrl || '/shop'}
          className="inline-flex items-center gap-2 px-8 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wider transition-all"
        >
          {medicsInnovatorData.productsSection.viewAllButtonText[previewLang] || 'View All Products'}
        </a>
      </div>
    </div>

    {/* SECTION 5: LETS WORK TOGETHER BANNER */}
    <div className="relative rounded-3xl overflow-hidden border border-blue-500/30 bg-gradient-to-r from-blue-950/60 via-blue-900/40 to-slate-900/80 p-8 sm:p-12 text-center shadow-2xl space-y-6">
      <p className="text-xs font-bold tracking-[0.25em] text-blue-400 uppercase">
        {medicsInnovatorData.workTogetherSection.tagline[previewLang] || "— LET'S WORK TOGETHER —"}
      </p>

      <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-2xl mx-auto leading-tight">
        {medicsInnovatorData.workTogetherSection.title[previewLang]}
      </h2>

      <p className="text-xs sm:text-sm text-white/70 max-w-xl mx-auto leading-relaxed">
        {medicsInnovatorData.workTogetherSection.description[previewLang]}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
        {medicsInnovatorData.workTogetherSection.primaryButtonText[previewLang] && (
          <a
            href={medicsInnovatorData.workTogetherSection.primaryButtonUrl || '#'}
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all shadow-lg shadow-blue-600/30 flex items-center gap-1.5"
          >
            <span>{medicsInnovatorData.workTogetherSection.primaryButtonText[previewLang]}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        )}

        {medicsInnovatorData.workTogetherSection.secondaryButtonText[previewLang] && (
          <a
            href={medicsInnovatorData.workTogetherSection.secondaryButtonUrl || '#'}
            className="px-6 py-2.5 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 text-white font-semibold text-xs sm:text-sm tracking-wide transition-all"
          >
            {medicsInnovatorData.workTogetherSection.secondaryButtonText[previewLang]}
          </a>
        )}
      </div>
    </div>
  </div>
)}


              {/* ----------------- HOME PAGE PREVIEW ----------------- */}
              {editingTabId !== 'about' && editingTabId !== 'company' && editingTabId !== 'services' && editingTabId !== 'shop' && editingTabId !== 'projects' && editingTabId !== 'partners' && editingTabId !== 'contact' && editingTabId !== 'projects-innovator' && editingTabId !== 'attractive' && editingTabId !== 'medics-innovator' && (
                <>
              {/* SECTION 1: HERO */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-[#F68E2D]/10 border border-[#F68E2D]/30 text-[#F68E2D] text-xs font-semibold tracking-wide">
                  {data.hero.headingTag[previewLang] || 'Empowering Growth'}
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                  {data.hero.mainTitle[previewLang] || 'Hero Title'}
                </h1>
                <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
                  {data.hero.description[previewLang]}
                </p>

                <div className="pt-6 flex items-center justify-center gap-4 max-w-md mx-auto bg-white/5 p-4 rounded-xl border border-white/10 text-left">
                  <img
                    src={data.hero.founder.image}
                    alt="Founder"
                    className="w-16 h-16 rounded-full object-cover border-2 border-[#F68E2D]"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                  <div className={previewLang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="font-bold text-white text-sm">
                      {data.hero.founder.name[previewLang]}
                    </p>
                    <p className="text-xs text-white/60 line-clamp-2">
                      {data.hero.founder.description[previewLang]}
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION 2: BRANDS */}
              <div className="space-y-4 text-center">
                <p className="text-xs uppercase tracking-widest text-white/40 font-semibold">
                  {previewLang === 'ar' ? 'شركاؤنا والعلامات الموثوقة' : 'Trusted by Leading Global Innovators'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 py-4 px-6 bg-white/5 rounded-2xl border border-white/5">
                  {data.trustedBrands.map((b, i) => (
                    <div key={i} className="flex items-center gap-2 group opacity-75 hover:opacity-100 transition-opacity">
                      {b.logoUrl && (
                        <img
                          src={b.logoUrl}
                          alt={b.name}
                          className="h-8 max-w-[120px] object-contain filter brightness-125"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=100&q=80';
                          }}
                        />
                      )}
                      <span className="text-xs font-medium text-white/80">{b.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: ABOUT & OUR SECTORS */}
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 h-64">
                    <img
                      src={data.aboutSectorsSection.image}
                      alt="About section"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md p-2.5 rounded-lg border border-white/10 flex items-center gap-2 text-xs text-white">
                      <MapPin className="w-4 h-4 text-[#F68E2D]" />
                      <span>{data.aboutSectorsSection.location[previewLang]}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {data.aboutSectorsSection.title[previewLang]}
                    </h2>
                    <p className="text-sm text-white/70 leading-relaxed">
                      {data.aboutSectorsSection.description[previewLang]}
                    </p>
                  </div>
                </div>

                {/* Our Sectors Pill Tags matching screenshot */}
                <div className="pt-6 border-t border-white/10 space-y-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {previewLang === 'ar' ? 'قطاعاتنا' : 'Our Sectors'}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2.5">
                    {data.aboutSectorsSection.sectors.map((sec, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/15 text-white shadow-sm transition-all"
                      >
                        {sec.title[previewLang] || (previewLang === 'ar' ? 'قطاع' : 'Sector')}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* SECTION 4: SPECIALIZED COMPANIES / DIVISIONS (IMAGE 1 TOP HALF) */}
              <div className="space-y-8 pt-6 border-t border-white/10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#F68E2D]">
                    {data.companiesSection?.tagline?.[previewLang] || 'OUR COMPANIES'}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    {data.companiesSection?.title?.[previewLang] || 'Three Specialized Divisions. One Group'}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/60">
                    {data.companiesSection?.description?.[previewLang]}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {(data.companiesSection?.companies || []).map((comp, idx) => (
                    <div
                      key={comp.id || idx}
                      className="p-6 rounded-3xl bg-[#0b1028]/90 border border-white/10 hover:border-[#F68E2D]/40 shadow-xl space-y-5 text-center flex flex-col justify-between transition-all"
                    >
                      <div className="space-y-4">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-white p-3 flex items-center justify-center shadow-md">
                          {comp.logoUrl ? (
                            <img
                              src={comp.logoUrl}
                              alt={comp.name[previewLang]}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <ImageIcon className="w-8 h-8 text-black/30" />
                          )}
                        </div>

                        <h3 className="text-lg font-bold text-white">
                          {comp.name[previewLang]}
                        </h3>

                        <p className="text-xs text-white/60 leading-relaxed">
                          {comp.description[previewLang]}
                        </p>
                      </div>

                      <div className="pt-2">
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white/90 border border-white/10">
                          {previewLang === 'ar' ? 'استكشف' : 'Explore'} &rarr;
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 5: PURPOSE, VISION & MISSION (IMAGE 1 BOTTOM HALF) */}
              <div className="space-y-8 pt-6 border-t border-white/10">
                <div className="text-center max-w-2xl mx-auto space-y-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                    {data.purposeSection?.tagline?.[previewLang] || 'OUR PURPOSE'}
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                    {data.purposeSection?.title?.[previewLang] || 'Driven by Vision. Defined by Purpose.'}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/60">
                    {data.purposeSection?.description?.[previewLang]}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(data.purposeSection?.tags || []).map((tag, idx) => (
                    <div
                      key={tag.id || idx}
                      className="p-6 rounded-2xl bg-[#0b1028]/90 border border-white/10 space-y-2.5 flex items-start gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                        {idx === 0 ? <Compass className="w-5 h-5" /> : <Target className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">
                          {tag.title[previewLang]}
                        </h4>
                        <p className="text-xs text-white/70 leading-relaxed mt-1">
                          {tag.description[previewLang]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Infographic Image */}
                {data.purposeSection?.image && (
                  <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
                    <img
                      src={data.purposeSection.image}
                      alt="Vision & Mission diagram"
                      className="w-full h-auto object-cover max-h-[480px]"
                    />
                  </div>
                )}
              </div>

              {/* SECTION 6: CTA BANNER (IMAGE 2) */}
              <div className="pt-6 border-t border-white/10">
                <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 text-center shadow-2xl bg-gradient-to-r from-[#701020] via-[#851828] to-[#450812] border border-red-500/30 space-y-5">
                  <div className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-black/20 text-white/80 border border-white/15">
                    {data.bannerSection?.tagline?.[previewLang] || "LET'S WORK TOGETHER"}
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-white max-w-3xl mx-auto leading-tight">
                    {data.bannerSection?.title?.[previewLang] || "Let's Build Something That Moves Business Forward."}
                  </h2>
                  <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto leading-relaxed">
                    {data.bannerSection?.description?.[previewLang]}
                  </p>
                  <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
                    <span className="px-6 py-3 rounded-full text-xs font-bold bg-white text-[#701020] shadow-xl hover:bg-white/90 transition-all cursor-pointer">
                      {data.bannerSection?.primaryButtonText?.[previewLang] || 'Get a Quote'} &rarr;
                    </span>
                    <span className="px-6 py-3 rounded-full text-xs font-bold bg-transparent border border-white/40 text-white hover:bg-white/10 transition-all cursor-pointer">
                      {data.bannerSection?.secondaryButtonText?.[previewLang] || 'Contact Us'}
                    </span>
                  </div>
                </div>
              </div>
              </>
              )}

            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CmsHomePage;
