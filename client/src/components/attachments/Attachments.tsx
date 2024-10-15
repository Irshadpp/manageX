import AttachmentRow from "./AttachmentRow";
import NewAttachmentButton from "./NewAttachmentButton";

const Attachments = ({task}: {task: any}) => {
  return (
    <div>
      <div className="flex items-center justify-between gap-2 pb-3">
        <h1 className="font-bold text-xl">Attachments</h1>
        <NewAttachmentButton task={task}/>
      </div>
      {task && task.attachments && task.attachments.length > 0 ? (
        <div className="max-h-52 overflow-y-auto bg-accent rounded-md border mb-2 scrollbar-hide">
          {task.attachments.map((attachment: any, index: number) => (
            <AttachmentRow key={index} attachment={attachment} />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center h-20 bg-accent rounded-md border mb-2">
          <p>No Attachments</p>
        </div>
      )}
    </div>
  );
};

export default Attachments;
