function Error() {
  return (
    <div className="flex justify-center flex-col items-center w-full h-screen">
      <h1 className="text-3xl font-bold">⚠️ Error 404</h1>
      <p className="text-xl mt-4">요청하신 데이터를 찾을 수 없습니다.</p>
    </div>
  );
}

export default Error;
