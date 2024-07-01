import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { DeleteEmployee } from "../application/use-cases/delete-employee";
import { EmployeeRepository } from "../infrastructure/database/employee-repository";

const app = express();

app.use(express.json());

const employeeRepository = new EmployeeRepository();

async function deleteEmployee(event: Request, res: Response) {
  const { employeeId } = event.params;

  if (!employeeId) {
    return res.status(400).json({ error: "Missing employee ID" });
  }

  try {
    const deleteEmployee = new DeleteEmployee(employeeRepository);
    await deleteEmployee.execute(employeeId);
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Could not delete employee" });
  }
}

app.delete("/employees/:employeeId", deleteEmployee);

app.use((_req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
