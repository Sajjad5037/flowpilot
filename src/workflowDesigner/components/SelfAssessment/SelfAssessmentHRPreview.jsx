import {
    Box,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function SelfAssessmentHRPreview({

    component,
    employeeResponses,
    responses

}) {

    const questions = component.questions || [];

    return (

        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                {component.title || "Self Assessment Review"}
            </Typography>

            <Stack spacing={5}>

                {questions.length === 0 ? (

                    <Typography color="text.secondary">

                        No questions configured.

                    </Typography>

                ) : (

                    questions.map((question, index) => (

                        <Box key={question.id}>

                            <Typography
                                variant="body1"
                                fontWeight={700}
                                mb={2}
                            >
                                {index + 1}. {question.text}
                            </Typography>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr",
                                    gap: 3
                                }}
                            >

                                {/* Employee Response */}

                                <Box>

                                    <Typography
                                        fontWeight={600}
                                        mb={1}
                                    >
                                        Employee Response
                                    </Typography>

                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            bgcolor: "#F3F4F6",
                                            borderLeft: "4px solid #64748B",
                                            minHeight: 120,
                                            display: "flex",
                                            alignItems: "flex-start"
                                        }}
                                    >

                                        <Typography>

                                            {

                                                employeeResponses?.self_assessment?.[question.id] ||

                                                "No employee response."

                                            }

                                        </Typography>

                                    </Paper>

                                </Box>

                                {/* Supervisor Response */}

                                <Box>

                                    <Typography
                                        fontWeight={600}
                                        mb={1}
                                    >
                                        Supervisor Response
                                    </Typography>

                                    <Paper
                                        elevation={0}
                                        sx={{
                                            p: 2,
                                            bgcolor: "#F9FAFB",
                                            borderLeft: "4px solid #2563EB",
                                            minHeight: 120,
                                            display: "flex",
                                            alignItems: "flex-start"
                                        }}
                                    >

                                        <Typography>

                                            {

                                                responses?.self_assessment?.[question.id] ||

                                                "No supervisor response."

                                            }

                                        </Typography>

                                    </Paper>

                                </Box>

                                {/* HR Response */}

                                <Box>

                                    <Typography
                                        fontWeight={600}
                                        mb={1}
                                    >
                                        HR Comments
                                    </Typography>

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={5}
                                        placeholder="Enter HR comments..."
                                    />

                                </Box>

                            </Box>

                        </Box>

                    ))

                )}

            </Stack>

        </Box>

    );

}