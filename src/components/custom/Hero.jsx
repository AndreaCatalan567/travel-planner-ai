import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        
       <h1 className='font-extrabold text-[50px] text-center mt-16'> 
        <span className='text-[#f3a5b3]'>Discover Your Next Adventure with AI: </span> Personalized Itineraries at Your Fingertips </h1>
    
    <p className='text-xl text-gray-500 text-center'> Your personal trip planner. </p>
    
    <Link to={'/create-trip'}>
    <Button className=' text-gray-500'> Get Started </Button>
    </Link>
    
    </div>

  )
}

export default Hero
