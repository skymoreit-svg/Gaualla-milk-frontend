"use client"
import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';

export default function LanguagePop({ setLangPop }) {
  const languages = ['English',  'Hindi', 'Punjabi'];

  const[curntLan,setCurntLang]=useState()

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);


  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center  z-[999999]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Language</h2>
          <button onClick={()=>setLangPop(false)} className="text-gray-500 hover:text-black text-xl"><IoMdClose />
</button>
        </div>

        <ul className="space-y-2">
          {languages.map((lang, index) => (
            <li key={index}>
              <button onClick={()=>{setCurntLang(lang),setLangPop(false)}} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-sm">
                {lang}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
