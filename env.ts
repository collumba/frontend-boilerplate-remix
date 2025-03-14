import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  API_URL: z.string().url(),
  // Adicione outras variáveis de ambiente conforme necessário
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Variáveis de ambiente inválidas:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
