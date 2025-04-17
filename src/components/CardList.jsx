import { useState, useEffect, useMemo } from "react";
import useFetch from "../useHooks/useFetch";
import useLocation from "../useHooks/useLocation";
import { sortPlacesByDistance } from "../util/loc";
import { postLikedPlace, deleteLikedPlace } from "../api/placesAPI";
import Card from "./Card";
import Error from "./Error";
import toast from "react-hot-toast";

const CardList = () => {
  const location = useLocation();
  const { isLoading, error, places } = useFetch(location);

  const [likedPlaces, setLikedPlaces] = useState([]); // 찜 목록
  const [showLikedOnly, setShowLikedOnly] = useState(false); // 필터 여부

  const sortedPlaces = useMemo(() => {
    if (!places) return [];
    return sortPlacesByDistance(places, location.latitude, location.longitude);
  }, [places, location.latitude, location.longitude]);

  const displayPlaces = showLikedOnly ? likedPlaces : sortedPlaces;

  const toggleLike = async (place) => {
    const alreadyLiked = likedPlaces.some((p) => p.id === place.id);

    if (alreadyLiked) {
      await deleteLikedPlace(place.id); // API 호출
      setLikedPlaces((prev) => prev.filter((p) => p.id !== place.id));
      toast.success("찜한 맛집에 추가됐습니다!");
    } else {
      await postLikedPlace(place); // API 호출
      setLikedPlaces((prev) => [...prev, place]);
      toast.error("찜한 맛집에서 제거됐습니다.");
    }
  };

  if (isLoading) return <div>Loading... 💫</div>;
  if (error) return <Error />;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="flex justify-between items-center max-w-screen-md mx-auto px-4 py-6">
        <h1 className="text-xl font-bold">📍 맛집리스트</h1>
        <button
          onClick={() => setShowLikedOnly((prev) => !prev)}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
        >
          {showLikedOnly ? "전체 보기" : "찜한 맛집만 보기"}
        </button>
      </div>

      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-screen-md w-full p-4">
          {displayPlaces.length > 0 ? (
            displayPlaces.map((place) => (
              <Card
                key={place.id}
                place={place}
                toggleLike={toggleLike}
                likedPlaces={likedPlaces}
              />
            ))
          ) : showLikedOnly ? (
            <div className="text-center text-gray-400 col-span-3 py-10">
              😢 찜한 맛집이 없습니다
            </div>
          ) : null}
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
