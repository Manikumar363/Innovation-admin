import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  Download,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  FileDown,
  Layers,
  ArrowUpRight,
  Search,
  ExternalLink,
  ShoppingBag,
  Trash2,
  Eye,
  Table,
  Edit3,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { DashboardLayout } from '../components/ui/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { ProductEditModal } from '../components/shop/ProductEditModal';
import {
  downloadShopProductsExcelTemplate,
  parseShopProductsExcelFile,
  exportCurrentShopProductsToExcel,
  type ExcelImportParseResult,
} from '../services/excelShopImportService';
import {
  cmsService,
  initialCmsShopData,
  type CmsShopData,
  type ShopProductCard,
} from '../services/cmsService';

export const ExcelSheetPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [shopData, setShopData] = useState<CmsShopData>(initialCmsShopData);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [parseResult, setParseResult] = useState<ExcelImportParseResult | null>(null);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'all' | 'valid' | 'errors'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProductPreview, setSelectedProductPreview] = useState<ShopProductCard | null>(null);
  const [editingProduct, setEditingProduct] = useState<ShopProductCard | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  useEffect(() => {
    loadShopData();
  }, []);

  const loadShopData = async () => {
    try {
      setLoading(true);
      const data = await cmsService.getCmsShop();
      if (data) {
        setShopData(data);
      }
    } catch (err: any) {
      console.error('Failed to load shop products:', err);
      toast.error('Could not load current database products');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (product: ShopProductCard) => {
    setEditingProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveProduct = async (updatedProduct: ShopProductCard) => {
    try {
      const targetIdOrSlug = updatedProduct.id || updatedProduct.slug || '';
      const resData = await cmsService.updateSingleShopProduct(targetIdOrSlug, updatedProduct);
      if (resData) {
        setShopData(resData);
      } else {
        await loadShopData();
      }
    } catch (err: any) {
      console.error('Error saving edited product:', err);
      throw err;
    }
  };

  const handleDeleteProduct = async (product: ShopProductCard) => {
    const confirmName = product.name?.en || product.slug || 'this product';
    if (!window.confirm(`Are you sure you want to delete "${confirmName}" from the database?`)) {
      return;
    }
    try {
      const targetIdOrSlug = product.id || product.slug || '';
      const resData = await cmsService.deleteShopProduct(targetIdOrSlug);
      if (resData) {
        setShopData(resData);
      } else {
        await loadShopData();
      }
      toast.success(`Deleted product "${confirmName}"`);
    } catch (err: any) {
      console.error('Error deleting product:', err);
      toast.error(err.message || 'Failed to delete product');
    }
  };

  const handleFileProcess = async (file: File) => {
    try {
      setIsParsing(true);
      setSelectedFile(file);
      const result = await parseShopProductsExcelFile(file);
      setParseResult(result);
      if (result.validRowsCount > 0) {
        toast.success(
          `Excel sheet parsed: ${result.validRowsCount} valid product${
            result.validRowsCount > 1 ? 's' : ''
          } ready to import!`
        );
      } else {
        toast.error('No valid products found in the sheet. Please review error rows.');
      }
    } catch (err: any) {
      console.error('Excel parse error:', err);
      toast.error(err.message || 'Failed to read Excel file');
      setParseResult(null);
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileProcess(file);
    }
  };

  const handleClearUpload = () => {
    setSelectedFile(null);
    setParseResult(null);
  };

  const handleConfirmImport = async () => {
    if (!parseResult || parseResult.validRowsCount === 0) {
      toast.error('No valid products to import.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await cmsService.bulkImportShopProducts({
        products: parseResult.validProducts,
        mode: importMode,
      });

      toast.success(
        res.message ||
          `Successfully ${importMode === 'replace' ? 'replaced catalog with' : 'imported'} ${
            parseResult.validRowsCount
          } products!`
      );
      if (res.data) {
        setShopData(res.data);
      }
      handleClearUpload();
    } catch (err: any) {
      console.error('Import save error:', err);
      toast.error(err.message || 'Failed to save products to database');
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentProducts = shopData.headerSection?.products || [];

  const filteredProducts = currentProducts.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const nameEn = (p.name?.en || '').toLowerCase();
    const nameAr = (p.name?.ar || '').toLowerCase();
    const brandEn = (p.brand?.en || '').toLowerCase();
    const slug = (p.slug || '').toLowerCase();
    return nameEn.includes(q) || nameAr.includes(q) || brandEn.includes(q) || slug.includes(q);
  });

  const displayedUploadRows = (parseResult?.rowResults || []).filter((r) => {
    if (activePreviewTab === 'valid') return r.isValid;
    if (activePreviewTab === 'errors') return !r.isValid;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
        {/* PAGE HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-950/30">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Excel / CSV Sheet Section
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Bulk Importer
                </span>
                <span className="text-xs text-white/50">
                  (استيراد وإدارة المنتجات عبر الإكسل)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-white/60 mt-1">
                Download the official template, fill in your medical products & specifications, and upload to import into the database.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => downloadShopProductsExcelTemplate({ withSampleData: true })}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-emerald-900/30"
              title="Download Excel template pre-filled with real medical product examples"
            >
              <FileDown className="w-4 h-4" />
              Download Excel Template
            </button>

            <button
              type="button"
              onClick={() => downloadShopProductsExcelTemplate({ withSampleData: false })}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white/90 border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
              title="Download blank template with column headers"
            >
              <Download className="w-4 h-4" />
              Blank Template
            </button>

            {currentProducts.length > 0 && (
              <button
                type="button"
                onClick={() => exportCurrentShopProductsToExcel(currentProducts)}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-all flex items-center gap-2 cursor-pointer"
                title="Export current database products to an Excel sheet"
              >
                <Layers className="w-4 h-4" />
                Export Live Database ({currentProducts.length})
              </button>
            )}

            <Link
              to="/cms?tab=shop"
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 border border-purple-500/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              Open CMS Shop
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* SECTION 1: UPLOAD & IMPORT EXCEL / CSV SHEET */}
        <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/30">
                <Upload className="w-4 h-4" />
              </span>
              <div>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <span>Import Excel / CSV Sheet into Database</span>
                </CardTitle>
                <p className="text-xs text-white/50">
                  Upload your completed sheet. The system validates all columns before importing.
                </p>
              </div>
            </div>

            {/* Import Mode Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/50 hidden sm:inline">Mode:</span>
              <div className="inline-flex items-center rounded-lg bg-black/40 border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setImportMode('append')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    importMode === 'append'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                  title="Adds new products to existing database records"
                >
                  Append to Existing ({currentProducts.length})
                </button>
                <button
                  type="button"
                  onClick={() => setImportMode('replace')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    importMode === 'replace'
                      ? 'bg-red-600 text-white shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
                  title="Overwrites existing products with the rows in the Excel sheet"
                >
                  Replace All
                </button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Drag & Drop Area */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border-2 border-dashed p-8 sm:p-10 text-center transition-all cursor-pointer ${
                isDragOver
                  ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
                  : selectedFile
                  ? 'border-emerald-500/40 bg-emerald-500/[0.04]'
                  : 'border-white/15 bg-black/30 hover:border-emerald-500/60 hover:bg-white/[0.02]'
              }`}
            >
              {isParsing ? (
                <div className="flex flex-col items-center justify-center py-6 space-y-2">
                  <RefreshCw className="w-9 h-9 text-[#F68E2D] animate-spin" />
                  <p className="text-sm font-semibold text-white">Parsing and validating Excel rows...</p>
                  <p className="text-xs text-white/50">Checking required fields, URLs, HTML tags, and specifications.</p>
                </div>
              ) : selectedFile ? (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 shadow-lg">
                    <FileSpreadsheet className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">{selectedFile.name}</h4>
                    <p className="text-xs text-white/50 mt-0.5">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Click or drop another sheet to replace
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearUpload();
                    }}
                    className="text-xs text-red-400 hover:text-red-300 underline mt-1"
                  >
                    Clear selected file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 text-emerald-400 flex items-center justify-center border border-white/10 shadow-inner">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Drop your completed <span className="text-emerald-400">Excel / CSV sheet</span> here, or click to browse
                    </h4>
                    <p className="text-xs text-white/45 mt-1">
                      Supports .xlsx, .xls, and .csv formats. Includes bilingual product details, specifications, badges, and images.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Choose Excel File (.xlsx)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* VALIDATION RESULTS & PREVIEW TABLE */}
            {parseResult && (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <span>Parsed Sheet Validation Results</span>
                      <span className="text-xs text-white/50 font-normal">
                        ({parseResult.totalRows} row{parseResult.totalRows > 1 ? 's' : ''} detected)
                      </span>
                    </h3>
                  </div>

                  {/* Filter tabs */}
                  <div className="flex items-center gap-1.5 text-xs">
                    <button
                      type="button"
                      onClick={() => setActivePreviewTab('all')}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        activePreviewTab === 'all'
                          ? 'bg-white/15 text-white'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      All ({parseResult.totalRows})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActivePreviewTab('valid')}
                      className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        activePreviewTab === 'valid'
                          ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Valid ({parseResult.validRowsCount})
                    </button>
                    {parseResult.errorRowsCount > 0 && (
                      <button
                        type="button"
                        onClick={() => setActivePreviewTab('errors')}
                        className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                          activePreviewTab === 'errors'
                            ? 'bg-red-600/30 text-red-300 border border-red-500/40'
                            : 'text-red-400 hover:text-red-300'
                        }`}
                      >
                        Errors ({parseResult.errorRowsCount})
                      </button>
                    )}
                  </div>
                </div>

                {/* Status Badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3.5 flex items-center justify-between">
                    <span className="text-xs text-white/60">Total Rows</span>
                    <span className="text-lg font-bold text-white">{parseResult.totalRows}</span>
                  </div>
                  <div className="rounded-xl bg-emerald-500/[0.06] border border-emerald-500/30 p-3.5 flex items-center justify-between">
                    <span className="text-xs text-emerald-300 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Ready to Import
                    </span>
                    <span className="text-lg font-bold text-emerald-400">
                      {parseResult.validRowsCount}
                    </span>
                  </div>
                  <div
                    className={`rounded-xl p-3.5 flex items-center justify-between border ${
                      parseResult.errorRowsCount > 0
                        ? 'bg-red-500/[0.08] border-red-500/40'
                        : 'bg-white/[0.03] border-white/10'
                    }`}
                  >
                    <span
                      className={`text-xs flex items-center gap-1.5 ${
                        parseResult.errorRowsCount > 0 ? 'text-red-300' : 'text-white/60'
                      }`}
                    >
                      <AlertCircle className="w-4 h-4" /> Errors
                    </span>
                    <span
                      className={`text-lg font-bold ${
                        parseResult.errorRowsCount > 0 ? 'text-red-400' : 'text-white/60'
                      }`}
                    >
                      {parseResult.errorRowsCount}
                    </span>
                  </div>
                </div>

                {/* Table of Parsed Rows */}
                <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40">
                  <div className="overflow-x-auto max-h-72">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead className="bg-white/5 border-b border-white/10 text-white/70 sticky top-0 backdrop-blur-md">
                        <tr>
                          <th className="p-3 w-14 text-center">Row</th>
                          <th className="p-3 w-24">Status</th>
                          <th className="p-3 w-16">Image</th>
                          <th className="p-3 min-w-[200px]">Product Name (EN / AR)</th>
                          <th className="p-3 min-w-[120px]">Brand</th>
                          <th className="p-3 w-24">Specs</th>
                          <th className="p-3 w-24">Badges</th>
                          <th className="p-3 min-w-[160px]">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {displayedUploadRows.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="p-6 text-center text-white/40">
                              No rows matching the selected filter.
                            </td>
                          </tr>
                        ) : (
                          displayedUploadRows.map((r) => (
                            <tr
                              key={`r-${r.rowNumber}`}
                              className={`hover:bg-white/[0.02] transition-colors ${
                                !r.isValid ? 'bg-red-500/[0.04]' : ''
                              }`}
                            >
                              <td className="p-3 font-mono text-white/50 text-center">
                                #{r.rowNumber}
                              </td>
                              <td className="p-3">
                                {r.isValid ? (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                    <CheckCircle2 className="w-2.5 h-2.5" /> Valid
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                                    <AlertCircle className="w-2.5 h-2.5" /> Invalid
                                  </span>
                                )}
                              </td>
                              <td className="p-3">
                                {r.product?.image ? (
                                  <img
                                    src={r.product.image}
                                    alt="Preview"
                                    className="w-10 h-10 object-cover rounded-lg border border-white/15 bg-black/40"
                                  />
                                ) : (
                                  <div className="w-10 h-10 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[9px] text-white/30 text-center">
                                    None
                                  </div>
                                )}
                              </td>
                              <td className="p-3">
                                <div className="font-semibold text-white">
                                  {r.product?.name?.en || '—'}
                                </div>
                                {r.product?.name?.ar && (
                                  <div className="text-[11px] text-[#F68E2D]" dir="rtl">
                                    {r.product.name.ar}
                                  </div>
                                )}
                                {r.errors.length > 0 && (
                                  <p className="text-[11px] text-red-400 mt-0.5 font-medium">
                                    {r.errors.join(', ')}
                                  </p>
                                )}
                              </td>
                              <td className="p-3 text-white/70">
                                {r.product?.brand?.en || '—'}
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-white/70">
                                  {r.product?.specifications?.length || 0} specs
                                </span>
                              </td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-white/70">
                                  {r.product?.badges?.length || 0} badges
                                </span>
                              </td>
                              <td className="p-3 text-[11px] text-white/50">
                                {r.warnings.length > 0 ? (
                                  <span className="text-amber-400 flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    {r.warnings[0]}
                                  </span>
                                ) : (
                                  <span>
                                    {r.product?.images?.length || 0} photo(s) • Slug: {r.product?.slug}
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Import Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="text-xs text-white/60">
                    Target database mode:{' '}
                    <strong className="text-white">
                      {importMode === 'append' ? 'Append to current records' : 'Replace entire catalog'}
                    </strong>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleClearUpload}
                      disabled={isSubmitting}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all cursor-pointer disabled:opacity-50"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      disabled={isSubmitting || parseResult.validRowsCount === 0}
                      onClick={handleConfirmImport}
                      className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          Importing to Database...
                        </>
                      ) : (
                        <>
                          <FileSpreadsheet className="w-4 h-4" />
                          Import {parseResult.validRowsCount} Products to Database
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* SECTION 2: LIVE DATABASE RECORDS */}
        <Card className="bg-[#0b1028] border border-white/10 shadow-xl overflow-hidden">
          <CardHeader className="bg-white/5 border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs flex items-center justify-center border border-blue-500/30">
                <Table className="w-4 h-4" />
              </span>
              <div>
                <CardTitle className="text-base font-bold text-white flex items-center gap-2">
                  <span>Current Database Products</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/80">
                    {currentProducts.length} Total
                  </span>
                </CardTitle>
                <p className="text-xs text-white/50">
                  Products currently live and returned by the <code>GET /api/cms/shop</code> public API.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name or brand..."
                  className="w-64 pl-8 pr-3 py-1.5 text-xs rounded-lg bg-black/40 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="button"
                onClick={loadShopData}
                disabled={loading}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
                title="Refresh database records"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {loading ? (
              <div className="py-12 text-center space-y-3">
                <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                <p className="text-xs text-white/60">Loading products from database...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-white/20 mx-auto" />
                <p className="text-sm font-semibold text-white/60">
                  {searchQuery ? 'No products match your search query.' : 'No products in database yet.'}
                </p>
                <p className="text-xs text-white/40">
                  Use the Excel importer above to download the template and import your product catalog.
                </p>
              </div>
            ) : (
              <div className="rounded-xl border border-white/10 overflow-hidden bg-black/30">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-white/5 border-b border-white/10 text-white/70">
                      <tr>
                        <th className="p-3 w-14 text-center">#</th>
                        <th className="p-3 w-16">Thumbnail</th>
                        <th className="p-3 min-w-[220px]">Product Name & Slug</th>
                        <th className="p-3 min-w-[130px]">Brand / Category</th>
                        <th className="p-3 w-28">Gallery Photos</th>
                        <th className="p-3 w-28">Key Specs</th>
                        <th className="p-3 w-28">Badges</th>
                        <th className="p-3 w-28 text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredProducts.map((prod, idx) => (
                        <tr key={prod.id || idx} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-3 text-white/40 font-mono text-center">
                            #{idx + 1}
                          </td>
                          <td className="p-3">
                            {prod.image ? (
                              <img
                                src={prod.image}
                                alt={prod.name?.en || 'Product'}
                                className="w-12 h-12 object-cover rounded-lg border border-white/15 bg-black/40"
                              />
                            ) : (
                              <div className="w-12 h-12 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-[10px] text-white/30">
                                None
                              </div>
                            )}
                          </td>
                          <td className="p-3 space-y-0.5">
                            <div className="font-bold text-white text-sm">
                              {prod.name?.en || '—'}
                            </div>
                            {prod.name?.ar && (
                              <div className="text-xs text-[#F68E2D]" dir="rtl">
                                {prod.name.ar}
                              </div>
                            )}
                            <div className="text-[11px] text-white/40 font-mono">
                              /{prod.slug || prod.id}
                            </div>
                          </td>
                          <td className="p-3">
                            <span className="text-white/80 font-medium">{prod.brand?.en || '—'}</span>
                            {prod.brand?.ar && (
                              <span className="block text-[11px] text-white/40">{prod.brand.ar}</span>
                            )}
                          </td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-white/80">
                              {prod.images?.length || (prod.image ? 1 : 0)} photo(s)
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-white/80">
                              {prod.specifications?.length || 0} specs
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/5 border border-white/10 text-white/80">
                              {prod.badges?.length || 0} badges
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1.5 flex-wrap">
                              <button
                                type="button"
                                onClick={() => handleOpenEditModal(prod)}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 transition-all inline-flex items-center gap-1 cursor-pointer shadow-sm"
                                title="Edit product details and upload multiple images"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                Edit / Images
                              </button>

                              <button
                                type="button"
                                onClick={() => setSelectedProductPreview(prod)}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all inline-flex items-center gap-1 cursor-pointer"
                                title="Inspect full product specs & HTML description"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                View
                              </button>

                              <button
                                type="button"
                                onClick={() => handleDeleteProduct(prod)}
                                className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                                title="Delete this product from database"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* PRODUCT DETAILS DRAWER / MODAL */}
        {selectedProductPreview && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-[#0f1429] border border-white/15 rounded-2xl shadow-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {selectedProductPreview.image && (
                    <img
                      src={selectedProductPreview.image}
                      alt="Thumbnail"
                      className="w-12 h-12 object-cover rounded-xl border border-white/15"
                    />
                  )}
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {selectedProductPreview.name?.en}
                    </h3>
                    <p className="text-xs text-[#F68E2D]">
                      {selectedProductPreview.name?.ar} • {selectedProductPreview.brand?.en}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedProductPreview(null)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/10"
                >
                  <Trash2 className="w-4 h-4 hidden" />
                  <span className="text-sm font-bold">✕</span>
                </button>
              </div>

              {/* Gallery */}
              {selectedProductPreview.images && selectedProductPreview.images.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-white/70">Gallery Images</span>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selectedProductPreview.images.map((img, i) => (
                      <img
                        key={`img-${i}`}
                        src={img}
                        alt="Photo"
                        className="w-20 h-20 object-cover rounded-xl border border-white/15 shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* HTML Description */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-white/70">Product Description (HTML)</span>
                <div
                  className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-white/80 leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_p]:mb-1.5"
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedProductPreview.productDescription?.en ||
                      selectedProductPreview.description?.en ||
                      '<p>No description provided.</p>',
                  }}
                />
              </div>

              {/* Specifications */}
              {selectedProductPreview.specifications && selectedProductPreview.specifications.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-white/70">
                    Key Specifications ({selectedProductPreview.specifications.length})
                  </span>
                  <div className="divide-y divide-white/5 border border-white/10 rounded-xl bg-black/40 overflow-hidden">
                    {selectedProductPreview.specifications.map((s, i) => (
                      <div key={s.id || i} className="p-2.5 flex items-center justify-between text-xs">
                        <span className="text-white/50">{s.label?.en}</span>
                        <span className="font-semibold text-white">{s.value?.en}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedProductPreview(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCT EDIT & IMAGE GALLERY MODAL */}
        <ProductEditModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingProduct(null);
          }}
          product={editingProduct}
          onSave={handleSaveProduct}
        />
      </div>
    </DashboardLayout>
  );
};

export default ExcelSheetPage;
