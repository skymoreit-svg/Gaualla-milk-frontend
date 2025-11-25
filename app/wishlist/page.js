import React from 'react';
import WishList from '../components/WishList';
export const metadata = {
  title: "Your Wishlist - Save Your Favorite Herbal Products | Gaualla Milk Dairy",
  description:
    "View and manage your favorite herbal and wellness products on your Gaualla Milk Dairy wishlist. Save items to revisit and shop later for a healthier lifestyle.",
};


export default function page() {


  return (
    <>
      <WishList />
    </>
  );
}
