# AWS Serverless API Challenge

## Descrição
Este projeto implementa uma API serverless para gerenciar dados de funcionários utilizando AWS Lambda, DynamoDB e API Gateway. A API permite criar, consultar, atualizar e deletar registros de funcionários.

## Estrutura do Projeto
- `src/`: Código fonte da aplicação
  - `application/`: Casos de uso e interfaces
  - `domain/`: Entidades e objetos de valor
  - `infrastructure/`: Repositórios e integração com DynamoDB
  - `serverless/`: Handlers das funções Lambda
- `__tests__/`: Testes da aplicação

## Funcionalidades
- **Criar funcionário**: Cria um novo registro de funcionário.
- **Consultar funcionário**: Obtém os dados de um funcionário pelo ID.
- **Atualizar funcionário**: Atualiza os dados de um funcionário existente.
- **Deletar funcionário**: Remove um registro de funcionário.

## Configuração

### Pré-requisitos
- Node.js
- Serverless Framework
- AWS CLI configurado

### Instalação
1. Clone o repositório:
   ```sh
   git clone https://github.com/conradomedeirosdev/aws-serverless-api-challenge.git
