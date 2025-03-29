export default function LoveStory() {
  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url("/theme2/Background.png")`
      }}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white">
        <h2 className="text-[14px] tracking-[5px] didact-gothic-regular">A LOVE STORY BEGINNING</h2>
        <p className="alex-brush-regular mt-2 text-[60px]">
          Watch our love story{" "}
        </p>
      </div>
    </div>
  )
}