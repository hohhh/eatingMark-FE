// 내 위치(변수1)를 받아서 저장
// 저 함수 + 위도 경도 차이가 적은 순을 뽑는 새로운 함수를 만들어야됨.
// (유틸 폴더 새로 만들기.)
// 그걸 새로운 변수(2)=배열에 담아 정렬 시켜서
// 에러 발생 케이스와 함께 리턴
// 1. 사용자 위치가 승인 거부 됐을때 deny
// 2. 위치가 !available
// 3. 타임초과

function getCurrentLocation() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      return reject(new Error("실패"));
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        resolve({ latitude, longitude });
      },
      (error) => {
        let errorMessage = "위치 정보 실패입니다.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "위치 정보 조회를 거부했습니다.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "위치 정보 조회를 실패했습니다.";
            break;
          case error.TIMEOUT:
            errorMessage = "시간 초과";
            break;
        }
        resolve(new Error(errorMessage));
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

export default getCurrentLocation;
