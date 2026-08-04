import { Typography } from "@mui/material";

import SectionCard from "../SectionCard";

export default function ParagraphSectionPreview({
    section
}) {

    const paragraph = section.questions.find(
        question => question.type === "paragraph"
    );

    const paragraphText =
        paragraph?.text ??
        paragraph?.placeholder ??
        "";

    return (

        <SectionCard
            title={section.name}
        >

            {paragraphText ? (

                <Typography
                    variant="body1"
                    sx={{
                        color: "text.secondary",
                        lineHeight: 1.8,
                        whiteSpace: "pre-wrap"
                    }}
                >
                    {paragraphText}
                </Typography>

            ) : (

                <Typography
                    variant="body2"
                    sx={{
                        fontStyle: "italic",
                        color: "text.disabled"
                    }}
                >
                    No content has been added yet.
                </Typography>

            )}

        </SectionCard>

    );

}