import React, { useState } from "react";
import toast from "react-hot-toast";

import { updateApplicationStatusApiFn } from "../../../../../lib/api";

const Select = ({
  applicationId,
  initialStatus,
}: {
  applicationId: string;
  initialStatus: string;
}) => {
  const [status, setStatus] = useState<string>(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatus(newStatus);
    setLoading(true);

    try {
      const data = await updateApplicationStatusApiFn(applicationId, newStatus);
      if (data) {
        setStatus(data.application.status);
        toast.success("Application status changed")
      }
      setLoading(false);
    } catch (error: any) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <select
      disabled={loading}
      onChange={handleChange}
      value={status}
      className="block  rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700  text-center appearance-none">
      <option disabled value="APPLIED">
        PENDING
      </option>
      <option value="UNDER_REVIEW">UNDER_REVIEW</option>
      <option value="SHORTLISTED">SHORTLISTED</option>
      <option value="INTERVIEW_SCHEDULED">INTERVIEW SCHEDULED</option>
    </select>
  );
};

export default Select;
