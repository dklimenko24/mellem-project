import React from 'react'
import { RotateCcw } from 'lucide-react'
import { usePlaque } from '../context/PlaqueContext'

function Header() {
  const { dispatch } = usePlaque()

  const handleReset = () => {
    if (confirm('Сбросить все изменения?')) {
      dispatch({ type: 'RESET' })
    }
  }

  return (
    <header className="bg-dark-800 border-b border-dark-700 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
          Редактор табличек
        </h1>
        
        <button
          onClick={handleReset}
          className="btn-icon"
          title="Сбросить"
        >
          <RotateCcw size={20} />
        </button>
      </div>
    </header>
  )
}

export default Header