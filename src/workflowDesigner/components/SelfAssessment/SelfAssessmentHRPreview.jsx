import {
    Box,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function SelfAssessmentHRPreview({

    component,
    employeeResponses,
    supervisorResponses,
    responses,
    onResponsesChange

}) {

    const questions = component.questions || [];

    function updateHRResponse(questionId, value) {

        onResponsesChange?.({

            ...responses,

            self_assessment: {

                ...(responses?.self_assessment || {}),

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
                {component.title || "Self Assessment Review"}
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

            <Stack spacing={3}>

                {questions.length === 0 ? (

                    <Typography color="text.secondary">

                        No questions configured.

                    </Typography>

                ) : (

                    questions.map((question, index) => (

                        <Box key={question.id}>

                            <Typography
                                sx={{
                                    color: "#0F172A",
                                    fontSize: 15,
                                    fontWeight: 700,
                                    lineHeight: 1.45,
                                    mb: 2,
                                }}
                            >
                                {index + 1}. {question.text}
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: {
                                        xs: "1fr",
                                        md: "repeat(2, minmax(0, 1fr))",
                                    },
                                    gap: 2,
                                }}
                            >

                                {/* Employee Response */}

                                <Box
                                    sx={{
                                        bgcolor: "#F5F8FF",
                                        border: "1px solid #D6E4FF",
                                        borderRadius: 2,
                                        p: 2,
                                        minHeight: 96,
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            color: "#173A82",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            mb: 1,
                                        }}
                                    >
                                        Employee Proposal
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#334155",
                                            fontSize: 14,
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        {employeeResponses?.self_assessment?.[question.id] ||
                                            "No employee response."}
                                    </Typography>

                                </Box>

                                {/* Supervisor Response */}

                                <Box
                                    sx={{
                                        bgcolor: "#FCF8FF",
                                        border: "1px solid #E9DDF8",
                                        borderRadius: 2,
                                        p: 2,
                                        minHeight: 96,
                                    }}
                                >

                                    <Typography
                                        sx={{
                                            color: "#6B149D",
                                            fontSize: 12,
                                            fontWeight: 700,
                                            textTransform: "uppercase",
                                            mb: 1,
                                        }}
                                    >
                                        Supervisor Proposal
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: "#334155",
                                            fontSize: 14,
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        {supervisorResponses?.self_assessment?.[question.id] ||
                                            "No supervisor response."}
                                    </Typography>

                                </Box>

                                
                                

                            </Box>

                            <Box
                                sx={{
                                    bgcolor: "#F3FFF8",
                                    border: "1px solid #9DECC1",
                                    borderRadius: 2,
                                    p: 2,
                                    mt: 2,
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#075B35",
                                        fontSize: 12,
                                        fontWeight: 700,
                                        textTransform: "uppercase",
                                        mb: 1,
                                    }}
                                >
                                    Final Agreed Response (HR Approved)
                                </Typography>

                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    placeholder="Enter the final agreed response..."
                                    value={
                                        responses?.self_assessment?.[question.id] || ""
                                    }
                                    onChange={(event) =>
                                        updateHRResponse(
                                            question.id,
                                            event.target.value
                                        )
                                    }
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            bgcolor: "#FFFFFF",
                                            borderRadius: 1.5,
                                            "& fieldset": {
                                                borderColor: "#6EE7B7",
                                            },
                                            "&:hover fieldset": {
                                                borderColor: "#34D399",
                                            },
                                            "&.Mui-focused fieldset": {
                                                borderColor: "#10B981",
                                                borderWidth: 1,
                                            },
                                        },
                                        "& .MuiInputBase-input": {
                                            color: "#334155",
                                            fontSize: 14,
                                            lineHeight: 1.55,
                                        },
                                    }}
                                />
                            </Box>

                        </Box>

                    ))

                )}

            </Stack>

        </Box>

    );

}