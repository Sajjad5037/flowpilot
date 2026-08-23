import Q3GoalsPlanning
    from "./Q3GoalsPlanning";


export default function Q3GoalsPlanningPreview({
    component,
    previewMode = "employee",
    responses = {},
    employeeResponses = {},
    supervisorResponses = {},
    hrResponses = {},
}) {

    return (
        <Q3GoalsPlanning
            component={component}
            previewMode={previewMode}
            responses={responses}
            employeeResponses={employeeResponses}
            supervisorResponses={supervisorResponses}
            hrResponses={hrResponses}
        />
    );
}