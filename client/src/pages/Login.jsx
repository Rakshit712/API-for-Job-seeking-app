import React, { useState } from 'react'
import Header from '../components/Header'
import{Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { userLogin } from '../store/UserSlice'

function Login() {
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading ,error} = useSelector((state)=>state.user);


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    dispatch(userLogin(formData)).then((res)=>{
      console.log(res)
      if(res.payload){
        navigate('/')
      }
    })
  }
  const handleChange = (e) => {
    setFormData({...formData,[e.target.name]:e.target.value})
  }

  return (
    <>
    <Header></Header>
    <div className='Form-container-login'>

      <h2 className='login-heading'>
        Log In
      </h2>

      <form className='form'onSubmit={handleSubmit}>

        <input 
        className='user-input'
        type='text'
        placeholder='Enter your User name'
        name='userName'
        value={formData.userName}
        onChange={handleChange}
        required
        />

        <input 
        className='password-input'
        type='password'
        placeholder='Enter your password'
        name='password'
        value={formData.password}
        onChange={handleChange}
        required
        />

        <button className='login-button'>{loading?'Loading...':'Login'}</button>

        <p className='signIn-link'>New user ? .....  
          <Link to = '/register' ><button className='LoginButton'>  Sign up</button> </Link>
        </p>
      {error&& (
        <div className='alert'
        role='alert'>{error}

        </div>
      )}
      </form>

    </div>
    
    </>
  )
}

export default Login