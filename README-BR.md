<p align="center">
  <img src="https://i.ibb.co/4s5X0kD/Whats-App-Image-2020-04-23-at-13-43-12.jpg" height="150" width="150" alt="logo" />
</p>

<h3 align="center">
  Esta API tem como objetivo proporcionar aos usuários a possibilidade de conduzir diálogos em inglês, nos quais as conversas e respostas são registradas e avaliadas pelos próprios usuários. <br> :alien:
</h3>

<div align="center">

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

</div>

# [English Talking API](https://documenter.getpostman.com/view/8498314/Szf9V75Q)

# Indice

- [Visão Geral](#Visão-Geral)
- [Executando o projeto](#Running-the-Project)
- [Autenticação](#Authentication)
- [Contribuindo](#Contributing)
  - [Guidelines da contribuição](#Contribution-Guidelines)
- [Código de Conduta](#Code-of-Conduct)
- [Precisa de Ajuda?](#Need-help?)
- [Licença](#License)

# Visão Geral

Esta é uma API RestFull criada na linguagem JavaScript utilizando tecnologia [Node.js](https://nodejs.org/en/download/) e banco de dados PostgreSQL.

Utilizamos as integrações Eslint, Prettier, editorconfig e Airbnb Style Guide como formatadores automáticos de código. Baixe os plug-ins no seu editor.

1. [ESLint](https://github.com/Microsoft/vscode-eslint)
2. [Prettier](https://github.com/prettier/prettier-vscode)
3. [Editor config](https://github.com/editorconfig/editorconfig-vscode)

> Para garantir que o Prettier formate ao salvar, insira `“editor.formatOnSave”: true` nas suas configurações de usuário se você usar o VSCode.
> Para aprender mais, entre neste [post](https://medium.com/matheus-barbosa/integrating-prettier-eslint-airbnb-style-guide-editorconfig-no-vscode-ff950263adbf)

Os testes são realizados usando [Jest](https://jestjs.io/) e o [supertest](https://github.com/visionmedia/supertest)

**Veja [API Documentation](https://documenter.getpostman.com/view/8498314/Szf9V75Q)**

# Executando o projeto

### Clonando o projeto

```sh
$ git clone https://github.com/barbosamaatheus/english-talking-api
$ cd english-talking-api
```

### Iniciando a API

```sh
# Criando a imagem Docker do banco de dados:
# Dentro do projeto, já existe um arquivo docker-compose.yml que tem o
# PostgreSQL como banco de dados, basta ter o Docker (https://www.docker.com/) instalado em sua máquina.
$ docker-compose up -d # Iniciará em segundo plano e não bloqueará o shell
# Instale todas as dependências do projeto
$ yarn # ou npm install
# Executando migrations para o banco de dados
$ yarn typeorm migration:run
# Iniciando o projeto
$ yarn dev
## Você deverá receber um "Server started!" no seu terminal
```

# Autenticação

A autenticação é baseada em [Bearer Authentication](https://swagger.io/docs/specification/authentication/bearer-authentication/).

Para autenticar, você deve se registrar como usuário para receber um token de acesso. Siga as instruções em [Register User documentation](https://documenter.getpostman.com/view/8498314/Szf9V75Q?version=latest#8cbbe716-28b4-410b-bab3-0cddff5671d6)

Em requests para o [Dialogue module](https://documenter.getpostman.com/view/8498314/Szf9V75Q?version=latest#c640e92c-5ec8-4dfe-8185-30de2f6368ca),seu token de acesso deve ser passado pelo atributo “Authorization” no cabeçalho da solicitação com a word Bearer como prefixo.

# Contribuindo

Obrigado pelo seu interesse em melhorar este projeto. Incentivamos todos a ajudar a melhorar este projeto com novos recursos, correções de bugs e problemas de desempenho. Reserve um pouco do seu tempo para ler nossos guias, para que esse processo seja mais rápido e fácil.

### Guidelines da contribuição

Reserve um momento para ler sobre as nossas [Contribution Guidelines](/.github/CONTRIBUTING.md) para que você possa entender como fazer e enviar uma issue, commit e criar pull requests.

# Código de Conduta

Esperamos que você siga nossos [Code of Conduct](/.github/CODE_OF_CONDUCT.md). Você pode lê-lo para entender que tipo de comportamento será ou não tolerado.

# Precisa de Ajuda?

Se precisar de ajuda, sinta-se à vontade para abrir uma issue com uma descrição do problema que está enfrentando. Ou, se preferir, envie um e-mail para maatheusb96@gmail.com  
Você também pode se juntar à nossa equipe do Discord caso precise de ajuda ou tenha alguma dúvida. [Join discord team](https://discord.gg/XTrKQ8w).

# Licença

[MIT License ](https://github.com/barbosamaatheus/english-talking-api/blob/master/LICENSE) ©
