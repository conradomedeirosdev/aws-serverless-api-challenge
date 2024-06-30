import { IEmployeeRepository } from "../interfaces/IEmployeeRepository";
import { EmployeeId } from "../../domain/value-objects/employee-id";

export class DeleteEmployee {
  constructor(private employeeRepository: IEmployeeRepository) {}

  async execute(id: string): Promise<void> {
    const employeeId = new EmployeeId(id);
    await this.employeeRepository.delete(employeeId);
  }
}
