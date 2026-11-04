import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Handshake,
  Headphones,
  Users,
  Scale,
  Lightbulb,
  ShieldCheck,
  Shield,
  Heart,
  HeartHandshake,
  History,
  Building2,
  Target,
  CheckCircle,
  Sparkles,
  Microscope,
  FlaskConical,
  Stethoscope,
  Code2,
  Eye,
  Briefcase,
  Award,
  Globe,
  Phone,
  Mail,
  Compass,
  Zap,
  ShoppingBag,
  TrendingUp,
  FolderGit2,
  FileText,
  Clock,
  Cpu,
  Activity,
  Flame,
  Star,
  Rocket,
  Layers,
  ChevronDown,
  Check,
  Search,
  type LucideIcon as LucideIconType
} from 'lucide-react';

export interface IconOption {
  value: string;
  label: string;
  description?: string;
  iconName?: string;
}

// Map of all known Lucide icon components
export const LUCIDE_ICON_COMPONENTS: Record<string, LucideIconType> = {
  Handshake,
  Headphones,
  Users,
  Scale,
  Lightbulb,
  ShieldCheck,
  Shield,
  Heart,
  HeartHandshake,
  HandHeart: HeartHandshake,
  History,
  Building2,
  Target,
  CheckCircle,
  Sparkles,
  Microscope,
  FlaskConical,
  Stethoscope,
  Code2,
  Eye,
  Briefcase,
  Award,
  Globe,
  Phone,
  Mail,
  Compass,
  Zap,
  ShoppingBag,
  TrendingUp,
  FolderGit2,
  FileText,
  Clock,
  Cpu,
  Activity,
  Flame,
  Star,
  Rocket,
  Layers,
  // Common lowercase aliases
  microscope: Microscope,
  flask: FlaskConical,
  heart: Heart,
  stethoscope: Stethoscope,
  code: Code2,
  building: Building2,
  shield: ShieldCheck,
  users: Users,
  lightbulb: Lightbulb,
  handshake: Handshake,
  target: Target,
  sparkles: Sparkles,
};

/**
 * Renders any Lucide icon by name with automatic fallback
 */
export const LucideIcon: React.FC<{
  name: string;
  className?: string;
}> = ({ name, className = 'w-4 h-4' }) => {
  if (!name) return <Sparkles className={className} />;
  
  // Direct lookup
  let Comp = LUCIDE_ICON_COMPONENTS[name];

  // Case-insensitive lookup if direct fails
  if (!Comp) {
    const lower = name.toLowerCase();
    const foundKey = Object.keys(LUCIDE_ICON_COMPONENTS).find(
      (k) => k.toLowerCase() === lower
    );
    if (foundKey) Comp = LUCIDE_ICON_COMPONENTS[foundKey];
  }

  // Fallback icon
  if (!Comp) {
    Comp = Sparkles;
  }

  return <Comp className={className} />;
};

// Preset icon options for CMS sections
export const CORE_VALUES_ICONS: IconOption[] = [
  { value: 'Handshake', label: 'Handshake', description: 'Relationships & Trust' },
  { value: 'Headphones', label: 'Headphones', description: 'Customer Service & Support' },
  { value: 'Users', label: 'Users', description: 'Counsel & Partnership' },
  { value: 'Scale', label: 'Scale', description: 'Diversity & Equity' },
  { value: 'Lightbulb', label: 'Lightbulb', description: 'Opportunity & Innovation' },
  { value: 'ShieldCheck', label: 'ShieldCheck', description: 'Authenticity & Governance' },
  { value: 'Heart', label: 'Heart', description: 'Community & Care' },
  { value: 'HeartHandshake', label: 'HeartHandshake', description: 'Commitment & Collaboration' },
];

export const HISTORY_ICONS: IconOption[] = [
  { value: 'History', label: 'History', description: 'Timeline & Heritage' },
  { value: 'Building2', label: 'Building', description: 'Corporate & Real Estate' },
  { value: 'ShieldCheck', label: 'ShieldCheck', description: 'Governance & Integrity' },
  { value: 'Users', label: 'Users', description: 'Partnership & Structure' },
];

export const PURPOSE_ICONS: IconOption[] = [
  { value: 'HeartHandshake', label: 'HeartHandshake', description: 'Progress & Support' },
  { value: 'Handshake', label: 'Handshake', description: 'Mutual Cooperation' },
  { value: 'Target', label: 'Target', description: 'Strategic Goals' },
  { value: 'ShieldCheck', label: 'ShieldCheck', description: 'Trust & Protection' },
];

export const OBJECTIVES_ICONS: IconOption[] = [
  { value: 'Target', label: 'Target', description: 'Strategic Objectives' },
  { value: 'HeartHandshake', label: 'HeartHandshake', description: 'Community Service' },
  { value: 'CheckCircle', label: 'CheckCircle', description: 'Quality & Standards' },
  { value: 'ShieldCheck', label: 'ShieldCheck', description: 'Trusted Client Partner' },
  { value: 'Sparkles', label: 'Sparkles', description: 'Innovation & Excellence' },
];

export const COMPANY_CARD_ICONS: IconOption[] = [
  { value: 'Building2', label: 'Building', description: 'Corporate Profile' },
  { value: 'Eye', label: 'Eye', description: 'Strategic Vision' },
  { value: 'Target', label: 'Target', description: 'Company Mission' },
  { value: 'ShieldCheck', label: 'ShieldCheck', description: 'Core Values & Safety' },
  { value: 'Sparkles', label: 'Sparkles', description: 'Innovation' },
  { value: 'Lightbulb', label: 'Lightbulb', description: 'Ideas & Opportunity' },
  { value: 'Handshake', label: 'Handshake', description: 'Partnership' },
];

export const SERVICES_SOLUTION_ICONS: IconOption[] = [
  { value: 'Microscope', label: 'Microscope', description: 'Medical Equipment & Tech' },
  { value: 'Code2', label: 'Code2', description: 'Advanced Technology' },
  { value: 'ShieldCheck', label: 'ShieldCheck', description: 'Standards & Safety' },
  { value: 'Handshake', label: 'Handshake', description: 'Strategic Partnerships' },
  { value: 'FlaskConical', label: 'Flask', description: 'Laboratory Supplies' },
  { value: 'Stethoscope', label: 'Stethoscope', description: 'Healthcare Solutions' },
  { value: 'Sparkles', label: 'Sparkles', description: 'Innovation' },
];

export const BUSINESS_AREA_ICONS: IconOption[] = [
  { value: 'Microscope', label: 'Microscope', description: 'Medical & Lab Equipment' },
  { value: 'FlaskConical', label: 'Flask', description: 'Laboratory Supplies' },
  { value: 'Stethoscope', label: 'Stethoscope', description: 'Healthcare Solutions' },
  { value: 'ShieldCheck', label: 'ShieldCheck', description: 'Quality & Safety' },
  { value: 'Building2', label: 'Building', description: 'Corporate & Real Estate' },
  { value: 'Sparkles', label: 'Sparkles', description: 'Innovation' },
];

export const PROJECTS_INNOVATOR_AREA_ICONS: IconOption[] = [
  { value: 'microscope', label: 'Microscope', description: 'Medical & Lab Equipment' },
  { value: 'flask', label: 'Flask', description: 'Laboratory Supplies' },
  { value: 'heart', label: 'Heart', description: 'Healthcare Solutions' },
  { value: 'stethoscope', label: 'Stethoscope', description: 'Clinical & Medical Services' },
  { value: 'Building2', label: 'Building', description: 'Infrastructure & Construction' },
  { value: 'ShieldCheck', label: 'ShieldCheck', description: 'Quality & Compliance' },
  { value: 'Sparkles', label: 'Sparkles', description: 'Innovation & Research' },
];

export const ALL_LUCIDE_ICONS: IconOption[] = [
  { value: 'Handshake', label: 'Handshake', description: 'Partnership & Trust' },
  { value: 'Headphones', label: 'Headphones', description: 'Support & Service' },
  { value: 'Users', label: 'Users', description: 'Team & Governance' },
  { value: 'Scale', label: 'Scale', description: 'Diversity & Integrity' },
  { value: 'Lightbulb', label: 'Lightbulb', description: 'Ideas & Innovation' },
  { value: 'ShieldCheck', label: 'ShieldCheck', description: 'Quality & Safety' },
  { value: 'Shield', label: 'Shield', description: 'Security & Protection' },
  { value: 'Heart', label: 'Heart', description: 'Care & Community' },
  { value: 'HeartHandshake', label: 'HeartHandshake', description: 'Commitment & Progress' },
  { value: 'History', label: 'History', description: 'Heritage & Timeline' },
  { value: 'Building2', label: 'Building', description: 'Corporate & Structure' },
  { value: 'Target', label: 'Target', description: 'Mission & Goals' },
  { value: 'CheckCircle', label: 'CheckCircle', description: 'Success & Verification' },
  { value: 'Sparkles', label: 'Sparkles', description: 'Innovation & Excellence' },
  { value: 'Microscope', label: 'Microscope', description: 'Science & Lab' },
  { value: 'FlaskConical', label: 'Flask', description: 'Chemistry & Research' },
  { value: 'Stethoscope', label: 'Stethoscope', description: 'Medicine & Healthcare' },
  { value: 'Code2', label: 'Code2', description: 'Software & Technology' },
  { value: 'Eye', label: 'Eye', description: 'Vision & Oversight' },
  { value: 'Briefcase', label: 'Briefcase', description: 'Business & Solutions' },
  { value: 'Award', label: 'Award', description: 'Excellence & Recognition' },
  { value: 'Globe', label: 'Globe', description: 'Global Reach' },
  { value: 'Phone', label: 'Phone', description: 'Communication' },
  { value: 'Mail', label: 'Mail', description: 'Email & Contact' },
  { value: 'Compass', label: 'Compass', description: 'Strategy & Direction' },
  { value: 'Zap', label: 'Zap', description: 'Energy & Performance' },
  { value: 'ShoppingBag', label: 'ShoppingBag', description: 'Products & Store' },
  { value: 'TrendingUp', label: 'TrendingUp', description: 'Growth & Investment' },
  { value: 'FolderGit2', label: 'FolderGit2', description: 'Projects & Repos' },
  { value: 'FileText', label: 'FileText', description: 'Documentation' },
  { value: 'Clock', label: 'Clock', description: 'Time & Punctuality' },
  { value: 'Cpu', label: 'Cpu', description: 'Computing & AI' },
  { value: 'Activity', label: 'Activity', description: 'Monitoring & Health' },
  { value: 'Flame', label: 'Flame', description: 'Passion & Impact' },
  { value: 'Star', label: 'Star', description: 'Featured & Quality' },
  { value: 'Rocket', label: 'Rocket', description: 'Launch & Expansion' },
  { value: 'Layers', label: 'Layers', description: 'Architecture & Multi-tier' },
];

interface LucideIconSelectProps {
  value: string;
  onChange: (value: string) => void;
  options?: IconOption[];
  className?: string;
  label?: string;
  placeholder?: string;
}

export const LucideIconSelect: React.FC<LucideIconSelectProps> = ({
  value,
  onChange,
  options = ALL_LUCIDE_ICONS,
  className = '',
  placeholder = 'Select Lucide icon...',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Find active option
  const activeOption = useMemo(() => {
    return (
      options.find((opt) => opt.value.toLowerCase() === (value || '').toLowerCase()) || {
        value: value || 'Sparkles',
        label: value || 'Sparkles',
      }
    );
  }, [options, value]);

  // Filter options based on search query
  const filteredOptions = useMemo(() => {
    if (!search.trim()) return options;
    const query = search.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.value.toLowerCase().includes(query) ||
        (opt.description && opt.description.toLowerCase().includes(query))
    );
  }, [options, search]);

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between gap-2.5 px-3 py-1.5 text-xs rounded-lg bg-black/40 hover:bg-black/60 border border-white/10 hover:border-white/20 text-white focus:outline-none focus:border-[#F68E2D] transition-colors cursor-pointer group shadow-inner"
      >
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-5 h-5 rounded-md bg-[#F68E2D]/15 border border-[#F68E2D]/30 flex items-center justify-center text-[#F68E2D] shrink-0 group-hover:scale-105 transition-transform">
            <LucideIcon name={value} className="w-3.5 h-3.5" />
          </div>
          <span className="truncate font-medium text-white/90">
            {activeOption.label || value || placeholder}
          </span>
          {activeOption.description && (
            <span className="hidden sm:inline text-[10px] text-white/40 truncate">
              • {activeOption.description}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-white/40 group-hover:text-white transition-transform shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Popover */}
      {isOpen && (
        <div className="absolute left-0 top-full mt-1.5 w-full min-w-[240px] max-w-[340px] z-50 rounded-xl bg-[#12162e] border border-white/15 shadow-2xl p-1.5 text-white backdrop-blur-md animate-in fade-in zoom-in-95 duration-100">
          {/* Search Box if list is large */}
          {options.length > 5 && (
            <div className="p-1 mb-1 border-b border-white/10">
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-black/30 border border-white/10 text-white">
                <Search className="w-3.5 h-3.5 text-white/40 shrink-0" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Lucide icons..."
                  className="w-full bg-transparent text-xs text-white placeholder-white/40 focus:outline-none"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* List of Options */}
          <div className="max-h-56 overflow-y-auto space-y-0.5 custom-scrollbar pr-0.5">
            {filteredOptions.length === 0 ? (
              <div className="px-3 py-4 text-center text-xs text-white/40">
                No matching Lucide icons found
              </div>
            ) : (
              filteredOptions.map((opt) => {
                const isSelected =
                  opt.value.toLowerCase() === (value || '').toLowerCase();
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearch('');
                    }}
                    className={`w-full flex items-center justify-between gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#F68E2D]/20 border border-[#F68E2D]/40 text-white font-medium'
                        : 'hover:bg-white/10 text-white/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-[#F68E2D] text-white shadow-md'
                            : 'bg-white/5 border border-white/10 text-[#F68E2D]'
                        }`}
                      >
                        <LucideIcon name={opt.value} className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <div className="truncate font-medium leading-none">
                          {opt.label}
                        </div>
                        {opt.description && (
                          <div className="text-[10px] text-white/40 truncate mt-0.5">
                            {opt.description}
                          </div>
                        )}
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[#F68E2D] shrink-0" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};
