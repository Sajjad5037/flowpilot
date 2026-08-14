import Q3GoalsPlanning
    from "./Q3GoalsPlanning";


export default function Q3GoalsPlanningPreview({
    component,
    previewMode = "employee",
}) {

    return (
        <Q3GoalsPlanning
            component={component}
            previewMode={previewMode}
        />
    );
}