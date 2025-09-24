import FindYourFavoriteJob from "./_components/FindYourFavoriteJob";
import HeroSection from "./_components/HeroSection";

const LandingPage = () => {
  return (
    <div className=" ">
      <div className="relative">
        <div className="z-10 w-[900px] flex flex-col justify-center items-center mx-auto mt-20 gap-2">
          <div className="border border-[#6291E1] flex items-center font-dm  text-lg rounded-3xl h-10 p-2 w-90 pl-9 bg-[#F5F7FF]">
            <p className="text-center border-r-1 border-[#6291E1] pr-3">The best job seeker</p>
            <span className="text-center text-[#2453CC] pl-3">Explore now</span>
          </div>
          <div className="w-full text-center">
            <h1 className="text-[70px] font-satoshi font-bold leading-20">
              Find jobs that match your
              <br />
              <span className="text-[70px] font-satoshi font-bold  text-center text-[#3163E6] ">
                ‍preferences
              </span>
            </h1>
          </div>
          <p className="text-[#A4A4A5] text-md text-center mt-3">
            Discover a personalized job search experience where every listing matches your
            preferences, providing a tailored platform that streamlines your journey to finding the
            perfect job.
          </p>
        </div>
        <div className="w-40 h-40 rounded-full bg-[#C5D3D7] absolute right-8 top-1 blur-2xl"></div>
        <div className="w-80 h-80  bg-[#C5D3D7] absolute top-6 blur-3xl -z-10"></div>
      </div>
      <HeroSection />
      <FindYourFavoriteJob />
    </div>
  );
};

export default LandingPage;
