import {FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa6';
function Footer() {
    return (
      <footer className='bg-teal-700 text-white py-10'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-6 md:mb-0'>
            <h3 className='text-xl font-bold'>Lab Assistant</h3>
            <p className='text-teal-200'>Your companion for managing lab activities</p>
          </div>
          <ul className='flex space-x-8 text-lg'>
            <li className='cursor-pointer hover:text-blue-200 transition duration-200'>
              <a href="/about">About Us</a>
            </li>
            <li className='cursor-pointer hover:text-blue-200 transition duration-200'>
              <a href="/contact">Contact</a>
            </li>
            <li className='cursor-pointer hover:text-blue-200 transition duration-200'>
              <a href="/privacy">Privacy Policy</a>
            </li>
          </ul>
          <div className='flex space-x-4 mt-4 md:mt-0'>
            <a href="https://facebook.com" className='text-white hover:text-blue-300'>
              <FaFacebook className='h-6 w-6' />
            </a>
            <a href="https://twitter.com" className='text-white hover:text-blue-200'>
              <FaTwitter className='h-6 w-6' />
            </a>
            <a href="https://instagram.com" className='text-white hover:text-teal-400'>
              <FaInstagram className='h-6 w-6' />
            </a>
          </div>
        </div>
        <div className='text-center mt-6'>
          <p className='text-teal-300 text-sm'>&copy; 2024 Lab Assistant. All Rights Reserved.</p>
        </div>
      </footer>
    );
  }

export default Footer