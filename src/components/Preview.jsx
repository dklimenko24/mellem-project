import React, { useRef } from 'react'
import { usePlaque } from '../context/PlaqueContext'

function Preview() {
  const { state } = usePlaque()
  const previewRef = useRef(null)
  const { text } = state

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-center">
        <div 
          ref={previewRef}
          data-preview="true"
          className="w-80 h-60 bg-white rounded-lg shadow-lg border-2 border-gray-800 relative flex flex-col items-center justify-center p-6 text-center"
          style={{ fontFamily: 'Good Vibes Pro, serif' }}
        >
          {/* Full Name */}
          {text.fullName && (
            <div className="text-black text-lg font-bold mb-3 leading-tight">
              {text.fullName}
            </div>
          )}
          
          {/* Dates */}
          {text.dates && (
            <div className="text-black text-base mb-4 opacity-80">
              {text.dates}
            </div>
          )}
          
          {/* Epitaph */}
          {text.epitaph && (
            <div className="text-black text-sm italic opacity-70 leading-relaxed whitespace-pre-line">
              {text.epitaph}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Preview