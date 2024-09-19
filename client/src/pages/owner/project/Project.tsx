import { useParams } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";

const Project = () => {
    const {id} = useParams();
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
      <ProjectDetails id={id!} />
      {/* <TaskDetails slug={params.slug} /> */}
    </div>
  );
};

export default Project;
