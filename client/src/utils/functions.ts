import { CountByDay } from "@/constants/types";

export const countTotal = (data: CountByDay[]) => {
    let total = data.reduce((acc, curr) => acc + curr.count, 0);
    return total;
  };