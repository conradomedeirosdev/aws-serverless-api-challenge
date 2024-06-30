import { IEmployeeRepository } from "../interfaces/IEmployeeRepository";
import { Employee } from "../../domain/entities/employee";
import { EmployeeId } from "../../domain/value-objects/employee-id";

export class GetEmployee {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(id: string): Promise<Employee | null> {
    const employeeId = new EmployeeId(id);
    const employee = await this.employeeRepository.findById(employeeId);
    return employee;
  }
}
