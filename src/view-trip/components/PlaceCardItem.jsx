import React from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="no-underline"
      style={{ color: 'inherit', textDecoration: 'none' }} // Ensures no color change
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img 
          src="/placeholder.jpg"  
          className='w-[100px] h-[100px] rounded-xl'
          alt={place.placeName}
        />

        <div>
          <h2 className='font-bold text-lg text-red-400 mt-5'>
            {place.placeName}
          </h2>
          <p className='mt-2' style={{ color: 'inherit' }}>{place.placeDetails}</p> {/* Fix for paragraph */}
          <h2 className='mt-2 text-gray-500'> 🕐{place.travelTimeFromPrevious} </h2>
          <Button size="sm" className='text-red-700 mt-5 mb-5'>
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
