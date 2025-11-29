Documentación Test

Versión: 1.0
Integrantes: Camila González - Andy Villarroel
Proyecto: Comic Shop – Backend


1. Introducción
Se implemeta un testeo con la API REST del backend Comic Shop, desarrollada en Node.js + Express y conectada a una base de datos con MongoDB. La API utiliza JWT es para autenticación y con operaciones CRUD de productos.

2. Arquitectura
- Framework: Express.js
- Base de datos: MongoDB Atlas
- Autenticación: JWT
- Pruebas: Jest
- Documentación: Swagger

3. Endpoints para la autentificación
POST /api/auth/register
POST /api/auth/login

4. Endpoints para Productos
GET /api/productos
GET /api/productos/:id
POST /api/productos   (admin)
PUT /api/productos/:id  (admin)
DELETE /api/productos/:id (admin)

5. Swagger
Disponible en /api-docs

Integración FRONTEND + BACKEND
Conexión General

Ejemplos

Login:
fetch('/api/auth/login', {...})

GET Productos:
fetch('/api/productos')

POST Producto (admin):
fetch('/api/productos', { headers: { Authorization: Bearer <token> }})

4. Manejo de Errores
El frontend debe manejar 401, 403 y 500 con avisos adecuados.

5. Colecciones instaladas para ejecución de test
npm install bcryptjs jsonwebtoken
npm install express mongoose cors dotenv bcryptjs jsonwebtoken
npm install nodemon --save-dev