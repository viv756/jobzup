
const CreateJob = () => {
  
  return (
    <div className="bg-gray3 max-w-[800px] p-10">
      <h1 className="text-2xl font-gray3 font-semibold font-roboto">Job Details</h1>
      <form action="" className="flex  flex-col gap-3 mt-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Your Email
          </label>
          <input
            type="text"
            name=""
            id=""
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Job Title
          </label>
          <input
            type="text"
            name=""
            id=""
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-[18px] text-gray-400">
            Location
          </label>
          <input
            type="text"
            name=""
            id=""
            className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
          />
        </div>
        <div className="flex flex-col gap-3">
          <label htmlFor="">Remote Position (optional)</label>
          <input type="checkbox" className="checkbox checkbox-primary" />
        </div>

        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Job Type
            </label>
            <select
              name=""
              id=""
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white">
              <option value="" className="">
                Fulltime
              </option>
              <option value="">Fulltime</option>
              <option value="">Fulltime</option>
              <option value="">Fulltime</option>
            </select>
          </div>

          <div className="flex flex-col w-full gap-2">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Job salary
            </label>
            <input
              type="number"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Job Experiance
            </label>
            <input
              type="text"
              name=""
              id=""
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Job Qualification
            </label>
            <input
              type="text"
              name=""
              id=""
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <label htmlFor="" className="text-[18px] text-gray-400">
          Job Category
        </label>
        <input
          type="text"
          className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
        />

        <label htmlFor="" className="text-[18px] text-gray-400">
          Description
        </label>
        <textarea
          name=""
          id=""
          className="w-full bg-white outline-none border border-gray-500 rounded-2xl h-60 p-4"></textarea>

        <p className=" text-2xl text-black font-semibold font-roboto mt-10">Company Details</p>
        <label htmlFor="" className="text-[18px] text-gray-400">
          Company Name
        </label>
        <input
          type="text"
          className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
        />

        <div className="flex w-full gap-4">
          <div className="flex flex-col w-full ">
            <label htmlFor="" className="text-[18px] text-gray-400">
              Company Email
            </label>
            <input
              type="email"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor=" " className="text-[18px] text-gray-400">
              Company Location
            </label>
            <input
              type="text"
              className="p-3 rounded-2xl outline-none border border-gray-500 bg-white"
            />
          </div>
        </div>

        <label htmlFor="" className="text-[18px] text-gray-400">
          Company Description
        </label>
        <textarea
          name=""
          id=""
          className="w-full bg-white outline-none border border-gray-500 rounded-2xl h-60 p-4"></textarea>
      </form>
    </div>
  );
};

export default CreateJob
