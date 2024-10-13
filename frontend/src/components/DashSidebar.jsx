import { Sidebar } from 'flowbite-react';
import { HiUser, HiArrowSmRight, HiDocumentText } from 'react-icons/hi';
import { FaUserShield } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import React from 'react';

export default function DashSidebar() {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/user/signout', {
        method: 'POST',
        credentials: 'include',
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
    <Sidebar className="w-full md:w-56 bg-gray-300 shadow-lg"> {/* Changed to bg-gray-300 for a darker shade */}
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>

          {/* Profile Section */}
          <Sidebar.Item>
            <div className="flex flex-col items-center space-y-3 mb-6">
              <img
                className="w-24 h-24 rounded-full object-cover shadow-md"
                src={currentUser.profilePicture}
                alt="Profile"
              />
              <div className="text-center">
                <h2 className="font-semibold text-gray-800">{`${currentUser.f_name} ${currentUser.l_name}`}</h2>
                <span className="text-sm text-gray-500">Personal Profile</span>
              </div>
            </div>
          </Sidebar.Item>

          {/* Profile Link */}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              className={`hover:bg-teal-100 p-3 rounded-lg transition-all ${
                tab === 'profile' ? 'bg-teal-200 text-teal-700' : 'text-gray-700'
              }`}
            >
              <span className="text-lg">Profile</span>
            </Sidebar.Item>
          </Link>

          {/* Admin Link (for admin users only) */}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=admin'>
              <Sidebar.Item
                active={tab === 'admin'}
                icon={FaUserShield}
                className={`hover:bg-teal-100 p-3 rounded-lg transition-all ${
                  tab === 'admin' ? 'bg-teal-200 text-teal-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">Admin</span>
              </Sidebar.Item>
            </Link>
          )}

          {/* Flights Link (for admin users only) */}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=flights'>
              <Sidebar.Item   
                active={tab === 'flights'}
                icon={HiDocumentText}
                className={`hover:bg-teal-100 p-3 rounded-lg transition-all ${
                  tab === 'flights' ? 'bg-teal-200 text-teal-700' : 'text-gray-700'
                }`}
              >
                <span className="text-lg">Flights</span>
              </Sidebar.Item>
            </Link>
          )}

          {/* Signout Link */}
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer hover:bg-red-100 p-3 rounded-lg transition-all text-gray-700"
            onClick={handleSignout}
          >
            <span className="text-lg">Sign Out</span>
          </Sidebar.Item>

        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
