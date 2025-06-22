# README Geral - Streamify

Projeto completo de uma plataforma de streaming fictícia, com separação modular entre frontend, backend e infraestrutura, utilizando tecnologias modernas e arquitetura escalável.

---

## Estrutura de Pastas

```bash
streamify/
├── backend/      # API em Fastify com Prisma, Kafka, JWT, etc
├── frontend/     # Aplicacao Nuxt 3 com Tailwind e ShadCN
├── infra/        # Infraestrutura Docker Compose (Postgres, Kafka, Zookeeper, Kafka UI)
├── docker-compose.yml
└── README.md     # Este arquivo geral
```

## Tecnologias Utilizadas

- **Node.js 20+**
- **Fastify** com Plugins (CORS, JWT, Swagger)
- **Prisma ORM** com PostgreSQL
- **Kafka (Kafkajs)**
- **Nuxt 3** com Composition API
- **TailwindCSS v4** e **ShadCN-Vue**
- **Sonner** para notificacoes
- **Docker Compose** com suporte a Kafka + UI
- **WebSockets** para eventos em tempo real

## Arquitetura

### Backend

- **Camadas DDD-inspired** (modules/: routes, services, models)
- **Eventos assíncronos** via Kafka
- **Persistência via Prisma**
- **Validação automática com JSON Schema (Fastify)**

### Frontend

- **Pages** (Rotas e Componentes Vue)
- **Layouts** (Header, Footer e Templates)
- **UI** baseada em **ShadCN-Vue** com Tailwind
- **Autenticação via Cookies JWT**
- **WebSocket client** escutando eventos do Kafka

### Infra

- **Orquestração com Docker Compose**
- **Containers: backend, frontend, postgres, kafka, zookeeper, kafka-ui**
- **Volumes persistentes e variáveis de ambiente**

---

## Executando com Docker

```bash
docker compose up --build
```

Acessos:

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)
- Kafka UI: [http://localhost:8080](http://localhost:8080)

## Executando Manualmente

### Backend

```bash
cd backend
npm install
npx prisma generate
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

Documentações específicas:

- [README do Backend](./backend/README.md)
- [README do Frontend](./frontend/README.md)
- [README da Infraestrutura](./infra/README.md)

