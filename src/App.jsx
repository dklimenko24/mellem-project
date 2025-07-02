import React from 'react'
import Header from './components/Header'
import Preview from './components/Preview'
import TextEditor from './components/TextEditor'
import ExportButton from './components/ExportButton'
import { PlaqueProvider } from './context/PlaqueContext'

function App() {
  return (
    <PlaqueProvider>
      <div className="min-h-screen bg-slate-900 flex flex-col">
        <Header />
        
        <main className="flex-1 p-4 space-y-6 max-w-4xl mx-auto w-full">
          {/* Preview Section */}
          <div className="flex-shrink-0">
            <Preview />
          </div>
          
          {/* Text Editor */}
          <div className="flex-1">
            <TextEditor />
          </div>
          
          {/* Export Button */}
          <div className="pb-6">
            <ExportButton />
          </div>
        </main>
      </div>
    </PlaqueProvider>
  )
}

export default App