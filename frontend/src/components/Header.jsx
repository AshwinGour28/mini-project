import { Button, Navbar, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react'

export default function Header() {
  return (
    <Navbar className='border-b-2'>
        <Link to="/" className='self-center whitespace-nowrap text-xl font-semibold'>
            <span>Name of site</span>
            <span className='px-2 py-1 bg-red-500 rounded text-white'>Logo</span>
        </Link>
        <Navbar.Collapse>
            <Navbar.Link>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link>
                <Link to='/#'>Search Flights</Link>
            </Navbar.Link>
            <Navbar.Link>
                <Link to='/about'>About</Link>
            </Navbar.Link>
        </Navbar.Collapse>
        <div className='flex gap-2'>
            <Link to="/login">
                <Button gradientDuoTone='purpleToBlue'>Login/Register</Button>
            </Link>
            <Button gradientDuoTone='redToYellow'>Change Language</Button>
        </div>
        
    </Navbar>
  )
}
