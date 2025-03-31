import { Button } from "@app/components/ui/button";
import { useToast } from "@app/hooks/use-toast";
import {
  withErrorMessage,
  withInfoMessage,
  withSuccessMessage,
  withWarningMessage,
} from "@app/utils/toast-server";
import {
  json,
  type ActionFunctionArgs,
  type LoaderFunctionArgs,
} from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
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

  let data = { todos };

  if (message) {
    switch (type) {
      case "success":
        return withSuccessMessage(data, "toast.success.title", message);
      case "error":
        return withErrorMessage(data, "toast.error.title", message);
      case "warning":
        return withWarningMessage(data, "toast.warning.title", message);
      case "info":
        return withInfoMessage(data, "toast.info.title", message);
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

  if (intent === "create") {
    // Simular criação de tarefa
    return withSuccessMessage(
      { success: true },
      "toast.task.created.title",
      "toast.task.created.description",
      { count: "1" }
    );
  }

  if (intent === "delete") {
    const id = formData.get("id");
    // Simular erro
    if (id === "1") {
      return withErrorMessage(
        { success: false },
        "toast.task.error.title",
        "toast.task.error.description"
      );
    }
    // Simular exclusão com sucesso
    return withSuccessMessage(
      { success: true },
      "toast.task.deleted.title",
      "toast.task.deleted.description"
    );
  }

  return json({ success: true });
}

export default function TodosPage() {
  const { todos } = useLoaderData<typeof loader>();
  const { toast, success, error, warning, info } = useToast();

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
        <h2 className="text-xl font-semibold mb-2">Toasts do Servidor</h2>
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
