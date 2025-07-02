import React from 'react'
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react'
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

const backgroundColors = [
  '#ffffff', '#f8f9fa', '#e9ecef', '#dee2e6',
  '#ced4da', '#adb5bd', '#6c757d', '#495057'
]

const textColors = [
  '#000000', '#212529', '#343a40', '#495057',
  '#6c757d', '#3a0ca3', '#4361ee', '#f72585'
]

function StyleEditor() {
  const { state, dispatch } = usePlaque()
  const { style } = state

  const handleStyleChange = (field, value) => {
    dispatch({ type: 'UPDATE_STYLE', field, value })
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4">Стиль и оформление</h2>
      
      <div className="space-y-6">
        {/* Font Selection */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Шрифт
          </label>
          <select
            value={style.fontFamily}
            onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
            className="select-field w-full"
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
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Размер шрифта: {style.fontSize}px
          </label>
          <input
            type="range"
            min="12"
            max="48"
            value={style.fontSize}
            onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
            className="w-full h-2 bg-dark-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Text Alignment */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Выравнивание текста
          </label>
          <div className="flex gap-2">
            {[
              { value: 'left', icon: AlignLeft, label: 'Слева' },
              { value: 'center', icon: AlignCenter, label: 'По центру' },
              { value: 'right', icon: AlignRight, label: 'Справа' }
            ].map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                onClick={() => handleStyleChange('textAlign', value)}
                className={`flex-1 p-3 rounded-xl border transition-all ${
                  style.textAlign === value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-dark-300 hover:bg-dark-600'
                }`}
                title={label}
              >
                <Icon size={20} className="mx-auto" />
              </button>
            ))}
          </div>
        </div>

        {/* Shape */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Форма таблички
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'rectangle', label: 'Прямоугольная' },
              { value: 'oval', label: 'Овальная' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleStyleChange('shape', value)}
                className={`p-3 rounded-xl border transition-all ${
                  style.shape === value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-dark-300 hover:bg-dark-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Orientation */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Ориентация
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'horizontal', label: 'Горизонтальная' },
              { value: 'vertical', label: 'Вертикальная' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleStyleChange('orientation', value)}
                className={`p-3 rounded-xl border transition-all ${
                  style.orientation === value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-dark-300 hover:bg-dark-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Размер таблички
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: '9x12', label: '9×12 см' },
              { value: '13x18', label: '13×18 см' },
              { value: '17x23', label: '17×23 см' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleStyleChange('size', value)}
                className={`p-3 rounded-xl border transition-all text-sm ${
                  style.size === value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-dark-300 hover:bg-dark-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Цвет фона
          </label>
          <div className="grid grid-cols-8 gap-2">
            {backgroundColors.map((color) => (
              <button
                key={color}
                onClick={() => handleStyleChange('backgroundColor', color)}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  style.backgroundColor === color
                    ? 'border-white scale-110'
                    : 'border-dark-600 hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Text Color */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Цвет текста
          </label>
          <div className="grid grid-cols-8 gap-2">
            {textColors.map((color) => (
              <button
                key={color}
                onClick={() => handleStyleChange('textColor', color)}
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  style.textColor === color
                    ? 'border-white scale-110'
                    : 'border-dark-600 hover:scale-105'
                }`}
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StyleEditor