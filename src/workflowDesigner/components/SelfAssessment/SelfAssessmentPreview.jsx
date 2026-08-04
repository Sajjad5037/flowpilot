import {
    Box,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function SelfAssessmentPreview({

    component,
    previewMode,
    responses = {},
    onResponsesChange

}) {

    const questions = component.questions || [];

    function handleAnswerChange(questionId, value) {

        if (!onResponsesChange) return;

        onResponsesChange({

            ...responses,

            self_assessment: {

                ...(responses.self_assessment || {}),

                [questionId]: value

            }

        });

    }

    return (

        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                {component.title || "Self Assessment"}
            </Typography>

            <Stack spacing={3}>

                {questions.length === 0 ? (

                    <Typography color="text.secondary">

                        No questions configured.

                    </Typography>

                ) : (

                    questions.map((question, index) => (

                        <Box key={question.id}>

                            <Typography
                                variant="body1"
                                fontWeight={600}
                                mb={1}
                            >
                                {index + 1}. {question.text}
                            </Typography>

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                disabled={previewMode !== "employee"}
                                value={
                                    previewMode === "employee"
                                        ? (
                                            responses.self_assessment?.[
                                                question.id
                                            ] || ""
                                        )
                                        : "Employee response will appear here."
                                }
                                onChange={(event) =>
                                    handleAnswerChange(
                                        question.id,
                                        event.target.value
                                    )
                                }
                            />

                        </Box>

                    ))

                )}

            </Stack>

        </Box>

    );

}