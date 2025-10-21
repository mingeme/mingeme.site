# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY . .
RUN CI=true pnpm install --frozen-lockfile && pnpm run build


# Stage 2: Runtime
FROM caddy:2-alpine

WORKDIR /srv

COPY --from=builder /app/dist /srv

COPY Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
