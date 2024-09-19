import React from 'react'
import { Link } from 'react-router-dom'
import { Button, HR, TextInput } from 'flowbite-react'

export default function Login() {
  return (
    <div className='bg-cover bg-center bg-no-repeat flex justify-center items-center min-h-screen ' style={{backgroundImage: `url("/background.jpg")`}}>
      <form className='w-[420px] bg-green-500 text-white flex rounded-lg flex-col gap-4 px-[40px] py-[30px] bg-transparent backdrop-blur-[20px]'>
        <h1 className='font-bold text-4xl text-center'>Login</h1>
        <div className='justify-between text-center'>
        <span>No account?  </span>
        <Link to='/register'>Register now</Link>
        </div>
        <TextInput placeholder='Email Address' id='email' type='email' className='w-full'/>
        <TextInput placeholder='password' id='password' type='password' className='w-full'/>
        <Button gradientMonochrome="teal">Login</Button>
        <Link to="#" className='text-center'>Forgot Password</Link>
        <HR />
        <Button gradientMonochrome="teal">Continue with Google</Button>
      </form>
    </div>
  )
}
