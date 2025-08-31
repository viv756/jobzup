import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchJobs = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("keyword", searchKey);
    const searchTerm = urlParams.toString();
    navigate(`/jobs/all?${searchTerm}`);
  }, [searchKey]);

  return (
    <div className="bg-[#F5F7FF] w-full">
      <input
        className="w-full h-10 rounded-md border pl-4 border-blue-900 focus:outline-none "
        type="text"
        value={searchKey}
        placeholder="Search..."
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </div>
  );
};

export default SearchJobs;
