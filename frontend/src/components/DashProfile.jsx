import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { updateStart, updateFailure, updateSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { Alert } from 'flowbite-react';

export default function DashProfile() {
  const { currentUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // State to control visibility for animation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`http://localhost:3000/api/user/update/${currentUser.reg_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

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
    setIsVisible(true); // Trigger the animation on mount

    return () => {
      document.head.removeChild(styleSheet); // Clean up the style element
    };
  }, []);

  return (
    <form className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-blue-300 p-8" onSubmit={handleSubmit}>
      <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-xl transition-transform transform hover:scale-105" style={slideInStyle}>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Profile Details</h2>
        
        <div className="space-y-6">
          {/* First Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">First Name</label>
            <input id='f_name' className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700" defaultValue={currentUser.f_name} placeholder='First name' type='text' onChange={handleChange}>
            </input>
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Last Name</label>
            <input id='l_name' className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700" defaultValue={currentUser.l_name} placeholder='Last name' type='text' onChange={handleChange}>
            </input>
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Email Address</label>
            <input id='email' className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700" placeholder='email' defaultValue={currentUser.email} type='text' onChange={handleChange}>
            </input>
          </div>

          {/* Password */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Password</label>
            <input id='pswd' className="mt-2 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-700" placeholder='*******' type='password' onChange={handleChange}>
            </input>
          </div>
        </div>

        {/* Buttons for Update and Delete */}
        <div className="mt-8 flex justify-between">
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600">
            Update
          </button>
          <button className="px-6 py-3 bg-red-500 text-white font-semibold rounded-md shadow hover:bg-red-600">
            Delete
          </button>
        </div>
        
        {
          updateUserSuccess && (
            <Alert color='success' className='mt-5'>
              {updateUserSuccess}
            </Alert>
          )
        }
        {
          updateUserError && (
            <Alert color='failure' className='mt-5'>
              {updateUserError}
            </Alert>
          )
        }
      </div>
    </form>
  );
}
