import { BiTimeFive } from "react-icons/bi";

const EstimatedDuration = ({task}: {task: any}) => {
  const calculateTotalDuration = () => {
    if (!task || !task.subTasks) return 0;

    const durationInMinutes: any = {
      minutes: 1,
      hours: 60,
      day: 1440,
    };

    return task.subTasks.reduce((totalDuration: any, subTask: any) => {
      if (subTask.duration && subTask.duration.length) {
        const { length, durationType } = subTask.duration;
        const durationInMinutesForType = durationInMinutes[durationType];
        return totalDuration + length * durationInMinutesForType;
      }
      return totalDuration;
    }, 0);
  };

  const totalDurationInMinutes = calculateTotalDuration();

  const convertMinutesToDaysHoursMinutes = (minutes: number) => {
    const day = Math.floor(minutes / 1440);
    const remainingHours = Math.floor((minutes % 1440) / 60);
    const remainingMinutes = minutes % 60;
    return { day, remainingHours, remainingMinutes };
  };

  const { day, remainingHours, remainingMinutes } =
    convertMinutesToDaysHoursMinutes(totalDurationInMinutes);

  return (
    <div className="flex gap-1 items-center text-foregroundAccent">
      <BiTimeFive /> :{day > 0 && `${day} day`}{" "}
      {remainingHours > 0 && `${remainingHours} hours`}{" "}
      {remainingMinutes > 0 && `${remainingMinutes} minutes`}
    </div>
  );
};

export default EstimatedDuration;
