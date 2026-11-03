import React from "react";
import { useLocation } from "react-router-dom";
import { DashboardLayout } from "../components/ui/dashboard-layout";
import { Database, ShieldCheck, ArrowRight } from "lucide-react";

interface ModulePageProps {
  title: string;
  subtitle: string;
  role: "agent" | "university";
  mockData?: Array<{ id: string; col1: string; col2: string; col3: string; status: string }>;
}

export const ModulePage: React.FC<ModulePageProps> = ({
  title,
  subtitle,
  role,
  mockData,
}) => {
  const location = useLocation();

  const defaultRows = mockData || [
    { id: "1", col1: "Global Academic Partners", col2: "Tier 1 Accredited", col3: "Updated Today", status: "Active" },
    { id: "2", col1: "UKVI Verification Standard", col2: "Compliance Module #4", col3: "Audit Pending", status: "In Review" },
    { id: "3", col1: "Annual Integrity Assessment", col2: "Evaluation Complete", col3: "Score: 98/100", status: "Verified" },
    { id: "4", col1: "Student Recruitment Policy", col2: "Document Rev 2.4", col3: "Signed Dec 2025", status: "Active" },
  ];

  return (
    <DashboardLayout role={role}>
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1.5">{title}</h1>
            <p className="text-white/60 text-sm">{subtitle}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs bg-white/5 border border-white/10 px-3 py-1.5 rounded-lg text-white/80 font-mono">
              Endpoint: {location.pathname}
            </span>
            <button className="bg-[#F68E2D] hover:bg-[#e28124] text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5">
              <span>Add Record</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-[#14112E] border border-white/10 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#F68E2D]/10 flex items-center justify-center text-[#F68E2D]">
              <Database size={20} />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">API Integration Adapter Ready</h2>
              <p className="text-xs text-white/60">
                This module is structured for REST endpoint wiring. Use <code className="text-[#F68E2D]">src/lib/api.ts</code> to connect live data.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck size={14} />
            <span>Schema Synchronized</span>
          </div>
        </div>

        {/* Table View */}
        <div className="bg-[#14112E] border border-white/10 rounded-xl overflow-hidden shadow-xl shadow-black/20">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <span className="text-sm font-bold text-white">Records & Directory</span>
            <span className="text-xs text-white/40">{defaultRows.length} entries</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-white/80">
              <thead className="text-xs text-white/50 uppercase bg-white/5 border-b border-white/5">
                <tr>
                  <th className="px-6 py-3.5">Record / Title</th>
                  <th className="px-6 py-3.5">Classification</th>
                  <th className="px-6 py-3.5">Timeline / Assessment</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {defaultRows.map((row) => (
                  <tr key={row.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">{row.col1}</td>
                    <td className="px-6 py-4 text-white/70">{row.col2}</td>
                    <td className="px-6 py-4 text-white/60">{row.col3}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          row.status === "Active" || row.status === "Verified"
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-xs text-[#F68E2D] hover:underline font-semibold cursor-pointer">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
