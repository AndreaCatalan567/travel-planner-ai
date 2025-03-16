import React from 'react'
import { PHOTO_REF_URL } from '@/service/GlobalApi';
import { useState, useEffect } from 'react';
import { GetPlaceDetails } from '@/service/GlobalApi';

function UserTripCardItem({trip}) {
    
    const [photoUrl, setPhotoUrl] = useState(null);
    
      const GetPlacePhoto = async () => {
        if (!trip?.userSelection?.location) {
          console.warn("No location selected.");
          return;
        }
    
        const data = { textQuery: trip.userSelection.location };
    
        try {
          const result = await GetPlaceDetails(data);
          const places = result?.data?.places || [];
          
          if (places.length > 0) {
            const photos = places[0]?.photos || [];
            
            if (photos.length > 3) {
              const photoName = photos[3].name;
              console.log("Photo Name:", photoName);
              
              const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
              setPhotoUrl(PhotoUrl);
            } else {
              console.warn("Not enough photos available.");
            }
          } else {
            console.warn("No places found.");
          }
        } catch (error) {
          console.error("Error fetching place details:", error);
        }
      };
    
      useEffect(() => {
        if (trip) {
          GetPlacePhoto();
        }
      }, [trip]);
    
  return (
    
    <div className='hover:scale-105 transition-all '>
      
      <img src={photoUrl} alt=""
      className='object-cover h-[300px] w-full rounded-xl' />
      <div>
        <h2 className='font-bold text-lg mt-2 text-red-400'>
        {trip?.userSelection?.location || "No location selected"}  </h2>

        <h2 className='text-sm text-red-300'>  {trip?.userSelection.noOfDays} Days trip with {trip?.userSelection?.budget} Budget </h2>
      </div>
    </div>
  )
}

export default UserTripCardItem
