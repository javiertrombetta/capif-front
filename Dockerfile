# Etapa 1: Construcción de la aplicación
FROM node:22.14-alpine3.21 AS builder

WORKDIR /app

# Copiar solo archivos esenciales para instalar dependencias
COPY package.json package-lock.json ./

# Instalar todas las dependencias (incluye devDependencies para el build)
RUN npm install

# Copiar el código fuente
COPY . .

# Establecer las variables de entorno necesarias para el build
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ARG RECAPTCHA_SECRET_KEY
ARG NEXT_PUBLIC_PORT

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY
ENV RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY
ENV NEXT_PUBLIC_PORT=$NEXT_PUBLIC_PORT

# Construir la aplicación
RUN npm run build

# Etapa 2: Servir con un servidor optimizado
FROM node:22.14-alpine3.21

WORKDIR /app

ENV NODE_ENV=production

# Copiar archivos necesarios desde el builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# Variables de entorno en tiempo de ejecución
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
ENV RECAPTCHA_SECRET_KEY=${RECAPTCHA_SECRET_KEY}
ENV NEXT_PUBLIC_PORT=${NEXT_PUBLIC_PORT}

# Exponer el puerto correcto
EXPOSE ${NEXT_PUBLIC_PORT}

# Comando de inicio
CMD ["sh", "-c", "NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL NEXT_PUBLIC_RECAPTCHA_SITE_KEY=$NEXT_PUBLIC_RECAPTCHA_SITE_KEY RECAPTCHA_SECRET_KEY=$RECAPTCHA_SECRET_KEY NEXT_PUBLIC_PORT=$NEXT_PUBLIC_PORT npm run start"]