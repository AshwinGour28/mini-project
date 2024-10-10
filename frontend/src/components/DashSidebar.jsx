import { Sidebar } from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi';
import {FaUserShield} from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import React from 'react'

export default function DashSidebar() {
    const {currentUser} = useSelector(state => state.user);
    const location = useLocation();
    const dispatch = useDispatch();
    const [tab, setTab] = useState('');
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]);
    const handleSignout = async () => {
      try {
          const res = await fetch('http://localhost:3000/api/user/signout',{
              method: 'POST',
          });
          const data = await res.json();
          if(!res.ok){
              console.log(data.message);
          }
          else{
              dispatch(signoutSuccess());
          }
      } catch (error) {
          console.log(error.message)
      }
  }
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
                {
                  currentUser.isAdmin && (
                    <Link to='/dashboard?tab=admin'>
                    <Sidebar.Item active={tab === 'admin'} icon={FaUserShield}>
                        Admin
                    </Sidebar.Item>
                    </Link>
                  )
                }
                <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
