import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import UserAvatarImage from '/useravatar.png';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputBox from "@/components/common/InputBox";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { updateProject } from "@/store/projectThunk";

const ProjectDetails = ({ projectId }: { projectId: string }) => {

  const dispatch = useDispatch<AppDispatch>();
  const { projectData } = useSelector((state: RootState) => state.project);  

  const project: any = projectData.find(item => item.id === projectId);
  
  const handleStatusUpdate = async (value: string) => {
    const data = {
      status: `${value}`,
    };
      dispatch(updateProject(data, projectId));
  };

  return (
    <ScrollArea className="h-screen bg-muted/40 shadow-md">
      {project && (
        <div className="p-5">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-4">{project.name}</h2>
          </div>
          <Label>
            <p className="py-2">Project Status</p>
          </Label>
          <Select
            defaultValue={project.status}
            onValueChange={handleStatusUpdate}
            disabled={true}
          >
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="planning">Planning</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="backlog">Backlog</SelectItem>
            </SelectContent>
          </Select>
          <Label>
            <p className="py-2">Start Date:</p>
          </Label>
          <InputBox
            data={format(new Date(project.startDate), "MMMM d, yyyy")}
          />
          <Label>
            <p className="py-2">End Date:</p>
          </Label>
          <InputBox data={format(new Date(project.endDate), "MMMM d, yyyy")} />
          <Label>
            <p className="py-2">Description</p>
          </Label>
          <InputBox data={project.description} />
          <Label>
            <p className="py-2">Manager</p>
          </Label>
          <InputBox
            data={
              typeof project.manager !== "string"
                ? `${project.manager.fName} ${project.manager.lName}`
                : "Cannot Read Name"
            }
          />
          <Label>
            <p className="py-2">Members</p>
          </Label>
          <div className="mb-4 flex flex-wrap">
            {project &&
              project.members &&
              typeof project.members !== "string" &&
              project.members.map((member: any, index: number) => (
                <div
                  className={`w-10 h-10 rounded-full overflow-clip border-4 ${
                    index > 0 && `-ml-2`
                  }`}
                  key={index}
                >
                  <img
                    src={
                      (member &&
                        typeof member !== "string" &&
                        (member.profileURL as string)) ||
                        UserAvatarImage
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                    width={100}
                    height={100}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </ScrollArea>
  );
};

export default ProjectDetails;
