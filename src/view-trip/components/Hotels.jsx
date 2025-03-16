import React from 'react';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {  
  return (
    <div>
      <h2 className='font-bold text-xl mt-5 text-red-400'>
        Hotel Recommendation
      </h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          hotel ? <HotelCardItem key={index} hotel={hotel} /> : null
        ))}
      </div>
    </div>
  );
}

export default Hotels;
