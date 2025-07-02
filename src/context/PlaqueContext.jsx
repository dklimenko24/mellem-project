import React, { createContext, useContext, useReducer } from 'react'

const PlaqueContext = createContext()

const initialState = {
  text: {
    surname: 'Петрова',
    name: 'Ирина',
    patronymic: 'Васильевна',
    dates: '12.03.1898–14.05.1973',
    epitaph: 'Сердце помнит даже то, что глаза больше не видят.'
  },
  style: {
    fontFamily: 'Good Vibes Pro',
    fontSize: 24,
    textColor: '#000000',
    backgroundColor: '#ffffff',
    textAlign: 'center',
    shape: 'rectangle',
    orientation: 'horizontal',
    size: '13x18'
  },
  frame: {
    type: 'classic',
    style: 'simple',
    color: '#000000',
    width: 2
  },
  textPositions: {
    surname: { x: 50, y: 25 },
    name: { x: 50, y: 40 },
    patronymic: { x: 50, y: 55 },
    dates: { x: 50, y: 70 },
    epitaph: { x: 50, y: 85 }
  }
}

function plaqueReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TEXT':
      return {
        ...state,
        text: { ...state.text, [action.field]: action.value }
      }
    case 'UPDATE_STYLE':
      return {
        ...state,
        style: { ...state.style, [action.field]: action.value }
      }
    case 'UPDATE_FRAME':
      return {
        ...state,
        frame: { ...state.frame, [action.field]: action.value }
      }
    case 'UPDATE_TEXT_POSITION':
      return {
        ...state,
        textPositions: {
          ...state.textPositions,
          [action.field]: action.position
        }
      }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export function PlaqueProvider({ children }) {
  const [state, dispatch] = useReducer(plaqueReducer, initialState)

  return (
    <PlaqueContext.Provider value={{ state, dispatch }}>
      {children}
    </PlaqueContext.Provider>
  )
}

export function usePlaque() {
  const context = useContext(PlaqueContext)
  if (!context) {
    throw new Error('usePlaque must be used within a PlaqueProvider')
  }
  return context
}