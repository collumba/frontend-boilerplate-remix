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

## Implementações Detalhadas

O boilerplate contém as seguintes implementações:

1. **Core Framework**:

   - Remix.run setup com TypeScript
   - Integração com React 18
   - React Query para busca e cache de dados

2. **Sistema de Componentes UI**:

   - Biblioteca abrangente com mais de 35 componentes:
     - Básicos: Button, Input, Textarea, Select
     - Avançados: DataTable, MultiSelect, MaskedInput
     - Layout: Card, Dialog, Popover, Sidebar
     - Feedback: Toast, Skeleton, EmptyState
     - Componentes de formulário com suporte a validação
   - Componentes responsivos
   - Alternância de temas (modo claro/escuro)

3. **Autenticação & Autorização**:

   - Sistema de autenticação com formulários de login/registro
   - Contexto e hooks de autenticação
   - Rotas protegidas

4. **Internacionalização (i18n)**:

   - Suporte para múltiplos idiomas
   - Componente de troca de idioma
   - Conteúdo localizado

5. **Formulários & Validação**:

   - Componentes de formulário com validação
   - Formulário de entidade com manipulação de dados complexos
   - Suporte a input com máscara

6. **Gerenciamento de Dados**:

   - Módulo MDM (Master Data Management)
   - Camada de serviço API
   - Hooks para busca de dados (useTable, useDataTable)

7. **Navegação & Layout**:

   - Sidebar da aplicação
   - Componentes de navegação (NavMain, NavUser, NavProjects)
   - Layouts de página
   - Navegação por breadcrumb

8. **Roteamento**:

   - Estrutura de rotas aninhadas
   - Roteamento baseado em layout
   - Rotas de API para funcionalidades de backend

9. **Gerenciamento de Estado**:

   - Implementação da Context API
   - React Query para estado do servidor
   - Hooks personalizados para gerenciamento de estado

10. **Estilização & Sistema de Design**:

    - Integração com Tailwind CSS
    - Padrões consistentes de UI/UX
    - Sistema de tipografia
    - Tematização personalizada

11. **Utilitários**:

    - Sistema de notificações toast
    - Gerenciamento de cookies
    - Formatação de datas
    - Componentes apenas para cliente
    - Tratamento de erros

12. **Experiência do Desenvolvedor**:

    - Configuração TypeScript
    - Configuração ESLint
    - Integração com VS Code
    - Documentação

13. **Integração com API**:

    - Wrapper Fetch
    - Manipulação de requisições/respostas
    - Tratamento de erros

14. **Configuração de Testes**:
    - Configuração Vitest para testes

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
