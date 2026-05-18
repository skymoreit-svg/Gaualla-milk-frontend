"use client";
import React, { useState, useEffect } from 'react'
import TopBar from './components/TopBar'
import MyNav from './components/MyNav'
import Footer from './components/Footer'
import BottomfixLinks from './components/BottomfixLinks'
import { usePathname } from 'next/navigation'
import axios from 'axios'
import LogoLoader from './components/LogoLoader'

axios.defaults.withCredentials = true;

const NextLayout = ({ children }) => {
  const path = usePathname()
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Show loader for at least 1 second
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return (
      <div className="fixed inset-0 z-[99999] bg-background flex items-center justify-center">
        <LogoLoader text="Gaualla: Purity at its Best" />
      </div>
    );
  }

  return (
    <>
      {!path.includes("admin") ? (
        <>
          <TopBar />
          <MyNav />
          {children}
          <Footer />
          <BottomfixLinks />
        </>
      ) : (
        <>{children}</>
      )}
    </>
  )
}

export default NextLayout
