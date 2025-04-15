import { themeSessionResolver } from "@/modules/theme/sessions.server";
import { createThemeAction } from "remix-themes";

export const action = createThemeAction(themeSessionResolver);
