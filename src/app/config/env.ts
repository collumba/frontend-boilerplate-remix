import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']),
  API_URL: z.string().url(),
  LOCALE_RESOURCES: z.string().url(),
  DOMAIN: z.string().url().default('http://localhost'),
});

const envVariables = {
  NODE_ENV: import.meta.env.MODE,
  API_URL: import.meta.env.VITE_API_URL,
  LOCALE_RESOURCES: import.meta.env.VITE_LOCALE_RESOURCES,
  DOMAIN: import.meta.env.VITE_DOMAIN,
};

const parsedEnv = envSchema.safeParse(envVariables);

if (!parsedEnv.success) {
  console.error(
    'Error: Invalid environment variables. Please check the following variables:',
    parsedEnv.error.format()
  );
  process.exit(1);
}

export const env = parsedEnv.data;
