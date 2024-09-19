import React from "react";

const StatusBadge = ({ status }: { status: string }) => {
  return (
    <div
      className={`py-1 px-2 flex w-fit items-center gap-2 rounded-full text-xs text-white ${
        status === "backlog" && "bg-red-600"
      } ${status === "active" && "bg-blue-600"} ${
        status === "planning" && "bg-gray-500"
      } ${status === "planning" && "bg-gray-500"} ${
        status === "completed" && "bg-green-700"
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          status === "backlog" && "bg-red-800"
        } ${status === "active" && "bg-blue-900"} ${
          status === "planning" && "bg-gray-800"
        } ${status === "completed" && "bg-green-900"}`}
      ></div>
      <p className="capitalize">{status}</p>
    </div>
  );
};

export default StatusBadge;