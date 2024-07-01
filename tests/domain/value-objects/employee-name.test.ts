import { EmployeeName } from "../../../src/domain/value-objects/employee-name";

describe("EmployeeName", () => {
  it("deve criar uma instância de EmployeeName com sucesso", () => {
    const name = new EmployeeName("John Doe");
    expect(name.value).toBe("John Doe");
  });

  it("deve lançar um erro se o nome for inválido", () => {
    expect(() => new EmployeeName("")).toThrow("Invalid name");
  });
});
