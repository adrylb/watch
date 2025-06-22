# README - Backend (Streamify)

API da plataforma Streamify, desenvolvida com foco em performance, escalabilidade e boas práticas. Este projeto utiliza Fastify, Prisma ORM, Kafka, JWT e segue uma arquitetura modular inspirada em DDD.

---

## Tecnologias Utilizadas

- **Node.js 20+**
- **Fastify** - framework web leve e performático
- **Prisma ORM** - comunicação com PostgreSQL
- **Kafka (kafkajs)** - mensageria e eventos
- **JWT** - autenticação baseada em token
- **Zod / JSON Schema** - validações automáticas
- **Swagger** - documentação da API
- **tsx** - execução de TypeScript no ambiente dev

---

## Estrutura de Pastas

```
backend/
├── core/               # Núcleo comum: Kafka, autenticação, logger
│   ├── Kafka.ts        # Configuração Kafka (producer/consumer)
│   └── logger.ts       # Logger formatado
│
├── modules/            # Módulos organizados por domínio
│   ├── auth/           # Autenticação de usuários
│   │   ├── auth.routes.ts
│   │   ├── auth.service.ts
│   │   └── auth.model.ts
│   ├── users/          # Gerenciamento de usuários
│   │   ├── users.routes.ts
│   │   ├── users.service.ts
│   │   └── users.model.ts
│   ├── videos/         # CRUD e upload de vídeos
│   │   ├── videos.routes.ts
│   │   ├── videos.service.ts
│   │   └── videos.model.ts
│   └── events/         # Integração com Kafka
│       ├── producer.service.ts
│       ├── consumer.service.ts
│       └── events.model.ts
│
├── prisma/             # Migrations e schema
│   ├── schema.prisma
│
├── generated/          # Prisma Client gerado
│
├── index.ts            # Entrypoint principal
└── tsconfig.json       # Configuração TypeScript
```

---

## Comandos Úteis

### Executar em modo desenvolvimento

```bash
npm install
npx prisma generate
npm run dev
```

### Gerar migrations

```bash
npx prisma migrate dev --name init
```

---

## Endpoints principais

| Método | Rota            | Descrição            |
| ------ | --------------- | -------------------- |
| POST   | /api/login      | Autenticação         |
| POST   | /api/users      | Criação de usuário   |
| GET    | /api/users      | Listagem de usuários |
| DELETE | /api/users/\:id | Remoção de usuário   |
| GET    | /api/user/\:id  | Consulta de usuário  |
| POST   | /api/videos     | Upload de vídeo      |
| GET    | /api/videos     | Listagem de vídeos   |

---

## Documentação Swagger

Acesse em: [http://localhost:3001/docs](http://localhost:3001/docs)

---

## Observações

- O projeto exige variáveis de ambiente (.env):

```
DATABASE_URL=postgresql://postgres:postgres@db:5432/streamify
JWT_SECRET=minha_senha_secreta
```

- Os eventos Kafka estão configurados para emitir e consumir o evento `video.created`

- O middleware `onRequest` com `app.authenticate` é usado para proteger endpoints privados

---

## Licença

MIT

