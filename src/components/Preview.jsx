import React, { useRef } from 'react'
import { usePlaque } from '../context/PlaqueContext'

function Preview() {
  const { state } = usePlaque()
  const previewRef = useRef(null)
  const { text, style } = state

  // Calculate dimensions based on custom size and orientation
  const getDimensions = () => {
    const baseWidth = style.width * 40 // Scale factor for display
    const baseHeight = style.height * 40
    
    return style.orientation === 'vertical' 
      ? { width: baseHeight, height: baseWidth }
      : { width: baseWidth, height: baseHeight }
  }

  const dimensions = getDimensions()
  const isOval = style.shape === 'oval'

  // Limit display size for mobile
  const maxDisplayWidth = Math.min(dimensions.width, 350)
  const maxDisplayHeight = Math.min(dimensions.height, 280)
  const scale = Math.min(maxDisplayWidth / dimensions.width, maxDisplayHeight / dimensions.height)

  const plaqueStyle = {
    width: `${dimensions.width * scale}px`,
    height: `${dimensions.height * scale}px`,
    backgroundColor: '#ffffff',
    borderRadius: isOval ? '50%' : '12px',
    border: '3px solid #1f2937',
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize * scale}px`,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
      <div className="flex items-center justify-center min-h-[300px]">
        <div 
          ref={previewRef}
          data-preview="true"
          className="bg-white relative flex flex-col items-center justify-center p-6 text-center text-black transition-all duration-300"
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
            <div className="mb-4 opacity-80" style={{ fontSize: `${style.fontSize * scale * 0.8}px` }}>
              {text.dates}
            </div>
          )}
          
          {/* Epitaph */}
          {text.epitaph && (
            <div className="italic opacity-70 leading-relaxed whitespace-pre-line" style={{ fontSize: `${style.fontSize * scale * 0.6}px` }}>
              {text.epitaph}
            </div>
          )}
        </div>
      </div>
      
      <div className="text-center mt-4 text-sm text-slate-400">
        {style.width}×{style.height} см • {style.orientation === 'horizontal' ? 'Горизонтальная' : 'Вертикальная'}
      </div>
    </div>
  )
}

export default Preview