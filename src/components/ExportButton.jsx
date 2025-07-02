import React, { useState } from 'react'
import { Download, Check } from 'lucide-react'
import html2canvas from 'html2canvas'

function ExportButton() {
  const [isExporting, setIsExporting] = useState(false)
  const [exported, setExported] = useState(false)

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      const previewElement = document.querySelector('[data-preview="true"]')
      
      if (!previewElement) {
        throw new Error('Preview element not found')
      }

      const canvas = await html2canvas(previewElement, {
        backgroundColor: '#ffffff',
        scale: 3,
        useCORS: true,
        allowTaint: true,
        width: previewElement.offsetWidth,
        height: previewElement.offsetHeight
      })

      const link = document.createElement('a')
      link.download = `memorial-plaque-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      link.click()
      
      setExported(true)
      setTimeout(() => setExported(false), 3000)
      
    } catch (error) {
      console.error('Export error:', error)
      alert('Ошибка при скачивании файла')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <button
        onClick={handleExport}
        disabled={isExporting}
        className={`w-full font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-3 text-lg ${
          exported 
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
        } ${isExporting ? 'opacity-75 cursor-not-allowed' : ''}`}
      >
        {exported ? (
          <>
            <Check size={24} />
            Скачано!
          </>
        ) : (
          <>
            <Download size={24} />
            {isExporting ? 'Подготовка...' : 'Скачать PNG'}
          </>
        )}
      </button>
      
      <div className="mt-3 text-center text-sm text-slate-400">
        Высокое качество • Готово для печати
      </div>
    </div>
  )
}

export default ExportButton