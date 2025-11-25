import React from 'react'

export default function PopForm() {
  return (
    <div>
       <div className=" p-4  shadow-2xl rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 text-center">
             Enquire Now
            </h2>
            <form className="space-y-3">
              <div>
                <label className="block text-gray-700 text-sm">Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:outline-none "
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:outline-none "
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm">Phone</label>
                <input
                  type="tel"
                  placeholder="Enter phone number"
                  className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:outline-none "
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm">Message</label>
                <textarea
                  placeholder="Your inquiry..."
                  className="w-full mt-1 p-2 text-sm border border-gray-300 rounded focus:outline-none "
                  rows="3"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#F2D0BA] text-white py-2 text-sm rounded hover:bg-[#f5cdb2] transition"
              >
                Submit
              </button>
            </form>
          </div>
    </div>
  )
}
