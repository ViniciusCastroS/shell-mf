import React, { useState } from 'react';
import './App.css';

// Declaração global para o webpack
declare const __webpack_share_scopes__: any;

const App: React.FC = () => {
  const [loadingMessage, setLoadingMessage] = useState('Nenhum componente carregado ainda. Use os botões acima para carregar os microfrontends.');

  const hideLoadingMessage = () => {
    setLoadingMessage('');
  };

  const showLoadingMessage = () => {
    setLoadingMessage('Nenhum componente carregado ainda. Use os botões acima para carregar os microfrontends.');
  };

  // Função utilitária para carregar script remoto
  const loadRemoteScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Verificar se o script já foi carregado
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        // Aguardar mais tempo para garantir que o container seja registrado
        setTimeout(() => resolve(), 500);
      };
      script.onerror = () => reject(new Error(`Falha ao carregar ${src}`));
      document.head.appendChild(script);
    });
  };

  const loadReactMicrofrontend = async () => {
    try {
      hideLoadingMessage();

      // Carregar o script remoto do React MF
      await loadRemoteScript('http://localhost:3001/remoteEntry.js');

      // Aguardar um pouco para garantir que o script foi processado
      await new Promise(resolve => setTimeout(resolve, 1000));

      const container = (window as any).reactMF;

      if (container && container.get) {
        try {
          // Inicializar o container
          await container.init(__webpack_share_scopes__.default);

          // Carregar o componente SimpleComponent
          const factory = await container.get('./SimpleComponent');
          const SimpleComponentModule = factory();

          // Acessar a exportação default
          const SimpleComponent = SimpleComponentModule.default || SimpleComponentModule;

          const containerElement = document.getElementById('react-container');
          if (containerElement) {
            // Limpar o container antes de montar o componente
            containerElement.innerHTML = '';

            // Criar elemento para o componente React
            const reactRoot = document.createElement('div');
            reactRoot.id = 'react-component-root';
            containerElement.appendChild(reactRoot);

            // Importar React e ReactDOM dinamicamente
            const React = (await import('react')).default;
            const ReactDOM = (await import('react-dom/client')).default;

            // Criar o componente React
            const componentElement = React.createElement(SimpleComponent, {
              title: 'React MF Component',
              initialCount: 3,
              color: '#61dafb'
            });

            // Renderizar o componente
            const root = ReactDOM.createRoot(reactRoot);
            root.render(componentElement);
          }
        } catch (error) {
          console.error('Erro ao inicializar React MF:', error);
          throw error;
        }
      } else {
        throw new Error('Container reactMF não encontrado. Verifique se o servidor está rodando na porta 3001');
      }
    } catch (error) {
      console.error('Erro ao carregar React microfrontend:', error);
      const container = document.getElementById('react-container');
      if (container) {
        container.innerHTML = `
          <div style="padding: 20px; background-color: #ffebee; color: #c62828; border-radius: 8px; margin: 10px; text-align: center;">
            <h2>❌ Erro no React MF</h2>
            <p>Não foi possível carregar o microfrontend React</p>
            <p>Erro: ${(error as Error).message}</p>
            <p>Verifique se o servidor está rodando na porta 3001</p>
          </div>
        `;
      }
    }
  };

  const loadReactSimpleComponent = async () => {
    try {
      hideLoadingMessage();

      // Carregar o script remoto do React MF
      await loadRemoteScript('http://localhost:3001/remoteEntry.js');

      // Aguardar um pouco para garantir que o script foi processado
      await new Promise(resolve => setTimeout(resolve, 1000));

      const container = (window as any).reactMF;

      if (container && container.get) {
        try {
          // Inicializar o container
          await container.init(__webpack_share_scopes__.default);

          // Carregar o componente SimpleComponent
          const factory = await container.get('./SimpleComponent');
          const SimpleComponentModule = factory();

          // Acessar a exportação default
          const SimpleComponent = SimpleComponentModule.default || SimpleComponentModule;

          const containerElement = document.getElementById('simple-container');
          if (containerElement) {
            // Limpar o container antes de montar o componente
            containerElement.innerHTML = '';

            // Criar elemento para o componente React
            const reactRoot = document.createElement('div');
            reactRoot.id = 'react-simple-component-root';
            containerElement.appendChild(reactRoot);

            // Importar React e ReactDOM dinamicamente
            const React = (await import('react')).default;
            const ReactDOM = (await import('react-dom/client')).default;

            // Criar o componente React
            const componentElement = React.createElement(SimpleComponent, {
              title: 'React Simple Component',
              initialCount: 5,
              color: '#4caf50'
            });

            // Renderizar o componente
            const root = ReactDOM.createRoot(reactRoot);
            root.render(componentElement);
          }
        } catch (error) {
          console.error('Erro ao inicializar React Simple Component:', error);
          throw error;
        }
      } else {
        throw new Error('Container reactMF não encontrado');
      }
    } catch (error) {
      console.error('Erro ao carregar React Simple Component:', error);
      const container = document.getElementById('simple-container');
      if (container) {
        container.innerHTML = `
          <div style="padding: 20px; background-color: #ffebee; color: #c62828; border-radius: 8px; margin: 10px; text-align: center;">
            <h2>❌ Erro no React Simple Component</h2>
            <p>Não foi possível carregar o componente React</p>
            <p>Erro: ${(error as Error).message}</p>
            <p>Verifique se o servidor está rodando na porta 3001</p>
          </div>
        `;
      }
    }
  };

  const clearContainers = () => {
    const containers = ['react-container', 'simple-container'];
    containers.forEach(id => {
      const container = document.getElementById(id);
      if (container) {
        container.innerHTML = '';
      }
    });
    showLoadingMessage();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        🏗️ Microfrontends Demo - Shell Application (React)
      </h1>

      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h3>Host executando na porta 4200</h3>
        <p>Esta é a aplicação shell React que carrega os microfrontends sob demanda.</p>
        <p style={{ color: '#666', fontStyle: 'italic' }}>
          Clique nos botões abaixo para carregar os componentes dinamicamente:
        </p>
      </div>

      {/* Botões de controle */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          onClick={loadReactMicrofrontend}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#61dafb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Carregar React MF
        </button>
        <button
          onClick={loadReactSimpleComponent}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#61dafb',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          React Simple
        </button>
        <button
          onClick={clearContainers}
          style={{
            padding: '10px 20px',
            margin: '5px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Limpar Tudo
        </button>
      </div>

      {/* Área de carregamento dinâmico */}
      <div style={{
        minHeight: '100px',
        border: '2px dashed #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '20px 0',
        textAlign: 'center',
        backgroundColor: '#fafafa'
      }}>
        <div id="react-container"></div>
        <div id="simple-container"></div>
        {loadingMessage && (
          <div style={{ color: '#999', fontStyle: 'italic' }}>
            {loadingMessage}
          </div>
        )}
      </div>

      <div style={{
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px'
      }}>
        <h3>Status dos Microfrontends:</h3>
        <ul>
          <li>React MF: <code>localhost:3001</code></li>
        </ul>
        <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
          💡 Dica: Certifique-se de que o servidor React MF está rodando antes de carregar os componentes.
        </p>
      </div>
    </div>
  );
};

export default App;
