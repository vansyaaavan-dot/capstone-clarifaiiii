function SplashScreen() {

  return (

    <div className="h-screen flex items-center justify-center bg-white">

      <div className="flex flex-col items-center">

        <h1 className="text-5xl font-bold text-blue-700 tracking-wide">
          ClarifAI
        </h1>

        <div className="mt-6 w-16 h-1 bg-blue-700 rounded-full animate-pulse"></div>

      </div>

    </div>

  );
}

export default SplashScreen;