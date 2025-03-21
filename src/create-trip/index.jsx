import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/options';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { db } from '@/service/firebaseConfig';
import { doc } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_GOOGLE_PLACE_API_KEY;

function CreateTrip() {
  const [query, setQuery] = useState('');
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleInputChange = (name, value) => {

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
  
    if (!formData?.location || !formData?.noOfDays || !formData?.budget || !formData?.traveler) {
      toast("Please fill all details.");
      return;
    }
  
    setLoading(true);
    
    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', formData?.location || "")
        .replace('{totalDays}', formData?.noOfDays)
        .replace('{traveler}', formData?.traveler)
        .replace('{budget}', formData?.budget);
  
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripResponse = await result.response.text(); 
      console.log("-- Trip AI Response:", tripResponse);
  
      await SaveAiTrip(tripResponse);
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please try again.");
    }
  
    setLoading(false);
  };
  
  const SaveAiTrip = async (TripData) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user?.email) {
        toast("User email is missing.");
        return;
      }
  
      const docId = Date.now().toString();
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user.email,
        id: docId,
      });
  
      toast("Trip successfully saved!");
      console.log("Navigating to:", `/view-trip/${docId}`);
      navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error saving trip to Firestore:", error);
      toast("Failed to save trip.");
    }
  };
  
  
  
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  
  // getuserprofile
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Success:", tokenResponse);
      GetUserProfile(tokenResponse.access_token);
    },
    onError: (error) => console.log("Google Login Error:", error)
  });
  
  const GetUserProfile = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json'
          }
        }
      );
      console.log("User Profile:", response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setOpenDialog(false);
      OnGenerateTrip();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  

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
        <Button 
        disabled = {loading}
        
        onClick={OnGenerateTrip} className='text-red-300'>
          
          {loading?
        <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> : 'Generate Trip'
          }
          </Button>
      </div>

      <Dialog open = {openDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogDescription>
                <img src="/logo.svg" alt="" />
                <h2 className='font-bold text-lg mt-7'>Sign In With Google </h2>
                <p>Sign in to the App with Google authentication securely</p>

                <Button                 onClick={login}              
                className="w-full mt-5 text-red-300 items-center "> 
                
                <FcGoogle/> 
                 Sign In With Google           
                </Button>
                
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

    </div>
  );
}

export default CreateTrip;
