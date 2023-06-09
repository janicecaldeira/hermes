# hermes

![hermes](doc/hermes.jpg)

This name was chosen in reference to the Greek god Hermes, the god of commerce, also known as the protector of merchants.

## How this API works

Each product has a brand and a seller, which must be previously registered, so that when creating the product these data are informed (brand ID and seller ID).

Once created, the searches for products are available with some filters: "name", "brand", "seller" and "price range" that is defined by "priceStart" and "priceEnd".

You can check all the endpoints of this application easily in the documentation section, but the main routes are

- Create a brand
- Create a seller
- Create a product
- Search for all products (or filtering by name, brand, seller or price range)
- Show product details (by slug)

## Before starts

Download and install [Node LTS](https://nodejs.org/en/download/)

## Installation

```bash
npm install
```

## Configure .env  and .env.test

### example .env

``` .env
DB_TYPE=mariadb
DB_HOST=localhost
DB_PORT=13306
DB_NAME=hermes_dev
DB_USER=hermes_dev
DB_PASSWORD=hermes_dev
SECRET=change-me
```

### example .env.test

``` .env.test
DB_TYPE=mariadb
DB_HOST=127.0.0.1
DB_PORT=23306
DB_NAME=hermes_test
DB_USER=hermes_test
DB_PASSWORD=hermes_test
SECRET=change-me
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Run with Docker

There is a *docker compose* configuration that will load the DEV MariaDB
instance. All you need is [docker compose](https://docs.docker.com/compose/)
installed in your machine.

To bring all up, just run

```bash
docker compose up
```

This will expose the database 127.0.0.1 port 13306.

### Test watcher with Docker

To run the jest test watcher with Docker, just call with test profile:

```bash
docker compose --profile test up
```

This will start jest in "watch all" mode in an isolated container and database.

This also runs the app in development mode.

### Local tests with test database in Docker

There is a test database in docker compose. All DB configuration will be loaded from .env.test.

Just run:

```bash
npm run test:prepare
```

You can now run your tests locally running:

```bash
npm run test
```

or

```bash
npm run test:watch
```

or

```bash
npm run test:cov
```

## Documentation

### See Swagger documentation

After application starts, open your browser and navigate to <http://localhost:3000/api>

### Documentation with Compodoc

First run

```bash
npm run docs:build
```

Now open your browser and navigate to <http://localhost:8080/>

## License

Nest is [MIT licensed](LICENSE).
