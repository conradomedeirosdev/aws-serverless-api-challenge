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
2. Instale as dependências:
   ```
   npm install
3. Configure suas credenciais da AWS:
   ```
   aws configure
4. Defina a variável de ambiente no arquivo serverless.yml:
   ```yaml
   environment:
   EMPLOYEES_TABLE: "Employees"
### Deploy
Para fazer o deploy da aplicação na AWS:
```
sls deploy
```
## Endpoints
### Criar Funcionário
- URL: /employees
- Método: POST
- Body:
```json
{
  "employeeId": "unique-id",
  "name": "John Doe",
  "age": 30,
  "position": "Developer"
}
```
### Consultar Funcionário
- URL: /employees/{employeeId}
- Método: GET
### Atualizar Funcionário
- URL: /employees/{employeeId}
- Método: PUT
- Body:
```json
{
  "name": "Jane Doe",
  "age": 31,
  "position": "Senior Developer"
}
```
### Deletar Funcionário
- URL: /employees/{employeeId}
- Método: DELETE
## Testes
Os testes são implementados utilizando Jest. Para rodar os testes:
```
npm test
```

## Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
