import { useAppSelector } from "../../../../hooks/useSelector";

import DashCard from "./_components/Dash_Card";
import RecentApplicants from "./_components/RecentApplicants";

const DashBoard = () => {
  const { currentUser } = useAppSelector((store) => store.user);

  return (
    <>
      <div className="h-30 flex items-center">
        <h1 className="text-3xl font-semibold">Welcome back!{currentUser?.name}</h1>
      </div>
      <div className="flex gap-6">
        <DashCard />
        <DashCard />
        <DashCard />
        <DashCard />
      </div>
      <div className="mt-4">
        <RecentApplicants />
      </div>
    </>
  );
};

export default DashBoard;
