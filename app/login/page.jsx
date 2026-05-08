"use client";

import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { baseurl } from "../components/utlis/apis";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { GetUser } from "../store/userSlice";
import Link from "next/link";
import Image from "next/image";

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Prefill email if Remember Me was used
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setFormData((prev) => ({ ...prev, email: rememberedEmail }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoader(true);
    try {
      const { data } = await axios.post(`${baseurl}/login`, formData, {
        withCredentials: true,
      });

      if (data.success) {
        toast.success("Login successful!");

        if (data.token) {
          localStorage.setItem("accessToken", data.token);
        }

        if (rememberMe) {
          localStorage.setItem("rememberedEmail", formData.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        dispatch(GetUser());

        setTimeout(() => {
          router.push("/");
        }, 100);
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
      console.error("Login error:", err);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full py-3 pl-10 pr-3 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition ${errors.email ? "ring-2 ring-red-500" : ""
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                )}
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
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full py-3 pl-10 pr-10 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition ${errors.password ? "ring-2 ring-red-500" : ""
                      }`}
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
                {errors.password && (
                  <p className="text-sm text-red-500 mt-1">{errors.password}</p>
                )}
              </div>

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
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
                disabled={loader}
                className="w-full group flex items-center justify-center gap-2 py-2.5 px-4 text-white font-semibold rounded-lg shadow-md bg-[#7F5539] hover:bg-[#6A472F] focus:ring-2 focus:ring-offset-2 focus:ring-[#7F5539] transition-all"
              >
                {loader ? (
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
    </>
  );
};

export default LoginPage;
