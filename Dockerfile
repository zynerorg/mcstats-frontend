FROM node:24-alpine AS base
RUN corepack enable pnpm

RUN apk add --no-cache openjdk21 curl

FROM base AS builder
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY package.json packages/sdk/package.json frontend/package.json ./
COPY packages/sdk packages/sdk
COPY frontend frontend
COPY packages packages
RUN pnpm install

COPY frontend frontend
RUN pnpm --filter frontend build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/frontend/.output ./.output
COPY --from=builder /app/frontend/node_modules ./node_modules

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]
