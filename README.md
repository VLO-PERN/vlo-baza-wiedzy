# VLO Baza Wiedzy

### Running in development

Database:

```sh
docker-compose up -d
```

Database migrations:

```sh
yarn knex migrate:latest
```

Database seed:

```sh
yarn knex seed:run
```

Backend:

```sh
yarn dev
```

Frontend:

```sh
cd ./vlo-baza-wiedzy-front
```

```sh
yarn start
```

### Running in production

Figure it out yourself.