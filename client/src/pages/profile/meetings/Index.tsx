import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MeetingCard from "./_components/MeetingCard";
import type { Meeting } from "../../../types/api.type";
import { getMeetingsApiFn } from "../../../lib/api";

const Meetings = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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
    <div className="flex gap-16 flex-wrap pt-9">
      {meetings.map((meeting) => (
        <MeetingCard meeting={meeting} />
      ))}
    </div>
  );
};

export default Meetings;
