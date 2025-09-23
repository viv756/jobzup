import React, { useState } from "react";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";

import { createMeetingApiFn } from "../../../../../lib/api";
import { useAppSelector } from "../../../../../hooks/useSelector";

type CreateMeetingProps = {
  applicantId: string;
  jobId: string;
  onClose: () => void;
};

const CreateMeeting = ({ applicantId, jobId, onClose }: CreateMeetingProps) => {
  const { currentUser } = useAppSelector((store) => store.user);
  const [title, setTitle] = useState<string>("");
  const [scheduledAt, setScheduledAt] = useState<Date | null>();
  const [durationInMinutes, setDurationInMinutes] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      title,
      scheduledAt: scheduledAt,
      durationInMinutes: Number(durationInMinutes),
      jobId,
    };
    const recruiterId = currentUser?._id as string;

    try {
      const data = await createMeetingApiFn(recruiterId, applicantId, payload);
      if (data) {
        console.log(data);
        toast.success(data.message);
      }
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-[400px] mx-auto mt-10">
      <h1 className="text-xl font-semibold text-center">Create Meeting</h1>
      <form className="flex flex-col gap-4 mt-6 w-full" onSubmit={onSubmit}>
        <label className="flex flex-col gap-1">
          <span className="font-medium text-sm ">Meeting Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
            className="w-full p-3 rounded-md border border-[#1844B5] outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-medium text-sm">Duration (minutes)</span>
          <input
            type="number"
            value={durationInMinutes}
            onChange={(e) => setDurationInMinutes(e.target.value)}
            placeholder="Duration (minutes)"
            min={15}
            max={180}
            className="w-full p-3 rounded-md border border-[#1844B5] outline-none"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="font-medium text-sm">Scheduled Date & Time</span>
          <DatePicker
            selected={scheduledAt}
            onChange={(date: Date | null) => setScheduledAt(date)}
            showTimeSelect
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            placeholderText="Select date & time"
            className="w-full p-3 rounded-md border border-[#1844B5] outline-none"
          />
        </label>

        <button className="mt-4 w-full bg-[#1844B5] text-white p-3 rounded-md">
          Create Meeting
        </button>
      </form>
    </div>
  );
};

export default CreateMeeting;
