import { Tooltip, Area, XAxis } from "recharts";
import React, { useEffect, useState, Suspense } from "react";
import { MdOutlineTaskAlt } from "react-icons/md";
import CustomTooltip from "../custome/CustomTooltip"; 
import { countTotal } from "@/utils/functions";
import { CountByDay } from "@/constants/types";
import { apiRequest } from "@/services/api/commonRequest";

const AreaChart = React.lazy(() =>
  import("recharts").then((recharts) => ({ default: recharts.AreaChart }))
);

const TaskCompleteChart = () => {
  const [data, setData] = useState<CountByDay[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_PROJECT_URL,
        route: `/api/v1/task/count`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.success) {
        setData(res.data.taskCompleted);
      }
    };
    fetchData();

  }, []);

  return (
    <div className="chart-box-parent">
      <div className="chart-box-header">
        <div className="chart-box-icon">
          <MdOutlineTaskAlt size={18}/>
        </div>
        <p>Task Completed</p>
      </div>
      {data && data.length > 0 ? (
        <Suspense fallback={<div>Loading chart...</div>}>
          <div className="chart-box-content">
            <AreaChart width={230} height={100} data={data}>
              <XAxis axisLine={false} tickLine={false} dataKey="date" tick={false} />
              <defs>
  <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor="hsl(270,100%,50.2%)" stopOpacity={0.2} />
    <stop offset="70%" stopColor="hsl(270,100%,50.2%)" stopOpacity={0} />
  </linearGradient>
</defs>
<Area
  type="monotone"
  dataKey="count"
  stroke="hsl(270,100%,50.2%)"
  fill="url(#colorCompleted)"
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

export default TaskCompleteChart;

