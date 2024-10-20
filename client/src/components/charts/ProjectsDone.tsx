import { Tooltip, Area, XAxis } from "recharts";
import React, { useEffect, useState, Suspense } from "react";
import { CountByDay } from "@/constants/types"; // Adjust the path as needed
import { GrProjects } from "react-icons/gr";
import CustomTooltip from "../custome/CustomTooltip"; // Adjust the path as needed
import { countTotal } from "@/utils/functions"; // Adjust the path as needed
import { apiRequest } from "@/services/api/commonRequest";

// Lazy load AreaChart for code splitting
const AreaChart = React.lazy(() =>
  import("recharts").then((recharts) => ({ default: recharts.AreaChart }))
);

const ProjectsDone = () => {
  const [data, setData] = useState<CountByDay[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_BACKEND_URL,
        route: `/api/v1/project/count`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.success) {
        setData(res.data);
      }
    };
    fetchData();

  }, []);

  console.log(data)

  return (
    <div className="chart-box-parent" suppressHydrationWarning>
      <div className="chart-box-header">
        <div className="chart-box-icon">
          <GrProjects />
        </div>
        <p>Projects Done</p>
      </div>
      {data && data.length > 0 ? (
        <Suspense fallback={<div>Loading chart...</div>}>
          <div className="chart-box-content">
            <AreaChart width={230} height={100} data={data}>
              <XAxis axisLine={false} tickLine={false} dataKey="date" tick={false} />
              <defs>
  <linearGradient id="colorProjectDone" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="hsl(160,60%,45%)" stopOpacity={0.2} />
    <stop offset="70%" stopColor="hsl(160,60%,45%)" stopOpacity={0} />
  </linearGradient>
</defs>
<Area
  type="monotone"
  dataKey="count"
  stroke="hsl(160,60%,45%)"
  fill="url(#colorProjectDone)"
  dot={false}
  strokeWidth={3}
/>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
            </AreaChart>
            <div className="text-xs">
              <p>{countTotal(data)}+ more</p>
              <p>from last month</p>
            </div>
          </div>
        </Suspense>
      ) : (
        <div className="flex items-center justify-center h-24">
          <p>No data to show yet!</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsDone;

