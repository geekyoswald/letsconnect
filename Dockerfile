# ---------- Builder ----------
    FROM node:22 AS builder

    WORKDIR /app
    
    COPY package.json package-lock.json ./
    RUN npm ci
    
    COPY . .
    
    # ✅ REQUIRED for next build
    RUN npx prisma generate
    RUN npm run build
    
    
    # ---------- Runner ----------
    FROM node:22-slim AS runner
    
    WORKDIR /app
    ENV NODE_ENV=production
    
    # ✅ REQUIRED for Prisma runtime
    RUN apt-get update -y && apt-get install -y openssl \
      && rm -rf /var/lib/apt/lists/*
    
    COPY package.json package-lock.json ./
    RUN npm ci --omit=dev
    
    COPY --from=builder /app/.next ./.next

    COPY --from=builder /app/prisma ./prisma
    
    # ✅ REQUIRED again after prod deps install
    RUN npx prisma generate
    
    EXPOSE 3000
    CMD ["npm", "run", "start"]
    