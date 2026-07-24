import { mockSupervisors } from "../mock/supervisors";

export async function getSupervisors() {
  return mockSupervisors;
}

export async function createSupervisor(supervisor) {
  console.log(supervisor);
}

export async function updateSupervisor(id, supervisor) {
  console.log(id, supervisor);
}

export async function deleteSupervisor(id) {
  console.log(id);
}