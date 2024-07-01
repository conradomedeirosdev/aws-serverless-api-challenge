import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { CreateEmployee } from "../application/use-cases/create-employee";
import { EmployeeRepository } from "../infrastructure/database/employee-repository";
import { EmployeeId } from "../domain/value-objects/employee-id";

const app = express();

app.use(express.json());

const employeeRepository = new EmployeeRepository();

async function createEmployee(event: Request, res: Response) {
  const { employeeId, name, age, position } = event.body;

  if (!employeeId || !name || !age || !position) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const existingEmployee = await employeeRepository.findById(new EmployeeId(employeeId));
    if (existingEmployee) {
      return res.status(400).json({ error: "Employee ID already exists" });
    }

    const createEmployee = new CreateEmployee(employeeRepository);
    await createEmployee.execute(employeeId, name, age, position);
    return res.status(201).json({ message: "Employee created successfully", employeeId, name, age, position });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Could not create employee" });
  }
}

app.post("/employees", createEmployee);

app.use((_req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
