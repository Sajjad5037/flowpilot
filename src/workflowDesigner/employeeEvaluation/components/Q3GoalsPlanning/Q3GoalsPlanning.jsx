import {
    Box,
    Button,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


export default function Q3GoalsPlanning({
    component,
    previewMode = "employee",
    responses = {},
    onResponsesChange,
    employeeResponses = {},
    supervisorResponses = {},
    isBuilderPreview = false,
    onComponentChange,
}) {

    /*
     * ==========================================
        * EMPLOYEE VIEW
     * ==========================================
     */

    if (previewMode === "employee") {

        if (isBuilderPreview) {

            const builderGoals = component?.goals || [];

            function handleAddBuilderGoal() {

                const updatedGoals = [
                    ...(component?.goals || []),
                    { id: `goal_${(component?.goals?.length || 0) + 1}` },
                ];

                onComponentChange?.({
                    ...component,
                    goals: updatedGoals,
                });

            }

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
                        sx={{
                            mb: 1.5,
                        }}
                    >

                        <Typography
                            variant="subtitle1"
                            fontWeight={700}
                            color="#0F172A"
                        >
                            Proposed Goals for Q3
                        </Typography>

                        <Button
                            variant="outlined"
                            size="small"
                            onClick={handleAddBuilderGoal}
                        >
                            + Add Goal
                        </Button>

                    </Stack>

                    <Stack spacing={1.5}>

                        {builderGoals.map((goal, index) => (

                            <Box
                                key={goal.id}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "55px 1fr 32px",
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
                                    disabled
                                    placeholder="Employee will enter this goal"
                                />

                                <Typography
                                    component="button"
                                    onClick={() => {
                                        const updatedGoals = builderGoals.filter(
                                            (_, goalIndex) => goalIndex !== index
                                        );

                                        onComponentChange?.({
                                            ...component,
                                            goals: updatedGoals,
                                        });
                                    }}
                                    sx={{
                                        border: 0,
                                        background: "transparent",
                                        color: "#DC2626",
                                        fontSize: 22,
                                        fontWeight: 700,
                                        cursor: "pointer",
                                        lineHeight: 1,
                                        p: 0,
                                    }}
                                    aria-label={`Remove Goal ${index + 1}`}
                                >
                                    ×
                                </Typography>

                            </Box>

                        ))}

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

                <GoalSection
                    title="Proposed Goals for Q3"
                    buttonLabel="+ Add Goal"
                    goals={responses?.q3_goals_planning?.employee_goals || []}
                    field="employeeGoal"
                    responses={responses}
                    onResponsesChange={onResponsesChange}
                />

            </Box>

        );
    }


    /*
     * ==========================================
     * SUPERVISOR VIEW
     * ==========================================
     */

    if (previewMode === "supervisor") {

        const supervisorGoals =
            responses?.q3_goals_planning?.supervisor_goals || [];

        const employeeGoals =
            employeeResponses?.q3_goals_planning?.employee_goals || [];

        const goalsToRender =
            supervisorGoals.length
                ? supervisorGoals
                : employeeGoals.map((goal) => ({
                    id: `supervisor-goal-${goal.id}`,
                    description: "",
                }));

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
                        Proposed Goals for Q3
                    </Typography>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {

                            const currentGoals =
                                responses?.q3_goals_planning?.supervisor_goals || [];

                            const newGoal = {
                                id: `supervisor-goal-${Date.now()}`,
                                description: "",
                            };

                            onResponsesChange?.({
                                ...responses,
                                q3_goals_planning: {
                                    ...(responses?.q3_goals_planning || {}),
                                    supervisor_goals: [
                                        ...currentGoals,
                                        newGoal,
                                    ],
                                },
                            });

                        }}
                    >
                        + Add Goal
                    </Button>

                </Stack>


                <Stack
                    spacing={1.5}
                >

                    {goalsToRender.map((goal, index) => (

                            <Box
                                key={goal.id}
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "55px 1fr 38px",
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
                                    value={goal.description || ""}
                                    onChange={(event) => {

                                        const currentGoals =
                                            responses?.q3_goals_planning?.supervisor_goals ||
                                            goalsToRender;

                                        const updatedGoals =
                                            currentGoals.map((row, rowIndex) =>
                                                rowIndex === index
                                                    ? {
                                                        ...row,
                                                        description:
                                                            event.target.value,
                                                    }
                                                    : row
                                            );

                                        onResponsesChange?.({
                                            ...responses,
                                            q3_goals_planning: {
                                                ...(responses?.q3_goals_planning || {}),
                                                supervisor_goals: updatedGoals,
                                            },
                                        });

                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            borderRadius: 1.5,
                                            backgroundColor: "#FFFFFF !important",
                                        },

                                        "& .MuiInputBase-input": {
                                            fontSize: "0.82rem",
                                            backgroundColor: "#FFFFFF !important",
                                        },
                                    }}
                                />


                                <IconButton
                                    color="error"
                                    size="small"
                                    aria-label="Delete goal"
                                    onClick={() => {

                                        const currentGoals =
                                            responses?.q3_goals_planning?.supervisor_goals ||
                                            goalsToRender;

                                        const updatedGoals =
                                            currentGoals.filter(
                                                (_, rowIndex) => rowIndex !== index
                                            );

                                        onResponsesChange?.({
                                            ...responses,
                                            q3_goals_planning: {
                                                ...(responses?.q3_goals_planning || {}),
                                                supervisor_goals: updatedGoals,
                                            },
                                        });

                                    }}
                                >
                                    ×
                                </IconButton>

                            </Box>

                        ))}

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

        const employeeGoals =
            employeeResponses?.q3_goals_planning?.employee_goals || [];

        const supervisorGoals =
            supervisorResponses?.q3_goals_planning?.supervisor_goals || [];

        const hrFinalGoals =
            responses?.q3_goals_planning?.hr_final_goals || [];

        const goalCount = Math.max(
            employeeGoals.length,
            supervisorGoals.length
        );

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

                    {Array.from({ length: goalCount }).map((_, index) => {
                        const employeeGoal = employeeGoals[index];
                        const supervisorGoal = supervisorGoals[index];
                        const hrFinalGoal =
                            hrFinalGoals.find(
                                (row) =>
                                    row.goalId ===
                                    (employeeGoal?.id || supervisorGoal?.id)
                            )?.finalGoal || "";

                        return (
                            <Box
                                key={`hr-goal-${index}`}
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
                                    label="Employee response"
                                    value={employeeGoal?.description || ""}
                                />


                                {/* Supervisor Response */}

                                <GoalResponseRow
                                    label="Supervisor response"
                                    value={supervisorGoal?.description || ""}
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
                                            value={hrFinalGoal}
                                            onChange={(event) => {
                                                const currentHrFinalGoals =
                                                    responses?.q3_goals_planning?.hr_final_goals || [];

                                                const goalId =
                                                    employeeGoal?.id ||
                                                    supervisorGoal?.id ||
                                                    `hr-goal-${index}`;

                                                const existingHrFinalGoal =
                                                    currentHrFinalGoals.some(
                                                        (row) => row.goalId === goalId
                                                    );

                                                const updatedHrFinalGoals =
                                                    existingHrFinalGoal
                                                        ? currentHrFinalGoals.map((row) =>
                                                              row.goalId === goalId
                                                                  ? {
                                                                        ...row,
                                                                        finalGoal: event.target.value,
                                                                    }
                                                                  : row
                                                          )
                                                        : [
                                                              ...currentHrFinalGoals,
                                                              {
                                                                  goalId,
                                                                  finalGoal: event.target.value,
                                                              },
                                                          ];

                                                onResponsesChange?.({
                                                    ...responses,
                                                    q3_goals_planning: {
                                                        ...(responses?.q3_goals_planning || {}),
                                                        hr_final_goals: updatedHrFinalGoals,
                                                    },
                                                });
                                            }}
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
                        );
                    })}

                    {(responses?.q3_goals_planning?.hr_goals || []).map((goal, index) => (
                        <Box
                            key={goal.id}
                            sx={{
                                borderTop: "1px solid #CBD5E1",
                            }}
                        >
                            <Box
                                sx={{
                                    px: 1.5,
                                    py: 1.25,
                                    backgroundColor: "#F8FAFC",
                                    borderBottom: "1px solid #CBD5E1",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    fontWeight={700}
                                    color="#1E3A5F"
                                >
                                    HR Goal {index + 1}:
                                </Typography>

                                <IconButton
                                    color="error"
                                    size="small"
                                    aria-label="Delete HR goal"
                                    onClick={() => {
                                        const currentGoals =
                                            responses?.q3_goals_planning?.hr_goals || [];

                                        const updatedGoals = currentGoals.filter(
                                            (row) => row.id !== goal.id
                                        );

                                        onResponsesChange?.({
                                            ...responses,
                                            q3_goals_planning: {
                                                ...(responses?.q3_goals_planning || {}),
                                                hr_goals: updatedGoals,
                                            },
                                        });
                                    }}
                                >
                                    ×
                                </IconButton>
                            </Box>

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "180px 1fr",
                                    borderBottom: "1px solid #E2E8F0",
                                }}
                            >
                                <Box
                                    sx={{
                                        px: 1.5,
                                        py: 1.5,
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: "#F8FAFC",
                                        borderRight: "1px solid #CBD5E1",
                                    }}
                                >
                                    <Typography
                                        variant="body2"
                                        fontWeight={600}
                                        color="#1E3A5F"
                                    >
                                        HR response
                                    </Typography>
                                </Box>

                                <Box sx={{ p: 1.25 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        multiline
                                        minRows={1}
                                        value={goal.description || ""}
                                        onChange={(event) => {
                                            const currentGoals =
                                                responses?.q3_goals_planning?.hr_goals || [];

                                            const updatedGoals = currentGoals.map((row) =>
                                                row.id === goal.id
                                                    ? { ...row, description: event.target.value }
                                                    : row
                                            );

                                            onResponsesChange?.({
                                                ...responses,
                                                q3_goals_planning: {
                                                    ...(responses?.q3_goals_planning || {}),
                                                    hr_goals: updatedGoals,
                                                },
                                            });
                                        }}
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

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "180px 1fr",
                                    borderBottom: "1px solid #E2E8F0",
                                    backgroundColor: "#FCF7FF",
                                }}
                            >
                                <Box
                                    sx={{
                                        px: 1.5,
                                        py: 1.5,
                                        display: "flex",
                                        alignItems: "center",
                                        backgroundColor: "#FCF7FF",
                                        borderRight: "1px solid #CBD5E1",
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

                                <Box sx={{ p: 1.25 }}>
                                    <TextField
                                        fullWidth
                                        size="small"
                                        multiline
                                        minRows={2}
                                        value={goal.finalGoal || ""}
                                        onChange={(event) => {
                                            const currentHrGoals =
                                                responses?.q3_goals_planning?.hr_goals || [];

                                            const updatedHrGoals = currentHrGoals.map((row) =>
                                                row.id === goal.id
                                                    ? {
                                                          ...row,
                                                          finalGoal: event.target.value,
                                                      }
                                                    : row
                                            );

                                            onResponsesChange?.({
                                                ...responses,
                                                q3_goals_planning: {
                                                    ...(responses?.q3_goals_planning || {}),
                                                    hr_goals: updatedHrGoals,
                                                },
                                            });
                                        }}
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
                        </Box>
                    ))}

                </Box>

                <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {
                        const currentGoals =
                            responses?.q3_goals_planning?.hr_goals || [];

                        const newGoal = {
                            id: `hr-goal-${Date.now()}`,
                            description: "",
                        };

                        onResponsesChange?.({
                            ...responses,
                            q3_goals_planning: {
                                ...(responses?.q3_goals_planning || {}),
                                hr_goals: [...currentGoals, newGoal],
                            },
                        });
                    }}
                    sx={{ mt: 1.5 }}
                >
                    + Add Goal
                </Button>

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
    responses = {},
    onResponsesChange,
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
                    onClick={() => {
                        const currentGoals =
                            responses?.q3_goals_planning?.employee_goals || [];

                        const newGoal = {
                            id: `employee-goal-${Date.now()}`,
                            description: "",
                        };

                        onResponsesChange?.({
                            ...responses,
                            q3_goals_planning: {
                                ...(responses?.q3_goals_planning || {}),
                                employee_goals: [
                                    ...currentGoals,
                                    newGoal,
                                ],
                            },
                        });
                    }}
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
                                value={
                                    goal.description ?? goal.employeeGoal ?? ""
                                }
                                onChange={(event) => {
                                    const updatedGoals = goals.map((row, rowIndex) =>
                                        rowIndex === index
                                            ? {
                                                ...row,
                                                description: event.target.value,
                                            }
                                            : row
                                    );

                                    onResponsesChange?.({
                                        ...responses,
                                        q3_goals_planning: {
                                            ...(responses?.q3_goals_planning || {}),
                                            employee_goals: updatedGoals,
                                        },
                                    });
                                }}
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


                            <IconButton
                                color="error"
                                size="small"
                                aria-label="Delete goal"
                                onClick={() => {
                                    const currentGoals =
                                        responses?.q3_goals_planning?.employee_goals || [];

                                    const updatedGoals = currentGoals.filter(
                                        (_, rowIndex) => rowIndex !== index
                                    );

                                    onResponsesChange?.({
                                        ...responses,
                                        q3_goals_planning: {
                                            ...(responses?.q3_goals_planning || {}),
                                            employee_goals: updatedGoals,
                                        },
                                    });
                                }}
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