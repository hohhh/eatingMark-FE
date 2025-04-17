import useFetch from "../useHooks/useFetch";
import { sortPlacesByDistance } from "../util/loc";
import Card from "./Card";
import Error from "./Error";
import { useEffect, useMemo, useState } from "react";
import useLocation from "../useHooks/useLocation.jsx";
import {
  postLikedPlace,
  deleteLikedPlace,
  fetchLikedPlaces,
} from "../api/placesAPI";

const CardList = () => {
  const location = useLocation();
  const { isLoading, error, places } = useFetch(location);
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [showLikedOnly, setShowLikedOnly] = useState(false);

  function handleClickShowLikedOnly() {
    setShowLikedOnly(!showLikedOnly);
    getLikedPlaces();
  }

  const sortedPlaces = useMemo(() => {
    if (!places) return [];
    return sortPlacesByDistance(places, location.latitude, location.longitude);
  }, [places, location.latitude, location.longitude]);

  const toggleLike = async (place) => {
    try {
      // const alreadyLiked = likedPlaces.find((liked) => liked.id === place.id);
      // if (alreadyLiked) {
      //   // await deleteLikedPlace(place.id);
      // } else {
      console.log(place);
      await postLikedPlace(place);
      // }
    } catch (err) {
      console.error("찜 토글 실패:", err.message);
    }
  };

  const getLikedPlaces = async () => {
    const data = await fetchLikedPlaces();
    setLikedPlaces(data.places);
    console.log(data);
  };

  useEffect(() => {
    getLikedPlaces();
  }, []);

  const displayPlaces = useMemo(() => {
    return showLikedOnly ? likedPlaces : sortedPlaces;
  }, [showLikedOnly, likedPlaces, sortedPlaces]);

  if (isLoading) return <div>Loading ... 💫</div>;
  if (error) return <Error />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* 타이틀 + 버튼 좌우 정렬 ✅ */}
      <div className="flex justify-between items-center max-w-screen-md mx-auto px-4 py-6">
        <h1 className="text-xl font-bold">📍 맛집리스트</h1>
        <button
          onClick={handleClickShowLikedOnly}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
        >
          {showLikedOnly ? "전체 보기" : "찜한 맛집만 보기"}
        </button>
      </div>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-md w-full p-4">
          {displayPlaces.map((place) => (
            <Card
              key={place.id}
              place={place}
              toggleLike={toggleLike}
              likedPlaces={likedPlaces}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardList;

// navigator.geolocation.getCurrentPosition((position) => {
//   const latitude = position.coords.latitude;
//   const longitude = position.coords.longitude;
//   const sortedArr = sortPlacesByDistance(places, latitude, longitude);
//   >> 변수에 함수(자체가 배열을 정렬해서 반환하는 함수)의 리턴값 저장
//   setSortedPlaces(sortedArr);
//   >> 업데이트
//   >> 맵을 돌릴 때는 state에 선언된
// });
