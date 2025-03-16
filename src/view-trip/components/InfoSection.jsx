import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function InfoSection({ trip }) {  
  const noOfDays = trip?.userSelection?.noOfDays;
  const dayLabel = noOfDays === 1 ? "Day" : "Days";

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
    <div>
      <img 
        src={photoUrl ?? "https://via.placeholder.com/600x300?text=No+Image"} 
        className="h-[300px] w-full object-cover rounded-xl" 
        alt="Trip Location" 
      />

      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-3xl text-red-400">
            {trip?.userSelection?.location || "No location selected"}
          </h2>

          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-red-100 rounded-full text-gray-500">
              📆 {noOfDays} {dayLabel}
            </h2>
            <h2 className="p-1 px-3 bg-red-100 rounded-full text-gray-500">
              💲 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-red-100 rounded-full text-gray-500">
              👥 No. of Travelers: {trip?.userSelection?.traveler} 
            </h2>
          </div>
        </div>
        <Button className="text-red-300"> <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
