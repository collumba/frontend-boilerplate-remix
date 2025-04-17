import { createThemeAction } from 'remix-themes';

import { themeSessionResolver } from '@/modules/theme/sessions.server';

export const action = createThemeAction(themeSessionResolver);
