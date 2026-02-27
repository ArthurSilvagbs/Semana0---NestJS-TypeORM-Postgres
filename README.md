# NestJS API - Gerenciamento de Usuários e Perfis

## Descrição do Projeto

Esta é uma API RESTful robusta desenvolvida com **NestJS** para o gerenciamento de usuários e seus respectivos perfis. O projeto foca na organização modular, utilizando **TypeORM** para persistência de dados e **PostgreSQL** como banco de dados principal. A API inclui funcionalidades de CRUD completo, paginação de resultados e documentação interativa com Swagger.

## Tecnologias Utilizadas

O projeto foi construído utilizando as seguintes ferramentas e bibliotecas:

| Tecnologia | Descrição |
| :--- | :--- |
| **NestJS (v11)** | Framework Node.js progressivo para construção de aplicações eficientes e escaláveis. |
| **TypeScript** | Linguagem principal para desenvolvimento com tipagem estática e segura. |
| **TypeORM** | ORM para integração com banco de dados relacional e mapeamento de entidades. |
| **PostgreSQL** | Banco de dados relacional utilizado no ambiente de desenvolvimento e produção. |
| **Swagger (OpenAPI)** | Para documentação automática e testes dos endpoints da API. |
| **Class Validator** | Para validação de dados de entrada (DTOs) via decoradores. |
| **Docker** | Para orquestração do ambiente de banco de dados e infraestrutura. |

## Funcionalidades

*   **Gerenciamento de Usuários**:
    *   Criação, consulta, atualização e exclusão de usuários.
    *   Listagem com suporte a paginação para melhor performance.
*   **Gerenciamento de Perfis**:
    *   Associação de perfis detalhados aos usuários.
    *   CRUD completo para a entidade de perfil.
*   **Documentação Automática**:
    *   Interface Swagger disponível para visualização e teste de todos os recursos da API em tempo real.
*   **Validação de Dados**:
    *   Uso de Pipes globais para garantir que apenas dados válidos cheguem aos controladores, aumentando a segurança.

## Como Executar o Projeto

### Pré-requisitos

*   Node.js (v20 ou superior).
*   Docker e Docker Compose.
*   Gerenciador de pacotes (npm, pnpm ou yarn).

### Instalação e Execução

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/ArthurSilvagbs/NestJS-API.git
    cd NestJS-API
    ```

2.  **Configure as variáveis de ambiente:**

    Crie um arquivo `.env` na raiz do projeto seguindo o modelo:

    ```env
    DB_HOST=localhost
    DB_PORT=5437
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_DATABASE=postgres
    PORT=3000
    ```

3.  **Inicie o banco de dados com Docker:**

    ```bash
    docker-compose up -d
    ```

4.  **Instale as dependências:**

    ```bash
    npm install
    ```

5.  **Inicie a aplicação:**

    ```bash
    npm run start:dev
    ```

6.  **Acesse a documentação:**

    A documentação Swagger estará disponível em `http://localhost:3000/docs`.

## Estrutura de Pastas

A organização do código segue os padrões modulares do NestJS:

```
NestJS-API/
├── src/
│   ├── user/           # Módulo de gerenciamento de usuários (Controladores, Serviços, Entidades)
│   │   ├── dto/        # Objetos de transferência de dados para usuários
│   │   ├── entities/   # Entidade User para o TypeORM
│   │   └── ...
│   ├── profile/        # Módulo de gerenciamento de perfis
│   │   ├── dto/        # Objetos de transferência de dados para perfis
│   │   ├── entities/   # Entidade Profile para o TypeORM
│   │   └── ...
│   ├── app.module.ts   # Módulo raiz que orquestra a aplicação
│   └── main.ts         # Ponto de entrada da aplicação e configuração do Swagger
├── test/               # Testes de integração e e2e
├── docker-compose.yml  # Configuração do container PostgreSQL
└── package.json        # Scripts de execução e dependências do projeto
```

## Licença

Este projeto está sob a licença UNLICENSED.

---

*Gerado por Manus AI em 27 de fevereiro de 2026.*
