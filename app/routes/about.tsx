import { Layout } from "@components/Layout";
import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sobre | Remix Boilerplate" },
    {
      name: "description",
      content: "Informações sobre o projeto Remix Boilerplate",
    },
  ];
};

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Sobre o Projeto
        </h1>

        <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
          <div className="prose dark:prose-invert max-w-none">
            <h2>Remix Boilerplate</h2>
            <p>
              Este é um projeto boilerplate para aplicações web frontend
              utilizando Remix.run e TypeScript. Foi criado para servir como
              ponto de partida para novos projetos, fornecendo uma estrutura
              básica e componentes úteis.
            </p>

            <h3>Tecnologias Utilizadas</h3>
            <ul>
              <li>
                <strong>Remix.run</strong> - Framework web fullstack baseado em
                React
              </li>
              <li>
                <strong>TypeScript</strong> - Superset tipado de JavaScript
              </li>
              <li>
                <strong>Tailwind CSS</strong> - Framework CSS utilitário
              </li>
              <li>
                <strong>React</strong> - Biblioteca JavaScript para construção
                de interfaces
              </li>
            </ul>

            <h3>Estrutura do Projeto</h3>
            <p>
              O projeto segue uma estrutura organizada para facilitar o
              desenvolvimento:
            </p>
            <ul>
              <li>
                <code>app/components</code> - Componentes React reutilizáveis
              </li>
              <li>
                <code>app/hooks</code> - Hooks personalizados do React
              </li>
              <li>
                <code>app/routes</code> - Rotas da aplicação Remix
              </li>
              <li>
                <code>app/styles</code> - Estilos e configurações do Tailwind
              </li>
              <li>
                <code>app/utils</code> - Funções utilitárias
              </li>
              <li>
                <code>app/types</code> - Definições de tipos TypeScript
              </li>
            </ul>

            <h3>Funcionalidades</h3>
            <p>Este boilerplate inclui:</p>
            <ul>
              <li>Configuração completa do Remix com TypeScript</li>
              <li>Integração com Tailwind CSS para estilização</li>
              <li>Layout responsivo com suporte a tema claro/escuro</li>
              <li>Componente de exemplo (Todo) com gerenciamento de estado</li>
              <li>Hooks personalizados para lógica reutilizável</li>
              <li>Funções utilitárias para tarefas comuns</li>
            </ul>

            <h3>Como Usar</h3>
            <p>Para começar a desenvolver com este boilerplate:</p>
            <ol>
              <li>Clone o repositório</li>
              <li>
                Instale as dependências com <code>npm install</code>
              </li>
              <li>
                Inicie o servidor de desenvolvimento com{" "}
                <code>npm run dev</code>
              </li>
              <li>
                Acesse <code>http://localhost:3000</code> no seu navegador
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
}
