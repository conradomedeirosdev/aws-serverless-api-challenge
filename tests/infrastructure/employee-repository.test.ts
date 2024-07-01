import { EmployeeRepository } from "../../src/infrastructure/database/employee-repository";
import { Employee } from "../../src/domain/entities/employee";
import { EmployeeId } from "../../src/domain/value-objects/employee-id";
import { EmployeeName } from "../../src/domain/value-objects/employee-name";
import { EmployeeAge } from "../../src/domain/value-objects/employee-age";
import { DynamoDB } from "aws-sdk";

jest.mock("aws-sdk", () => {
  const mDocumentClient = {
    put: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    promise: jest.fn(),
  };
  return {
    DynamoDB: {
      DocumentClient: jest.fn(() => mDocumentClient),
    },
  };
});

describe("EmployeeRepository", () => {
  let repository: EmployeeRepository;
  let documentClient: jest.Mocked<DynamoDB.DocumentClient>;

  beforeEach(() => {
    documentClient = new DynamoDB.DocumentClient() as jest.Mocked<DynamoDB.DocumentClient>;
    repository = new EmployeeRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("deve salvar um funcionário com sucesso", async () => {
    documentClient.put.mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    } as any);

    const employee = new Employee(
      new EmployeeId("1"),
      new EmployeeName("John Doe"),
      new EmployeeAge(30),
      "Developer"
    );

    await repository.save(employee);

    expect(documentClient.put).toHaveBeenCalledWith({
      TableName: process.env.EMPLOYEES_TABLE,
      Item: {
        employeeId: employee.employeeId.value,
        name: employee.name.value,
        age: employee.age.value,
        position: employee.position,
      },
    });
  });

  it("deve encontrar um funcionário por ID com sucesso", async () => {
    const mockDbResponse = {
      Item: {
        employeeId: "1",
        name: "John Doe",
        age: 30,
        position: "Developer"
      },
    };

    documentClient.get.mockReturnValue({
      promise: jest.fn().mockResolvedValue(mockDbResponse),
    } as any);

    const result = await repository.findById(new EmployeeId("1"));

    expect(result).toEqual(
      new Employee(
        new EmployeeId("1"),
        new EmployeeName("John Doe"),
        new EmployeeAge(30),
        "Developer"
      )
    );
    expect(documentClient.get).toHaveBeenCalledWith({
      TableName: process.env.EMPLOYEES_TABLE,
      Key: { employeeId: "1" },
    });
  });

  it("deve atualizar um funcionário com sucesso", async () => {
    documentClient.update.mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    } as any);

    const employee = new Employee(
      new EmployeeId("1"),
      new EmployeeName("John Doe"),
      new EmployeeAge(30),
      "Developer"
    );

    await repository.update(employee);

    expect(documentClient.update).toHaveBeenCalledWith({
      TableName: process.env.EMPLOYEES_TABLE,
      Key: { employeeId: employee.employeeId.value },
      UpdateExpression: "set #name = :name, age = :age, position = :position",
      ExpressionAttributeNames: {
        "#name": "name",
      },
      ExpressionAttributeValues: {
        ":name": employee.name.value,
        ":age": employee.age.value,
        ":position": employee.position,
      },
    });
  });

  it("deve deletar um funcionário com sucesso", async () => {
    documentClient.delete.mockReturnValue({
      promise: jest.fn().mockResolvedValue({}),
    } as any);

    await repository.delete(new EmployeeId("1"));

    expect(documentClient.delete).toHaveBeenCalledWith({
      TableName: process.env.EMPLOYEES_TABLE,
      Key: { employeeId: "1" },
    });
  });
});
