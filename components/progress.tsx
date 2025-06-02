'use client';

import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface CircularProgressProps {
  value: number; // 0–1
  size?: number;
  strokeWidth?: number;
  decimals?: number;
}

export default function CircularProgress({
  value = 0,
  size = 250,
  strokeWidth = 30,
  decimals = 2,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(Math.max(value, 0), 1);
  const offset = circumference - clampedValue * circumference;

  // Warna stroke & status
  let strokeColor = "#10b981"; // green-500
  let status = "Aman";

  if (clampedValue >= 0.3 && clampedValue < 0.5) {
    strokeColor = "#facc15"; // yellow-400
    status = "Indikasi Bocor";
  } else if (clampedValue >= 0.5) {
    strokeColor = "#ef4444"; // red-500
    status = "Bocor";
  }

  // Motion angka
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) =>
    latest.toFixed(decimals)
  );

  useEffect(() => {
    const controls = animate(motionValue, clampedValue, {
      duration: 0.5,
      ease: "easeInOut",
    });
    return controls.stop;
  }, [clampedValue, motionValue]);

  return (
    <div className="relative group w-fit">
      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 text-md rounded text-white opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: strokeColor }}>
      {status}
    </div>


      {/* SVG */}
      <svg width={size} height={size}>
        {/* Background */}
        <circle
          stroke="#e5e7eb"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress */}
        <motion.circle
          stroke={strokeColor}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        {/* Number */}
        <motion.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white text-4xl"
        >
          {rounded}
        </motion.text>
      </svg>
    </div>
  );
}
