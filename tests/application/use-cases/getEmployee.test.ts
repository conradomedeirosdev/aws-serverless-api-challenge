import { GetEmployee } from "../../../src/application/use-cases/get-employee";
import { EmployeeRepository } from "../../../src/infrastructure/database/employee-repository";
import { Employee } from "../../../src/domain/entities/employee";
import { EmployeeId } from "../../../src/domain/value-objects/employee-id";
import { EmployeeName } from "../../../src/domain/value-objects/employee-name";
import { EmployeeAge } from "../../../src/domain/value-objects/employee-age";

jest.mock("../../../src/infrastructure/database/employee-repository");

describe("GetEmployee", () => {
  let getEmployee: GetEmployee;
  let employeeRepository: jest.Mocked<EmployeeRepository>;

  beforeEach(() => {
    employeeRepository = new EmployeeRepository() as jest.Mocked<EmployeeRepository>;
    getEmployee = new GetEmployee(employeeRepository);
  });

  it("deve retornar um funcionário com sucesso", async () => {
    const id = "1";
    const employee = new Employee(
      new EmployeeId(id),
      new EmployeeName("John Doe"),
      new EmployeeAge(30),
      "Developer"
    );

    employeeRepository.findById.mockResolvedValue(employee);

    const result = await getEmployee.execute(id);

    expect(result).toEqual(employee);
    expect(employeeRepository.findById).toHaveBeenCalledWith(new EmployeeId(id));
  });

  it("deve lançar um erro se o repositório falhar ao encontrar", async () => {
    employeeRepository.findById.mockImplementation(() => {
      throw new Error("Erro ao encontrar no repositório");
    });

    const id = "1";

    await expect(getEmployee.execute(id)).rejects.toThrow("Erro ao encontrar no repositório");
  });

  it("deve retornar null se o funcionário não for encontrado", async () => {
    const id = "1";
    employeeRepository.findById.mockResolvedValue(null);

    const result = await getEmployee.execute(id);

    expect(result).toBeNull();
    expect(employeeRepository.findById).toHaveBeenCalledWith(new EmployeeId(id));
  });
});
