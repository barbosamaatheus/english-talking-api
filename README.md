<p align="center">
  <img src="https://i.ibb.co/4s5X0kD/Whats-App-Image-2020-04-23-at-13-43-12.jpg" height="150" width="150" alt="logo" />
</p>

<h3 align="center">
  This API aims to provide users with the possibility of conducting dialogues in English where conversations and answers are registered and evaluated by the users themselves. <br> 👽
</h3>

<div align="center">

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
![Node.js](https://img.shields.io/badge/Node.js-Backend-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![Jest](https://img.shields.io/badge/Tests-Jest-red)

</div>

# [English Talking API](https://documenter.getpostman.com/view/8498314/Szf9V75Q)

---

# 📚 Table of Contents

- [Overview](#overview)
- [Technologies](#technologies)
- [Running the Project](#running-the-project)
- [Authentication](#authentication)
- [Tests](#tests)
- [Contributing](#contributing)
  - [Contribution Guidelines](#contribution-guidelines)
- [Code of Conduct](#code-of-conduct)
- [Need help?](#need-help)
- [License](#license)

---

# Overview

This is a RESTful API built with JavaScript using [Node.js](https://nodejs.org/en/download/) and PostgreSQL database.

The project was created to help users practice English conversations through dialogues that can be created, answered and evaluated by the community.

---

# Technologies

This project uses:

- Node.js
- Express
- PostgreSQL
- TypeORM
- Docker
- Jest
- Supertest

---

## Code Style and Formatting

We use the following integrations as automatic code formatters and style guides:

1. [ESLint](https://github.com/Microsoft/vscode-eslint)
2. [Prettier](https://github.com/prettier/prettier-vscode)
3. [EditorConfig](https://github.com/editorconfig/editorconfig-vscode)
4. Airbnb JavaScript Style Guide

> To ensure Prettier formats files automatically on save, add:
>
> ```json
> "editor.formatOnSave": true
> ```
>
> to your VSCode User Settings.

To learn more about this setup, read this [article](https://medium.com/matheus-barbosa/integrating-prettier-eslint-airbnb-style-guide-editorconfig-no-vscode-ff950263adbf).

---

# Running the Project

## Requirements

Before starting, make sure you have installed:

- Node.js 18+
- Docker
- Docker Compose
- PostgreSQL
- Yarn or npm

---

## Cloning the project

```sh
git clone https://github.com/barbosamaatheus/english-talking-api
cd english-talking-api
```

---

## Starting the API

### 1. Start the PostgreSQL container

The project already contains a `docker-compose.yml` configured with PostgreSQL.

Run:

```sh
docker-compose up -d
```

This command starts the database container in the background.

---

### 2. Install dependencies

Using Yarn:

```sh
yarn
```

Or using npm:

```sh
npm install
```

---

### 3. Configure environment variables

Create a `.env` file in the project root.

Example:

```env
PORT=3333

DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME=english_talking_api

JWT_SECRET=your_secret_key
```

---

### 4. Run database migrations

```sh
yarn typeorm migration:run
```

Or:

```sh
npm run typeorm migration:run
```

---

### 5. Start the application

```sh
yarn dev
```

Or:

```sh
npm run dev
```

If everything works correctly, you should receive:

```sh
Server started!
```

---

# Authentication

Authentication is based on [Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/).

To authenticate, you must register as a user to receive an access token.

Follow the [Register User documentation](https://documenter.getpostman.com/view/8498314/Szf9V75Q?version=latest#8cbbe716-28b4-410b-bab3-0cddff5671d6).

For requests to the [Dialogue module](https://documenter.getpostman.com/view/8498314/Szf9V75Q?version=latest#c640e92c-5ec8-4dfe-8185-30de2f6368ca), your access token must be sent through the `Authorization` header using the `Bearer` prefix.

Example:

```http
Authorization: Bearer YOUR_ACCESS_TOKEN
```

---

# Tests

The tests are produced using:

- [Jest](https://jestjs.io/)
- [Supertest](https://github.com/visionmedia/supertest)

Run tests with:

```sh
yarn test
```

Or:

```sh
npm run test
```

---

# Common Problems

## Docker is not running

Check if Docker is active:

```sh
docker ps
```

---

## PostgreSQL connection error

Make sure:

- the PostgreSQL container is running;
- `.env` variables are correctly configured;
- port `5432` is available.

---

## Dependency installation issues

Remove `node_modules` and reinstall dependencies:

```sh
rm -rf node_modules
yarn
```

---

# Contributing

Thank you for being interested in making this project better.

We encourage everyone to help improve this project with:

- new features;
- bug fixes;
- performance improvements;
- documentation improvements.

Please take a moment to read our guides so the contribution process can be faster and easier.

---

## Contribution Guidelines

Take a moment to read our [Contribution Guidelines](/.github/CONTRIBUTING.md) so you can understand how to:

- submit issues;
- create commits;
- open pull requests.

---

# Code of Conduct

We expect all contributors to follow our [Code of Conduct](/.github/CODE_OF_CONDUCT.md).

Please read it carefully to understand what kind of behavior will and will not be tolerated.

---

# Need help?

If you need help with this project, feel free to open an issue describing the problem you are facing.

You can also contact:

```txt
maatheusb96@gmail.com
```

Or join our Discord community:

[Join Discord Team](https://discord.gg/XTrKQ8w)

---

# License

This project is licensed under the [MIT License](https://github.com/barbosamaatheus/english-talking-api/blob/master/LICENSE) ©
