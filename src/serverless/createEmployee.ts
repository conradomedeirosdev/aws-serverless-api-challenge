import { APIGatewayProxyHandler } from "aws-lambda";
import { CreateEmployee } from "../application/use-cases/create-employee";
import { EmployeeRepository } from "../infrastructure/database/employee-repository";

const employeeRepository = new EmployeeRepository();

export const createEmployee: APIGatewayProxyHandler = async (event) => {
    try {
        const { id, name, age, position } = JSON.parse(event.body || '{}');

        const createEmployee = new CreateEmployee(employeeRepository);
        await createEmployee.execute(id, name, age, position);

        return {
            statusCode: 201,
            body: JSON.stringify({ message: 'Employee created successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: (error as Error).message }),
        };
    }
};
