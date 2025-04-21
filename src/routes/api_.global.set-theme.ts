import { themeSessionResolver } from '@shared/lib/theme/sessions.server';
import { createThemeAction } from 'remix-themes';

export const action = createThemeAction(themeSessionResolver);
