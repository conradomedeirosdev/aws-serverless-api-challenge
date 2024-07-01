import { EmployeeAge } from "../../../src/domain/value-objects/employee-age";

describe("EmployeeAge", () => {
    it("deve criar uma instância de EmployeeAge com sucesso", () => {
      const age = new EmployeeAge(30);
      expect(age.value).toBe(30);
    });
  
    it("deve lançar um erro se a idade for negativa", () => {
      expect(() => new EmployeeAge(-5)).toThrow("Invalid age");
    });
  
    it("deve lançar um erro se a idade for zero", () => {
      expect(() => new EmployeeAge(0)).toThrow("Invalid age");
    });
  });
