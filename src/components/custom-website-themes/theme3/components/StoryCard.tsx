import React from "react";

interface StoryCardProps {
  date?: string;
  title?: string;
  description?: string;
  imageUrl?: string;
  direction?: "right" | "left";
}

export function StoryCard({
  date = "12 Feb 2016",
  title = "First Time We Meet",
  description = "Lorem ipsum dolor sit amet, constetur adicing elit. Ultricies nulla mi tempus mcorper for praesent. Ultricies interdum volutpat morbi nam ornare neque elit leo, diam. Malesuada enim ac amurna tempor vel duis.",
  imageUrl = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TzeErcJuYYMzdPZfWfA8qE0czsws0y.png",
  direction = "left",
}: StoryCardProps) {
  const isRight = direction === "right";

  return (
    <div className={`relative w-full max-w-xl mx-auto ${isRight ? 'pr-24' : 'pl-24'}`}>
      {/* Image Container with Shadow */}
      <div className={`absolute ${isRight ? 'right-0' : 'left-0'} top-1/2 -translate-y-1/2 z-10`}>
        <div className="relative w-48 h-48">
          {/* White border/background for image */}
          <div className="absolute inset-0 rounded-full bg-white shadow-md border"></div>
          {/* Actual image */}
          <img
            src={imageUrl}
            alt="Couple"
            className="absolute inset-0 m-auto size-40 rounded-full object-cover"
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="relative bg-white shadow-md border p-4">
        <div className={`border p-4 ${isRight ? 'text-right pr-24' : 'text-left pl-24'}`}>
          {/* Title */}
          <h2 className="font-monallesia-script text-xl text-gray-800 mb-4">
            {title}
          </h2>

          {/* Date */}
          <p className="text-lg font-medium text-[#939580] font-jost mb-2">
            {date}
          </p>

          {/* Description */}
          <p className={`text-gray-600 leading-relaxed font-jost ${isRight ? 'ml-auto' : 'mr-auto'}`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
