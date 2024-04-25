import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

function Home() {
  return (
    <>
    <div className='home-container'>
    <Header/>
    <Sidebar/>
    <h1 className='home-h1'>home</h1>
    </div>
    
    </>
  )
}

export default Home