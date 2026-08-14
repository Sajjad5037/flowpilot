import DiscussionNotesFeedback
    from "./DiscussionNotesFeedback";


export default function DiscussionNotesFeedbackPreview({
    component,
    previewMode = "employee",
}) {

    return (
        <DiscussionNotesFeedback
            component={component}
            previewMode={previewMode}
        />
    );
}