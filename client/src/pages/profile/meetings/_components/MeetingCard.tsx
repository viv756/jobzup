import { format } from "date-fns";

import type { Meeting } from "../../../../types/api.type";
import { useAppSelector } from "../../../../hooks/useSelector";

type MeetingProps = {
  meeting: Meeting;
};

const MeetingCard = ({ meeting }: MeetingProps) => {
  const { currentUser } = useAppSelector((store) => store.user);

  const now = new Date();
  const meetingStart = new Date(meeting.scheduledAt);
  // check if meeting is ongoing or started
  const canJoin = currentUser && now >= meetingStart;
  console.log(canJoin);

  const isHost = currentUser?._id === meeting.recruiterId._id;

  return (
    <div className="border-blue-700 border rounded-xl  w-80 h-60 bg-white p-3">
      <h1 className="text-xl font-satoshi text-center mt-3 font-semibold">{meeting.title}</h1>
      <div className="font-dm flex flex-col gap-1 mt-4 ">
        <p>Host : {meeting.recruiterId.name} </p>
        <p>Job : {meeting.jobId.title}</p>
        <p>Time: {format(new Date(meeting.scheduledAt), "MMM dd, yyyy 'at' hh:mm a")}</p>
      </div>
      {canJoin ? (
        <button className="w-full rounded-lg border border-[#1844B5] bg-[#0851CA] px-3 py-2 mt-7 text-center text-md font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800 focus:bg-blue-800 disabled:bg-blue-900">
          {isHost ? "Start Now" : "Join"}
        </button>
      ) : (
        <button className="w-full rounded-lg border bg-gray-400 px-3 py-2 mt-7 text-center text-md font-medium text-white shadow-sm transition-all font-dm ">
          {isHost ? "Start Now" : "Join"}
        </button>
      )}
    </div>
  );
};

export default MeetingCard;
