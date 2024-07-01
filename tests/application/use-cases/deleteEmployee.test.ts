import { DeleteEmployee } from "../../../src/application/use-cases/delete-employee";
import { EmployeeRepository } from "../../../src/infrastructure/database/employee-repository";
import { EmployeeId } from "../../../src/domain/value-objects/employee-id";

jest.mock("../../../src/infrastructure/database/employee-repository");

describe("DeleteEmployee", () => {
  let deleteEmployee: DeleteEmployee;
  let employeeRepository: jest.Mocked<EmployeeRepository>;

  beforeEach(() => {
    employeeRepository = new EmployeeRepository() as jest.Mocked<EmployeeRepository>;
    deleteEmployee = new DeleteEmployee(employeeRepository);
  });

  it("deve deletar um funcionário com sucesso", async () => {
    const id = "1";

    await deleteEmployee.execute(id);

    expect(employeeRepository.delete).toHaveBeenCalledWith(new EmployeeId(id));
  });

  it("deve lançar um erro se o repositório falhar ao deletar", async () => {
    employeeRepository.delete.mockImplementation(() => {
      throw new Error("Erro ao deletar no repositório");
    });

    const id = "1";

    await expect(deleteEmployee.execute(id)).rejects.toThrow("Erro ao deletar no repositório");
  });
});
