import React from "react";
import {
  FaArrowCircleDown,
  FaArrowCircleRight,
  FaArrowCircleUp,
} from "react-icons/fa";

const PriorityIcon = ({ priority }: { priority: string }) => {
  return (
    <span className="capitalize flex items-center gap-2">
      {priority === "high" && <FaArrowCircleUp />}
      {priority === "medium" && <FaArrowCircleRight />}
      {priority === "low" && <FaArrowCircleDown />}
      {priority}
    </span>
  );
};

export default PriorityIcon;
