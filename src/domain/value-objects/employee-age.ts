export class EmployeeAge {
    constructor(public readonly value: number) {
      if (value <= 0) throw new Error("Invalid age");
    }
  }
  