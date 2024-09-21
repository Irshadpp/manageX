import { BiExpand } from "react-icons/bi";
import { Button } from "@/components/ui/button";

const FileRow = ({ attach }: { attach: string }) => {
  const handleDownload = () => {
    const anchor = document.createElement("a");
    anchor.href = attach;
    anchor.target = "_blank";
    anchor.download = "image";
    anchor.click();
  };

  return (
    <div className="relative group">
      {attach.includes(".pdf") ? (
        <iframe src={attach} />
      ) : (
        <img
          alt="Test"
          src={attach}
          width={100}
          height={100}
          className="cursor-pointer"
        />
      )}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center gap-3 justify-center overlay invisible group-hover:visible">
        <Button variant="outline" onClick={handleDownload}>
          <BiExpand />
        </Button>
      </div>
    </div>
  );
};

export default FileRow;
