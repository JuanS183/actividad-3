# Documentación del Proyecto

## Variables de Entorno
Para ejecutar este proyecto, asegúrese de configurar las siguientes variables de entorno:

```env
PORT=3001

JWT_SECRET=gestorApp2025
JWT_EXPIRATION=2h

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=''
DB_DATABASE=gestor
```

## Configuración de la Base de Datos
Debe importar el archivo `gestor.sql` en su gestor de base de datos. Si está utilizando **phpMyAdmin**, siga estos pasos:
1. Cree una base de datos con el nombre `gestor`.
2. Importe el archivo `gestor.sql` en la base de datos creada.

## Instalación y Ejecución
Una vez configurada la base de datos, ejecute los siguientes comandos:

### Instalar dependencias
```sh
npm install
```

### Iniciar la aplicación en modo desarrollo con nodemon
```sh
npm run start:dev
```

## Rutas Disponibles
A continuación, se listan las rutas funcionales del proyecto:

### 📌 Registro y Autenticación
- **Registro:** `POST http://localhost:3001/usuarios/crear`
- **Login:** `POST http://localhost:3001/auth/login`

### 📌 Actividades /actividades/*
#### 🔍 Buscar actividades por nombre
- `GET /buscar/nombre/actividades` (Vista pública)
- `GET /buscar/:nombre/actividad` (Requiere autenticación)

#### 🔄 Obtener últimas 5 actividades por usuario
- `GET /buscar/ultimas/actividades` (Vista pública)
- `GET /buscar/:usuarioId/ultimas` (Requiere autenticación)

#### 🏷️ Buscar actividades por categoría
- `GET /buscar/actividades/categoria` (Vista pública)
- `GET /buscar/:categoriaId/categoria` (Requiere autenticación)

#### 👥 Buscar actividades por usuario y categoría
- `GET /buscar/usuarios/categorias` (Vista pública)
- `GET /buscar/:usuarioId/:categoriaId/` (Requiere autenticación y permisos de administrador)

#### ⚙️ Otras operaciones sobre actividades
- `POST /crear` (Requiere autenticación y permisos de administrador)
- `POST /asignar/categoria` (Requiere autenticación y permisos de administrador)
- `GET /buscar` (Requiere autenticación)
- `GET /buscar/:id` (Requiere autenticación y permisos de administrador)
- `PUT /cambiar/:id` (Requiere autenticación y permisos de administrador)
- `DELETE /eliminar/:id` (Requiere autenticación y permisos de administrador)

### 📌 Usuarios /usuarios/*
#### 👤 Gestión de usuarios
- `GET /buscar/:id/proyectos` (Requiere autenticación)
- `GET /buscar/:id/habitos` (Requiere autenticación)
- `PUT /cambiar/:id` (Requiere autenticación y permisos de administrador)
- `DELETE /eliminar/:id` (Requiere autenticación y permisos de administrador)
- `GET /buscar/:id` (Requiere autenticación)

#### 📝 Registro de usuarios
- `GET usuarios/crear` (Vista del formulario de registro)
- `POST usuarios/crear` (Registro de usuario)

#### 🔗 Asignación de proyectos a usuarios
- `POST /asignar/proyecto` (Requiere autenticación y permisos de administrador)

#### 📋 Obtener todos los usuarios
- `GET /buscar` (Requiere autenticación y permisos de administrador)

## 📌 Notas Adicionales
- **🔒 Autenticación:** Algunas rutas requieren autenticación mediante JWT.
- **🛠️ Permisos de Administrador:** Rutas protegidas requieren permisos de administrador.


