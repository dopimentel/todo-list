# Todo List App

## Descrição

Esta é uma aplicação Todo List Full-Stack que permite aos usuários adicionar, editar, deletar e filtrar tarefas. A aplicação é responsiva, seguindo a abordagem mobile-first e utiliza React com ContextAPI para gerenciar o estado global. Os componentes são estilizados com styled-components e o design é pensado para proporcionar uma boa experiência de usuário (UX).

## Deploy

A aplicação está em produção

Front-end: [`https://todo-list-fawn-three-71.vercel.app/`](https://todo-list-fawn-three-71.vercel.app/)

Back-end: [`https://todolist-back-end-681a7158fd6e.herokuapp.com/tasks`](https://todolist-back-end-681a7158fd6e.herokuapp.com/tasks)

## Funcionalidades

- Adicionar novas tarefas
- Editar tarefas existentes
- Marcar tarefas como completas/incompletas
- Deletar tarefas
- Filtrar tarefas (todas, completas, incompletas)
- Interface responsiva e amigável

## Tecnologias Utilizadas

- React / React Hooks
- Styled-components
- React Testing Library
- Material-UI Icons

## Instalação

### Pré-requisitos

- Node.js (versão 18 ou superior)
  ```bash
  nvm use 18
  
- npm ou yarn

### Passos

1. Clone o repositório:
    ```bash
    # Clone usando HTTPS
    git clone https://github.com/seu-usuario/todo-list.git
    ```

    ou
   
    ```bash
    # Clone usando SSH
    git clone git@github.com:dopimentel/todo-list.git
    
    ```

3. Navegue para o diretório do front-end:
    ```bash
    cd todo-list/front-end
    ```

4. Instale as dependências:
    ```bash
    npm install
    ```

    ou

    ```bash
    yarn install
    ```

## Uso

1. Inicie a aplicação:
    ```bash
    env $(cat .env) npm start
    ```

    ou

    ```bash
    env $(cat .env) yarn start
    ```

2. Abra o navegador e acesse:
    ```
    http://localhost:3000
    ```

## Testes

Os testes são escritos usando React Testing Library. Para executar os testes, use o comando:

```bash
npm test

