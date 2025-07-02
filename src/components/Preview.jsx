import React, { useRef, useEffect, useState } from 'react'
import { usePlaque } from '../context/PlaqueContext'

function Preview() {
  const { state } = usePlaque()
  const previewRef = useRef(null)
  const textContainerRef = useRef(null)
  const [optimalSizes, setOptimalSizes] = useState({
    fullName: 16,
    dates: 12,
    epitaph: 10
  })
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

  // Advanced text fitting algorithm
  useEffect(() => {
    const fitTextToPlaque = () => {
      if (!previewRef.current || !textContainerRef.current) return

      const plaqueElement = previewRef.current
      const containerElement = textContainerRef.current
      
      // Calculate available space with proper padding
      const padding = Math.min(dimensions.width, dimensions.height) * 0.08 // 8% padding
      const availableWidth = plaqueElement.offsetWidth - (padding * 2)
      const availableHeight = plaqueElement.offsetHeight - (padding * 2)
      
      // For oval shapes, reduce effective area
      const effectiveWidth = isOval ? availableWidth * 0.8 : availableWidth
      const effectiveHeight = isOval ? availableHeight * 0.8 : availableHeight
      
      // Create temporary elements to measure text
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.visibility = 'hidden'
      tempContainer.style.width = `${effectiveWidth}px`
      tempContainer.style.fontFamily = style.fontFamily
      tempContainer.style.textAlign = 'center'
      tempContainer.style.lineHeight = '1.1'
      document.body.appendChild(tempContainer)

      // Function to measure text height at given font size
      const measureTextHeight = (text, fontSize, isItalic = false, lineHeight = '1.1') => {
        tempContainer.innerHTML = text.replace(/\n/g, '<br>')
        tempContainer.style.fontSize = `${fontSize}px`
        tempContainer.style.fontStyle = isItalic ? 'italic' : 'normal'
        tempContainer.style.lineHeight = lineHeight
        return tempContainer.offsetHeight
      }

      // Binary search for optimal font sizes
      const findOptimalSize = (text, minSize, maxSize, isItalic = false, lineHeight = '1.1') => {
        if (!text) return 0
        
        let low = minSize
        let high = maxSize
        let optimal = minSize
        
        for (let i = 0; i < 15; i++) {
          const mid = (low + high) / 2
          const height = measureTextHeight(text, mid, isItalic, lineHeight)
          
          if (height <= effectiveHeight * 0.9) { // Leave some margin
            optimal = mid
            low = mid + 0.5
          } else {
            high = mid - 0.5
          }
          
          if (high - low < 0.5) break
        }
        
        return Math.floor(optimal)
      }

      // Calculate base font size from available space
      const baseFontSize = Math.min(effectiveWidth / 8, effectiveHeight / 6)
      const maxFontSize = Math.min(effectiveWidth / 4, effectiveHeight / 3)
      
      // Calculate total content height to distribute space
      let totalContentHeight = 0
      const spacing = baseFontSize * 0.3
      
      // Count active text elements
      const hasFullName = text.fullName?.trim()
      const hasDates = text.dates?.trim()
      const hasEpitaph = text.epitaph?.trim()
      
      const activeElements = [hasFullName, hasDates, hasEpitaph].filter(Boolean).length
      
      if (activeElements === 0) {
        document.body.removeChild(tempContainer)
        return
      }

      // Distribute available height among elements
      const availableForText = effectiveHeight - (spacing * (activeElements - 1))
      
      let newSizes = { fullName: 0, dates: 0, epitaph: 0 }
      
      if (hasFullName && !hasDates && !hasEpitaph) {
        // Only full name - use maximum space
        newSizes.fullName = findOptimalSize(text.fullName, baseFontSize, maxFontSize)
      } else if (hasFullName && hasDates && !hasEpitaph) {
        // Name and dates - 70/30 split
        const nameHeight = availableForText * 0.7
        const datesHeight = availableForText * 0.3
        
        newSizes.fullName = findOptimalSize(text.fullName, baseFontSize * 0.8, maxFontSize)
        newSizes.dates = findOptimalSize(text.dates, baseFontSize * 0.5, newSizes.fullName * 0.8)
        
        // Adjust if total height exceeds available space
        const totalHeight = measureTextHeight(text.fullName, newSizes.fullName) + 
                           measureTextHeight(text.dates, newSizes.dates) + spacing
        
        if (totalHeight > availableForText) {
          const scale = availableForText / totalHeight
          newSizes.fullName *= scale
          newSizes.dates *= scale
        }
      } else {
        // All three elements - proportional distribution
        const nameRatio = 0.5
        const datesRatio = 0.25
        const epitaphRatio = 0.25
        
        if (hasFullName) {
          newSizes.fullName = findOptimalSize(text.fullName, baseFontSize * 0.6, maxFontSize * nameRatio)
        }
        if (hasDates) {
          newSizes.dates = findOptimalSize(text.dates, baseFontSize * 0.4, newSizes.fullName * 0.8)
        }
        if (hasEpitaph) {
          newSizes.epitaph = findOptimalSize(text.epitaph, baseFontSize * 0.3, newSizes.fullName * 0.6, true, '1.3')
        }
        
        // Final adjustment to ensure everything fits
        const totalHeight = 
          (hasFullName ? measureTextHeight(text.fullName, newSizes.fullName) : 0) +
          (hasDates ? measureTextHeight(text.dates, newSizes.dates) : 0) +
          (hasEpitaph ? measureTextHeight(text.epitaph, newSizes.epitaph, true, '1.3') : 0) +
          (spacing * (activeElements - 1))
        
        if (totalHeight > availableForText) {
          const scale = (availableForText * 0.95) / totalHeight // 5% safety margin
          newSizes.fullName *= scale
          newSizes.dates *= scale
          newSizes.epitaph *= scale
        }
      }

      // Clean up
      document.body.removeChild(tempContainer)
      
      // Apply the calculated sizes
      setOptimalSizes({
        fullName: Math.max(8, Math.floor(newSizes.fullName)),
        dates: Math.max(6, Math.floor(newSizes.dates)),
        epitaph: Math.max(6, Math.floor(newSizes.epitaph))
      })
    }

    // Debounce the fitting function
    const timer = setTimeout(fitTextToPlaque, 150)
    return () => clearTimeout(timer)
  }, [text, style, dimensions, isOval])

  const plaqueStyle = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    backgroundColor: '#ffffff',
    borderRadius: isOval ? '50%' : '12px',
    border: '3px solid #1f2937',
    fontFamily: style.fontFamily,
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
  }

  const padding = Math.min(dimensions.width, dimensions.height) * 0.08
  const spacing = Math.max(optimalSizes.fullName, optimalSizes.dates, optimalSizes.epitaph) * 0.3

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
            ref={textContainerRef}
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ 
              padding: `${padding}px`,
              gap: `${spacing}px`,
              overflow: 'hidden'
            }}
          >
            {/* Full Name */}
            {text.fullName && (
              <div 
                className="font-bold leading-tight w-full flex-shrink-0"
                style={{ 
                  fontSize: `${optimalSizes.fullName}px`,
                  lineHeight: '1.1'
                }}
              >
                {text.fullName}
              </div>
            )}
            
            {/* Dates */}
            {text.dates && (
              <div 
                className="opacity-80 w-full flex-shrink-0"
                style={{ 
                  fontSize: `${optimalSizes.dates}px`,
                  lineHeight: '1.2'
                }}
              >
                {text.dates}
              </div>
            )}
            
            {/* Epitaph */}
            {text.epitaph && (
              <div 
                className="italic opacity-70 whitespace-pre-line w-full flex-1 flex items-center justify-center"
                style={{ 
                  fontSize: `${optimalSizes.epitaph}px`,
                  lineHeight: '1.3'
                }}
              >
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