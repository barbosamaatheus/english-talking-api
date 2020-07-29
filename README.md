<p align="center">
  <img src="https://i.ibb.co/4s5X0kD/Whats-App-Image-2020-04-23-at-13-43-12.jpg" height="150" width="150" alt="logo" />
</p>

<h3 align="center">
  This API aims to provide users with the possibility of conducting dialogues in English where the conversations and answers are registered and evaluated by the users themselves. <br> :alien:
</h3>

<div align="center">

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

</div>

# [English Talking API](https://documenter.getpostman.com/view/8498314/Szf9V75Q?version=latest)

# Table of Contents

- [Overview](#Overview)
- [Authentication](#Authentication)
- [Contributing](#Contributing)
  - [Contribution Guidelines](#Contribution-Guidelines)
- [Code of Conduct](#Code-of-Conduct)
- [Need help?](#Need-help?)
- [License](#License)

# Overview

This is a RestFull API built in the javaScript language using [Node.js](https://nodejs.org/en/download/) technology and with NOSql database
[MongoDB](https://www.mongodb.com/)

We use the Eslint, Prettier, editorconfig and Airbnb Style Guide integrations as an automatic code formatter. Please download the plugins in your editor.

1. [ESLint](https://github.com/Microsoft/vscode-eslint)
2. [Prettier](https://github.com/prettier/prettier-vscode)
3. [Editor config](https://github.com/editorconfig/editorconfig-vscode)

> For make sure Prettier formats on save. Insert `"editor.formatOnSave": true` into your User Settings if you use VSCode.
> To learn more, you can be this [post](https://medium.com/matheus-barbosa/integrating-prettier-eslint-airbnb-style-guide-editorconfig-no-vscode-ff950263adbf)

The tests are produced using [Jest](https://jestjs.io/) and [supertest](https://github.com/visionmedia/supertest)

See a [API Documentation](https://documenter.getpostman.com/view/8498314/Szf9V75Q?version=latest)

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

# License

[MIT License ](https://github.com/barbosamaatheus/english-talking-api/blob/master/LICENSE) ©
