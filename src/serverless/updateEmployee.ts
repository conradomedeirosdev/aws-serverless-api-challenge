import { APIGatewayProxyHandler } from "aws-lambda";
import { UpdateEmployee } from "../application/use-cases/update-employee";
import { EmployeeRepository } from "../infrastructure/database/employee-repository";

const employeeRepository = new EmployeeRepository();

export const updateEmployee: APIGatewayProxyHandler = async (event) => {
    try {
        const { id } = event.pathParameters || {};
        const { name, age, position } = JSON.parse(event.body || '{}');

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Employee ID is required' }),
            };
        }


        const updateEmployee = new UpdateEmployee(employeeRepository);
        await updateEmployee.execute(id, name, age, position);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Employee updated successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: (error as Error).message }),
        };
    }
};
