import { LoaderFunctionArgs } from "@remix-run/node";
import { themeSessionResolver } from "@services/theme/sessions.server";
import { createThemeAction } from "remix-themes";

// export const action = createThemeAction(themeSessionResolver);
export const action = createThemeAction(themeSessionResolver);
export async function loader({ request }: LoaderFunctionArgs) {
  const { getTheme } = await themeSessionResolver(request);
  return { theme: getTheme() };
}
