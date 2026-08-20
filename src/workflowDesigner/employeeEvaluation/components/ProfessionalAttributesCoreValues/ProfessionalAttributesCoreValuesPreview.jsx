import ProfessionalAttributesCoreValues
    from "./ProfessionalAttributesCoreValues";


export default function ProfessionalAttributesCoreValuesPreview({
    component,
    previewMode = "employee",
}) {

    return (

        <ProfessionalAttributesCoreValues
            component={component}
            previewMode={previewMode}
        />

    );

}
