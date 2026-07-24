import { mockEmployees } from "../mock/employees";

export async function getEmployees() {

    return mockEmployees;

}

export async function createEmployee(employee) {

    console.log(employee);

}

export async function updateEmployee(id, employee) {

    console.log(id, employee);

}

export async function deleteEmployee(id) {

    console.log(id);

}