import { Employee } from "../../domain/entities/employee";
import { EmployeeId } from "../../domain/value-objects/employee-id";

export interface IEmployeeRepository {
  save(employee: Employee): Promise<void>;
  findById(id: EmployeeId): Promise<Employee | null>;
  update(employee: Employee): Promise<void>;
  delete(id: EmployeeId): Promise<void>;
}
