import CompanyInformation from "./CompanyInformation";

export default function CompanyInformationPreview({
    component,
    previewMode,
}) {

    return (

        <CompanyInformation
            component={component}
            previewMode={previewMode}
        />

    );

}