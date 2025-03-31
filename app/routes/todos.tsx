import { Button } from "@app/components/ui/button";
import { useToast } from "@app/hooks/use-toast";
import {
  createErrorToast,
  createInfoToast,
  createSuccessToast,
  createWarningToast,
} from "@app/utils/toast.server";
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useNavigate } from "@remix-run/react";
import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Info,
  Plus,
  Trash,
  XCircle,
} from "lucide-react";

// Simular dados de tarefas
const todos = [
  { id: 1, title: "Aprender Remix", completed: true },
  { id: 2, title: "Implementar sistema de toast", completed: false },
  { id: 3, title: "Integrar i18n", completed: false },
];

// Loader retorna dados e pode incluir mensagens
export async function loader({ request }: LoaderFunctionArgs) {
  // Simulação: Buscar mensagem da URL para demonstração
  const url = new URL(request.url);
  const message = url.searchParams.get("message");
  const type = url.searchParams.get("type");

  console.log("Processando loader da rota todos");

  // Vamos retornar os dados normais
  const data = { todos };

  // Se tiver mensagem nos parâmetros, vamos adicionar um toast
  if (message) {
    console.log(`Toast do servidor solicitado: ${type} - ${message}`);

    // Criar o toast baseado no tipo e redirecionar para a mesma rota sem parâmetros
    // para evitar que o toast seja mostrado novamente ao atualizar a página
    switch (type) {
      case "success":
        return createSuccessToast(
          request,
          "toast.success.title",
          message,
          undefined,
          undefined,
          "/todos"
        );

      case "error":
        return createErrorToast(
          request,
          "toast.error.title",
          message,
          undefined,
          undefined,
          "/todos"
        );

      case "warning":
        return createWarningToast(
          request,
          "toast.warning.title",
          message,
          undefined,
          undefined,
          "/todos"
        );

      case "info":
        return createInfoToast(
          request,
          "toast.info.title",
          message,
          undefined,
          undefined,
          "/todos"
        );

      default:
        return json(data);
    }
  }

  return json(data);
}

// Action que simula criação/exclusão de tarefas
export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent");

  console.log("Processando action:", intent);

  if (intent === "create") {
    // Simular criação de tarefa
    return createSuccessToast(
      request,
      "toast.task.created.title",
      "toast.task.created.description",
      { count: "1" },
      undefined,
      "/todos"
    );
  }

  if (intent === "delete") {
    const id = formData.get("id");
    console.log("Excluindo tarefa:", id);

    // Simular erro
    if (id === "1") {
      return createErrorToast(
        request,
        "toast.task.error.title",
        "toast.task.error.description",
        undefined,
        undefined,
        "/todos"
      );
    }

    // Simular exclusão com sucesso
    return createSuccessToast(
      request,
      "toast.task.deleted.title",
      "toast.task.deleted.description",
      undefined,
      undefined,
      "/todos"
    );
  }

  return json({ success: true });
}

export default function TodosPage() {
  const { toast, success, error, warning, info } = useToast();
  const navigate = useNavigate();

  // Exemplo de como usar toasts no cliente
  function handleClientToast(type: string) {
    switch (type) {
      case "success":
        success({
          title: "toast.success.title",
          description: "toast.success.description",
          titleParams: { app: "Toast" },
        });
        break;
      case "error":
        error({
          title: "toast.error.title",
          description: "toast.error.description",
        });
        break;
      case "warning":
        warning({
          title: "toast.warning.title",
          description: "toast.warning.description",
        });
        break;
      case "info":
        info({
          title: "toast.info.title",
          description: "toast.info.description",
        });
        break;
      default:
        toast({
          title: "toast.default.title",
          description: "toast.default.description",
        });
    }
  }

  // Função para navegar com parâmetros programaticamente
  // (Alternativa aos links <a> para demonstração)
  function handleServerToast(type: string) {
    const message = `Mensagem de ${type} do servidor (programático)`;
    navigate(`?message=${encodeURIComponent(message)}&type=${type}`);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sistema de Toast Demo</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Toasts no Cliente</h2>
        <p className="mb-4">
          Clique nos botões para disparar toasts do lado do cliente
        </p>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="default"
            onClick={() => handleClientToast("default")}
          >
            <Bell className="mr-2 h-4 w-4" />
            Default
          </Button>

          <Button
            variant="success"
            onClick={() => handleClientToast("success")}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Sucesso
          </Button>

          <Button
            variant="destructive"
            onClick={() => handleClientToast("error")}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Erro
          </Button>

          <Button
            variant="warning"
            onClick={() => handleClientToast("warning")}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Aviso
          </Button>

          <Button variant="info" onClick={() => handleClientToast("info")}>
            <Info className="mr-2 h-4 w-4" />
            Info
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Toasts do Servidor (Links)
        </h2>
        <p className="mb-4">
          Clique nos links abaixo para simular mensagens retornadas do servidor:
        </p>

        <div className="flex flex-wrap gap-2">
          <a href="?message=Mensagem de sucesso do servidor&type=success">
            <Button variant="success">
              <CheckCircle className="mr-2 h-4 w-4" />
              Sucesso do Servidor
            </Button>
          </a>

          <a href="?message=Mensagem de erro do servidor&type=error">
            <Button variant="destructive">
              <XCircle className="mr-2 h-4 w-4" />
              Erro do Servidor
            </Button>
          </a>

          <a href="?message=Mensagem de aviso do servidor&type=warning">
            <Button variant="warning">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Aviso do Servidor
            </Button>
          </a>

          <a href="?message=Mensagem informativa do servidor&type=info">
            <Button variant="info">
              <Info className="mr-2 h-4 w-4" />
              Info do Servidor
            </Button>
          </a>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">
          Toasts do Servidor (Programático)
        </h2>
        <p className="mb-4">
          Clique nos botões para simular navegação programática:
        </p>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="success"
            onClick={() => handleServerToast("success")}
          >
            <CheckCircle className="mr-2 h-4 w-4" />
            Sucesso (Programático)
          </Button>

          <Button
            variant="destructive"
            onClick={() => handleServerToast("error")}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Erro (Programático)
          </Button>

          <Button
            variant="warning"
            onClick={() => handleServerToast("warning")}
          >
            <AlertTriangle className="mr-2 h-4 w-4" />
            Aviso (Programático)
          </Button>

          <Button variant="info" onClick={() => handleServerToast("info")}>
            <Info className="mr-2 h-4 w-4" />
            Info (Programático)
          </Button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Tarefas com Actions</h2>
        <p className="mb-4">
          Demonstra uso de toasts com actions de formulário
        </p>

        <Form method="post" className="mb-4">
          <input type="hidden" name="intent" value="create" />
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Adicionar Tarefa
          </Button>
        </Form>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center justify-between p-3 border rounded"
            >
              <span className={todo.completed ? "line-through" : ""}>
                {todo.title}
              </span>
              <Form method="post">
                <input type="hidden" name="intent" value="delete" />
                <input type="hidden" name="id" value={todo.id} />
                <Button variant="destructive" size="sm" type="submit">
                  <Trash className="h-4 w-4" />
                </Button>
              </Form>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
