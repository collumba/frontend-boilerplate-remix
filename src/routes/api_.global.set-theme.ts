import { createThemeAction } from "remix-themes";
import { themeSessionResolver } from "src/modules/theme/sessions.server";

export const action = createThemeAction(themeSessionResolver);
