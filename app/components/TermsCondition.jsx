import React from "react";
import OtherBanner from "./OtherBanner";

export const metadata = {
  title: "Terms & Conditions | Gaualla Milk Dairy",
};

export default function TermsCondition() {
  return (
    <>
      <OtherBanner text="Terms & Conditions" />

      <main className="bg-[#f9fafb] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6 sm:p-10 text-gray-800">

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Terms & Conditions
          </h1>

          <p className="text-sm text-gray-500 mb-8">
            <strong>Effective Date:</strong> 1 January 2025
          </p>

          {/* Intro */}
          <section className="mb-8">
            <p className="leading-relaxed">
              Welcome to <strong>Gaualla Milk Dairy</strong> (“we,” “our,” or
              “us”). These Terms & Conditions govern your access to and use of
              our website, products, and services. By using our services, you
              agree to be bound by these terms.
            </p>
          </section>

          {/* Section Template */}
          {[
            {
              title: "1. Information We Collect",
              content: (
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Personal Information:</strong> Name, email, phone
                    number, billing & shipping address, payment details.
                  </li>
                  <li>
                    <strong>Technical Information:</strong> IP address, browser
                    type, operating system, cookies, and usage data.
                  </li>
                  <li>
                    <strong>Order Information:</strong> Products viewed,
                    purchased, or added to cart.
                  </li>
                </ul>
              ),
            },
            {
              title: "2. Use of Services",
              content: (
                <ul className="list-disc list-inside space-y-2">
                  <li>Services must be used only for lawful purposes.</li>
                  <li>All information provided must be accurate and complete.</li>
                  <li>
                    Fraudulent activity may result in suspension or termination.
                  </li>
                </ul>
              ),
            },
            {
              title: "3. Payment & Billing",
              content: (
                <p>
                  Payments are processed via secure gateways such as Razorpay or
                  Paytm. By placing an order, you authorize us to charge your
                  selected payment method.
                </p>
              ),
            },
            {
              title: "4. Shipping & Delivery",
              content: (
                <p>
                  Orders are delivered through trusted logistics partners.
                  Delivery timelines may vary depending on location and
                  availability.
                </p>
              ),
            },
            {
              title: "5. Refunds & Cancellations",
              content: (
                <p>
                  Refunds and cancellations are subject to our refund policy.
                  Please review it carefully before making a purchase.
                </p>
              ),
            },
            {
              title: "6. Data Security",
              content: (
                <p>
                  We follow reasonable security practices to protect your data.
                  However, no online system is completely secure.
                </p>
              ),
            },
            {
              title: "7. Limitation of Liability",
              content: (
                <p>
                  Gaualla Milk Dairy shall not be liable for any indirect,
                  incidental, or consequential damages.
                </p>
              ),
            },
            {
              title: "8. Third-Party Links",
              content: (
                <p>
                  Our website may contain links to third-party websites. We are
                  not responsible for their content or practices.
                </p>
              ),
            },
            {
              title: "9. Changes to Terms",
              content: (
                <p>
                  We may update these terms at any time. Changes become
                  effective immediately upon posting.
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
