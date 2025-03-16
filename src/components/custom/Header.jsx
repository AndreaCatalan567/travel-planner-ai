import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout } from '@react-oauth/google';
import { useNavigation } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Header() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, []);

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
      window.location.reload();
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
      <img src="/logo.svg" alt="Logo" />
      <div>
        {user ? (
          <div className='flex items-center gap-3'>
            <a href="/create-trip">
              <Button variant="outline" className='rounded-full text-red-400' > + Create Trips </Button>
              </a>
            <a href="/my-trips" >
            <Button variant="outline" className='rounded-full text-red-400'> My Trips </Button>
            </a>
            <Popover>
              <PopoverTrigger asChild>     
                <img src={user?.picture} className='h-[50px] w-[50px] rounded-full cursor-pointer' alt="User" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.reload();
                }}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)} className="text-red-300"> Sign In</Button>
        )}
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

export default Header;
