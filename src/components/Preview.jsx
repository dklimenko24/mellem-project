import React, { useRef, useEffect, useState } from 'react'
import { usePlaque } from '../context/PlaqueContext'

function Preview() {
  const { state } = usePlaque()
  const previewRef = useRef(null)
  const textRef = useRef(null)
  const [optimalFontSize, setOptimalFontSize] = useState(16)
  const { text, style } = state

  // Calculate dimensions based on custom size and orientation
  const getDimensions = () => {
    const baseWidth = style.width * 10
    const baseHeight = style.height * 10
    
    return style.orientation === 'vertical' 
      ? { width: baseHeight, height: baseWidth }
      : { width: baseWidth, height: baseHeight }
  }

  const dimensions = getDimensions()
  const isOval = style.shape === 'oval'

  // Auto-fit text to plaque size
  useEffect(() => {
    const fitTextToPlaque = () => {
      if (!previewRef.current || !textRef.current) return

      const plaqueElement = previewRef.current
      const textElement = textRef.current
      
      // Available space (minus padding)
      const availableWidth = plaqueElement.offsetWidth - 48 // 24px padding on each side
      const availableHeight = plaqueElement.offsetHeight - 48
      
      // Start with a reasonable font size
      let fontSize = Math.min(availableWidth, availableHeight) / 8
      let attempts = 0
      const maxAttempts = 20

      // Binary search for optimal font size
      let minSize = 8
      let maxSize = Math.min(availableWidth, availableHeight) / 2

      while (attempts < maxAttempts && maxSize - minSize > 1) {
        fontSize = (minSize + maxSize) / 2
        
        // Apply font size temporarily
        textElement.style.fontSize = `${fontSize}px`
        
        // Check if text fits
        const textHeight = textElement.scrollHeight
        const textWidth = textElement.scrollWidth
        
        if (textHeight <= availableHeight && textWidth <= availableWidth) {
          minSize = fontSize
        } else {
          maxSize = fontSize
        }
        
        attempts++
      }

      // Use the largest size that fits
      setOptimalFontSize(Math.floor(minSize))
    }

    // Small delay to ensure DOM is updated
    const timer = setTimeout(fitTextToPlaque, 100)
    return () => clearTimeout(timer)
  }, [text, style, dimensions])

  const plaqueStyle = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    backgroundColor: '#ffffff',
    borderRadius: isOval ? '50%' : '12px',
    border: '3px solid #1f2937',
    fontFamily: style.fontFamily,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
  }

  return (
    <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
      <div className="flex items-center justify-center min-h-[300px] overflow-auto">
        <div 
          ref={previewRef}
          data-preview="true"
          className="bg-white relative flex flex-col items-center justify-center text-center text-black transition-all duration-300"
          style={plaqueStyle}
        >
          <div 
            ref={textRef}
            className="w-full h-full flex flex-col items-center justify-center p-6"
            style={{ 
              fontSize: `${optimalFontSize}px`,
              overflow: 'hidden'
            }}
          >
            {/* Full Name */}
            {text.fullName && (
              <div className="font-bold mb-2 leading-tight w-full" style={{ 
                fontSize: `${optimalFontSize}px`,
                lineHeight: '1.1'
              }}>
                {text.fullName}
              </div>
            )}
            
            {/* Dates */}
            {text.dates && (
              <div className="mb-3 opacity-80 w-full" style={{ 
                fontSize: `${optimalFontSize * 0.7}px`,
                lineHeight: '1.2'
              }}>
                {text.dates}
              </div>
            )}
            
            {/* Epitaph */}
            {text.epitaph && (
              <div className="italic opacity-70 leading-snug whitespace-pre-line w-full" style={{ 
                fontSize: `${optimalFontSize * 0.5}px`,
                lineHeight: '1.3'
              }}>
                {text.epitaph}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="text-center mt-4 text-sm text-slate-400">
        {style.width}×{style.height} см • {style.orientation === 'horizontal' ? 'Горизонтальная' : 'Вертикальная'}
      </div>
    </div>
  )
}

export default Preview