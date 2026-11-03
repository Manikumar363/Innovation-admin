export interface BilingualText {
  en: string;
  ar: string;
}

export interface Founder {
  name: BilingualText;
  description: BilingualText;
  image?: string;
}

export interface HeroSection {
  mainTitle: BilingualText;
  headingTag: BilingualText;
  description: BilingualText;
  founder: Founder;
}

export interface TrustedBrand {
  name: string;
  logoUrl: string;
  websiteUrl?: string;
}

export interface SectorItem {
  id?: string;
  title: BilingualText;
  description: BilingualText;
  icon?: string;
}

export interface AboutSectorsSection {
  image?: string;
  title: BilingualText;
  description: BilingualText;
  location: BilingualText;
  sectors: SectorItem[];
}

// Section 4: Specialized Companies
export interface CompanyItem {
  id?: string;
  name: BilingualText;
  description: BilingualText;
  logoUrl: string;
  websiteUrl?: string;
}

export interface CompaniesSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  companies: CompanyItem[];
}

// Section 5: Purpose, Vision & Mission
export interface PurposeTag {
  id?: string;
  title: BilingualText;
  description: BilingualText;
}

export interface PurposeSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  image?: string;
  tags: PurposeTag[];
}

// Section 6: CTA Banner
export interface BannerSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  primaryButtonText: BilingualText;
  primaryButtonUrl?: string;
  secondaryButtonText: BilingualText;
  secondaryButtonUrl?: string;
}

export interface CmsHomeData {
  _id?: string;
  hero: HeroSection;
  trustedBrands: TrustedBrand[];
  aboutSectorsSection: AboutSectorsSection;
  companiesSection: CompaniesSection;
  purposeSection: PurposeSection;
  bannerSection: BannerSection;
  updatedAt?: string;
}

// ==================== CMS ABOUT US INTERFACES ====================
export interface AboutHeaderSection {
  title: BilingualText;
  description: BilingualText;
}

export interface AboutHeritageSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  image: string;
  badgeYear: string;
  badgeText: BilingualText;
}

export interface AboutJourneyItem {
  id?: string;
  number: string;
  title: BilingualText;
  description: BilingualText;
}

export interface AboutJourneySection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  items: AboutJourneyItem[];
}

export interface AboutStatItem {
  id?: string;
  number: string;
  description: BilingualText;
}

export interface AboutImpactSection {
  tagline: BilingualText;
  title: BilingualText;
  stats: AboutStatItem[];
}

// Section 5: Our Leadership
export interface AboutLeaderItem {
  id?: string;
  name: BilingualText;
  role: BilingualText;
  image: string;
}

export interface AboutLeadershipSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  leaders: AboutLeaderItem[];
}

// Section 6: Our Management Team
export interface AboutManagementMember {
  id?: string;
  name: BilingualText;
  role: BilingualText;
  image: string;
}

export interface AboutManagementDivision {
  id?: string;
  badge: string;
  companyName: BilingualText;
  description: BilingualText;
  linkText: BilingualText;
  linkUrl: string;
  logoUrl?: string;
  members: AboutManagementMember[];
}

export interface AboutManagementSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  divisions: AboutManagementDivision[];
}

// Section 7: Our Core Values
export interface AboutCoreValueItem {
  id?: string;
  number: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
}

export interface AboutCoreValuesSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  values: AboutCoreValueItem[];
}

// Section 8: Our History & Ownership
export interface AboutHistoryItem {
  id?: string;
  number: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
}

export interface AboutHistorySection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  items: AboutHistoryItem[];
}

// Section 9: Our Purpose
export interface AboutObjectiveItem {
  id?: string;
  number: string;
  icon: string;
  title: BilingualText;
}

export interface AboutPurposeSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  highlightTitle: BilingualText;
  highlightDescription: BilingualText;
  highlightIcon: string;
  objectivesTagline: BilingualText;
  objectivesTitle: BilingualText;
  objectives: AboutObjectiveItem[];
}

// Section 10: Call to Action Banner
export interface AboutBannerSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  primaryButtonText: BilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: BilingualText;
  secondaryButtonUrl: string;
}

export interface CmsAboutData {
  _id?: string;
  headerSection: AboutHeaderSection;
  heritageSection: AboutHeritageSection;
  journeySection: AboutJourneySection;
  impactSection: AboutImpactSection;
  leadershipSection: AboutLeadershipSection;
  managementSection: AboutManagementSection;
  coreValuesSection: AboutCoreValuesSection;
  historySection: AboutHistorySection;
  purposeSection: AboutPurposeSection;
  bannerSection: AboutBannerSection;
  updatedAt?: string;
}

// ==================== COMPANY PROFILE INTERFACES ====================
export interface CompanyCard {
  id?: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
}

export interface CompanyHeaderSection {
  title: BilingualText;
  description: BilingualText;
}

export interface CompanyWhoWeAreSection {
  tagline: BilingualText;
  title: BilingualText;
  description1: BilingualText;
  description2: BilingualText;
  cards: CompanyCard[];
}

export interface CompanyPrincipleItem {
  id?: string;
  en: string;
  ar: string;
}

export interface CompanyDownloadBox {
  title: BilingualText;
  description: BilingualText;
  buttonText: BilingualText;
  pdfUrl: string;
  pdfName?: string;
}

export interface CompanyWhatGuidesUsSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  principles: CompanyPrincipleItem[];
  downloadBox: CompanyDownloadBox;
}

export interface CmsCompanyData {
  _id?: string;
  headerSection: CompanyHeaderSection;
  whoWeAreSection: CompanyWhoWeAreSection;
  whatGuidesUsSection: CompanyWhatGuidesUsSection;
  updatedAt?: string;
}

// ==================== SERVICES INTERFACES ====================
export interface ServiceFeatureCard {
  id?: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
}

export interface BusinessAreaCard {
  id?: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
  linkUrl: string;
}

export interface ServicesHeaderSection {
  title: BilingualText;
  description: BilingualText;
  cards: ServiceFeatureCard[];
}

export interface ServicesBusinessAreasSection {
  title: BilingualText;
  description: BilingualText;
  cards: BusinessAreaCard[];
}

export interface CmsServicesData {
  _id?: string;
  headerSection: ServicesHeaderSection;
  businessAreasSection: ServicesBusinessAreasSection;
  updatedAt?: string;
}

// ==================== SHOP INTERFACES ====================
export interface ShopProductBadge {
  id?: string;
  en: string;
  ar: string;
}

export interface ShopProductCard {
  id?: string;
  image: string;
  brand: BilingualText;
  name: BilingualText;
  description: BilingualText;
  badges: ShopProductBadge[];
  buttonText: BilingualText;
  buttonUrl: string;
}

export interface ShopHeaderSection {
  title: BilingualText;
  description: BilingualText;
  products: ShopProductCard[];
}

export interface CmsShopData {
  _id?: string;
  headerSection: ShopHeaderSection;
  updatedAt?: string;
}

// ==================== PROJECTS INTERFACES ====================
export interface ProjectCard {
  id?: string;
  category: BilingualText;
  status: BilingualText;
  statusType: 'completed' | 'ongoing' | 'planned';
  title: BilingualText;
  description: BilingualText;
  linkUrl?: string;
}

export interface ProjectsHeaderSection {
  title: BilingualText;
  description: BilingualText;
  projects: ProjectCard[];
}

export interface ProjectsBannerSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  primaryButtonText: BilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: BilingualText;
  secondaryButtonUrl: string;
}

export interface CmsProjectsData {
  _id?: string;
  headerSection: ProjectsHeaderSection;
  bannerSection: ProjectsBannerSection;
  updatedAt?: string;
}

// ==================== PARTNERS INTERFACES ====================
export interface PartnerCard {
  id?: string;
  logoUrl: string;
  category: BilingualText;
  name: BilingualText;
  description: BilingualText;
  websiteUrl: string;
  linkText: BilingualText;
}

export interface PartnersHeaderSection {
  title: BilingualText;
  description: BilingualText;
  partners: PartnerCard[];
}

export interface PartnersBannerSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  primaryButtonText: BilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: BilingualText;
  secondaryButtonUrl: string;
}

export interface CmsPartnersData {
  _id?: string;
  headerSection: PartnersHeaderSection;
  bannerSection: PartnersBannerSection;
  updatedAt?: string;
}

// ==================== CONTACT INTERFACES ====================
export interface ContactHeaderSection {
  title: BilingualText;
  description: BilingualText;
  enquiryTitle: BilingualText;
  enquiryDescription: BilingualText;
}

export interface ContactCorporateOfficeSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  addressLabel: BilingualText;
  addressLine1: BilingualText;
  addressLine2: BilingualText;
  addressCityCountry: BilingualText;
  emailLabel: BilingualText;
  emailValue: string;
  phoneLabel: BilingualText;
  phoneValue: string;
  mapLocationUrl: string;
  mapEmbedUrl: string;
  mapButtonText: BilingualText;
}

export interface CmsContactData {
  _id?: string;
  headerSection: ContactHeaderSection;
  corporateOfficeSection: ContactCorporateOfficeSection;
  updatedAt?: string;
}

// ==================== PROJECTS INNOVATOR INTERFACES ====================
export interface BrandLogoItem {
  id: string;
  name: string;
  logoUrl: string;
}

export interface ProjectsInnovatorAreaItem {
  id: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
  linkUrl: string;
}

export interface ProjectsInnovatorHeroBannerSection {
  logoUrl: string;
  logoText: BilingualText;
  title: BilingualText;
  titleHighlight: BilingualText;
  description: BilingualText;
  primaryButtonText: BilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: BilingualText;
  secondaryButtonUrl: string;
  backgroundImageUrl: string;
}

export interface ProjectsInnovatorBrandsSection {
  title: BilingualText;
  brands: BrandLogoItem[];
}

export interface ProjectsInnovatorAboutSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  imageUrl: string;
}

export interface ProjectsInnovatorBusinessAreasSection {
  title: BilingualText;
  description: BilingualText;
  areas: ProjectsInnovatorAreaItem[];
}

export interface ProjectsInnovatorWorkTogetherSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  primaryButtonText: BilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: BilingualText;
  secondaryButtonUrl: string;
}

export interface CmsProjectsInnovatorData {
  _id?: string;
  heroBannerSection: ProjectsInnovatorHeroBannerSection;
  brandsSection: ProjectsInnovatorBrandsSection;
  aboutSection: ProjectsInnovatorAboutSection;
  businessAreasSection: ProjectsInnovatorBusinessAreasSection;
  workTogetherSection: ProjectsInnovatorWorkTogetherSection;
  updatedAt?: string;
}

// ==================== ATTRACTIVE & MEDICS INNOVATOR INTERFACES ====================
export interface ProductBadgeItem {
  id?: string;
  en: string;
  ar: string;
}

export interface EntityProductItem {
  id: string;
  image: string;
  brand: BilingualText;
  name: BilingualText;
  description: BilingualText;
  badges: ProductBadgeItem[];
  buttonText: BilingualText;
  buttonUrl: string;
}

export interface EntityProductsSection {
  title: BilingualText;
  description: BilingualText;
  products: EntityProductItem[];
  viewAllButtonText: BilingualText;
  viewAllButtonUrl: string;
}

export interface CmsAttractiveData {
  _id?: string;
  heroBannerSection: ProjectsInnovatorHeroBannerSection;
  brandsSection: ProjectsInnovatorBrandsSection;
  aboutSection: ProjectsInnovatorAboutSection;
  productsSection: EntityProductsSection;
  workTogetherSection: ProjectsInnovatorWorkTogetherSection;
  updatedAt?: string;
}

export interface CmsMedicsInnovatorData {
  _id?: string;
  heroBannerSection: ProjectsInnovatorHeroBannerSection;
  brandsSection: ProjectsInnovatorBrandsSection;
  aboutSection: ProjectsInnovatorAboutSection;
  productsSection: EntityProductsSection;
  workTogetherSection: ProjectsInnovatorWorkTogetherSection;
  updatedAt?: string;
}

// ==================== INVESTMENT INTERFACES ====================
export interface InvestmentHeaderSection {
  title: BilingualText;
  description: BilingualText;
}

export interface InvestmentMissionSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  image: string;
}

export interface InvestmentDriverItem {
  id?: string;
  number: string;
  title: BilingualText;
  description: BilingualText;
}

export interface InvestmentDriversSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  drivers: InvestmentDriverItem[];
}

export interface InvestmentSectorItem {
  id?: string;
  number: string;
  title: BilingualText;
  description: BilingualText;
  linkUrl?: string;
}

export interface InvestmentSectorsSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  sectors: InvestmentSectorItem[];
}

export interface InvestmentFactorItem {
  id?: string;
  icon: string;
  title: BilingualText;
  description: BilingualText;
}

export interface InvestmentFoundationBox {
  title: BilingualText;
  description: BilingualText;
}

export interface InvestmentEnvironmentSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  factors: InvestmentFactorItem[];
  foundationBox: InvestmentFoundationBox;
}

export interface InvestmentBannerSection {
  tagline: BilingualText;
  title: BilingualText;
  description: BilingualText;
  primaryButtonText: BilingualText;
  primaryButtonUrl: string;
  secondaryButtonText: BilingualText;
  secondaryButtonUrl: string;
}

export interface CmsInvestmentData {
  _id?: string;
  headerSection: InvestmentHeaderSection;
  missionSection: InvestmentMissionSection;
  driversSection: InvestmentDriversSection;
  sectorsSection: InvestmentSectorsSection;
  environmentSection: InvestmentEnvironmentSection;
  bannerSection: InvestmentBannerSection;
  updatedAt?: string;
}





export interface CmsSectionItem {
  id: string;
  title: BilingualText;
  subtitle?: BilingualText;
  description?: BilingualText;
  status: 'Active' | 'Draft';
  lastUpdated: string;
  iconName?: string;
  badgeColor?: 'green' | 'purple' | 'orange' | 'red' | 'blue';
  metadata?: Record<string, any>;
}

export interface CmsCardGroup {
  id: string;
  title: BilingualText;
  description: BilingualText;
  iconName: string;
  accentColor: 'green' | 'purple' | 'orange' | 'red' | 'blue';
  items: CmsSectionItem[];
}

export interface CmsTabConfig {
  id: string;
  label: string;
  labelAr: string;
  iconName: string;
  description: string;
  groups: CmsCardGroup[];
}

export const initialCmsHomeData: CmsHomeData = {
  hero: {
    mainTitle: {
      en: 'Driving Innovation for the Next Generation',
      ar: 'قيادة الابتكار للجيل القادم',
    },
    headingTag: {
      en: 'Empowering Visionaries & Sustainable Growth',
      ar: 'تمكين أصحاب الرؤى والنمو المستدام',
    },
    description: {
      en: 'We cultivate forward-thinking ecosystems, transformative investments, and cutting-edge digital solutions tailored to lead regional and global transformation.',
      ar: 'نعمل على تنمية أنظمة بيئية متطلعة للأمام، واستثمارات تحويلية، وحلول رقمية رائدة مصممة لقيادة التحول الإقليمي والعالمي.',
    },
    founder: {
      name: {
        en: 'Dr. Tariq Al-Mansoor',
        ar: 'د. طارق المنصور',
      },
      description: {
        en: 'Founder & Executive Chairman with over 20 years of leadership in venture acceleration, sovereign investment, and technological enterprise development.',
        ar: 'مؤسس ورئيس تنفيذي يتمتع بخبرة تزيد عن 20 عامًا في قيادة تسريع المشاريع، والاستثمار السيادي، وتطوير المشاريع التكنولوجية.',
      },
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
  },
  trustedBrands: [
    {
      name: 'Aramco Ventures',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: 'https://aramco.com',
    },
    {
      name: 'NEOM Tech',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: 'https://neom.com',
    },
    {
      name: 'SABIC Horizon',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: 'https://sabic.com',
    },
    {
      name: 'Global Innovation Hub',
      logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      websiteUrl: 'https://example.com',
    },
  ],
  aboutSectorsSection: {
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    title: {
      en: 'Shaping Tomorrow Across Key Industries',
      ar: 'صياغة المستقبل عبر القطاعات الرئيسية',
    },
    description: {
      en: 'Our strategic initiatives bridge visionary capital with high-impact technologies to accelerate real economic transformation across priority global sectors.',
      ar: 'تربط مبادراتنا الاستراتيجية بين رأس المال ذي الرؤية والتقنيات عالية التأثير لتسريع التحول الاقتصادي الحقيقي عبر القطاعات العالمية ذات الأولوية.',
    },
    location: {
      en: 'Riyadh, Kingdom of Saudi Arabia & Dubai, UAE',
      ar: 'الرياض، المملكة العربية السعودية ودبي، الإمارات العربية المتحدة',
    },
    sectors: [
      {
        id: 'sector-1',
        title: {
          en: 'Healthcare',
          ar: 'الرعاية الصحية',
        },
        description: { en: '', ar: '' },
      },
      {
        id: 'sector-2',
        title: {
          en: 'Construction',
          ar: 'البناء والتشييد',
        },
        description: { en: '', ar: '' },
      },
      {
        id: 'sector-3',
        title: {
          en: 'Trading',
          ar: 'التجارة',
        },
        description: { en: '', ar: '' },
      },
      {
        id: 'sector-4',
        title: {
          en: 'Investment',
          ar: 'الاستثمار',
        },
        description: { en: '', ar: '' },
      },
    ],
  },
  // Section 4: Specialized Companies
  companiesSection: {
    tagline: {
      en: 'OUR COMPANIES',
      ar: 'شركاتنا المتخصصة',
    },
    title: {
      en: 'Three Specialized Divisions. One Group',
      ar: 'ثلاثة أقسام متخصصة. مجموعة واحدة',
    },
    description: {
      en: 'Discover the specialized companies driving innovation and excellence across our group.',
      ar: 'اكتشف الشركات المتخصصة التي تقود الابتكار والتميز عبر مجموعتنا.',
    },
    companies: [
      {
        id: 'comp-1',
        name: {
          en: 'Projects Innovator',
          ar: 'مبتكر المشاريع',
        },
        description: {
          en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
          ar: 'تقديم حلول بناء وبنية تحتية مبتكرة تشكل المساحات الحديثة وتبني مستقبلاً أفضل.',
        },
        logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
        websiteUrl: '/projects-innovator',
      },
      {
        id: 'comp-2',
        name: {
          en: 'Attractive',
          ar: 'أتراكتيف',
        },
        description: {
          en: 'A diversified business group driving excellence across healthcare, construction, trading, and investment.',
          ar: 'مجموعة أعمال متنوعة تدفع التميز عبر الرعاية الصحية والبناء والتجارة والاستثمار.',
        },
        logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
        websiteUrl: '/attractive',
      },
      {
        id: 'comp-3',
        name: {
          en: 'Medios Innovator',
          ar: 'مبتكر ميديوس',
        },
        description: {
          en: 'Advancing healthcare through trusted medical solutions, quality healthcare products, and a commitment to better patient outcomes.',
          ar: 'الارتقاء بالرعاية الصحية من خلال حلول طبية موثوقة، ومنتجات رعاية صحية عالية الجودة، والتزام بنتائج أفضل للمرضى.',
        },
        logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80',
        websiteUrl: '/medios-innovator',
      },
    ],
  },
  // Section 5: Purpose, Vision & Mission
  purposeSection: {
    tagline: {
      en: 'OUR PURPOSE',
      ar: 'هدفنا ورؤيتنا',
    },
    title: {
      en: 'Driven by Vision. Defined by Purpose.',
      ar: 'مدفوعون بالرؤية. محددون بالهدف.',
    },
    description: {
      en: 'We bring businesses and people together through strategic investment, responsible development, and long-term partnerships.',
      ar: 'نجمع بين الشركات والأفراد من خلال الاستثمار الاستراتيجي والتنمية المسؤولة والشراكات طويلة الأجل.',
    },
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    tags: [
      {
        id: 'tag-1',
        title: {
          en: 'Our Vision',
          ar: 'رؤيتنا',
        },
        description: {
          en: 'To create meaningful opportunities for businesses and individuals through innovation, growth, and trusted partnerships.',
          ar: 'خلق فرص ذات مغزى للشركات والأفراد من خلال الابتكار والنمو والشراكات الموثوقة.',
        },
      },
      {
        id: 'tag-2',
        title: {
          en: 'Our Mission',
          ar: 'رسالتنا',
        },
        description: {
          en: 'To promote sustainable development by using resources responsibly and delivering lasting value to our partners and communities.',
          ar: 'تعزيز التنمية المستدامة من خلال استخدام الموارد بمسؤولية وتقديم قيمة دائمة لشركائنا ومجتمعاتنا.',
        },
      },
    ],
  },
  // Section 6: Banner
  bannerSection: {
    tagline: {
      en: "LET'S WORK TOGETHER",
      ar: 'لنعمل معاً',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
      ar: 'هل تبحث عن منتجات طبية، أو معدات، أو حلول صيدلانية، أو خدمات أعمال؟ فريقنا مستعد لمساعدتك في العثور على ما تحتاجه.',
    },
    primaryButtonText: {
      en: 'Get a Quote',
      ar: 'احصل على عرض سعر',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};




export const initialCmsServicesData: CmsServicesData = {
  headerSection: {
    title: {
      en: 'Our Services',
      ar: 'خدماتنا',
    },
    description: {
      en: 'Discover our medical equipment, laboratory supplies, and healthcare solutions designed to support healthcare professionals and facilities.',
      ar: 'اكتشف معداتنا الطبية ومستلزمات المختبرات والحلول الصحية المصممة لدعم المتخصصين والمنشآت الصحية.',
    },
    cards: [
      {
        id: 'card-service-1',
        icon: 'Microscope',
        title: {
          en: 'Comprehensive Medical & Laboratory Solutions',
          ar: 'حلول طبية ومخبرية شاملة',
        },
        description: {
          en: 'We provide comprehensive solutions in medical and laboratory equipment and supplies to support healthcare professionals and facilities.',
          ar: 'نقدم حلولاً شاملة في المعدات والمستلزمات الطبية والمخبرية لدعم المتخصصين والمنشآت الصحية.',
        },
      },
      {
        id: 'card-service-2',
        icon: 'Code2',
        title: {
          en: 'Globally Certified Advanced Technologies',
          ar: 'تقنيات متقدمة معتمدة عالمياً',
        },
        description: {
          en: 'We deliver advanced, globally certified technologies that support modern healthcare services and improve quality of life.',
          ar: 'نقدم تقنيات متطورة ومعتمدة دولياً تدعم خدمات الرعاية الصحية الحديثة وتحسن جودة الحياة.',
        },
      },
      {
        id: 'card-service-3',
        icon: 'ShieldCheck',
        title: {
          en: 'International Standards of Quality & Safety',
          ar: 'معايير الجودة والسلامة الدولية',
        },
        description: {
          en: 'We focus on providing certified products that meet international standards for quality, reliability, and safety.',
          ar: 'نركز على توفير منتجات معتمدة تلبي المعايير الدولية للجودة والموثوقية والسلامة.',
        },
      },
      {
        id: 'card-service-4',
        icon: 'Handshake',
        title: {
          en: 'Strategic Healthcare Partnerships',
          ar: 'شراكات استراتيجية في الرعاية الصحية',
        },
        description: {
          en: 'Through partnerships with leading global and local manufacturers, we serve hospitals, clinics, laboratories, and research centers.',
          ar: 'من خلال الشراكات مع كبرى الشركات المصنعة العالمية والمحلية، نخدم المستشفيات والعيادات والمختبرات ومراكز الأبحاث.',
        },
      },
    ],
  },

  businessAreasSection: {
    title: {
      en: 'Our Business Areas',
      ar: 'مجالات أعمالنا',
    },
    description: {
      en: 'Explore the sectors and services that form the Projects Innovator group.',
      ar: 'استكشف القطاعات والخدمات التي تشكل مجموعة مبتكر المشاريع.',
    },
    cards: [
      {
        id: 'card-area-1',
        icon: 'Microscope',
        title: {
          en: 'Medical & Laboratory Equipment',
          ar: 'المعدات الطبية والمخبرية',
        },
        description: {
          en: 'Comprehensive medical device solutions and laboratory testing equipment.',
          ar: 'حلول شاملة للأجهزة الطبية ومعدات الفحص المخبري.',
        },
        linkUrl: '/services/medical-equipment',
      },
      {
        id: 'card-area-2',
        icon: 'FlaskConical',
        title: {
          en: 'Laboratory Supplies',
          ar: 'المستلزمات المخبرية',
        },
        description: {
          en: 'Reliable laboratory supplies and essential equipment for research, testing, and diagnostic facilities.',
          ar: 'مستلزمات مخبرية موثوقة ومعدات أساسية لمرافق الأبحاث والاختبار والتشخيص.',
        },
        linkUrl: '/services/laboratory-supplies',
      },
      {
        id: 'card-area-3',
        icon: 'Stethoscope',
        title: {
          en: 'Healthcare Solutions',
          ar: 'حلول الرعاية الصحية',
        },
        description: {
          en: 'Quality healthcare products and solutions designed to support medical professionals and healthcare facilities.',
          ar: 'منتجات وحلول رعاية صحية عالية الجودة مصممة لدعم المتخصصين في المجال الطبي والمرافق الصحية.',
        },
        linkUrl: '/services/healthcare-solutions',
      },
      {
        id: 'card-area-4',
        icon: 'ShieldCheck',
        title: {
          en: 'Quality & Safety Standards',
          ar: 'معايير الجودة والسلامة',
        },
        description: {
          en: 'Products selected with a focus on quality, reliability, and compliance with applicable safety standards.',
          ar: 'منتجات مختارة مع التركيز على الجودة والموثوقية والامتثال لمعايير السلامة المعمول بها.',
        },
        linkUrl: '/services/standards',
      },
    ],
  },
};

export const initialCmsShopData: CmsShopData = {
  headerSection: {
    title: {
      en: 'Our Products',
      ar: 'منتجاتنا',
    },
    description: {
      en: 'Explore our range of medical equipment and healthcare solutions. Contact our team to request a quote tailored to your requirements.',
      ar: 'استكشف مجموعتنا من المعدات الطبية والحلول الصحية. تواصل مع فريقنا لطلب عرض أسعار مصمم خصيصاً لاحتياجاتك.',
    },
    products: [
      {
        id: 'prod-1',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
        brand: {
          en: 'MedTech',
          ar: 'ميدتك',
        },
        name: {
          en: 'Patient Monitor',
          ar: 'شاشة مراقبة المريض',
        },
        description: {
          en: 'A medical monitoring device designed to track vital signs and support patient observation in clinical environments.',
          ar: 'جهاز مراقبة طبي مصمم لتتبع العلامات الحيوية ودعم ملاحظة المريض في البيئات السريرية.',
        },
        badges: [
          { id: 'b1-1', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b1-2', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
          { id: 'b1-3', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: {
          en: 'Request a Quote',
          ar: 'طلب عرض أسعار',
        },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-2',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
        brand: {
          en: 'SonoCare',
          ar: 'سونوكير',
        },
        name: {
          en: 'Digital Ultrasound System',
          ar: 'نظام الموجات فوق الصوتية الرقمي',
        },
        description: {
          en: 'An ultrasound imaging system designed to support diagnostic examinations in hospitals and healthcare facilities.',
          ar: 'نظام تصوير بالموجات فوق الصوتية مصمم لدعم الفحوصات التشخيصية في المستشفيات والمنشآت الصحية.',
        },
        badges: [
          { id: 'b2-1', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b2-2', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: {
          en: 'Request a Quote',
          ar: 'طلب عرض أسعار',
        },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-3',
        image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80',
        brand: {
          en: 'CareFlow',
          ar: 'كيرفلو',
        },
        name: {
          en: 'Infusion Pump',
          ar: 'مضخة الحقن الوريدي',
        },
        description: {
          en: 'A medical device designed for the controlled delivery of fluids and medications in clinical settings.',
          ar: 'جهاز طبي مصمم للحقن الدقيق والمتحكم فيه للسوائل والأدوية في البيئات السريرية.',
        },
        badges: [
          { id: 'b3-1', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b3-2', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
        ],
        buttonText: {
          en: 'Request a Quote',
          ar: 'طلب عرض أسعار',
        },
        buttonUrl: '/contact',
      },
    ],
  },
};

export const initialCmsProjectsData: CmsProjectsData = {
  headerSection: {
    title: {
      en: 'Our Projects',
      ar: 'مشاريعنا',
    },
    description: {
      en: 'Explore our projects, discover innovative ideas, and see how we turn our vision into impactful solutions that create lasting value.',
      ar: 'استكشف مشاريعنا، واكتشف الأفكار المبتكرة، وشاهد كيف نحول رؤيتنا إلى حلول مؤثرة تخلق قيمة دائمة.',
    },
    projects: [
      {
        id: 'proj-1',
        category: {
          en: 'Urban Innovation',
          ar: 'الابتكار الحضري',
        },
        status: {
          en: 'Completed',
          ar: 'مكتمل',
        },
        statusType: 'completed',
        title: {
          en: 'Smart City Development',
          ar: 'تطوير المدن الذكية',
        },
        description: {
          en: 'Developing intelligent urban solutions that improve infrastructure, optimize public services, and create sustainable communities.',
          ar: 'تطوير حلول حضرية ذكية تعمل على تحسين البنية التحتية، وتحسين الخدمات العامة، وبناء مجتمعات مستدامة.',
        },
        linkUrl: '/projects/smart-city',
      },
      {
        id: 'proj-2',
        category: {
          en: 'Technology',
          ar: 'التكنولوجيا والتحول الرقمي',
        },
        status: {
          en: 'Ongoing',
          ar: 'قيد التنفيذ',
        },
        statusType: 'ongoing',
        title: {
          en: 'Digital Transformation',
          ar: 'التحول الرقمي المؤسسي',
        },
        description: {
          en: 'Helping organizations modernize their operations through digital platforms, streamlined workflows, and innovative technologies.',
          ar: 'مساعدة المؤسسات على تحديث عملياتها من خلال المنصات الرقمية، وسير العمل المبسط، والتقنيات المبتكرة.',
        },
        linkUrl: '/projects/digital-transformation',
      },
      {
        id: 'proj-3',
        category: {
          en: 'Sustainability',
          ar: 'الاستدامة والبيئة',
        },
        status: {
          en: 'Ongoing',
          ar: 'قيد التنفيذ',
        },
        statusType: 'ongoing',
        title: {
          en: 'Sustainable Energy Initiative',
          ar: 'مبادرة الطاقة المستدامة',
        },
        description: {
          en: 'Promoting sustainable energy solutions that support environmental responsibility and long-term resource efficiency.',
          ar: 'تعزيز حلول الطاقة المستدامة التي تدعم المسؤولية البيئية وكفاءة الموارد على المدى الطويل.',
        },
        linkUrl: '/projects/sustainable-energy',
      },
      {
        id: 'proj-4',
        category: {
          en: 'Social Impact',
          ar: 'الأثر الاجتماعي',
        },
        status: {
          en: 'Completed',
          ar: 'مكتمل',
        },
        statusType: 'completed',
        title: {
          en: 'Community Development',
          ar: 'تنمية المجتمع المحلي',
        },
        description: {
          en: 'Supporting community growth through inclusive initiatives, local engagement, and improved access to essential opportunities.',
          ar: 'دعم نمو المجتمع من خلال المبادرات الشاملة، والمشاركة المحلية، وتحسين الوصول إلى الفرص الأساسية.',
        },
        linkUrl: '/projects/community-development',
      },
      {
        id: 'proj-5',
        category: {
          en: 'Research & Development',
          ar: 'البحث والتطوير',
        },
        status: {
          en: 'Ongoing',
          ar: 'قيد التنفيذ',
        },
        statusType: 'ongoing',
        title: {
          en: 'Innovation Research Hub',
          ar: 'مركز أبحاث الابتكار',
        },
        description: {
          en: 'Encouraging research, collaboration, and the development of practical solutions to emerging industry challenges.',
          ar: 'تشجيع البحث والتعاون وتطوير حلول عملية لتحديات الصناعة الناشئة.',
        },
        linkUrl: '/projects/innovation-hub',
      },
      {
        id: 'proj-6',
        category: {
          en: 'Education',
          ar: 'التعليم والمعرفة',
        },
        status: {
          en: 'Planned',
          ar: 'مخطط له',
        },
        statusType: 'planned',
        title: {
          en: 'Digital Learning Platform',
          ar: 'منصة التعلم الرقمي',
        },
        description: {
          en: 'Expanding access to learning through digital experiences designed to support knowledge sharing and skill development.',
          ar: 'توسيع نطاق الوصول إلى التعلم من خلال التجارب الرقمية المصممة لدعم مشاركة المعرفة وتنمية المهارات.',
        },
        linkUrl: '/projects/digital-learning',
      },
    ],
  },
  bannerSection: {
    tagline: {
      en: "LET'S WORK TOGETHER",
      ar: 'لنعمل معاً',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
      ar: 'هل تبحث عن منتجات طبية، معدات، حلول صيدلانية، أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
    },
    primaryButtonText: {
      en: 'Get a Quote',
      ar: 'احصل على عرض أسعار',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};

export const initialCmsPartnersData: CmsPartnersData = {
  headerSection: {
    title: {
      en: 'Our Partners',
      ar: 'شركاؤنا',
    },
    description: {
      en: 'Meet the trusted partners who share our vision, strengthen our capabilities, and help us drive innovation and create lasting impact together.',
      ar: 'تعرف على الشركاء الموثوقين الذين يشاركوننا رؤيتنا، ويعززون قدراتنا، ويساعدوننا في دفع عجلة الابتكار وإحداث تأثير دائم معاً.',
    },
    partners: [
      {
        id: 'partner-1',
        logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Technology Partner',
          ar: 'شريك تكنولوجي',
        },
        name: {
          en: 'Microsoft',
          ar: 'مايكروسوفت',
        },
        description: {
          en: 'Empowering digital transformation through cloud computing, productivity tools, and innovative technology solutions.',
          ar: 'تمكين التحول الرقمي من خلال الحوسبة السحابية، وأدوات الإنتاجية، وحلول التكنولوجيا المبتكرة.',
        },
        websiteUrl: 'https://microsoft.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-2',
        logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Technology Partner',
          ar: 'شريك تكنولوجي',
        },
        name: {
          en: 'Google',
          ar: 'جوجل',
        },
        description: {
          en: 'Driving innovation through advanced digital technologies, cloud infrastructure, and intelligent solutions.',
          ar: 'قيادة الابتكار من خلال التقنيات الرقمية المتقدمة، والبنية التحتية السحابية، والحلول الذكية.',
        },
        websiteUrl: 'https://google.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-3',
        logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Cloud Partner',
          ar: 'شريك سحابي',
        },
        name: {
          en: 'Amazon Web Services',
          ar: 'أمازون لخدمات الويب',
        },
        description: {
          en: 'Supporting scalable and reliable digital experiences through cloud infrastructure and modern technology services.',
          ar: 'دعم التجارب الرقمية الموثوقة والقابلة للتطوير من خلال البنية التحتية السحابية والخدمات التكنولوجية الحديثة.',
        },
        websiteUrl: 'https://aws.amazon.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-4',
        logoUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Strategic Partner',
          ar: 'شريك استراتيجي',
        },
        name: {
          en: 'IBM',
          ar: 'آي بي إم',
        },
        description: {
          en: 'Combining expertise in AI, data, and enterprise technology to help organizations solve complex challenges.',
          ar: 'الجمع بين الخبرة في الذكاء الاصطناعي، والبيانات، وتكنولوجيا المؤسسات لمساعدة المنظمات في حل التحديات المعقدة.',
        },
        websiteUrl: 'https://ibm.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-5',
        logoUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Creative Partner',
          ar: 'شريك إبداعي',
        },
        name: {
          en: 'Adobe',
          ar: 'أدوبي',
        },
        description: {
          en: 'Enabling creative collaboration and engaging digital experiences through design and digital experience solutions.',
          ar: 'تمكين التعاون الإبداعي والتجارب الرقمية الجذابة من خلال حلول التصميم والخبرات الرقمية.',
        },
        websiteUrl: 'https://adobe.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
      {
        id: 'partner-6',
        logoUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
        category: {
          en: 'Innovation Partner',
          ar: 'شريك الابتكار',
        },
        name: {
          en: 'NVIDIA',
          ar: 'إنفيديا',
        },
        description: {
          en: 'Advancing innovation through accelerated computing, artificial intelligence, and high-performance computing platforms.',
          ar: 'دفع عجلة الابتكار من خلال الحوسبة المتسارعة، والذكاء الاصطناعي، ومنصات الحوسبة عالية الأداء.',
        },
        websiteUrl: 'https://nvidia.com',
        linkText: {
          en: 'Visit website',
          ar: 'زيارة الموقع',
        },
      },
    ],
  },
  bannerSection: {
    tagline: {
      en: "LET'S WORK TOGETHER",
      ar: 'لنعمل معاً',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
      ar: 'هل تبحث عن منتجات طبية، معدات، حلول صيدلانية، أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
    },
    primaryButtonText: {
      en: 'Get a Quote',
      ar: 'احصل على عرض أسعار',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};

export const initialCmsContactData: CmsContactData = {
  headerSection: {
    title: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    description: {
      en: 'Get in touch with our team to discuss your ideas, explore collaboration opportunities, or learn more about our solutions.',
      ar: 'تواصل مع فريقنا لمناقشة أفكارك واستكشاف فرص التعاون أو معرفة المزيد عن حلولنا.',
    },
    enquiryTitle: {
      en: 'Send an Enquiry',
      ar: 'أرسل استفسارك',
    },
    enquiryDescription: {
      en: 'Have a question or need more information about our services? Fill out the form below, and our team will get back to you.',
      ar: 'هل لديك سؤال أو تحتاج إلى مزيد من المعلومات حول خدماتنا؟ املأ النموذج أدناه وسيقوم فريقنا بالرد عليك.',
    },
  },
  corporateOfficeSection: {
    tagline: {
      en: 'GET IN TOUCH',
      ar: 'تواصل معنا',
    },
    title: {
      en: 'Corporate Office',
      ar: 'المكتب الرئيسي',
    },
    description: {
      en: 'Visit our headquarters or contact our team for enquiries and collaboration opportunities.',
      ar: 'تفضل بزيارة مقرنا الرئيسي أو تواصل مع فريقنا للاستفسارات وفرص التعاون.',
    },
    addressLabel: {
      en: 'Office Address',
      ar: 'عنوان المكتب',
    },
    addressLine1: {
      en: 'Mobtaker Group Headquarters',
      ar: 'المقر الرئيسي لمجموعة مبتكر',
    },
    addressLine2: {
      en: 'Al-Mansour District',
      ar: 'حي المنصور',
    },
    addressCityCountry: {
      en: 'Baghdad, Iraq',
      ar: 'بغداد، العراق',
    },
    emailLabel: {
      en: 'Email Address',
      ar: 'البريد الإلكتروني',
    },
    emailValue: 'info@mobtakergroup.com',
    phoneLabel: {
      en: 'Phone Number',
      ar: 'رقم الهاتف',
    },
    phoneValue: '+964 (0) 123 456 789',
    mapLocationUrl: 'https://maps.google.com/?q=Al-Mansour,Baghdad,Iraq',
    mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106637.74798679462!2d44.31688691512807!3d33.31524103134958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15577f67a0a74193%3A0x9a7d3298c92a95c4!2sBaghdad%2C%20Iraq!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
    mapButtonText: {
      en: 'Open in Maps',
      ar: 'فتح في خرائط جوجل',
    },
  },
};

export const initialCmsProjectsInnovatorData: CmsProjectsInnovatorData = {
  heroBannerSection: {
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    logoText: {
      en: 'PROJECTS INNOVATOR',
      ar: 'شركة مبتكر المشاريع',
    },
    title: {
      en: 'Building Tomorrow',
      ar: 'بناء الغد',
    },
    titleHighlight: {
      en: 'Through Innovation',
      ar: 'من خلال الابتكار',
    },
    description: {
      en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
      ar: 'تقديم حلول مبتكرة في البناء والبنية التحتية لتشكيل المساحات الحديثة وبناء مستقبل أفضل.',
    },
    primaryButtonText: {
      en: 'Explore Our Services',
      ar: 'استكشف خدماتنا',
    },
    primaryButtonUrl: '/services',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
  },
  brandsSection: {
    title: {
      en: 'TRUSTED BRANDS & INDUSTRY LEADERS',
      ar: 'العلامات التجارية الموثوقة وقادة الصناعة',
    },
    brands: [
      {
        id: 'brand-1',
        name: 'Oracle',
        logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'brand-2',
        name: 'ATRIKTIF',
        logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'brand-3',
        name: 'Winners',
        logoUrl: 'https://images.unsplash.com/photo-1516876437184-593fda40c7ce?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'brand-4',
        name: 'AKS Group',
        logoUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80',
      },
    ],
  },
  aboutSection: {
    tagline: {
      en: 'ABOUT PROJECTS INNOVATOR',
      ar: 'عن مبتكر المشاريع',
    },
    title: {
      en: 'More Than a Company, A Platform for Sustainable Growth.',
      ar: 'أكثر من مجرد شركة، منصة للنمو المستدام.',
    },
    description: {
      en: 'Projects Innovator is the parent and holding entity of Mobtaker Group, operating across multiple sectors including healthcare, construction, trading, and investment. We create value through strategic partnerships, innovation, and a commitment to excellence.',
      ar: 'تعتبر مبتكر المشاريع الكيان القابض والأم لمجموعة مبتكر، وتعمل عبر قطاعات متعددة تشمل الرعاية الصحية، والبناء، والتجارة، والاستثمار. نخلق القيمة من خلال الشراكات الاستراتيجية، والابتكار، والالتزام بالتميز.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
  },
  businessAreasSection: {
    title: {
      en: 'Our Business Areas',
      ar: 'مجالات أعمالنا',
    },
    description: {
      en: 'Explore the sectors and services that form the Projects Innovator group.',
      ar: 'استكشف القطاعات والخدمات التي تشكل مجموعة مبتكر المشاريع.',
    },
    areas: [
      {
        id: 'area-1',
        icon: 'microscope',
        title: {
          en: 'Medical & Laboratory Equipment',
          ar: 'الأجهزة الطبية والمخبرية',
        },
        description: {
          en: 'Comprehensive medical device solutions and laboratory testing equipment.',
          ar: 'حلول شاملة للأجهزة الطبية ومعدات الاختبارات المختبرية.',
        },
        linkUrl: '/services',
      },
      {
        id: 'area-2',
        icon: 'flask',
        title: {
          en: 'Laboratory Supplies',
          ar: 'المستلزمات المختبرية',
        },
        description: {
          en: 'Reliable laboratory supplies and essential equipment for research, testing, and diagnostic facilities.',
          ar: 'مستلزمات مخبرية موثوقة ومعدات أساسية لمنشآت البحث والاختبار والتشخيص.',
        },
        linkUrl: '/services',
      },
      {
        id: 'area-3',
        icon: 'heart',
        title: {
          en: 'Healthcare Solutions',
          ar: 'حلول الرعاية الصحية',
        },
        description: {
          en: 'Quality healthcare products and solutions designed to support medical professionals and healthcare facilities.',
          ar: 'منتجات وحلول رعاية صحية عالية الجودة لدعم الكوادر والمنشآت الطبية.',
        },
        linkUrl: '/services',
      },
    ],
  },
  workTogetherSection: {
    tagline: {
      en: "LET'S WORK TOGETHER",
      ar: 'دعنا نعمل معاً',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
      ar: 'هل تبحث عن منتجات طبية، معدات، حلول دوائية، أو خدمات تجارية؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
    },
    primaryButtonText: {
      en: 'Get a Quote',
      ar: 'احصل على عرض أسعار',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};

export const initialCmsAttractiveData: CmsAttractiveData = {
  heroBannerSection: {
    logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    logoText: {
      en: 'ATTRACTIVE',
      ar: 'أتراكتيف',
    },
    title: {
      en: 'Building Tomorrow',
      ar: 'بناء الغد',
    },
    titleHighlight: {
      en: 'Through Innovation',
      ar: 'من خلال الابتكار',
    },
    description: {
      en: 'Delivering innovative solutions, high-grade medical systems, and modern infrastructure that shape a better future.',
      ar: 'تقديم حلول مبتكرة وأنظمة طبية متطورة وبنية تحتية حديثة تشكل مستقبلاً أفضل.',
    },
    primaryButtonText: {
      en: 'Explore Our Services →',
      ar: 'استكشف خدماتنا ←',
    },
    primaryButtonUrl: '/services',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
  },
  brandsSection: {
    title: {
      en: 'TRUSTED BRANDS & INDUSTRY LEADERS',
      ar: 'العلامات التجارية الموثوقة ورواد الصناعة',
    },
    brands: [
      {
        id: 'brand-1',
        name: 'Oracle',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
      },
      {
        id: 'brand-2',
        name: 'Atriktif',
        logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'brand-3',
        name: 'Winners',
        logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'brand-4',
        name: 'AKS Group',
        logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
      },
    ],
  },
  aboutSection: {
    tagline: {
      en: 'ABOUT ATTRACTIVE',
      ar: 'عن أتراكتيف',
    },
    title: {
      en: 'More Than a Company, A Platform for Sustainable Growth.',
      ar: 'أكثر من مجرد شركة، منصة للنمو المستدام.',
    },
    description: {
      en: 'Attractive drives excellence across healthcare, advanced equipment, and modern commerce. We forge enduring partnerships and implement state-of-the-art technological solutions that elevate everyday life and drive organizational growth.',
      ar: 'تقود أتراكتيف التميز عبر الرعاية الصحية والمعدات المتقدمة والتجارة الحديثة. نحن نبني شراكات دائمة ونطبق حلولاً تكنولوجية متطورة ترتقي بالحياة اليومية وتدفع النمو المؤسسي.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  },
  productsSection: {
    title: {
      en: 'Our Products',
      ar: 'منتجاتنا',
    },
    description: {
      en: 'Explore our range of high-quality medical equipment and solutions designed to meet your needs.',
      ar: 'استكشف مجموعتنا من المعدات والحلول الطبية عالية الجودة والمصممة لتلبية احتياجاتك.',
    },
    products: [
      {
        id: 'prod-1',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
        brand: { en: 'MedTech', ar: 'ميدتيك' },
        name: { en: 'Patient Monitor', ar: 'شاشة مراقبة المريض' },
        description: {
          en: 'A medical monitoring device designed to track vital signs and support patient observation in clinical environments.',
          ar: 'جهاز مراقبة طبي مصمم لتتبع العلامات الحيوية ودعم مراقبة المرضى في البيئات السريرية.',
        },
        badges: [
          { id: 'b1', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b2', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
          { id: 'b3', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-2',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
        brand: { en: 'SonoCare', ar: 'سونوكير' },
        name: { en: 'Digital Ultrasound System', ar: 'نظام الموجات فوق الصوتية الرقمي' },
        description: {
          en: 'An ultrasound imaging system designed to support diagnostic examinations in hospitals and healthcare facilities.',
          ar: 'نظام تصوير بالموجات فوق الصوتية مصمم لدعم الفحوصات التشخيصية في المستشفيات والمرافق الصحية.',
        },
        badges: [
          { id: 'b4', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b5', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-3',
        image: 'https://images.unsplash.com/photo-1583912267670-6575ad3726f9?auto=format&fit=crop&w=600&q=80',
        brand: { en: 'CareFlow', ar: 'كيرفلو' },
        name: { en: 'Infusion Pump', ar: 'مضخة التسريب الوريدي' },
        description: {
          en: 'A medical device designed for the controlled delivery of fluids and medications in clinical settings.',
          ar: 'جهاز طبي مصمم للتحكم الدقيق في توصيل السوائل والأدوية في البيئات السريرية.',
        },
        badges: [
          { id: 'b6', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b7', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
        ],
        buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
        buttonUrl: '/contact',
      },
    ],
    viewAllButtonText: {
      en: 'View All Products',
      ar: 'عرض جميع المنتجات',
    },
    viewAllButtonUrl: '/shop',
  },
  workTogetherSection: {
    tagline: {
      en: "— LET'S WORK TOGETHER —",
      ar: '— لنعمل معاً —',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Partner with Attractive to innovate and deliver cutting-edge solutions across modern enterprise and healthcare sectors.',
      ar: 'شارك أتراكتيف للابتكار وتقديم حلول متطورة عبر قطاعات الأعمال الحديثة والرعاية الصحية.',
    },
    primaryButtonText: {
      en: 'Get a Quote ↗',
      ar: 'احصل على عرض أسعار ↗',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};

export const initialCmsMedicsInnovatorData: CmsMedicsInnovatorData = {
  heroBannerSection: {
    logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=150&q=80',
    logoText: {
      en: 'MEDICS INNOVATOR',
      ar: 'ميديكس إنوفيتور',
    },
    title: {
      en: 'Advancing Healthcare',
      ar: 'الارتقاء بالرعاية الصحية',
    },
    titleHighlight: {
      en: 'Through Innovation',
      ar: 'من خلال الابتكار',
    },
    description: {
      en: 'Supplying globally certified medical equipment, diagnostics, and clinical technologies to support modern healthcare facilities and improve lives.',
      ar: 'توريد أجهزة طبية معتمدة عالمياً وحلول تشخيصية وتقنيات سريرية لدعم المرافق الصحية الحديثة وتحسين جودة الحياة.',
    },
    primaryButtonText: {
      en: 'Explore Our Products →',
      ar: 'استكشف منتجاتنا ←',
    },
    primaryButtonUrl: '/shop',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
    backgroundImageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80',
  },
  brandsSection: {
    title: {
      en: 'TRUSTED BRANDS & INDUSTRY LEADERS',
      ar: 'العلامات التجارية الموثوقة ورواد الصناعة',
    },
    brands: [
      {
        id: 'brand-1',
        name: 'Oracle Health',
        logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
      },
      {
        id: 'brand-2',
        name: 'SonoCare Systems',
        logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'brand-3',
        name: 'MedTech Global',
        logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
      },
      {
        id: 'brand-4',
        name: 'CareFlow Medical',
        logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
      },
    ],
  },
  aboutSection: {
    tagline: {
      en: 'ABOUT MEDICS INNOVATOR',
      ar: 'عن ميديكس إنوفيتور',
    },
    title: {
      en: 'More Than a Medical Provider, A Partner in Clinical Excellence.',
      ar: 'أكثر من مجرد مزود طبي، شريك في التميز السريري.',
    },
    description: {
      en: 'Medics Innovator specializes in delivering certified medical equipment, clinical instrumentation, and hospital infrastructure solutions. We work directly with leading global manufacturers to ensure healthcare providers achieve maximum precision and patient safety.',
      ar: 'تتخصص ميديكس إنوفيتور في تقديم المعدات الطبية المعتمدة والأجهزة السريرية وحلول البنية التحتية للمستشفيات. نعمل مباشرة مع كبرى الشركات المصنعة عالمياً لضمان تحقيق مقدمي الرعاية لأعلى مستويات الدقة وسلامة المرضى.',
    },
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
  },
  productsSection: {
    title: {
      en: 'Our Products',
      ar: 'منتجاتنا',
    },
    description: {
      en: 'Explore our range of high-quality medical equipment and solutions designed to meet your needs.',
      ar: 'استكشف مجموعتنا من المعدات والحلول الطبية عالية الجودة والمصممة لتلبية احتياجاتك.',
    },
    products: [
      {
        id: 'prod-1',
        image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80',
        brand: { en: 'MedTech', ar: 'ميدتيك' },
        name: { en: 'Patient Monitor', ar: 'شاشة مراقبة المريض' },
        description: {
          en: 'A medical monitoring device designed to track vital signs and support patient observation in clinical environments.',
          ar: 'جهاز مراقبة طبي مصمم لتتبع العلامات الحيوية ودعم مراقبة المرضى في البيئات السريرية.',
        },
        badges: [
          { id: 'b1', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b2', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
          { id: 'b3', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-2',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80',
        brand: { en: 'SonoCare', ar: 'سونوكير' },
        name: { en: 'Digital Ultrasound System', ar: 'نظام الموجات فوق الصوتية الرقمي' },
        description: {
          en: 'An ultrasound imaging system designed to support diagnostic examinations in hospitals and healthcare facilities.',
          ar: 'نظام تصوير بالموجات فوق الصوتية مصمم لدعم الفحوصات التشخيصية في المستشفيات والمرافق الصحية.',
        },
        badges: [
          { id: 'b4', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b5', en: 'ISO Certified', ar: 'معتمد من ISO' },
        ],
        buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
        buttonUrl: '/contact',
      },
      {
        id: 'prod-3',
        image: 'https://images.unsplash.com/photo-1583912267670-6575ad3726f9?auto=format&fit=crop&w=600&q=80',
        brand: { en: 'CareFlow', ar: 'كيرفلو' },
        name: { en: 'Infusion Pump', ar: 'مضخة التسريب الوريدي' },
        description: {
          en: 'A medical device designed for the controlled delivery of fluids and medications in clinical settings.',
          ar: 'جهاز طبي مصمم للتحكم الدقيق في توصيل السوائل والأدوية في البيئات السريرية.',
        },
        badges: [
          { id: 'b6', en: 'CE Certified', ar: 'معتمد من CE' },
          { id: 'b7', en: 'FDA Registered', ar: 'مسجل لدى FDA' },
        ],
        buttonText: { en: 'Request a Quote ↗', ar: 'طلب عرض أسعار ↗' },
        buttonUrl: '/contact',
      },
    ],
    viewAllButtonText: {
      en: 'View All Products',
      ar: 'عرض جميع المنتجات',
    },
    viewAllButtonUrl: '/shop',
  },
  workTogetherSection: {
    tagline: {
      en: "— LET'S WORK TOGETHER —",
      ar: '— لنعمل معاً —',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Partner with Medics Innovator to equip your medical facility with world-class clinical technologies and trusted supplies.',
      ar: 'تشارك مع ميديكس إنوفيتور لتجهيز منشأتك الطبية بأحدث التقنيات السريرية العالمية والإمدادات الموثوقة.',
    },
    primaryButtonText: {
      en: 'Get a Quote ↗',
      ar: 'احصل على عرض أسعار ↗',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};

export const initialCmsInvestmentData: CmsInvestmentData = {
  headerSection: {
    title: {
      en: 'Investment Opportunities',
      ar: 'فرص الاستثمار',
    },
    description: {
      en: 'Explore investment opportunities with Mobtaker Group and discover how we create value through innovation, strategic partnerships, and sustainable growth.',
      ar: 'استكشف فرص الاستثمار مع مجموعة مبتكر واكتشف كيف نخلق القيمة من خلال الابتكار والشراكات الاستراتيجية والنمو المستدام.',
    },
  },
  missionSection: {
    tagline: {
      en: 'INSTITUTIONAL MISSION',
      ar: 'المهمة المؤسسية',
    },
    title: {
      en: 'Best Investment Solutions for Sustainable National Growth',
      ar: 'أفضل الحلول الاستثمارية لتحقيق نمو وطني مستدام',
    },
    description: {
      en: "Mobtaker Group focuses on strategic investment opportunities across commercial real estate, high-throughput industrial facilities, and technology-driven agricultural projects in Iraq's key economic hubs.\n\nWe connect foreign institutional investors with viable, investment-ready domestic opportunities. These carefully selected initiatives help rebuild national infrastructure while creating long-term value for corporate ventures, family offices, and local enterprises.\n\nThrough strategic partners, including Salama Financial Group and leading banking institutions, we aim to facilitate financing solutions, liquidity support, and investment structures designed to manage risk and support sustainable returns.",
      ar: 'تركز مجموعة مبتكر على فرص الاستثمار الاستراتيجي عبر العقارات التجارية، والمرافق الصناعية عالية الإنتاجية، والمشاريع الزراعية القائمة على التكنولوجيا في المراكز الاقتصادية الرئيسية في العراق.\n\nنحن نربط المستثمرين المؤسسيين الأجانب بفرص محلية مجدية وجاهزة للاستثمار. تساعد هذه المبادرات المختارة بعناية في إعادة بناء البنية التحتية الوطنية مع خلق قيمة طويلة الأجل للمشاريع المؤسسية والمكاتب العائلية والشركات المحلية.\n\nمن خلال شركاء استراتيجيين، بما في ذلك مجموعة سلامة المالية والمؤسسات المصرفية الرائدة، نهدف إلى تسهيل حلول التمويل، ودعم السيولة، وهياكل الاستثمار المصممة لإدارة المخاطر ودعم العوائد المستدامة.',
    },
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
  },
  driversSection: {
    tagline: {
      en: 'MACROECONOMIC DRIVERS',
      ar: 'المحركات الاقتصادية الكلية',
    },
    title: {
      en: 'Why Invest in Iraq Now?',
      ar: 'لماذا الاستثمار في العراق الآن؟',
    },
    description: {
      en: "Discover the key sectors and economic opportunities shaping Iraq's investment landscape.",
      ar: 'اكتشف القطاعات الرئيسية والفرص الاقتصادية التي تشكل المشهد الاستثماري في العراق.',
    },
    drivers: [
      {
        id: 'driver-1',
        number: '01',
        title: {
          en: 'Economic Growth',
          ar: 'النمو الاقتصادي',
        },
        description: {
          en: 'Growing demand across key industries creates opportunities for businesses and long-term investors.',
          ar: 'الطلب المتزايد عبر الصناعات الرئيسية يخلق فرصاً للشركات والمستثمرين على المدى الطويل.',
        },
      },
      {
        id: 'driver-2',
        number: '02',
        title: {
          en: 'Infrastructure Development',
          ar: 'تطوير البنية التحتية',
        },
        description: {
          en: 'Reconstruction and modernization initiatives create demand for infrastructure, construction, and essential services.',
          ar: 'مبادرات إعادة الإعمار والتحديث تخلق طلباً على البنية التحتية والبناء والخدمات الأساسية.',
        },
      },
      {
        id: 'driver-3',
        number: '03',
        title: {
          en: 'Natural Resources',
          ar: 'الموارد الطبيعية',
        },
        description: {
          en: "Iraq's significant natural resource base supports opportunities across energy and related industries.",
          ar: 'قاعدة الموارد الطبيعية الكبيرة في العراق تدعم الفرص عبر قطاعات الطاقة والصناعات المرتبطة بها.',
        },
      },
      {
        id: 'driver-4',
        number: '04',
        title: {
          en: 'Agricultural Potential',
          ar: 'الإمكانات الزراعية',
        },
        description: {
          en: 'Technology-driven farming, food production, and supply chain improvements offer opportunities for sustainable development.',
          ar: 'الزراعة القائمة على التكنولوجيا، وإنتاج الغذاء، وتحسين سلاسل التوريد توفر فرصاً للتنمية المستدامة.',
        },
      },
    ],
  },
  sectorsSection: {
    tagline: {
      en: 'OUR FOCUS SECTORS',
      ar: 'قطاعات تركيزنا',
    },
    title: {
      en: 'Explore Our Investment Areas',
      ar: 'استكشف مجالاتنا الاستثمارية',
    },
    description: {
      en: 'We focus on strategic sectors with the potential to support economic development, create business opportunities, and generate long-term value in Iraq.',
      ar: 'نركز على القطاعات الاستراتيجية التي تمتلك القدرة على دعم التنمية الاقتصادية، وخلق فرص الأعمال، وتوليد قيمة طويلة الأجل في العراق.',
    },
    sectors: [
      {
        id: 'sector-1',
        number: '01',
        title: {
          en: 'Industry',
          ar: 'الصناعة',
        },
        description: {
          en: 'Explore opportunities in industrial development, manufacturing, and production facilities that support economic growth.',
          ar: 'استكشف الفرص في التنمية الصناعية، والتصنيع، ومرافق الإنتاج التي تدعم النمو الاقتصادي.',
        },
        linkUrl: '/investment/industry',
      },
      {
        id: 'sector-2',
        number: '02',
        title: {
          en: 'Commercial Real Estate',
          ar: 'العقارات التجارية',
        },
        description: {
          en: 'Discover opportunities in commercial properties and real estate developments in key economic locations.',
          ar: 'اكتشف الفرص في العقارات التجارية والمشاريع العقارية في المواقع الاقتصادية الرئيسية.',
        },
        linkUrl: '/investment/real-estate',
      },
      {
        id: 'sector-3',
        number: '03',
        title: {
          en: 'Agriculture & Food Production',
          ar: 'الزراعة وإنتاج الغذاء',
        },
        description: {
          en: 'Support modern farming, food production, and agricultural technologies that strengthen local supply chains.',
          ar: 'دعم الزراعة الحديثة، وإنتاج الأغذية، والتقنيات الزراعية التي تعزز سلاسل التوريد المحلية.',
        },
        linkUrl: '/investment/agriculture',
      },
      {
        id: 'sector-4',
        number: '04',
        title: {
          en: 'Energy',
          ar: 'الطاقة',
        },
        description: {
          en: 'Explore investment opportunities across energy infrastructure and related industrial services.',
          ar: 'استكشف فرص الاستثمار في البنية التحتية للطاقة والخدمات الصناعية ذات الصلة.',
        },
        linkUrl: '/investment/energy',
      },
      {
        id: 'sector-5',
        number: '05',
        title: {
          en: 'Technology & Innovation',
          ar: 'التكنولوجيا والابتكار',
        },
        description: {
          en: 'Encourage technology-enabled solutions that improve business operations and support digital development.',
          ar: 'تشجيع الحلول المدعومة بالتكنولوجيا التي تحسن العمليات التجارية وتدعم التطور الرقمي.',
        },
        linkUrl: '/investment/technology',
      },
      {
        id: 'sector-6',
        number: '06',
        title: {
          en: 'Infrastructure',
          ar: 'البنية التحتية',
        },
        description: {
          en: 'Identify opportunities in construction, essential services, and infrastructure development.',
          ar: 'تحديد الفرص في مجالات البناء والخدمات الأساسية وتطوير البنية التحتية.',
        },
        linkUrl: '/investment/infrastructure',
      },
    ],
  },
  environmentSection: {
    tagline: {
      en: 'THE INVESTMENT ENVIRONMENT',
      ar: 'البيئة الاستثمارية',
    },
    title: {
      en: 'Factors Encouraging Investment',
      ar: 'عوامل مشجعة على الاستثمار',
    },
    description: {
      en: 'Several economic and strategic factors can create opportunities for investors exploring the Iraqi market.',
      ar: 'تساهم العديد من العوامل الاقتصادية والاستراتيجية في خلق فرص واعدة للمستثمرين الراغبين في دخول السوق العراقي.',
    },
    factors: [
      {
        id: 'factor-1',
        icon: 'Shield',
        title: {
          en: 'Improving Business Environment',
          ar: 'تحسين بيئة الأعمال',
        },
        description: {
          en: 'Ongoing development and institutional initiatives can help create a more supportive environment for business and investment.',
          ar: 'تساهم المبادرات المؤسسية والتنموية المستمرة في خلق بيئة أكثر دعماً للأعمال والاستثمار.',
        },
      },
      {
        id: 'factor-2',
        icon: 'Shield',
        title: {
          en: 'Strategic Location',
          ar: 'موقع استراتيجي',
        },
        description: {
          en: "Iraq's location connects regional markets and offers potential opportunities for trade, logistics, and commercial development.",
          ar: 'يربط موقع العراق بين الأسواق الإقليمية ويوفر فرصاً واعدة للتجارة والخدمات اللوجستية والتطوير التجاري.',
        },
      },
      {
        id: 'factor-3',
        icon: 'Shield',
        title: {
          en: 'Natural Resources',
          ar: 'الموارد الطبيعية',
        },
        description: {
          en: "The country's natural resource base supports opportunities in energy and industries connected to resource development.",
          ar: 'تدعم قاعدة الموارد الطبيعية في البلاد الفرص المتاحة في مجال الطاقة والصناعات المرتبطة بتطوير الموارد.',
        },
      },
      {
        id: 'factor-4',
        icon: 'Shield',
        title: {
          en: 'Market Potential',
          ar: 'إمكانات السوق',
        },
        description: {
          en: 'Demand for housing, infrastructure, consumer goods, and essential services can create opportunities across multiple sectors.',
          ar: 'يمكن للطلب المتزايد على الإسكان والبنية التحتية والسلع الاستهلاكية والخدمات الأساسية خلق فرص عبر قطاعات متعددة.',
        },
      },
      {
        id: 'factor-5',
        icon: 'Shield',
        title: {
          en: 'Development Initiatives',
          ar: 'مبادرات التنمية',
        },
        description: {
          en: 'Reconstruction and economic development programs may create demand for private-sector expertise, capital, and services.',
          ar: 'قد تؤدي برامج إعادة الإعمار والتنمية الاقتصادية إلى خلق طلب متزايد على خبرات القطاع الخاص ورؤوس الأموال والخدمات.',
        },
      },
      {
        id: 'factor-6',
        icon: 'Shield',
        title: {
          en: 'Strategic Partnerships',
          ar: 'شراكات استراتيجية',
        },
        description: {
          en: 'Collaboration between local businesses, international investors, and financial institutions can help develop investment opportunities.',
          ar: 'التعاون بين الشركات المحلية والمستثمرين الدوليين والمؤسسات المالية يمكن أن يسهم في تطوير فرص استثمارية ناجحة.',
        },
      },
    ],
    foundationBox: {
      title: {
        en: 'Building a Foundation for Investment',
        ar: 'بناء أساس متين للاستثمار',
      },
      description: {
        en: 'Mobtaker Group works to help investors explore opportunities in Iraq by connecting them with relevant local projects, facilitating strategic partnerships, and addressing potential challenges throughout the investment process. Our goal is to support informed investment decisions and contribute to sustainable economic development.',
        ar: 'تعمل مجموعة مبتكر على مساعدة المستثمرين على استكشاف الفرص في العراق من خلال ربطهم بالمشاريع المحلية المناسبة، وتسهيل الشراكات الاستراتيجية، والتغلب على التحديات طوال عملية الاستثمار. هدفنا هو دعم اتخاذ قرارات استثمارية مدروسة والمساهمة في التنمية الاقتصادية المستدامة.',
      },
    },
  },
  bannerSection: {
    tagline: {
      en: "LET'S WORK TOGETHER",
      ar: 'لنعمل معاً',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
      ar: 'هل تبحث عن منتجات طبية، معدات، حلول صيدلانية، أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
    },
    primaryButtonText: {
      en: 'Get a Quote',
      ar: 'احصل على عرض أسعار',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};

export const initialCmsCompanyData: CmsCompanyData = {
  headerSection: {
    title: {
      en: 'Company Profile',
      ar: 'ملف الشركة',
    },
    description: {
      en: 'Learn more about Mobtaker Group, our vision, and our commitment to innovation and sustainable growth.',
      ar: 'تعرف أكثر على مجموعة مبتكر، ورؤيتنا، والتزامنا بالابتكار والنمو المستدام.',
    },
  },

  whoWeAreSection: {
    tagline: {
      en: 'WHO WE ARE',
      ar: 'من نحن',
    },
    title: {
      en: 'Building Opportunities Through Innovation and Collaboration',
      ar: 'بناء الفرص من خلال الابتكار والتعاون',
    },
    description1: {
      en: 'Mobtaker Group is a diversified business organization focused on identifying opportunities, developing strategic relationships, and supporting initiatives that contribute to economic and business development.',
      ar: 'مجموعة مبتكر هي مؤسسة أعمال متنوعة تركز على تحديد الفرص، وبناء علاقات استراتيجية، ودعم المبادرات التي تسهم في التنمية الاقتصادية والتجارية.',
    },
    description2: {
      en: 'We aim to connect ideas, expertise, and resources to help businesses explore new possibilities. Through collaboration and a forward-looking approach, we strive to build lasting relationships with clients, partners, and stakeholders.',
      ar: 'نهدف إلى ربط الأفكار والخبرات والموارد لمساعدة الشركات في استكشاف إمكانيات جديدة. من خلال التعاون والنهج المستقبلي، نسعى جاهدين لبناء علاقات دائمة مع العملاء والشركاء والجهات المعنية.',
    },
    cards: [
      {
        id: 'card-overview',
        icon: 'Building2',
        title: {
          en: 'Our Overview',
          ar: 'نظرة عامة',
        },
        description: {
          en: 'We bring together business insight, collaboration, and practical solutions to explore opportunities across relevant sectors.',
          ar: 'نجمع بين الرؤية التجارية والتعاون والحلول العملية لاستكشاف الفرص عبر القطاعات ذات الصلة.',
        },
      },
      {
        id: 'card-vision',
        icon: 'Eye',
        title: {
          en: 'Our Vision',
          ar: 'رؤيتنا',
        },
        description: {
          en: 'To become a trusted business group recognized for innovation, responsible growth, and meaningful contributions to the markets we serve.',
          ar: 'أن نصبح مجموعة أعمال موثوقة ومعترف بها في الابتكار والنمو المسؤول والمساهمات ذات المغزى في الأسواق التي نخدمها.',
        },
      },
      {
        id: 'card-mission',
        icon: 'Target',
        title: {
          en: 'Our Mission',
          ar: 'رسالتنا',
        },
        description: {
          en: 'To develop valuable business opportunities, build strategic partnerships, and deliver practical solutions guided by integrity and long-term thinking.',
          ar: 'تطوير فرص أعمال قيمة، وبناء شراكات استراتيجية، وتقديم حلول عملية مسترشدين بالنزاهة والتفكير طويل الأمد.',
        },
      },
      {
        id: 'card-core-values',
        icon: 'ShieldCheck',
        title: {
          en: 'Our Core Values',
          ar: 'قيمنا الجوهرية',
        },
        description: {
          en: 'Our work is guided by collaboration, integrity, and a commitment to continuous improvement.',
          ar: 'يسترشد عملنا بالتعاون والنزاهة والالتزام بالتحسين المستمر.',
        },
      },
    ],
  },

  whatGuidesUsSection: {
    tagline: {
      en: 'WHAT GUIDES US',
      ar: 'ما يوجهنا',
    },
    title: {
      en: 'The Principles Behind Our Work',
      ar: 'المبادئ الكامنة وراء عملنا',
    },
    description: {
      en: 'We believe sustainable business relationships are built through trust, responsibility, and a shared commitment to progress.',
      ar: 'نؤمن بأن علاقات الأعمال المستدامة تُبنى من خلال الثقة والمسؤولية والالتزام المشترك بالتقدم.',
    },
    principles: [
      { id: 'p-1', en: 'Integrity', ar: 'النزاهة' },
      { id: 'p-2', en: 'Innovation', ar: 'الابتكار' },
      { id: 'p-3', en: 'Collaboration', ar: 'التعاون' },
      { id: 'p-4', en: 'Transparency', ar: 'الشفافية' },
      { id: 'p-5', en: 'Responsibility', ar: 'المسؤولية' },
      { id: 'p-6', en: 'Continuous Improvement', ar: 'التحسين المستمر' },
    ],
    downloadBox: {
      title: {
        en: 'Download Our Company Profile',
        ar: 'تحميل ملف الشركة التعريفي',
      },
      description: {
        en: 'Explore our company overview, vision, mission, and business approach in our company profile document.',
        ar: 'استكشف نظرة عامة على شركتنا ورؤيتها ورسالتها ونهجها التجاري في وثيقة ملف الشركة.',
      },
      buttonText: {
        en: 'Download Company Profile (PDF)',
        ar: 'تحميل ملف الشركة (PDF)',
      },
      pdfUrl: '',
      pdfName: 'Mobtaker-Group-Profile.pdf',
    },
  },
};

export const initialCmsAboutData: CmsAboutData = {
  headerSection: {
    title: {
      en: 'About Us',
      ar: 'من نحن',
    },
    description: {
      en: 'Discover our heritage, explore our journey of evolution, and learn about the vision, values, and leadership that drive our commitment to innovation and excellence.',
      ar: 'اكتشف تراثنا، واستكشف مسيرة تطورنا، وتعرف على الرؤية والقيم والقيادة التي تقود التزامنا بالابتكار والتميز.',
    },
  },
  heritageSection: {
    tagline: {
      en: 'OUR HERITAGE',
      ar: 'تراثنا وعراقتنا',
    },
    title: {
      en: 'Built on Trust. Driven by Ambition.',
      ar: 'مبني على الثقة. مدفوع بالطموح.',
    },
    description: {
      en: 'Mobtaker Group brings together specialized businesses under a shared commitment to excellence, trusted partnerships, and sustainable growth.',
      ar: 'تجمع مجموعة مبتكر بين الشركات المتخصصة تحت التزام مشترك بالتميز والشراكات الموثوقة والنمو المستدام.',
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80',
    badgeYear: '2017',
    badgeText: {
      en: 'Established',
      ar: 'سنة التأسيس',
    },
  },
  journeySection: {
    tagline: {
      en: 'OUR JOURNEY',
      ar: 'مسيرتنا',
    },
    title: {
      en: 'Evolving Through Opportunity',
      ar: 'التطور من خلال الفرص',
    },
    description: {
      en: 'Our journey reflects a commitment to adapting, expanding, and creating lasting value across industries.',
      ar: 'تعكس مسيرتنا التزاماً بالتكيف والتوسع وخلق قيمة دائمة عبر مختلف القطاعات.',
    },
    items: [
      {
        id: 'journey-1',
        number: '01',
        title: {
          en: 'Building a Strong Foundation',
          ar: 'بناء أساس قوي',
        },
        description: {
          en: 'Establishing trusted relationships and developing a foundation for sustainable business growth.',
          ar: 'بناء علاقات موثوقة وتطوير أساس لنمو الأعمال المستدام.',
        },
      },
      {
        id: 'journey-2',
        number: '02',
        title: {
          en: 'Expanding Our Horizons',
          ar: 'توسيع آفاقنا',
        },
        description: {
          en: 'Growing across specialized sectors and exploring opportunities through strategic partnerships.',
          ar: 'النمو عبر القطاعات المتخصصة واستكشاف الفرص من خلال الشراكات الاستراتيجية.',
        },
      },
    ],
  },
  impactSection: {
    tagline: {
      en: 'OUR ACHIEVEMENTS',
      ar: 'إنجازاتنا',
    },
    title: {
      en: 'Our Impact in Numbers',
      ar: 'أثرنا بالأرقام',
    },
    stats: [
      {
        id: 'stat-1',
        number: '20+',
        description: {
          en: 'Years of Excellence',
          ar: 'سنوات من التميز',
        },
      },
      {
        id: 'stat-2',
        number: '500+',
        description: {
          en: 'Satisfied Customers',
          ar: 'عميل راضٍ',
        },
      },
      {
        id: 'stat-3',
        number: '140+',
        description: {
          en: 'Projects Delivered',
          ar: 'مشروع منجز',
        },
      },
    ],
  },
  // Section 5: Our Leadership
  leadershipSection: {
    tagline: {
      en: 'OUR LEADERSHIP',
      ar: 'قيادتنا',
    },
    title: {
      en: 'The People Behind Our Progress',
      ar: 'الأشخاص وراء تقدمنا',
    },
    description: {
      en: 'Meet the leadership and teams working together to deliver quality, innovation, and lasting value across our group.',
      ar: 'تعرف على القيادة وفرق العمل التي تعمل معاً لتقديم الجودة والابتكار وقيمة دائمة عبر مجموعتنا.',
    },
    leaders: [
      {
        id: 'leader-1',
        name: {
          en: 'Dr. Ahmed Dhahir',
          ar: 'د. أحمد ظاهر',
        },
        role: {
          en: 'Founder & CEO',
          ar: 'المؤسس والرئيس التنفيذي',
        },
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      },
    ],
  },
  // Section 6: Our Management Team
  managementSection: {
    tagline: {
      en: 'OUR LEADERSHIP & MANAGEMENT',
      ar: 'فريق الإدارة والقيادة',
    },
    title: {
      en: 'Our Management Team',
      ar: 'فريق الإدارة لدينا',
    },
    description: {
      en: 'Specialized executive leadership across our three group divisions.',
      ar: 'قيادة تنفيذية متخصصة عبر أقسام مجموعتنا الثلاثة.',
    },
    divisions: [
      {
        id: 'div-1',
        badge: 'PI',
        companyName: {
          en: 'Projects Innovator',
          ar: 'مبتكر المشاريع',
        },
        description: {
          en: 'Delivering innovative construction and infrastructure solutions that shape modern spaces and build a better future.',
          ar: 'تقديم حلول بناء وبنية تحتية مبتكرة تشكل المساحات الحديثة وتبني مستقبلاً أفضل.',
        },
        linkText: {
          en: 'Projects Innovator ↗',
          ar: 'مبتكر المشاريع ↗',
        },
        linkUrl: '/projects-innovator',
        logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80',
        members: [
          {
            id: 'member-1-1',
            name: { en: 'Management Member 1', ar: 'عضو الإدارة 1' },
            role: { en: 'General Manager', ar: 'المدير العام' },
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          },
          {
            id: 'member-1-2',
            name: { en: 'Management Member 2', ar: 'عضو الإدارة 2' },
            role: { en: 'Operations Manager', ar: 'مدير العمليات' },
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          },
        ],
      },
      {
        id: 'div-2',
        badge: 'AT',
        companyName: {
          en: 'Attractive',
          ar: 'أتراكتيف',
        },
        description: {
          en: 'A diversified business group driving excellence across healthcare, construction, trading, and investment.',
          ar: 'مجموعة أعمال متنوعة تقود التميز عبر الرعاية الصحية، البناء، التجارة، والاستثمار.',
        },
        linkText: {
          en: 'Attractive ↗',
          ar: 'أتراكتيف ↗',
        },
        linkUrl: '/attractive',
        logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80',
        members: [
          {
            id: 'member-2-1',
            name: { en: 'Management Member 1', ar: 'عضو الإدارة 1' },
            role: { en: 'General Manager', ar: 'المدير العام' },
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          },
          {
            id: 'member-2-2',
            name: { en: 'Management Member 2', ar: 'عضو الإدارة 2' },
            role: { en: 'Operations Manager', ar: 'مدير العمليات' },
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          },
        ],
      },
      {
        id: 'div-3',
        badge: 'MI',
        companyName: {
          en: 'Medics Innovator',
          ar: 'ميديكس إنوفيتور',
        },
        description: {
          en: 'Advancing healthcare through trusted medical solutions, quality healthcare products, and a commitment to better patient outcomes.',
          ar: 'الارتقاء بالرعاية الصحية من خلال حلول طبية موثوقة ومنتجات رعاية صحية عالية الجودة والتزام بنتائج أفضل للمرضى.',
        },
        linkText: {
          en: 'Medics Innovator ↗',
          ar: 'ميديكس إنوفيتور ↗',
        },
        linkUrl: '/medics-innovator',
        logoUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=200&q=80',
        members: [
          {
            id: 'member-3-1',
            name: { en: 'Management Member 1', ar: 'عضو الإدارة 1' },
            role: { en: 'General Manager', ar: 'المدير العام' },
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          },
          {
            id: 'member-3-2',
            name: { en: 'Management Member 2', ar: 'عضو الإدارة 2' },
            role: { en: 'Operations Manager', ar: 'مدير العمليات' },
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
          },
        ],
      },
    ],
  },
  // Section 7: Our Core Values
  coreValuesSection: {
    tagline: {
      en: 'WHAT WE STAND FOR',
      ar: 'ما نمثله ونلتزم به',
    },
    title: {
      en: 'Our Core Values',
      ar: 'قيمنا الجوهرية',
    },
    description: {
      en: 'The principles that guide our decisions, shape our actions, and define the relationships we build with our clients, partners, and communities.',
      ar: 'المبادئ التي توجه قراراتنا، وتشكل أفعالنا، وتحدد العلاقات التي نبنيها مع عملائنا وشركائنا ومجتمعاتنا.',
    },
    values: [
      {
        id: 'val-1',
        number: '01',
        icon: 'Handshake',
        title: { en: 'Relationships', ar: 'العلاقات والشراكات' },
        description: {
          en: 'We build lasting relationships through trust, transparency, and a genuine commitment to understanding and supporting our clients.',
          ar: 'نبني علاقات دائمة من خلال الثقة والشفافية والالتزام الحقيقي بفهم ودعم عملائنا.',
        },
      },
      {
        id: 'val-2',
        number: '02',
        icon: 'Headphones',
        title: { en: 'Service', ar: 'الخدمة المتميزة' },
        description: {
          en: 'We strive to deliver responsive, reliable, and high-quality service that addresses our clients\' needs and exceeds expectations.',
          ar: 'نسعى جاهدين لتقديم خدمة سريعة وموثوقة وعالية الجودة تلبي احتياجات عملائنا وتتجاوز التوقعات.',
        },
      },
      {
        id: 'val-3',
        number: '03',
        icon: 'Users',
        title: { en: 'Partnership & Counsel', ar: 'الشراكة والمشورة' },
        description: {
          en: 'We work alongside our partners, offering thoughtful guidance, shared expertise, and collaborative solutions that create lasting value.',
          ar: 'نعمل جنباً إلى جنب مع شركائنا، ونقدم توجيهاً مدروساً، وخبرات مشتركة، وحلولاً تعاونية تخلق قيمة دائمة.',
        },
      },
      {
        id: 'val-4',
        number: '04',
        icon: 'Scale',
        title: { en: 'Diversity', ar: 'التنوع والشمولية' },
        description: {
          en: 'We value diverse perspectives, experiences, and ideas, recognizing that inclusion strengthens our teams and drives better outcomes.',
          ar: 'نقدر وجهات النظر والخبرات والأفكار المتنوعة، مدركين أن الشمولية تقوي فرقنا وتحقق نتائج أفضل.',
        },
      },
      {
        id: 'val-5',
        number: '05',
        icon: 'Lightbulb',
        title: { en: 'Opportunity', ar: 'الفرص والابتكار' },
        description: {
          en: 'We identify opportunities for progress and growth, helping businesses and people turn promising ideas into meaningful results.',
          ar: 'نحدد فرص التقدم والنمو، ونساعد الشركات والأفراد على تحويل الأفكار الواعدة إلى نتائج ذات مغزى.',
        },
      },
      {
        id: 'val-6',
        number: '06',
        icon: 'ShieldCheck',
        title: { en: 'Authenticity', ar: 'المصداقية والأصالة' },
        description: {
          en: 'We act with integrity, remain true to our commitments, and build trust through honest communication and responsible decisions.',
          ar: 'نتصرف بنزاهة، ونبقى أوفياء لالتزاماتنا، ونبني الثقة من خلال التواصل الصادق والقرارات المسؤولة.',
        },
      },
    ],
  },
  // Section 8: Our History & Ownership
  historySection: {
    tagline: {
      en: 'OUR BACKGROUND',
      ar: 'خلفيتنا وتاريخنا',
    },
    title: {
      en: 'Our History & Ownership',
      ar: 'تاريخنا وهيكلية الملكية',
    },
    description: {
      en: 'Discover the foundations of our business, the expertise behind our journey, and the framework that supports our continued growth.',
      ar: 'اكتشف أسس أعمالنا، والخبرة الكامنة وراء مسيرتنا، والإطار الذي يدعم نمونا المستمر.',
    },
    items: [
      {
        id: 'hist-1',
        number: '01',
        icon: 'History',
        title: { en: 'Brief History', ar: 'نبذة تاريخية' },
        description: {
          en: 'Salama was established in 2020, with its headquarters in Baghdad, Iraq. The company specializes in administrative services and investment consultancy across insurance, healthcare, healthcare management, industry, construction, infrastructure, investment, and agriculture. Salama serves as a bridge between businesses and stakeholders, helping facilitate collaboration and achieve efficient, sustainable, and successful outcomes. In its early years, the company established partnerships with several major local and international businesses.',
          ar: 'تأسست سلامة في عام 2020، ومقرها الرئيسي في بغداد، العراق. وتتخصص الشركة في الخدمات الإدارية والاستشارات الاستثمارية عبر التأمين والرعاية الصحية وإدارة الرعاية الصحية والصناعة والبناء والبنية التحتية والاستثمار والزراعة. وتعمل سلامة كجسر بين الشركات وأصحاب المصلحة، مما يساعد على تسهيل التعاون وتحقيق نتائج فعالة ومستدامة وناجحة.',
        },
      },
      {
        id: 'hist-2',
        number: '02',
        icon: 'Building2',
        title: { en: 'Shareholding Structure', ar: 'هيكلية المساهمة والملكية' },
        description: {
          en: 'Salama\'s shareholding structure outlines the ownership framework behind the company and the interests represented in its business. For an accurate overview of shareholders, ownership percentages, and governance arrangements, refer to the company\'s official corporate documentation.',
          ar: 'تحدد هيكلية المساهمة في سلامة إطار الملكية وراء الشركة والمصالح الممثلة في أعمالها. للحصول على نظرة دقيقة على المساهمين ونسب الملكية وترتيبات الحوكمة، يرجى الرجوع إلى الوثائق الرسمية للشركة.',
        },
      },
    ],
  },
  // Section 9: Our Purpose
  purposeSection: {
    tagline: {
      en: 'OUR PURPOSE',
      ar: 'هدفنا وغايتنا',
    },
    title: {
      en: 'Driving Progress Through Clear Objectives',
      ar: 'دفع عجلة التقدم من خلال أهداف واضحة',
    },
    description: {
      en: 'We partner with like-minded organizations to promote sustainability and develop practical solutions. By collaborating with communities, government bodies, and businesses, we bring together expertise, resources, and influence to create positive change, strengthen stakeholder relationships, and uphold ethical business practices.',
      ar: 'نحن نتشارك مع المنظمات ذات التفكير المماثل لتعزيز الاستدامة وتطوير حلول عملية. من خلال التعاون مع المجتمعات والهيئات الحكومية والشركات، نجمع بين الخبرة والموارد والتأثير لإحداث تغيير إيجابي وتعزيز علاقات أصحاب المصلحة ودعم ممارسات الأعمال الأخلاقية.',
    },
    highlightTitle: {
      en: 'Committed to Shared Progress',
      ar: 'ملتزمون بالتقدم المشترك',
    },
    highlightDescription: {
      en: 'We believe meaningful results come from responsible management, community engagement, and trusted client partnerships.',
      ar: 'نحن نؤمن بأن النتائج ذات المغزى تأتي من الإدارة المسؤولة، والمشاركة المجتمعية، والشراكات الموثوقة مع العملاء.',
    },
    highlightIcon: 'Heart',
    objectivesTagline: {
      en: 'OUR PRIORITIES',
      ar: 'أولوياتنا',
    },
    objectivesTitle: {
      en: 'Our Objectives',
      ar: 'أهدافنا',
    },
    objectives: [
      {
        id: 'obj-1',
        number: '01',
        icon: 'Target',
        title: { en: 'Effective Project Management', ar: 'إدارة المشاريع الفعالة' },
      },
      {
        id: 'obj-2',
        number: '02',
        icon: 'HandHeart',
        title: { en: 'Contributing to Community Service', ar: 'المساهمة في خدمة المجتمع' },
      },
      {
        id: 'obj-3',
        number: '03',
        icon: 'ShieldCheck',
        title: { en: 'Becoming a Trusted Partner for Our Clients', ar: 'أن نصبح شريكاً موثوقاً لعملائنا' },
      },
    ],
  },
  // Section 10: Call to Action Banner
  bannerSection: {
    tagline: {
      en: "LET'S WORK TOGETHER",
      ar: 'لنعمل معاً',
    },
    title: {
      en: "Let's Build Something That Moves Business Forward.",
      ar: 'دعنا نبني شيئاً يدفع الأعمال إلى الأمام.',
    },
    description: {
      en: 'Looking for medical products, equipment, pharmaceutical solutions, or business services? Our team is ready to help you find what you need.',
      ar: 'هل تبحث عن منتجات طبية أو معدات أو حلول صيدلانية أو خدمات أعمال؟ فريقنا جاهز لمساعدتك في العثور على ما تحتاجه.',
    },
    primaryButtonText: {
      en: 'Get a Quote',
      ar: 'احصل على عرض سعر',
    },
    primaryButtonUrl: '/contact',
    secondaryButtonText: {
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    secondaryButtonUrl: '/contact',
  },
};



// Complete 9 CMS Tabs Configuration matching the user's reference design
export const ALL_CMS_TABS: CmsTabConfig[] = [
  {
    id: 'home',
    label: 'Home Page',
    labelAr: 'الصفحة الرئيسية',
    iconName: 'Home',
    description: 'Manage main hero title, tags, founder details, trusted brands, and our sectors portfolio.',
    groups: [
      {
        id: 'home-hero',
        title: { en: 'Section I: Hero & Founder Details', ar: 'القسم الأول: تفاصيل الواجهة الرئيسية والمؤسس' },
        description: { en: 'Manage main title, hero heading tag, description, and founder profile', ar: 'إدارة العنوان الرئيسي، الشعار، الوصف، والملف التعريفي للمؤسس' },
        iconName: 'Sparkles',
        accentColor: 'orange',
        items: [
          {
            id: 'hero-title-tag',
            title: { en: 'Main Title & Heading Tag', ar: 'العنوان الرئيسي والوسم الفرعي' },
            subtitle: { en: 'Core headline and badge for landing display', ar: 'العنوان البارز والوسم المعروض بالصفحة' },
            status: 'Active',
            lastUpdated: '26 Oct 2026',
            badgeColor: 'orange',
          },
          {
            id: 'hero-description',
            title: { en: 'Hero Core Description', ar: 'الوصف الرئيسي للواجهة' },
            subtitle: { en: 'Primary mission and introductory copy in EN/AR', ar: 'الرسالة التمهيدية والنص التعريفي باللغتين' },
            status: 'Active',
            lastUpdated: '26 Oct 2026',
            badgeColor: 'orange',
          },
          {
            id: 'hero-founder',
            title: { en: 'Founder Executive Profile', ar: 'الملف التعريفي للمؤسس التنفيذي' },
            subtitle: { en: 'Founder name, executive credentials, and portrait image', ar: 'اسم المؤسس، الخبرات التنفيذية، وصورة الملف' },
            status: 'Active',
            lastUpdated: '26 Oct 2026',
            badgeColor: 'orange',
          },
        ],
      },
      {
        id: 'home-brands',
        title: { en: 'Section II: Trusted Brands & Partners', ar: 'القسم الثاني: العلامات الموثوقة والشركاء' },
        description: { en: 'Manage verified partner logos, brand showcase, and collaborator web links', ar: 'إدارة شعارات الشركاء المعتمدين وروابطهم الرقمية' },
        iconName: 'Building2',
        accentColor: 'green',
        items: [
          {
            id: 'brands-carousel',
            title: { en: 'Trusted Partner Logos', ar: 'شعارات الشركاء الموثوقين' },
            subtitle: { en: 'Dynamic brand logos and partner company URLs', ar: 'شعارات العلامات التجارية وروابطها المباشرة' },
            status: 'Active',
            lastUpdated: '26 Oct 2026',
            badgeColor: 'green',
          },
        ],
      },
      {
        id: 'home-sectors',
        title: { en: 'Section III: About & Our Sectors', ar: 'القسم الثالث: عن الشركة وقطاعاتنا' },
        description: { en: 'Manage section feature image, location, and dynamic industry sectors list', ar: 'إدارة صورة القسم، الموقع الجغرافي، وقائمة القطاعات الحيوية' },
        iconName: 'Layers',
        accentColor: 'purple',
        items: [
          {
            id: 'sectors-overview',
            title: { en: 'Section Image & Geographic Location', ar: 'صورة القسم والموقع الجغرافي' },
            subtitle: { en: 'Headline image, regional presence, and overview text', ar: 'الصورة الرئيسية، التواجد الإقليمي، والنص العام' },
            status: 'Active',
            lastUpdated: '26 Oct 2026',
            badgeColor: 'purple',
          },
          {
            id: 'sectors-portfolio',
            title: { en: 'Our Priority Sectors Portfolio', ar: 'محفظة القطاعات ذات الأولوية' },
            subtitle: { en: 'Interactive sector cards with icons and descriptions', ar: 'بطاقات القطاعات التفاعلية مع الأيقونات والشروحات' },
            status: 'Active',
            lastUpdated: '26 Oct 2026',
            badgeColor: 'purple',
          },
        ],
      },
    ],
  },
  {
    id: 'about',
    label: 'About Us',
    labelAr: 'من نحن',
    iconName: 'Info',
    description: 'Manage company mission, heritage, leadership, and operational culture.',
    groups: [
      {
        id: 'about-story',
        title: { en: 'Corporate Heritage & Mission', ar: 'إرث الشركة ورسالتها' },
        description: { en: 'Manage foundational story, mission, and long-term vision', ar: 'إدارة قصة التأسيس والرسالة والرؤية المستقبلية' },
        iconName: 'Info',
        accentColor: 'orange',
        items: [
          {
            id: 'about-story-item',
            title: { en: 'The Innovation Story', ar: 'قصة الابتكار' },
            subtitle: { en: 'Foundational history and key organizational milestones', ar: 'التاريخ التأسيسي وأهم المحطات البارزة' },
            status: 'Active',
            lastUpdated: '20 Jul 2026',
            badgeColor: 'orange',
          },
          {
            id: 'about-mission-item',
            title: { en: 'Vision & Mission Statement', ar: 'بيان الرؤية والرسالة' },
            subtitle: { en: 'Bilingual guiding purpose and institutional aspirations', ar: 'الهدف الاستراتيجي والتطلعات المؤسسية باللغتين' },
            status: 'Active',
            lastUpdated: '20 Jul 2026',
            badgeColor: 'orange',
          },
        ],
      },
      {
        id: 'about-values',
        title: { en: 'Core Values & Culture', ar: 'القيم الجوهرية وثقافة العمل' },
        description: { en: 'Manage guiding values and organizational governance principles', ar: 'إدارة المبادئ الحاكمة وقواعد الحوكمة المؤسسية' },
        iconName: 'Shield',
        accentColor: 'green',
        items: [
          {
            id: 'about-values-list',
            title: { en: 'Guiding Pillars & Ethics', ar: 'الركائز التوجيهية والأخلاقيات' },
            subtitle: { en: 'Transparency, excellence, and sustainable regional stewardship', ar: 'الشفافية، التميز، والاستدامة الإقليمية' },
            status: 'Active',
            lastUpdated: '17 Apr 2026',
            badgeColor: 'green',
          },
        ],
      },
    ],
  },
  {
    id: 'company',
    label: 'Company Profile',
    labelAr: 'ملف الشركة',
    iconName: 'Building2',
    description: 'Manage corporate legal identity, executive board, and institutional certifications.',
    groups: [
      {
        id: 'company-overview',
        title: { en: 'Corporate Structure & Credentials', ar: 'الهيكل المؤسسي والبيانات المعتمدة' },
        description: { en: 'Official registration numbers, tax identities, and executive structure', ar: 'أرقام السجلات الرسمية والهيكل الإداري التنفيذي' },
        iconName: 'Building2',
        accentColor: 'blue',
        items: [
          {
            id: 'company-identity',
            title: { en: 'Legal Identity & Registration', ar: 'الهوية القانونية والسجلات' },
            subtitle: { en: 'Commercial registrations, licensing, and corporate status', ar: 'السجل التجاري، التراخيص، والوضع القانوني' },
            status: 'Active',
            lastUpdated: '17 Apr 2026',
            badgeColor: 'blue',
          },
          {
            id: 'company-board',
            title: { en: 'Executive Leadership Board', ar: 'مجلس الإدارة والقيادة التنفيذية' },
            subtitle: { en: 'Officers, directors, and supervisory committee', ar: 'المدراء التنفيذيون وأعضاء اللجان الإشرافية' },
            status: 'Active',
            lastUpdated: '17 Apr 2026',
            badgeColor: 'blue',
          },
        ],
      },
      {
        id: 'company-certifications',
        title: { en: 'Accreditations & Badges', ar: 'الاعتمادات والشارات الرسمية' },
        description: { en: 'Manage ISO certifications, security audits, and alliance memberships', ar: 'إدارة شهادات الجودة والتدقيق الأمني وعضويات التحالف' },
        iconName: 'Shield',
        accentColor: 'purple',
        items: [
          {
            id: 'company-iso',
            title: { en: 'ISO & Compliance Registry', ar: 'سجل شهادات الجودة والامتثال' },
            subtitle: { en: 'Accredited quality frameworks and compliance badges', ar: 'أطر الجودة المعتمدة وشارات الامتثال الدولي' },
            status: 'Active',
            lastUpdated: '17 Apr 2026',
            badgeColor: 'purple',
          },
        ],
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    labelAr: 'الخدمات',
    iconName: 'Zap',
    description: 'Manage core technology solutions, enterprise consulting, and specialized services.',
    groups: [
      {
        id: 'services-core',
        title: { en: 'Strategic Service Offerings', ar: 'باقات الخدمات الاستراتيجية' },
        description: { en: 'Primary consulting, advisory, and technology transformation modules', ar: 'الوحدات الاستشارية والتقنية والتحول الرقمي' },
        iconName: 'Zap',
        accentColor: 'orange',
        items: [
          {
            id: 'service-consulting',
            title: { en: 'Venture Advisory & Acceleration', ar: 'الاستشارات وتسريع المشاريع' },
            subtitle: { en: 'Sovereign venture setup and strategic market entrance', ar: 'تأسيس المشاريع السيادية والدخول الاستراتيجي للأسواق' },
            status: 'Active',
            lastUpdated: '26 Oct 2026',
            badgeColor: 'orange',
          },
          {
            id: 'service-digital',
            title: { en: 'AI & Enterprise Transformation', ar: 'الذكاء الاصطناعي والتحول المؤسسي' },
            subtitle: { en: 'Next-generation system architecture and digital automation', ar: 'بنية الأنظمة المتقدمة والأتمتة الرقمية' },
            status: 'Active',
            lastUpdated: '26 Oct 2026',
            badgeColor: 'orange',
          },
        ],
      },
    ],
  },
  {
    id: 'shop',
    label: 'Shop',
    labelAr: 'المتجر',
    iconName: 'ShoppingBag',
    description: 'Manage medical equipment, healthcare products catalog, certifications, and quote requests.',
    groups: [
      {
        id: 'shop-products',
        title: { en: 'Our Products & Medical Equipment', ar: 'منتجاتنا والمعدات الطبية' },
        description: { en: 'Medical monitoring, diagnostic ultrasound, infusion pumps, and clinical devices', ar: 'المراقبة الطبية، السونار التشخيصي، مضخات الحقن، والأجهزة السريرية' },
        iconName: 'ShoppingBag',
        accentColor: 'orange',
        items: [
          {
            id: 'shop-catalog',
            title: { en: 'Section 1: Our Products', ar: 'القسم الأول: منتجاتنا' },
            subtitle: { en: 'Featured medical devices, brands, specs & certifications', ar: 'الأجهزة الطبية المميزة، العلامات التجارية، والمواصفات والشهادات' },
            status: 'Active',
            lastUpdated: '30 Oct 2026',
            badgeColor: 'orange',
          },
        ],
      },
    ],
  },
  {
    id: 'investment',
    label: 'Investment',
    labelAr: 'الاستثمار',
    iconName: 'TrendingUp',
    description: 'Manage sovereign venture initiatives, fund portfolios, and investor relations content.',
    groups: [
      {
        id: 'inv-portfolio',
        title: { en: 'Strategic Investment Portfolios', ar: 'المحافظ الاستثمارية الاستراتيجية' },
        description: { en: 'Asset allocations, priority venture funds, and co-investment programs', ar: 'توزيع الأصول، صناديق المشاريع ذات الأولوية، وبرامج الاستثمار المشترك' },
        iconName: 'TrendingUp',
        accentColor: 'green',
        items: [
          {
            id: 'inv-opportunities',
            title: { en: 'Venture Fund Programs', ar: 'برامج صناديق الاستثمار الجريء' },
            subtitle: { en: 'High-growth frontier tech and sustainable capital funds', ar: 'صناديق التكنولوجيا المتقدمة ورأس المال المستدام' },
            status: 'Active',
            lastUpdated: '26 Oct 2026',
            badgeColor: 'green',
          },
        ],
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    labelAr: 'المشاريع',
    iconName: 'FolderGit2',
    description: 'Smart city initiatives, digital transformation, sustainable energy, and strategic partnerships.',
    groups: [
      {
        id: 'proj-flagship',
        title: { en: 'Our Projects Portfolio', ar: 'محفظة مشاريعنا' },
        description: { en: 'Smart city, digital transformation, research, and community initiatives', ar: 'المدن الذكية، التحول الرقمي، الأبحاث، والمبادرات المجتمعية' },
        iconName: 'FolderGit2',
        accentColor: 'purple',
        items: [
          {
            id: 'proj-flagship-list',
            title: { en: 'Section 1: Our Projects', ar: 'القسم الأول: مشاريعنا' },
            subtitle: { en: '6 Featured strategic initiatives & milestones', ar: '6 مبادرات ومشاريع استراتيجية مميزة' },
            status: 'Active',
            lastUpdated: '30 Oct 2026',
            badgeColor: 'purple',
          },
          {
            id: 'proj-banner',
            title: { en: "Section 2: Let's Work Together Banner", ar: 'القسم الثاني: بانر لنعمل معاً' },
            subtitle: { en: 'High-impact CTA banner and engagement quote route', ar: 'بانر دعوة العمل التفاعلي وتوجيه طلبات الأسعار' },
            status: 'Active',
            lastUpdated: '30 Oct 2026',
            badgeColor: 'red',
          },
        ],
      },
    ],
  },
  {
    id: 'partners',
    label: 'Partners',
    labelAr: 'الشركاء',
    iconName: 'Users2',
    description: 'Manage global technology alliances, strategic collaborators, and partnership CTA banner.',
    groups: [
      {
        id: 'partners-alliances',
        title: { en: 'Our Partners & Global Collaborators', ar: 'شركاؤنا والتحالفات العالمية' },
        description: { en: 'Technology leaders, cloud providers, and creative strategic partners', ar: 'رواد التكنولوجيا، مزودو الخدمات السحابية، والشركاء الاستراتيجيين' },
        iconName: 'Users2',
        accentColor: 'blue',
        items: [
          {
            id: 'partners-list',
            title: { en: 'Section 1: Our Partners', ar: 'القسم الأول: شركاؤنا' },
            subtitle: { en: '6 Featured strategic corporate partners & credentials', ar: '6 شركاء استراتيجيين مميزين وبيانات الاعتماد' },
            status: 'Active',
            lastUpdated: '30 Oct 2026',
            badgeColor: 'blue',
          },
          {
            id: 'partners-banner',
            title: { en: "Section 2: Let's Work Together Banner", ar: 'القسم الثاني: بانر لنعمل معاً' },
            subtitle: { en: 'Engagement quote banner and contact channels', ar: 'بانر طلب عروض الأسعار وقنوات التواصل' },
            status: 'Active',
            lastUpdated: '30 Oct 2026',
            badgeColor: 'red',
          },
        ],
      },
    ],
  },
  {
    id: 'contact',
    label: 'Contact',
    labelAr: 'اتصل بنا',
    iconName: 'Mail',
    description: 'Corporate office location, headquarters address, enquiry channels, and interactive maps.',
    groups: [
      {
        id: 'contact-channels',
        title: { en: 'Contact Channels & Headquarters', ar: 'قنوات التواصل والمقر الرئيسي' },
        description: { en: 'Manage inquiry routes, executive office contacts, and physical global locations', ar: 'إدارة قنوات الاستفسار، معلومات التواصل، والمواقع الجغرافية' },
        iconName: 'Mail',
        accentColor: 'red',
        items: [
          {
            id: 'contact-general',
            title: { en: 'Section 1: Contact Us & Enquiry', ar: 'القسم الأول: اتصل بنا والاستفسارات' },
            subtitle: { en: 'Header headlines, descriptions, and enquiry form routing', ar: 'العناوين الرئيسية ونصوص نموذج الاستفسار' },
            status: 'Active',
            lastUpdated: '30 Oct 2026',
            badgeColor: 'red',
          },
          {
            id: 'contact-offices',
            title: { en: 'Section 2: Corporate Office & Map', ar: 'القسم الثاني: المكتب الرئيسي والخريطة' },
            subtitle: { en: 'Headquarters address, email, phone, and interactive Google Maps', ar: 'عنوان المقر، البريد، الهاتف، وخريطة جوجل التفاعلية' },
            status: 'Active',
            lastUpdated: '30 Oct 2026',
            badgeColor: 'red',
          },
        ],
      },
    ],
  },
  {
    id: 'projects-innovator',
    label: 'Projects Innovator',
    labelAr: 'مبتكر المشاريع',
    iconName: 'Building2',
    description: 'Holding entity banner, brand logos, about profile, business areas, and work together banner.',
    groups: [
      {
        id: 'pi-overview',
        title: { en: 'Projects Innovator Division', ar: 'قسم مبتكر المشاريع' },
        description: { en: 'Manage public holding entity landing page and business sectors', ar: 'إدارة صفحة الكيان القابض وقطاعات الأعمال' },
        iconName: 'Building2',
        accentColor: 'red',
        items: [
          {
            id: 'pi-hero',
            title: { en: 'Section 1: Banner', ar: 'القسم الأول: بانر الواجهة' },
            subtitle: { en: 'Building Tomorrow Through Innovation', ar: 'بناء الغد من خلال الابتكار' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'red',
          },
          {
            id: 'pi-brands',
            title: { en: 'Section 2: Brand Logos', ar: 'القسم الثاني: شعارات العلامات التجارية' },
            subtitle: { en: 'Trusted brands and industry leaders list', ar: 'قائمة العلامات التجارية وقادة الصناعة' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'blue',
          },
          {
            id: 'pi-about',
            title: { en: 'Section 3: About Projects Innovator', ar: 'القسم الثالث: عن مبتكر المشاريع' },
            subtitle: { en: 'Holding entity platform for sustainable growth', ar: 'منصة الكيان القابض للنمو المستدام' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'purple',
          },
          {
            id: 'pi-business-areas',
            title: { en: 'Section 4: Our Business Areas', ar: 'القسم الرابع: مجالات أعمالنا' },
            subtitle: { en: 'Medical & Lab Equipment, Supplies, and Healthcare Solutions', ar: 'الأجهزة الطبية، المستلزمات المخبرية، وحلول الرعاية' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'orange',
          },
          {
            id: 'pi-banner-cta',
            title: { en: 'Section 5: Let\'s Work Together Banner', ar: 'القسم الخامس: بانر لنعمل معاً' },
            subtitle: { en: 'Call-to-action banner, quotes, and enquiries', ar: 'بانر الحث على اتخاذ إجراء وطلب عروض الأسعار' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'red',
          },
        ],
      },
    ],
  },
  {
    id: 'attractive',
    label: 'Attractive',
    labelAr: 'أتراكتيف',
    iconName: 'Sparkles',
    description: 'Attractive company hero banner, brands, about profile, products catalog showcase, and partnership banner.',
    groups: [
      {
        id: 'att-overview',
        title: { en: 'Attractive Division', ar: 'قسم شركة أتراكتيف' },
        description: { en: 'Manage Attractive company hero, brand logos, profile, and products', ar: 'إدارة واجهة أتراكتيف والعلامات التجارية والمنتجات' },
        iconName: 'Sparkles',
        accentColor: 'blue',
        items: [
          {
            id: 'att-hero',
            title: { en: 'Section 1: Banner', ar: 'القسم الأول: بانر الواجهة' },
            subtitle: { en: 'Logo, headline, highlight, description, and hero background', ar: 'الشعار والعنوان والوصف وخلفية الواجهة' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'blue',
          },
          {
            id: 'att-brands',
            title: { en: 'Section 2: Brand Logos', ar: 'القسم الثاني: شعارات العلامات التجارية' },
            subtitle: { en: 'Brand partner logos and leadership showcase', ar: 'شعارات الشركاء والعلامات التجارية' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'blue',
          },
          {
            id: 'att-about',
            title: { en: 'Section 3: About Attractive', ar: 'القسم الثالث: عن أتراكتيف' },
            subtitle: { en: 'Tagline, mission story, and building visual', ar: 'الشعار الفرعي ورؤية الشركة وصورة المقر' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'purple',
          },
          {
            id: 'att-products',
            title: { en: 'Section 4: Our Products', ar: 'القسم الرابع: منتجاتنا' },
            subtitle: { en: 'Patient Monitor, Ultrasound, Infusion Pump, CE/FDA/ISO badges', ar: 'شاشات المراقبة والموجات فوق الصوتية والمضخات والشهادات' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'blue',
          },
          {
            id: 'att-cta',
            title: { en: 'Section 5: Let\'s Work Together Banner', ar: 'القسم الخامس: بانر لنعمل معاً' },
            subtitle: { en: 'Bottom partnership call-to-action and quote triggers', ar: 'دعوة الشراكة السفلية وطلب عروض الأسعار' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'red',
          },
        ],
      },
    ],
  },
  {
    id: 'medics-innovator',
    label: 'Medics Innovator',
    labelAr: 'ميديكس إنوفيتور',
    iconName: 'Stethoscope',
    description: 'Medics Innovator medical division hero, brands, clinical profile, healthcare products, and consultation banner.',
    groups: [
      {
        id: 'mi-overview',
        title: { en: 'Medics Innovator Division', ar: 'قسم ميديكس إنوفيتور' },
        description: { en: 'Manage clinical technologies landing page, diagnostics, and medical equipment', ar: 'إدارة صفحة التقنيات السريرية والتشخيصية والمعدات الطبية' },
        iconName: 'Stethoscope',
        accentColor: 'blue',
        items: [
          {
            id: 'mi-hero',
            title: { en: 'Section 1: Banner', ar: 'القسم الأول: بانر الواجهة' },
            subtitle: { en: 'Logo, clinical headline, highlight, and medical background', ar: 'الشعار والعنوان الطبي والوصف وخلفية الواجهة' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'blue',
          },
          {
            id: 'mi-brands',
            title: { en: 'Section 2: Brand Logos', ar: 'القسم الثاني: شعارات العلامات التجارية' },
            subtitle: { en: 'Healthcare manufacturer logos and partners', ar: 'شعارات مصنعي الرعاية الصحية والشركاء' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'blue',
          },
          {
            id: 'mi-about',
            title: { en: 'Section 3: About Medics Innovator', ar: 'القسم الثالث: عن ميديكس إنوفيتور' },
            subtitle: { en: 'Clinical excellence tagline, story, and hospital image', ar: 'رؤية التميز السريري وصورة المنشأة' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'purple',
          },
          {
            id: 'mi-products',
            title: { en: 'Section 4: Our Products', ar: 'القسم الرابع: منتجاتنا' },
            subtitle: { en: 'Featured equipment, certifications, specs, and quote actions', ar: 'الأجهزة المميزة والشهادات والمواصفات وطلب عروض الأسعار' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'blue',
          },
          {
            id: 'mi-cta',
            title: { en: 'Section 5: Let\'s Work Together Banner', ar: 'القسم الخامس: بانر لنعمل معاً' },
            subtitle: { en: 'Healthcare partnership call-to-action and clinical consultations', ar: 'دعوة الشراكة الطبية والاستشارات السريرية' },
            status: 'Active',
            lastUpdated: '02 Nov 2026',
            badgeColor: 'red',
          },
        ],
      },
    ],
  },
];

const CACHE_KEY = 'cms_home_data';
const TABS_CACHE_KEY = 'cms_all_tabs_data';
const API_BASE = 'http://localhost:5000';

const ABOUT_CACHE_KEY = 'cms_about_data';
const COMPANY_CACHE_KEY = 'cms_company_data';
const SERVICES_CACHE_KEY = 'cms_services_data';
const SHOP_CACHE_KEY = 'cms_shop_data';
const PROJECTS_CACHE_KEY = 'cms_projects_data';
const PARTNERS_CACHE_KEY = 'cms_partners_data';
const CONTACT_CACHE_KEY = 'cms_contact_data';
const PROJECTS_INNOVATOR_CACHE_KEY = 'cms_projects_innovator_data';
const ATTRACTIVE_CACHE_KEY = 'cms_attractive_data';
const MEDICS_INNOVATOR_CACHE_KEY = 'cms_medics_innovator_data';
const INVESTMENT_CACHE_KEY = 'cms_investment_data';

export const cmsService = {


  // CMS Investment Services
  async getCmsInvestment(): Promise<CmsInvestmentData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/investment`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(INVESTMENT_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default investment data:', err);
      const cached = localStorage.getItem(INVESTMENT_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsInvestmentData;
    }
  },

  async updateCmsInvestment(data: CmsInvestmentData): Promise<CmsInvestmentData> {
    try {
      localStorage.setItem(INVESTMENT_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/investment`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(INVESTMENT_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },

  // CMS Contact Services
  async getCmsContact(): Promise<CmsContactData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/contact`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(CONTACT_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default contact data:', err);
      const cached = localStorage.getItem(CONTACT_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsContactData;
    }
  },

  async updateCmsContact(data: CmsContactData): Promise<CmsContactData> {
    try {
      localStorage.setItem(CONTACT_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/contact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(CONTACT_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },

  // CMS Projects Innovator Services
  async getCmsProjectsInnovator(): Promise<CmsProjectsInnovatorData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/projects-innovator`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(PROJECTS_INNOVATOR_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default projects innovator data:', err);
      const cached = localStorage.getItem(PROJECTS_INNOVATOR_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsProjectsInnovatorData;
    }
  },

  async updateCmsProjectsInnovator(data: CmsProjectsInnovatorData): Promise<CmsProjectsInnovatorData> {
    try {
      localStorage.setItem(PROJECTS_INNOVATOR_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/projects-innovator`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(PROJECTS_INNOVATOR_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },

  // CMS Attractive Services
  async getCmsAttractive(): Promise<CmsAttractiveData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/attractive`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(ATTRACTIVE_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default Attractive data:', err);
      const cached = localStorage.getItem(ATTRACTIVE_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsAttractiveData;
    }
  },

  async updateCmsAttractive(data: CmsAttractiveData): Promise<CmsAttractiveData> {
    try {
      localStorage.setItem(ATTRACTIVE_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/attractive`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(ATTRACTIVE_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },

  // CMS Medics Innovator Services
  async getCmsMedicsInnovator(): Promise<CmsMedicsInnovatorData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/medics-innovator`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(MEDICS_INNOVATOR_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default Medics Innovator data:', err);
      const cached = localStorage.getItem(MEDICS_INNOVATOR_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsMedicsInnovatorData;
    }
  },

  async updateCmsMedicsInnovator(data: CmsMedicsInnovatorData): Promise<CmsMedicsInnovatorData> {
    try {
      localStorage.setItem(MEDICS_INNOVATOR_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/medics-innovator`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(MEDICS_INNOVATOR_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },

  // CMS Partners Services
  async getCmsPartners(): Promise<CmsPartnersData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/partners`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(PARTNERS_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default partners data:', err);
      const cached = localStorage.getItem(PARTNERS_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsPartnersData;
    }
  },

  async updateCmsPartners(data: CmsPartnersData): Promise<CmsPartnersData> {
    try {
      localStorage.setItem(PARTNERS_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/partners`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(PARTNERS_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },

  // CMS Projects Services
  async getCmsProjects(): Promise<CmsProjectsData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/projects`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default projects data:', err);
      const cached = localStorage.getItem(PROJECTS_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsProjectsData;
    }
  },

  async updateCmsProjects(data: CmsProjectsData): Promise<CmsProjectsData> {
    try {
      localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/projects`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(PROJECTS_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },

  // CMS Shop Services
  async getCmsShop(): Promise<CmsShopData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/shop`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(SHOP_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default shop data:', err);
      const cached = localStorage.getItem(SHOP_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsShopData;
    }
  },

  async updateCmsShop(data: CmsShopData): Promise<CmsShopData> {
    try {
      localStorage.setItem(SHOP_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/shop`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(SHOP_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },

  // CMS Services
  async getCmsServices(): Promise<CmsServicesData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/services`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(SERVICES_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default services data:', err);
      const cached = localStorage.getItem(SERVICES_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsServicesData;
    }
  },

  async updateCmsServices(data: CmsServicesData): Promise<CmsServicesData> {
    try {
      localStorage.setItem(SERVICES_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/services`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(SERVICES_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },


  // CMS Company Profile Services
  async getCmsCompany(): Promise<CmsCompanyData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/company`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(COMPANY_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default company data:', err);
      const cached = localStorage.getItem(COMPANY_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsCompanyData;
    }
  },

  async updateCmsCompany(data: CmsCompanyData): Promise<CmsCompanyData> {
    try {
      localStorage.setItem(COMPANY_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/company`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(COMPANY_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },


  // CMS About Us Services
  async getCmsAbout(): Promise<CmsAboutData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/about`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data && data.success && data.data) {
        localStorage.setItem(ABOUT_CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
      throw new Error('Invalid response structure');
    } catch (err) {
      console.warn('Backend unavailable, falling back to cached or default about data:', err);
      const cached = localStorage.getItem(ABOUT_CACHE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          // ignore
        }
      }
      return initialCmsAboutData;
    }
  },

  async updateCmsAbout(data: CmsAboutData): Promise<CmsAboutData> {
    try {
      localStorage.setItem(ABOUT_CACHE_KEY, JSON.stringify(data));
      const res = await fetch(`${API_BASE}/api/cms/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      if (result && result.success && result.data) {
        localStorage.setItem(ABOUT_CACHE_KEY, JSON.stringify(result.data));
        return result.data;
      }
      return data;
    } catch (err) {
      console.warn('Backend save failed, saved to local cache:', err);
      return data;
    }
  },

  async getCmsHome(): Promise<CmsHomeData> {
    try {
      const res = await fetch(`${API_BASE}/api/cms/home`);
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const data = await res.json();
      if (data.success && data.data) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(data.data));
        return data.data;
      }
    } catch (err) {
      console.warn('Backend unavailable or error, reading from local cache:', err);
    }

    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // ignore
      }
    }
    return initialCmsHomeData;
  },

  async updateCmsHome(payload: CmsHomeData): Promise<{ success: boolean; data?: CmsHomeData; message?: string }> {
    localStorage.setItem(CACHE_KEY, JSON.stringify(payload));

    try {
      const res = await fetch(`${API_BASE}/api/cms/home`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }
      const result = await res.json();
      return { success: true, data: result.data, message: result.message };
    } catch (err) {
      console.warn('Failed to save to backend, saved to local cache:', err);
      return {
        success: true,
        data: payload,
        message: 'Saved locally in cache (backend offline)',
      };
    }
  },

  getAllTabs(): CmsTabConfig[] {
    const cached = localStorage.getItem(TABS_CACHE_KEY);
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        // ignore
      }
    }
    return ALL_CMS_TABS;
  },

  saveAllTabs(tabs: CmsTabConfig[]): void {
    localStorage.setItem(TABS_CACHE_KEY, JSON.stringify(tabs));
  },
};
