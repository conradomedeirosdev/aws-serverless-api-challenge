import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { UpdateEmployee } from "../application/use-cases/update-employee";
import { EmployeeRepository } from "../infrastructure/database/employee-repository";

const app = express();

app.use(express.json());

const employeeRepository = new EmployeeRepository();

async function updateEmployee(event: Request, res: Response) {
  const { employeeId } = event.params;
  const { name, age, position } = event.body;

  if (!name || !age || !position) {
    console.error("Missing required fields", { employeeId, name, age, position });
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const updateEmployee = new UpdateEmployee(employeeRepository);
    await updateEmployee.execute(employeeId, name, age, position);
    return res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ error: "Could not update employee" });
  }
}

app.put("/employees/:employeeId", updateEmployee);

app.use((_req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
