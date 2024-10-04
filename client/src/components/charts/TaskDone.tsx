import React, { useEffect, useState, Suspense } from "react";
import { Tooltip, Area, XAxis, YAxis, ResponsiveContainer } from "recharts";
import CustomTooltip from "../custome/CustomTooltip";
import { apiRequest } from "@/services/api/commonRequest";

const AreaChart = React.lazy(() => import("recharts").then((recharts) => ({ default: recharts.AreaChart })));

const TaskDone = () => {
  const [interval, setInterval] = useState("daily");
  const [data, setData] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiRequest({
        method: "GET",
        url: import.meta.env.VITE_PROJECT_URL,
        route: `/api/v1/task/done?interval=${interval}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.success) {
        setData(res.data);
      }
    };
    fetchData();
  }, [interval]);

  return (
    <div className="w-full h-[65vh] bg-muted/50 rounded-md shadow-lg p-3 mt-5">
      <div className="flex items-center justify-between gap-2 p-2 border-b mb-2">
        <h1 className="text-xl font-bold">Task Done</h1>
        <div className="flex gap-4">
          <p
            className={`hover:underline cursor-pointer ${interval === "daily" && "underline"}`}
            onClick={() => setInterval("daily")}
          >
            Daily
          </p>
          <p
            className={`hover:underline cursor-pointer ${interval === "weekly" && "underline"}`}
            onClick={() => setInterval("weekly")}
          >
            Weekly
          </p>
          <p
            className={`hover:underline cursor-pointer ${interval === "monthly" && "underline"}`}
            onClick={() => setInterval("monthly")}
          >
            Monthly
          </p>
        </div>
      </div>

      {data && data.length > 0 ? (
        <Suspense fallback={<div>Loading chart...</div>}>
          <ResponsiveContainer width={"95%"} height={400}>
            <AreaChart data={data} className="w-full">
              <XAxis axisLine={false} tickLine={false} domain={["auto", "auto"]} dataKey="date" />
              <YAxis axisLine={false} tickLine={false} domain={["auto", "auto"]} />
              <Area type="monotone" dataKey="completed" stroke="hsl(270,100%,50.2%)" fill="url(#colorCompleted)" strokeWidth={3} dot />
              <Area type="monotone" dataKey="planning" stroke="hsl(30,80%,55%)" fill="url(#colorPlanning)" strokeWidth={3} dot />
              <Area type="monotone" dataKey="active" stroke="hsl(160,60%,45%)" fill="url(#colorActive)" strokeWidth={3} dot />
              <Area type="monotone" dataKey="backlog" stroke="hsl(0,100%,60%)" fill="url(#colorBacklog)" strokeWidth={3} dot />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(270,100%,50.2%)" stopOpacity={0.2} />
                  <stop offset="70%" stopColor="hsl(270,100%,50.2%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPlanning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(30,80%,55%)" stopOpacity={0.2} />
                  <stop offset="70%" stopColor="hsl(30,80%,55%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(160,60%,45%)" stopOpacity={0.2} />
                  <stop offset="70%" stopColor="hsl(160,60%,45%)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBacklog" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(0,100%,60%)" stopOpacity={0.2} />
                  <stop offset="70%" stopColor="hsl(0,100%,60%)" stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </Suspense>
      ) : (
        <div className="flex items-center justify-center h-96">
          <p>No data to show yet!</p>
        </div>
      )}
    </div>
  );
};

export default TaskDone;

