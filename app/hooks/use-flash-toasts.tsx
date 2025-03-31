import { useToast } from "@app/hooks/use-toast";
import { ToastMessage } from "@app/utils/session.server";
import { useEffect, useRef } from "react";

/**
 * Hook para processar toast messages da flash session
 * Abstraído do root para manter o código mais organizado
 */
export function useFlashToasts(messages?: ToastMessage[]) {
  const { toast, success, error, warning, info } = useToast();
  const processedMessagesRef = useRef<string[]>([]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      console.log(
        "useFlashToasts: Processando toasts da flash session:",
        messages
      );

      // Verifica se há mensagens novas para processar
      const newMessages = messages.filter(
        (msg, index) =>
          !processedMessagesRef.current.includes(
            `${index}-${msg.type}-${msg.title}`
          )
      );

      if (newMessages.length === 0) {
        console.log("useFlashToasts: Todas as mensagens já foram processadas");
        return;
      }

      console.log(
        "useFlashToasts: Novas mensagens para processar:",
        newMessages
      );

      newMessages.forEach((msg, index) => {
        const { type, title, description, titleParams, descriptionParams } =
          msg;
        const messageId = `${index}-${type}-${title}`;

        // Marca a mensagem como processada
        processedMessagesRef.current.push(messageId);

        console.log(`useFlashToasts: Exibindo toast: ${type} - ${title}`);

        switch (type) {
          case "success":
            success({ title, description, titleParams, descriptionParams });
            break;
          case "error":
            error({ title, description, titleParams, descriptionParams });
            break;
          case "warning":
            warning({ title, description, titleParams, descriptionParams });
            break;
          case "info":
            info({ title, description, titleParams, descriptionParams });
            break;
          default:
            toast({ title, description, titleParams, descriptionParams });
        }
      });
    }
  }, [messages, toast, success, error, warning, info]);
}
