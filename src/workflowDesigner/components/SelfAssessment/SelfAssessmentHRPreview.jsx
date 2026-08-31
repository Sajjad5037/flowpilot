import {
    Box,
    Stack,
    Typography
} from "@mui/material";

export default function SelfAssessmentHRPreview({

    component,
    employeeResponses,
    supervisorResponses

}) {

    const questions = component.questions || [];

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

                        </Box>

                    ))

                )}

            </Stack>

        </Box>

    );

}