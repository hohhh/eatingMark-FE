import { useEffect, useState } from "react";
import { fetchPlaces } from "../api/placesAPI";
function useFetch() {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
