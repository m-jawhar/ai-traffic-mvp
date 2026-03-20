import { useState } from 'react'
import './App.css'
import LiveFeed from './components/LiveFeed'
import ControlPanel from './components/ControlPanel'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10" style={{ color: "#333" }}>
      <h1 className="text-4xl font-bold text-gray-800 mb-8 mt-5">AI Traffic Management Dashboard</h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mt-5">
        <LiveFeed />
        <ControlPanel />
      </div>
    </div>
  )
}

export default App
