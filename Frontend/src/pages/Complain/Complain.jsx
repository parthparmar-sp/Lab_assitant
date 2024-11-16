import React from 'react'

function Complain() {
  // Generate options for Lab Numbers (Lab 1 to Lab 50)
  const labOptions = Array.from({ length: 2 }, (_, index) => `Lab ${index + 1}`);

  // Generate options for Computer Numbers (Computer 1 to Computer 50)
  const computerOptions = Array.from({ length: 50 }, (_, index) => `Computer ${index + 1}`);

  return (
    <div className='h-[100vh] w-full flex items-center justify-center bg-gradient-to-r from-gray-900 to-teal-800'>
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl p-8 space-y-6 border-2 border-white">
        <h1 className="text-2xl font-bold text-gray-800 text-center">File a Complaint</h1>
        <p className="text-gray-600 text-center mb-6">We are here to help. Please fill out the details below.</p>

        <div className="space-y-4">
          {/* Dropdown for Lab Number */}
          <select
            className="w-full p-4 text-gray-700 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition duration-200"
            defaultValue=""
          >
            <option value="" disabled>Select Lab Number</option>
            {labOptions.map((lab, index) => (
              <option key={index} value={lab}>{lab}</option>
            ))}
          </select>

          {/* Dropdown for Computer Number */}
          <select
            className="w-full p-4 text-gray-700 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition duration-200"
            defaultValue=""
          >
            <option value="" disabled>Select Computer Number</option>
            {computerOptions.map((computer, index) => (
              <option key={index} value={computer}>{computer}</option>
            ))}
          </select>

          {/* Text input for describing the issue */}
          <input
            type="text"
            placeholder="Tell Your Issue"
            className="w-full p-4 text-gray-700 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 transition duration-200"
          />
        </div>

        <button className="w-full py-3 bg-blue-800 text-white font-semibold rounded-2xl hover:bg-blue-900 transition duration-300">
          Submit Complaint
        </button>
      </div>
    </div>
  )
}

export default Complain
