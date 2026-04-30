## Guía de Inicio Rápido

1. **Instalar dependencias:** `npm install`
2. **Levantar base de datos:** `docker-compose up -d`
3. **Configurar variables:** Renombrar `.env.example` a `.env` y ajustar si es necesario.
4. **Sincronizar DB y Tipos:** `npx prisma migrate dev`
5. **Poblar base de datos (Seed):** `npm run start:dev`
6. **Correr Tests:** `npm test`
7. **Iniciar App:** `npm run start:dev`

Esta prte del proyecto es el backend, se busco que fuera robusto para hacer comparaciones de tipos y pudiera resistir a intentos de mal tipado para conservar su integridad, esta basada en nest, graphql y prisma. Se añadieron dos usuarios al seed y unos 30 libros para poderr hacer pruiebas con paginaciones y demas.
