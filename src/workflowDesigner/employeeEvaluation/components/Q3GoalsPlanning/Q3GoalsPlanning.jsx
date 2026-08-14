import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


const previewGoals = [
    {
        id: "goal-1",
        employeeGoal:
            "Successfully source, interview, and onboard 1 new Business Development Representative (BDR).",

        supervisorGoal:
            "BDR Hired",

        finalGoal:
            "BDR Hired",
    },
];


const previewEmployeeImprovement =
    "Open to suggestions and feedback during evaluation meeting.";

const previewEmployeeSupport =
    "The support has been there. The main focus now is ensuring the hiring process is consistently followed across all departments.";


export default function Q3GoalsPlanning({
    component,
    previewMode = "employee",
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
                    sx={{
                        textDecoration:
                            "underline",
                    }}
                >
                    Q3 Feedback & Proposed Goals
                </Typography>


                <Stack
                    spacing={2.5}
                    sx={{
                        mt: 2.5,
                    }}
                >

                    {/* Improvement */}

                    <Box>

                        <Typography
                            variant="body2"
                            fontWeight={700}
                            color="#0F172A"
                            sx={{
                                mb: 0.75,
                            }}
                        >
                            What can you improve on moving
                            forward in Q3?
                        </Typography>


                        <TextField
                            fullWidth
                            multiline
                            minRows={3}
                            defaultValue={
                                previewEmployeeImprovement
                            }
                            placeholder="Enter your response..."
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 1.5,
                                    backgroundColor:
                                        "#FFFFFF",
                                },

                                "& .MuiInputBase-input": {
                                    fontSize: "0.82rem",
                                },
                            }}
                        />

                    </Box>


                    {/* Support */}

                    <Box>

                        <Typography
                            variant="body2"
                            fontWeight={700}
                            color="#0F172A"
                            sx={{
                                mb: 0.75,
                            }}
                        >
                            What support or assistance do you
                            need from your supervisor?
                        </Typography>


                        <TextField
                            fullWidth
                            multiline
                            minRows={4}
                            defaultValue={
                                previewEmployeeSupport
                            }
                            placeholder="Enter your response..."
                            size="small"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 1.5,
                                    backgroundColor:
                                        "#FFFFFF",
                                },

                                "& .MuiInputBase-input": {
                                    fontSize: "0.82rem",
                                },
                            }}
                        />

                    </Box>


                    {/* Goals */}

                    <GoalSection
                        title="Proposed Goals for Q3"
                        buttonLabel="+ Add Goal"
                        goals={previewGoals}
                        field="employeeGoal"
                    />

                </Stack>

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

                <Stack
                    direction="row"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    spacing={2}
                >

                    <Box>

                        <Typography
                            variant="h6"
                            fontWeight={700}
                            color="#0F172A"
                        >
                            4. Supervisor Proposed Goals for Q3
                        </Typography>


                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                mt: 0.5,
                            }}
                        >
                            Set initial proposed targets for Q3
                            discussion.
                        </Typography>

                    </Box>


                    <Button
                        variant="outlined"
                        size="small"
                    >
                        + Add Proposed Goal
                    </Button>

                </Stack>


                <Stack
                    spacing={1.5}
                    sx={{
                        mt: 2,
                    }}
                >

                    {previewGoals.map(
                        (goal, index) => (

                            <Box
                                key={goal.id}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "55px 1fr 38px",
                                    gap: 1,
                                    alignItems: "center",
                                }}
                            >

                                <Typography
                                    variant="body2"
                                    fontWeight={600}
                                    color="#1E3A5F"
                                >
                                    Goal {index + 1}:
                                </Typography>


                                <TextField
                                    fullWidth
                                    size="small"
                                    defaultValue={
                                        goal.supervisorGoal
                                    }
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 1.5,
                                        },

                                        "& .MuiInputBase-input": {
                                            fontSize: "0.82rem",
                                        },
                                    }}
                                />


                                <IconButton
                                    color="error"
                                    size="small"
                                    aria-label="Delete goal"
                                >
                                    ×
                                </IconButton>

                            </Box>

                        )
                    )}

                </Stack>

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

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        mb: 1.5,
                    }}
                >

                    <Typography
                        variant="h6"
                        fontWeight={700}
                        color="#0F172A"
                    >
                        Q3 Goals Planning
                    </Typography>


                    <Button
                        variant="outlined"
                        size="small"
                    >
                        + Add Goal
                    </Button>

                </Stack>


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

                    {previewGoals.map(
                        (goal, index) => (

                            <Box
                                key={goal.id}
                            >

                                {/* Goal Header */}

                                <Box
                                    sx={{
                                        px: 1.5,
                                        py: 1.25,

                                        backgroundColor:
                                            "#F4F7FB",

                                        borderBottom:
                                            "1px solid #CBD5E1",

                                        display: "flex",

                                        alignItems:
                                            "center",

                                        justifyContent:
                                            "space-between",
                                    }}
                                >

                                    <Typography
                                        variant="body2"
                                        fontWeight={700}
                                        color="#1E3A5F"
                                    >
                                        Goal {index + 1} for Q3:
                                    </Typography>


                                    <IconButton
                                        color="error"
                                        size="small"
                                        aria-label="Delete goal"
                                    >
                                        ×
                                    </IconButton>

                                </Box>


                                {/* Contractor Response */}

                                <GoalResponseRow
                                    label="Contractor response"
                                    value={
                                        goal.employeeGoal
                                    }
                                />


                                {/* Supervisor Response */}

                                <GoalResponseRow
                                    label="Supervisor response"
                                    value={
                                        goal.supervisorGoal
                                    }
                                />


                                {/* Final Set Goal */}

                                <Box
                                    sx={{
                                        display: "grid",

                                        gridTemplateColumns:
                                            "180px 1fr",

                                        borderTop:
                                            "1px solid #CBD5E1",

                                        backgroundColor:
                                            "#FCF7FF",
                                    }}
                                >

                                    <Box
                                        sx={{
                                            px: 1.5,
                                            py: 1.5,

                                            display: "flex",

                                            alignItems:
                                                "center",

                                            borderRight:
                                                "1px solid #CBD5E1",
                                        }}
                                    >

                                        <Typography
                                            variant="body2"
                                            fontWeight={700}
                                            color="#7E22CE"
                                        >
                                            Final Set Goal
                                        </Typography>

                                    </Box>


                                    <Box
                                        sx={{
                                            p: 1.5,
                                        }}
                                    >

                                        <TextField
                                            fullWidth
                                            multiline
                                            minRows={2}
                                            defaultValue={
                                                goal.finalGoal
                                            }
                                            size="small"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 1.5,
                                                },

                                                "& .MuiInputBase-input": {
                                                    fontSize:
                                                        "0.82rem",
                                                },
                                            }}
                                        />

                                    </Box>

                                </Box>

                            </Box>

                        )
                    )}

                </Box>

            </Box>

        );
    }


    return null;
}


/*
 * ==========================================
 * EMPLOYEE GOAL SECTION
 * ==========================================
 */

function GoalSection({
    title,
    buttonLabel,
    goals,
    field,
}) {

    return (

        <Box>

            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    mb: 1.5,
                }}
            >

                <Typography
                    variant="subtitle1"
                    fontWeight={700}
                    color="#0F172A"
                >
                    {title}
                </Typography>


                <Button
                    variant="outlined"
                    size="small"
                >
                    {buttonLabel}
                </Button>

            </Stack>


            <Stack spacing={1.5}>

                {goals.map(
                    (goal, index) => (

                        <Box
                            key={goal.id}
                            sx={{
                                display: "grid",
                                gridTemplateColumns:
                                    "55px 1fr 38px",
                                gap: 1,
                                alignItems: "center",
                            }}
                        >

                            <Typography
                                variant="body2"
                                fontWeight={600}
                                color="#1E3A5F"
                            >
                                Goal {index + 1}:
                            </Typography>


                            <TextField
                                fullWidth
                                size="small"
                                defaultValue={
                                    goal[field]
                                }
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 1.5,
                                    },

                                    "& .MuiInputBase-input": {
                                        fontSize: "0.82rem",
                                    },
                                }}
                            />


                            <IconButton
                                color="error"
                                size="small"
                                aria-label="Delete goal"
                            >
                                ×
                            </IconButton>

                        </Box>

                    )
                )}

            </Stack>

        </Box>

    );
}


/*
 * ==========================================
 * HR RESPONSE ROW
 * ==========================================
 */

function GoalResponseRow({
    label,
    value,
}) {

    return (

        <Box
            sx={{
                display: "grid",

                gridTemplateColumns:
                    "180px 1fr",

                borderBottom:
                    "1px solid #E2E8F0",
            }}
        >

            <Box
                sx={{
                    px: 1.5,
                    py: 1.5,

                    display: "flex",

                    alignItems: "center",

                    backgroundColor:
                        "#F8FAFC",

                    borderRight:
                        "1px solid #CBD5E1",
                }}
            >

                <Typography
                    variant="body2"
                    fontWeight={600}
                    color="#1E3A5F"
                >
                    {label}
                </Typography>

            </Box>


            <Box
                sx={{
                    p: 1.25,
                }}
            >

                <TextField
                    fullWidth
                    size="small"
                    defaultValue={value}
                    multiline
                    minRows={1}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: 1.5,
                        },

                        "& .MuiInputBase-input": {
                            fontSize: "0.82rem",
                        },
                    }}
                />

            </Box>

        </Box>

    );
}