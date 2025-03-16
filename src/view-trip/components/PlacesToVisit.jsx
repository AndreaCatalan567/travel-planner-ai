import React from 'react';
import PlaceCardItem from '../components/PlaceCardItem';

function PlacesToVisit({ trip }) {
  if (!trip.tripData?.itinerary) return <p>No itinerary available</p>;

  return (
    <div>
      <h2 className="font-bold text-lg mt-5 text-red-400">Places to Visit</h2>

      <div>
        {Object.entries(trip.tripData.itinerary)
          .sort((a, b) => {
            const dayA = parseInt(a[0].replace(/\D/g, ""), 10);
            const dayB = parseInt(b[0].replace(/\D/g, ""), 10);
            return dayA - dayB;
          })
          .map(([day, details], index) => (
            <div className='mt-5' key={index}>
              <h2 className="p-1 px-3 bg-red-100 font-semibold rounded-full text-lg capitalize text-red-400 text-center ">{day}</h2>
              <div className='grid grid-cols-2 gap-5'>
              {details.activities?.map((place, idx) => (
                <div key={idx} className="mb-4 my-3">
            
                  <PlaceCardItem place = {place}/>
                  <h2 className="font-medium text-sm text-red-700 mt-5">
                    {`Best Time to Visit: ${place.bestTimeToVisit}`}
                  </h2>
                </div>
              ))}
                </div>


            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
