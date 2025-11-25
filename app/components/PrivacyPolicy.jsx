import Link from "next/link";
import React from 'react'
import { FaGreaterThan } from 'react-icons/fa6'
import OtherBanner from "./OtherBanner";

export default function PrivacyPolicy() {
  return (
    <>
      <OtherBanner text="Privacy Policy" />

      <main className="mx-5 lg:mx-28  p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
        <p className="mb-6">
          <strong>Effective Date:</strong> [Insert Date]
        </p>

        <section className="mb-6">
          <p>
            Welcome to <strong>Gaualla Milk Dairy</strong> (“we,” “our,” or “us”). Your privacy is important to us. This Privacy Policy explains how we collect, use, share, and protect your personal information when you visit or make a purchase from our website.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Personal Information:</strong> Name, email, phone number, shipping and billing address, and payment details.</li>
            <li><strong>Technical Information:</strong> IP address, browser type, operating system, and usage data via cookies.</li>
            <li><strong>Order Details:</strong> Products viewed, added to cart, and purchased.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To process and fulfill your orders.</li>
            <li>To communicate with you about purchases or promotions.</li>
            <li>To improve our website and customer experience.</li>
            <li>To comply with legal obligations.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
          <p>We do not sell your personal data. We may share it with:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Payment gateways (e.g., Razorpay, Paytm)</li>
            <li>Shipping and logistics partners</li>
            <li>Hosting and IT service providers</li>
            <li>Authorities, if legally required</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Cookies and Tracking</h2>
          <p>We use cookies to enhance your browsing experience, analyze traffic, and remember preferences. You can disable cookies via browser settings, but it may affect functionality.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Data Security</h2>
          <p>We use reasonable security practices to protect your data, but no internet method is 100% secure.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Access or correct your data</li>
            <li>Withdraw marketing consent</li>
            <li>Request deletion (subject to law)</li>
          </ul>
          <p className="mt-2">
            To exercise your rights, email us at:{" "}
            <a href="mailto:gauallamilkpvtltd@gmail.com" className="text-blue-600 underline">
              gauallamilkpvtltd@gmail.com
            </a>
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Children’s Privacy</h2>
          <p>We do not knowingly collect information from individuals under 18 years of age.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Third-Party Links</h2>
          <p>Our website may contain links to external sites. We are not responsible for their privacy practices or content.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Please review it periodically. Changes are effective once posted here.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>If you have any questions, contact us at:</p>
          <ul className="list-none space-y-1 mt-2">
            <li><strong>Email:</strong> gauallamilkpvtltd@gmail.com</li>
            <li><strong>Phone:</strong>+91-8378-000052</li>
            <li><strong>Address:</strong> [Booth No 7, Pocket C, Wave Estate,
              Sector 85, Mohali, 140306], India</li>
          </ul>
        </section>
      </main>



    </>
  )
}
