export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-50">
      <div className="w-24 h-24 md:w-32 md:h-32 animate-pulse">
        <img
          src="/loadingpage.jpeg"
          alt="PumpTok Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <h1 className="text-white text-2xl mt-4 font-bold">PumpTok</h1>
    </div>
  )
}

