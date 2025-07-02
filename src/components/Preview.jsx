import React, { useRef } from 'react'
import { usePlaque } from '../context/PlaqueContext'

function Preview() {
  const { state } = usePlaque()
  const previewRef = useRef(null)
  const { text, style } = state

  // Calculate dimensions based on custom size and orientation
  const getDimensions = () => {
    const baseWidth = style.width * 10 // Увеличенный масштаб для лучшего отображения
    const baseHeight = style.height * 10
    
    return style.orientation === 'vertical' 
      ? { width: baseHeight, height: baseWidth }
      : { width: baseWidth, height: baseHeight }
  }

  const dimensions = getDimensions()
  const isOval = style.shape === 'oval'

  // Auto-calculate font size based on plaque dimensions
  const calculateFontSize = () => {
    const area = (style.width * style.height)
    const baseSize = Math.sqrt(area) * 2.5 // Увеличенный множитель для лучшей читаемости
    return Math.max(16, Math.min(64, baseSize)) // Увеличенный диапазон
  }

  const autoFontSize = calculateFontSize()

  const plaqueStyle = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    backgroundColor: '#ffffff',
    borderRadius: isOval ? '50%' : '12px',
    border: '3px solid #1f2937',
    fontFamily: style.fontFamily,
    fontSize: `${autoFontSize}px`,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
      <div className="flex items-center justify-center min-h-[300px] overflow-auto">
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
            <div className="mb-4 opacity-80" style={{ fontSize: `${autoFontSize * 0.8}px` }}>
              {text.dates}
            </div>
          )}
          
          {/* Epitaph */}
          {text.epitaph && (
            <div className="italic opacity-70 leading-relaxed whitespace-pre-line" style={{ fontSize: `${autoFontSize * 0.6}px` }}>
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