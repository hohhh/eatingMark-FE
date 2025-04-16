import { useState, useEffect } from "react";
import getCurrentLocation from "../util/getLocation";

function useLocation() {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });

  useEffect(() => {
    const getLoaction = async () => {
      try {
        const response = await getCurrentLocation();
        setLocation({
          latitude: response.latitude,
          longitude: response.longitude,
        });
        console.log(response);
      } catch (e) {
        console.log(e);
      }
    };
    getLoaction();
  }, []);

  return location;
}

// useLocation 만들어서 (try, catch, finally)
// 경도, 위도 초기값 0, 0

// useMemo ?
// 렌딩 확인

export default useLocation;
