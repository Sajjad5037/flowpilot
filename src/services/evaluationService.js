import { mockEvaluationTemplates } from "../mock/evaluations";

export async function getEvaluationTemplates() {
  return mockEvaluationTemplates;
}

export async function getEvaluationTemplate(id) {
  return mockEvaluationTemplates.find(
    (t) => t.id === id
  );
}