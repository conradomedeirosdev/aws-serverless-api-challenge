import { IEmployeeRepository } from "../../application/interfaces/IEmployeeRepository";
import { Employee } from "../../domain/entities/employee";
import { EmployeeId } from "../../domain/value-objects/employee-id";
import { DynamoDB } from "aws-sdk";
import { EmployeeName } from "../../domain/value-objects/employee-name";
import { EmployeeAge } from "../../domain/value-objects/employee-age";
import 'dotenv/config';

export class EmployeeRepository implements IEmployeeRepository {
  private tableName = process.env.EMPLOYEES_TABLE!;
  private dbClient = new DynamoDB.DocumentClient();

  async save(employee: Employee): Promise<void> {
    await this.dbClient
      .put({
        TableName: this.tableName,
        Item: {
          employeeId: employee.employeeId.value,
          name: employee.name.value,
          age: employee.age.value,
          position: employee.position,
        },
      })
      .promise();
  }

  async findById(id: EmployeeId): Promise<Employee | null> {
    const result = await this.dbClient
      .get({
        TableName: this.tableName,
        Key: { employeeId: id.value },
      })
      .promise();

    if (!result.Item) return null;

    return new Employee(
      new EmployeeId(result.Item.employeeId),
      new EmployeeName(result.Item.name),
      new EmployeeAge(result.Item.age),
      result.Item.position
    );
  }

  async update(employee: Employee): Promise<void> {
    await this.dbClient
      .update({
        TableName: this.tableName,
        Key: { employeeId: employee.employeeId.value },
        UpdateExpression: "set #name = :name, age = :age, position = :position",
        ExpressionAttributeNames: {
          "#name": "name",
        },
        ExpressionAttributeValues: {
          ":name": employee.name.value,
          ":age": employee.age.value,
          ":position": employee.position,
        },
      })
      .promise();
  }

  async delete(employeeId: EmployeeId): Promise<void> {
    await this.dbClient
      .delete({
        TableName: this.tableName,
        Key: { employeeId: employeeId.value },
      })
      .promise();
  }
}
