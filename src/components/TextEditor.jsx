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
      <h2 className="text-xl font-semibold text-white mb-4">Редактирование текста</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Фамилия *
          </label>
          <input
            type="text"
            value={text.surname}
            onChange={(e) => handleTextChange('surname', e.target.value)}
            className="input-field w-full"
            placeholder="Введите фамилию"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Имя
          </label>
          <input
            type="text"
            value={text.name}
            onChange={(e) => handleTextChange('name', e.target.value)}
            className="input-field w-full"
            placeholder="Введите имя"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Отчество
          </label>
          <input
            type="text"
            value={text.patronymic}
            onChange={(e) => handleTextChange('patronymic', e.target.value)}
            className="input-field w-full"
            placeholder="Введите отчество"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Даты жизни
          </label>
          <input
            type="text"
            value={text.dates}
            onChange={(e) => handleTextChange('dates', e.target.value)}
            className="input-field w-full"
            placeholder="дд.мм.гггг–дд.мм.гггг"
          />
          <p className="text-xs text-dark-400 mt-1">
            Формат: дд.мм.гггг–дд.мм.гггг
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Эпитафия
          </label>
          <textarea
            value={text.epitaph}
            onChange={(e) => handleTextChange('epitaph', e.target.value)}
            className="input-field w-full h-24 resize-none"
            placeholder="Введите эпитафию"
          />
          <p className="text-xs text-dark-400 mt-1">
            Текст будет автоматически переноситься на несколько строк
          </p>
        </div>
      </div>
    </div>
  )
}

export default TextEditor