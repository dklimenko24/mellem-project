import React, { useState } from 'react'

function SizeInput({ width, height, onSizeChange }) {
  const [customWidth, setCustomWidth] = useState(width || 13)
  const [customHeight, setCustomHeight] = useState(height || 18)

  const presetSizes = [
    { w: 9, h: 12, label: '9×12 см' },
    { w: 13, h: 18, label: '13×18 см' },
    { w: 17, h: 23, label: '17×23 см' },
    { w: 18, h: 24, label: '18×24 см' },
    { w: 30, h: 40, label: '30×40 см' },
    { w: 40, h: 60, label: '40×60 см' }
  ]

  const handlePresetClick = (w, h) => {
    setCustomWidth(w)
    setCustomHeight(h)
    onSizeChange(w, h)
  }

  const handleCustomChange = () => {
    if (customWidth > 0 && customHeight > 0) {
      onSizeChange(customWidth, customHeight)
    }
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Размер таблички</h3>
      
      {/* Preset sizes */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {presetSizes.map(({ w, h, label }) => (
          <button
            key={`${w}x${h}`}
            onClick={() => handlePresetClick(w, h)}
            className={`p-3 rounded-xl border transition-all duration-200 ${
              width === w && height === h
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
            }`}
          >
            <div className="text-sm font-medium">{label}</div>
          </button>
        ))}
      </div>
      
      {/* Custom size inputs */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-slate-300 mb-2">
          Или введите свой размер:
        </div>
        
        <div className="flex gap-3 items-center">
          <div className="flex-1">
            <input
              type="number"
              value={customWidth}
              onChange={(e) => setCustomWidth(parseInt(e.target.value) || 0)}
              onBlur={handleCustomChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ширина"
              min="1"
              max="100"
            />
            <div className="text-xs text-slate-400 text-center mt-1">см</div>
          </div>
          
          <div className="text-slate-400 text-xl">×</div>
          
          <div className="flex-1">
            <input
              type="number"
              value={customHeight}
              onChange={(e) => setCustomHeight(parseInt(e.target.value) || 0)}
              onBlur={handleCustomChange}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Высота"
              min="1"
              max="100"
            />
            <div className="text-xs text-slate-400 text-center mt-1">см</div>
          </div>
        </div>
        
        <div className="text-xs text-slate-500 text-center">
          Текущий размер: {width}×{height} см
        </div>
      </div>
    </div>
  )
}

export default SizeInput