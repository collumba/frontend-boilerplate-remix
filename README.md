# Remix Boilerplate

Um projeto boilerplate para aplicações web frontend utilizando Remix.run e TypeScript.

## Tecnologias Utilizadas

- **Remix.run** - Framework web fullstack baseado em React
- **TypeScript** - Superset tipado de JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **React** - Biblioteca JavaScript para construção de interfaces

## Estrutura do Projeto

O projeto segue uma estrutura organizada para facilitar o desenvolvimento:

- `app/components` - Componentes React reutilizáveis
- `app/hooks` - Hooks personalizados do React
- `app/routes` - Rotas da aplicação Remix
- `app/styles` - Estilos e configurações do Tailwind
- `app/utils` - Funções utilitárias
- `app/types` - Definições de tipos TypeScript

## Funcionalidades

Este boilerplate inclui:

- Configuração completa do Remix com TypeScript
- Integração com Tailwind CSS para estilização
- Layout responsivo com suporte a tema claro/escuro
- Componente de exemplo (Todo) com gerenciamento de estado
- Hooks personalizados para lógica reutilizável
- Funções utilitárias para tarefas comuns

## Começando

### Pré-requisitos

- Node.js (versão 20.0.0 ou superior)
- npm (incluído com Node.js)

### Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/frontend-boilerplate-remix.git
   cd frontend-boilerplate-remix
   ```

2. Instale as dependências:

   ```bash
   rm -rf .vite .cache node_modules build && npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   rm -rf .vite .cache node_modules build
   npm install
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver a aplicação.

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm start` - Inicia o servidor de produção
- `npm run typecheck` - Verifica os tipos TypeScript
- `npm run lint` - Executa o linter para verificar o código

## Implantação

Para implantar a aplicação em produção:

1. Execute o comando de build:

   ```bash
   npm run build
   ```

2. Inicie o servidor de produção:
   ```bash
   npm start
   ```

Para mais informações sobre implantação, consulte a [documentação do Remix](https://remix.run/docs/en/main/guides/deployment).

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
