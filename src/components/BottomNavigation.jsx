import React from 'react'
import { Type, Palette, Frame, Download } from 'lucide-react'

const tabs = [
  { id: 'text', label: 'Текст', icon: Type },
  { id: 'style', label: 'Стиль', icon: Palette },
  { id: 'frame', label: 'Рамка', icon: Frame },
  { id: 'export', label: 'Экспорт', icon: Download }
]

function BottomNavigation({ activeTab, onTabChange }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-800 border-t border-dark-700 lg:relative lg:border-t-0 lg:bg-transparent">
      <div className="flex">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className={`flex-1 flex flex-col items-center justify-center py-3 px-2 transition-all duration-200 ${
              activeTab === id
                ? 'text-primary-500 bg-primary-500/10'
                : 'text-dark-400 hover:text-dark-200 hover:bg-dark-700/50'
            }`}
          >
            <Icon size={20} className="mb-1" />
            <span className="text-xs font-medium">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}

export default BottomNavigation