import React from 'react'
import { Link } from 'react-router-dom'

function Hotels({ trip }) {  
  return (
    <div>
      <h2 className='font-bold text-xl mt-5 text-red-400'>
        Hotel Recommendation
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link 
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel.hotelName + ' ' + hotel.hotelAddress)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className='hover:scale-105 transition-all cursor-pointer no-underline text-black'
          >
            <div className='p-2'>
              <img src="/placeholder.jpg" className='rounded-xl mt-5' alt="Hotel Image" />
              <div className='my-2 flex flex-col gap-2'>
                <h2 className='font-bold text-red-400'>{hotel.hotelName}</h2> 
                <h2 className='text-xs text-black'>📍{hotel.hotelAddress}</h2> 
                <h2 className='text-sm text-black'> 💰{hotel.priceRange}</h2>
                <h2 className='text-sm text-black'>⭐️{hotel.rating}</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Hotels
