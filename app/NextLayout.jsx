"use client"

import React from 'react'
import TopBar from './components/TopBar'
import MyNav from './components/MyNav'
import Footer from './components/Footer'
import BottomfixLinks from './components/BottomfixLinks'
import { usePathname } from 'next/navigation'
import axios from 'axios'
axios.defaults.withCredentials = true;

const NextLayout = ({ children }) => {
  const path = usePathname()
  return (
    <>



      {!path.includes("admin") ? <><TopBar />
        <MyNav />
        {children}
        <Footer />
        <BottomfixLinks />
      </>
        :
        <>{
          children
        }</>
      }

    </>
  )
}

export default NextLayout