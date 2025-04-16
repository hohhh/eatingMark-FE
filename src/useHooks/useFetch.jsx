import { useEffect, useState } from "react";
import { fetchPlaces } from "../api/placesAPI";

function useFetch(location) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // false?
  const [error, setError] = useState(null); // null ?

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPlaces();
        console.log("확인:", data.places); // 구조 확인용
        setPlaces(data.places);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return { isLoading, error, places };
}

export default useFetch;
