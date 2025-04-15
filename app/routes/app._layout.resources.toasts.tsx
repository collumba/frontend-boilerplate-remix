import { Button } from "@app/components/ui/button";
import { Typography } from "@app/components/ui/typography";
import { useToast, useToastI18n } from "@app/contexts/toast-context";
import { jsonWithToast, redirectWithToast } from "@app/utils/toast.server";
import { Form } from "@remix-run/react";
import { useTranslation } from "react-i18next";

export const loader = async () => {
  return jsonWithToast(
    { message: "Loader Response" },
    {
      type: "success",
      title: "Server Toast",
      description: "This toast was sent through the loader",
    }
  );
};

export const action = async () => {
  return redirectWithToast("/app/resources/toasts", {
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
        <Typography variant="h2">Technologies Used</Typography>
        <div className="prose dark:prose-invert">
          <p>The toast system uses several key technologies:</p>
          <ul>
            <li>
              <strong>Remix Session Storage:</strong> Uses cookie-based session
              storage to persist toast messages between server and client
            </li>
            <li>
              <strong>React Context:</strong> Implements a ToastContext to
              manage toast state and actions across the application
            </li>
            <li>
              <strong>i18n Integration:</strong> Supports internationalization
              through react-i18next for translated toast messages
            </li>
            <li>
              <strong>Server-Side Rendering:</strong> Supports both client-side
              and server-side toast generation
            </li>
            <li>
              <strong>Type Safety:</strong> Uses TypeScript for type-safe toast
              message handling
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
        <Typography variant="h2">Toasts Server-side</Typography>
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
