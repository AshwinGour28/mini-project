import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, HR, Label, Spinner, TextInput } from 'flowbite-react'

export default function Login() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };
  
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!formData.email || !formData.pswd){
      return setErrorMessage("Please fill all the fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('http://localhost:3000/api/auth/signin',{
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if(data.success == false){
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  return (
    <div className='bg-cover bg-center bg-no-repeat flex justify-center items-center min-h-screen ' style={{backgroundImage: `url("/background.jpg")`}}>
      <form className='w-[420px] bg-green-500 text-white flex rounded-lg flex-col gap-4 px-[40px] py-[30px] bg-transparent backdrop-blur-[20px]' onSubmit={handleSubmit}>
        <h1 className='font-bold text-4xl text-center'>Login</h1>
        <div className='justify-between text-center'>
        <span>No account?  </span>
        <Link to='/register'>Register now</Link>
        </div>
        <TextInput placeholder='Email Address' id='email' type='email' className='w-full' onChange={handleChange}/>
        <TextInput placeholder='*********' id='pswd' type='password' className='w-full' onChange={handleChange}/>
        <Button type='submit' gradientMonochrome="teal" disabled={loading}>
          {
            loading ? (
              <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading..</span>
              </>
             ) : 'Login'
          }
        </Button>
        <Link to="#" className='text-center'>Forgot Password</Link>
        {errorMessage && [
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>

        ]}
        <HR />
        <Button gradientMonochrome="teal" type='submit'>Continue with Google</Button>
      </form>
    </div>
  )
}
