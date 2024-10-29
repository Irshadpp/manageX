import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import useSocket from "@/hooks/useSocket";
import { RootState } from "@/store";
import { MessageType } from "@/store/types/chat";
import axios from "axios";
import { useContext, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";

interface Props {
  setIsModalOpen: any;
  chat: any;
}

const FileUploadSelector = ({ chat, setIsModalOpen }: Props) => {
  const [selectedValue, setSelectedValue] = useState("image/*");
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileUploadLoading, setFileUploadLoading] = useState(false);
  const {user} = useSelector((state: RootState) => state.auth)
  const {emitEvent} = useSocket()

  const handleRadioChange = (event: string) => {
    setSelectedValue(event);
  };

  // Function to handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...filesArray]);
    }
  };

  // Function to remove a file
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...uploadedFiles];
    updatedFiles.splice(index, 1);
    setUploadedFiles(updatedFiles);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragEnter = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    // Handle dropped files here
  };

  const handleClick = () => {
    // Trigger click on the file input
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileUpload = async (selectedFile: any) => {
    const formData = new FormData();
    formData.append("file", selectedFile as Blob);
    formData.append(
      "upload_preset",
      import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string || "ya6pdewh"
    );

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME || "dajairt5h"}/auto/upload`,
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async () => {
    const type =
      selectedValue === "image/*"
        ? MessageType.IMAGE
        : selectedValue === "video/*"
        ? MessageType.VIDEO
        : MessageType.FILE;
    setFileUploadLoading(true);
    const content: string[] = [];
    for (let file of uploadedFiles) {
      const dataURL = await fileUpload(file);
      content.push(dataURL);
    }
      const message = {
        chatId: chat.id,
        content: content,
        type: type,
        from: user!.id
      }
      emitEvent("sendMessage", message);
    setFileUploadLoading(false);
    setIsModalOpen(false);
  };

  return (
    <div>
      <RadioGroup
        className="flex gap-5"
        value={selectedValue}
        onValueChange={handleRadioChange}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="image/*" id="r1" />
          <Label htmlFor="r1">Image</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="application/pdf" id="r2" />
          <Label htmlFor="r2">PDF</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="video/*" id="r3" />
          <Label htmlFor="r3">Video</Label>
        </div>
      </RadioGroup>

      <div className="text-xs mt-5">
        <div className="flex flex-col">
          <input
            type="file"
            accept={selectedValue}
            id="fileUpload"
            className="hidden"
            onChange={handleFileChange}
            multiple
            ref={fileInputRef}
          />

          <div // Drag and Drop div
            className={`border rounded-md  bg-backgroundAccent cursor-pointer hover:opacity-80 ${
              isDragOver ? "border-primary" : ""
            }`}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
          >
            <div className="h-32 flex items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <AiOutlineCloudUpload className="text-6xl" />
                <p>Drag and drop files here or click to browse</p>
              </div>
            </div>
          </div>
        </div>
        {uploadedFiles && uploadedFiles.length > 0 && (
          <p className="text-sm  mt-1">Uploaded Files</p>
        )}
        <div className="max-h-24 mt-1 scrollbar-hide overflow-auto">
          {uploadedFiles.map((file: File, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-md px-4 py-2 mb-1 bg-backgroundAccent"
            >
              <span>{file.name}</span>
              <button type="button" onClick={() => handleRemoveFile(index)}>
                <FiTrash />
              </button>
            </div>
          ))}
        </div>
        <Button
          className="w-full mt-3"
          onClick={handleSend}
          disabled={fileUploadLoading}
        >
          {fileUploadLoading ? "Loading..." : "Send"}
        </Button>
      </div>
    </div>
  );
};

export default FileUploadSelector;
