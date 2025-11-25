import React from 'react'
import PrivacyPolicy from '../components/PrivacyPolicy';

export const metadata = {
  title: "Privacy Policy - Gaualla Milk Dairy",
  description: "Discover how Gaualla Milk Dairy collects, uses, and safeguards your personal information. Your privacy and data security are our top priorities.",
};

export default function page() {
  return (
    <div>
      <PrivacyPolicy/>
    </div>
  )
}
