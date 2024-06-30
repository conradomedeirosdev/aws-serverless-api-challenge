export class EmployeeId {
    constructor(public readonly value: string) {
      if (!value) throw new Error("Invalid ID");
    }
  }
  