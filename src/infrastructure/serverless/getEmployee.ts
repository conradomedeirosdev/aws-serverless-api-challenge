import { APIGatewayProxyHandler } from "aws-lambda";
import { GetEmployee } from "../../application/use-cases/get-employee";
import { EmployeeRepository } from "../database/employee-repository";

const employeeRepository = new EmployeeRepository();

export const getEmployee: APIGatewayProxyHandler = async (event) => {
    try {
        const { id } = event.pathParameters || {};

        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Employee ID is required' }),
            };
        }

        const getEmployee = new GetEmployee(employeeRepository);
        const employee = await getEmployee.execute(id);

        return {
            statusCode: 200,
            body: JSON.stringify(employee),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: (error as Error).message }),
        };
    }
};
