import {
    Box,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

const defaultQuestion1Guidance =
    "Open to suggestions and feedback during evaluation meeting.";

const defaultQuestion2 =
    "What support or assistance do you need from your supervisor?";

const defaultQuestion2Guidance =
    "The support has been there. The main focus now is ensuring the hiring process is consistently followed across all departments.";


export default function Q3FeedbackProposedGoals({
    component,
    previewMode = "employee",
    responses = {},
    onResponsesChange,
    employeeResponses = {},
    supervisorResponses = {},
    reviewCycle,
}) {

    const settings = component?.settings || {};

    const currentQuarter =
        reviewCycle?.match(/^Q[1-4]/)?.[0] || "";

    const quarterNumber =
        Number(currentQuarter.replace("Q", ""));

    const nextQuarter =
        quarterNumber
            ? `Q${quarterNumber === 4 ? 1 : quarterNumber + 1}`
            : "";

    const sectionTitle =
        settings.sectionTitle ||
        `${nextQuarter} Feedback & Proposed Goals`;

    const question1 =
        settings.question1 ||
        `What can you improve on moving forward in ${nextQuarter}?`;

    const question1Guidance =
        settings.question1Guidance || defaultQuestion1Guidance;

    const question2 =
        settings.question2 || defaultQuestion2;

    const question2Guidance =
        settings.question2Guidance || defaultQuestion2Guidance;

    if (previewMode === "supervisor") {

        return (

            <Box
                sx={{
                    width: "100%",
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight={700}
                    color="#0F172A"
                    sx={{
                        textDecoration: "underline",
                    }}
                >
                    {sectionTitle}
                </Typography>

                <Stack
                    spacing={2.5}
                    sx={{
                        mt: 2.5,
                    }}
                >

                    <Box>

                        <Typography
                            variant="body2"
                            fontWeight={700}
                            color="#0F172A"
                            sx={{
                                mb: 0.75,
                            }}
                        >
                            {question1}
                        </Typography>

                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            value={
                                responses?.q3_feedback_proposed_goals?.supervisor_question1 || ""
                            }
                            onChange={(event) => {
                                onResponsesChange?.({
                                    ...responses,
                                    q3_feedback_proposed_goals: {
                                        ...(responses?.q3_feedback_proposed_goals || {}),
                                        supervisor_question1: event.target.value,
                                    },
                                });
                            }}
                            placeholder="Enter your response..."
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 1.5,
                                    backgroundColor: "#FFFFFF",
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: "0.82rem",
                                },
                            }}
                        />

                    </Box>

                    <Box>

                        <Typography
                            variant="body2"
                            fontWeight={700}
                            color="#0F172A"
                            sx={{
                                mb: 0.75,
                            }}
                        >
                            {question2}
                        </Typography>

                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            value={
                                responses?.q3_feedback_proposed_goals?.supervisor_question2 || ""
                            }
                            onChange={(event) => {
                                onResponsesChange?.({
                                    ...responses,
                                    q3_feedback_proposed_goals: {
                                        ...(responses?.q3_feedback_proposed_goals || {}),
                                        supervisor_question2: event.target.value,
                                    },
                                });
                            }}
                            placeholder="Enter your response..."
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 1.5,
                                    backgroundColor: "#FFFFFF",
                                },
                                "& .MuiInputBase-input": {
                                    fontSize: "0.82rem",
                                },
                            }}
                        />

                    </Box>

                </Stack>

            </Box>

        );

    }


    if (previewMode === "hr") {

        return (

            <Box
                sx={{
                    width: "100%",
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight={700}
                    color="#0F172A"
                    sx={{
                        textDecoration: "underline",
                    }}
                >
                    {sectionTitle}
                </Typography>

                <Stack
                    spacing={2.5}
                    sx={{
                        mt: 2.5,
                    }}
                >

                    <HRFeedbackComparison
                        question={question1}
                        employeeResponse={
                            employeeResponses?.q3_feedback_proposed_goals?.question1 || ""
                        }
                        supervisorResponse={
                            supervisorResponses?.q3_feedback_proposed_goals?.supervisor_question1 || ""
                        }
                    />

                    <HRFeedbackComparison
                        question={question2}
                        employeeResponse={
                            employeeResponses?.q3_feedback_proposed_goals?.question2 || ""
                        }
                        supervisorResponse={
                            supervisorResponses?.q3_feedback_proposed_goals?.supervisor_question2 || ""
                        }
                    />

                </Stack>

            </Box>

        );

    }

    return (

        <Box
            sx={{
                width: "100%",
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                color="#0F172A"
                sx={{
                    textDecoration: "underline",
                }}
            >
                {sectionTitle}
            </Typography>

            <Stack
                spacing={2.5}
                sx={{
                    mt: 2.5,
                }}
            >

                <Box>

                    <Typography
                        variant="body2"
                        fontWeight={700}
                        color="#0F172A"
                        sx={{
                            mb: 0.75,
                        }}
                    >
                        {question1}
                    </Typography>

                    <TextField
                        key={question1Guidance}
                        fullWidth
                        multiline
                        minRows={3}
                        value={
                            responses?.q3_feedback_proposed_goals?.question1 || ""
                        }
                        onChange={(event) => {
                            onResponsesChange?.({
                                ...responses,
                                q3_feedback_proposed_goals: {
                                    ...(responses?.q3_feedback_proposed_goals || {}),
                                    question1: event.target.value,
                                },
                            });
                        }}
                        placeholder="Enter your response..."
                        size="small"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1.5,
                                backgroundColor: "#FFFFFF",
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "0.82rem",
                            },
                        }}
                    />

                </Box>

                <Box>

                    <Typography
                        variant="body2"
                        fontWeight={700}
                        color="#0F172A"
                        sx={{
                            mb: 0.75,
                        }}
                    >
                        {question2}
                    </Typography>

                    <TextField
                        key={question2Guidance}
                        fullWidth
                        multiline
                        minRows={4}
                        value={
                            responses?.q3_feedback_proposed_goals?.question2 || ""
                        }
                        onChange={(event) => {
                            onResponsesChange?.({
                                ...responses,
                                q3_feedback_proposed_goals: {
                                    ...(responses?.q3_feedback_proposed_goals || {}),
                                    question2: event.target.value,
                                },
                            });
                        }}
                        placeholder="Enter your response..."
                        size="small"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1.5,
                                backgroundColor: "#FFFFFF",
                            },
                            "& .MuiInputBase-input": {
                                fontSize: "0.82rem",
                            },
                        }}
                    />

                </Box>

            </Stack>

        </Box>

    );

}


function HRFeedbackComparison({
    question,
    employeeResponse,
    supervisorResponse,
}) {

    return (

        <Box>

            <Typography
                variant="body2"
                fontWeight={700}
                color="#0F172A"
                sx={{
                    mb: 1,
                }}
            >
                {question}
            </Typography>

            <Paper
                variant="outlined"
                sx={{
                    overflow: "hidden",
                    borderRadius: 1.5,
                }}
            >

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "180px 1fr",
                        borderBottom: "1px solid #E2E8F0",
                    }}
                >

                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: "#F8FAFC",
                            borderRight: "1px solid #E2E8F0",
                        }}
                    >
                        <Typography
                            variant="body2"
                            fontWeight={700}
                        >
                            Employee response
                        </Typography>
                    </Box>

                    <Box sx={{ p: 1.5 }}>
                        <Typography variant="body2">
                            {employeeResponse || "Employee response pending."}
                        </Typography>
                    </Box>

                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "180px 1fr",
                    }}
                >

                    <Box
                        sx={{
                            p: 1.5,
                            backgroundColor: "#F8FAFC",
                            borderRight: "1px solid #E2E8F0",
                        }}
                    >
                        <Typography
                            variant="body2"
                            fontWeight={700}
                        >
                            Supervisor response
                        </Typography>
                    </Box>

                    <Box sx={{ p: 1.5 }}>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            {supervisorResponse || "Supervisor response pending."}
                        </Typography>
                    </Box>

                </Box>

            </Paper>

        </Box>

    );

}
