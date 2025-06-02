'use client';

import React from 'react';

type FlowMeterContainerProps = {
  value: number; // Value dari flow meter, bisa L/min, m3/h, dll.
  unit?: string; // Satuan (opsional), default ke 'L/min'
  title: string;
};

export default function FlowMeterContainer({ title, value, unit = 'L/min' }: FlowMeterContainerProps) {
  return (
    <div className="bg-gray-900 rounded-2xl pt-6 p-2 w-full max-w-sm text-center">
      <h2 className="text-xl font-medium mb-5 text-gray-600">{title}</h2>
      <div className="text-4xl font-bold text-white bg-gray-800 rounded-xl p-6 w-full text-center">
        {value.toFixed(2)} <span className="text-lg font-medium text-blue-600">{unit}</span>
      </div>
    </div>
  );
}
