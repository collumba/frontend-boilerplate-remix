import { useToast } from "@app/hooks/use-toast";
import { ToastMessage } from "@app/utils/toast.server";
import { useEffect, useRef } from "react";

/**
 * Hook for processing toast messages from the flash session
 * Abstracted from root to keep the code more organized
 */
export function useFlashToasts(messages?: ToastMessage[]) {
  const { toast, success, error, warning, info } = useToast();
  const processedMessagesRef = useRef<string[]>([]);

  useEffect(() => {
    if (messages && messages.length > 0) {
      // Verifica se há mensagens novas para processar
      const newMessages = messages.filter(
        (msg, index) =>
          !processedMessagesRef.current.includes(
            `${index}-${msg.type}-${msg.title}`
          )
      );

      if (newMessages.length === 0) {
        return;
      }

      newMessages.forEach((msg, index) => {
        const { type, title, description, titleParams, descriptionParams } =
          msg;
        const messageId = `${index}-${type}-${title}`;

        // Marca a mensagem como processada
        processedMessagesRef.current.push(messageId);

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
