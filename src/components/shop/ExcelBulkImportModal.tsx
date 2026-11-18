import React, { useRef, useState } from 'react';
import {
  X,
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
  Info,
} from 'lucide-react';
import { toast } from 'react-toastify';
import {
  downloadShopProductsExcelTemplate,
  parseShopProductsExcelFile,
  exportCurrentShopProductsToExcel,
  type ExcelImportParseResult,
} from '../../services/excelShopImportService';
import {
  cmsService,
  type CmsShopData,
  type ShopProductCard,
} from '../../services/cmsService';

interface ExcelBulkImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentProducts: ShopProductCard[];
  onImportSuccess: (updatedShopData: CmsShopData) => void;
}

export const ExcelBulkImportModal: React.FC<ExcelBulkImportModalProps> = ({
  isOpen,
  onClose,
  currentProducts,
  onImportSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [parseResult, setParseResult] = useState<ExcelImportParseResult | null>(null);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [activePreviewTab, setActivePreviewTab] = useState<'all' | 'valid' | 'errors'>('all');

  if (!isOpen) return null;

  const handleFileProcess = async (file: File) => {
    try {
      setIsParsing(true);
      setSelectedFile(file);
      const result = await parseShopProductsExcelFile(file);
      setParseResult(result);
      if (result.validRowsCount > 0) {
        toast.success(
          `Sheet parsed: ${result.validRowsCount} valid product${
            result.validRowsCount > 1 ? 's' : ''
          } ready to import!`
        );
      } else {
        toast.error('No valid products found in the sheet. Please review errors below.');
      }
    } catch (err: any) {
      console.error('Excel parsing error:', err);
      toast.error(err.message || 'Failed to read or parse the Excel sheet');
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

  const handleClear = () => {
    setSelectedFile(null);
    setParseResult(null);
  };

  const handleConfirmImport = async () => {
    if (!parseResult || parseResult.validRowsCount === 0) {
      toast.error('There are no valid products to import.');
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
      onImportSuccess(res.data);
      onClose();
    } catch (err: any) {
      console.error('Import save error:', err);
      toast.error(err.message || 'Failed to save imported products to database');
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedRows = (parseResult?.rowResults || []).filter((r) => {
    if (activePreviewTab === 'valid') return r.isValid;
    if (activePreviewTab === 'errors') return !r.isValid;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#0e1326] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.03]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">
                  Excel Bulk Import — Products Catalog
                </h3>
                <span className="text-xs text-white/50 font-normal">
                  (استيراد المنتجات عبر الإكسل)
                </span>
              </div>
              <p className="text-xs text-white/50">
                Download the official template, fill in your medical products, and import them directly into the database.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {/* STEP 1: DOWNLOAD TEMPLATE & GUIDELINES */}
          <div className="rounded-xl bg-[#141a35] border border-white/10 p-4 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">
                    1
                  </span>
                  Download Form Excel Template
                </span>
                <p className="text-xs text-white/60">
                  Pre-configured with all required columns, formatting rules, sample data, and bilingual fields.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadShopProductsExcelTemplate({ withSampleData: true })}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  title="Download template with realistic sample medical products"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  Download Sample Template (.xlsx)
                </button>
                <button
                  type="button"
                  onClick={() => downloadShopProductsExcelTemplate({ withSampleData: false })}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/15 text-white/90 border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
                  title="Download clean template with empty columns"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download Blank Template (.xlsx)
                </button>
                {currentProducts.length > 0 && (
                  <button
                    type="button"
                    onClick={() => exportCurrentShopProductsToExcel(currentProducts)}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-white/70 border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
                    title="Export currently published products from database to Excel"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    Export Live Catalog ({currentProducts.length})
                  </button>
                )}
              </div>
            </div>

            {/* Quick Tips Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[11px] text-white/55">
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Required:</strong> Product Name (English or Arabic). All other fields have safe defaults.</span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Key Specs:</strong> Format as <code>Label: Value | Label: Value</code></span>
              </div>
              <div className="flex items-start gap-1.5">
                <span className="text-emerald-400 font-bold">•</span>
                <span><strong>Multiple Images:</strong> Comma-separated or newline-separated URLs.</span>
              </div>
            </div>
          </div>

          {/* STEP 2: UPLOAD & IMPORT SETTINGS */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                <span className="w-5 h-5 rounded-full bg-[#F68E2D]/20 text-[#F68E2D] text-[10px] flex items-center justify-center font-bold">
                  2
                </span>
                Upload Completed Excel File & Configure Mode
              </span>

              {/* Import Mode Radio Switch */}
              <div className="inline-flex items-center rounded-lg bg-black/40 border border-white/10 p-1">
                <button
                  type="button"
                  onClick={() => setImportMode('append')}
                  className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    importMode === 'append'
                      ? 'bg-emerald-600 text-white shadow'
                      : 'text-white/60 hover:text-white'
                  }`}
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
                  title="Overwrites current products in database with the Excel products"
                >
                  Replace Entire Catalog
                </button>
              </div>
            </div>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Drag & Drop Zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
                isDragOver
                  ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]'
                  : selectedFile
                  ? 'border-emerald-500/40 bg-emerald-500/[0.04]'
                  : 'border-white/15 bg-black/30 hover:border-[#F68E2D]/60 hover:bg-white/[0.02]'
              }`}
            >
              {isParsing ? (
                <div className="flex flex-col items-center justify-center py-4 space-y-2">
                  <RefreshCw className="w-8 h-8 text-[#F68E2D] animate-spin" />
                  <p className="text-sm font-semibold text-white">Parsing and validating Excel rows...</p>
                </div>
              ) : selectedFile ? (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{selectedFile.name}</h4>
                    <p className="text-xs text-white/50">
                      {(selectedFile.size / 1024).toFixed(1)} KB • Click or drop another file to change
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                    className="mt-1 text-xs text-red-400 hover:text-red-300 underline"
                  >
                    Remove file
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <div className="w-12 h-12 rounded-xl bg-white/5 text-white/60 flex items-center justify-center border border-white/10">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      Drop your Excel sheet here, or <span className="text-[#F68E2D]">browse files</span>
                    </h4>
                    <p className="text-xs text-white/40 mt-0.5">
                      Accepts .xlsx, .xls, and .csv formats
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STEP 3: VALIDATION SUMMARY & PREVIEW TABLE */}
          {parseResult && (
            <div className="space-y-4 pt-2 border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5 uppercase tracking-wider">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] flex items-center justify-center font-bold">
                      3
                    </span>
                    Validation Results
                  </span>
                  <span className="text-xs text-white/50">
                    ({parseResult.totalRows} row{parseResult.totalRows > 1 ? 's' : ''} detected)
                  </span>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('all')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      activePreviewTab === 'all'
                        ? 'bg-white/15 text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    All Rows ({parseResult.totalRows})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePreviewTab('valid')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
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
                      className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
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

              {/* Status Counters */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl bg-white/[0.03] border border-white/10 p-3 flex items-center justify-between">
                  <span className="text-xs text-white/60">Total Rows Detected</span>
                  <span className="text-base font-bold text-white">{parseResult.totalRows}</span>
                </div>
                <div className="rounded-xl bg-emerald-500/[0.06] border border-emerald-500/30 p-3 flex items-center justify-between">
                  <span className="text-xs text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready to Import
                  </span>
                  <span className="text-base font-bold text-emerald-400">
                    {parseResult.validRowsCount}
                  </span>
                </div>
                <div
                  className={`rounded-xl p-3 flex items-center justify-between border ${
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
                    <AlertCircle className="w-3.5 h-3.5" /> Issues / Invalids
                  </span>
                  <span
                    className={`text-base font-bold ${
                      parseResult.errorRowsCount > 0 ? 'text-red-400' : 'text-white/60'
                    }`}
                  >
                    {parseResult.errorRowsCount}
                  </span>
                </div>
              </div>

              {/* Preview Table */}
              <div className="rounded-xl border border-white/10 overflow-hidden bg-black/40">
                <div className="overflow-x-auto max-h-60">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-white/5 border-b border-white/10 text-white/70 sticky top-0 backdrop-blur-md">
                      <tr>
                        <th className="p-3 w-14">Row #</th>
                        <th className="p-3 w-24">Status</th>
                        <th className="p-3 w-16">Image</th>
                        <th className="p-3 min-w-[200px]">Product Name</th>
                        <th className="p-3 min-w-[120px]">Brand</th>
                        <th className="p-3 w-24">Specs</th>
                        <th className="p-3 w-24">Badges</th>
                        <th className="p-3 min-w-[160px]">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {displayedRows.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="p-6 text-center text-white/40">
                            No rows matching the selected filter.
                          </td>
                        </tr>
                      ) : (
                        displayedRows.map((r) => (
                          <tr
                            key={`row-${r.rowNumber}`}
                            className={`hover:bg-white/[0.02] transition-colors ${
                              !r.isValid ? 'bg-red-500/[0.04]' : ''
                            }`}
                          >
                            <td className="p-3 font-mono text-white/50 text-center">
                              #{r.rowNumber}
                            </td>
                            <td className="p-3">
                              {r.isValid ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                  <CheckCircle2 className="w-2.5 h-2.5" /> Valid
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
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
                                <p className="text-[11px] text-red-400 mt-0.5">
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
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-white/[0.03]">
          <div className="text-xs text-white/50 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-white/40" />
            <span>
              Mode: <strong>{importMode === 'append' ? 'Append' : 'Replace All'}</strong> • Database will update immediately
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white transition-all cursor-pointer disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isSubmitting || !parseResult || parseResult.validRowsCount === 0}
              onClick={handleConfirmImport}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  Importing to Database...
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  Import {parseResult ? parseResult.validRowsCount : 0} Products into Database
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
