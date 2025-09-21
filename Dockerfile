# ETAPA 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ETAPA 2: Runner
FROM node:18-slim AS runner
WORKDIR /app

ENV NODE_ENV production

# Copia a saída otimizada do builder
# A pasta .next/standalone já contém tudo o que é necessário para rodar a aplicação,
# incluindo node_modules, public (se existir), e os arquivos de servidor.
COPY --from=builder /app/.next/standalone/ ./

EXPOSE 3000

CMD ["node", "server.js"]
