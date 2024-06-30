import { APIGatewayProxyHandler } from "aws-lambda";
import { DeleteEmployee } from "../application/use-cases/delete-employee";
import { EmployeeRepository } from "../infrastructure/database/employee-repository";

const employeeRepository = new EmployeeRepository();

export const deleteEmployee: APIGatewayProxyHandler = async (event) => {
    try {
        const id = event.pathParameters?.id;

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Employee ID is required' }),
            };
        }

        const deleteEmployee = new DeleteEmployee(employeeRepository);
        await deleteEmployee.execute(id);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Employee deleted successfully' }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: (error as Error).message }),
        };
    }
};
