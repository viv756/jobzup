import { NavLink, useLocation } from "react-router-dom";

import { JobCategories } from "../../../constant";

const SidebarFilter = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentCat = params.get("category");

  return (
    <div className="bg-[#F5F7FF] min-h-screen min-w-[350px] rounded-xl p-8">
      <h1 className="text-3xl font-semibold mt-5">Categories</h1>

      <ul className="mt-6 flex flex-col gap-2">
        {JobCategories.map((cat) => (
          <NavLink
            key={cat}
            to={`/jobs/all?category=${cat}`}
            className={() =>
              `rounded-xl p-2 text-xl pl-7 ${
                currentCat === cat
                  ? "bg-[#F5F7FF] outline-blue-900 outline"
                  : "bg-[#C0E2D5] hover:bg-[#F5F7FF] hover:outline-blue-900 hover:outline"
              }`
            }>
            <li>{cat}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SidebarFilter;
