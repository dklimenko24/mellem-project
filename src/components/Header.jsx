import React from 'react'
import { RotateCcw } from 'lucide-react'
import { usePlaque } from '../context/PlaqueContext'

function Header() {
  const { dispatch } = usePlaque()

  const handleReset = () => {
    if (confirm('Очистить все поля?')) {
      dispatch({ type: 'RESET' })
    }
  }

  return (
    <header className="bg-gray-800 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">
          Редактор табличек
        </h1>
        
        <button
          onClick={handleReset}
          className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-colors"
          title="Очистить"
        >
          <RotateCcw size={18} className="text-white" />
        </button>
      </div>
    </header>
  )
}

export default Header