import Link from "next/link";
import React from "react";
import { FaGreaterThan } from "react-icons/fa6";
import OtherBanner from "./OtherBanner";

export default function TermsCondition() {
  return (
    <>

      <OtherBanner text="Terms & Conditions" />

      <main className="mx-5 lg:mx-28  p-6 text-gray-800">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p className="mb-6">
          <strong>Effective Date:</strong> [Insert Date]
        </p>

        <section className="mb-6">
          <p>
            Welcome to <strong>Gaualla Milk Dairy</strong> (“we,” “our,” or “us”). These Terms & Conditions govern your use of our website and services. By accessing or purchasing from us, you agree to the terms outlined below.
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
          <h2 className="text-xl font-semibold mb-2">2. Use of Services</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>You agree to use our website and services only for lawful purposes.</li>
            <li>You must provide accurate and complete information when placing orders.</li>
            <li>Misuse of our website or fraudulent activities may lead to termination of services.</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Payment & Billing</h2>
          <p>We accept payments through secure gateways (e.g., Razorpay, Paytm). By making a purchase, you agree to provide valid payment details and authorize us to charge your account for the total amount of your order.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Shipping & Delivery</h2>
          <p>Orders will be processed and shipped through our logistics partners. Delivery times may vary depending on your location.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">5. Refunds & Cancellations</h2>
          <p>Refunds or cancellations are subject to our company’s policy. Please review our refund and cancellation policy for details.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">6. Data Security</h2>
          <p>We use reasonable security practices to protect your data, but no internet method is 100% secure.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
          <p>Gaualla Milk Dairy is not liable for indirect, incidental, or consequential damages arising from the use of our website or products.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">8. Third-Party Links</h2>
          <p>Our website may contain links to external sites. We are not responsible for their practices, terms, or content.</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">9. Changes to These Terms</h2>
          <p>We may update these Terms & Conditions from time to time. Please review them periodically. Changes are effective once posted here.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
          <p>If you have any questions, contact us at:</p>
          <ul className="list-none space-y-1 mt-2">
            <li><strong>Email:</strong> gauallamilkpvtltd@gmail.com</li>
            <li><strong>Phone:</strong> +91-8378-000052</li>
            <li><strong>Address:</strong> [Booth No 7, Pocket C, Wave Estate,
              Sector 85, Mohali, 140306], India</li>
          </ul>
        </section>
      </main>

    </>
  );
}
