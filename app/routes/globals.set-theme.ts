import { themeSessionResolver } from "@services/theme/sessions.server";
import { createThemeAction } from "remix-themes";

export const action = createThemeAction(themeSessionResolver);
