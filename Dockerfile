FROM node:16 AS base
WORKDIR /usr/src

# Stage1: UI Build
FROM base AS frontend-build
COPY frontend/ .
RUN npm install && npm run build

# Stage2: API Build
FROM base AS backend-build
ENV ENVIRONMENT=production
COPY backend/ .
RUN npm install && npm run build

# Stage3: Packaging the app
FROM base AS final
COPY --from=frontend-build /usr/src/build/ frontend/build/
COPY --from=backend-build /usr/src/dist .
RUN ls

EXPOSE 80

CMD ["node", "api.bundle.cjs"]