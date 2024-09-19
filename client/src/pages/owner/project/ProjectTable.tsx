import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Link, useNavigate } from "react-router-dom";
import { fetchProject } from "@/store/projectThunk";
import { TanStackDataTable } from "@/components/custome/TanstackTable";
import { columns, columnsOwner } from "@/components/project/ProjectColums";

interface Props {
  location: string;
}

const ProjectTable = ({ location }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { projectData } = useSelector((state:RootState) => state.project);

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const rowOnClick = (id: string) => navigate(`/owner/projects/${id}`);

  return (
    <div className=" text-sm pb-5 ">
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
        <div className="flex flex-col items-center justify-center h-full">
          <p className="mt-2">No projects where created yet!</p>
          <p className="text-sm py-2">Please Create One</p>
          <Link to="/owner/project/create">
            <Button>Create Projects</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProjectTable;
