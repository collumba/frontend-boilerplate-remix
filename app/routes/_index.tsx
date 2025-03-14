import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { Layout } from "~/components/Layout";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Boilerplate" },
    {
      name: "description",
      content:
        "Um boilerplate para aplicações web frontend com Remix.run e TypeScript",
    },
  ];
};

export default function Index() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Bem-vindo ao Remix Boilerplate
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Um ponto de partida para suas aplicações web frontend com Remix.run
            e TypeScript
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
          <FeatureCard
            title="Lista de Tarefas"
            description="Um exemplo de aplicação de lista de tarefas com gerenciamento de estado local e persistência no localStorage."
            link="/todos"
            linkText="Ver Lista de Tarefas"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />

          <FeatureCard
            title="Sobre o Projeto"
            description="Saiba mais sobre este boilerplate, sua estrutura e as tecnologias utilizadas."
            link="/about"
            linkText="Saiba Mais"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            }
          />
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Recursos do Remix
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {resources.map((resource) => (
              <a
                key={resource.href}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <div className="mb-3">{resource.icon}</div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {resource.text}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function FeatureCard({
  title,
  description,
  link,
  linkText,
  icon,
}: {
  title: string;
  description: string;
  link: string;
  linkText: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col">
      <div className="mb-4">{icon}</div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
        {description}
      </p>
      <Link
        to={link}
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        {linkText}
      </Link>
    </div>
  );
}

const resources = [
  {
    href: "https://remix.run/docs",
    text: "Documentação do Remix",
    description:
      "Aprenda como usar o Remix para construir aplicações web modernas.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    href: "https://remix.run/tutorials/blog",
    text: "Tutorial do Remix",
    description:
      "Siga o tutorial passo a passo para criar seu primeiro app com Remix.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
        />
      </svg>
    ),
  },
  {
    href: "https://github.com/remix-run/remix",
    text: "GitHub do Remix",
    description: "Contribua para o Remix ou explore o código-fonte no GitHub.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-blue-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
];
