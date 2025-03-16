import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GetPlaceDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '@/service/GlobalApi';

function HotelCardItem({ hotel }) {  
    const [photoUrl, setPhotoUrl] = useState(hotel?.hotelImageUri || "https://via.placeholder.com/600x300?text=No+Image");

    useEffect(() => {
        if (hotel) {
            GetPlacePhoto();
        }
    }, [hotel]);

    const GetPlacePhoto = async () => {
        if (!hotel?.hotelName) {
            console.warn("No hotel name provided.");
            return;
        }

        const data = { textQuery: hotel.hotelName };

        try {
            const result = await GetPlaceDetails(data);
            const places = result?.data?.places || [];
            
            if (places.length > 0) {
                const photos = places[0]?.photos || [];
                
                if (photos.length > 3) {
                    const photoName = photos[3].name;
                    console.log("Photo Name:", photoName);
                    
                    const fetchedPhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
                    setPhotoUrl(fetchedPhotoUrl);
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

    return (
        <Link 
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotelName + ' ' + hotel?.hotelAddress)}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className='hover:scale-105 transition-all cursor-pointer no-underline text-black'
        >
            <div className='p-2'>
                <img 
                    src={photoUrl} 
                    className='rounded-xl mt-5 h-[180px] w-full object-cover' 
                    alt="Hotel Image" 
                />
                <div className='my-2 flex flex-col gap-2'>
                    <h2 className='font-bold text-red-400'>{hotel?.hotelName}</h2> 
                    <h2 className='text-xs text-black'>📍{hotel?.hotelAddress}</h2> 
                    <h2 className='text-sm text-black'> 💰{hotel?.priceRange}</h2>
                    <h2 className='text-sm text-black'>⭐️{hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
