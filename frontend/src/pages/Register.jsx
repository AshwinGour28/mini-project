import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, HR, Label, Spinner, TextInput } from 'flowbite-react'

export default function Register() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(!formData.f_name || !formData.l_name || !formData.u_name || !formData.pswd || !formData.email){
      return setErrorMessage("Please fill all the fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('http://localhost:3000/api/auth/signup',{
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
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }
  return (
    <div className='bg-cover bg-center bg-no-repeat flex justify-center items-center min-h-screen ' style={{backgroundImage: `url("/background.jpg")`}}>
      <form className='w-[420px] mt-14 bg-green-500 text-white flex rounded-lg flex-col gap-4 px-[40px] py-[30px] bg-transparent backdrop-blur-[20px]' onSubmit={handleSubmit}>
        <h1 className='font-bold text-4xl text-center'>Registration</h1>
        <div className='justify-between text-center'>
        <span>Already have an account? </span>
        <Link to='/login'>Login here</Link>
        </div>
        <div>
        <Label value='First Name' />
        <TextInput placeholder='First name' id='f_name' type='text' className='w-full' onChange={handleChange}/>
        </div>
        <div>
        <Label value='Last Name' />
        <TextInput placeholder='Last Name' id='l_name' type='text' className='w-full' onChange={handleChange}/>
        </div>
        <div>
        <Label value='Username' />
        <TextInput placeholder='Username' id='u_name' type='text' className='w-full' onChange={handleChange}/>
        </div>
        <div>
        <Label value='Password' />
        <TextInput placeholder='Password' id='pswd' type='password' className='w-full' onChange={handleChange}/>
        </div>
        <div>
        <Label value='Email Address' />
        <TextInput placeholder='Email' id='email' type='email' className='w-full' onChange={handleChange}/>
        </div>
        <Button type='submit' gradientMonochrome="teal" disabled={loading}>
          {
            loading ? (
              <>
              <Spinner size='sm' />
              <span className='pl-3'>Loading..</span>
              </>
             ) : 'Regsiter'
          }
        </Button>
        {errorMessage && [
          <Alert className='mt-5' color='failure'>
            {errorMessage}
          </Alert>

        ]}
        <HR />
        <Button gradientMonochrome="teal">Continue with Google</Button>
      </form>
    </div>
  )
}
