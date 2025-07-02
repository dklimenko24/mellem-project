import React from 'react'
import { RotateCcw, Palette } from 'lucide-react'
import { usePlaque } from '../context/PlaqueContext'

function Header() {
  const { dispatch } = usePlaque()

  const handleReset = () => {
    if (confirm('Очистить все поля и вернуть настройки по умолчанию?')) {
      dispatch({ type: 'RESET' })
    }
  }

  return (
    <header className="bg-slate-800 border-b border-slate-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Palette size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Редактор табличек
            </h1>
            <p className="text-sm text-slate-400">
              Создайте мемориальную табличку
            </p>
          </div>
        </div>
        
        <button
          onClick={handleReset}
          className="w-12 h-12 rounded-xl bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-all duration-200 active:scale-95 group"
          title="Сбросить все"
        >
          <RotateCcw size={18} className="text-slate-300 group-hover:text-white transition-colors" />
        </button>
      </div>
    </header>
  )
}

export default Header