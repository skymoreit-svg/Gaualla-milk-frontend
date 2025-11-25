"use client"
import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';

import { baseurl } from '../components/utlis/apis';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// axios.defaults.withCredentials=true;


const SignUpPage = () => {
    const route= useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
   
  });
const [loader,setLoader]=useState(false)
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
   
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone is required';
      valid = false;
    } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid';
      valid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
      valid = false;
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async(e) => {
setLoader(true)
    e.preventDefault();
    if (validateForm()) {
        const response = await axios.post(`${baseurl}/signup`,formData,{
          withCredentials: true, 
        })
    const data= await response.data;
   
    if(data.success){
route.push("/")
    }else{

    }
 }
        setLoader(false)
  };

  return (
 <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-700 py-3 md:py-0">
  <div className="flex w-full  shadow-2xl  overflow-hidden bg-white/10 backdrop-blur-xl">

    <div className="hidden lg:block w-3/5 relative rounded-2xl">
      <img
        src="/img1.webp"
        alt="Background"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
        <div className="text-white text-center px-8">
          <h1 className="text-4xl font-extrabold mb-4 leading-snug drop-shadow-lg">
            Join Our Community
          </h1>
          <p className="text-lg text-gray-200 max-w-md mx-auto">
            Create an account to unlock exclusive features and benefits!
          </p>
        </div>
      </div>
    </div>

   

    <div className="w-full lg:w-2/5 bg-white p-6 md:p-12 flex flex-col justify-center rounded-none">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        Create Account
      </h2>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <i className="fas fa-user absolute left-3 top-3 text-gray-400" />
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border ${
                errors.name ? "border-red-300" : "border-gray-200"
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
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
            className="block text-sm font-medium text-gray-700"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <i className="fas fa-envelope absolute left-3 top-3 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border ${
                errors.email ? "border-red-300" : "border-gray-200"
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
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
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <i className="fas fa-phone absolute left-3 top-3 text-gray-400" />
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
              className={`w-full pl-10 pr-4 py-3 rounded-lg bg-gray-50 border ${
                errors.phone ? "border-red-300" : "border-gray-200"
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
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
            className="block text-sm font-medium text-gray-700"
          >
            Password <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <i className="fas fa-lock absolute left-3 top-3 text-gray-400" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 border ${
                errors.password ? "border-red-300" : "border-gray-200"
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">Minimum 8 characters</p>
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="mt-1 relative">
            <i className="fas fa-lock absolute left-3 top-3 text-gray-400" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full pl-10 pr-12 py-3 rounded-lg bg-gray-50 border ${
                errors.confirmPassword ? "border-red-300" : "border-gray-200"
              } focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <i
                className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}
              />
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Terms */}
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={formData.terms}
            onChange={handleChange}
            className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
            I agree to the{" "}
            <a
              href="#"
              className="text-indigo-600 hover:underline transition"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="mt-1 text-sm text-red-600">{errors.terms}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loader}
          className="w-full py-3 px-4 rounded-lg shadow-md text-lg font-semibold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 transition duration-300 disabled:opacity-50"
        >
          {loader ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 inline"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : null}
          {loader ? "Loading..." : "Create Account"}
        </button>
      </form>

      {/* Sign In */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium text-indigo-600 hover:text-indigo-500 transition"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  </div>
</div>

  );
};

export default SignUpPage;