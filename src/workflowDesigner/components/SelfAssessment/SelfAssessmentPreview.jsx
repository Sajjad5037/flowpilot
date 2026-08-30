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

        <Box
            sx={{
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 2,
                p: {
                    xs: 2.5,
                    sm: 3,
                },
                mb: 4,
            }}
        >

            <Typography
                component="h2"
                sx={{
                    color: "#0F172A",
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    mb: component.description ? 0.75 : 2.5,
                }}
            >
                {component.title || "Self Assessment"}
            </Typography>

            {component.description && (
                <Typography
                    sx={{
                        color: "#64748B",
                        fontSize: 14,
                        lineHeight: 1.55,
                        mb: 2.5,
                    }}
                >
                    {component.description}
                </Typography>
            )}

            <Stack spacing={2.5}>

                {questions.length === 0 ? (

                    <Typography color="text.secondary">

                        No questions configured.

                    </Typography>

                ) : (

                    questions.map((question, index) => (

                        <Box
                            key={question.id}
                            sx={{
                                bgcolor: "#FCFAFF",
                                border: "1px solid #E9DDF8",
                                borderRadius: 2,
                                p: {
                                    xs: 2,
                                    sm: 2.5,
                                },
                            }}
                        >

                            <Typography
                                sx={{
                                    color: "#0F172A",
                                    fontSize: 14,
                                    fontWeight: 700,
                                    lineHeight: 1.45,
                                    mb: 1.25,
                                }}
                            >
                                {index + 1}. {question.text}
                            </Typography>

                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Enter your response..."
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
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        bgcolor: "#FFFFFF",
                                        borderRadius: 1.5,
                                        alignItems: "flex-start",
                                        "& fieldset": {
                                            borderColor: "#CBD5E1",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#94A3B8",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#7C3AED",
                                            borderWidth: 1,
                                        },
                                    },
                                    "& .MuiInputBase-input": {
                                        color: "#334155",
                                        fontSize: 14,
                                        lineHeight: 1.55,
                                    },
                                    "& .MuiInputBase-input::placeholder": {
                                        color: "#94A3B8",
                                        opacity: 1,
                                    },
                                }}
                            />

                        </Box>

                    ))

                )}

            </Stack>

        </Box>

    );

}