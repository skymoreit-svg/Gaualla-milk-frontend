"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));
    console.log("Login attempt:", { email, password });

    setIsLoading(false);
    // Add your actual login logic here
  };

  return (
    <div className="min-h-screen w-full grid lg:grid-cols-2">
      {/* Left Panel */}
      <div className="flex flex-col justify-center items-center bg-[#F5EFE6] p-8 text-center">
        <div className="max-w-md">
          <Image src="/img/logo.webp" alt="Gaualla Milk Logo" width={150} height={150} className="mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-[#4A403A] leading-tight">
            Gaualla Milk
            <br />
            Freshness Delivered, Right to Your Doorstep.
          </h1>
          <p className="text-[#6D5D53] mt-4">
            Join thousands of happy families enjoying the purest milk, every single day.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex items-center justify-center p-6 sm:p-12 w-full bg-white">
        <div className="w-full max-w-sm">
          <div className="text-left mb-6">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Sign In
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Enter your credentials to access your account.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-600"
              >
                Email address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full py-3 pl-10 pr-3 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-gray-600"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full py-3 pl-10 pr-10 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#7F5539] border-gray-300 rounded focus:ring-[#7F5539]"
                />
                <span className="text-gray-700">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-[#7F5539] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full group flex items-center justify-center gap-2 py-2.5 px-4 text-white font-semibold rounded-lg shadow-md bg-[#7F5539] hover:bg-[#6A472F] focus:ring-2 focus:ring-offset-2 focus:ring-[#7F5539] transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#7F5539] hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}