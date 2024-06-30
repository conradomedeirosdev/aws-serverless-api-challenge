export class EmployeeName {
    constructor(public readonly value: string) {
      if (!value) throw new Error("Invalid name");
    }
  }
  