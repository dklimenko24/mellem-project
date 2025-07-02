import React from 'react'
import { usePlaque } from '../context/PlaqueContext'
import FontSelector from './FontSelector'
import SizeInput from './SizeInput'

function TextEditor() {
  const { state, dispatch } = usePlaque()
  const { text, style } = state

  const handleTextChange = (field, value) => {
    dispatch({ type: 'UPDATE_TEXT', field, value })
  }

  const handleStyleChange = (field, value) => {
    dispatch({ type: 'UPDATE_STYLE', field, value })
  }

  const handleSizeChange = (width, height) => {
    dispatch({ type: 'UPDATE_SIZE', width, height })
  }

  const handleFontChange = (fontFamily) => {
    dispatch({ type: 'UPDATE_STYLE', field: 'fontFamily', value: fontFamily })
  }

  return (
    <div className="space-y-6">
      {/* Font Selector - First */}
      <FontSelector 
        currentFont={style.fontFamily}
        onFontChange={handleFontChange}
      />

      {/* Text Fields */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Текст</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              ФИО
            </label>
            <input
              type="text"
              value={text.fullName}
              onChange={(e) => handleTextChange('fullName', e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
              placeholder="Фамилия Имя Отчество"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Даты жизни
            </label>
            <input
              type="text"
              value={text.dates}
              onChange={(e) => handleTextChange('dates', e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all duration-200"
              placeholder="дд.мм.гггг – дд.мм.гггг"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Эпитафия
            </label>
            <textarea
              value={text.epitaph}
              onChange={(e) => handleTextChange('epitaph', e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded-xl px-4 py-4 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg h-28 resize-none transition-all duration-200"
              placeholder="Памятный текст"
            />
          </div>
        </div>
      </div>

      {/* Size Input */}
      <SizeInput 
        width={style.width}
        height={style.height}
        onSizeChange={handleSizeChange}
      />

      {/* Shape and Orientation */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Форма и ориентация</h3>
        
        <div className="space-y-6">
          {/* Shape */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Форма таблички
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'rectangle', label: 'Прямоугольная' },
                { value: 'oval', label: 'Овальная' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleStyleChange('shape', value)}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    style.shape === value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <div className="text-sm font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Orientation */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              Ориентация
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: 'horizontal', label: 'Горизонтальная' },
                { value: 'vertical', label: 'Вертикальная' }
              ].map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => handleStyleChange('orientation', value)}
                  className={`p-4 rounded-xl border transition-all duration-200 ${
                    style.orientation === value
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  <div className="text-sm font-medium">{label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextEditor