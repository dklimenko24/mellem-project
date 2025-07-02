import React, { useState } from 'react'
import Header from './components/Header'
import Preview from './components/Preview'
import BottomNavigation from './components/BottomNavigation'
import TextEditor from './components/TextEditor'
import StyleEditor from './components/StyleEditor'
import FrameEditor from './components/FrameEditor'
import ExportPanel from './components/ExportPanel'
import { PlaqueProvider } from './context/PlaqueContext'

function App() {
  const [activeTab, setActiveTab] = useState('text')

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'text':
        return <TextEditor />
      case 'style':
        return <StyleEditor />
      case 'frame':
        return <FrameEditor />
      case 'export':
        return <ExportPanel />
      default:
        return <TextEditor />
    }
  }

  return (
    <PlaqueProvider>
      <div className="min-h-screen bg-dark-900 flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col lg:flex-row">
          {/* Preview Section */}
          <div className="lg:w-1/2 p-4">
            <Preview />
          </div>
          
          {/* Editor Panel */}
          <div className="lg:w-1/2 flex flex-col">
            <div className="flex-1 p-4 pb-20 lg:pb-4 overflow-y-auto">
              {renderActivePanel()}
            </div>
          </div>
        </main>
        
        <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </PlaqueProvider>
  )
}

export default App