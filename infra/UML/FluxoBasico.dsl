
workspace {

    model {
        user = person "Usuário"

        frontend = softwareSystem "Frontend (Nuxt 3)" {
            web = container "Vue + Nuxt" "Interface Web SPA" "Browser"
        }

        backend = softwareSystem "Backend (Fastify + Node.js)" {
            api = container "API REST" "Serviço de autenticação, upload e catálogo de vídeos" "Node.js"
            kafka = container "Kafka Producer/Consumer" "Mensageria entre microserviços" "KafkaJS"
            db = container "PostgreSQL" "Banco relacional" "Prisma ORM"
        }

        kafkaBroker = softwareSystem "Kafka Broker" "Plataforma de mensageria" "Apache Kafka"

        user -> web "acessa"
        web -> api "consome API REST"
        api -> db "grava dados via ORM"
        api -> kafka "emite eventos"
        kafka -> kafkaBroker "publica/consome eventos"
    }

    views {
        systemContext backend {
            include *
            autolayout lr
        }

        container backend {
            include *
            autolayout lr
        }

        theme default
    }
}
