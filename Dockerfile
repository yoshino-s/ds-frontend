FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn config set registry https://nexus.yoshino-s.xyz/repository/npm/
RUN yarn --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN yarn build

FROM nginx:1.21-alpine AS runner

COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /static

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
