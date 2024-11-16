import {FaLaptop } from 'react-icons/fa6';

function Header() {
    return (
      <header className='h-16 shadow-lg bg-teal-700 text-white'>
        <div className='h-full container mx-auto flex items-center justify-between px-6'>
          <div className='flex items-center'>
            <FaLaptop className='h-12 w-12 text-white animate-spin-slow' />
            <div className='ml-4'>
              <h1 className='text-3xl font-bold tracking-wide'>Lab Assistant</h1>
              <p className='text-sm text-teal-200 italic'>What can I help with today?</p>
            </div>
          </div>
          <ul className='flex space-x-8 text-lg font-semibold'>
            <li className='cursor-pointer hover:text-blue-200 transition duration-200'>
              <a href="/auth">Login</a>
            </li>
            <li className='cursor-pointer hover:text-blue-200 transition duration-200'>
              <a href="/lab-schedule">Lab Schedule</a>
            </li>
            <li className='cursor-pointer hover:text-blue-200 transition duration-200'>
              <a href="/complain">Complain</a>
            </li>
          </ul>
        </div>
      </header>
    );
  };
  
export default Header