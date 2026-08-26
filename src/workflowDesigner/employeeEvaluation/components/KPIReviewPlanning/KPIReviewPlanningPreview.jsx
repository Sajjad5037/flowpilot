import KPIReviewPlanning from "./KPIReviewPlanning";


export default function KPIReviewPlanningPreview({
    component,
    previewMode = "employee",
    isBuilderPreview = false,
    onComponentChange,
}) {

    return (
        <KPIReviewPlanning
            component={component}
            previewMode={previewMode}
            isBuilderPreview={isBuilderPreview}
            onComponentChange={onComponentChange}
        />
    );
}