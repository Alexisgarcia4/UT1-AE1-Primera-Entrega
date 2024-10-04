# UT1-AE1 Primera Entrega - Gestión de Tareas

Este proyecto es una aplicación de gestión de tareas desarrollada como parte de la actividad **UT1-AE1**. 
Está implementada con **Ionic** y **React** para el frontend, y **Express**, **Sequelize** y **MySQL** para el backend. 
La aplicación permite realizar las operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre tareas a través de una API REST.

## Descripción

La aplicación permite a los usuarios:
- Crear tareas.
- Listar tareas existentes.
- Editar tareas.
- Eliminar tareas.

### Tecnologías Utilizadas

- **Frontend**:
  - **Ionic Framework**: Para el desarrollo de la interfaz de usuario móvil y responsiva.
  - **React**: Para el manejo del estado y los componentes del frontend.
  - **React Router**: Para el enrutamiento dentro de la aplicación.

- **Backend**:
  - **Express**: Para la gestión de la API REST.
  - **Sequelize**: ORM (Object Relational Mapping) utilizado para interactuar con la base de datos.
  - **MySQL**: Base de datos relacional para almacenar las tareas.

La comunicación entre el frontend y el backend se realiza a través de una API REST. **Sequelize** facilita 
la interacción con la base de datos **MySQL**, permitiendo un mapeo fluido entre los modelos y las tablas de la base de datos.

## Instalación

### Requisitos previos
- **Node.js** y **npm** instalados.
- **MySQL** instalado y corriendo en tu máquina.

### Backend

1. Clona este repositorio:
   ```bash
   git clone https://github.com/Alexisgarcia4/UT1-AE1-Primera-Entrega.git

2. Navega a la carpeta del backend:
   ```bash
   cd backend

4. Instala las dependencias:
   ```bash
   npm install
   
5. Abre tu terminal de MySQL y ejecuta el siguiente comando:
   ```mysql
   create database db_tareas1
   
6. Configura la base de datos MySQL en el archivo db.config.js:
   ```javascript
     module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "tu_contraseña",
    DB: "db_tareas1",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  7. Inicia el servidor backend:
     ```bash
     node server.js
     
  ### Frontend
  
  1. En otra terminal, navega a la carpeta del frontend:
      ```bash
      cd frontend

  3. Instala las dependencias:
      ```bash
      npm install
      
  4. Inicia la aplicación Ionic:
      ```bash
      ionic serve

  ### Uso
  
  - Crear tarea: A través del frontend, puedes crear nuevas tareas llenando el formulario y haciendo clic en "Crear tarea".
  - Listar tareas: La lista de tareas creadas aparecerá en la pantalla principal.
  - Editar tarea: Haz clic en el botón "Editar" para modificar una tarea existente.
  - Eliminar tarea: Haz clic en el botón "Eliminar" para borrar una tarea de la base de datos.

  ### Documentación de la API
  
  La documentación completa de la API está disponible en [Postman](https://documenter.getpostman.com/view/38465474/2sAXxLCaKy).

  ### Endpoints
  
  - GET /api/tareas
    - Lista todas las tareas.
  
  - POST /api/tareas
    - Crea una nueva tarea.
  
  Body (ejemplo):
  
    ```json
    Copiar código
    {
      "nombre": "Mi tarea",
      "mensaje": "Este es el mensaje de la tarea",
      "prioridad": "alta",
      "hecha": false
    }
    ```
  - PUT /api/tareas/:id
    - Actualiza una tarea existente.
  
  Body (ejemplo):
  
    ```json
    Copiar código
      {
        "nombre": "Tarea actualizada",
        "mensaje": "Mensaje actualizado",
        "prioridad": "media",
        "hecha": true
      }
    ```
    
  - DELETE /api/tareas/:id
    - Elimina una tarea existente.

