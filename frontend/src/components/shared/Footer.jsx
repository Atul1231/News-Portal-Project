import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white pt-10 pb-6 px-4'>
      {/* Top Section */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
        {/* About us */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>About Us</h2>
          <p className='text-gray-400 text-sm'>
            Our mission is to deliver timely, unbiased, and well-researched news to keep you informed about the events that matter.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Quick Links</h2>
          <ul className='space-y-2 text-gray-400 text-sm'>
            <li className='hover:text-white'>
              <Link to="/">Home</Link>
            </li>
            <li className='hover:text-white'>
              <Link to="/about">About</Link>
            </li>
            <li className='hover:text-white'>
              <Link to="/Search">News Article</Link>
            </li>
            <li className='hover:text-white'>
              <Link to="/">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className='text-lg font-semibold mb-4'>Contact Us</h2>
          <p className='text-gray-400 text-sm'>1234 Street name, New Delhi, India</p>
          <p className='text-gray-400 text-sm'>Email: morningExpress12@gmail.com</p>
          <p className='text-gray-400 text-sm'>Phone: +91 9992773611</p>
        </div>
      </div>

      {/* Divider */}
      <div className='border-t border-gray-700 mt-10 pt-6'>
        {/* Social & Copyright */}
        <div className='text-center text-gray-500 text-sm'>
          <p>Follow us on:</p>
          <div className='flex justify-center space-x-4 mt-3 flex-wrap gap-2'>
            <a href="#" className='hover:text-white'>Facebook</a>
            <a href="#" className='hover:text-white'>LinkedIn</a>
            <a href="#" className='hover:text-white'>Twitter</a>
            <a href="#" className='hover:text-white'>Instagram</a>
          </div>
          <p className='mt-4'>&copy; {new Date().getFullYear()} Morning Express. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
