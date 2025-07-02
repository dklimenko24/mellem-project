import React, { useState } from 'react'

function SizeInput({ width, height, onSizeChange }) {
  const [customWidth, setCustomWidth] = useState(width || 13)
  const [customHeight, setCustomHeight] = useState(height || 18)

  const handleCustomChange = () => {
    if (customWidth > 0 && customHeight > 0) {
      onSizeChange(customWidth, customHeight)
    }
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Размер таблички</h3>
      
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
      
      <div className="text-xs text-slate-500 text-center mt-3">
        Текущий размер: {width}×{height} см
      </div>
    </div>
  )
}

export default SizeInput