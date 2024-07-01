import { CreateEmployee } from "../../../src/application/use-cases/create-employee";
import { EmployeeRepository } from "../../../src/infrastructure/database/employee-repository";
import { Employee } from "../../../src/domain/entities/employee";
import { EmployeeId } from "../../../src/domain/value-objects/employee-id";
import { EmployeeName } from "../../../src/domain/value-objects/employee-name";
import { EmployeeAge } from "../../../src/domain/value-objects/employee-age";

jest.mock("../../../src/infrastructure/database/employee-repository");

describe("CreateEmployee", () => {
  let createEmployee: CreateEmployee;
  let employeeRepository: jest.Mocked<EmployeeRepository>;

  beforeEach(() => {
    employeeRepository = new EmployeeRepository() as jest.Mocked<EmployeeRepository>;
    createEmployee = new CreateEmployee(employeeRepository);
  });

  it("deve criar um novo funcionário com sucesso", async () => {
    const id = "1";
    const name = "John Doe";
    const age = 30;
    const position = "Developer";

    const employee = new Employee(
      new EmployeeId(id),
      new EmployeeName(name),
      new EmployeeAge(age),
      position
    );

    await createEmployee.execute(id, name, age, position);

    expect(employeeRepository.save).toHaveBeenCalledWith(employee);
  });

  it("deve lançar um erro se o repositório falhar ao salvar", async () => {
    employeeRepository.save.mockImplementation(() => {
      throw new Error("Erro ao salvar no repositório");
    });

    const id = "1";
    const name = "John Doe";
    const age = 30;
    const position = "Developer";

    await expect(createEmployee.execute(id, name, age, position)).rejects.toThrow("Erro ao salvar no repositório");
  });
});
