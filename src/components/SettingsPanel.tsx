import React, { useState } from 'react';
import { Cloud, Database, FileText, Settings, Save } from 'lucide-react';

const SettingsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    general: {
      language: 'pt-BR',
      theme: 'light',
      showHiddenFiles: false,
      confirmBeforeDelete: true,
      autoRefresh: true
    },
    integrations: {
      googleDriveEnabled: false,
      googleDriveEmail: '',
      googleDriveAutoSync: false,
      gptEnabled: false,
      gptApiKey: '',
      ocrEnabled: false,
      whisperEnabled: false
    },
    advanced: {
      terminalEnabled: true,
      debugMode: false,
      cacheSize: 500,
      maxSearchResults: 100,
      concurrentOperations: 3
    }
  });

  const handleSettingChange = (
    category: 'general' | 'integrations' | 'advanced',
    setting: string,
    value: string | boolean | number
  ) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const saveSettings = () => {
    // Em um aplicativo real, isso salvaria as configurações em um arquivo ou banco de dados
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="border-b">
        <div className="flex">
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'general'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('general')}
          >
            <div className="flex items-center">
              <Settings className="h-4 w-4 mr-2" />
              Geral
            </div>
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'integrations'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('integrations')}
          >
            <div className="flex items-center">
              <Cloud className="h-4 w-4 mr-2" />
              Integrações
            </div>
          </button>
          <button
            className={`px-4 py-3 text-sm font-medium ${
              activeTab === 'advanced'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('advanced')}
          >
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              Avançado
            </div>
          </button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Configurações Gerais</h2>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700">
                  Idioma
                </label>
                <select
                  id="language"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={settings.general.language}
                  onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                >
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es">Español</option>
                </select>
              </div>

              <div>
                <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                  Tema
                </label>
                <select
                  id="theme"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  value={settings.general.theme}
                  onChange={(e) => handleSettingChange('general', 'theme', e.target.value)}
                >
                  <option value="light">Claro</option>
                  <option value="dark">Escuro</option>
                  <option value="system">Sistema</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="showHiddenFiles"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={settings.general.showHiddenFiles}
                  onChange={(e) => handleSettingChange('general', 'showHiddenFiles', e.target.checked)}
                />
                <label htmlFor="showHiddenFiles" className="ml-2 block text-sm text-gray-700">
                  Mostrar arquivos ocultos
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="confirmBeforeDelete"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={settings.general.confirmBeforeDelete}
                  onChange={(e) => handleSettingChange('general', 'confirmBeforeDelete', e.target.checked)}
                />
                <label htmlFor="confirmBeforeDelete" className="ml-2 block text-sm text-gray-700">
                  Confirmar antes de excluir
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="autoRefresh"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={settings.general.autoRefresh}
                  onChange={(e) => handleSettingChange('general', 'autoRefresh', e.target.checked)}
                />
                <label htmlFor="autoRefresh" className="ml-2 block text-sm text-gray-700">
                  Atualizar automaticamente
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'integrations' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Integrações</h2>
            
            <div className="p-4 border rounded-md bg-gray-50">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="googleDriveEnabled"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.integrations.googleDriveEnabled}
                    onChange={(e) => handleSettingChange('integrations', 'googleDriveEnabled', e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="googleDriveEnabled" className="font-medium text-gray-700">Google Drive</label>
                  <p className="text-gray-500">Integrar com o Google Drive para sincronizar arquivos na nuvem.</p>
                </div>
              </div>

              {settings.integrations.googleDriveEnabled && (
                <div className="mt-4 ml-7 space-y-4">
                  <div>
                    <label htmlFor="googleDriveEmail" className="block text-sm font-medium text-gray-700">
                      Email do Google
                    </label>
                    <input
                      type="email"
                      id="googleDriveEmail"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={settings.integrations.googleDriveEmail}
                      onChange={(e) => handleSettingChange('integrations', 'googleDriveEmail', e.target.value)}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      id="googleDriveAutoSync"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={settings.integrations.googleDriveAutoSync}
                      onChange={(e) => handleSettingChange('integrations', 'googleDriveAutoSync', e.target.checked)}
                    />
                    <label htmlFor="googleDriveAutoSync" className="ml-2 block text-sm text-gray-700">
                      Sincronizar automaticamente
                    </label>
                  </div>

                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Conectar ao Google Drive
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 border rounded-md bg-gray-50">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="gptEnabled"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.integrations.gptEnabled}
                    onChange={(e) => handleSettingChange('integrations', 'gptEnabled', e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="gptEnabled" className="font-medium text-gray-700">GPT (Inteligência Artificial)</label>
                  <p className="text-gray-500">Usar IA para classificação de documentos e correspondência.</p>
                </div>
              </div>

              {settings.integrations.gptEnabled && (
                <div className="mt-4 ml-7 space-y-4">
                  <div>
                    <label htmlFor="gptApiKey" className="block text-sm font-medium text-gray-700">
                      Chave de API
                    </label>
                    <input
                      type="password"
                      id="gptApiKey"
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={settings.integrations.gptApiKey}
                      onChange={(e) => handleSettingChange('integrations', 'gptApiKey', e.target.value)}
                    />
                  </div>

                  <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Testar Conexão
                  </button>
                </div>
              )}
            </div>

            <div className="p-4 border rounded-md bg-gray-50">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="ocrEnabled"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.integrations.ocrEnabled}
                    onChange={(e) => handleSettingChange('integrations', 'ocrEnabled', e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="ocrEnabled" className="font-medium text-gray-700">OCR (Reconhecimento de Texto)</label>
                  <p className="text-gray-500">Extrair texto de imagens e documentos digitalizados.</p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-md bg-gray-50">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="whisperEnabled"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={settings.integrations.whisperEnabled}
                    onChange={(e) => handleSettingChange('integrations', 'whisperEnabled', e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="whisperEnabled" className="font-medium text-gray-700">Whisper (Transcrição de Áudio)</label>
                  <p className="text-gray-500">Transcrever arquivos de áudio para texto.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <h2 className="text-lg font-medium text-gray-900">Configurações Avançadas</h2>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <input
                  id="terminalEnabled"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={settings.advanced.terminalEnabled}
                  onChange={(e) => handleSettingChange('advanced', 'terminalEnabled', e.target.checked)}
                />
                <label htmlFor="terminalEnabled" className="ml-2 block text-sm text-gray-700">
                  Habilitar Terminal Integrado
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="debugMode"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={settings.advanced.debugMode}
                  onChange={(e) => handleSettingChange('advanced', 'debugMode', e.target.checked)}
                />
                <label htmlFor="debugMode" className="ml-2 block text-sm text-gray-700">
                  Modo de Depuração
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="cacheSize" className="block text-sm font-medium text-gray-700">
                  Tamanho do Cache (MB)
                </label>
                <input
                  type="number"
                  id="cacheSize"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={settings.advanced.cacheSize}
                  onChange={(e) => handleSettingChange('advanced', 'cacheSize', parseInt(e.target.value))}
                />
              </div>

              <div>
                <label htmlFor="maxSearchResults" className="block text-sm font-medium text-gray-700">
                  Máximo de Resultados de Busca
                </label>
                <input
                  type="number"
                  id="maxSearchResults"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={settings.advanced.maxSearchResults}
                  onChange={(e) => handleSettingChange('advanced', 'maxSearchResults', parseInt(e.target.value))}
                />
              </div>

              <div>
                <label htmlFor="concurrentOperations" className="block text-sm font-medium text-gray-700">
                  Operações Simultâneas
                </label>
                <input
                  type="number"
                  id="concurrentOperations"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={settings.advanced.concurrentOperations}
                  onChange={(e) => handleSettingChange('advanced', 'concurrentOperations', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div className="p-4 border rounded-md bg-red-50">
              <h3 className="text-sm font-medium text-red-800">Zona de Perigo</h3>
              <p className="mt-1 text-sm text-red-700">Estas ações podem causar perda de dados ou configurações.</p>
              <div className="mt-4 space-x-4">
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Limpar Cache
                </button>
                <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                  Redefinir Configurações
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t p-4 flex justify-end">
        <button
          onClick={saveSettings}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Save className="h-4 w-4 mr-2" />
          Salvar Configurações
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;