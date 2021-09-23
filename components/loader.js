export const FullScreenLoader = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-80 z-50 flex justify-center items-center">
      <div>
        <div>
          <img className="mx-auto" src={"/loading.gif"} />
        </div>
        <div
          style={{ color: "#cf8dea" }}
          className="text-center tracking-widest font-bold"
        >
          LOADING
        </div>
      </div>
    </div>
  );
};
