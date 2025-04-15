import { themeSessionResolver } from "@app/modules/theme/sessions.server";
import { createThemeAction } from "remix-themes";

export const action = createThemeAction(themeSessionResolver);
