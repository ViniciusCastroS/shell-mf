import { Component, signal, OnInit } from '@angular/core';
import { loadRemoteModule } from '@angular-architects/module-federation';

declare const __webpack_share_scopes__: any;

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('shell');

  ngOnInit() {

  }

  private hideLoadingMessage() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.style.display = 'none';
    }
  }

  private showLoadingMessage() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
      loadingMessage.style.display = 'block';
    }
  }

  async loadAngularMicrofrontend() {
    try {
      this.hideLoadingMessage();
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './AngularComponent'
      });

      if (m && m.AngularComponent) {
        const container = document.getElementById('angular-container');
        if (container) {
          container.innerHTML = `
            <div style="padding: 20px; background-color: #dd0031; color: white; border-radius: 8px; margin: 10px; text-align: center;">
              <h2>🅰️ Angular Microfrontend</h2>
              <p>Carregado com sucesso via Module Federation!</p>
              <p>Executando na porta 4201</p>
            </div>
          `;
        }
      }
    } catch (error) {
      console.error('Erro ao carregar Angular microfrontend:', error);
      const container = document.getElementById('angular-container');
      if (container) {
        container.innerHTML = `
          <div style="padding: 20px; background-color: #ffebee; color: #c62828; border-radius: 8px; margin: 10px; text-align: center;">
            <h2>❌ Erro no Angular MF</h2>
            <p>Não foi possível carregar o microfrontend Angular</p>
            <p>Erro: ${(error as Error).message}</p>
            <p>Verifique se o servidor está rodando na porta 4201</p>
          </div>
        `;
      }
    }
  }

  async loadReactMicrofrontend() {
    try {
      this.hideLoadingMessage();
      // Usar Module Federation nativo para carregar o React MF
      const script = document.createElement('script');
      script.src = 'http://localhost:3001/remoteEntry.js';
      script.onload = async () => {
        const container = (window as any).reactMF;
        if (container && container.get) {
          await container.init(__webpack_share_scopes__.default);
          const factory = await container.get('./ReactComponent');
          const ReactComponent = factory();

          const containerElement = document.getElementById('react-container');
          if (containerElement) {
            containerElement.innerHTML = `
              <div style="padding: 20px; background-color: #61dafb; border-radius: 8px; margin: 10px; text-align: center;">
                <h2>🚀 React Microfrontend</h2>
                <p>Carregado com sucesso via Module Federation nativo!</p>
                <p>Executando na porta 3001</p>
              </div>
            `;
          }
        }
      };
      script.onerror = () => {
        throw new Error('Falha ao carregar remoteEntry.js');
      };
      document.head.appendChild(script);
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
  }

  async loadAngularSimpleComponent() {
    try {
      this.hideLoadingMessage();
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './SimpleComponent'
      });

      const container = document.getElementById('simple-container');
      if (container) {
        container.innerHTML = `
          <div style="padding: 20px; background-color: #ff6b35; border-radius: 8px; margin: 10px; text-align: center;">
            <h2>🎯 Angular Simple Component</h2>
            <p>Componente Angular simples carregado!</p>
            <p>Executando na porta 4201</p>
          </div>
        `;
      }
    } catch (error) {
      console.error('Erro ao carregar Angular Simple Component:', error);
    }
  }

  async loadReactSimpleComponent() {
    try {
      this.hideLoadingMessage();
      const script = document.createElement('script');
      script.src = 'http://localhost:3001/remoteEntry.js';
      script.onload = async () => {
        const container = (window as any).reactMF;
        if (container && container.get) {
          await container.init(__webpack_share_scopes__.default);
          const factory = await container.get('./SimpleComponent');
          const SimpleComponent = factory();

          const containerElement = document.getElementById('simple-container');
          if (containerElement) {
            containerElement.innerHTML = `
              <div style="padding: 20px; background-color: #61dafb; border-radius: 8px; margin: 10px; text-align: center;">
                <h2>🚀 React Simple Component</h2>
                <p>Componente React simples carregado!</p>
                <p>Executando na porta 3001</p>
              </div>
            `;
          }
        }
      };
      document.head.appendChild(script);
    } catch (error) {
      console.error('Erro ao carregar React Simple Component:', error);
    }
  }

  clearContainers() {
    const containers = ['angular-container', 'react-container', 'simple-container'];
    containers.forEach(id => {
      const container = document.getElementById(id);
      if (container) {
        container.innerHTML = '';
      }
    });
    this.showLoadingMessage();
  }
}
