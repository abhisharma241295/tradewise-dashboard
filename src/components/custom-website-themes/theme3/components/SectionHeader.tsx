export function SectionHeader({
  title,
  pretext,
}: {
  title: string;
  pretext: string;
}) {
  return (
    <div className="text-center mx-auto mb-12">
      <h2 className="text-2xl font-serif text-[#939580] font-monallesia-script">
        {pretext}
      </h2>
      <h1 className="text-[#323232] font-jost uppercase tracking-wider text-3xl mt-3">
        {title}
      </h1>
      <div className="flex flex-col items-center justify-center mt-3 space-y-1">
        <div
          className="w-full max-w-md h-[1px] bg-[#F3E1DB]"
        ></div>
        <div
          className="w-full max-w-xs h-[1px] bg-[#F3E1DB]"
        ></div>
      </div>
    </div>
  );
}
