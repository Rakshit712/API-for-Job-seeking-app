import React, { useState } from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

function Profile() {
    const [formData, setformData] = useState({
        address: '',
        phone: '',
        education: '',
        skills: [],
        experience: '',
        bio: '',
        companyName: '',
        });

        const handleChange = (e) => {
            const { name, value } = e.target;
            setformData({
              ...formData,
              [name]: value
            });
          };

    const handleSkillsChange = (e) => {
      
        const skills = e.target.value.split(',').map(skill => skill.trim());
        setformData({
          ...formData,
          skills: skills
        });
      };
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      }

  return (
    <>
    <Header></Header>
    <Sidebar></Sidebar>
    <div>Profile</div>
    <div className='profile-container'>
        <h2 >Profile</h2>
        <div className='profile-details'>
            <form 
            onSubmit={handleSubmit}
            className='profileInfo'>

                <input id='p1'
                name='address'
                type='text'
                placeholder='your address'
                value={formData.address}
                required
                onChange={handleChange}
                />

                <input
                id='p2'
                name='phone'
                type='text'
                placeholder='your phone Number'
                value = {formData.phone}
                required
                onChange={handleChange}
                />

                <input 
                id='p3'
                name='education'
                type='text'
                placeholder='education'
                value={formData.education}
                required
                onChange={handleChange}
                
                />
             <input
              id='p4'
              name='skills'
              type='text'
              placeholder='Skills'
              value={formData.skills.join(', ')} // Join skills array with comma and space
              onChange={handleSkillsChange}
              required
            />
            <input
            id='p5'
            name='companyName'
            type='text'
            placeholder='enter company name'
            value={formData.companyName}
            onChange={handleChange}
            required
            />
            <input
            id='p6'
            name='experience'
            placeholder='your experience'
            value={formData.experience}
            onChange={handleChange}
            
            />

            <input
            id='p7'
            placeholder=' your bio'
            name='bio'
            value={formData.bio}
            onChange={handleChange}
            required
            />

            </form>
            
            <button  className='sign-button'>Submit</button>

        </div>

    </div>

    
    </>
  )
}

export default Profile