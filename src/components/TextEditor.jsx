import React from 'react'
import { usePlaque } from '../context/PlaqueContext'

function TextEditor() {
  const { state, dispatch } = usePlaque()
  const { text } = state

  const handleTextChange = (field, value) => {
    dispatch({ type: 'UPDATE_TEXT', field, value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white mb-4">Введите текст</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            ФИО
          </label>
          <input
            type="text"
            value={text.fullName}
            onChange={(e) => handleTextChange('fullName', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="Фамилия Имя Отчество"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Даты жизни
          </label>
          <input
            type="text"
            value={text.dates}
            onChange={(e) => handleTextChange('dates', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            placeholder="дд.мм.гггг – дд.мм.гггг"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Эпитафия
          </label>
          <textarea
            value={text.epitaph}
            onChange={(e) => handleTextChange('epitaph', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg h-24 resize-none"
            placeholder="Памятный текст"
          />
          <p className="text-xs text-gray-400 mt-1">
            Используйте Enter для переноса строк
          </p>
        </div>
      </div>
    </div>
  )
}

export default TextEditor