import React, { useRef } from 'react'
import { usePlaque } from '../context/PlaqueContext'

function Preview() {
  const { state } = usePlaque()
  const previewRef = useRef(null)
  const { text, style } = state

  // Calculate dimensions based on size and orientation
  const getDimensions = () => {
    const sizes = {
      '9x12': { w: 360, h: 270 },
      '13x18': { w: 520, h: 390 },
      '17x23': { w: 680, h: 510 },
      '18x24': { w: 720, h: 540 },
      '30x40': { w: 600, h: 450 },
      '40x60': { w: 800, h: 600 }
    }
    
    const base = sizes[style.size] || sizes['13x18']
    return style.orientation === 'vertical' 
      ? { width: base.h, height: base.w }
      : { width: base.w, height: base.h }
  }

  const dimensions = getDimensions()
  const isOval = style.shape === 'oval'

  const plaqueStyle = {
    width: `${Math.min(dimensions.width, 400)}px`,
    height: `${Math.min(dimensions.height, 300)}px`,
    backgroundColor: '#ffffff',
    borderRadius: isOval ? '50%' : '8px',
    border: '2px solid #000000',
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}px`,
    aspectRatio: `${dimensions.width} / ${dimensions.height}`
  }

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-center">
        <div 
          ref={previewRef}
          data-preview="true"
          className="bg-white shadow-lg relative flex flex-col items-center justify-center p-6 text-center text-black"
          style={plaqueStyle}
        >
          {/* Full Name */}
          {text.fullName && (
            <div className="font-bold mb-3 leading-tight">
              {text.fullName}
            </div>
          )}
          
          {/* Dates */}
          {text.dates && (
            <div className="mb-4 opacity-80" style={{ fontSize: `${style.fontSize * 0.8}px` }}>
              {text.dates}
            </div>
          )}
          
          {/* Epitaph */}
          {text.epitaph && (
            <div className="italic opacity-70 leading-relaxed whitespace-pre-line" style={{ fontSize: `${style.fontSize * 0.6}px` }}>
              {text.epitaph}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Preview