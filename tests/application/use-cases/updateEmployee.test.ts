import { UpdateEmployee } from "../../../src/application/use-cases/update-employee";
import { EmployeeRepository } from "../../../src/infrastructure/database/employee-repository";
import { Employee } from "../../../src/domain/entities/employee";
import { EmployeeId } from "../../../src/domain/value-objects/employee-id";
import { EmployeeName } from "../../../src/domain/value-objects/employee-name";
import { EmployeeAge } from "../../../src/domain/value-objects/employee-age";

jest.mock("../../../src/infrastructure/database/employee-repository");

describe("UpdateEmployee", () => {
  let updateEmployee: UpdateEmployee;
  let employeeRepository: jest.Mocked<EmployeeRepository>;

  beforeEach(() => {
    employeeRepository = new EmployeeRepository() as jest.Mocked<EmployeeRepository>;
    updateEmployee = new UpdateEmployee(employeeRepository);
  });

  it("deve atualizar um funcionário com sucesso", async () => {
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

    await updateEmployee.execute(id, name, age, position);

    expect(employeeRepository.update).toHaveBeenCalledWith(employee);
  });

  it("deve lançar um erro se o repositório falhar ao atualizar", async () => {
    employeeRepository.update.mockImplementation(() => {
      throw new Error("Erro ao atualizar no repositório");
    });

    const id = "1";
    const name = "John Doe";
    const age = 30;
    const position = "Developer";

    await expect(updateEmployee.execute(id, name, age, position)).rejects.toThrow("Erro ao atualizar no repositório");
  });
});
