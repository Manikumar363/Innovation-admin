import * as XLSX from 'xlsx';
import type {
  ShopProductCard,
  ShopProductBadge,
  ShopProductSpecification,
} from './cmsService';

export interface ExcelRowValidation {
  rowNumber: number;
  isValid: boolean;
  product?: ShopProductCard;
  errors: string[];
  warnings: string[];
}

export interface ExcelImportParseResult {
  totalRows: number;
  validRowsCount: number;
  errorRowsCount: number;
  validProducts: ShopProductCard[];
  rowResults: ExcelRowValidation[];
}

// Canonical Column Headers
export const EXCEL_COLUMNS = {
  NAME_EN: 'Product Name (English) *',
  NAME_AR: 'Product Name (Arabic) *',
  BRAND_EN: 'Brand / Category (English)',
  BRAND_AR: 'Brand / Category (Arabic)',
  SLUG: 'Product Slug (Optional)',
  SHORT_DESC_EN: 'Short Summary (English)',
  SHORT_DESC_AR: 'Short Summary (Arabic)',
  PRODUCT_DESC_HTML_EN: 'Detailed Description HTML (English)',
  PRODUCT_DESC_HTML_AR: 'Detailed Description HTML (Arabic)',
  PRIMARY_IMAGE: 'Primary Image URL',
  ADDITIONAL_IMAGES: 'Additional Image URLs (Comma-separated)',
  SPECS_EN: 'Key Specifications (English) [Label: Value | Label: Value]',
  SPECS_AR: 'Key Specifications (Arabic) [Label: Value | Label: Value]',
  BADGES_EN: 'Certification Badges (English) [Comma-separated]',
  BADGES_AR: 'Certification Badges (Arabic) [Comma-separated]',
  BUTTON_TEXT_EN: 'Button Text (English)',
  BUTTON_TEXT_AR: 'Button Text (Arabic)',
  BUTTON_URL: 'Button Link URL',
};

const toProductSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Converts plain text into clean HTML if tags are not already present.
 */
const ensureHtmlContent = (text: string): string => {
  if (!text || !text.trim()) return '';
  const trimmed = text.trim();
  if (/<[a-z][\s\S]*>/i.test(trimmed)) {
    return trimmed;
  }

  const lines = trimmed.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const bulletLines: string[] = [];
  const paragraphs: string[] = [];

  for (const line of lines) {
    if (/^[-*•]\s*/.test(line)) {
      bulletLines.push(line.replace(/^[-*•]\s*/, ''));
    } else {
      if (bulletLines.length > 0) {
        paragraphs.push(`<ul>${bulletLines.map((b) => `<li>${b}</li>`).join('')}</ul>`);
        bulletLines.length = 0;
      }
      paragraphs.push(`<p>${line}</p>`);
    }
  }

  if (bulletLines.length > 0) {
    paragraphs.push(`<ul>${bulletLines.map((b) => `<li>${b}</li>`).join('')}</ul>`);
  }

  return paragraphs.join('');
};

/**
 * Parses pipe-separated or newline-separated key specifications.
 * Format: "Label: Value | Label: Value"
 */
const parseSpecsString = (
  enStr: string,
  arStr: string
): ShopProductSpecification[] => {
  const parseParts = (raw: string) => {
    if (!raw || !raw.trim()) return [];
    const tokens = raw.split(/[|\n]/).map((t) => t.trim()).filter(Boolean);
    return tokens.map((t) => {
      const colonIdx = t.indexOf(':');
      if (colonIdx === -1) {
        return { label: t, value: '' };
      }
      return {
        label: t.slice(0, colonIdx).trim(),
        value: t.slice(colonIdx + 1).trim(),
      };
    });
  };

  const enList = parseParts(enStr);
  const arList = parseParts(arStr);
  const maxLen = Math.max(enList.length, arList.length);
  const specs: ShopProductSpecification[] = [];

  for (let i = 0; i < maxLen; i++) {
    const en = enList[i] || { label: '', value: '' };
    const ar = arList[i] || { label: en.label, value: en.value };
    if (!en.label && !en.value && !ar.label && !ar.value) continue;
    specs.push({
      id: `spec-${Date.now()}-${i + 1}`,
      label: { en: en.label, ar: ar.label || en.label },
      value: { en: en.value, ar: ar.value || en.value },
    });
  }

  return specs;
};

/**
 * Parses comma-separated badges.
 */
const parseBadgesString = (enStr: string, arStr: string): ShopProductBadge[] => {
  const enList = (enStr || '')
    .split(/[,|\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const arList = (arStr || '')
    .split(/[,|\n]/)
    .map((s) => s.trim())
    .filter(Boolean);
  const maxLen = Math.max(enList.length, arList.length);
  const badges: ShopProductBadge[] = [];

  for (let i = 0; i < maxLen; i++) {
    const en = enList[i] || '';
    const ar = arList[i] || en;
    if (!en && !ar) continue;
    badges.push({
      id: `badge-${Date.now()}-${i + 1}`,
      en,
      ar,
    });
  }

  return badges;
};

/**
 * Finds a row cell value regardless of minor column name variations.
 */
const getCellValue = (row: Record<string, any>, ...keys: string[]): string => {
  const rowKeys = Object.keys(row);
  for (const targetKey of keys) {
    const targetNorm = targetKey.toLowerCase().replace(/[^a-z0-9]/g, '');
    for (const rk of rowKeys) {
      const rkNorm = rk.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (rkNorm === targetNorm && row[rk] !== undefined && row[rk] !== null) {
        return String(row[rk]).trim();
      }
    }
  }
  return '';
};

/**
 * Downloads a pre-formatted Excel template for bulk product import.
 */
export const downloadShopProductsExcelTemplate = (options?: { withSampleData?: boolean }): void => {
  const withSampleData = options?.withSampleData !== false;

  const templateRows = withSampleData
    ? [
        {
          [EXCEL_COLUMNS.NAME_EN]: 'Philips IntelliVue MX550 Patient Monitor',
          [EXCEL_COLUMNS.NAME_AR]: 'شاشة مراقبة المريض فيليبس إنتيليفيو MX550',
          [EXCEL_COLUMNS.BRAND_EN]: 'MedTech Solutions',
          [EXCEL_COLUMNS.BRAND_AR]: 'حلول ميدتك',
          [EXCEL_COLUMNS.SLUG]: 'philips-intellivue-mx550',
          [EXCEL_COLUMNS.SHORT_DESC_EN]:
            'Advanced bedside monitoring solution designed for high-acuity care units and emergency rooms.',
          [EXCEL_COLUMNS.SHORT_DESC_AR]:
            'حل متقدم لمراقبة المرضى بجانب السرير مصمم لوحدات العناية الفائقة وغرف الطوارئ.',
          [EXCEL_COLUMNS.PRODUCT_DESC_HTML_EN]:
            '<p>The IntelliVue MX550 provides advanced monitoring capabilities with a user-friendly interface, helping healthcare professionals make faster, more informed decisions.</p><ul><li>15.6" high-resolution display</li><li>Multiple parameter monitoring (ECG, SpO2, NIBP, RESP, TEMP)</li><li>Advanced alarm management</li><li>Network connectivity (HL7, DICOM)</li><li>Ergonomic and compact design</li></ul>',
          [EXCEL_COLUMNS.PRODUCT_DESC_HTML_AR]:
            '<p>توفر شاشة إنتيليفيو MX550 إمكانيات مراقبة متقدمة مع واجهة سهلة الاستخدام تساعد الكوادر الطبية على اتخاذ قرارات دقيقة.</p><ul><li>شاشة عالية الدقة مقاس 15.6 بوصة</li><li>مراقبة متعددة المؤشرات (تخطيط القلب، الأكسجين، الضغط، التنفس)</li><li>نظام إنذارات ذكي ومتقدم</li><li>اتصال شبكي بنظام HL7 و DICOM</li></ul>',
          [EXCEL_COLUMNS.PRIMARY_IMAGE]:
            'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
          [EXCEL_COLUMNS.ADDITIONAL_IMAGES]:
            'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80, https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
          [EXCEL_COLUMNS.SPECS_EN]:
            'Display: 15.6" TFT LCD | Parameters: ECG, SpO2, NIBP, RESP, TEMP | Power Supply: AC 100~240V, 50/60Hz | Dimensions: 380 x 280 x 180 mm | Weight: 6.5 kg',
          [EXCEL_COLUMNS.SPECS_AR]:
            'الشاشة: 15.6 بوصة TFT LCD | المعايير: ECG, SpO2, NIBP, RESP, TEMP | مصدر الطاقة: AC 100~240V, 50/60Hz | الأبعاد: 380 × 280 × 180 مم | الوزن: 6.5 كجم',
          [EXCEL_COLUMNS.BADGES_EN]: 'CE Certified, FDA Registered, ISO 13485',
          [EXCEL_COLUMNS.BADGES_AR]: 'معتمد من CE, مسجل لدى FDA, معتمد من ISO 13485',
          [EXCEL_COLUMNS.BUTTON_TEXT_EN]: 'Request a Quote',
          [EXCEL_COLUMNS.BUTTON_TEXT_AR]: 'طلب عرض أسعار',
          [EXCEL_COLUMNS.BUTTON_URL]: '/contact',
        },
        {
          [EXCEL_COLUMNS.NAME_EN]: 'Digital Ultrasound System',
          [EXCEL_COLUMNS.NAME_AR]: 'نظام الموجات فوق الصوتية الرقمي',
          [EXCEL_COLUMNS.BRAND_EN]: 'SonoCare',
          [EXCEL_COLUMNS.BRAND_AR]: 'سونوكير',
          [EXCEL_COLUMNS.SLUG]: 'digital-ultrasound-system',
          [EXCEL_COLUMNS.SHORT_DESC_EN]:
            'A versatile digital ultrasound imaging system for clinical diagnostics and bedside examinations.',
          [EXCEL_COLUMNS.SHORT_DESC_AR]:
            'نظام تصوير رقمي متعدد الاستخدامات بالموجات فوق الصوتية للتشخيص السريري وفحوصات المرضى.',
          [EXCEL_COLUMNS.PRODUCT_DESC_HTML_EN]:
            '<p>Engineered for high-clarity diagnostic imaging across cardiology, radiology, and point-of-care environments.</p><ul><li>21.5" Full HD LED articulated monitor</li><li>4 active transducer probe ports</li><li>Color Doppler, PW, and CW imaging modes</li></ul>',
          [EXCEL_COLUMNS.PRODUCT_DESC_HTML_AR]:
            '<p>مصمم للتصوير التشخيصي فائق الوضوح في أقسام القلب والأشعة والعيادات التخصصية.</p><ul><li>شاشة متحركة مقاس 21.5 بوصة Full HD LED</li><li>4 منافذ نشطة لمجسات الفحص</li><li>أوضاع تصوير دوبلر ملون و PW و CW</li></ul>',
          [EXCEL_COLUMNS.PRIMARY_IMAGE]:
            'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
          [EXCEL_COLUMNS.ADDITIONAL_IMAGES]:
            'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
          [EXCEL_COLUMNS.SPECS_EN]:
            'Display: 21.5" Full HD LED | Imaging Modes: B, M, Color Doppler, PW, CW | Probe Ports: 4 Active Ports | Power Supply: AC 100~240V, 50/60Hz',
          [EXCEL_COLUMNS.SPECS_AR]:
            'الشاشة: 21.5 بوصة Full HD LED | أوضاع التصوير: B, M, دوبلر ملون, PW, CW | منافذ المجسات: 4 منافذ نشطة | مصدر الطاقة: AC 100~240V, 50/60Hz',
          [EXCEL_COLUMNS.BADGES_EN]: 'CE Certified, ISO 9001',
          [EXCEL_COLUMNS.BADGES_AR]: 'معتمد من CE, معتمد من ISO 9001',
          [EXCEL_COLUMNS.BUTTON_TEXT_EN]: 'Request a Quote',
          [EXCEL_COLUMNS.BUTTON_TEXT_AR]: 'طلب عرض أسعار',
          [EXCEL_COLUMNS.BUTTON_URL]: '/contact',
        },
      ]
    : [
        {
          [EXCEL_COLUMNS.NAME_EN]: '',
          [EXCEL_COLUMNS.NAME_AR]: '',
          [EXCEL_COLUMNS.BRAND_EN]: '',
          [EXCEL_COLUMNS.BRAND_AR]: '',
          [EXCEL_COLUMNS.SLUG]: '',
          [EXCEL_COLUMNS.SHORT_DESC_EN]: '',
          [EXCEL_COLUMNS.SHORT_DESC_AR]: '',
          [EXCEL_COLUMNS.PRODUCT_DESC_HTML_EN]: '',
          [EXCEL_COLUMNS.PRODUCT_DESC_HTML_AR]: '',
          [EXCEL_COLUMNS.PRIMARY_IMAGE]: '',
          [EXCEL_COLUMNS.ADDITIONAL_IMAGES]: '',
          [EXCEL_COLUMNS.SPECS_EN]: '',
          [EXCEL_COLUMNS.SPECS_AR]: '',
          [EXCEL_COLUMNS.BADGES_EN]: '',
          [EXCEL_COLUMNS.BADGES_AR]: '',
          [EXCEL_COLUMNS.BUTTON_TEXT_EN]: 'Request a Quote',
          [EXCEL_COLUMNS.BUTTON_TEXT_AR]: 'طلب عرض أسعار',
          [EXCEL_COLUMNS.BUTTON_URL]: '/contact',
        },
      ];

  const wb = XLSX.utils.book_new();

  // Sheet 1: Products Template
  const ws = XLSX.utils.json_to_sheet(templateRows);

  // Column width formatting
  ws['!cols'] = [
    { wch: 32 }, // Name EN
    { wch: 32 }, // Name AR
    { wch: 22 }, // Brand EN
    { wch: 22 }, // Brand AR
    { wch: 24 }, // Slug
    { wch: 35 }, // Short Desc EN
    { wch: 35 }, // Short Desc AR
    { wch: 45 }, // Product Desc HTML EN
    { wch: 45 }, // Product Desc HTML AR
    { wch: 35 }, // Primary Image URL
    { wch: 45 }, // Additional Image URLs
    { wch: 55 }, // Specs EN
    { wch: 55 }, // Specs AR
    { wch: 30 }, // Badges EN
    { wch: 30 }, // Badges AR
    { wch: 20 }, // Button Text EN
    { wch: 20 }, // Button Text AR
    { wch: 18 }, // Button URL
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Products Template');

  // Sheet 2: Field Instructions & Guide
  const instructions = [
    {
      Field: 'Product Name (English) *',
      Required: 'YES',
      Description: 'The English commercial name of the medical product or equipment.',
      Example: 'Philips IntelliVue MX550 Patient Monitor',
    },
    {
      Field: 'Product Name (Arabic) *',
      Required: 'Recommended',
      Description: 'The Arabic name of the product (defaults to English if left empty).',
      Example: 'شاشة مراقبة المريض فيليبس إنتيليفيو MX550',
    },
    {
      Field: 'Brand / Category (English & Arabic)',
      Required: 'Optional',
      Description: 'Manufacturer, brand or device category tag.',
      Example: 'MedTech / SonoCare',
    },
    {
      Field: 'Product Slug (Optional)',
      Required: 'Optional',
      Description: 'URL-friendly slug. If left blank, it will be automatically generated from the English name.',
      Example: 'philips-intellivue-mx550',
    },
    {
      Field: 'Short Summary (English & Arabic)',
      Required: 'Optional',
      Description: 'Brief 1-2 sentence description displayed on the shop catalog card.',
      Example: 'A medical monitoring device designed to track vital signs.',
    },
    {
      Field: 'Detailed Description HTML (English & Arabic)',
      Required: 'Optional',
      Description: 'Full rich HTML or plain text with bullet points for the Product Details page.',
      Example: '<p>Overview</p><ul><li>Feature 1</li><li>Feature 2</li></ul>',
    },
    {
      Field: 'Primary Image URL',
      Required: 'Optional',
      Description: 'Main product image URL (https://...).',
      Example: 'https://images.unsplash.com/...',
    },
    {
      Field: 'Additional Image URLs',
      Required: 'Optional',
      Description: 'Multiple gallery images separated by commas or line breaks.',
      Example: 'https://image1.jpg, https://image2.jpg',
    },
    {
      Field: 'Key Specifications',
      Required: 'Optional',
      Description: 'Label and Value pairs separated by pipe (|). Format: Label: Value | Label: Value',
      Example: 'Display: 15.6" LCD | Power Supply: AC 100~240V | Weight: 6.5 kg',
    },
    {
      Field: 'Certification Badges',
      Required: 'Optional',
      Description: 'Certification tags separated by commas.',
      Example: 'CE Certified, FDA Registered, ISO 13485',
    },
    {
      Field: 'Button Text & Link URL',
      Required: 'Optional',
      Description: 'Call-to-action button text and target link (defaults to "Request a Quote" / "/contact").',
      Example: 'Request a Quote | /contact',
    },
  ];

  const wsInstructions = XLSX.utils.json_to_sheet(instructions);
  wsInstructions['!cols'] = [{ wch: 30 }, { wch: 15 }, { wch: 55 }, { wch: 45 }];
  XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions & Guide');

  const fileName = withSampleData
    ? 'Shop_Products_Bulk_Import_Sample_Template.xlsx'
    : 'Shop_Products_Bulk_Import_Blank_Template.xlsx';

  XLSX.writeFile(wb, fileName);
};

/**
 * Parses and validates an uploaded Excel file.
 */
export const parseShopProductsExcelFile = async (
  file: File
): Promise<ExcelImportParseResult> => {
  const buffer = await file.arrayBuffer();
  const wb = XLSX.read(buffer, { type: 'array' });

  if (!wb.SheetNames || wb.SheetNames.length === 0) {
    throw new Error('The uploaded file does not contain any sheets.');
  }

  // Find sheet: prefer 'Products Template', 'Products', or first sheet
  const targetSheetName =
    wb.SheetNames.find((s) => /products/i.test(s)) || wb.SheetNames[0];
  const sheet = wb.Sheets[targetSheetName];

  if (!sheet) {
    throw new Error(`Sheet "${targetSheetName}" could not be read.`);
  }

  const rawRows: Array<Record<string, any>> = XLSX.utils.sheet_to_json(sheet, {
    defval: '',
  });

  if (!rawRows || rawRows.length === 0) {
    throw new Error(
      'The uploaded sheet does not contain any data rows. Please ensure your data starts below the header row.'
    );
  }

  const rowResults: ExcelRowValidation[] = [];
  const validProducts: ShopProductCard[] = [];

  rawRows.forEach((row, idx) => {
    const rowNumber = idx + 2; // Row 1 is header
    const errors: string[] = [];
    const warnings: string[] = [];

    const nameEn = getCellValue(row, EXCEL_COLUMNS.NAME_EN, 'name_en', 'nameEn', 'Product Name', 'Name');
    const nameAr = getCellValue(row, EXCEL_COLUMNS.NAME_AR, 'name_ar', 'nameAr', 'اسم المنتج');

    if (!nameEn && !nameAr) {
      errors.push('Product Name is required (either English or Arabic).');
    }

    const brandEn = getCellValue(row, EXCEL_COLUMNS.BRAND_EN, 'brand_en', 'brandEn', 'Brand', 'Category');
    const brandAr = getCellValue(row, EXCEL_COLUMNS.BRAND_AR, 'brand_ar', 'brandAr', 'العلامة التجارية');

    const customSlug = getCellValue(row, EXCEL_COLUMNS.SLUG, 'slug', 'Product Slug', 'Slug');
    const slug = customSlug
      ? toProductSlug(customSlug)
      : nameEn
      ? toProductSlug(nameEn)
      : `prod-${Date.now()}-${idx + 1}`;

    const shortDescEn = getCellValue(row, EXCEL_COLUMNS.SHORT_DESC_EN, 'short_description_en', 'description_en', 'Summary');
    const shortDescAr = getCellValue(row, EXCEL_COLUMNS.SHORT_DESC_AR, 'short_description_ar', 'description_ar', 'الوصف');

    const productDescHtmlEnRaw = getCellValue(row, EXCEL_COLUMNS.PRODUCT_DESC_HTML_EN, 'product_description_html_en', 'productDescription_en', 'HTML Description');
    const productDescHtmlArRaw = getCellValue(row, EXCEL_COLUMNS.PRODUCT_DESC_HTML_AR, 'product_description_html_ar', 'productDescription_ar', 'الوصف التفصيلي');

    const productDescHtmlEn = ensureHtmlContent(productDescHtmlEnRaw || shortDescEn);
    const productDescHtmlAr = ensureHtmlContent(productDescHtmlArRaw || shortDescAr);

    const primaryImage = getCellValue(row, EXCEL_COLUMNS.PRIMARY_IMAGE, 'primary_image_url', 'image', 'Image URL');
    const additionalImagesRaw = getCellValue(row, EXCEL_COLUMNS.ADDITIONAL_IMAGES, 'additional_images_urls', 'images', 'Gallery');

    const additionalImages = (additionalImagesRaw || '')
      .split(/[,|\n]/)
      .map((u) => u.trim())
      .filter(Boolean);

    const allImages = [
      ...(primaryImage ? [primaryImage] : []),
      ...additionalImages.filter((u) => u !== primaryImage),
    ];

    if (allImages.length === 0) {
      warnings.push('No product images provided (can be uploaded later in admin).');
    }

    const specsEnStr = getCellValue(row, EXCEL_COLUMNS.SPECS_EN, 'specifications_en', 'specs_en', 'Specifications');
    const specsArStr = getCellValue(row, EXCEL_COLUMNS.SPECS_AR, 'specifications_ar', 'specs_ar', 'المواصفات');
    const specifications = parseSpecsString(specsEnStr, specsArStr);

    const badgesEnStr = getCellValue(row, EXCEL_COLUMNS.BADGES_EN, 'badges_en', 'Badges', 'Certifications');
    const badgesArStr = getCellValue(row, EXCEL_COLUMNS.BADGES_AR, 'badges_ar', 'الشهادات');
    const badges = parseBadgesString(badgesEnStr, badgesArStr);

    const buttonTextEn = getCellValue(row, EXCEL_COLUMNS.BUTTON_TEXT_EN, 'button_text_en', 'buttonText_en') || 'Request a Quote';
    const buttonTextAr = getCellValue(row, EXCEL_COLUMNS.BUTTON_TEXT_AR, 'button_text_ar', 'buttonText_ar') || 'طلب عرض أسعار';
    const buttonUrl = getCellValue(row, EXCEL_COLUMNS.BUTTON_URL, 'button_url', 'buttonUrl') || '/contact';

    const isValid = errors.length === 0;

    let product: ShopProductCard | undefined;
    if (isValid) {
      product = {
        id: `prod-${Date.now()}-${idx + 1}`,
        slug,
        image: allImages[0] || '',
        images: allImages,
        brand: {
          en: brandEn,
          ar: brandAr || brandEn,
        },
        name: {
          en: nameEn || nameAr,
          ar: nameAr || nameEn,
        },
        description: {
          en: shortDescEn,
          ar: shortDescAr || shortDescEn,
        },
        productDescription: {
          en: productDescHtmlEn,
          ar: productDescHtmlAr || productDescHtmlEn,
        },
        specifications,
        badges,
        buttonText: {
          en: buttonTextEn,
          ar: buttonTextAr,
        },
        buttonUrl,
      };
      validProducts.push(product);
    }

    rowResults.push({
      rowNumber,
      isValid,
      product,
      errors,
      warnings,
    });
  });

  return {
    totalRows: rawRows.length,
    validRowsCount: validProducts.length,
    errorRowsCount: rawRows.length - validProducts.length,
    validProducts,
    rowResults,
  };
};

/**
 * Exports current shop products catalog to an Excel file.
 */
export const exportCurrentShopProductsToExcel = (products: ShopProductCard[]): void => {
  if (!products || products.length === 0) {
    throw new Error('There are no products in the catalog to export.');
  }

  const exportRows = products.map((prod) => ({
    [EXCEL_COLUMNS.NAME_EN]: prod.name?.en || '',
    [EXCEL_COLUMNS.NAME_AR]: prod.name?.ar || '',
    [EXCEL_COLUMNS.BRAND_EN]: prod.brand?.en || '',
    [EXCEL_COLUMNS.BRAND_AR]: prod.brand?.ar || '',
    [EXCEL_COLUMNS.SLUG]: prod.slug || '',
    [EXCEL_COLUMNS.SHORT_DESC_EN]: prod.description?.en || '',
    [EXCEL_COLUMNS.SHORT_DESC_AR]: prod.description?.ar || '',
    [EXCEL_COLUMNS.PRODUCT_DESC_HTML_EN]: prod.productDescription?.en || '',
    [EXCEL_COLUMNS.PRODUCT_DESC_HTML_AR]: prod.productDescription?.ar || '',
    [EXCEL_COLUMNS.PRIMARY_IMAGE]: prod.image || prod.images?.[0] || '',
    [EXCEL_COLUMNS.ADDITIONAL_IMAGES]: (prod.images || []).slice(1).join(', '),
    [EXCEL_COLUMNS.SPECS_EN]: (prod.specifications || [])
      .map((s) => `${s.label.en}: ${s.value.en}`)
      .join(' | '),
    [EXCEL_COLUMNS.SPECS_AR]: (prod.specifications || [])
      .map((s) => `${s.label.ar || s.label.en}: ${s.value.ar || s.value.en}`)
      .join(' | '),
    [EXCEL_COLUMNS.BADGES_EN]: (prod.badges || []).map((b) => b.en).join(', '),
    [EXCEL_COLUMNS.BADGES_AR]: (prod.badges || []).map((b) => b.ar || b.en).join(', '),
    [EXCEL_COLUMNS.BUTTON_TEXT_EN]: prod.buttonText?.en || 'Request a Quote',
    [EXCEL_COLUMNS.BUTTON_TEXT_AR]: prod.buttonText?.ar || 'طلب عرض أسعار',
    [EXCEL_COLUMNS.BUTTON_URL]: prod.buttonUrl || '/contact',
  }));

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportRows);

  ws['!cols'] = [
    { wch: 32 },
    { wch: 32 },
    { wch: 22 },
    { wch: 22 },
    { wch: 24 },
    { wch: 35 },
    { wch: 35 },
    { wch: 45 },
    { wch: 45 },
    { wch: 35 },
    { wch: 45 },
    { wch: 55 },
    { wch: 55 },
    { wch: 30 },
    { wch: 30 },
    { wch: 20 },
    { wch: 20 },
    { wch: 18 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Shop Products');
  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `Shop_Products_Export_${dateStr}.xlsx`);
};
