import { Sidebar } from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import React from 'react'

export default function DashSidebar() {
    const {currentUser} = useSelector(state => state.user);
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search])
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup>
            <Sidebar.Item>
            <div className="flex flex-col items-center space-x-2">
              <img
                className="w-20 h- rounded-full"
                src={currentUser.profilePicture}
                alt="Profile"
              />
              <div>
                <h2 className="font-semibold text-gray-700">{`${currentUser.f_name} ${currentUser.l_name}`}</h2>
                <span className="text-xs text-gray-500">Personal Profile</span>
              </div>
            </div>
          </Sidebar.Item>
              <Link to='/dashboard?tab=profile'>
                <Sidebar.Item active={tab === 'profile'} icon={HiUser}>
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item icon={HiArrowSmRight}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
