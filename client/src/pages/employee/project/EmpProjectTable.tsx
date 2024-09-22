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

const EmpProjectTable = ({ location }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { projectData } = useSelector((state:RootState) => state.project);
  const {user} = useSelector((state: RootState) => state.auth)

  console.log(projectData)
  const projects = projectData && projectData.filter(p => 
    p.members.some(member => member.id === user!.id)
  );

  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const rowOnClick = (id: string) => navigate(`/employee/projects/${id}`);

  return (
    <div className=" text-sm pb-5 ">
      {projects && projects.length > 0 ? (
        <TanStackDataTable
          columns={location === "owner" ? columnsOwner : columns}
          data={projects}
          pageTitle="Projects"
          searchField="name"
          rowOnClick={rowOnClick}
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="mt-2">No projects where created yet!</p>
        </div>
      )}
    </div>
  );
};

export default EmpProjectTable;
