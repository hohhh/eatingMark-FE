import axios from "axios";

export const BASE_URL = "http://localhost:3000";
// API 서버 주소 : 고정 상수로 관리
// 정의할때 함수앞에 async, 호출할 때 await

// 전체 맛집 목록 조회 (데이터 불러오기)
export const fetchPlaces = async () => {
  /* aixos */
  try {
    const res = await axios.get(`${BASE_URL}/places`);
    // return res.data;
    // console.log("성공:", res.data);
  } catch (err) {
    console.log("에러 발생:", err.message);
  }
  /* fetch */
  /*   try {
    const res = await fetch(`${BASE_URL}/places`);
    // 서버에 GET 요청

    if (!res.ok) {
      throw new Error(`서버 오류: ${res.status}`);
    }
    // 서버 응답 상태코드 확인
    // 응답 코드 200 아니면 에러 (예외 강제 발생)
    // 이 에러는 catch문으로 떨어짐

    const data = await res.json();
    console.log("성공:", data);
    // 응답 본문을 JS 객체로 변환

    return data;
    // 호출한 컴포넌트로 반환
  } catch (err) {
    console.error("에러 발생:", err.message);
    // 오류 발생 시 디버깅용 로그
    // (나중에 UI에서 메세지로 쓸 수도 있음)

    throw err;
    // 에러를 다시 던져서 호출한 쪽에서도 에러 인식할 수 있도록
    // 상위에서 처리 가능하게
  } finally {
    console.log("요청 종료");
  } */
};

// 찜한 맛집 목록 조회
export const fetchLikedPlaces = async () => {
  /* axios */
  try {
    const res = await axios.get(`${BASE_URL}/users/places`);
    return res.data;
    // console.log("성공:", res.data);
  } catch (err) {
    console.log("에러 발생:", err.message);
  }

  /* fetch */
  /*   try {
    const res = await fetch(`${BASE_URL}/users/places`);
    // 서버에 GET 요청

    if (!res.ok) {
      throw new Error(`서버 오류: ${res.status}`);
    }
    // 서버 응답 상태코드 확인
    // 응답 코드 200 아니면 에러 (예외 강제 발생)
    // 이 에러는 catch문으로 떨어짐

    const data = await res.json();
    console.log("성공:", data);
    // 응답 본문을 JS 객체로 변환

    return data;
    // 호출한 컴포넌트로 반환
  } catch (err) {
    console.error("에러 발생:", err.message);
    // 오류 발생 시 디버깅용 로그
    // (나중에 UI에서 메세지로 쓸 수도 있음)

    throw err;
    // 에러를 다시 던져서 호출한 쪽에서도 에러 인식할 수 있도록
    // 상위에서 처리 가능하게
  } finally {
    console.log("요청 종료");
  } */
};

// 찜 추가
export const postLikedPlace = async (place) => {
  /* axios */
  try {
    const place = { place };
    const res = await axios.post(`${BASE_URL}/users/places`, place);
    return res.data;
  } catch (err) {
    console.log(`찜 추가 실패: ${err.status}`);
  }
  /* fetch */
  /*  const res = await fetch(`${BASE_URL}/users/places`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // ✅ 요거 없으면 서버는 undefined 받음
    },
    body: JSON.stringify({ place }),
  });

  if (!res.ok) {
    throw new Error(`찜 추가 실패: ${res.status}`);
  }

  return await res.json(); // ✅ 성공하면 response 받아서 넘겨줘야 이후 로직에서 사용 가능 */
};

// 찜 삭제
export const deleteLikedPlace = async (id) => {
  /* axios */
  try {
    const res = await axios.delete(`${BASE_URL}/users/places/${id}`);
  } catch (err) {
    console.log(`찜 삭제 실패: ${err.status}`);
  }
  /* fetch */
  /*   const res = await fetch(`${BASE_URL}/users/places/${id}`, {
    method: "DELETE",
    body: JSON.stringify(id),
  });

  if (!res.ok) {
    throw new Error(`찜 삭제 실패: ${res.status}`);
  } */
};

// try-catch 쓸 때
// fetch() → JSON 변환 → 에러 처리 포함
// fetch()로 요청 보냄
// res.ok로 응답 상태 체크
// .json()으로 변환
// 데이터 리턴
// (에러 대비) try-catch 구조로 감싸기
// 에러 메시지 출력 + throw로 다시 넘기기

/* export const fetchPlaces = async () => {
  const res = await fetch(`${BASE_URL}/places`);
  // 서버에 GET 요청 보내기
  const data = await res.json();
  // 응답 받은 데이터 JSON으로 바꾸기
  return data;
  // 컴포넌트에서 사용할 수 있도록 반환
}; */

// 백엔드에서 places.json 데이터 받아오는 비동기 함수

// 비동기 함수는 데이터가 객체가 전부다 **promoise 형태**
// -> 바로 쓸 수 없다 -> **json으로 변환** 필요
// "*.json()" json형태로 변환
// console.log(데이터)
// 객체형태이므로 데이터.키값 으로 조회가능

// fetch data를 불러올 때는 state를 만드는 이유 :
// 업데이트가 반드시 일어나므로, 세트라고 생각하면 된다.

// 컴포넌트가 처음 마운트 될 때 데이터가
// 로드 돼야하므로 useEffect + 빈배열 안에 !

// 데이터를 요청할 때를 기준으로
// 찜 : 찜버튼을 onClick 했을 때
// 리스트 : 전체 데이터
