# README - Infraestrutura (Streamify)

Este diretório contém os arquivos e configurações necessárias para provisionar toda a infraestrutura do projeto **Streamify**, incluindo banco de dados, mensageria Kafka com painel administrativo, e serviços backend/frontend via Docker Compose.

---

## Tecnologias Utilizadas

- **Docker Compose v3.8**
- **PostgreSQL 15** - banco relacional usado pelo Prisma ORM
- **Apache Kafka + Zookeeper** - mensageria para eventos
- **Kafka UI (provectuslabs)** - interface de monitoramento Kafka
- **Backend / Frontend Containers** com Dockerfile

---

## Estrutura de Arquivos

```
infra/
├── docker-compose.yml         # Orquestração dos containers
├── backend/
│   ├── Dockerfile             # Container backend (Node.js + tsx)
├── frontend/
│   ├── Dockerfile             # Container frontend (Nuxt 3)
├── .dockerignore              # Ignora node_modules, .output etc
```

---

## docker-compose.yml - Detalhes

```yaml
services:
  backend:
    build: ./backend
    volumes:
      - ./backend:/app
    ports:
      - "3001:3001"
    depends_on:
      - db
      - kafka

  frontend:
    build: ./frontend
    volumes:
      - ./frontend:/app
    ports:
      - "3000:3000"

  db:
    image: postgres:15
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: streamify
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  kafka:
    image: bitnami/kafka:latest
    environment:
      - KAFKA_BROKER_ID=1
      - KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181
      - KAFKA_LISTENERS=PLAINTEXT://:9092
      - KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://kafka:9092
    ports:
      - "9092:9092"
    depends_on:
      - zookeeper

  zookeeper:
    image: bitnami/zookeeper:latest
    ports:
      - "2181:2181"
    environment:
      - ALLOW_ANONYMOUS_LOGIN=yes

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    container_name: kafka-ui
    ports:
      - "8080:8080"
    environment:
      - KAFKA_CLUSTERS_0_NAME=local
      - KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS=kafka:9092
      - KAFKA_CLUSTERS_0_ZOOKEEPER=zookeeper:2181
    depends_on:
      - kafka
      - zookeeper

volumes:
  pgdata:
```

---

## Comandos Úteis

### Subir os containers com build

```bash
docker compose up --build
```

### Parar os containers

```bash
docker compose down
```

### Acessar container backend (para debug ou testes)

```bash
docker exec -it <id_backend_container> sh
```

---

## Observações

- Os containers não devem copiar `node_modules` da máquina local

- Certifique-se de que `.dockerignore` inclui:

  ```
  node_modules
  .output
  dist
  ```

- O frontend é exposto em: [http://localhost:3000](http://localhost:3000)

- O backend é exposto em: [http://localhost:3001](http://localhost:3001)

- O Kafka UI está em: [http://localhost:8080](http://localhost:8080)

---

## Possíveis Extensões Futuras

- **Jaeger, Grafana, Prometheus ou Zipkin** para rastreamento distribuído
- **Elastic Stack** para logging estruturado
- **Volumes externos nomeados** para persistência entre builds

---

## Licença

MIT

