import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/useSelector";
import toast from "react-hot-toast";

import DashStats, { DashStatsSkelton } from "./_components/DashStats";
import RecentApplicants, { RecentApplicantsSkelton } from "./_components/RecentApplicants";
import { dashBoardApiFn } from "../../../../lib/api";
import type { Applicant } from "../../../../types/api.type";

type DashBoardStatsType = {
  totalApplicationReceived: string;
  totalPostedJobs: string;
};

const DashBoard = () => {
  const { currentUser } = useAppSelector((store) => store.user);

  const [loadng, setLoading] = useState<boolean>(false);
  const [recentApplicants, setRecentApplicants] = useState<Applicant[]>([]);
  const [dashBoradStats, setDashBoardStats] = useState<DashBoardStatsType>({
    totalApplicationReceived: "0",
    totalPostedJobs: "0",
  });

  useEffect(() => {
    setLoading(true);
    try {
      const fetchApplicants = async () => {
        const data = await dashBoardApiFn();
        if (data) {
          console.log(data);
          setRecentApplicants(data.recentApplicants);
          setDashBoardStats(data.stats);
          setLoading(false);
        }
      };
      fetchApplicants();
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <div className="h-30 flex items-center">
        <h1 className="text-3xl font-semibold">Welcome back!{currentUser?.name}</h1>
      </div>
      {loadng ? <DashStatsSkelton /> : <DashStats dashBoardStats={dashBoradStats} />}

      {loadng ? (
        <div className="mt-4">
          <RecentApplicantsSkelton />
        </div>
      ) : (
        <div className="mt-4">
          <RecentApplicants recentApplicants={recentApplicants} />
        </div>
      )}
    </>
  );
};

export default DashBoard;
