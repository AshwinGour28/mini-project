import React from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import logo from '../images/logoo.avif'; // Correct path to the logo

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleSignout = async () => {
        try {
            const res = await fetch('http://localhost:3000/api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <Navbar className="border-b-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
            <Link to="/" className="flex items-center">
                <span className="text-3xl font-bold text-white font-poppins">Jet Set Go</span>
                <img src={logo} alt="Logo" className="w-16 h-16 rounded-full inline-block ml-3" />
            </Link>
            <Navbar.Collapse>
                <Navbar.Link>
                    <Link to="/" className="text-2xl text-white hover:bg-white hover:bg-opacity-20 rounded-lg px-3 py-1 transition duration-300">Home</Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to="/#" className="text-2xl text-white hover:bg-white hover:bg-opacity-20 rounded-lg px-3 py-1 transition duration-300">Search Flights</Link>
                </Navbar.Link>
                <Navbar.Link>
                    <Link to="/about" className="text-2xl text-white hover:bg-white hover:bg-opacity-20 rounded-lg px-3 py-1 transition duration-300">About</Link>
                </Navbar.Link>
            </Navbar.Collapse>
            <div className="flex gap-2">
                <Button gradientDuoTone="redToYellow" className="mr-5">Change Language</Button>
                {currentUser ? (
                    <Dropdown arrowIcon={false} inline label={
                        <Avatar
                            alt="user"
                            img={currentUser.profilePicture}
                            rounded
                        />
                    }>
                        <Dropdown.Header>
                            <span className="block text-sm">@{currentUser.u_name}</span>
                            <span className="block text-sm font-medium truncate">@{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link to="/login">
                        <Button gradientDuoTone="purpleToBlue">Login/Register</Button>
                    </Link>
                )}
            </div>
        </Navbar>
    );
}
