import React, { useState, useEffect } from 'react';
import { Folder, File, FileText, FileImage, FileAudio, FileVideo, MoreVertical, Copy, Move, Trash, Eye, Download } from 'lucide-react';
import { getFileIcon, formatFileSize, getFileExtension } from '../utils/fileUtils';

interface FileExplorerProps {
  drive: string;
  path: string;
  setPath: (path: string) => void;
}

interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  size: number;
  modified: string;
  extension?: string;
}

const FileExplorer: React.FC<FileExplorerProps> = ({ drive, path, setPath }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'size' | 'modified'>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number; fileId: string } | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  // Simular carregamento de arquivos
  useEffect(() => {
    // Em um aplicativo real, isso seria uma chamada para uma API ou sistema de arquivos
    const mockFiles: FileItem[] = [
      { id: '1', name: 'Documentos', type: 'folder', size: 0, modified: '2023-05-15T14:30:00' },
      { id: '2', name: 'Imagens', type: 'folder', size: 0, modified: '2023-06-20T09:15:00' },
      { id: '3', name: 'Projetos', type: 'folder', size: 0, modified: '2023-07-10T16:45:00' },
      { id: '4', name: 'Relatório Financeiro.pdf', type: 'file', size: 2500000, modified: '2023-08-05T11:20:00', extension: 'pdf' },
      { id: '5', name: 'Apresentação.pptx', type: 'file', size: 5800000, modified: '2023-08-12T13:40:00', extension: 'pptx' },
      { id: '6', name: 'Planilha de Dados.xlsx', type: 'file', size: 1200000, modified: '2023-08-18T10:10:00', extension: 'xlsx' },
      { id: '7', name: 'Contrato.docx', type: 'file', size: 350000, modified: '2023-08-20T15:30:00', extension: 'docx' },
      { id: '8', name: 'Logo.png', type: 'file', size: 450000, modified: '2023-08-22T09:45:00', extension: 'png' },
      { id: '9', name: 'Áudio da Reunião.mp3', type: 'file', size: 8500000, modified: '2023-08-25T14:20:00', extension: 'mp3' },
      { id: '10', name: 'Vídeo Institucional.mp4', type: 'file', size: 25000000, modified: '2023-08-28T16:15:00', extension: 'mp4' },
    ];

    setFiles(mockFiles);
  }, [drive, path]);

  // Ordenar arquivos
  const sortedFiles = [...files].sort((a, b) => {
    // Pastas sempre aparecem primeiro
    if (a.type !== b.type) {
      return a.type === 'folder' ? -1 : 1;
    }

    // Ordenar pelo campo selecionado
    switch (sortBy) {
      case 'name':
        return sortDirection === 'asc' 
          ? a.name.localeCompare(b.name) 
          : b.name.localeCompare(a.name);
      case 'type':
        const aExt = a.extension || '';
        const bExt = b.extension || '';
        return sortDirection === 'asc' 
          ? aExt.localeCompare(bExt) 
          : bExt.localeCompare(aExt);
      case 'size':
        return sortDirection === 'asc' 
          ? a.size - b.size 
          : b.size - a.size;
      case 'modified':
        return sortDirection === 'asc' 
          ? new Date(a.modified).getTime() - new Date(b.modified).getTime() 
          : new Date(b.modified).getTime() - new Date(a.modified).getTime();
      default:
        return 0;
    }
  });

  // Manipular clique em pasta
  const handleFolderClick = (folderName: string) => {
    setPath(`${path === '/' ? '' : path}/${folderName}`);
  };

  // Manipular seleção de arquivo
  const handleFileSelect = (fileId: string, event: React.MouseEvent) => {
    if (event.ctrlKey) {
      // Seleção múltipla com Ctrl
      setSelectedFiles(prev => 
        prev.includes(fileId) 
          ? prev.filter(id => id !== fileId) 
          : [...prev, fileId]
      );
    } else {
      // Seleção única
      setSelectedFiles([fileId]);
    }
  };

  // Manipular menu de contexto
  const handleContextMenu = (event: React.MouseEvent, fileId: string) => {
    event.preventDefault();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      fileId
    });
  };

  // Fechar menu de contexto
  const closeContextMenu = () => {
    setContextMenu(null);
  };

  // Manipular navegação para o diretório pai
  const navigateToParent = () => {
    if (path === '/') return;
    const parentPath = path.substring(0, path.lastIndexOf('/'));
    setPath(parentPath || '/');
  };

  // Alternar direção de ordenação
  const toggleSort = (column: 'name' | 'type' | 'size' | 'modified') => {
    if (sortBy === column) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="h-full flex flex-col" onClick={closeContextMenu}>
      {/* Breadcrumb Navigation */}
      <div className="flex items-center mb-4 text-sm">
        <button 
          onClick={() => setPath('/')}
          className="text-blue-600 hover:underline"
        >
          {drive}
        </button>
        {path.split('/').filter(Boolean).map((segment, index, array) => (
          <React.Fragment key={index}>
            <span className="mx-1">/</span>
            <button 
              onClick={() => {
                const newPath = '/' + array.slice(0, index + 1).join('/');
                setPath(newPath);
              }}
              className="text-blue-600 hover:underline"
            >
              {segment}
            </button>
          </React.Fragment>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <button 
            onClick={navigateToParent}
            disabled={path === '/'}
            className={`px-3 py-1.5 rounded-md text-sm ${
              path === '/' 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
            }`}
          >
            Voltar
          </button>
          <button 
            className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-md text-sm hover:bg-blue-100"
            onClick={() => setViewMode(prev => prev === 'list' ? 'grid' : 'list')}
          >
            {viewMode === 'list' ? 'Visualização em Grade' : 'Visualização em Lista'}
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">
            {files.length} itens
          </span>
        </div>
      </div>

      {/* File List */}
      {viewMode === 'list' ? (
        <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-12 px-4 py-3">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedFiles(files.map(file => file.id));
                      } else {
                        setSelectedFiles([]);
                      }
                    }}
                    checked={selectedFiles.length === files.length && files.length > 0}
                  />
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Nome</span>
                    {sortBy === 'name' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('type')}
                >
                  <div className="flex items-center">
                    <span>Tipo</span>
                    {sortBy === 'type' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('size')}
                >
                  <div className="flex items-center">
                    <span>Tamanho</span>
                    {sortBy === 'size' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('modified')}
                >
                  <div className="flex items-center">
                    <span>Modificado</span>
                    {sortBy === 'modified' && (
                      <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th scope="col" className="relative px-4 py-3">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedFiles.map((file) => (
                <tr 
                  key={file.id} 
                  className={`file-item ${selectedFiles.includes(file.id) ? 'selected' : ''}`}
                  onClick={(e) => handleFileSelect(file.id, e)}
                  onContextMenu={(e) => handleContextMenu(e, file.id)}
                  onDoubleClick={() => file.type === 'folder' && handleFolderClick(file.name)}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedFiles.includes(file.id)}
                      onChange={() => {}}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      {file.type === 'folder' ? (
                        <Folder className="h-5 w-5 text-yellow-500 mr-2" />
                      ) : (
                        getFileIcon(file.extension || '')
                      )}
                      <span className="ml-2 text-sm text-gray-900">{file.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {file.type === 'folder' ? 'Pasta' : file.extension?.toUpperCase()}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {file.type === 'folder' ? '--' : formatFileSize(file.size)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(file.modified).toLocaleString('pt-BR')}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      className="text-gray-400 hover:text-gray-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleContextMenu(e, file.id);
                      }}
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {sortedFiles.map((file) => (
            <div
              key={file.id}
              className={`p-3 rounded-lg border ${
                selectedFiles.includes(file.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
              } flex flex-col items-center cursor-pointer`}
              onClick={(e) => handleFileSelect(file.id, e)}
              onContextMenu={(e) => handleContextMenu(e, file.id)}
              onDoubleClick={() => file.type === 'folder' && handleFolderClick(file.name)}
            >
              <div className="h-16 w-16 flex items-center justify-center mb-2">
                {file.type === 'folder' ? (
                  <Folder className="h-12 w-12 text-yellow-500" />
                ) : (
                  React.cloneElement(getFileIcon(file.extension || ''), { className: 'h-12 w-12' })
                )}
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-900 truncate max-w-full" style={{ maxWidth: '120px' }}>
                  {file.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {file.type === 'folder' ? 'Pasta' : formatFileSize(file.size)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Context Menu */}
      {contextMenu && (
        <div 
          className="fixed bg-white rounded-md shadow-lg z-10 border border-gray-200"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <ul className="py-1">
            <li>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <Eye className="h-4 w-4 mr-2" />
                <span>Visualizar</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <Copy className="h-4 w-4 mr-2" />
                <span>Copiar</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <Move className="h-4 w-4 mr-2" />
                <span>Mover</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                <Download className="h-4 w-4 mr-2" />
                <span>Baixar</span>
              </button>
            </li>
            <li>
              <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center">
                <Trash className="h-4 w-4 mr-2" />
                <span>Excluir</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FileExplorer;