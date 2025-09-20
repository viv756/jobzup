import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { JobStats } from "../../../../../types/api.type";

const DashChart = ({ data }: { data: JobStats[] }) => {
  return (
    <div className="w-full h-120 sm:h-full bg-white rounded-t-md  p-4 ">
      <h2 className="text-lg font-semibold mb-4">Applicants per Job</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="jobTitle"
            interval={0}
            tick={{ fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={50}
            tickFormatter={(value) => (value.length > 8 ? value.slice(0, 8) + "…" : value)}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="applicantsCount" fill="#1844B5" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashChart;
