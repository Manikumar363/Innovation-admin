import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getStoredUserData, removeAuthToken } from "../../lib/api";
import type { StoredUser } from "../../lib/api";

import {
  DashboardIcon,
  ProfileIcon,
  LogoutIcon,
  SearchIcon,
  NotificationsIcon,
} from "./icons";

type SvgIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>;
type IconLike = SvgIcon | (() => SvgIcon) | any;

type NavItem = {
  icon: IconLike;
  label: string;
  href: string;
};

type DashboardLayoutProps = {
  children: React.ReactNode;
  role?: string;
};

const resolveIcon = (icon: IconLike): SvgIcon => {
  try {
    const maybeFactoryResult = (icon as () => SvgIcon)();
    if (typeof maybeFactoryResult === "function") {
      return maybeFactoryResult;
    }
  } catch {
    // not a factory, ignore
  }
  return icon as SvgIcon;
};

const CmsIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const QuotesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
    <path d="M9 11h6" />
    <path d="M9 15h6" />
    <path d="M9 19h4" />
  </svg>
);

const topNavigationItems: NavItem[] = [
  { icon: DashboardIcon, label: "Dashboard", href: "/dashboard" },
  { icon: CmsIcon, label: "CMS Portal", href: "/cms" },
  { icon: QuotesIcon, label: "Quote Requests", href: "/quotes" },
];

const CMS_SEARCH_SECTIONS = [
  { name: "Quote Requests", path: "/quotes", desc: "Customer product quotation requests & leads" },
  { name: "Home Page", path: "/cms?tab=home", desc: "Hero, Brands, About, Divisions, Vision & Mission, Banner" },
  { name: "About Us", path: "/cms?tab=about", desc: "10 sections: Leadership, Heritage, Journey, Values, Purpose" },
  { name: "Company Profile", path: "/cms?tab=company", desc: "3 sections: Profile, Who We Are, What Guides Us" },
  { name: "Services", path: "/cms?tab=services", desc: "Our Services & Business Areas" },
  { name: "Products / Shop", path: "/cms?tab=shop", desc: "Medical Equipment & Catalog" },
  { name: "Projects", path: "/cms?tab=projects", desc: "Our Projects & Work Together Banner" },
  { name: "Partners", path: "/cms?tab=partners", desc: "Technology, Cloud & Strategic Partners" },
  { name: "Contact Us", path: "/cms?tab=contact", desc: "Contact Us & Corporate Office Details" },
];

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof CMS_SEARCH_SECTIONS>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const [userState, setUserState] = useState<StoredUser | null>(null);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const searchRef = useRef<HTMLDivElement>(null);

  // Sync state on mount and route change
  useEffect(() => {
    const user = getStoredUserData();
    if (user) {
      setUserState(user);
      if (user.profileImage) {
        setProfilePic(user.profileImage);
      }
    }
  }, [pathname]);

  // Handle outside click for profile menu & search & notifications
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
      setIsProfileMenuOpen(false);
    };

    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Global Dynamic Search Handler for CMS Sections
  useEffect(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    const filtered = CMS_SEARCH_SECTIONS.filter(
      (s) => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q)
    );
    setSearchResults(filtered);
    setShowSearchDropdown(true);
  }, [searchQuery]);

  // Format Display Full Name
  const getDisplayFullName = () => {
    if (!userState) return "Administrator";
    if (userState.fullName) return userState.fullName;
    const combined = `${userState.firstName || ""} ${userState.lastName || ""}`.trim();
    if (combined) return combined;
    if (userState.name) return userState.name;
    if (userState.email) return userState.email.split("@")[0];
    return "Administrator";
  };

  const displayName = getDisplayFullName();

  const handleLogout = () => {
    try {
      removeAuthToken();
      toast.success("Successfully logged out!");
      setTimeout(() => {
        navigate(`/login`);
      }, 500);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error("Error during logout. Please try again.");
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const renderSidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-4 flex items-center justify-between border-b border-white/5">
        <Link to="/dashboard" className="flex items-center gap-2">
          <img
            src="/logo/Innovation Logo.png"
            alt="Mobtaker Logo"
            className="ml-1 w-41 h-auto brightness-125"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-3 mt-4">
        <ul className="space-y-1.5">
          {topNavigationItems.map((item) => {
            const Icon = resolveIcon(item.icon);
            const isActive =
              pathname === item.href ||
              (item.href === "/dashboard" &&
                (pathname === "/" ||
                  pathname === "/agent/dashboard" ||
                  pathname === "/university/dashboard")) ||
              (item.href === "/cms" && pathname.includes("/cms")) ||
              (item.href === "/quotes" && (pathname.includes("/quotes") || pathname.includes("/quote-requests")));

            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${
                    isActive
                      ? "bg-[#F68E2D] text-white font-semibold shadow-md shadow-[#F68E2D]/20"
                      : "text-white/80 hover:bg-[#F68E2D]/80 hover:text-white"
                  }`}
                >
                  <span
                    className={`w-5 h-5 flex items-center justify-center shrink-0 ${
                      isActive ? "text-white" : "text-white/80"
                    }`}
                  >
                    <Icon />
                  </span>
                  <span className="text-sm">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex-1"></div>

      {/* Bottom Logout Navigation */}
      <nav className="px-3 pb-4 mt-auto">
        <ul className="space-y-1">
          <li>
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-3.5 py-2 rounded-lg text-white/80 hover:bg-red-500/10 hover:text-red-400 transition-colors text-left cursor-pointer"
            >
              <span className="w-5 h-5 flex items-center justify-center text-red-400">
                <LogoutIcon />
              </span>
              <span className="text-sm font-medium">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );

  return (
    <div className="min-h-screen flex w-full bg-[#03091F] text-white">
      {/* Desktop Sticky Sidebar */}
      <aside className="w-64 shrink-0 bg-[#14112E] text-white flex-col h-screen sticky top-0 z-30 overflow-y-auto border-r border-white/5 hidden md:flex">
        {renderSidebarContent()}
      </aside>

      {/* Mobile Drawer Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#14112E] text-white flex flex-col h-full overflow-y-auto transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {renderSidebarContent()}
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 md:hidden backdrop-blur-xs"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Header */}
        <header className="bg-[#14112E] text-white px-6 py-4 flex items-center justify-between sticky top-0 z-10 border-b border-white/5">
          <button
            className="md:hidden mr-4 text-white p-1 hover:bg-white/10 rounded cursor-pointer"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 12H21M3 6H21M3 18H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Search Bar for CMS Sections */}
          <div className="flex-1 max-w-[340px] relative" ref={searchRef}>
            <div className="relative flex items-center bg-white/5 rounded-full px-3.5 py-1.5 border border-white/30 focus-within:border-[#F68E2D] focus-within:ring-2 focus-within:ring-[#F68E2D]/20 transition-all shadow-sm">
              <SearchIcon className="text-white/80 w-4 h-4 shrink-0" />
              <input
                type="text"
                placeholder="Search CMS sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults.length > 0) setShowSearchDropdown(true);
                }}
                className="w-full pl-2.5 pr-2 text-xs text-white placeholder-white/60 font-medium bg-transparent outline-none border-none"
              />
            </div>

            {/* LIVE SEARCH RESULTS OVERLAY */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-[#14112E] border border-white/20 rounded-xl shadow-2xl p-3 z-50 max-h-80 overflow-y-auto space-y-1 text-xs text-white">
                <p className="text-[10px] font-bold text-[#F68E2D] uppercase tracking-wider mb-2 px-1">
                  CMS Navigation
                </p>
                {searchResults.length > 0 ? (
                  searchResults.map((s) => (
                    <div
                      key={s.path}
                      onClick={() => {
                        setShowSearchDropdown(false);
                        setSearchQuery("");
                        navigate(s.path);
                      }}
                      className="p-2 bg-white/5 hover:bg-white/10 rounded-lg cursor-pointer transition-colors"
                    >
                      <p className="font-bold text-white">{s.name}</p>
                      <p className="text-[11px] text-white/60">{s.desc}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-white/50 py-3">No matching CMS sections found.</p>
                )}
              </div>
            )}
          </div>

          {/* Actions & Display Full Name */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative" ref={notifRef}>
              <button
                className="p-1.5 hover:bg-white/10 rounded-full cursor-pointer relative flex items-center justify-center transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsNotificationOpen((prev) => !prev);
                }}
                title="Notifications"
                aria-label="Notifications"
              >
                <NotificationsIcon className="w-6 h-6 text-white" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-[#F68E2D] rounded-full ring-2 ring-[#14112E] animate-pulse" />
              </button>

              {/* Notification Popover Modal */}
              {isNotificationOpen && (
                <div
                  className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#14112E] border border-white/20 rounded-xl shadow-2xl p-4 z-50 space-y-3 text-left"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white">Notifications</h3>
                      <span className="bg-[#F68E2D] text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        3 New
                      </span>
                    </div>
                    <span className="text-[10px] text-white/50 font-medium">Realtime Alerts</span>
                  </div>

                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1 text-xs">
                    <div className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-white">CMS Portal Active</p>
                        <span className="text-[9px] text-[#F68E2D] font-semibold uppercase">
                          System
                        </span>
                      </div>
                      <p className="text-[11px] text-white/70 mt-1">
                        All 8 public CMS sections are active and synced with the database.
                      </p>
                      <span className="text-[9px] text-white/40 font-mono mt-1 block">Just now</span>
                    </div>

                    <div className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-white">Contact Enquiries Active</p>
                        <span className="text-[9px] text-emerald-400 font-semibold uppercase">
                          Contact
                        </span>
                      </div>
                      <p className="text-[11px] text-white/70 mt-1">
                        Receiving inquiries at info@mobtakergroup.com.
                      </p>
                      <span className="text-[9px] text-white/40 font-mono mt-1 block">
                        1 hour ago
                      </span>
                    </div>

                    <div className="p-2.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/5">
                      <div className="flex items-center justify-between">
                        <p className="font-bold text-white">Database Verification</p>
                        <span className="text-[9px] text-blue-400 font-semibold uppercase">
                          Storage
                        </span>
                      </div>
                      <p className="text-[11px] text-white/70 mt-1">
                        Image uploads and cloud storage endpoints operational.
                      </p>
                      <span className="text-[9px] text-white/40 font-mono mt-1 block">
                        Today
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Profile avatar & Dropdown */}
            <div className="relative">
              <button
                className="p-1 hover:bg-white/10 rounded-full flex items-center gap-2.5 focus:outline-none cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsProfileMenuOpen(!isProfileMenuOpen);
                }}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-white/10 border border-white/20">
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="User Profile"
                      className="w-full h-full object-cover"
                      onError={() => setProfilePic(null)}
                    />
                  ) : (
                    <ProfileIcon className="w-5 h-5 text-white/80" />
                  )}
                </div>
                <span className="hidden sm:inline-block font-semibold text-xs text-white max-w-[140px] truncate">
                  {displayName}
                </span>
              </button>

              {isProfileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-[#14112E] border border-white/10 rounded-lg shadow-2xl py-2 z-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="px-4 py-2 border-b border-white/10 mb-1">
                    <p className="font-bold text-xs text-white truncate">{displayName}</p>
                    <p className="text-[10px] text-[#F68E2D] font-semibold uppercase">
                      Administrator
                    </p>
                  </div>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      navigate("/cms");
                    }}
                  >
                    CMS Portal
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors cursor-pointer"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto flex flex-col">
          <div className="p-6 flex-1">{children}</div>

          {/* Bottom Footer */}
          <footer className="bg-[#03091F] border-t border-white/10 px-6 py-4 mt-auto">
            <div className="flex items-center justify-between text-xs text-white/50">
              <p>© {new Date().getFullYear()} Mobtaker Group. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <span>Central Admin Portal</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
