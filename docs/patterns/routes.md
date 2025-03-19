# 📚 Guia de Boas Práticas para Rotas no Remix

Este documento descreve as melhores práticas para organizar e nomear as rotas em um projeto Remix, garantindo uma estrutura limpa, escalável e fácil de manter.

---

## 📂 Estrutura de Diretórios Recomendada

Organize as rotas dentro da pasta `/routes` para refletir a hierarquia do aplicativo:

```bash
app/
├── components/          # Componentes reutilizáveis
├── routes/              # Rotas do Remix
│    ├── _layout.tsx        # Layout principal
│    ├── index.tsx          # Rota raiz (/)
│    ├── about.tsx          # Página "Sobre" (/about)
│    ├── dashboard/         # Grupo de rotas aninhadas
│    │    ├── _layout.tsx   # Layout do Dashboard
│    │    ├── index.tsx     # /dashboard
│    │    └── settings.tsx  # /dashboard/settings
│    ├── blog/
│    │    ├── index.tsx     # Lista de posts (/blog)
│    │    └── $postId.tsx   # Post individual (/blog/:postId)
│    └── api_/
│         └── user.resource.ts # Endpoint de API (/api/user)
└── utils/               # Funções utilitárias
```

### ✅ Boas práticas gerais:

- **Rotas simples**: Use `index.tsx` para representar a raiz de um diretório.
- **Rotas aninhadas**: Use pastas para refletir a hierarquia de URL.
- **Rotas dinâmicas**: Utilize `$param.tsx` para capturar parâmetros dinâmicos.
- **Rotas de API**: Centralize endpoints REST em `*.resource.ts`.
- **Rotas privadas**: Utilize `loader()` para validar autenticação.

---

## 📌 Regras de Nomenclatura

### 1. **Rota Simples**

Use um arquivo `.tsx` para definir rotas básicas:

```bash
routes/
├── index.tsx   → /
└── about.tsx   → /about
```

### 2. **Rota Aninhada (Nested Route)**

Use diretórios para organizar rotas aninhadas:

```bash
routes/
└── dashboard/
     ├── index.tsx      → /dashboard
     └── settings.tsx   → /dashboard/settings
```

### 3. **Rota Dinâmica**

Utilize `$param.tsx` para parâmetros dinâmicos:

```bash
routes/
└── blog/
     └── $postId.tsx → /blog/:postId
```

### 4. **Rota com Múltiplos Parâmetros**

Combine múltiplos parâmetros dinâmicos usando `$`:

```bash
routes/
└── shop/
     └── $categoryId/
          └── $productId.tsx → /shop/:categoryId/:productId
```

### 5. **Rota de Captura (Catch-All)**

Use `$...param.tsx` para capturar múltiplos segmentos:

```bash
routes/
└── docs/
     └── $...catchAll.tsx → /docs/*
```

### 6. **Layouts Persistentes**

Utilize `_layout.tsx` para criar layouts em rotas aninhadas:

```bash
routes/
└── dashboard/
     ├── _layout.tsx   → Layout persistente
     ├── index.tsx     → /dashboard
     └── settings.tsx  → /dashboard/settings
```

### 7. **Rota de API (Resource Route)**

Utilize `.resource.ts` para criar endpoints de API:

```bash
routes/
└── api_/
     └── user.resource.ts → /api/user
```

### 8. **Nomes Compostos**

Prefira `kebab-case` em nomes compostos para maior legibilidade e SEO.

✅ Recomendado:

```bash
routes/
└── meus-pedidos.tsx → /meus-pedidos
```

⛔ Não recomendado:

```bash
routes/
└── meusPedidos.tsx → /meusPedidos
```

---

## 📏 Convenções de Nomenclatura

| Formato           | Uso em URLs? | Finalidade                            |
| ----------------- | ------------ | ------------------------------------- |
| ✅ **kebab-case** | Sim          | URLs públicas e legíveis              |
| ⛔ **camelCase**  | Não          | Apenas para código (ex.: variáveis)   |
| ⛔ **snake_case** | Não          | Usado em APIs internas, se necessário |

---

## 🔎 Uso de Underscore (`_`)

- **Prefixo `_`**: Arquivos com `_` no início não geram rotas visíveis.

  - Exemplo: `_layout.tsx` cria layouts persistentes.

- **Sufixo `_`**: Diretórios com `_` no final organizam rotas sem aparecer na URL.

Exemplo:

```bash
routes/
└── api_/
     └── user.resource.ts → /api/user
```

---

## 📌 Resumo das Regras

1. **Organize rotas aninhadas em pastas**: Use diretórios para refletir a hierarquia de URL.
2. **Use nomes em kebab-case**: Para melhor legibilidade e SEO.
3. **Proteja rotas privadas**: Valide autenticação em `loader()`.
4. **Centralize rotas de API**: Em arquivos `.resource.ts`.
5. **Utilize layouts persistentes**: Com `_layout.tsx`.
6. **Mantenha consistência**: Siga um padrão unificado para facilitar a colaboração.

---
