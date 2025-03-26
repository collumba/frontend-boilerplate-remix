import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@app/components/ui/card";
import { Link } from "@app/components/ui/link";
import { ROUTES } from "@app/config/routes";
import {
  BookOpen,
  Calendar,
  Code2,
  Component,
  Database,
  FileSpreadsheet,
  FileText,
  Globe,
  Monitor,
  Palette,
  Rocket,
  Route,
  Shield,
  Table,
  TestTube,
  Zap,
} from "lucide-react";

export default function IndexPage() {
  const technologies = [
    {
      name: "Remix.run",
      description:
        "Framework web fullstack baseado em React para criar aplicações modernas e eficientes.",
      icon: <Rocket className="size-6 text-primary" />,
      url: "https://remix.run/",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREQaxnD9QlBXnZ7i7wV6EhBiuwO7S95PPXo0RiHAYPG73wQ7Pi7lSk-jU&usqp=CAE&s",
      version: "2.5.0",
    },
    {
      name: "TypeScript",
      description:
        "Superset tipado de JavaScript que adiciona tipos estáticos para melhorar a qualidade do código.",
      icon: <Code2 className="size-6 text-primary" />,
      url: "https://www.typescriptlang.org/",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png",
      version: "5.8.2",
    },
    {
      name: "React",
      description:
        "Biblioteca JavaScript para construção de interfaces de usuário baseadas em componentes.",
      icon: <Component className="size-6 text-primary" />,
      url: "https://reactjs.org/",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
      version: "18.2.0",
    },
    {
      name: "Tailwind CSS",
      description:
        "Framework CSS utilitário para criar designs personalizados sem sair do HTML.",
      icon: <Palette className="size-6 text-primary" />,
      url: "https://tailwindcss.com/",
      imageUrl:
        "https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg",
      version: "4.0.14",
    },
    {
      name: "shadcn/ui",
      description:
        "Componentes de UI reutilizáveis construídos com Radix UI e Tailwind CSS.",
      icon: <Monitor className="size-6 text-primary" />,
      url: "https://ui.shadcn.com/",
      imageUrl: "https://ui.shadcn.com/og.jpg",
      version: "Baseado em Radix UI",
    },
    {
      name: "i18next",
      description:
        "Framework de internacionalização para aplicações JavaScript.",
      icon: <Globe className="size-6 text-primary" />,
      url: "https://www.i18next.com/",
      imageUrl: "https://avatars.githubusercontent.com/u/8546082?s=200&v=4",
      version: "23.12.2",
    },
    {
      name: "Vite",
      description:
        "Ferramenta de build rápida para desenvolvimento moderno de aplicações web.",
      icon: <Zap className="size-6 text-primary" />,
      url: "https://vitejs.dev/",
      imageUrl: "https://vitejs.dev/logo.svg",
      version: "5.4.14",
    },
    {
      name: "Vitest",
      description:
        "Framework de testes unitários rápido e simples, integrado ao Vite.",
      icon: <TestTube className="size-6 text-primary" />,
      url: "https://vitest.dev/",
      imageUrl: "https://vitest.dev/logo.svg",
      version: "3.0.8",
    },
    {
      name: "ESLint",
      description:
        "Ferramenta de análise estática para identificar problemas no código JavaScript.",
      icon: <Shield className="size-6 text-primary" />,
      url: "https://eslint.org/",
      imageUrl: "https://eslint.org/icon.svg",
      version: "8.57.1",
    },
    {
      name: "Lucide React",
      description: "Biblioteca de ícones open-source para React.",
      icon: <BookOpen className="size-6 text-primary" />,
      url: "https://lucide.dev/",
      imageUrl: "https://lucide.dev/logo.light.svg",
      version: "0.482.0",
    },
    {
      name: "React Router",
      description: "Biblioteca de roteamento para React.",
      icon: <Route className="size-6 text-primary" />,
      url: "https://reactrouter.com/",
      imageUrl:
        "https://images.seeklogo.com/logo-png/29/2/react-router-logo-png_seeklogo-294311.png",
      version: "6.26.0",
    },
    {
      name: "React Hook Form",
      description: "Biblioteca de formulários para React.",
      icon: <FileSpreadsheet className="size-6 text-primary" />,
      url: "https://react-hook-form.com/",
      imageUrl: "https://avatars.githubusercontent.com/u/53986236?v=4&s=400",
      version: "7.55.0",
    },
    {
      name: "Zod",
      description: "Biblioteca de validação de esquemas para TypeScript.",
      icon: <FileText className="size-6 text-primary" />,
      url: "https://zod.dev/",
      imageUrl: "https://zod.dev/logo.svg",
      version: "3.23.8",
    },
    {
      name: "date-fns",
      description: "Biblioteca de manipulação de datas para TypeScript.",
      icon: <Calendar className="size-6 text-primary" />,
      url: "https://date-fns.org/",
      imageUrl: "https://avatars.githubusercontent.com/u/14921202?s=200&v=4",
      version: "4.1.0",
    },
    {
      name: "Tanstack Query",
      description: "Biblioteca de gerenciamento de dados para React.",
      icon: <Database className="size-6 text-primary" />,
      url: "https://tanstack.com/query/latest/docs/framework/react/react-native/overview.html",
      imageUrl:
        "https://tanstack.com/_build/assets/logo-color-600w-Er4SOkq1.png",
      version: "5.59.1",
    },
    {
      name: "React Table",
      description: "Biblioteca de tabelas para React.",
      icon: <Table className="size-6 text-primary" />,
      url: "https://tanstack.com/table/latest/docs/framework/react/react-native/overview.html",
      imageUrl:
        "https://tanstack.com/_build/assets/logo-color-600w-Er4SOkq1.png",
      version: "8.10.0",
    },
  ];

  return (
    <div className="container py-8 mx-auto">
      <div className="space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight animate-fade-in">
          Remix Boilerplate
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up">
          Um projeto boilerplate para aplicações web frontend utilizando
          Remix.run e TypeScript, com foco em produtividade, desempenho e
          experiência do desenvolvedor.
        </p>
        <Link to={ROUTES.app.root}>Go App</Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {technologies.map((tech, index) => (
          <a
            href={tech.url}
            target="_blank"
            rel="noopener noreferrer"
            key={tech.name}
            className="group"
          >
            <Card
              className="h-full p-2 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center gap-3 pb-1 p-3">
                <div className="p-1.5 rounded-md bg-primary/10 transition-all duration-300 group-hover:bg-primary/20">
                  {tech.icon}
                </div>
                <div className="flex flex-col">
                  <CardTitle className="text-base">{tech.name}</CardTitle>
                  <span className="text-xs text-muted-foreground">
                    v{tech.version}
                  </span>
                </div>
              </CardHeader>
              <div className="relative h-20 w-full overflow-hidden">
                <img
                  src={tech.imageUrl}
                  alt={tech.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-3 pt-1">
                <CardDescription className="text-xs">
                  {tech.description}
                </CardDescription>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}

// Add this to app/styles/globals.css if not already present
// @keyframes fade-in {
//   from { opacity: 0; }
//   to { opacity: 1; }
// }
// @keyframes fade-in-up {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
// .animate-fade-in {
//   animation: fade-in 0.6s ease forwards;
// }
// .animate-fade-in-up {
//   animation: fade-in-up 0.7s ease forwards;
// }
