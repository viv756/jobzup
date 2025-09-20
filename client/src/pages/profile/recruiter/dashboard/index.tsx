import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../hooks/useSelector";
import toast from "react-hot-toast";

import DashStats, { DashStatsSkelton } from "./_components/DashStats";
import RecentApplicants, { RecentApplicantsSkelton } from "./_components/RecentApplicants";
import { dashBoardApiFn } from "../../../../lib/api";
import type { Applicant, JobStats } from "../../../../types/api.type";
import DashChart from "./_components/DashChart";

type DashBoardStatsType = {
  totalApplicationReceived: string;
  totalPostedJobs: string;
};

const DashBoard = () => {
  const { currentUser } = useAppSelector((store) => store.user);

  const [loading, setLoading] = useState<boolean>(false);
  const [recentApplicants, setRecentApplicants] = useState<Applicant[]>([]);
  const [dashBoardStats, setDashBoardStats] = useState<DashBoardStatsType>({
    totalApplicationReceived: "0",
    totalPostedJobs: "0",
  });
  const [dashChartData, setDashChartData] = useState<JobStats[]>([]);

  useEffect(() => {
    setLoading(true);
    try {
      const fetchApplicants = async () => {
        const data = await dashBoardApiFn();
        if (data) {
          setRecentApplicants(data.recentApplicants);
          setDashBoardStats(data.stats);
          setDashChartData(data.jobApplicationStats);
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
    <div className="min-h-screen">
      <div className="h-30 flex items-center">
        <h1 className="text-3xl font-semibold">Welcome back!{currentUser?.name}</h1>
      </div>
      {loading ? <DashStatsSkelton /> : <DashStats dashBoardStats={dashBoardStats} />}

      <div className="flex sm:flex-row flex-col justify-between mt-4 gap-4">
        <div className="w-full min-h-[500px]"> 
          <DashChart data={dashChartData} />
        </div>
        <div>
          {loading ? (
            <div className="">
              <RecentApplicantsSkelton />
            </div>
          ) : (
            <div className="">
              <RecentApplicants recentApplicants={recentApplicants} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
