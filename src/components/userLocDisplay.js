import { useState } from "react";
import { FaCrosshairs } from 'react-icons/fa';
import styles from './userLocDisplay.module.css'
import { geoAPIGetByCoords } from "../services/geoAPI";

function UserLocDisplay({ onClick }) {

  const [userLocation, setUserlocation] = useState(
    {
      lat: 1.3521,
      lon: 103.8198,
      limit: 5,
    }
  )

  const handleClick = async (event) => {
    event.preventDefault();
    if (!navigator.geolocation) {
      console.log("Geolocation unsupported by browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const coords = {
            ...userLocation,
            lat: localStorage.lat,
            long: position.coords.longitude,
          }
          geoAPIGetByCoords(coords, onClick);
        }
        catch (error) {
          console.error(error);
        }

      },
      error => {
        console.error(error);
      }
    );
  }

  return (
 
      <button onClick={handleClick} className="p-4 border-l-2">
        <FaCrosshairs />
      </button>
    
  )
}
export default UserLocDisplay;