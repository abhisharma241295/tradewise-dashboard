import { useState, useEffect } from "react"

export default function ReverseTimeCounter({
  data,
  bgColor,
  primaryFont,
  secondaryFont
}: {
  data: {
    targetTime: number;
    title: {
      text: string;
      className: string;
    };
    time: {
      className: string;
    };
    bgImageUrl: string;
  };
  bgColor: string;
  primaryFont: string;
  secondaryFont: string;
}) {
  const [timeDiff, setTimeDiff] = useState(0);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const timeDiff = Math.max(0, Math.floor((data.targetTime - Date.now()) / 1000));
      setDays(Math.floor(timeDiff / 86400));
      setHours(Math.floor((timeDiff % 86400) / 3600));
      setMinutes(Math.floor((timeDiff % 3600) / 60));
      setSeconds(timeDiff % 60);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [data.targetTime]);

  return (
    <div className="relative h-72 w-full overflow-hidden">
      <img
        src={data.bgImageUrl}
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
        <div className="text-center">
          <h2 className={data.title.className} style={{fontFamily:primaryFont}}>
            {data.title.text}
          </h2>
          <div className={data.time.className}>
            <div className="flex justify-center space-x-8 text-6xl font-bold font-nunito text-white">
              <div className="flex flex-col items-center">
                <span>{days.toString().padStart(2, "0")}</span>
                <span className="text-base font-normal">Days</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{hours.toString().padStart(2, "0")}</span>
                <span className="text-base font-normal">Hours</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{minutes.toString().padStart(2, "0")}</span>
                <span className="text-base font-normal">Minutes</span>
              </div>
              <div className="flex flex-col items-center">
                <span>{seconds.toString().padStart(2, "0")}</span>
                <span className="text-base font-normal">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
