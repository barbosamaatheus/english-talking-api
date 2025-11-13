<p align="center">
  <img src="https://i.ibb.co/4s5X0kD/Whats-App-Image-2020-04-23-at-13-43-12.jpg" height="150" width="150" alt="logo" />
</p>

<h3 align="center">
  Esta API tem como objetivo proporcionar aos usuários a possibilidade de conduzir diálogos em inglês, nos quais as conversas e respostas são registradas e avaliadas pelos próprios usuários. <br> :alien:
</h3>

<div align="center">

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Licença: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

</div>

# [English Talking API](https://documenter.getpostman.com/view/8498314/Szf9V75Q)

# Indice

- [Overview](#Overview)
- [Running the Project](#Running-the-Project)
- [Authentication](#Authentication)
- [Contributing](#Contributing)
  - [Contribution Guidelines](#Contribution-Guidelines)
- [Code of Conduct](#Code-of-Conduct)
- [Need help?](#Need-help?)
- [License](#License)

# Visão Geral

Esta é uma API RestFull criada na linguagem JavaScript utilizando tecnologia e banco de dados PostgreSQL.

Utilizamos as integrações Eslint, Prettier, editorconfig e Airbnb Style Guide como formatadores automáticos de código. Baixe os plug-ins no seu editor.

1. [ESLint](https://github.com/Microsoft/vscode-eslint)
2. [Prettier](https://github.com/prettier/prettier-vscode)
3. [Editor config](https://github.com/editorconfig/editorconfig-vscode)

> Para garantir que o Prettier formate ao salvar, insira `“editor.formatOnSave”: true` nas suas configurações de usuário se você usar o VSCode.
> Para aprender mais, entre neste [post](https://medium.com/matheus-barbosa/integrating-prettier-eslint-airbnb-style-guide-editorconfig-no-vscode-ff950263adbf)

The tests are produced using [Jest](https://jestjs.io/) and [supertest](https://github.com/visionmedia/supertest)

**See a [API Documentation](https://documenter.getpostman.com/view/8498314/Szf9V75Q)**

# Running the Project

### Cloning the project

```sh
$ git clone https://github.com/barbosamaatheus/english-talking-api
$ cd english-talking-api
```

### Starting the API

```sh
# Creating the database Docker image:
# Within the project, there is already a docker-compose.yml file that has the
# PostgreSQL as a database, just have Docker(https://www.docker.com/) installed on your machine.
$ docker-compose up -d # Will start in the background and will not block the shell
# Install all project dependencies
$ yarn # or npm install
# Running migrations to the database
$ yarn typeorm migration:run
# Starting the project
$ yarn dev
## You should receive a "Server started!" on your terminal
```

# Authentication

Authentication is based on [Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/).

To authenticate, you must register as a user to receive an access token. Follow the [Register User documentation](https://documenter.getpostman.com/view/8498314/Szf9V75Q?version=latest#8cbbe716-28b4-410b-bab3-0cddff5671d6)

In requests for the [Dialogue module](https://documenter.getpostman.com/view/8498314/Szf9V75Q?version=latest#c640e92c-5ec8-4dfe-8185-30de2f6368ca), your access token must be passed through the 'Authorization' attribute in the request header with the word Bearer as prefix.

# Contributing

Thank you for being interested on making this project better. We encourage everyone to help improving this project with some new features, bug fixes and performance issues. Please take a little bit of your time to read our guides, so this process can be faster and easier.

### Contribution Guidelines

Take a moment to read about our [Contribution Guidelines](/.github/CONTRIBUTING.md) so you can understand how to submit an issue, commit and create pull requests.

# Code of Conduct

We expect you to follow our [Code of Conduct](/.github/CODE_OF_CONDUCT.md). You can read it to understand what kind of behaviour will and will not be tolerated.

# Need help?

If you need help with this, feel free to open an issue with a description of the problem you're facing. Or, if you prefer, you can send email to maatheusb96@gmail.com  
You also could join our discord team in case you need any help or have any questions. [Join discord team](https://discord.gg/XTrKQ8w).

# License

[MIT License ](https://github.com/barbosamaatheus/english-talking-api/blob/master/LICENSE) ©
