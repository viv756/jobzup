import { NavLink, useLocation } from "react-router-dom";

import { JobCategories } from "../../../constant";

const SidebarFilter = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const currentCat = urlParams.get("category");

  function buildJobLink(params: Record<string, string | number | boolean>) {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    ).toString();

    const urlParams = new URLSearchParams(query);

    if (urlParams.has("keyword")) {
      urlParams.delete("keyword");
    }
    if (urlParams.has("page")) {
      urlParams.delete("page");
    }

    return `/jobs/all?${query}`;
  }

  return (
    <div className="bg-[#F5F7FF] max-h-screen min-w-[350px] rounded-xl p-8">
      <h1 className="text-3xl font-semibold mt-5">Categories</h1>

      <ul className="mt-6 flex flex-col gap-2">
        {JobCategories.map((cat) => (
          <NavLink
            key={cat}
            to={buildJobLink({ category: cat, page: 1 })}
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
