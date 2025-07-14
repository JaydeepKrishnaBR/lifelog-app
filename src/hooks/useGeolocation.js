import { useState, useEffect } from "react";

const useGeolocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.warn("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          timestamp: new Date().toISOString(),
        });
      },
      (err) => {
        console.error("Error getting location", err);
      }
    );
  }, []);

  return location;
};

export default useGeolocation;
