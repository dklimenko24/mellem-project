import React from 'react'
import Draggable from 'react-draggable'
import { usePlaque } from '../context/PlaqueContext'

function DraggableText({ field, text, className, containerRef, multiline = false }) {
  const { state, dispatch } = usePlaque()
  const position = state.textPositions[field]
  const { style } = state

  const handleDrag = (e, data) => {
    if (!containerRef.current) return
    
    const container = containerRef.current.getBoundingClientRect()
    const x = (data.x / container.width) * 100
    const y = (data.y / container.height) * 100
    
    dispatch({
      type: 'UPDATE_TEXT_POSITION',
      field,
      position: { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
    })
  }

  const textStyle = {
    fontFamily: style.fontFamily,
    fontSize: `${style.fontSize}px`,
    color: style.textColor,
    textAlign: style.textAlign,
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    transform: 'translate(-50%, -50%)',
    cursor: 'move',
    userSelect: 'none',
    maxWidth: '90%',
    lineHeight: multiline ? '1.4' : '1.2',
    whiteSpace: multiline ? 'pre-wrap' : 'nowrap'
  }

  return (
    <Draggable
      onDrag={handleDrag}
      bounds="parent"
      defaultPosition={{ x: 0, y: 0 }}
    >
      <div style={textStyle} className={className}>
        {text}
      </div>
    </Draggable>
  )
}

export default DraggableText