import { IEmployeeRepository } from "../interfaces/IEmployeeRepository";
import { Employee } from "../../domain/entities/employee";
import { EmployeeId } from "../../domain/value-objects/employee-id";
import { EmployeeName } from "../../domain/value-objects/employee-name";
import { EmployeeAge } from "../../domain/value-objects/employee-age";

export class CreateEmployee {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(
    id: string,
    name: string,
    age: number,
    position: string
  ): Promise<void> {
    const employee = new Employee(
      new EmployeeId(id),
      new EmployeeName(name),
      new EmployeeAge(age),
      position
    );
    await this.employeeRepository.save(employee);
  }
}
