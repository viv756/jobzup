import { ShieldUser } from "lucide-react";
import { SquareCheckBig } from "lucide-react";
import { Headset } from "lucide-react";
import { DollarSign } from "lucide-react";
import { type LucideIcon } from "lucide-react";

type DashCardPropsTpe = {
  title: string;
  icon: LucideIcon;
  content: string;
  color: string;
};

type DashBoardStatsType = {
  totalPostedJobs: string;
  totalApplicationReceived: string;
  // add more fields if needed
};

type DashStatsProps = {
  dashBoardStats: DashBoardStatsType;
};

export const DashCard = ({ title, icon: Icon, content, color }: DashCardPropsTpe) => {
  return (
    <div className="sm:w-70 bg-white h-30 rounded-md p-4 pt-6 ">
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-800 font-dm">{title}</p>
        <div style={{ backgroundColor: color }} className="p-1 rounded-md">
          <Icon color="white" />
        </div>
      </div>
      <p className="text-4xl font-semibold font-satoshi mt-3">{content}</p>
    </div>
  );
};

export const DashStatsSkelton = () => {
  return (
    <div className="flex sm:flex-row flex-col gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div className="sm:w-70 bg-white h-30 rounded-md p-4 pt-6" key={i}>
          <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div className="skeleton h-4 w-40"></div>
              <div className="skeleton h-6 w-6   "></div>
            </div>
            <div className="skeleton h-4 w-10"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

const DashStats = ({ dashBoardStats }: DashStatsProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-6">
      <DashCard
        title="POSTED JOBS"
        icon={SquareCheckBig}
        content={dashBoardStats.totalPostedJobs}
        color="#FF585C"
      />
      <DashCard
        title="APPLICATION RECEIVED"
        icon={ShieldUser}
        content={dashBoardStats.totalApplicationReceived}
        color="#7744A7"
      />
      <DashCard title="UPCOMING MEETINGS" icon={Headset} content="15" color="#3AB446" />
      <DashCard title="CREDITS REMAINING" icon={DollarSign} content="100" color="#FFC402" />
    </div>
  );
};

export default DashStats;
