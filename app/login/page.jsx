"use client"
import { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import axios from 'axios';
import { baseurl } from '../components/utlis/apis';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
const [loader,setLoader]=useState(false)
const route = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
            setLoader(true)

    if (validateForm()) {
      const response = await axios.post(`${baseurl}/login`,formData,{
        withCredentials:true
      })
       const data= await response.data;
   
    if(data.success){
route.push("/")
    }
    
    }
            setLoader(false)

  };

  return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 p-4">
  <div className="flex w-full max-w-6xl shadow-2xl overflow-hidden rounded-2xl bg-white/10 backdrop-blur-2xl">

    {/* Left Side - Image with Overlay */}
    <div className="hidden lg:flex w-1/2 relative">
      <img
        src="/img1.webp"
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30 flex items-center justify-center">
        <div className="text-center text-white px-8">
          <h1 className="text-4xl font-extrabold mb-4 leading-snug drop-shadow-xl">
            Welcome Back!
          </h1>
          <p className="text-lg text-gray-200 max-w-md mx-auto">
            Login to explore exclusive features, insights, and opportunities.
          </p>
        </div>
      </div>
    </div>

    {/* Right Side - Login Form */}
    <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 md:p-12 rounded-r-2xl">
      <div className="w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Sign in to Your Account
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full py-3 pl-10 pr-3 border ${
                  errors.email ? "border-red-400" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 ${
                  errors.email ? "focus:ring-red-500" : "focus:ring-indigo-500"
                } focus:border-transparent transition`}
              />
            </div>
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full py-3 pl-10 pr-10 border ${
                  errors.password ? "border-red-400" : "border-gray-300"
                } rounded-lg shadow-sm focus:ring-2 ${
                  errors.password ? "focus:ring-red-500" : "focus:ring-indigo-500"
                } focus:border-transparent transition`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
              Forgot password?
            </a>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loader}
            className="w-full py-3 px-4 text-white font-semibold rounded-lg shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:ring-2 focus:ring-indigo-500 transition-all"
          >
            {loader ? "Loading..." : "Sign In"}
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
            Sign up
          </a>
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default LoginPage;