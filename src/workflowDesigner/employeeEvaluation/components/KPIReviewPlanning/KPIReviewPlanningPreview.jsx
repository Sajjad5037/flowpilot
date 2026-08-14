import KPIReviewPlanning from "./KPIReviewPlanning";


export default function KPIReviewPlanningPreview({
    component,
    previewMode = "employee",
}) {

    return (
        <KPIReviewPlanning
            component={component}
            previewMode={previewMode}
        />
    );
}