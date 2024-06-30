import { EmployeeId } from "../value-objects/employee-id";
import { EmployeeName } from "../value-objects/employee-name";
import { EmployeeAge } from "../value-objects/employee-age";

export class Employee {
  constructor(
    public readonly id: EmployeeId,
    public readonly name: EmployeeName,
    public readonly age: EmployeeAge,
    public readonly position: string
  ) {}
}
