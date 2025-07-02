import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

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

function FontSelector({ currentFont, onFontChange }) {
  const currentIndex = fonts.findIndex(font => font.name === currentFont)
  
  const goToPrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : fonts.length - 1
    onFontChange(fonts[newIndex].name)
  }
  
  const goToNext = () => {
    const newIndex = currentIndex < fonts.length - 1 ? currentIndex + 1 : 0
    onFontChange(fonts[newIndex].name)
  }

  const currentFontData = fonts[currentIndex]

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-lg font-semibold text-white mb-4">Шрифт</h3>
      
      <div className="flex items-center gap-4">
        <button
          onClick={goToPrevious}
          className="w-12 h-12 rounded-xl bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        
        <div className="flex-1 text-center">
          <div 
            className="text-xl font-medium text-white mb-1"
            style={{ fontFamily: currentFont }}
          >
            Образец текста
          </div>
          <div className="text-sm text-slate-400">
            {currentFontData?.label}
          </div>
        </div>
        
        <button
          onClick={goToNext}
          className="w-12 h-12 rounded-xl bg-slate-700 hover:bg-slate-600 flex items-center justify-center transition-all duration-200 active:scale-95"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>
      
      <div className="mt-4 text-center text-xs text-slate-500">
        {currentIndex + 1} из {fonts.length}
      </div>
    </div>
  )
}

export default FontSelector