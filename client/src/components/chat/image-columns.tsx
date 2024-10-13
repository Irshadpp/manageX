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

interface Props {
  images: string[];
  currentImageNumber: number;
}

const ImageColumns = ({ images, currentImageNumber }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] =
    useState(currentImageNumber);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentImageIndex,
    afterChange: (index: number) => setCurrentImageIndex(index),
  };

  return (
    <>
      <div
        className="w-36 md:w-44 h-36 md:h-44 cursor-pointer hover:opacity-90 relative"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          className="object-cover h-full w-full"
          alt="random image"
          src={images[currentImageNumber]}
          width={100}
          height={100}
        />
        {images.length > 4 && currentImageNumber === 3 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <span className="text-white text-4xl">{images.length - 4}+</span>
          </div>
        )}
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-[400px] sm:max-w-[700px] md:max-w-[800px]  pb-10">
          <DialogHeader>
            <DialogTitle>Image Slider</DialogTitle>
          </DialogHeader>
          <div className="w-[650px] md:w-[750px] h-[500px] px-5">
            <Slider {...settings}>
              {images &&
                images.map((image, index) => (
                  <div
                    key={index}
                    className="w-[650px] md:w-[750px] h-[500px] "
                  >
                    <img
                      className="object-contain h-full w-full"
                      alt={`image-${index}`}
                      src={image}
                      width={500}
                      height={500}
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageColumns;
