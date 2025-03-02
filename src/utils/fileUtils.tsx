import React from 'react';
import { FileText, FileImage, FileAudio, FileVideo, File, FileCode, FilePieChart, FileArchive } from 'lucide-react';

// Função para obter o ícone apropriado com base na extensão do arquivo
export const getFileIcon = (extension: string) => {
  const ext = extension.toLowerCase();
  
  // Documentos
  if (['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt'].includes(ext)) {
    return <FileText className="h-5 w-5 text-blue-500 mr-2" />;
  }
  
  // Planilhas
  if (['xls', 'xlsx', 'csv', 'ods'].includes(ext)) {
    return <FilePieChart className="h-5 w-5 text-green-500 mr-2" />;
  }
  
  // Apresentações
  if (['ppt', 'pptx', 'odp'].includes(ext)) {
    return <FilePieChart className="h-5 w-5 text-orange-500 mr-2" />;
  }
  
  // Imagens
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext)) {
    return <FileImage className="h-5 w-5 text-purple-500 mr-2" />;
  }
  
  // Áudio
  if (['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a'].includes(ext)) {
    return <FileAudio className="h-5 w-5 text-yellow-500 mr-2" />;
  }
  
  // Vídeo
  if (['mp4', 'avi', 'mov', 'wmv', 'mkv', 'webm'].includes(ext)) {
    return <FileVideo className="h-5 w-5 text-red-500 mr-2" />;
  }
  
  // Código
  if (['html', 'css', 'js', 'jsx', 'ts', 'tsx', 'json', 'xml', 'py', 'java', 'c', 'cpp', 'php'].includes(ext)) {
    return <FileCode className="h-5 w-5 text-indigo-500 mr-2" />;
  }
  
  // Arquivos compactados
  if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) {
    return <FileArchive className="h-5 w-5 text-gray-500 mr-2" />;
  }
  
  // Padrão para outros tipos de arquivo
  return <File className="h-5 w-5 text-gray-500 mr-2" />;
};

// Função para formatar o tamanho do arquivo
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Função para obter a extensão de um arquivo
export const getFileExtension = (filename: string): string => {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
};

// Função para verificar se um arquivo é uma imagem
export const isImageFile = (filename: string): boolean => {
  const ext = getFileExtension(filename).toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp'].includes(ext);
};

// Função para verificar se um arquivo é um documento
export const isDocumentFile = (filename: string): boolean => {
  const ext = getFileExtension(filename).toLowerCase();
  return ['pdf', 'doc', 'docx', 'txt', 'rtf', 'odt', 'xls', 'xlsx', 'csv', 'ppt', 'pptx'].includes(ext);
};

// Função para verificar se um arquivo é um arquivo de mídia
export const isMediaFile = (filename: string): boolean => {
  const ext = getFileExtension(filename).toLowerCase();
  return ['mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a', 'mp4', 'avi', 'mov', 'wmv', 'mkv', 'webm'].includes(ext);
};