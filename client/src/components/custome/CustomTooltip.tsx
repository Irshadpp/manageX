import { format } from "date-fns";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const dateLabel = new Date(label);
    const isValidDate = !isNaN(dateLabel.getTime()); 

    return (
      <div className="bg-background border border-border p-2 rounded-md shadow">
        <p className="label">
          {isValidDate ? format(dateLabel, "MMM dd") : "Invalid date"}
        </p>
        {payload.map((entry: any, index: number) => (
          <p
            key={index}
            className={`capitalize ${
              entry.dataKey === "completed" && "text-[hsl(270,100%,50.2%)]"
            } ${entry.dataKey === "planning" && "text-[hsl(30,80%,55%)]"} ${
              entry.dataKey === "active" && "text-[hsl(160,60%,45%)]"
            } ${entry.dataKey === "backlog" && "text-[hsl(0,100%,60%)]"}`}
          >
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
