# 1. Clona el proyecto

`git clone https://github.com/aramaysm/angular-test-guajiritos.git`

Ve a la raiz del proyecto

`cd angular-test-guajiritos`

# 2. Instala las dependencias

 `npm install` 
 
 Instala json-server y json-server-auth de manera global (si no lo tienes instalado):

 `npm install -g json-server json-server-auth`

# 3. Ejecuta los servidores

`json-server-auth --watch db.json`  --- Servidor de prueba API

`npm start`  --- Servidor de Angular

## Adaptaciones a los Requerimientos

En la implementación de este test, se han adaptado los roles de usuarios para añadir más control en la gestión de permisos. Se definieron tres roles:
* Superadmin: Este rol tiene el poder de gestionar usuarios con el rol de admin. Solo puede ver y administrar usuarios con el rol admin.

* Admin: Este rol gestiona usuarios con el rol user. Puede ver y administrar usuarios de nivel inferior, pero no puede gestionar usuarios con rol de admin o superadmin. Ademas se encarga de la gestion y asignacion de tareas.

* User: Este rol solo puede ver las tareas que han sido asignadas a ellos, ademas puede actualizar el estado de las tareas asignadas (por ejemplo, de "pendiente" a "completada").
No tienen permiso para crear, ni asignar tareas a otros usuarios.

### Los usuarios creados puede verificarlos en el archivo db.json. Puede tomar como ejemplo, para probar, los siguientes:
Super admin: email:lomb@fdgf.v  password: lomb
Admin: email: aramaysm@gmail.com   password: aram
User: email: pepe@ee.mk    password: pepe
