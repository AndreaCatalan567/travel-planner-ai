import React from 'react'
import { IoIosSend } from "react-icons/io";
import { Button } from '@/components/ui/button';

function InfoSection({ trip }) {  
  const noOfDays = trip?.userSelection?.noOfDays;
  const dayLabel = noOfDays === 1 ? "Day" : "Days";

  return (
    <div>
      <img src="/placeholder.jpg" className='h-[300px] w-full object-cover rounded-xl'/>

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className="font-bold text-3xl text-red-400">{trip?.userSelection?.location || "No location selected"}</h2>
        
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-red-100 rounded-full text-gray-500'>
              📆 {noOfDays} {dayLabel}
            </h2>
            <h2 className='p-1 px-3 bg-red-100 rounded-full text-gray-500'>
              💲 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className='p-1 px-3 bg-red-100 rounded-full text-gray-500'>
              👥 No. of Traveler: {trip?.userSelection?.traveler} 
            </h2>
          </div>
        </div>
        <Button className='text-red-300'> <IoIosSend /></Button>
      </div>
    </div>
  );
}

export default InfoSection;
