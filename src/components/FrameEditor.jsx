import React from 'react'
import { usePlaque } from '../context/PlaqueContext'

const frameTypes = [
  { value: 'none', label: 'Без рамки', preview: 'border-0' },
  { value: 'classic', label: 'Классическая', preview: 'border-2' },
  { value: 'ornate', label: 'Орнамент', preview: 'border-4' },
  { value: 'double', label: 'Двойная', preview: 'border-2' }
]

const frameColors = [
  '#000000', '#333333', '#666666', '#999999',
  '#8B4513', '#CD853F', '#DAA520', '#FFD700'
]

function FrameEditor() {
  const { state, dispatch } = usePlaque()
  const { frame } = state

  const handleFrameChange = (field, value) => {
    dispatch({ type: 'UPDATE_FRAME', field, value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4">Рамки и орнаменты</h2>
      
      <div className="space-y-6">
        {/* Frame Type */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Тип рамки
          </label>
          <div className="grid grid-cols-2 gap-2">
            {frameTypes.map(({ value, label, preview }) => (
              <button
                key={value}
                onClick={() => handleFrameChange('type', value)}
                className={`p-4 rounded-xl border transition-all ${
                  frame.type === value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-dark-300 hover:bg-dark-600'
                }`}
              >
                <div className={`w-full h-8 bg-dark-500 rounded mb-2 ${preview}`} />
                <span className="text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Frame Width */}
        {frame.type !== 'none' && (
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Толщина рамки: {frame.width}px
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={frame.width}
              onChange={(e) => handleFrameChange('width', parseInt(e.target.value))}
              className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}

        {/* Frame Color */}
        {frame.type !== 'none' && (
          <div>
            <label className="block text-sm font-medium text-dark-300 mb-2">
              Цвет рамки
            </label>
            <div className="grid grid-cols-8 gap-2">
              {frameColors.map((color) => (
                <button
                  key={color}
                  onClick={() => handleFrameChange('color', color)}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    frame.color === color
                      ? 'border-white scale-110'
                      : 'border-dark-600 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}

        {/* Ornament Styles */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Стили орнаментов
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'simple', label: 'Простой' },
              { value: 'floral', label: 'Цветочный' },
              { value: 'geometric', label: 'Геометрический' },
              { value: 'orthodox', label: 'Православный' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleFrameChange('style', value)}
                className={`p-3 rounded-xl border transition-all ${
                  frame.style === value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-dark-300 hover:bg-dark-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Decorative Elements */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Декоративные элементы
          </label>
          <div className="space-y-2">
            {[
              { id: 'corners', label: 'Угловые элементы' },
              { id: 'dividers', label: 'Разделители' },
              { id: 'symbols', label: 'Религиозные символы' }
            ].map(({ id, label }) => (
              <label key={id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 text-primary-500 bg-dark-700 border-dark-600 rounded focus:ring-primary-500"
                />
                <span className="text-dark-300">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrameEditor