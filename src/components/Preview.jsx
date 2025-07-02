import React, { useRef, useEffect } from 'react'
import { usePlaque } from '../context/PlaqueContext'
import DraggableText from './DraggableText'

function Preview() {
  const { state } = usePlaque()
  const containerRef = useRef(null)

  const { style, text, frame } = state
  const isOval = style.shape === 'oval'
  
  // Calculate dimensions based on size and orientation
  const getDimensions = () => {
    const sizes = {
      '9x12': { w: 360, h: 270 },
      '13x18': { w: 520, h: 390 },
      '17x23': { w: 680, h: 510 }
    }
    
    const base = sizes[style.size]
    return style.orientation === 'vertical' 
      ? { width: base.h, height: base.w }
      : { width: base.w, height: base.h }
  }

  const dimensions = getDimensions()

  const plaqueStyle = {
    width: `${dimensions.width}px`,
    height: `${dimensions.height}px`,
    backgroundColor: style.backgroundColor,
    borderRadius: isOval ? '50%' : '8px',
    border: `${frame.width}px solid ${frame.color}`,
    position: 'relative',
    margin: '0 auto',
    maxWidth: '100%',
    maxHeight: '70vh',
    aspectRatio: `${dimensions.width} / ${dimensions.height}`
  }

  return (
    <div className="bg-dark-800 rounded-2xl p-6 shadow-2xl">
      <div className="flex items-center justify-center min-h-[400px]">
        <div 
          ref={containerRef}
          style={plaqueStyle}
          className="shadow-xl relative overflow-hidden"
        >
          {/* Frame decorations */}
          {frame.type !== 'none' && (
            <div className="absolute inset-2 pointer-events-none">
              {frame.type === 'classic' && (
                <div className="w-full h-full border border-gray-400 rounded-sm opacity-50" />
              )}
              {frame.type === 'ornate' && (
                <div className="w-full h-full">
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-gray-400" />
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-gray-400" />
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-gray-400" />
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-gray-400" />
                </div>
              )}
            </div>
          )}

          {/* Text elements */}
          {text.surname && (
            <DraggableText
              field="surname"
              text={text.surname}
              className="font-bold text-lg"
              containerRef={containerRef}
            />
          )}
          
          {text.name && (
            <DraggableText
              field="name"
              text={text.name}
              className="text-base"
              containerRef={containerRef}
            />
          )}
          
          {text.patronymic && (
            <DraggableText
              field="patronymic"
              text={text.patronymic}
              className="text-base"
              containerRef={containerRef}
            />
          )}
          
          {text.dates && (
            <DraggableText
              field="dates"
              text={text.dates}
              className="text-sm opacity-80"
              containerRef={containerRef}
            />
          )}
          
          {text.epitaph && (
            <DraggableText
              field="epitaph"
              text={text.epitaph}
              className="text-xs italic opacity-70"
              containerRef={containerRef}
              multiline
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Preview