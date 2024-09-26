import { Footer } from 'flowbite-react'
import {BsFacebook, BsInstagram, BsTwitter, BsGithub} from 'react-icons/bs'
import React from 'react'

export default function FooterCom() {
  return (
    <Footer container className='border-t-8 border-teal-500'>
        <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>
            <Footer.Icon href='#' icon={BsFacebook} />
            <Footer.Icon href='#' icon={BsInstagram} />
            <Footer.Icon href='#' icon={BsTwitter} />
            <Footer.Icon href='#' icon={BsGithub} />
        </div>
        <div>
            <Footer.Copyright href='#' by='NameOfSite' year={new Date().getFullYear()}/>
        </div>
    </Footer>
  )
}
