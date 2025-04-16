import useFetch from "../useHooks/useFetch";
import { sortPlacesByDistance } from "../util/loc";
import Card from "./Card";
import Error from "./Error";
import { useMemo } from "react";
import useLocation from "../useHooks/useLocation.jsx";

const CardList = () => {
  const location = useLocation();

  const { isLoading, error, places } = useFetch(location);

  // useFetch 보다 아래
  const sortedPlaces = useMemo(() => {
    if (!places) return places;
    return sortPlacesByDistance(places, location.latitude, location.longitude);
  }, [places, location.latitude, location.longitude]);
  console.log(location);

  if (isLoading) {
    return <div> Laoding ... 💫 </div>;
  }
  if (error) {
    return <Error />;
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <h1 className="p-4 text-xl font-bold text-center">📍 맛집리스트</h1>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-md w-full p-4">
          {sortedPlaces.map((place) => (
            <Card key={place.id} {...place} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;
