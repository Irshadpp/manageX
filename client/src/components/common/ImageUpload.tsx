import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import UserAvatarImage from '/useravatar.png'
import { AiOutlineDelete } from "react-icons/ai";

const ImageUpload = ({
  selectedFile,
  setSelectedFile,
  imageURL,
  size,
}: {
  selectedFile: any;
  setSelectedFile: any;
  imageURL?: string;
  size?: string;
}) => {
  const fileInputRef = useRef<any>();
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    setSelectedFile(file);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  return (
    <div
      className={`rounded-md bg-background py-6 mb-2 text-center flex flex-col items-center justify-center relative ${
        isDragging ? "opacity-70 border-blue-500" : "border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
      {selectedFile ? (
        <div
          className={`w-${size ?  size : "32"} h-${size ?  size : "32"} rounded-full overflow-clip mx-auto`}
        >
          <img
            src={URL.createObjectURL(selectedFile)}
            alt={selectedFile.name}
            className="object-cover w-full h-full"
          />
        </div>
      ) : imageURL ? (
        <div
          className={`w-${size ?  size : "32"} h-${size ?  size : "32"} rounded-full overflow-clip mx-auto`}
        >
          <img
            src={imageURL}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      ) : (
        <div
          className={`w-${size ?  size : "32"} h-${size ?  size : "32"} rounded-full overflow-clip mx-auto`}
        >
          <img
            src={UserAvatarImage}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <p className="text-sm text-foregroundAccent py-2">
        Drag & drop image here
      </p>
      {selectedFile && (
        <AiOutlineDelete
          className="absolute top-3 right-3 text-xl cursor-pointer hover:text-foregroundAccent"
          onClick={handleClearFile}
        />
      )}
      <Button type="button" onClick={handleButtonClick} className="w-fit">
        Upload
      </Button>
    </div>
  );
};

export default ImageUpload;
