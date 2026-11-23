import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { login, continueWithGoogle, storeAuthToken, storeUserData } from "../lib/api";

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("admin@mobtakergroup.com");
  const [password, setPassword] = useState("admin123");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Mobtaker Group - Sign In";

    // Purge legacy aega keys from browser storage
    localStorage.removeItem("aega_remember_email");
    localStorage.removeItem("aega_remember_me");
    localStorage.removeItem("aega_token");
    localStorage.removeItem("aega_user");

    // Load Remember Me data
    const savedEmail = localStorage.getItem("mobtaker_remember_email");
    const savedRemember = localStorage.getItem("mobtaker_remember_me") === "true";
    if (savedRemember && savedEmail && !savedEmail.includes("aega")) {
      setEmail(savedEmail);
      setRememberMe(true);
    } else {
      setEmail("admin@mobtakergroup.com");
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate spaces
      if (email.trim() !== email) {
        toast.error("Leading/Trailing spaces are not allowed in the email field");
        setIsLoading(false);
        return;
      }

      if (email.includes(" ") || password.includes(" ")) {
        toast.error("Spaces are not allowed in both fields");
        setIsLoading(false);
        return;
      }

      if (!email || !password) {
        toast.error("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error("Please enter a valid email");
        setIsLoading(false);
        return;
      }

      const loginData = {
        email: email.trim(),
        password: password,
        role: "admin",
      };

      const loadToastId = toast.loading("Signing in...");
      const response = await login(loginData);

      // Handle Remember Me storage
      if (rememberMe) {
        localStorage.setItem("mobtaker_remember_email", email.trim());
        localStorage.setItem("mobtaker_remember_me", "true");
      } else {
        localStorage.removeItem("mobtaker_remember_email");
        localStorage.removeItem("mobtaker_remember_me");
      }

      // Store auth token and user data
      storeAuthToken(response.token);
      storeUserData(response.user);

      toast.dismiss(loadToastId);
      toast.success("Login successful! Welcome back.");

      // Redirect directly to main Dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast.dismiss();
      const errorMessage = error instanceof Error ? error.message : "Login failed";
      toast.error(errorMessage);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    const loadToastId = toast.loading("Connecting with Google...");

    try {
      // Call continueWithGoogle service (unified signup/signin API)
      const response = await continueWithGoogle({
        role: "admin",
      });

      // Handle Remember Me storage if checked
      if (rememberMe && response.user.email) {
        localStorage.setItem("mobtaker_remember_email", response.user.email);
        localStorage.setItem("mobtaker_remember_me", "true");
      }

      // Store auth token and user data
      storeAuthToken(response.token);
      storeUserData(response.user);

      toast.dismiss(loadToastId);
      toast.success(response.message || "Signed in with Google successfully!");

      // Redirect directly to main Dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 500);
    } catch (error) {
      toast.dismiss(loadToastId);
      const errorMessage = error instanceof Error ? error.message : "Google authentication failed";
      toast.error(errorMessage);
      console.error("Google login error:", error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050b1f] flex flex-col justify-center items-center py-12 px-4 sm:px-6">

      {/* Ambient background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#F68E2D]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Logo & Title */}
      <div className="relative z-10 flex flex-col items-center mb-8">
        <div className="flex items-center gap-3 mb-2">
          <img
            src="/logo/Innovation Logo.png"
            alt="Mobtaker Logo"
            className="w-78 h-18 brightness-125"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>
        <h1 className="text-3xl sm:text-2xl md:text-3xl font-bold tracking-wider text-white/80 uppercase text-center">
          SIGN IN
        </h1>
        <p className="text-xs text-white/50 mt-1">Mobtaker Group Administration Portal</p>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-[500px] bg-[#14112E] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl shadow-black/50">
        
        {/* Continue with Google Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading || isGoogleLoading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 py-3 px-4 rounded-xl font-semibold text-sm transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{isGoogleLoading ? "Connecting with Google..." : "Continue with Google"}</span>
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-6">
          <div className="border-t border-white/10 w-full"></div>
          <span className="bg-[#14112E] px-3 text-xs uppercase text-white/40 tracking-wider font-medium select-none">
            Or continue with email
          </span>
          <div className="border-t border-white/10 w-full"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="text-left">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              placeholder="admin@mobtakergroup.com"
              value={email}
              onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
              disabled={isLoading}
              className="w-full border border-white/20 bg-white/5 px-4 py-2.5 rounded-lg text-white placeholder-white/40 text-sm outline-none focus:border-[#F68E2D] focus:ring-2 focus:ring-[#F68E2D]/20 transition-all disabled:opacity-50"
            />
          </div>

          {/* Password */}
          <div className="text-left">
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/70">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value.replace(/\s/g, ""))}
                disabled={isLoading}
                className="w-full border border-white/20 bg-white/5 pl-4 pr-12 py-2.5 rounded-lg text-white placeholder-white/40 text-sm outline-none focus:border-[#F68E2D] focus:ring-2 focus:ring-[#F68E2D]/20 transition-all disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors cursor-pointer"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none text-white/70 hover:text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/30 bg-white/5 text-[#F68E2D] focus:ring-[#F68E2D] w-4 h-4 accent-[#F68E2D] cursor-pointer"
              />
              <span>Remember Me</span>
            </label>

            <button
              type="button"
              onClick={() => toast.info("Contact system administrator for password recovery.")}
              className="text-white/60 hover:text-[#F68E2D] transition-colors cursor-pointer"
            >
              Forget Password?
            </button>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#F68E2D] hover:bg-[#e28124] py-3 text-sm font-bold tracking-wider uppercase text-white rounded-lg transition-all shadow-lg shadow-[#F68E2D]/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
          >
            {isLoading ? "SIGNING IN..." : "SIGN IN"}
          </button>

          {/* Mobtaker Test Accounts Helper */}
          <div className="pt-4 border-t border-white/10 text-center space-y-2">
            <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider">
              Mobtaker Test Credentials
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setEmail("admin@mobtakergroup.com");
                  setPassword("admin123");
                  toast.success("Filled: admin@mobtakergroup.com");
                }}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-[#F68E2D] transition-colors cursor-pointer"
              >
                admin@mobtakergroup.com
              </button>
              <button
                type="button"
                onClick={() => {
                  setEmail("test.admin@mobtakergroup.com");
                  setPassword("admin123");
                  toast.success("Filled: test.admin@mobtakergroup.com");
                }}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                test.admin@mobtakergroup.com
              </button>
            </div>
            <p className="text-[10px] text-white/40">Password: <span className="font-mono text-white/70">admin123</span></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
