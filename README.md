# Shell Application (Host)

Esta é a aplicação shell que carrega e gerencia os microfrontends via Module Federation.

## Funcionalidades

- Carrega microfrontends Angular (porta 4201)
- Carrega microfrontends React (porta 3001)
- Interface para testar componentes individuais
- Gerenciamento de estado e navegação entre microfrontends
- Tratamento de erros robusto para carregamento dos MFs

## 💻 Execução

### Pré-requisitos

```bash
# Instalar dependências
npm install
```

### Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
ng serve
```

A aplicação estará disponível em `http://localhost:4200`

## Microfrontends Conectados

### Angular Microfrontend
- **URL**: `http://localhost:4201`
- **Componentes**: 
  - `AngularComponent`
  - `SimpleComponent`

### React Microfrontend
- **URL**: `http://localhost:3001`
- **Componentes**:
  - `ReactComponent`
  - `SimpleComponent`

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── app.html           # Template principal
│   ├── app.scss          # Estilos principais
│   ├── app.ts            # Componente principal
│   ├── app.config.ts     # Configurações da aplicação
│   └── app.routes.ts     # Rotas da aplicação
├── bootstrap.ts          # Inicialização do Module Federation
└── main.ts              # Ponto de entrada da aplicação
```

## ⚙️ Configuração do Module Federation

O arquivo `webpack.config.js` configura o Module Federation para consumir os microfrontends:

```javascript
remotes: {
  "angular_mf": "http://localhost:4201/remoteEntry.js",
  "reactMF": "http://localhost:3001/remoteEntry.js"
}
```

## 🔍 Testes

```bash
# Executar testes unitários
npm test
```

## 🏗️ Build

```bash
# Build para produção
npm run build
```

O build será gerado na pasta `dist/`.

## 📋 Requisitos

- Node.js >= 16
- Angular CLI
- NPM ou Yarn

## Observações Importantes

1. Certifique-se que os microfrontends estejam rodando antes de iniciar o shell
2. Para desenvolvimento local:
   - Angular MF deve estar rodando na porta 4201
   - React MF deve estar rodando na porta 3001
3. Em caso de erro no carregamento dos MFs, verifique:
   - Se os servidores dos MFs estão rodando
   - Se as portas configuradas estão corretas
   - Se há conflitos de versões das dependências compartilhadas
