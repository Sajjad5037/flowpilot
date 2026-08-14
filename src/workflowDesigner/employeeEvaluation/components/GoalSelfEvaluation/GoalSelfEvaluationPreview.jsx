import GoalSelfEvaluation
    from "./GoalSelfEvaluation";


export default function GoalSelfEvaluationPreview({
    component,
    previewMode = "employee",
}) {

    return (

        <GoalSelfEvaluation
            component={component}
            previewMode={previewMode}
        />

    );

}