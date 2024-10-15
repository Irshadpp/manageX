import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { useState } from "react";
  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import { AiFillFile } from "react-icons/ai";
  
  interface Props {
    files: string[];
    currentFileNumber: number;
  }
  
  const FileColumns = ({ files, currentFileNumber }: Props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFileIndex, setCurrentFileIndex] = useState(currentFileNumber);
  
    const settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: currentFileIndex,
      afterChange: (index: number) => setCurrentFileIndex(index),
    };
  
    const getFileName = (file: string) => {
      const f = file.split("/");
      return f[f.length - 1];
    };
  
    return (
      <>
        <div
          className="cursor-pointer hover:opacity-90 relative"
          onClick={() => setIsModalOpen(true)}
        >
          {/* <video src={files[currentFileNumber]} /> */}
          <div className="flex gap-1 items-center w-full">
            <div className="text-1xl bg-backgroundAccent p-2 rounded-full">
              <AiFillFile />
            </div>
            {files[currentFileIndex] && (
              <p className="line-clamp-1">
                {getFileName(files[currentFileIndex])}
              </p>
            )}
          </div>
          {files.length > 4 && currentFileNumber === 3 && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white text-4xl">{files.length - 4}+</span>
            </div>
          )}
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="sm:max-w-[800px] pb-10">
            <DialogHeader>
              <DialogTitle>File</DialogTitle>
            </DialogHeader>
            <div className="w-[750px] h-[500px] px-5">
              <Slider {...settings}>
                {files &&
                  files.map((file, index) => (
                    <div key={index} className="w-[750px] h-[500px] ">
                      <iframe src={file} className="w-full h-full" />
                    </div>
                  ))}
              </Slider>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  
  export default FileColumns;
  