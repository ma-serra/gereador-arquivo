import React, { useState, useEffect } from 'react';
import { Folder, HardDrive, Terminal, File, Copy, Move, Search, Settings, Database, Cloud, FileText } from 'lucide-react';
import Sidebar from './components/Sidebar';
import FileExplorer from './components/FileExplorer';
import TerminalComponent from './components/Terminal';
import SettingsPanel from './components/SettingsPanel';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('explorer');
  const [selectedDrive, setSelectedDrive] = useState('C:');
  const [currentPath, setCurrentPath] = useState('/');

  // Dados simulados para demonstração
  const drives = [
    { id: 'C:', label: 'Disco Local (C:)', spaceUsed: '120GB', spaceTotal: '500GB' },
    { id: 'D:', label: 'Dados (D:)', spaceUsed: '350GB', spaceTotal: '1TB' },
    { id: 'E:', label: 'Externo (E:)', spaceUsed: '200GB', spaceTotal: '2TB' },
    { id: 'G:', label: 'Google Drive', spaceUsed: '5GB', spaceTotal: '15GB' }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar 
        drives={drives} 
        selectedDrive={selectedDrive} 
        setSelectedDrive={setSelectedDrive}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-800">Gerenciador de Arquivos Avançado</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Pesquisar arquivos..."
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          <div className="flex items-center mt-2 text-sm text-gray-600">
            <span>Caminho: {selectedDrive}{currentPath}</span>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4">
          {currentView === 'explorer' && (
            <FileExplorer 
              drive={selectedDrive} 
              path={currentPath} 
              setPath={setCurrentPath} 
            />
          )}
          {currentView === 'terminal' && (
            <TerminalComponent />
          )}
          {currentView === 'settings' && (
            <SettingsPanel />
          )}
        </main>

        {/* Status Bar */}
        <footer className="bg-white border-t p-2 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <div>
              {drives.find(d => d.id === selectedDrive)?.spaceUsed} usado de {drives.find(d => d.id === selectedDrive)?.spaceTotal}
            </div>
            <div>
              {new Date().toLocaleDateString('pt-BR')} - Gerenciador de Arquivos v1.0
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;