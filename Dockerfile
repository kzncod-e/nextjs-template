FROM node:20

# install pnpm
RUN npm install -g pnpm

# install wrangler
RUN npm install -g wrangler

WORKDIR /app

# copy package dulu buat caching
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

# copy seluruh project
COPY . .

# Cloudflare dev port
EXPOSE 8787
# FE dev port (if you have)
EXPOSE 3000

CMD ["pnpm", "run", "dev"]
