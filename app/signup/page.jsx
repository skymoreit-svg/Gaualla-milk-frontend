"use client";
import { useState } from "react";
import {
  Mail,
  Phone as PhoneIcon,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  User,
} from "lucide-react";
import Link from "next/link";
import { baseurl } from "../components/utlis/apis";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { GetUser } from "../store/userSlice";
import toast from "react-hot-toast";
import Image from "next/image";

// Enable cookies in all requests
axios.defaults.withCredentials = true;

const SignUpPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = "Phone is required";
      valid = false;
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Phone number is invalid";
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      valid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    if (!validateForm()) {
      setLoader(false);
      return;
    }

    try {
      const response = await axios.post(`${baseurl}/signup`, formData, {
        withCredentials: true,
      });
      const data = await response.data;

      if (data.success) {
        // Save token to cookies and localStorage for login persistence
        if (data.token) {
          document.cookie = `token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
          localStorage.setItem("accessToken", data.token);
        }

        toast.success("Account created successfully!");

        // Refresh user state immediately after signup
        dispatch(GetUser());

        // Small delay to ensure state is updated before redirect
        setTimeout(() => {
          router.push("/");
        }, 100);
      } else {
        toast.error(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
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
                Create an Account
              </h2>
              <p className="text-gray-500 text-sm mt-2">
                Start your journey with us today.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-medium text-gray-600"
                >
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className={`w-full py-3 pl-10 pr-3 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition ${errors.name ? "ring-2 ring-red-500" : ""
                      }`}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-medium text-gray-600"
                >
                  Email
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`w-full py-3 pl-10 pr-3 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition ${errors.email ? "ring-2 ring-red-500" : ""
                      }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-medium text-gray-600"
                >
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <PhoneIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    className={`w-full py-3 pl-10 pr-3 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition ${errors.phone ? "ring-2 ring-red-500" : ""
                      }`}
                  />
                </div>
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              {/* Password */}
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
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-xs font-medium text-gray-600"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full py-3 pl-10 pr-10 bg-slate-100 border-transparent rounded-lg text-sm focus:ring-2 focus:ring-[#7F5539] transition ${errors.confirmPassword ? "ring-2 ring-red-500" : ""
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loader}
                className="w-full group flex items-center justify-center gap-2 py-2.5 px-4 text-white font-semibold rounded-lg shadow-md bg-[#7F5539] hover:bg-[#6A472F] focus:ring-2 focus:ring-offset-2 focus:ring-[#7F5539] transition-all"
              >
                {loader ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Sign In */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-medium text-[#7F5539] hover:underline transition"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;