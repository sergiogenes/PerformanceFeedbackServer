# Devolución De Performance

Proyecto realizado para [GlobalNews Group](https://www.globalnewsgroup.com/) durante la práctica profesional del bootcamp [Plataforma5](https://www.plataforma5.la/)

Este repositorio es para el servidor de backend, el de [frontend](https://github.com/GlobalNewsRRHH/client) también está alojado actualmente en GitHub en la misma organización [GlobalNewsRRHH](https://github.com/GlobalNewsRRHH/).

## Instrucciones

### Clon del repositorio

Tras clonar el repositorio, ejecute `npm install`.

### Entornos de ejecución

El entorno de ejecución por defecto es `development`, puede cambiarlo modificando el valor de la variable de entorno `NODE_ENV` a los otros valores soportados `test` y `prod`.

### Archivo .env

Cree un archivo `.env` en el directorio raíz del proyecto. Este archivo guarda los secretos y otras varaibles de entorno que el servidor necesita.
Ejemplo:

```
SECRET=superSecreto
```

Es un requisito para levantar el servidor que al menos exista la variable de entorno `SECRET`.

### Requisitos

#### Postgres

### Scripts de migración y seeding

Tras levantar Postgres, ejecute los siguientes scripts en orden:
`npm run db:create` para crear la base de datos
`npm run db:migrate` para crear las tablas (y futuras migraciones)
`npm run db:seed:all` para inicializar las tablas

### Tests

`NODE_ENV=test npm run db:create`
`npm run test` ejecuta los tests en el directorio `test`.

### Iniciar el servicio

`npm start:dev` para iniciarlo en modo desarrollo con nodemon o `npm start` para iniciarlo con node.
