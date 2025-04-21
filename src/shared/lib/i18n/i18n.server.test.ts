import { beforeEach, describe, expect, test, vi } from 'vitest';

// Define mocks before importing the module
vi.mock('@remix-run/node', () => ({
  createCookie: vi.fn().mockImplementation(() => ({
    parse: vi.fn().mockResolvedValue(null),
  })),
}));

vi.mock('@/config/i18n', () => ({
  supportedLngs: ['en', 'pt-BR', 'es'],
  fallbackLng: 'en',
  defaultNS: 'translation',
  resources: {
    en: { translation: { test: 'Test' } },
    'pt-BR': { translation: { test: 'Teste' } },
    es: { translation: { test: 'Prueba' } },
  },
}));

// Import after the mocks
import i18nServer from './i18n.server';

describe('i18n Server Module', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('getFixedT returns translation function', async () => {
    // Create a request mock
    const request = new Request('http://localhost:3000');

    // Get translation function
    const t = await i18nServer.getFixedT(request);

    // Verify if it is a function
    expect(typeof t).toBe('function');
  });

  test('getFixedT works with Accept-Language header', async () => {
    // Create request with Accept-Language
    const request = new Request('http://localhost:3000', {
      headers: {
        'Accept-Language': 'pt-BR,pt;q=0.9,en;q=0.8',
      },
    });

    // Get translation function
    const t = await i18nServer.getFixedT(request);

    // Verify if it is a function
    expect(typeof t).toBe('function');
  });
});
