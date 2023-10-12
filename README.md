<p  align="center">
<a  href="http://nestjs.com/"  target="blank"><img  src="https://nestjs.com/img/logo-small.svg"  width="200"  alt="Nest Logo"  /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

<h1  align="center">API Livescore</h1>

## Descrição

Aplicação usando NestJS e WebSockets a fim de apresentar dados de jogos de futebol em tempo real.

## Instalação

```bash
$  git clone https://github.com/abneroliveiradev/api-livescores.git
$  npm install
```

## Rodando a API Livescore

```bash
# modo desenvolvimento
$  npm run start

# modo debug
$  npm run start:dev

# modo produção
$  npm run build
$  npm run start:prod
```

A API roda em http://localhost:3333

## Rodar o Cliente

```bash
# clonar o projeto
$ git clone https://github.com/abneroliveiradev/client-livescores.git
# rodar em modo desenvolvimento
$ yarn
$ yarn dev

# Rodar via docker
# Criar a imagem
$ docker build -t livescore-client .
# Criar o container
$ docker run -d --name client-livescore -p 80:5137 -t livescore-client
```

O cliente roda em http://localhost

## Banco de dados

Para rodar a aplicação é necessário um MySQL 8.0 rodando na porta 3306

```bash
# Rodar via docker
# Criar o container
$ docker run -d --name mysql-livescores -p 80:5137 -t livescores-client
```

Depois de criado o MySQL rode o script [LivescoresDB.sql](https://github.com/abneroliveiradev/api-livescores/blob/main/LiveScoreDB.sql) (pasta root do projeto) no seu SGBD para criar o banco de dados e as tabelas necessárias.

## Como usar

Após a criação infraestrutura, use o Insomnia para enviar as requisições de eventos para a rota POST /events de acordo com o modelo de corpo de requisição abaixo:

```
{
  "gameMinute": 0,
  "competitionId": 1,
  "teamAId": 4,
  "teamBId": 3,
  "scoreA": 0,
  "scoreB": 0,
  "startTime": "2022-01-02 16:00:00",
  "eventDescription": "Jogo 4 - agendado",
  "status": "scheduled"
}
```

Para facilitar criei uma coleção de requisições que serve como modelo do processo como um todo.
Importe no seu Insomnia o arquivo **Insomnia_Exemplo_API_Livescore_2023-10-12.json** que está na pasta root do projeto ou [clique aqui](https://github.com/abneroliveiradev/api-livescores/blob/main/Insomnia_Exemplo_API_Livescore_2023-10-12)

## Exemplo do Uso

<iframe width="560" height="315" src="https://www.youtube.com/embed/Qnt3FDjg-Bc?si=ht3uJcMMm61EgnzI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Autor

- Author - [Abner Oliveira](https://github.com/abneroliveiradev)

- Website - [Blog](https://abneroliveira.vercel.app/)

## Licença

Nest is [MIT licensed](LICENSE).
