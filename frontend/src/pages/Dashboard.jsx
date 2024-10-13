import React from 'react'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashAdmin from '../components/DashAdmin';
import DashFlights from '../components/DashFlights';

export default function Dashboard() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const [isVisible, setIsVisible] = useState(false); // State to control visibility for animation

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
        setIsVisible(true); // Trigger the animation when the component mounts or tab changes
    }, [location.search]);

    // Inline styles for slide-in animation
    const slideInStyle = {
        animation: isVisible ? 'slide-in 0.5s ease-out forwards' : 'none',
    };

    // Keyframes for the slide-in animation
    const keyframes = `
        @keyframes slide-in {
            from {
                transform: translateX(-100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;

    // Create a style element and append keyframes to it
    useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = keyframes;
        document.head.appendChild(styleSheet);

        return () => {
            document.head.removeChild(styleSheet); // Clean up the style element
        };
    }, []);

    return (
        <div className='min-h-screen flex flex-col md:flex-row'>
            <div className='md:w-56'>
                {/* Sidebar */}
                <DashSidebar />
            </div>
            <div className='flex-grow' style={slideInStyle}>
                {tab === 'profile' && <DashProfile />}
                {tab === 'admin' && <DashAdmin />}
                {tab === 'flights' && <DashFlights />}
            </div>
        </div>
    )
}
