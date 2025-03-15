import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-10'>
        
       <h1 className='font-extrabold text-[50px] text-center mt-16 '> 
        <span className='text-[#f3a5b3] block mb-7'> Discover Your Next Adventure with AI: </span> Personalized Itineraries at Your Fingertips </h1>
    
    <p className='text-xl text-gray-500 text-center'> Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget. </p>
    
    <Link to={'/create-trip'}>
    <Button className=' text-red-300'> Get Started </Button>
    </Link>
    
    <img className="flex flex-col items-center mt-10" src="/front-laptop.png" alt="" />
    </div>

  )
}

export default Hero
