import express, { Request, Response } from "express";
import serverless from "serverless-http";
import { GetEmployee } from "../application/use-cases/get-employee";
import { EmployeeRepository } from "../infrastructure/database/employee-repository";

const app = express();

app.use(express.json());

const employeeRepository = new EmployeeRepository();

async function getEmployee(event: Request, res: Response) {
  const { employeeId } = event.params;

  if (!employeeId) {
    return res.status(400).json({ error: "Missing employee ID" });
  }

  try {
    const getEmployee = new GetEmployee(employeeRepository);
    const employee = await getEmployee.execute(employeeId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    return res.status(200).json(employee);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Could not get employee" });
  }
}

app.get("/employees/:employeeId", getEmployee);

app.use((_req, res) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

export const handler = serverless(app);
