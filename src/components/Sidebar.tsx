import React from 'react';
import { Folder, HardDrive, Terminal, Settings, Database, Cloud, FileText, Search } from 'lucide-react';

interface Drive {
  id: string;
  label: string;
  spaceUsed: string;
  spaceTotal: string;
}

interface SidebarProps {
  drives: Drive[];
  selectedDrive: string;
  setSelectedDrive: (drive: string) => void;
  currentView: string;
  setCurrentView: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  drives, 
  selectedDrive, 
  setSelectedDrive,
  currentView,
  setCurrentView
}) => {
  return (
    <div className="w-64 bg-white border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center">
          <HardDrive className="mr-2 h-5 w-5" />
          Gerenciador de Arquivos
        </h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Unidades
          </h3>
          <ul className="space-y-1">
            {drives.map((drive) => (
              <li key={drive.id}>
                <button
                  onClick={() => setSelectedDrive(drive.id)}
                  className={`w-full flex items-center p-2 rounded-md text-left ${
                    selectedDrive === drive.id ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {drive.id === 'G:' ? (
                    <Cloud className="mr-2 h-5 w-5" />
                  ) : (
                    <HardDrive className="mr-2 h-5 w-5" />
                  )}
                  <div className="flex-1 overflow-hidden">
                    <div className="text-sm font-medium truncate">{drive.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {drive.spaceUsed} / {drive.spaceTotal}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 drive-progress">
                      <div 
                        className="bg-blue-600 h-1.5 rounded-full" 
                        style={{ 
                          width: `${(parseInt(drive.spaceUsed) / parseInt(drive.spaceTotal.replace('TB', '000'))) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
            Ferramentas
          </h3>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => setCurrentView('explorer')}
                className={`w-full flex items-center p-2 rounded-md text-left ${
                  currentView === 'explorer' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Folder className="mr-2 h-5 w-5" />
                <span>Explorador</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('terminal')}
                className={`w-full flex items-center p-2 rounded-md text-left ${
                  currentView === 'terminal' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Terminal className="mr-2 h-5 w-5" />
                <span>Terminal</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('search')}
                className={`w-full flex items-center p-2 rounded-md text-left ${
                  currentView === 'search' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Search className="mr-2 h-5 w-5" />
                <span>Busca Avançada</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('duplicates')}
                className={`w-full flex items-center p-2 rounded-md text-left ${
                  currentView === 'duplicates' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <FileText className="mr-2 h-5 w-5" />
                <span>Duplicados</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => setCurrentView('clients')}
                className={`w-full flex items-center p-2 rounded-md text-left ${
                  currentView === 'clients' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Database className="mr-2 h-5 w-5" />
                <span>Clientes</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="p-4 border-t">
        <button
          onClick={() => setCurrentView('settings')}
          className={`w-full flex items-center p-2 rounded-md text-left ${
            currentView === 'settings' ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          <Settings className="mr-2 h-5 w-5" />
          <span>Configurações</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;