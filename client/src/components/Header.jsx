import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { logout } from '../store/UserSlice';

function Header() {
  const {isLoggedIn} = useSelector((state)=>state.user);
  const dispatch = useDispatch();


useEffect(() => {
  const data = JSON.parse(localStorage.getItem('data'));
  if (data) {
    dispatch({ type: 'user/setLoggedIn', payload: true });
    if (data.isProvider !== undefined && data.isProvider) {
      dispatch({ type: 'user/setRole', payload: "provider" });
    } else {
      dispatch({ type: 'user/setRole', payload: "seeker" });
    }
  }
}, [dispatch]);



const handleLogout = () => {
  localStorage.removeItem('data');
  dispatch(logout)
  window.location.reload();
}

  return (
   
    <>
    
    <div className='navbar'>
      <div className='navCont'>
      <Link to='/'>
      <h2 className='log'>
      JobNest
      </h2>
      </Link>

      
      {isLoggedIn ? (
          <button className='LogoutButton' onClick={handleLogout}>Log Out</button>
        ) 
        
        : (
          <Link to='/login'> <button className='LoginButton'>Log In</button></Link>
        )}


</div>
    </div>
    </>
  )
}

export default Header