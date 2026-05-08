"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, User } from "lucide-react";
import Image from "next/image";

export default function SignUp() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Signed up with:", form);
    }, 1500);
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
              Create an Account
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Start your journey with us today.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div>
              <label className="block text-xs font-medium text-gray-600">Name</label>
              <div className="mt-1 relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full py-3 pl-10 pr-3 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-xs font-medium text-gray-600">Email</label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full py-3 pl-10 pr-3 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-medium text-gray-600">Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full py-3 pl-10 pr-10 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-xs font-medium text-gray-600">Confirm Password</label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full py-3 pl-10 pr-10 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition"
                  placeholder="Confirm your password"
                />
                 <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Sign-Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group flex items-center justify-center gap-2 py-2.5 px-4 text-white font-semibold rounded-lg shadow-md bg-[#7F5539] hover:bg-[#6A472F] focus:ring-2 focus:ring-offset-2 focus:ring-[#7F5539] transition-all"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign Up
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-xs text-gray-600 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#7F5539] hover:underline font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
