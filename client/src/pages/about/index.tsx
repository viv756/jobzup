const About = () => {
  
  return (
    <div>
      <div className="relative">
        <div className="flex flex-col  items-center mt-24">
          <h1 className="text-6xl font-satoshi font-bold">
            Learn more <span className="text-[#2454CE]">about us</span>
          </h1>
          <p className="max-w-4xl text-center mt-4 font-dm text-md">
            A journey of discovery as you learn more about us our values, mission, and the passion
            that drives our commitment to excellence and innovation in every aspect of our services.
          </p>
        </div>
        <img
          src="/icon1.svg"
          alt=""
          className="-z-10 w-16 hidden sm:absolute left-3 top-1 animate-zoom-in-out"
        />
         <img
        src="/icon8.svg"
        alt=""
        className="-z-10 w-16 hidden sm:absolute right-1 top-1 animate-zoom-in-out"
      />
      </div>
      <div className="flex justify-center mt-5 ">
        <button className="p-2 bg-[#1844B5] text-white rounded-2xl px-6 font-dm " >Learn more</button>
      </div>
    </div>
  );
};

export default About;
