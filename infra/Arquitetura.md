# 📦 Infraestrutura e Deploy - Streamify

Este documento descreve a infraestrutura, estratégias de deploy, observabilidade, CI/CD e práticas utilizadas na aplicação **Streamify**.

---

## 🔧 Implementação e Deploy

A aplicação pode ser executada de duas formas principais:

### 1. Localmente (Desenvolvimento)

- Utilizando `Docker Compose`, que sobe os containers de:
  - Frontend (Nuxt 3)
  - Backend (Node.js com Kafka e Prisma)
  - PostgreSQL (Banco relacional)
  - Kafka + Zookeeper
  - Kafka UI para inspeção de tópicos

### 2. Produção (AWS - Contêineres ou Serverless)

#### 🔹 Modo Containerizado com AWS ECS + Fargate

- Ideal para ambientes com **alta disponibilidade** e **escalabilidade automática**
- Utiliza:
  - Amazon ECS (Fargate) para orquestração de containers
  - ECR para imagens docker
  - RDS PostgreSQL
  - Load Balancer (ALB) para distribuir tráfego

#### 🔹 Modo Serverless com AWS Lambda *(alternativa futura)*

- Utilização do `Serverless Framework` para criar funções Lambda para API
- Usa API Gateway, DynamoDB (se desejado) e S3

---

## 🧱 Provisionamento com Infrastructure as Code (IaC)

Toda infraestrutura pode ser gerada de forma automatizada com:

### Terraform *(recomendado)*

- Criação de VPC, Subnets, Security Groups
- Criação de ECS Cluster, Task Definitions e Services
- Provisionamento de banco PostgreSQL com RDS
- Variáveis de ambiente e Secrets no SSM ou Secrets Manager

### AWS CDK *(alternativa)*

- Provisionamento com código em TypeScript
- Integração com pipelines de CI/CD

---

## 🚀 CI/CD com GitHub Actions

Pipeline automatizado para:

- Build, Test e Lint
- Deploy no ambiente de produção via ECS ou para Docker local

### Exemplo `.github/workflows/deploy.yml`

```yaml
name: CI/CD

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 20
      - run: npm install
      - run: npm run build
      # docker build + push to ECR
      # deploy to ECS (ou executar docker-compose)
```

---

## 🧩 Arquitetura de Software

### Modular e Baseada em DDD

- Separação clara de responsabilidades por `modules/`
- Cada módulo possui:
  - `routes` (endpoints da API)
  - `services` (regra de negócio)
  - `models` (tipagem e estrutura)

Exemplo:

```
modules/
├── users/
│   ├── users.routes.ts
│   ├── users.service.ts
│   └── users.model.ts
├── auth/
│   ├── auth.routes.ts
│   ├── auth.service.ts
├── events/
│   ├── producer.service.ts
│   ├── consumer.service.ts
│   └── events.model.ts
```

---

## 📬 Mensageria com Kafka

- Kafka é usado para emitir eventos assíncronos
- Quando um novo vídeo é adicionado, o backend envia um evento `video.created`
- Frontend escuta por WebSocket e exibe notificação usando `sonner`

### Painel de Monitoramento

- `Kafka UI` disponível em [http://localhost:8080](http://localhost:8080)
- Permite visualizar tópicos, consumidores e mensagens

---

## 📊 Observabilidade e Logging

### Planejado / Extensível com:

- **OpenTelemetry** + **Jaeger** ou **Zipkin** para rastreabilidade
- **Grafana + Prometheus** para métricas e alertas
- **Elastic Stack** (ELK) para logs estruturados

As ferramentas podem ser adicionadas ao `docker-compose.yml` se necessário.

---

## ✅ Práticas Adotadas

- Baixo acoplamento entre frontend, backend e mensageria
- Alta coesão nos módulos por domínio
- Uso de JWT assinado no backend para autenticação
- Requisições autenticadas protegidas por hook global no Fastify
- Uso de Prisma ORM com PostgreSQL

---

## 📌 Requisitos de Ambiente

- Docker + Docker Compose
- Node.js >= 20 (fora do container)
- Portas expostas:
  - 3000: Frontend (Nuxt)
  - 3001: Backend API
  - 5432: PostgreSQL
  - 9092: Kafka
  - 2181: Zookeeper
  - 8080: Kafka UI

---

## 📁 Localização

Este documento deve estar em:

```
infra/docs/infrastructure.md
```

---

## Licença

MIT

