import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import { isAuthenticated } from "../lib/api";

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();

  useEffect(() => {
    document.title = "404 - Page Not Found | Mobtaker Group";
    toast.error("404 Not Found: The requested page or route does not exist.");
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050b1f] flex flex-col justify-center items-center py-12 px-4 sm:px-6">
      {/* Ambient lighting glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F68E2D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-md w-full bg-[#14112E]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6">
        {/* 404 Badge */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shadow-lg shadow-red-500/10">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-red-400">
            Error 404
          </span>
          <h1 className="text-3xl font-extrabold text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-white/60 leading-relaxed">
            The page or resource you are looking for does not exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <Link
            to={authenticated ? "/dashboard" : "/login"}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F68E2D] to-[#e07516] hover:from-[#e07516] hover:to-[#c86208] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#F68E2D]/20 transition-all cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>{authenticated ? "Dashboard" : "Sign In"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

