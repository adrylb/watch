# README - Frontend (Streamify)

Interface do usuário para a plataforma **Streamify**, desenvolvida com **Nuxt 3**, **Vue 3**, **TailwindCSS v4** e **ShadCN-Vue** para proporcionar uma experiência responsiva, moderna e fluida. Possui integração total com backend autenticado, eventos em tempo real via Kafka/WebSocket e interface consistente baseada em temas customizados.

---

## Tecnologias Utilizadas

- **Vue 3 / Nuxt 3** - framework frontend moderno
- **TailwindCSS v4** - utilitário CSS para estilos customizados
- **ShadCN-Vue** - biblioteca de componentes elegante e extensível
- **Sonner** - notificadores reativos com excelente UX
- **Pinia** - gerenciamento de estado (casos leves)
- **useFetch** - fetch de dados com SSR, cache e reatividade
- **WebSocket (Kafka listener)** - mensagens em tempo real para eventos
- **Autenticação por JWT** - com cookies gerenciados por `useCookie`

---

## Estrutura de Diretórios

```
frontend/
├── assets/css/               # Tailwind custom theme e imports
├── components/              # Componentes reutilizáveis
│   └── ui/                  # Componentes ShadCN-Vue customizados
├── layouts/                 # Layouts principais (default)
├── pages/                   # Páginas principais do app
│   ├── index.vue            # Home
│   ├── login/index.vue      # Login
│   ├── register.vue         # Cadastro
│   ├── upload.vue           # Envio de vídeos
│   ├── profile.vue          # Perfil do usuário
│   └── catalog/index.vue    # Catálogo de filmes
├── composables/            # Composables como useAuthUser, useCurrentUser
├── plugins/                # Plugins opcionais (WebSocket, auth, etc)
├── public/                 # Assets estáticos
├── app.vue                 # Wrapper global
├── nuxt.config.ts          # Configuração principal do Nuxt
├── tailwind.config.ts      # Tema customizado (shadcn)
└── .env                    # Variáveis de ambiente (URL da API)
```

---

## Destaques do Projeto

### Estilização Avançada com ShadCN-Vue

- Componentes como `Button`, `Card`, `Input`, `Label`, `DropdownMenu` foram usados com design consistente e escuro.
- Tema customizado com base no `tailwind.config.ts` e `assets/css/tailwind.css`.

### Layout com Header Responsivo

- Cabeçalho responsivo com menu mobile tipo "hamburguer"
- Comportamento baseado em login: Login / Logout + Upload / Profile
- Borda inferior roxa `#6100cc` e fundo cinza escuro `#3b3b3b`

### Autenticação

- Login via `useFetch` + JWT (guardado em cookie)
- Cookie persistido com `useCookie('token')`
- Logout limpa cookies e redireciona para home

### Integração com Backend

- URL da API definida em `runtimeConfig.public.apiBase`
- Todos os requests usam `useFetch`
- Proteção de rotas (ex: Upload, Profile) baseada em token

### Tempo real com Kafka/WebSocket

- Notificações de novos vídeos recebidas via socket
- Exibição com `sonner` no layout (mensagem: "Novo vídeo enviado")

### Validação e UX

- Formulários com feedback visual e mensagens de erro
- Estilo unificado com `Card`, `Input`, `Label`, `Button`
- Loading e estado de erro em `login`, `register`, `upload`

---

## Execução Local

```bash
# instalar dependências
npm install

# iniciar com hot reload
npm run dev
```

---

## Variáveis de Ambiente

Crie um `.env` na raiz do frontend:

```
NUXT_PUBLIC_API_BASE=http://localhost:3001
```

---

## Scripts Disponíveis

```bash
npm run dev       # inicia modo desenvolvimento
npm run build     # gera versão de produção
npm run preview   # visualiza build final localmente
```

---

## Considerações Finais

- Projeto responsivo e acessível
- Tema visual compatível com identidade Watch.tv
- Modularizado para escalar novos módulos e interfaces

---

## Licença

MIT

