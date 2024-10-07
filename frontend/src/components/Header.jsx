import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai';
import React from 'react'
import { useSelector } from 'react-redux';

export default function Header() {
    const {currentUser} = useSelector(state => state.user);
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
            <Button gradientDuoTone='redToYellow' className='mr-5'>Change Language</Button>
            {currentUser ? (
                <Dropdown arrowIcon={false} inline
                label={
                    <Avatar
                        alt='user'
                        img={currentUser.profilePicture}
                        rounded
                    />
                }>
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.u_name}</span>
                        <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                    <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item>Sign out</Dropdown.Item>
                </Dropdown>
            ):
            (
                <Link to="/login">
                    <Button gradientDuoTone='purpleToBlue'>Login/Register</Button>
                </Link>
            )}
        </div>
        
    </Navbar>
  )
}
