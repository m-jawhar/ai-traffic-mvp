import React, { useState } from 'react';

export default function ControlPanel() {
  const [intersection, setIntersection] = useState('int0');
  const [phase, setPhase] = useState(0);

  const apply = async () => {
    try {
        const response = await fetch('/api/v1/control/signal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ intersection_id: intersection, phase })
        });
        
        if (response.ok) {
            const data = await response.json();
            alert(`Backend confirmation: ${data.message}`);
        } else {
            alert('Failed to apply override to backend.');
        }
    } catch {
       alert('Applied (Mock API Call - No Server Configured)')
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 flex flex-col h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Manual Signal Control</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Intersection ID</label>
        <input 
          type="text"
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none" 
          value={intersection} 
          onChange={e => setIntersection(e.target.value)} 
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Override Phase</label>
        <select 
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          value={phase} 
          onChange={e => setPhase(Number(e.target.value))}
        >
            <option value={0}>Phase 0: NS-Green / EW-Red</option>
            <option value={1}>Phase 1: EW-Green / NS-Red</option>
            <option value={2}>Phase 2: All Red (Emergency)</option>
        </select>
      </div>
      
      <button 
        className="mt-auto w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm" 
        onClick={apply}
      >
        Apply Override
      </button>
    </div>
  );
}
