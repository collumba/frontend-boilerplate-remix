import { Button } from "@app/components/ui/button";
import { Typography } from "@app/components/ui/typography";
import { useToast, useToastI18n } from "@app/contexts/toast-context";
import {
  jsonWithToastNotification,
  redirectWithToastNotification,
} from "@app/utils/toast.server";
import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const loader = async () => {
  return jsonWithToastNotification(
    { message: "Loader Response" },
    {
      type: "success",
      title: "Server Toast",
      description: "This toast was sent through the loader",
    }
  );
};

export const action = async () => {
  return redirectWithToastNotification("/app/resources/toasts", {
    type: "success",
    title: "Server Toast",
    description: "This toast was sent through the action",
  });
};
/**
 * @description Remove this page after testing
 * @returns {JSX.Element}
 */
export default function ToastExamplePage() {
  const { t } = useTranslation();
  const { actions } = useToast();
  const toast = useToastI18n();

  //Function to show client toast
  const showClientToast = (type: string) => {
    switch (type) {
      case "success":
        toast.success("component.toast.success.description", { app: "Remix" });
        break;
      case "error":
        toast.error("component.toast.error.description");
        break;
      case "warning":
        toast.warning("component.toast.warning.description");
        break;
      case "info":
        toast.info("component.toast.info.description");
        break;
      default:
        actions.addToast({
          type: "default",
          title: t("component.toast.default.title"),
          description: t("component.toast.default.description"),
        });
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Typography variant="h1">Toast Examples</Typography>
      <div className="space-y-4">
        <Typography variant="h2">Tecnologias Utilizadas</Typography>
        <div className="prose dark:prose-invert">
          <p>O sistema de toasts utiliza as seguintes tecnologias:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">
                Remix Session Storage:
              </span>
              <span>
                Utiliza armazenamento de sessão baseado em cookies para
                persistir mensagens entre servidor e cliente
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">React Context:</span>
              <span>
                Implementa um ToastContext para gerenciar estado e ações dos
                toasts na aplicação
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">Integração i18n:</span>
              <span>
                Suporta internacionalização através do react-i18next para
                mensagens traduzidas
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">
                Renderização no Servidor:
              </span>
              <span>
                Suporta geração de toasts tanto no cliente quanto no servidor
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">Tipagem Segura:</span>
              <span>
                Utiliza TypeScript para manipulação segura de mensagens
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-4">
        <Typography variant="h2">Boas Práticas</Typography>
        <div className="prose dark:prose-invert">
          <p>Siga estas boas práticas ao usar toasts em sua aplicação:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">
                Mantenha as Mensagens Concisas:
              </span>
              <span>
                As mensagens devem ser curtas e objetivas, idealmente não mais
                que uma ou duas linhas
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">
                Use Tipos Apropriados:
              </span>
              <span>
                Escolha o tipo correto (sucesso, erro, aviso, informação)
                baseado no contexto
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">
                Limite a Frequência:
              </span>
              <span>
                Evite mostrar múltiplos toasts em sequência para não
                sobrecarregar os usuários
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">
                Inclua Ações Claras:
              </span>
              <span>
                Quando apropriado, forneça próximos passos ou ações claras na
                mensagem
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">
                Considere Acessibilidade:
              </span>
              <span>
                Garanta que as mensagens sejam acessíveis a leitores de tela e
                sigam as diretrizes WCAG
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">Use Traduções:</span>
              <span>
                Sempre utilize o sistema de tradução para mensagens, suportando
                internacionalização
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">
                Servidor vs Cliente:
              </span>
              <span>
                Use toasts do servidor para ações que requerem recarregamento de
                página, e do cliente para feedback imediato
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="space-y-4">
        <Typography variant="h2">Client-side Toasts</Typography>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={() => showClientToast("success")}
          >
            Success
          </Button>
          <Button variant="secondary" onClick={() => showClientToast("error")}>
            Error
          </Button>
          <Button
            variant="secondary"
            onClick={() => showClientToast("warning")}
          >
            Warning
          </Button>
          <Button variant="secondary" onClick={() => showClientToast("info")}>
            Info
          </Button>
          <Button
            variant="secondary"
            onClick={() => showClientToast("default")}
          >
            Default
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        <Typography variant="h2">Server-side Toasts</Typography>
        <div className="flex flex-wrap gap-2">
          <Form method="post">
            <Button type="submit" variant="secondary">
              Action with Toast with redirect
            </Button>
          </Form>
          <Button
            type="submit"
            variant="secondary"
            onClick={() => window.location.reload()}
          >
            Loader with Toast
          </Button>
        </div>
      </div>
    </div>
  );
}
