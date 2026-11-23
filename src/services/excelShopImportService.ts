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

/**
 * EXACT 22 Column Headers matching the official template specifications (Columns A to V):
 * A: SKU *
 * B: Shop section *
 * C: Category *
 * D: Product name (EN) *
 * E: Product name (AR)
 * F: Brand / Manufacturer *
 * G: Country of origin
 * H: Short description (EN) * (max 160 characters)
 * I: Short description (AR)
 * J: Full description (EN)
 * K: Key specifications (EN) (one per line)
 * L: Certifications (CE / FDA / ISO / other)
 * M: Product type *
 * N: Price (USD) — Fixed Price only
 * O: Verification required? *
 * P: MOH registration no. (pharma only)
 * Q: Generic name (pharma only)
 * R: Dosage form / strength (pharma only)
 * S: Warranty / after-sales (EN)
 * T: Image file names (comma separated) *
 * U: Datasheet file name
 * V: Notes
 */
export const OFFICIAL_EXCEL_COLUMNS = {
  SKU: 'SKU *',
  SHOP_SECTION: 'Shop section *',
  CATEGORY: 'Category *',
  PRODUCT_NAME_EN: 'Product name (EN) *',
  PRODUCT_NAME_AR: 'Product name (AR)',
  BRAND_MANUFACTURER: 'Brand / Manufacturer *',
  COUNTRY_OF_ORIGIN: 'Country of origin',
  SHORT_DESC_EN: 'Short description (EN) * (max 160 characters)',
  SHORT_DESC_AR: 'Short description (AR)',
  FULL_DESC_EN: 'Full description (EN)',
  KEY_SPECS_EN: 'Key specifications (EN) (one per line)',
  CERTIFICATIONS: 'Certifications (CE / FDA / ISO / other)',
  PRODUCT_TYPE: 'Product type *',
  PRICE_USD: 'Price (USD) — Fixed Price only',
  VERIFICATION_REQUIRED: 'Verification required? *',
  MOH_REG_NO: 'MOH registration no. (pharma only)',
  GENERIC_NAME: 'Generic name (pharma only)',
  DOSAGE_FORM: 'Dosage form / strength (pharma only)',
  WARRANTY: 'Warranty / after-sales (EN)',
  IMAGE_FILE_NAMES: 'Image file names (comma separated) *',
  DATASHEET_FILE: 'Datasheet file name',
  NOTES: 'Notes',
} as const;

// Legacy alias map to guarantee 100% backwards-compatibility
export const EXCEL_COLUMNS = {
  NAME_EN: OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_EN,
  NAME_AR: OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_AR,
  BRAND_EN: OFFICIAL_EXCEL_COLUMNS.BRAND_MANUFACTURER,
  BRAND_AR: 'Brand / Category (Arabic)',
  SLUG: OFFICIAL_EXCEL_COLUMNS.SKU,
  SHORT_DESC_EN: OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_EN,
  SHORT_DESC_AR: OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_AR,
  PRODUCT_DESC_HTML_EN: OFFICIAL_EXCEL_COLUMNS.FULL_DESC_EN,
  PRODUCT_DESC_HTML_AR: 'Detailed Description HTML (Arabic)',
  PRIMARY_IMAGE: 'Primary Image URL',
  ADDITIONAL_IMAGES: OFFICIAL_EXCEL_COLUMNS.IMAGE_FILE_NAMES,
  SPECS_EN: OFFICIAL_EXCEL_COLUMNS.KEY_SPECS_EN,
  SPECS_AR: 'Key Specifications (Arabic) [Label: Value | Label: Value]',
  BADGES_EN: OFFICIAL_EXCEL_COLUMNS.CERTIFICATIONS,
  BADGES_AR: 'Certification Badges (Arabic) [Comma-separated]',
  BUTTON_TEXT_EN: 'Button Text (English)',
  BUTTON_TEXT_AR: 'Button Text (Arabic)',
  BUTTON_URL: 'Button Link URL',
};

export const toProductSlug = (text: string): string =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

/**
 * Converts plain text into clean HTML if tags are not already present.
 */
export const ensureHtmlContent = (text: string): string => {
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
 * Parses key specifications from newline or pipe separated text:
 * Format:
 * Display: 15.6" TFT LCD
 * Parameters: ECG, SpO2, NIBP, RESP, TEMP
 * Power Supply: AC 100~240V
 */
export const parseSpecsString = (
  enStr: string,
  arStr?: string
): ShopProductSpecification[] => {
  const parseParts = (raw: string) => {
    if (!raw || !raw.trim()) return [];
    const tokens = raw.split(/\r?\n|\|/).map((t) => t.trim()).filter(Boolean);
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
  const arList = parseParts(arStr || '');
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
 * Parses comma-separated badges/certifications.
 */
export const parseBadgesString = (enStr: string, arStr?: string): ShopProductBadge[] => {
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
export const getCellValue = (row: Record<string, any>, ...keys: string[]): string => {
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
 * Downloads a pre-formatted Excel template for bulk product import
 * with the EXACT 22 columns from the official specifications (Columns A to V).
 */
export const downloadShopProductsExcelTemplate = (options?: { withSampleData?: boolean }): void => {
  const withSampleData = options?.withSampleData !== false;

  const sampleRows = [
    {
      [OFFICIAL_EXCEL_COLUMNS.SKU]: 'MED-MON-001',
      [OFFICIAL_EXCEL_COLUMNS.SHOP_SECTION]: 'Medical Equipment',
      [OFFICIAL_EXCEL_COLUMNS.CATEGORY]: 'Patient Monitoring',
      [OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_EN]: 'Philips IntelliVue MX550 Patient Monitor',
      [OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_AR]: 'شاشة مراقبة المريض فيليبس إنتيليفيو MX550',
      [OFFICIAL_EXCEL_COLUMNS.BRAND_MANUFACTURER]: 'Philips Healthcare',
      [OFFICIAL_EXCEL_COLUMNS.COUNTRY_OF_ORIGIN]: 'Germany',
      [OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_EN]:
        'Advanced bedside vital signs monitoring solution for high-acuity care units and emergency rooms.',
      [OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_AR]:
        'جهاز مراقبة متقدم للعلامات الحيوية بجانب السرير لوحدات العناية المركزة والطوارئ.',
      [OFFICIAL_EXCEL_COLUMNS.FULL_DESC_EN]:
        'The IntelliVue MX550 provides advanced monitoring capabilities with a user-friendly interface, helping healthcare professionals make faster, more informed decisions. It is suitable for adult, pediatric, and neonatal patients.\n\n- 15.6" high-resolution display\n- Multiple parameter monitoring (ECG, SpO2, NIBP, RESP, TEMP)\n- Advanced alarm management\n- Network connectivity (HL7, DICOM)\n- Ergonomic and compact design',
      [OFFICIAL_EXCEL_COLUMNS.KEY_SPECS_EN]:
        'Display: 15.6" TFT LCD\nParameters: ECG, SpO2, NIBP, RESP, TEMP\nPower Supply: AC 100~240V, 50/60Hz\nDimensions: 380 x 280 x 180 mm\nWeight: 6.5 kg',
      [OFFICIAL_EXCEL_COLUMNS.CERTIFICATIONS]: 'CE Certified, FDA Registered, ISO 13485',
      [OFFICIAL_EXCEL_COLUMNS.PRODUCT_TYPE]: 'Quote Only',
      [OFFICIAL_EXCEL_COLUMNS.PRICE_USD]: '',
      [OFFICIAL_EXCEL_COLUMNS.VERIFICATION_REQUIRED]: 'Yes',
      [OFFICIAL_EXCEL_COLUMNS.MOH_REG_NO]: 'MOH-MED-2024-8842',
      [OFFICIAL_EXCEL_COLUMNS.GENERIC_NAME]: 'Multi-Parameter Patient Monitor',
      [OFFICIAL_EXCEL_COLUMNS.DOSAGE_FORM]: 'N/A',
      [OFFICIAL_EXCEL_COLUMNS.WARRANTY]: '2 Years Manufacturer Warranty & 24/7 Technical Support',
      [OFFICIAL_EXCEL_COLUMNS.IMAGE_FILE_NAMES]:
        'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80, https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80, https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      [OFFICIAL_EXCEL_COLUMNS.DATASHEET_FILE]: 'philips-mx550-datasheet.pdf',
      [OFFICIAL_EXCEL_COLUMNS.NOTES]: 'Requires hospital installation and calibration.',
    },
    {
      [OFFICIAL_EXCEL_COLUMNS.SKU]: 'MED-ULT-002',
      [OFFICIAL_EXCEL_COLUMNS.SHOP_SECTION]: 'Medical Equipment',
      [OFFICIAL_EXCEL_COLUMNS.CATEGORY]: 'Ultrasound & Diagnostics',
      [OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_EN]: 'Digital Ultrasound Diagnostic System',
      [OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_AR]: 'نظام الموجات فوق الصوتية الرقمي التشخيصي',
      [OFFICIAL_EXCEL_COLUMNS.BRAND_MANUFACTURER]: 'SonoCare Medical',
      [OFFICIAL_EXCEL_COLUMNS.COUNTRY_OF_ORIGIN]: 'Japan',
      [OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_EN]:
        'A versatile digital ultrasound imaging system for clinical diagnostics and bedside examinations.',
      [OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_AR]:
        'نظام تصوير رقمي متعدد الاستخدامات بالموجات فوق الصوتية للتشخيص السريري وفحوصات المرضى.',
      [OFFICIAL_EXCEL_COLUMNS.FULL_DESC_EN]:
        'Engineered for high-clarity diagnostic imaging across cardiology, radiology, and point-of-care environments.\n\n- 21.5" Full HD LED articulated monitor\n- 4 active transducer probe ports\n- Color Doppler, PW, and CW imaging modes\n- Integrated DICOM archiving and network export',
      [OFFICIAL_EXCEL_COLUMNS.KEY_SPECS_EN]:
        'Display: 21.5" Full HD LED\nImaging Modes: B, M, Color Doppler, PW, CW\nProbe Ports: 4 Active Ports\nPower Supply: AC 100~240V, 50/60Hz\nWeight: 75 kg',
      [OFFICIAL_EXCEL_COLUMNS.CERTIFICATIONS]: 'CE Certified, ISO 9001, ISO 13485',
      [OFFICIAL_EXCEL_COLUMNS.PRODUCT_TYPE]: 'Quote Only',
      [OFFICIAL_EXCEL_COLUMNS.PRICE_USD]: '',
      [OFFICIAL_EXCEL_COLUMNS.VERIFICATION_REQUIRED]: 'Yes',
      [OFFICIAL_EXCEL_COLUMNS.MOH_REG_NO]: 'MOH-MED-2023-1120',
      [OFFICIAL_EXCEL_COLUMNS.GENERIC_NAME]: 'Color Doppler Ultrasound System',
      [OFFICIAL_EXCEL_COLUMNS.DOSAGE_FORM]: 'N/A',
      [OFFICIAL_EXCEL_COLUMNS.WARRANTY]: '3 Years On-site Warranty & Calibration Included',
      [OFFICIAL_EXCEL_COLUMNS.IMAGE_FILE_NAMES]:
        'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80, https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
      [OFFICIAL_EXCEL_COLUMNS.DATASHEET_FILE]: 'sonocare-specs.pdf',
      [OFFICIAL_EXCEL_COLUMNS.NOTES]: 'Standard probe package included.',
    },
  ];

  // Blank template: exact 22 headers with empty first row ready for data entry
  const blankRow = {
    [OFFICIAL_EXCEL_COLUMNS.SKU]: '',
    [OFFICIAL_EXCEL_COLUMNS.SHOP_SECTION]: '',
    [OFFICIAL_EXCEL_COLUMNS.CATEGORY]: '',
    [OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_EN]: '',
    [OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_AR]: '',
    [OFFICIAL_EXCEL_COLUMNS.BRAND_MANUFACTURER]: '',
    [OFFICIAL_EXCEL_COLUMNS.COUNTRY_OF_ORIGIN]: '',
    [OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_EN]: '',
    [OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_AR]: '',
    [OFFICIAL_EXCEL_COLUMNS.FULL_DESC_EN]: '',
    [OFFICIAL_EXCEL_COLUMNS.KEY_SPECS_EN]: '',
    [OFFICIAL_EXCEL_COLUMNS.CERTIFICATIONS]: '',
    [OFFICIAL_EXCEL_COLUMNS.PRODUCT_TYPE]: 'Quote Only',
    [OFFICIAL_EXCEL_COLUMNS.PRICE_USD]: '',
    [OFFICIAL_EXCEL_COLUMNS.VERIFICATION_REQUIRED]: 'Yes',
    [OFFICIAL_EXCEL_COLUMNS.MOH_REG_NO]: '',
    [OFFICIAL_EXCEL_COLUMNS.GENERIC_NAME]: '',
    [OFFICIAL_EXCEL_COLUMNS.DOSAGE_FORM]: '',
    [OFFICIAL_EXCEL_COLUMNS.WARRANTY]: '',
    [OFFICIAL_EXCEL_COLUMNS.IMAGE_FILE_NAMES]: '',
    [OFFICIAL_EXCEL_COLUMNS.DATASHEET_FILE]: '',
    [OFFICIAL_EXCEL_COLUMNS.NOTES]: '',
  };

  const templateRows = withSampleData ? sampleRows : [blankRow];

  const wb = XLSX.utils.book_new();

  // Sheet 1: Products Template
  const ws = XLSX.utils.json_to_sheet(templateRows);

  // Column width formatting for all 22 columns (A to V)
  ws['!cols'] = [
    { wch: 18 }, // A: SKU *
    { wch: 22 }, // B: Shop section *
    { wch: 22 }, // C: Category *
    { wch: 38 }, // D: Product name (EN) *
    { wch: 32 }, // E: Product name (AR)
    { wch: 26 }, // F: Brand / Manufacturer *
    { wch: 20 }, // G: Country of origin
    { wch: 45 }, // H: Short description (EN) * (max 160 characters)
    { wch: 35 }, // I: Short description (AR)
    { wch: 55 }, // J: Full description (EN)
    { wch: 55 }, // K: Key specifications (EN) (one per line)
    { wch: 38 }, // L: Certifications (CE / FDA / ISO / other)
    { wch: 20 }, // M: Product type *
    { wch: 32 }, // N: Price (USD) — Fixed Price only
    { wch: 24 }, // O: Verification required? *
    { wch: 35 }, // P: MOH registration no. (pharma only)
    { wch: 30 }, // Q: Generic name (pharma only)
    { wch: 35 }, // R: Dosage form / strength (pharma only)
    { wch: 35 }, // S: Warranty / after-sales (EN)
    { wch: 45 }, // T: Image file names (comma separated) *
    { wch: 25 }, // U: Datasheet file name
    { wch: 30 }, // V: Notes
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Products Template');

  // Sheet 2: Field Instructions & Guide
  const instructions = [
    {
      Column: 'A',
      Header: OFFICIAL_EXCEL_COLUMNS.SKU,
      Required: 'YES',
      Description: 'Unique product SKU or code (used to generate URL slug).',
      Example: 'MED-MON-001',
    },
    {
      Column: 'B',
      Header: OFFICIAL_EXCEL_COLUMNS.SHOP_SECTION,
      Required: 'YES',
      Description: 'Shop section division (e.g. Medical Equipment, Lab Supplies).',
      Example: 'Medical Equipment',
    },
    {
      Column: 'C',
      Header: OFFICIAL_EXCEL_COLUMNS.CATEGORY,
      Required: 'YES',
      Description: 'Product category taxonomy.',
      Example: 'Patient Monitoring',
    },
    {
      Column: 'D',
      Header: OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_EN,
      Required: 'YES',
      Description: 'Official English commercial name of the product.',
      Example: 'Philips IntelliVue MX550 Patient Monitor',
    },
    {
      Column: 'E',
      Header: OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_AR,
      Required: 'Recommended',
      Description: 'Arabic name of the product (defaults to English if empty).',
      Example: 'شاشة مراقبة المريض فيليبس إنتيليفيو MX550',
    },
    {
      Column: 'F',
      Header: OFFICIAL_EXCEL_COLUMNS.BRAND_MANUFACTURER,
      Required: 'YES',
      Description: 'Manufacturer or brand name.',
      Example: 'Philips Healthcare',
    },
    {
      Column: 'G',
      Header: OFFICIAL_EXCEL_COLUMNS.COUNTRY_OF_ORIGIN,
      Required: 'Optional',
      Description: 'Country where the equipment is manufactured.',
      Example: 'Germany / Japan',
    },
    {
      Column: 'H',
      Header: OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_EN,
      Required: 'YES',
      Description: 'Short 1-2 sentence overview for catalog cards (max 160 chars).',
      Example: 'Advanced vital signs monitoring for high-acuity care units.',
    },
    {
      Column: 'I',
      Header: OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_AR,
      Required: 'Optional',
      Description: 'Short Arabic overview description.',
      Example: 'جهاز مراقبة متقدم للعلامات الحيوية بجانب السرير.',
    },
    {
      Column: 'J',
      Header: OFFICIAL_EXCEL_COLUMNS.FULL_DESC_EN,
      Required: 'Recommended',
      Description: 'Full detailed product description (paragraphs or bullet points).',
      Example: 'Provides advanced clinical monitoring capabilities...\n- High-resolution display',
    },
    {
      Column: 'K',
      Header: OFFICIAL_EXCEL_COLUMNS.KEY_SPECS_EN,
      Required: 'Recommended',
      Description: 'One specification per line in "Label: Value" format.',
      Example: 'Display: 15.6" LCD\nPower: AC 100~240V\nWeight: 6.5 kg',
    },
    {
      Column: 'L',
      Header: OFFICIAL_EXCEL_COLUMNS.CERTIFICATIONS,
      Required: 'Optional',
      Description: 'Certifications and regulatory badges separated by commas.',
      Example: 'CE Certified, FDA Registered, ISO 13485',
    },
    {
      Column: 'M',
      Header: OFFICIAL_EXCEL_COLUMNS.PRODUCT_TYPE,
      Required: 'YES',
      Description: 'Catalog product type: "Quote Only" or "Fixed Price".',
      Example: 'Quote Only',
    },
    {
      Column: 'N',
      Header: OFFICIAL_EXCEL_COLUMNS.PRICE_USD,
      Required: 'Optional',
      Description: 'Price in USD (only if Product Type is Fixed Price).',
      Example: '4500.00',
    },
    {
      Column: 'O',
      Header: OFFICIAL_EXCEL_COLUMNS.VERIFICATION_REQUIRED,
      Required: 'YES',
      Description: 'Whether administrative verification is required (Yes / No).',
      Example: 'Yes',
    },
    {
      Column: 'P',
      Header: OFFICIAL_EXCEL_COLUMNS.MOH_REG_NO,
      Required: 'Optional',
      Description: 'Ministry of Health registration number (for pharma products).',
      Example: 'MOH-MED-2024-8842',
    },
    {
      Column: 'Q',
      Header: OFFICIAL_EXCEL_COLUMNS.GENERIC_NAME,
      Required: 'Optional',
      Description: 'International generic scientific/device name.',
      Example: 'Multi-Parameter Patient Monitor',
    },
    {
      Column: 'R',
      Header: OFFICIAL_EXCEL_COLUMNS.DOSAGE_FORM,
      Required: 'Optional',
      Description: 'Dosage form or strength (pharma products only).',
      Example: 'N/A',
    },
    {
      Column: 'S',
      Header: OFFICIAL_EXCEL_COLUMNS.WARRANTY,
      Required: 'Optional',
      Description: 'Warranty period and after-sales service terms.',
      Example: '2 Years Manufacturer Warranty',
    },
    {
      Column: 'T',
      Header: OFFICIAL_EXCEL_COLUMNS.IMAGE_FILE_NAMES,
      Required: 'YES',
      Description:
        'Image URLs or comma-separated image file names. After import, you can upload actual image files directly using the Edit button on each product!',
      Example: 'https://images.unsplash.com/... OR product-main.jpg, product-side.jpg',
    },
    {
      Column: 'U',
      Header: OFFICIAL_EXCEL_COLUMNS.DATASHEET_FILE,
      Required: 'Optional',
      Description: 'Technical PDF datasheet file name or URL.',
      Example: 'product-datasheet.pdf',
    },
    {
      Column: 'V',
      Header: OFFICIAL_EXCEL_COLUMNS.NOTES,
      Required: 'Optional',
      Description: 'Internal notes or special hospital delivery instructions.',
      Example: 'Requires technical installation.',
    },
  ];

  const wsInstructions = XLSX.utils.json_to_sheet(instructions);
  wsInstructions['!cols'] = [
    { wch: 8 },
    { wch: 35 },
    { wch: 14 },
    { wch: 55 },
    { wch: 45 },
  ];
  XLSX.utils.book_append_sheet(wb, wsInstructions, 'Instructions & Field Guide');

  const fileName = withSampleData
    ? 'Shop_Products_Bulk_Import_Sample_Template.xlsx'
    : 'Shop_Products_Bulk_Import_Blank_Template.xlsx';

  XLSX.writeFile(wb, fileName);
};

/**
 * Parses and validates an uploaded Excel file using the 22 canonical columns.
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

    // 1. Product Name (EN & AR) - Column D & E
    const nameEn = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_EN,
      'Product name (EN)',
      'Product Name (English) *',
      'Product Name (English)',
      'Product Name',
      'name_en',
      'nameEn',
      'Name'
    );
    const nameAr = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_AR,
      'Product name (AR)',
      'Product Name (Arabic) *',
      'Product Name (Arabic)',
      'name_ar',
      'nameAr',
      'اسم المنتج'
    );

    if (!nameEn && !nameAr) {
      errors.push('Product Name (EN) is required.');
    }

    // 2. Brand / Manufacturer - Column F
    const brandEn = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.BRAND_MANUFACTURER,
      'Brand / Manufacturer',
      'Brand / Category (English)',
      'Brand',
      'Manufacturer',
      'brand_en'
    );
    const brandAr = getCellValue(
      row,
      'Brand / Category (Arabic)',
      'Brand (Arabic)',
      'brand_ar',
      'العلامة التجارية'
    );

    // 3. Category & Section - Column B & C
    const shopSection = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.SHOP_SECTION,
      'Shop section',
      'Section'
    );
    const category = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.CATEGORY,
      'Category'
    );

    // 4. SKU & Slug - Column A
    const sku = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.SKU,
      'SKU',
      'Product Slug (Optional)',
      'Slug'
    );
    const slug = sku
      ? toProductSlug(sku)
      : nameEn
      ? toProductSlug(nameEn)
      : `prod-${Date.now()}-${idx + 1}`;

    // 5. Short Descriptions - Column H & I
    const shortDescEn = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_EN,
      'Short description (EN)',
      'Short Summary (English)',
      'short_description_en',
      'Summary'
    );
    const shortDescAr = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_AR,
      'Short description (AR)',
      'Short Summary (Arabic)',
      'short_description_ar',
      'الوصف'
    );

    // 6. Full Description (HTML) - Column J
    const fullDescEnRaw = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.FULL_DESC_EN,
      'Full description',
      'Detailed Description HTML (English)',
      'product_description_html_en',
      'Description'
    );
    const productDescHtmlEn = ensureHtmlContent(fullDescEnRaw || shortDescEn);
    const productDescHtmlAr = ensureHtmlContent(shortDescAr || fullDescEnRaw || shortDescEn);

    // 7. Images - Column T
    const imageNamesRaw = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.IMAGE_FILE_NAMES,
      'Image file names',
      'Primary Image URL',
      'Additional Image URLs (Comma-separated)',
      'images',
      'image'
    );

    const parsedImages = (imageNamesRaw || '')
      .split(/[,|\n]/)
      .map((u) => u.trim())
      .filter(Boolean);

    // Filter to real URLs vs placeholder filenames
    const validUrlImages = parsedImages.filter((img) => /^https?:\/\//i.test(img));

    if (validUrlImages.length === 0) {
      if (parsedImages.length > 0) {
        warnings.push(
          `Image filenames specified: "${parsedImages.slice(0, 2).join(', ')}". Click the Edit button on this product to upload actual image files.`
        );
      } else {
        warnings.push('No images specified. Use the Edit button to upload product images.');
      }
    }

    // 8. Key Specifications - Column K
    const keySpecsRaw = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.KEY_SPECS_EN,
      'Key specifications (EN)',
      'Key Specifications (English) [Label: Value | Label: Value]',
      'specifications_en',
      'specs_en'
    );
    const specifications = parseSpecsString(keySpecsRaw);

    // Incorporate auxiliary fields into specifications if present
    const countryOfOrigin = getCellValue(row, OFFICIAL_EXCEL_COLUMNS.COUNTRY_OF_ORIGIN);
    if (countryOfOrigin && !specifications.some((s) => /country/i.test(s.label.en))) {
      specifications.push({
        id: `spec-${Date.now()}-origin`,
        label: { en: 'Country of Origin', ar: 'بلد المنشأ' },
        value: { en: countryOfOrigin, ar: countryOfOrigin },
      });
    }

    const warranty = getCellValue(row, OFFICIAL_EXCEL_COLUMNS.WARRANTY);
    if (warranty && !specifications.some((s) => /warranty/i.test(s.label.en))) {
      specifications.push({
        id: `spec-${Date.now()}-warranty`,
        label: { en: 'Warranty', ar: 'الضمان' },
        value: { en: warranty, ar: warranty },
      });
    }

    const mohReg = getCellValue(row, OFFICIAL_EXCEL_COLUMNS.MOH_REG_NO);
    if (mohReg && !specifications.some((s) => /moh/i.test(s.label.en))) {
      specifications.push({
        id: `spec-${Date.now()}-moh`,
        label: { en: 'MOH Registration', ar: 'رقم تسجيل وزارة الصحة' },
        value: { en: mohReg, ar: mohReg },
      });
    }

    const genericName = getCellValue(row, OFFICIAL_EXCEL_COLUMNS.GENERIC_NAME);
    if (genericName && !specifications.some((s) => /generic/i.test(s.label.en))) {
      specifications.push({
        id: `spec-${Date.now()}-generic`,
        label: { en: 'Generic Name', ar: 'الاسم العلمي' },
        value: { en: genericName, ar: genericName },
      });
    }

    const dosage = getCellValue(row, OFFICIAL_EXCEL_COLUMNS.DOSAGE_FORM);
    if (dosage && !specifications.some((s) => /dosage/i.test(s.label.en))) {
      specifications.push({
        id: `spec-${Date.now()}-dosage`,
        label: { en: 'Dosage Form / Strength', ar: 'الشكل الصيدلاني والتركيز' },
        value: { en: dosage, ar: dosage },
      });
    }

    // 9. Badges / Certifications - Column L
    const certsRaw = getCellValue(
      row,
      OFFICIAL_EXCEL_COLUMNS.CERTIFICATIONS,
      'Certifications',
      'Certification Badges (English) [Comma-separated]',
      'badges_en',
      'Badges'
    );
    const badges = parseBadgesString(certsRaw);

    // If category is provided, append as category badge if not present
    if (category && !badges.some((b) => b.en.toLowerCase() === category.toLowerCase())) {
      badges.push({
        id: `badge-${Date.now()}-cat`,
        en: category,
        ar: category,
      });
    }

    // 10. Product Type & Pricing - Column M & N
    const productType = getCellValue(row, OFFICIAL_EXCEL_COLUMNS.PRODUCT_TYPE, 'Product type');
    const price = getCellValue(row, OFFICIAL_EXCEL_COLUMNS.PRICE_USD, 'Price (USD)');

    const isFixedPrice = /fixed/i.test(productType) && price && Number(price) > 0;
    const buttonTextEn = isFixedPrice ? `Order ($${price})` : 'Request a Quote';
    const buttonTextAr = isFixedPrice ? `طلب ($${price})` : 'طلب عرض أسعار';
    const buttonUrl = '/contact';

    const isValid = errors.length === 0;

    let product: ShopProductCard | undefined;
    if (isValid) {
      product = {
        id: `prod-${Date.now()}-${idx + 1}`,
        slug,
        image: validUrlImages[0] || (parsedImages[0] ? parsedImages[0] : ''),
        images: validUrlImages.length > 0 ? validUrlImages : parsedImages,
        brand: {
          en: brandEn || shopSection || 'Mubtaker Medical',
          ar: brandAr || brandEn || shopSection || 'مبتكر الطبية',
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
 * Exports current shop products catalog to an Excel file using the 22 canonical columns.
 */
export const exportCurrentShopProductsToExcel = (products: ShopProductCard[]): void => {
  if (!products || products.length === 0) {
    throw new Error('There are no products in the catalog to export.');
  }

  const exportRows = products.map((prod) => {
    const specsString = (prod.specifications || [])
      .map((s) => `${s.label.en}: ${s.value.en}`)
      .join('\n');
    const badgesString = (prod.badges || []).map((b) => b.en).join(', ');
    const allImages = (prod.images && prod.images.length > 0)
      ? prod.images.join(', ')
      : (prod.image || '');

    return {
      [OFFICIAL_EXCEL_COLUMNS.SKU]: prod.slug || prod.id || '',
      [OFFICIAL_EXCEL_COLUMNS.SHOP_SECTION]: 'Medical Equipment',
      [OFFICIAL_EXCEL_COLUMNS.CATEGORY]: prod.badges?.[0]?.en || prod.brand?.en || '',
      [OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_EN]: prod.name?.en || '',
      [OFFICIAL_EXCEL_COLUMNS.PRODUCT_NAME_AR]: prod.name?.ar || '',
      [OFFICIAL_EXCEL_COLUMNS.BRAND_MANUFACTURER]: prod.brand?.en || '',
      [OFFICIAL_EXCEL_COLUMNS.COUNTRY_OF_ORIGIN]: '',
      [OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_EN]: prod.description?.en || '',
      [OFFICIAL_EXCEL_COLUMNS.SHORT_DESC_AR]: prod.description?.ar || '',
      [OFFICIAL_EXCEL_COLUMNS.FULL_DESC_EN]: prod.productDescription?.en || '',
      [OFFICIAL_EXCEL_COLUMNS.KEY_SPECS_EN]: specsString,
      [OFFICIAL_EXCEL_COLUMNS.CERTIFICATIONS]: badgesString,
      [OFFICIAL_EXCEL_COLUMNS.PRODUCT_TYPE]: 'Quote Only',
      [OFFICIAL_EXCEL_COLUMNS.PRICE_USD]: '',
      [OFFICIAL_EXCEL_COLUMNS.VERIFICATION_REQUIRED]: 'Yes',
      [OFFICIAL_EXCEL_COLUMNS.MOH_REG_NO]: '',
      [OFFICIAL_EXCEL_COLUMNS.GENERIC_NAME]: '',
      [OFFICIAL_EXCEL_COLUMNS.DOSAGE_FORM]: '',
      [OFFICIAL_EXCEL_COLUMNS.WARRANTY]: '',
      [OFFICIAL_EXCEL_COLUMNS.IMAGE_FILE_NAMES]: allImages,
      [OFFICIAL_EXCEL_COLUMNS.DATASHEET_FILE]: '',
      [OFFICIAL_EXCEL_COLUMNS.NOTES]: '',
    };
  });

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(exportRows);

  ws['!cols'] = [
    { wch: 18 },
    { wch: 22 },
    { wch: 22 },
    { wch: 38 },
    { wch: 32 },
    { wch: 26 },
    { wch: 20 },
    { wch: 45 },
    { wch: 35 },
    { wch: 55 },
    { wch: 55 },
    { wch: 38 },
    { wch: 20 },
    { wch: 32 },
    { wch: 24 },
    { wch: 35 },
    { wch: 30 },
    { wch: 35 },
    { wch: 35 },
    { wch: 45 },
    { wch: 25 },
    { wch: 30 },
  ];

  XLSX.utils.book_append_sheet(wb, ws, 'Shop Products');
  const dateStr = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `Shop_Products_Export_${dateStr}.xlsx`);
};
