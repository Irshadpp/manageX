import { useParams } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import TaskDetails from "./task/TaskDetails";

const Project = () => {
    const {id} = useParams();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
      <ProjectDetails id={id!} />
      <TaskDetails id={id!} />
    </div>
  );
};

export default Project;