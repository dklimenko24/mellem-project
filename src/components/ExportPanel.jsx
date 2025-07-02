import React, { useState } from 'react'
import { Download, Share2, Save } from 'lucide-react'
import html2canvas from 'html2canvas'

function ExportPanel() {
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState('png')
  const [exportQuality, setExportQuality] = useState('high')

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      const previewElement = document.querySelector('[data-preview]') || 
                           document.querySelector('.bg-dark-800')
      
      if (!previewElement) {
        throw new Error('Preview element not found')
      }

      const canvas = await html2canvas(previewElement, {
        backgroundColor: null,
        scale: exportQuality === 'high' ? 3 : exportQuality === 'medium' ? 2 : 1,
        useCORS: true,
        allowTaint: true
      })

      const link = document.createElement('a')
      link.download = `memorial-plaque-${Date.now()}.${exportFormat}`
      link.href = canvas.toDataURL(`image/${exportFormat}`, 0.95)
      link.click()
      
      // Show success message
      showNotification('Табличка успешно скачана!', 'success')
    } catch (error) {
      console.error('Export error:', error)
      showNotification('Ошибка при экспорте', 'error')
    } finally {
      setIsExporting(false)
    }
  }

  const showNotification = (message, type) => {
    // Simple notification - could be enhanced with a proper toast system
    const notification = document.createElement('div')
    notification.className = `fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white z-50 ${
      type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`
    notification.textContent = message
    document.body.appendChild(notification)
    
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-white mb-4">Экспорт и сохранение</h2>
      
      <div className="space-y-6">
        {/* Export Format */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Формат файла
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { value: 'png', label: 'PNG (рекомендуется)' },
              { value: 'jpeg', label: 'JPEG' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setExportFormat(value)}
                className={`p-3 rounded-xl border transition-all ${
                  exportFormat === value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-dark-300 hover:bg-dark-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Export Quality */}
        <div>
          <label className="block text-sm font-medium text-dark-300 mb-2">
            Качество экспорта
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: 'low', label: 'Низкое' },
              { value: 'medium', label: 'Среднее' },
              { value: 'high', label: 'Высокое' }
            ].map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setExportQuality(value)}
                className={`p-3 rounded-xl border transition-all ${
                  exportQuality === value
                    ? 'bg-primary-500 border-primary-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-dark-300 hover:bg-dark-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <p className="text-xs text-dark-400 mt-2">
            Высокое качество создает файлы большего размера
          </p>
        </div>

        {/* Export Actions */}
        <div className="space-y-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <Download size={20} />
            {isExporting ? 'Экспорт...' : 'Скачать табличку'}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button className="btn-secondary flex items-center justify-center gap-2">
              <Save size={18} />
              Сохранить
            </button>
            
            <button className="btn-secondary flex items-center justify-center gap-2">
              <Share2 size={18} />
              Поделиться
            </button>
          </div>
        </div>

        {/* Export Info */}
        <div className="bg-dark-800 rounded-xl p-4 border border-dark-700">
          <h3 className="font-medium text-white mb-2">Информация об экспорте</h3>
          <ul className="text-sm text-dark-300 space-y-1">
            <li>• PNG формат сохраняет прозрачность</li>
            <li>• JPEG создает меньшие файлы</li>
            <li>• Высокое качество подходит для печати</li>
            <li>• Файлы сохраняются в папку загрузок</li>
          </ul>
        </div>

        {/* Offline Notice */}
        <div className="bg-green-900/20 border border-green-700 rounded-xl p-4">
          <h3 className="font-medium text-green-400 mb-2">Работа оффлайн</h3>
          <p className="text-sm text-green-300">
            Приложение работает полностью оффлайн. Все ваши данные остаются на устройстве.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ExportPanel