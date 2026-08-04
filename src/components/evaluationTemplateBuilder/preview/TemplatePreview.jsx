import {
    Box,
    Typography
} from "@mui/material";

import PreviewSection from "./PreviewSection";
import { getPreviewRenderer } from "./previewRegistry";

export default function TemplatePreview({
    templateName,
    sections
}) {

    return (

        <Box
            sx={{
                maxWidth: 900,
                mx: "auto",
                py: 4
            }}
        >

            <Typography
                variant="h3"
                fontWeight={700}
                mb={1}
            >
                {templateName}
            </Typography>

            <Typography
                color="text.secondary"
                mb={5}
            >
                Preview Mode
            </Typography>

            {sections.length === 0 ? (

                <Typography color="text.secondary">
                    This template doesn't contain any sections yet.
                </Typography>

            ) : (

                sections.map(section => {

                    const Renderer = getPreviewRenderer(section);

                    if (Renderer === PreviewSection) {

                        return (

                            <PreviewSection
                                key={section.id}
                                title={section.name}
                            >

                                {section.questions.length === 0 ? (

                                    <Typography color="text.secondary">
                                        No components in this section.
                                    </Typography>

                                ) : (

                                    section.questions.map(question => (

                                        <Box
                                            key={question.id}
                                            sx={{ mb: 2 }}
                                        >

                                            <Typography
                                                fontWeight={600}
                                            >
                                                {question.label}
                                            </Typography>

                                            <Typography
                                                color="text.secondary"
                                            >
                                                {question.placeholder ||
                                                    question.text ||
                                                    "Preview content"}
                                            </Typography>

                                        </Box>

                                    ))

                                )}

                            </PreviewSection>

                        );

                    }

                    return (

                        <Renderer
                            key={section.id}
                            section={section}
                        />

                    );

                })

            )}

        </Box>

    );

}