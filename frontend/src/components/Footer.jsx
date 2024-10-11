import { Footer } from 'flowbite-react';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub } from 'react-icons/bs';
import React from 'react';

export default function FooterCom() {
  return (
    <Footer className="bg-gray-800 text-white border-t-8 border-teal-500 p-4">
      <div className='flex gap-8 justify-center mt-4'>
        <Footer.Icon 
          href='#' 
          icon={BsFacebook} 
          className="text-2xl hover:text-teal-300 transition duration-300" 
        />
        <Footer.Icon 
          href='#' 
          icon={BsInstagram} 
          className="text-2xl hover:text-teal-300 transition duration-300" 
        />
        <Footer.Icon 
          href='#' 
          icon={BsTwitter} 
          className="text-2xl hover:text-teal-300 transition duration-300" 
        />
        <Footer.Icon 
          href='#' 
          icon={BsGithub} 
          className="text-2xl hover:text-teal-300 transition duration-300" 
        />
      </div>
      <div className='text-center mt-4'>
        <Footer.Copyright 
          href='#' 
          by='Jet Set Go' 
          year={new Date().getFullYear()} 
          className='font-semibold'
        />
      </div>
    </Footer>
  );
}
