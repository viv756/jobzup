import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { Video } from "lucide-react";

import type { Meeting } from "../../../types/api.type";
import { getMeetingsApiFn } from "../../../lib/api";
import { useAppSelector } from "../../../hooks/useSelector";

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { currentUser } = useAppSelector((store) => store.user);

  useEffect(() => {
    const fetchMeetings = async () => {
      setLoading(true);
      try {
        const data = await getMeetingsApiFn();
        if (data) {
          setMeetings(data.meetings);
        }
        setLoading(false);
      } catch (error: any) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  if (loading) {
    return <div>loading</div>;
  }

  return (
    <>
      <div className="flex gap-16 flex-wrap pt-9">
        {meetings.map((meeting) => {
          // const canJoin = currentUser && now >= meetingStart;
          const canJoin = true;
          const isHost = currentUser?._id === meeting.recruiterId._id;

          return (
            <div
              className="border-blue-700 border rounded-xl  w-80 h-60 bg-white p-3"
              key={meeting._id}>
              <h1 className="text-xl font-satoshi text-center mt-3 font-semibold flex gap-8 capitalize items-center">
                <Video color="#1844B5" size={40} /> {meeting.title}
              </h1>
              <div className="font-dm flex flex-col gap-1 mt-4 ">
                <p>Host : {meeting.recruiterId.name} </p>
                <p>Job : {meeting.jobId.title}</p>
                <p>Time: {format(new Date(meeting.scheduledAt), "MMM dd, yyyy 'at' hh:mm a")}</p>
              </div>
              {canJoin ? (
                <Link to={`/meetings/room/${meeting.joinToken}`}>
                  <button className="w-full rounded-lg border border-[#1844B5] bg-[#0851CA] px-3 py-2 mt-7 text-center text-md font-medium text-white shadow-sm transition-all font-dm hover:bg-blue-800 focus:bg-blue-800 disabled:bg-blue-900">
                    {isHost ? "Start Now" : "Join"}
                  </button>
                </Link>
              ) : (
                <button className="w-full rounded-lg border bg-gray-400 px-3 py-2 mt-7 text-center text-md font-medium text-white shadow-sm transition-all font-dm ">
                  {isHost ? "Start Now" : "Join"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Meetings;
