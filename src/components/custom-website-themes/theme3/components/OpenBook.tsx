import { Facebook, Instagram, Twitter } from "lucide-react";
import React from "react";

const OpenBook: React.FC = () => {
  const leftPages = Array(3).fill(null);
  const rightPages = Array(3).fill(null);

  return (
    <div className="max-w-lg mx-auto w-full flex text-center">
      <div className="w-1/2 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white border transform -translate-x-4 shadow-[0_0_10px_rgba(0,3,77,0.02)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-white border transform -translate-x-2 shadow-[0_0_10px_rgba(0,3,77,0.02)]"></div>
        <div className="relative w-full h-full bg-white border shadow-[0_0_10px_rgba(0,3,77,0.02)]">
          <div className="size-full flex flex-col items-center justify-center  p-4 pl-4 pr-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
              alt="Person"
              className="size-40 object-cover rounded-full mb-4"
            />
            <h2 className="text-3xl mb-2 font-monallesia-script mb-4">
              Esabella <br /> Juliet
            </h2>
            <p className="text-center mb-4 font-jost text-[#848892] max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#D4B0A5] ">
                <Facebook size={16} />
              </a>
              <a href="#" className="text-[#D4B0A5] ">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-[#D4B0A5] ">
                <Instagram size={16} />
              </a>
            </div>
          </div>
          <div className="w-4 absolute right-4 top-0 bottom-0 flex flex-col justify-evenly">
            <div className="w-4 h-4 bg-[#E6DDDA] rounded-full mb-2"></div>
            <div className="w-4 h-4 bg-[#E6DDDA] rounded-full"></div>
            <div className="w-4 h-4 bg-[#E6DDDA] rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="w-1/2 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white border transform -translate-x-2 shadow-[0_0_10px_rgba(0,3,77,0.02)]"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-white border transform -translate-x-4 shadow-[0_0_10px_rgba(0,3,77,0.02)]"></div>
        <div className="relative w-full h-full bg-white border transform -translate-x-6 shadow-[0_0_10px_rgba(0,3,77,0.02)]">
          <div className="flex size-full flex-col items-center justify-center p-4 px-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png"
              alt="Person"
              className="size-40 object-cover rounded-full mb-4"
            />
            <h2 className="text-3xl mb-2 font-monallesia-script mb-4">
              William <br /> Jack
            </h2>
            <p className="text-center mb-4 font-jost text-[#848892] max-w-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[#D4B0A5] ">
                <Facebook size={16} />
              </a>
              <a href="#" className="text-[#D4B0A5] ">
                <Twitter size={16} />
              </a>
              <a href="#" className="text-[#D4B0A5] ">
                <Instagram size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenBook;
