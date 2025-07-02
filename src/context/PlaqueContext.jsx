import React, { createContext, useContext, useReducer } from 'react'

const PlaqueContext = createContext()

const initialState = {
  text: {
    fullName: 'Петрова Ирина Васильевна',
    dates: '12.03.1898 – 14.05.1973',
    epitaph: 'Сердце помнит даже то,\nчто глаза больше не видят.'
  },
  style: {
    fontFamily: 'Good Vibes Pro',
    fontSize: 24,
    shape: 'rectangle',
    orientation: 'horizontal',
    size: '13x18'
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