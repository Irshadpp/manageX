import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card";
import { Attachments } from "@/store/types/task";
import AttachmentViewButton from "./AttachmentViewButton";
  
  interface Props {
    attachment: Attachments;
  }
  
  const AttachmentRow = ({ attachment }: Props) => {
    return (
      <div className="px-3 py-2 border-b flex items-center justify-between">
        <HoverCard>
          <HoverCardTrigger asChild>
            <p className="hover:underline hover:opacity-80 cursor-pointer">
              {attachment.title}
            </p>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-1">
              <p className="text-sm">
                {attachment.description || "No description were given"}
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
        <AttachmentViewButton attachment={attachment} />
      </div>
    );
  };
  
  export default AttachmentRow;
  