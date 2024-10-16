import React, { useEffect, useState } from 'react';
import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import logo from '../images/logoo.avif'; // Correct path to the logo

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // State to control the visibility of each component
    const [visibility, setVisibility] = useState({
        logo: false,
        navItems: [],
        userMenu: false,
        loginButton: false
    });

    useEffect(() => {
        // Stagger the appearance of components
        const timeoutIds = [];

        // Logo animation
        timeoutIds.push(setTimeout(() => setVisibility(prev => ({ ...prev, logo: true })), 100));
        
        // Navigation items animation
        ['/', '/searchflights', '/about'].forEach((path, index) => {
            timeoutIds.push(setTimeout(() => setVisibility(prev => {
                const newNavItems = [...prev.navItems];
                newNavItems[index] = true;
                return { ...prev, navItems: newNavItems };
            }), (index + 1) * 100));
        });

        // User menu and login button animation
        timeoutIds.push(setTimeout(() => setVisibility(prev => ({ ...prev, userMenu: true })), 500));
        timeoutIds.push(setTimeout(() => setVisibility(prev => ({ ...prev, loginButton: true })), 700));

        // Cleanup the timeout on component unmount
        return () => {
            timeoutIds.forEach(clearTimeout);
        };
    }, []);

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
                <span
                    className={`text-3xl font-bold text-white font-poppins transition-transform duration-500 transform ${visibility.logo ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    Jet Set Go
                </span>
                <img
                    src={logo}
                    alt="Logo"
                    className={`w-16 h-16 rounded-full inline-block ml-3 transition-transform duration-500 transform ${visibility.logo ? 'translate-x-0' : '-translate-x-full'}`}
                />
            </Link>
            <Navbar.Collapse>
                <div className="flex space-x-4">
                    {['/', '/searchflights', '/about'].map((path, index) => (
                        <Navbar.Link key={path}>
                            <Link to={path} className={`text-2xl text-white hover:bg-white hover:bg-opacity-20 rounded-lg px-3 py-1 transition duration-300 transform ${visibility.navItems[index] ? 'translate-x-0' : '-translate-x-full'}`} style={{ transitionDelay: `${(index + 1) * 100}ms` }}>
                                {path === '/' ? 'Home' : path.slice(1).charAt(0).toUpperCase() + path.slice(2)} 
                            </Link>
                        </Navbar.Link>
                    ))}
                </div>
            </Navbar.Collapse>
            <div className="flex gap-2">
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

{/* Profile Link */}
<Link to={'/dashboard?tab=profile'}>
    <Dropdown.Item 
        className={`transform transition-transform duration-500 ease-in-out flex items-center space-x-3 p-3 rounded-lg 
            ${visibility.userMenu ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} 
            hover:bg-indigo-500 hover:text-black bg-indigo-100 text-gray-800 shadow-md`}
    >
        <span>Profile</span>
    </Dropdown.Item>
</Link>

{currentUser.isAdmin && (
    <Link to={'/dashboard?tab=dashboard'}>
    <Dropdown.Item 
        className={`transform transition-transform duration-500 ease-in-out flex items-center space-x-3 p-3 my-3 rounded-lg 
            ${visibility.userMenu ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} 
            hover:bg-indigo-500 hover:text-black bg-indigo-100 text-gray-800 shadow-md`}
    >
        <span>Dashboard</span>
    </Dropdown.Item>
</Link>
)
}
{/* Divider */}
<Dropdown.Divider className="my-2 border-gray-300" />

{/* Sign Out Link */}
<Dropdown.Item 
    onClick={handleSignout} 
    className={`transform transition-transform duration-500 ease-in-out flex items-center space-x-3 p-3 rounded-lg 
        ${visibility.userMenu ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'} 
        hover:bg-red-500 hover:text-black bg-red-100 text-gray-800 shadow-md`}
>
    <span>Sign Out</span>
</Dropdown.Item>

                    </Dropdown>
                ) : (
                    <Link to="/login">
                        <Button gradientDuoTone="purpleToBlue" className={`transform transition-transform duration-500 ${visibility.loginButton ? 'translate-x-0' : '-translate-x-full'}`}>Login/Register</Button>
                    </Link>
                )}
            </div>
        </Navbar>
    );
}
