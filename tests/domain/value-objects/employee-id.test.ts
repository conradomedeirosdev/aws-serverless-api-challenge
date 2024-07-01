import { EmployeeId } from "../../../src/domain/value-objects/employee-id";

describe("EmployeeId", () => {
  it("deve criar uma instância de EmployeeId com sucesso", () => {
    const id = new EmployeeId("123");
    expect(id.value).toBe("123");
  });

  it("deve lançar um erro se o ID for inválido", () => {
    expect(() => new EmployeeId("")).toThrow("Invalid ID");
  });
});
