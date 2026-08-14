import ExtraProjects from "./ExtraProjects";


export default function ExtraProjectsPreview({
    component,
    previewMode = "employee",
}) {

    return (
        <ExtraProjects
            component={component}
            previewMode={previewMode}
        />
    );
}