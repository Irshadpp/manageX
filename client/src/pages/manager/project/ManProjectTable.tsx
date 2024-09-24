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

const ManProjectTable = ({ location }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { projectData } = useSelector((state:RootState) => state.project);
  const {user} = useSelector((state: RootState) => state.auth)

  const projects = projectData && projectData.filter((p : any)=> 
    p.manager.id === user!.id)


  useEffect(() => {
    dispatch(fetchProject());
  }, [dispatch]);

  const rowOnClick = (id: string) => navigate(`/manager/projects/${id}`);

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

export default ManProjectTable;
