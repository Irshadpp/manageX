import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Link, useNavigate } from "react-router-dom";
import { fetchProject } from "@/store/projectThunk";
import { TanStackDataTable } from "@/components/custome/TanstackTable";
import { columns, columnsOwner } from "@/components/project/ProjectColums";
import { EmptyProjects } from "./empties/EmptyProjects";

interface Props {
  location: string;
}

const ProjectTable = ({ location }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { projectData } = useSelector((state:RootState) => state.project);

  console.log(projectData)
  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const rowOnClick = (id: string) => navigate(`/owner/projects/${id}`);

  return (
    <div className="text-sm pb-">
      {projectData && projectData.length > 0 ? (
        <TanStackDataTable
          columns={location === "owner" ? columnsOwner : columns}
          data={projectData}
          pageTitle="Projects"
          searchField="name"
          rowOnClick={rowOnClick}
          newButton={<Link to="/owner/projects/create">
            <Button>Create Projects</Button>
          </Link>}
        />
      ) : (
        <EmptyProjects />
      )}
      </div>
  );
};

export default ProjectTable;
