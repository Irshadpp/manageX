import React, { useEffect, useState, Suspense } from "react";
import { BiTask } from "react-icons/bi";
import { XAxis, Tooltip, Area, ResponsiveContainer } from "recharts";
import { CountByDay } from "@/constants/types";
import { countTotal } from "@/utils/functions";
import CustomTooltip from "../custome/CustomTooltip";
import { apiRequest } from "@/services/api/commonRequest";

const AreaChart = React.lazy(() =>
  import("recharts").then((recharts) => ({ default: recharts.AreaChart }))
);

const NewTaskChart = () => {
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
        setData(res.data.newTask);
      }
    };
    fetchData();
  }, []);
  
  return (
    <div className="chart-box-parent">
      <div className="chart-box-header">
        <div className="chart-box-icon">
          <BiTask />
        </div>
        <p>New Task</p>
      </div>
      {data && data.length > 0 ? (
        <Suspense fallback={<div>Loading chart...</div>}>
          <div className="chart-box-content">
            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={data}>
                <XAxis
                  axisLine={false}
                  tickLine={false}
                  dataKey="date"
                  tick={false}
                />
                <defs>
                  <linearGradient id="colorNewTask" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(30,80%,55%)"
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="70%"
                      stopColor="hsl(30,80%,55%)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="count"
                  stroke="hsl(30,80%,55%)"
                  fill="url(#colorNewTask)"
                  dot={false}
                  strokeWidth={3}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                />
              </AreaChart>
            </ResponsiveContainer>
            <div className="text-xs">
              <p>{countTotal(data)}+ more</p>
              <p>from last month</p>
            </div>
          </div>
        </Suspense>
      ) : (
        <div className="flex items-center justify-center h-24">
          <p>No data to show Yet!</p>
        </div>
      )}
    </div>
  );
};

export default NewTaskChart;
