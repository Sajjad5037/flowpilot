import KPIResults from "./KPIResults";


export default function KPIResultsPreview({
    component,
    previewMode = "employee",
}) {

    return (
        <KPIResults
            component={component}
            previewMode={previewMode}
        />
    );
}