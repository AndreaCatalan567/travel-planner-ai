import React, { useState, useEffect } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    if (!place?.placeName) {
      console.warn("No place name provided.");
      return;
    }

    const data = { textQuery: place.placeName };

    try {
      const result = await GetPlaceDetails(data);
      const places = result?.data?.places || [];

      if (places.length > 0) {
        const photos = places[0]?.photos || [];

        if (photos.length > 0) {
          const photoName = photos[0].name;
          console.log("Place Photo Name:", photoName);

          const fetchedPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
          setPhotoUrl(fetchedPhotoUrl);
        } else {
          console.warn("No photos available for this place.");
        }
      } else {
        console.warn("No places found.");
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <Link 
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="no-underline"
      style={{ color: 'inherit', textDecoration: 'none' }}
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        <img 
          src={photoUrl ?? "/placeholder.jpg"}  
          className='w-[150px] h-[150px] rounded-xl object-cover'
          alt={place.placeName}
        />

        <div>
          <h2 className='font-bold text-lg text-red-400 mt-5'>
            {place.placeName}
          </h2>
          <p className='mt-2' style={{ color: 'inherit' }}>{place.placeDetails}</p> 
          <h2 className='mt-2 text-gray-500'> 🕐 {place.travelTimeFromPrevious} </h2>
          <Button size="sm" className='text-red-700 mt-5 mb-5'>
            <FaMapLocationDot />
          </Button>
          
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
