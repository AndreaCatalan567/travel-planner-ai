import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import UserTripCardItem from './components/UserTripCardItem';

function MyTrips() {
    const navigate = useNavigate();  
    const [userTrips, setUserTrips] = useState([]); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        GetUserTrips();
    }, []);

    const GetUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (!user) {
            navigate('/');  
            return;
        }

        try {
            const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
            const querySnapshot = await getDocs(q);
            const trips = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
            setUserTrips(trips); 
        } catch (error) {
            console.error("Error fetching trips:", error);
        } finally {
            setLoading(false); // Stops loading state after fetching
        }
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
            <h2 className="font-bold text-3xl text-red-400">My Trips</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-10">
                {loading ? (
                    // Skeleton Loader while fetching data
                    [1,2,3,4,5,6].map((item, index) => (
                        <div key={index} className="h-[300px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
                    ))
                ) : userTrips.length > 0 ? (
                    userTrips.map((trip) => (
                        <Link 
                            key={trip.id} 
                            to={`/view-trip/${trip.id}`} 
                            className="block transform transition duration-300 hover:scale-105"
                        >
                            <UserTripCardItem trip={trip} />
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-500">No trips available.</p>
                )}
            </div>
        </div>
    );
}

export default MyTrips;
