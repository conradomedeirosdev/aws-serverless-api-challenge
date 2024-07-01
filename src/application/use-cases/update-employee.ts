import { IEmployeeRepository } from "../interfaces/IEmployeeRepository";
import { Employee } from "../../domain/entities/employee";
import { EmployeeId } from "../../domain/value-objects/employee-id";
import { EmployeeName } from "../../domain/value-objects/employee-name";
import { EmployeeAge } from "../../domain/value-objects/employee-age";

export class UpdateEmployee {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(employeeId: string, name: string, age: number, position: string): Promise<void> {
    const id = new EmployeeId(employeeId);
    const employeeName = new EmployeeName(name);
    const employeeAge = new EmployeeAge(age);
    const employee = new Employee(id, employeeName, employeeAge, position);
    await this.employeeRepository.update(employee);
  }
}