import React, { useState, useRef, useEffect } from 'react';

const TerminalComponent: React.FC = () => {
  const [history, setHistory] = useState<string[]>([
    'Bem-vindo ao Terminal Integrado do Gerenciador de Arquivos v1.0',
    'Digite "ajuda" para ver os comandos disponíveis.'
  ]);
  const [input, setInput] = useState('');
  const [currentDirectory, setCurrentDirectory] = useState('/home/user');
  const terminalRef = useRef<HTMLDivElement>(null);

  // Rolar para o final do terminal quando o histórico mudar
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  // Processar comando
  const processCommand = (cmd: string) => {
    const commandParts = cmd.trim().split(' ');
    const command = commandParts[0].toLowerCase();
    const args = commandParts.slice(1);

    let output = '';

    switch (command) {
      case 'ajuda':
        output = `
Comandos disponíveis:
  ajuda                - Mostra esta mensagem de ajuda
  limpar               - Limpa o terminal
  ls, dir              - Lista arquivos no diretório atual
  cd [diretório]       - Muda para o diretório especificado
  mkdir [nome]         - Cria um novo diretório
  rm [arquivo]         - Remove um arquivo
  rmdir [diretório]    - Remove um diretório
  cp [origem] [destino]- Copia um arquivo
  mv [origem] [destino]- Move um arquivo
  cat [arquivo]        - Mostra o conteúdo de um arquivo
  pwd                  - Mostra o diretório atual
  echo [texto]         - Exibe o texto
  data                 - Mostra a data e hora atual
`;
        break;
      case 'limpar':
      case 'clear':
        setHistory([]);
        return;
      case 'ls':
      case 'dir':
        output = `
Desktop/
Documentos/
Downloads/
Imagens/
Música/
Vídeos/
arquivo1.txt
arquivo2.pdf
planilha.xlsx
apresentacao.pptx
`;
        break;
      case 'cd':
        if (args.length === 0 || args[0] === '~') {
          setCurrentDirectory('/home/user');
          output = '';
        } else if (args[0] === '..') {
          const parts = currentDirectory.split('/');
          if (parts.length > 2) {
            parts.pop();
            setCurrentDirectory(parts.join('/'));
          }
          output = '';
        } else {
          setCurrentDirectory(`${currentDirectory}/${args[0]}`);
          output = '';
        }
        break;
      case 'pwd':
        output = currentDirectory;
        break;
      case 'mkdir':
        if (args.length === 0) {
          output = 'Erro: Nome do diretório não especificado';
        } else {
          output = `Diretório '${args[0]}' criado`;
        }
        break;
      case 'rm':
        if (args.length === 0) {
          output = 'Erro: Nome do arquivo não especificado';
        } else {
          output = `Arquivo '${args[0]}' removido`;
        }
        break;
      case 'rmdir':
        if (args.length === 0) {
          output = 'Erro: Nome do diretório não especificado';
        } else {
          output = `Diretório '${args[0]}' removido`;
        }
        break;
      case 'cp':
        if (args.length < 2) {
          output = 'Erro: Origem e destino não especificados';
        } else {
          output = `'${args[0]}' copiado para '${args[1]}'`;
        }
        break;
      case 'mv':
        if (args.length < 2) {
          output = 'Erro: Origem e destino não especificados';
        } else {
          output = `'${args[0]}' movido para '${args[1]}'`;
        }
        break;
      case 'cat':
        if (args.length === 0) {
          output = 'Erro: Nome do arquivo não especificado';
        } else {
          output = `Conteúdo do arquivo '${args[0]}':
Este é um arquivo de exemplo para demonstração do terminal integrado.
`;
        }
        break;
      case 'echo':
        output = args.join(' ');
        break;
      case 'data':
      case 'date':
        output = new Date().toLocaleString('pt-BR');
        break;
      case '':
        output = '';
        break;
      default:
        output = `Comando não reconhecido: ${command}`;
    }

    setHistory(prev => [...prev, `${currentDirectory}$ ${cmd}`, ...output.trim().split('\n').filter(line => line)]);
  };

  // Manipular envio de comando
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      processCommand(input);
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-200 rounded-lg overflow-hidden terminal-container">
      <div className="p-2 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-sm">Terminal</div>
        <div></div>
      </div>
      <div 
        ref={terminalRef}
        className="flex-1 p-4 overflow-auto font-mono text-sm"
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap mb-1">
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-2 border-t border-gray-700 flex">
        <span className="mr-2">{currentDirectory}$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none terminal-input"
          autoFocus
        />
      </form>
    </div>
  );
};

export default TerminalComponent;