# AsistDental Backend

Backend profesional y seguro construido en Node.js + Express

## Scripts útiles
- `npm run dev`: Ejecuta el servidor en modo desarrollo (recarga automática con nodemon)
- `npm start`: Ejecuta el servidor en modo producción
- `npm run lint`: Linter para el código fuente

## Arquitectura
- `/src/index.js`: entrypoint
- Próximos módulos: rutas, controladores, modelos, middlewares y servicios

## Seguridad implementada
- Helmet: asegura cabeceras HTTP
- CORS: política de origen cruzado
- Dotenv: variables de entorno seguras
- Morgan: logs de acceso

## Ejemplo de variable de entorno
Ver el archivo `.env.example`