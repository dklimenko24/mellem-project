import React from 'react'
import { usePlaque } from '../context/PlaqueContext'

const fonts = [
  { name: 'Good Vibes Pro', label: 'A01 — Good Vibes Pro' },
  { name: 'Kornilow', label: 'A02 — Kornilow' },
  { name: 'Steclo', label: 'A03 — Steclo' },
  { name: 'Merriweather', label: 'A04 — Merriweather' },
  { name: 'Nuqun', label: 'A05 — Nuqun' },
  { name: 'Playfair Display', label: 'A06 — Playfair Display' },
  { name: 'Montserrat', label: 'A07 — Montserrat' },
  { name: 'Raleway-v4020', label: 'A08 — Raleway-v4020' },
  { name: 'Arimo', label: 'A09 — Arimo' },
  { name: 'Oswald', label: 'A10 — Oswald' },
  { name: 'Bitter Pro', label: 'A11 — Bitter Pro' },
  { name: 'Roboto Slab', label: 'A12 — Roboto Slab' },
  { name: 'Goznak', label: 'A13 — Goznak' },
  { name: 'Droid Serif', label: 'A14 — Droid Serif' },
  { name: 'Novelist', label: 'A15 — Novelist' },
  { name: 'Noto Serif', label: 'A16 — Noto Serif' },
  { name: 'Source Sans Pro', label: 'A17 — Source Sans Pro' },
  { name: 'Lobster', label: 'A18 — Lobster' },
  { name: 'Germano', label: 'A19 — Germano' },
  { name: 'Gamestation', label: 'A20 — Gamestation' },
  { name: 'Fira Sans', label: 'A21 — Fira Sans' },
  { name: 'Cruinn', label: 'A22 — Cruinn' },
  { name: 'Quicksand', label: 'A23 — Quicksand' },
  { name: 'Nunito', label: 'A24 — Nunito' },
  { name: 'Actinia', label: 'A25 — Actinia' },
  { name: 'PTSans', label: 'A26 — PTSans' },
  { name: 'BLAGOVEST_2', label: 'A27 — BLAGOVEST_2' },
  { name: 'Exo 2.0', label: 'A28 — Exo 2.0' },
  { name: 'Revard', label: 'A29 — Revard' },
  { name: 'Yeseva One', label: 'A30 — Yeseva One' },
  { name: 'Tipotype', label: 'A31 — Tipotype' },
  { name: 'Spectral', label: 'A32 — Spectral' },
  { name: 'Vasek', label: 'A33 — Vasek' },
  { name: 'Sweet', label: 'A34 — Sweet' }
]

function TextEditor() {
  const { state, dispatch } = usePlaque()
  const { text, style } = state

  const handleTextChange = (field, value) => {
    dispatch({ type: 'UPDATE_TEXT', field, value })
  }

  const handleStyleChange = (field, value) => {
    dispatch({ type: 'UPDATE_STYLE', field, value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-white mb-4">Редактирование</h2>
      
      <div className="space-y-6">
        {/* Text Fields */}
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
          </div>
        </div>

        {/* Font Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Шрифт
          </label>
          <select
            value={style.fontFamily}
            onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
            className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {fonts.map((font) => (
              <option key={font.name} value={font.name}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Размер шрифта: {style.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="48"
            value={style.fontSize}
            onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Shape */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
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
                className={`p-3 rounded-xl border transition-all ${
                  style.shape === value
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
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
                className={`p-3 rounded-xl border transition-all ${
                  style.orientation === value
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Размер таблички
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '9x12', label: '9×12 см' },
              { value: '13x18', label: '13×18 см' },
              { value: '17x23', label: '17×23 см' },
              { value: '18x24', label: '18×24 см' },
              { value: '30x40', label: '30×40 см' },
              { value: '40x60', label: '40×60 см' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleStyleChange('size', value)}
                className={`p-3 rounded-xl border transition-all text-sm ${
                  style.size === value
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TextEditor