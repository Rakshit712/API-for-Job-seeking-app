import React, { useEffect } from 'react'
import { FaHome } from "react-icons/fa";
import { SiAkamai } from "react-icons/si";
import { FcBusinessman } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { IoIosCreate } from "react-icons/io";
import { FcFile } from "react-icons/fc";
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
                        <li className='tags'><Link to={'/'}><FaHome /> Home</Link></li>  
                        <li className='tags'><Link to={'/myjobs'}> <FcFile /> My Jobs </Link></li>
                        <li className='tags'> <SiAkamai /> View Applications</li>
                        <li className='tags' ><Link to={'/profile'}> <FcBusinessman />  Profile</Link></li>
                        <li className='tags' ><Link to={'/createJob'}> <IoIosCreate />  Create Job</Link></li>
                    </>
                ) : role === 'seeker' ? (
                    <>
                    <li className='tags' ><Link to={'/'}> <FaHome />  Home</Link></li>          
                    <li className='tags'><Link to={'/profile'}><FcBusinessman />  Profile</Link></li>
                    <li className='tags'> <FcFile />Jobs</li>
                    <li className='tags'> <SiAkamai /> My Applications</li>
                    </>
                ) : (
                    <>
                    <li><Link to={'/'}> <FaHome /> Home</Link></li>
                    <li className='tags'> <FcFile /> Jobs</li>
                    
                    </>
                )}
            </ul>

    </div>
    </>
  )
}

export default Sidebar