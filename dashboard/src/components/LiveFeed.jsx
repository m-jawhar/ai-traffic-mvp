import React from 'react';

export default function LiveFeed() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Live Intersection Feed</h2>
      
      <div className="flex-grow bg-slate-800 rounded-lg flex items-center justify-center min-h-[300px] overflow-hidden relative">
        <div className="absolute top-4 left-4 flex space-x-2">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-mono animate-pulse">● LIVE</span>
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded font-mono">CV Active</span>
        </div>
        <p className="text-slate-400 font-medium">Camera Feed Placeholder</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded text-center">
            <p className="text-xs text-blue-600 font-semibold uppercase">Vehicles Detected</p>
            <p className="text-2xl font-bold text-gray-800">24</p>
        </div>
        <div className="bg-green-50 p-3 rounded text-center">
            <p className="text-xs text-green-600 font-semibold uppercase">Est. Wait Time</p>
            <p className="text-2xl font-bold text-gray-800">59s</p>
        </div>
      </div>
    </div>
  );
}
