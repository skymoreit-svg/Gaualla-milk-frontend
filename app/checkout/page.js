import React from 'react'
import CheckOut from '../components/CheckOut';
import OtherBanner from '../components/OtherBanner';


export const metadata = {
    title: "Checkout | Gaualla Milk",
    description:
      "Securely complete your purchase at Gaualla Milk. Review your order, enter your details, and enjoy a seamless checkout experience for the purest milk delivered to your doorstep.",
  };
  

export default function page() {

  return (
    <div>
      <OtherBanner text="Checkout" />

      <CheckOut/>
    </div>
  )
}
