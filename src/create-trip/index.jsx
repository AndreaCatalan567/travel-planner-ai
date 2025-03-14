import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SelectBudgetOptions, SelectTravelesList } from '@/constants/options';

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function CreateTrip() {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const OnGenerateTrip=()=>{
    if(formData?.noOfDays>5)
    {
      return ;
    }

    console.log(formData);
  }
  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const searchPlaces = async (input) => {
    if (!input) {
      setPlaces([]);
      return;
    }

    const url = `https://places.googleapis.com/v1/places:searchText?key=${API_KEY}`;
    const body = JSON.stringify({ textQuery: input });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress',
        },
        body,
      });
      const data = await response.json();
      setPlaces(data.places || []);
    } catch (error) {
      console.error('Error fetching places:', error);
    }
  };

  const handleSelectPlace = (place) => {
    const placeName = place.displayName?.text || place.formattedAddress;
    setQuery(placeName);
    setSelectedPlace(place);
    setPlaces([]);
    handleInputChange('location', placeName);
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences 🚘</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information</p>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
        <Input
          type='text'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            searchPlaces(e.target.value);
          }}
          placeholder='Enter location'
        />

        {places.length > 0 && (
          <ul className='mt-2 border rounded-md bg-white shadow-md'>
            {places.map((place) => (
              <li 
                key={place.id} 
                className='p-2 hover:bg-gray-200 cursor-pointer'
                onClick={() => handleSelectPlace(place)}
              >
                <strong>{place.displayName?.text}</strong> - {place.formattedAddress}
              </li>
            ))}
          </ul>
        )}

        {selectedPlace && (
          <p className='mt-3 text-gray-600'>
            You selected: <strong>{selectedPlace.displayName?.text || selectedPlace.formattedAddress}</strong>
          </p>
        )}
      </div>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
        <Input 
          placeholder='Ex. 3' 
          type='number' 
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index} 
            onClick={() => handleInputChange('budget', item.title)}

            className={`p-4 border cursor-pointer 
              rounded-lg hover:shadow-lg 
              
              ${formData?.budget==item.title&&'shadow-lg border-black'} 
            
              `}>

              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on traveling with?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div key={index} 
            onClick={() => handleInputChange('traveler', item.people)}
            className={`p-4 border cursor-pointer rounded-lg 
            hover:shadow-lg
            ${formData?.traveler==item.people&&'shadow-lg border-black'}
            `}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10 mb-10 flex justify-end'>
        <Button onClick={OnGenerateTrip} className='text-gray-500'>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
