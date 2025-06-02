'use client';

import { useEffect, useState } from "react";
import Progress from "../../../components/progress";
import FlowContainer from "../../../components/flowcontainer";

export default function ClientHome() {
  const [data, setData] = useState<{
    leak1: number;
    leak2: number;
    flow_in: number;
    flow_out: number;
    pressure: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://4wii9aveoi.execute-api.us-east-1.amazonaws.com/FetchLeakData");
        const json = await res.json();

        if (Array.isArray(json) && json.length > 0) {
          const latest = json[0];
          setData({
            leak1: latest.leak1,
            leak2: latest.leak2,
            flow_in: latest.flow_in,
            flow_out: latest.flow_out,
            pressure: latest.pressure,
          });
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  if (!data) return <p className="text-center pt-10">Loading...</p>;

  return (
    <div className="h-full py-10 px-4 sm:px-8 md:px-20">
      {/* Leak Section */}
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 gap-10 mb-10">
        <div className="flex flex-col items-center gap-4">
          <Progress value={data.leak1} />
          <p className="text-center text-base sm:text-lg">Leak 1</p>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Progress value={data.leak2} />
          <p className="text-center text-base sm:text-lg">Leak 2</p>
        </div>
      </div>

      {/* Flow/Pressure Section */}
      <div className="grid grid-cols-1 justify-items-center sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <FlowContainer title="Flow In" value={data.flow_in} unit="mL/s" />
        <FlowContainer title="Flow Out" value={data.flow_out} unit="mL/s" />
        <FlowContainer title="Pressure" value={data.pressure} unit="psi" />
      </div>
    </div>
  );
}
