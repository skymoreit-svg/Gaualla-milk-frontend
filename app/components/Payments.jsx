'use client';

import Image from 'next/image';

const paymentOptions = [
  { src: '//ptal.in/cdn/shop/files/Frame_50x.png?v=1721808136', label: 'Pay via UPI' },
  { src: '//ptal.in/cdn/shop/files/Frame2_50x.svg?v=1721807879', label: 'Netbanking' },
  { src: '//ptal.in/cdn/shop/files/Frame3_50x.svg?v=1721807880', label: 'Wallets' },
  // { src: '//ptal.in/cdn/shop/files/Frame4_50x.svg?v=1721807893', label: 'EMIs' },
  // { src: '//ptal.in/cdn/shop/files/Group_1073715379_50x.svg?v=1721807951', label: 'Debit/Credit cards' },
  // { src: '//ptal.in/cdn/shop/files/Frame6_50x.svg?v=1721807880', label: 'Cash on delivery' },
  // { src: '//ptal.in/cdn/shop/files/Frame7_50x.svg?v=1721807880', label: 'Pay later' },
];

export default function SecurePayments() {
  return (
    <div className="pb-3 border-b">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Secure Payment Options:</h2>
      </div>
      <div className="flex flex-wrap gap-4">
        {paymentOptions.map((option, index) => (
          <div key={index} className="flex gap-3 items-center text-center">
            <div className=" w-8 h-8 relative">
              <Image
                src={option.src}
                alt={option.label}
                fill
                className="object-contain"
                sizes="30px"
              />
            </div>
            <p className="text-sm text-gray-700">{option.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
