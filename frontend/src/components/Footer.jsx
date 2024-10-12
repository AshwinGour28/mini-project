import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';
import React from 'react';

export default function FooterCom() {
  return (
    <Footer 
      className="bg-gray-800 text-white border-t-8 border-teal-500 p-6" 
      style={{ 
        animation: 'slide-down 0.5s ease-out forwards', 
        opacity: 0 
      }}>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <div className='flex gap-6'>
          <Footer.Icon 
            href='#' 
            icon={BsFacebook} 
            className="text-3xl hover:text-teal-300 transition duration-300" 
          />
          <Footer.Icon 
            href='#' 
            icon={BsInstagram} 
            className="text-3xl hover:text-teal-300 transition duration-300" 
          />
          <Footer.Icon 
            href='#' 
            icon={BsTwitter} 
            className="text-3xl hover:text-teal-300 transition duration-300" 
          />
          <Footer.Icon 
            href='#' 
            icon={BsGithub} 
            className="text-3xl hover:text-teal-300 transition duration-300" 
          />
        </div>
        <div className='text-center mt-4'>
          <Footer.Copyright 
            href='#' 
            by='Jet Set Go' 
            year={new Date().getFullYear()} 
            className='font-semibold text-sm'
          />
        </div>
      </div>
      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-400'>
          &copy; {new Date().getFullYear()} Jet Set Go. All rights reserved.
        </p>
        <p className='text-sm text-gray-400'>
          Your trusted travel partner.
        </p>
      </div>

      {/* CSS for Slide-down Animation */}
      <style>{`
        @keyframes slide-down {
          0% {
            transform: translateY(-30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </Footer>
  );
}
