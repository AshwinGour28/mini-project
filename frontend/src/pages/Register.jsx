import React from 'react'
import { Link } from 'react-router-dom'
import { Button, HR, Label, TextInput } from 'flowbite-react'

export default function Register() {
  return (
    <div className='bg-cover bg-center bg-no-repeat flex justify-center items-center min-h-screen ' style={{backgroundImage: `url("/background.jpg")`}}>
      <form className='w-[420px] mt-14 bg-green-500 text-white flex rounded-lg flex-col gap-4 px-[40px] py-[30px] bg-transparent backdrop-blur-[20px]'>
        <h1 className='font-bold text-4xl text-center'>Registration</h1>
        <div className='justify-between text-center'>
        <span>Already have an account? </span>
        <Link to='/login'>Login here</Link>
        </div>
        <div>
        <Label value='First Name' />
        <TextInput placeholder='First name' id='firstname' type='text' className='w-full'/>
        </div>
        <div>
        <Label value='Last Name' />
        <TextInput placeholder='Last Name' id='lastname' type='text' className='w-full'/>
        </div>
        <div>
        <Label value='Username' />
        <TextInput placeholder='Username' id='username' type='text' className='w-full'/>
        </div>
        <div>
        <Label value='Password' />
        <TextInput placeholder='Password' id='password' type='password' className='w-full'/>
        </div>
        <div>
        <Label value='Email Address' />
        <TextInput placeholder='Email' id='email' type='email' className='w-full'/>
        </div>
        <Button gradientMonochrome="teal">Register</Button>
        <HR />
        <Button gradientMonochrome="teal">Continue with Google</Button>
      </form>
    </div>
  )
}
