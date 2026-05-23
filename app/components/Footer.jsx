

"use client";
import Link from "next/link";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineLocalPhone } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import BottomfixLinks from "./BottomfixLinks";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "./utlis/apis";
import { toast } from "react-hot-toast";

const Footer = () => {
  const [categoryData, setCategorydata] = useState();
  const [newsletterForm, setNewsletterForm] = useState({ email: "", phone: "" });
  const [newsletterLoading, setNewsletterLoading] = useState(false);


  const fetchcategory = async () => {
    const response = await axios.get(`${baseurl}/category`)
    const data = await response.data;
    if (data.success) {
      setCategorydata(data.category)
    }

  }

  useEffect(() => {
    fetchcategory()
  }, []);


  const pathName = usePathname();

  const check = pathName == "/";

  const newsletterUrl =
    process.env.NEXT_PUBLIC_NEWSLETTER_API_URL ||
    // "https://api.gauallamilk.com/api/newsletter/subscribe";
    "http://localhost:8000/api/newsletter/subscribe";

  const handleNewsletterChange = (event) => {
    const { name, value } = event.target;
    setNewsletterForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewsletterSubmit = async (event) => {
    event.preventDefault();

    if (!newsletterForm.email || !newsletterForm.phone) {
      toast.error("Please enter both email and phone number.");
      return;
    }

    setNewsletterLoading(true);
    try {
      const { data } = await axios.post(newsletterUrl, newsletterForm);

      if (data?.success) {
        toast.success(data.message || "Subscribed successfully!");
        setNewsletterForm({ email: "", phone: "" });
      } else {
        toast.error(data?.message || "Subscription failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Subscription failed. Please try again.");
    } finally {
      setNewsletterLoading(false);
    }
  };


  return (
    <>
      {/* WhatsApp Button */}
     <a
  href="https://wa.me/+918378000052"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-8 right-2.5 z-50"
>
  <img
    src="/whatsapp.webp"
    alt="WhatsApp"
    className="w-10 h-10 rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce"
  />
</a>

<a
  href="tel:+918378000052"
  className="fixed bottom-[85px] right-3 z-50"
>
  <img
    src="/phone-call.webp"
    alt="Call Us"
    className="w-10 h-10 bg-background rounded-full shadow-lg hover:scale-110 transition-transform animate-bounce"
  />
</a>


      <section className="sm:py-10 md:py-12">
        <div className="container mx-auto rounded-3xl border border-[var(--highlight)] bg-[var(--background)] px-6 py-8 shadow-[0_20px_60px_rgba(98,55,31,0.12)] lg:px-10 lg:py-10">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">
                Newsletter
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-text">
                Join our wellness updates before the footer.
              </h2>
              <p className="max-w-2xl text-base md:text-lg text-text">
                Share your email and phone number to receive product updates, offers, and dairy wellness news.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="grid gap-3">
              <div className="grid gap-3 md:grid-cols-2">
                <input
                  type="email"
                  name="email"
                  value={newsletterForm.email}
                  onChange={handleNewsletterChange}
                  placeholder="Email address"
                  className="w-full rounded-full border border-[var(--highlight)] bg-background px-5 py-3 text-text outline-none transition focus:border-[var(--primary)]"
                />
                <input
                  type="tel"
                  name="phone"
                  value={newsletterForm.phone}
                  onChange={handleNewsletterChange}
                  placeholder="Phone number"
                  className="w-full rounded-full border border-[var(--highlight)] bg-background px-5 py-3 text-text outline-none transition focus:border-[var(--primary)]"
                />
              </div>
              <button
                type="submit"
                disabled={newsletterLoading}
                className="rounded-full bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:bg-[#4f2c18] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {newsletterLoading ? "Subscribing..." : "Subscribe Now"}
              </button>
            </form>
          </div>
        </div>
      </section>


      <footer className="mb-20 md:mb-0 px-4 md:px-8 pb-8 pt-4">
        <div className="bg-[#62371F] rounded-3xl p-3 md:p-5 shadow-xl relative overflow-hidden">
          <div className="border-2 border-dashed border-white rounded-2xl p-6 md:p-10 xl:p-16 relative z-10 font-oswald tracking-wider text-[#ECE4BD]">
            <div className="container mx-auto relative z-10">
              <div className="flex flex-col lg:flex-row gap-y-10 justify-between mb-8">
                <div className="space-y-4 lg:w-[30%]">
                  <Link href="/" className="">
                    <img
                      src="/img/logo.webp"
                      alt="logo"
                      className="w-32 md:w-28 lg:w-48"
                    />
                  </Link>
                  <p className="mt-2 text-sm text-[#ECE4BD]/90 hover:text-white transition-colors duration-200">
                    Experience the essence of natural wellness with Gaualla Milk Dairy. Our dairy products are pure, chemical-free, and crafted with care to promote holistic health and nourishment.
                  </p>
                  <div className="flex items-center text-xl gap-x-2">
                    <a
                      href="https://www.instagram.com"
                      target="_blank"
                      className="w-9 h-9 bg-[#ECE4BD] text-[#62371F] rounded-lg flex justify-center items-center hover:bg-white hover:scale-110 transition-all shadow-md"
                    >
                      <RiInstagramFill className="text-xl shadow-2xl" />
                    </a>
                    <a
                      href="https://www.facebook.com"
                      target="_blank"
                      className="w-9 h-9 bg-[#ECE4BD] text-[#62371F] rounded-lg flex justify-center items-center hover:bg-white hover:scale-110 transition-all shadow-md"
                    >
                      <FaFacebook className="text-xl" />
                    </a>
                    <a
                      href="https://www.twitter.com"
                      target="_blank"
                      className="w-9 h-9 bg-[#ECE4BD] text-[#62371F] rounded-lg flex justify-center items-center hover:bg-white hover:scale-110 transition-all shadow-md"
                    >
                      <FaTwitter className="text-xl" />
                    </a>
                    <a
                      href="https://www.youtube.com"
                      target="_blank"
                      className="w-9 h-9 bg-[#ECE4BD] text-[#62371F] rounded-lg flex justify-center items-center hover:bg-white hover:scale-110 transition-all shadow-md"
                    >
                      <FaYoutube className="text-xl" />
                    </a>
                  </div>
                </div>

                <div className="space-y-2 hidden lg:block">
                  <h2 className="text-base text-white font-bold uppercase">Quick Links</h2>
                  <ul className="space-y-2 text-[#ECE4BD]/90 transition-colors duration-200 text-sm">
                    <li className="hover:text-white">
                      <Link href="/">Home</Link>
                    </li>
                    <li className="hover:text-white">
                      <Link href="/about">About</Link>
                    </li>
                    <li className="hover:text-white">
                      <Link href="/product/?name=all">Product</Link>
                    </li>
                    <li className="hover:text-white">
                      <Link href="/blogs">Blogs</Link>
                    </li>
                    <li className="hover:text-white">
                      <Link href="/contact-us">Contact Us</Link>
                    </li>
                  </ul>
                </div>

                <div className="space-y-2 hidden lg:block">
                  <h2 className="text-base text-white font-bold uppercase">Our Products</h2>
                  <ul className="space-y-2 text-[#ECE4BD]/90 transition-colors duration-200 text-sm">
                    {categoryData?.slice(0, 5).map((elm, index) => (
                      <li key={index} className="hover:text-white capitalize">
                        <Link
                          href={`/product?name=${elm.name}`}
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {elm.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 lg:hidden pl-4 gap-4">
                  <div className="space-y-2">
                    <h2 className="text-base text-white font-bold uppercase">Our Links</h2>
                    <ul className="space-y-2 text-[#ECE4BD]/90 transition-colors duration-200 text-sm">
                      <li className="hover:text-white">
                        <Link href="/">Home</Link>
                      </li>
                      <li className="hover:text-white">
                        <Link href="/blogs">Blogs</Link>
                      </li>
                      <li className="hover:text-white">
                        <Link href="/about">About</Link>
                      </li>
                      <li className="hover:text-white">
                        <Link href="/contact-us/">Contact Us</Link>
                      </li>
                      <li className="hover:text-white">
                        <Link href="/product?name=all">Product</Link>
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-base text-white font-bold uppercase">Our Products</h2>
                    <ul className="space-y-2 text-[#ECE4BD]/90 transition-colors duration-200 text-sm">
                      {categoryData?.slice(0, 5).map((item, index) => (
                        <li className="hover:text-white capitalize" key={index}>
                          <Link href={`/product?name=${item.name}`}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-2 lg:w-[35%] xl:w-[30%] flex flex-col items-start">
                  <h2 className="text-base text-white font-bold uppercase">Our Address</h2>
                  <div className="flex items-start gap-x-2 text-sm text-[#ECE4BD]/90 hover:text-white transition-colors duration-200 font-sans normal-case tracking-normal">
                    <IoLocationOutline className="mt-1 text-lg shrink-0" />
                    <p className="xl:text-nowrap">
                      Booth No 7, Pocket C, Wave Estate, <br />
                      Sector 85, Mohali, 140306, India
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-2 text-sm text-[#ECE4BD]/90 transition-colors duration-200 font-sans normal-case tracking-normal">
                    <a
                      href="tel: +91-8378-000052"
                      className="flex items-center gap-x-2 hover:text-white"
                    >
                      <MdOutlineLocalPhone className="text-lg shrink-0" />
                      +91-8378-000052
                    </a>
                    <a
                      href="mailto:gauallamilkpvtltd@gmail.com"
                      className="flex items-center gap-x-2 hover:text-white"
                    >
                      <HiOutlineMail className="text-lg shrink-0" />
                      gauallamilkpvtltd@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-[#ECE4BD]/20 my-6" />
            <div className="container mx-auto relative z-10">
              <div className="md:flex flex-wrap lg:justify-between items-center text-xs md:text-sm text-[#ECE4BD]/80 justify-center gap-4">
                <p className="text-center hover:text-white transition-colors duration-200">
                  © {new Date().getFullYear()} Gaualla Milk . All rights reserved.
                </p>
                <p className="hover:text-white transition-colors duration-200 text-center">
                  <span className="flex justify-center items-center">
                    Designed by&nbsp;
                    <a
                      href="https://skymoreitsolutions.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold underline"
                    >
                      Skymore It Solutions ❤️
                    </a>
                  </span>
                </p>
                <div className="space-x-4 flex justify-center text-center">
                  <Link
                    className="hover:text-white transition-colors duration-200"
                    href="/privacy-Policy"
                  >
                    Privacy Policy |
                  </Link>
                  <Link
                    className="hover:text-white transition-colors duration-200"
                    href="/terms-condition"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {check && <BottomfixLinks />}
    </>
  );
};

export default Footer;
