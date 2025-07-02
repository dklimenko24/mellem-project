import React, { useState } from 'react'
import { Download } from 'lucide-react'
import html2canvas from 'html2canvas'

function ExportButton() {
  const [isExporting, setIsExporting] = useState(false)

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
      
      // Show success notification
      showNotification('Табличка успешно скачана!')
    } catch (error) {
      console.error('Export error:', error)
      showNotification('Ошибка при скачивании')
    } finally {
      setIsExporting(false)
    }
  }

  const showNotification = (message) => {
    const notification = document.createElement('div')
    notification.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white z-50 bg-green-500'
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 3000)
  }

  return (
    <button
      onClick={handleExport}
      disabled={isExporting}
      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-3 text-lg"
    >
      <Download size={24} />
      {isExporting ? 'Скачивание...' : 'Скачать как PNG'}
    </button>
  )
}

export default ExportButton