import ParagraphSectionPreview from "./renderers/ParagraphSectionPreview";
import PreviewSection from "./PreviewSection";

export const PREVIEW_RENDERERS = {
    paragraph_section: ParagraphSectionPreview,
};

export function getPreviewRenderer(section) {

    const rendererType = section.previewType;

    if (
        rendererType &&
        PREVIEW_RENDERERS[rendererType]
    ) {
        return PREVIEW_RENDERERS[rendererType];
    }

    return PreviewSection;

}