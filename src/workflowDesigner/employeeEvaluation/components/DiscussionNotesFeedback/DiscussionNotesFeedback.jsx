import {
    Box,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


const previewEmployeeResponse =
    "Discuss more on my work responsibilities and resource allocations for Q3.";

const previewSupervisorResponse =
    "Reviewed current workload and aligned on priority adjustments for Q3 tasks.";


export default function DiscussionNotesFeedback({
    component,
    previewMode = "employee",
    responses = {},
    onResponsesChange,
    employeeResponses = {},
    supervisorResponses = {},
}) {

    /*
     * ==========================================
     * EMPLOYEE VIEW
     * ==========================================
     */

    if (previewMode === "employee") {

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
                >
                    Discussion Notes & Feedback
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                        mb: 1.5,
                    }}
                >
                    Provide any additional notes or specific
                    topics you want to review in your 1:1
                    evaluation meeting.
                </Typography>


                <Box
                    sx={{
                        border:
                            "1px solid #BFD5FF",

                        borderRadius: 2,

                        backgroundColor:
                            "#F8FBFF",

                        p: 2,
                    }}
                >

                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        value={
                            responses?.discussion_notes_feedback?.employee_response || ""
                        }
                        onChange={(event) => {
                            onResponsesChange?.({
                                ...responses,
                                discussion_notes_feedback: {
                                    ...(responses?.discussion_notes_feedback || {}),
                                    employee_response: event.target.value,
                                },
                            });
                        }}
                        variant="outlined"
                        placeholder="Enter your notes or feedback..."
                        sx={{
                            backgroundColor: "#FFFFFF",

                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1.5,
                            },

                            "& .MuiInputBase-input": {
                                fontSize: "0.82rem",
                                lineHeight: 1.5,
                            },
                        }}
                    />

                </Box>

            </Box>

        );
    }


    /*
     * ==========================================
     * SUPERVISOR VIEW
     * ==========================================
     */

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
                >
                    Discussion Notes & Feedback
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                        mb: 1.5,
                    }}
                >
                    Provide any additional notes or specific
                    topics you want to review in your 1:1
                    evaluation meeting.
                </Typography>


                <Box
                    sx={{
                        border:
                            "1px solid #E5C8FF",

                        borderRadius: 2,

                        backgroundColor:
                            "#FCF9FF",

                        p: 2,
                    }}
                >

                    <TextField
                        fullWidth
                        multiline
                        minRows={4}
                        value={
                            responses?.discussion_notes_feedback?.supervisor_response || ""
                        }
                        onChange={(event) => {
                            onResponsesChange?.({
                                ...responses,
                                discussion_notes_feedback: {
                                    ...(responses?.discussion_notes_feedback || {}),
                                    supervisor_response: event.target.value,
                                },
                            });
                        }}
                        variant="outlined"
                        placeholder="Enter your notes or feedback..."
                        sx={{
                            backgroundColor: "#FFFFFF",

                            "& .MuiOutlinedInput-root": {
                                borderRadius: 1.5,
                            },

                            "& .MuiInputBase-input": {
                                fontSize: "0.82rem",
                                lineHeight: 1.5,
                            },
                        }}
                    />

                </Box>

            </Box>

        );
    }


    /*
     * ==========================================
     * HR VIEW
     * ==========================================
     */

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
                >
                    Discussion Notes & Feedback
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mt: 0.5,
                        mb: 1.5,
                    }}
                >
                    Any and all other information the employee
                    would like to relay about Q2 or go over in
                    this meeting.
                </Typography>


                <Box
                    sx={{
                        border:
                            "1px solid #CBD5E1",

                        borderRadius: 2,

                        overflow: "hidden",

                        backgroundColor:
                            "#FFFFFF",
                    }}
                >

                    {/* Employee Response */}

                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns:
                                "180px 1fr",

                            borderBottom:
                                "1px solid #CBD5E1",
                        }}
                    >

                        <ResponseLabel>
                            Employee response
                        </ResponseLabel>


                        <Box
                            sx={{
                                p: 1.5,
                            }}
                        >

                            {console.log(
                                "HR SUPERVISOR RESPONSES:",
                                supervisorResponses
                            )}

                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                defaultValue={
                                    employeeResponses?.discussion_notes_feedback?.employee_response || ""
                                }
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 1.5,
                                    },

                                    "& .MuiInputBase-input": {
                                        fontSize: "0.82rem",
                                        lineHeight: 1.5,
                                    },
                                }}
                            />

                        </Box>

                    </Box>


                    {/* Supervisor Response */}

                    <Box
                        sx={{
                            display: "grid",

                            gridTemplateColumns:
                                "180px 1fr",
                        }}
                    >

                        <ResponseLabel>
                            Supervisor response
                        </ResponseLabel>


                        <Box
                            sx={{
                                p: 1.5,
                            }}
                        >

                            <TextField
                                fullWidth
                                multiline
                                minRows={3}
                                value={
                                    supervisorResponses?.discussion_notes_feedback?.supervisor_response || ""
                                }
                                variant="outlined"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 1.5,
                                    },

                                    "& .MuiInputBase-input": {
                                        fontSize: "0.82rem",
                                        lineHeight: 1.5,
                                    },
                                }}
                            />

                        </Box>

                    </Box>

                </Box>

            </Box>

        );
    }


    return null;
}


/*
 * ==========================================
 * HR RESPONSE LABEL
 * ==========================================
 */

function ResponseLabel({
    children,
}) {

    return (

        <Box
            sx={{
                px: 1.5,

                py: 2,

                display: "flex",

                alignItems: "center",

                backgroundColor:
                    "#F8FAFC",

                borderRight:
                    "1px solid #CBD5E1",

                fontSize: "0.8rem",

                fontWeight: 600,

                color: "#1E3A5F",
            }}
        >
            {children}
        </Box>

    );
}