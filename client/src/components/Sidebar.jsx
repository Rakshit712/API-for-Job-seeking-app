import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Sidebar() {

    const {role} = useSelector((state)=>state.user);
    const dispatch = useDispatch();
    
  return (
    <>
    <div className='SideBar'>
        
    <ul>
                {role === 'provider' ? (
                    <>
                        <li>My Jobs</li>
                        <li>View Applications</li>
                        <li><Link to={'/profile'}>Profile</Link></li>
                    </>
                ) : role === 'seeker' ? (
                    <>
                    <li><Link to={'/profile'}>Profile</Link></li>
                        <li>Jobs</li>
                        <li>My Applications</li>
                    </>
                ) : (
                    <>
                    <li>Jobs</li>
                    
                    </>
                )}
            </ul>

    </div>
    </>
  )
}

export default Sidebar