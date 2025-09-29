const HeroSection = () => {
  return (
    <div className=" relative flex justify-center mt-10">
      <img
        src="/icon1.svg"
        alt=""
        className="-z-10 w-16 hidden sm:block sm:absolute left-3 top-17 animate-zoom-in-out"
      />
      <img
        src="/icon2.svg"
        alt=""
        className="-z-10 w-10 hidden sm:block sm:absolute left-3 bottom-60 animate-zoom-in-out"
      />
      <img
        src="/icon3.svg"
        alt=""
        className="-z-10 w-10 hidden sm:block sm:absolute left-80 top-50 animate-zoom-in-out"
      />
      <img
        src="/icon4.svg"
        alt=""
        className="-z-10 w-16 hidden sm:block sm:absolute left-40 bottom-10 animate-zoom-in-out"
      />
      <img src="/home-girl.png" alt="" className="object-cover z-10" />
      <img
        src="/icon5.svg"
        alt=""
        className="-z-10 w-16 hidden sm:block sm:absolute right-3 top-17 animate-zoom-in-out"
      />
      <img
        src="/icon6.svg"
        alt=""
        className="-z-10 w-10 hidden sm:block sm:absolute right-80 top-50 animate-zoom-in-out"
      />
      <img
        src="/icon7.svg"
        alt=""
        className="-z-10 w-16 hidden sm:block sm:absolute right-30 bottom-60 animate-zoom-in-out"
      />
      <img
        src="/icon8.svg"
        alt=""
        className="-z-10 w-16 hidden sm:block sm:absolute right-70 bottom-10 animate-zoom-in-out"
      />
    </div>
  );
};

export default HeroSection;
