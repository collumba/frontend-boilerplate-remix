// app/routes/new-post.tsx
import { createPost } from "@app/services/character";
import { useMutation } from "@tanstack/react-query";

export default function NewPost() {
  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => alert("Post criado com sucesso!"),
  });

  return (
    <button
      onClick={() =>
        mutation.mutate({
          title: "Meu novo post",
          body: "Conteúdo do post",
        })
      }
    >
      Criar Post
    </button>
  );
}
