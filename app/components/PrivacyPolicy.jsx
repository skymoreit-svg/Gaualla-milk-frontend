import React from "react";
import OtherBanner from "./OtherBanner";

export const metadata = {
  title: "Privacy Policy | Gaualla Milk Dairy",
};

export default function PrivacyPolicy() {
  return (
    <>
      <OtherBanner text="Privacy Policy" />

      <main className="bg-[#f9fafb] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-10 text-gray-800">

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Privacy Policy
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            <strong>Effective Date:</strong> 1 January 2025
          </p>

          {/* Intro */}
          <section className="mb-8">
            <p className="leading-relaxed">
              Welcome to <strong>Gaualla Milk Dairy</strong> (“we,” “our,” or
              “us”). Your privacy is important to us. This Privacy Policy
              explains how we collect, use, share, and protect your personal
              information when you visit or make a purchase from our website.
            </p>
          </section>

          {/* Sections */}
          {[
            {
              title: "1. Information We Collect",
              content: (
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Personal Information:</strong> Name, email, phone
                    number, billing & shipping address, and payment details.
                  </li>
                  <li>
                    <strong>Technical Information:</strong> IP address, browser
                    type, operating system, cookies, and usage data.
                  </li>
                  <li>
                    <strong>Order Details:</strong> Products viewed, added to
                    cart, and purchased.
                  </li>
                </ul>
              ),
            },
            {
              title: "2. How We Use Your Information",
              content: (
                <ul className="list-disc list-inside space-y-2">
                  <li>To process and fulfill your orders.</li>
                  <li>To communicate about purchases or promotions.</li>
                  <li>To improve website performance and user experience.</li>
                  <li>To comply with legal obligations.</li>
                </ul>
              ),
            },
            {
              title: "3. Sharing Your Information",
              content: (
                <>
                  <p className="mb-2">
                    We do not sell your personal data. Information may be shared
                    with:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Payment gateways (Razorpay, Paytm)</li>
                    <li>Shipping and logistics partners</li>
                    <li>Hosting and IT service providers</li>
                    <li>Legal authorities if required by law</li>
                  </ul>
                </>
              ),
            },
            {
              title: "4. Cookies & Tracking",
              content: (
                <p>
                  We use cookies to enhance browsing experience, analyze traffic,
                  and remember user preferences. Disabling cookies may affect
                  site functionality.
                </p>
              ),
            },
            {
              title: "5. Data Security",
              content: (
                <p>
                  We follow reasonable security practices to protect your data,
                  but no online transmission method is 100% secure.
                </p>
              ),
            },
            {
              title: "6. Your Rights",
              content: (
                <>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Access or correct your personal information</li>
                    <li>Withdraw marketing consent</li>
                    <li>Request deletion (subject to legal requirements)</li>
                  </ul>
                  <p className="mt-3">
                    To exercise these rights, contact us at{" "}
                    <a
                      href="mailto:gauallamilkpvtltd@gmail.com"
                      className="text-blue-600 hover:underline"
                    >
                      gauallamilkpvtltd@gmail.com
                    </a>
                  </p>
                </>
              ),
            },
            {
              title: "7. Children’s Privacy",
              content: (
                <p>
                  We do not knowingly collect personal information from children
                  under the age of 18.
                </p>
              ),
            },
            {
              title: "8. Third-Party Links",
              content: (
                <p>
                  Our website may contain links to external websites. We are not
                  responsible for their privacy practices or content.
                </p>
              ),
            },
            {
              title: "9. Changes to This Policy",
              content: (
                <p>
                  We may update this Privacy Policy from time to time. Updates
                  become effective immediately upon posting.
                </p>
              ),
            },
          ].map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-xl font-semibold mb-3">
                {section.title}
              </h2>
              <div className="leading-relaxed">{section.content}</div>
            </section>
          ))}

          {/* Contact */}
          <section className="border-t pt-6 mt-10">
            <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
            <ul className="space-y-2 text-gray-700">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:gauallamilkpvtltd@gmail.com"
                  className="text-blue-600 hover:underline"
                >
                  gauallamilkpvtltd@gmail.com
                </a>
              </li>
              <li>
                <strong>Phone:</strong> +91-8378-000052
              </li>
              <li>
                <strong>Address:</strong> Booth No 7, Pocket C, Wave Estate,
                Sector 85, Mohali, 140306, India
              </li>
            </ul>
          </section>

        </div>
      </main>
    </>
  );
}
