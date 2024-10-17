import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, Button, HR, Spinner, TextInput } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { signInSuccess, signInStart, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.pswd) {
      return dispatch(signInFailure("Please fill all the fields"));
    }

    try {
      dispatch(signInStart());

      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div
      className='bg-cover bg-center bg-no-repeat flex justify-center items-center min-h-screen'
      style={{ backgroundImage: `url("/bg.avif")` }}
    >
      <form
        className='w-[420px] bg-green-500 text-white flex rounded-lg flex-col gap-4 px-[40px] py-[30px] bg-transparent backdrop-blur-[20px]'
        onSubmit={handleSubmit}
      >
        <h1 className='font-bold text-4xl text-center'>Login</h1>

        <TextInput
          placeholder='Email Address'
          id='email'
          type='email'
          className='w-full'
          onChange={handleChange}
        />
        <TextInput
          placeholder='*********'
          id='pswd'
          type='password'
          className='w-full'
          onChange={handleChange}
        />
        <Button type='submit' gradientMonochrome="teal" disabled={loading}>
          {loading ? (
            <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading..</span>
            </>
          ) : 'Login'}
        </Button>

        {errorMessage && (
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>
        )}

        {/* Forgot Password and OR Section */}
        <div className='text-center mt-5'>
          <Link to="#" className='text-white font-semibold'>Forgot Password?</Link>
        </div>

        <div className='flex items-center justify-center mt-2'>
          <div className='flex-grow border-t border-white mr-2'></div>
          <span className='mx-2 text-white font-semibold'>OR</span>
          <div className='flex-grow border-t border-white ml-2'></div>
        </div>

        {/* No account section */}
        <div className='text-center mt-2'>
          <span className='text-white'>No account? </span>
          <Link to='/register' className='font-semibold text-white'>Register now</Link>
        </div>

      

        <OAuth />
      </form>
    </div>
  );
}
