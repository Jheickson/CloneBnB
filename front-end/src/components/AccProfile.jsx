import React, { useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";


const AccProfile = () => {

  const { user, setUser } = useUserContext();
  const [redirect, setRedirect] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const [placeCount, setPlaceCount] = useState(0);

  useEffect(() => {
    const axiosGet = async () => {
      try {
        const { data: bookings } = await axios.get("/bookings/owner");
        const { data: places } = await axios.get("/places/owner");
        setBookingCount(bookings.length);
        setPlaceCount(places.length);
      } catch (error) { }
    };

    axiosGet();
  }, []);


  const logout = async () => {

    try {

      const { data } = await axios.post("/users/logout");

      console.log(data);



      setUser(null);

      setRedirect(true);

    } catch (error) {

      alert(JSON.stringify(error));

    }

  };



  if (redirect) return <Navigate to="/" />;

  if (!user) return <></>;

  return (
    <div className="max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden p-10 space-y-6">
      <div className="text-center">
        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4 overflow-hidden">
          {user.photoURL ? (
            <img src={user.photoURL} alt="User profile" className="w-full h-full object-cover" />
          ) : (
            <span className="text-2xl text-gray-500">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 text-sm">{user.email}</p>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Total de reservas:</span>
          <span className="font-medium">{bookingCount}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Lugares cadastrados:</span>
          <span className="font-medium">{placeCount}</span>
        </div>
      </div>

      <button
        onClick={logout}
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        <span>Sair da conta</span>
      </button>
    </div>
  );
};



export default AccProfile;
