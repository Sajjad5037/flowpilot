import {
    Box,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function GoalListSupervisorPreview({

    component,
    responses,
    onResponsesChange

}) {

    const goals = component.goals || [];
    function updateGoalReview(goalKey, value) {

    onResponsesChange({

        ...responses,

        goal_list: {

            ...(responses?.goal_list || {}),

            [goalKey]: {

                ...(responses?.goal_list?.[goalKey] || {}),

                review: value

            }

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
                {component.title || "Proposed Goals Review"}
            </Typography>

            <Stack spacing={5}>

                {goals.length === 0 ? (

                    <Typography color="text.secondary">

                        No goals configured.

                    </Typography>

                ) : (

                    goals.map((goal, index) => {

                        const goalKey = `goal_${index + 1}`;

                        return (

                            <Box key={goal.id}>

                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    mb={2}
                                >
                                    Goal {index + 1}
                                </Typography>

                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr",
                                        gap: 3
                                    }}
                                >

                                    {/* Employee Goal */}

                                    <Box>

                                        <Typography
                                            fontWeight={600}
                                            mb={1}
                                        >
                                            Employee Proposal
                                        </Typography>

                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2,
                                                bgcolor: "#F3F4F6",
                                                borderLeft: "4px solid #64748B",
                                                minHeight: 220
                                            }}
                                        >

                                            <Typography>

                                                {responses?.goal_list?.[goalKey]?.proposal ||
                                                    "No proposal submitted."}

                                            </Typography>

                                        </Paper>

                                    </Box>

                                    {/* Supervisor Review */}

                                    <Box>

                                        <Typography
                                            fontWeight={600}
                                            mb={1}
                                        >
                                            Supervisor Review
                                        </Typography>

                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={10}
                                            placeholder="Enter supervisor feedback..."
                                            value={
                                                responses?.goal_list?.[goalKey]?.review || ""
                                            }
                                            onChange={(e) => {

                                                updateGoalReview(
                                                    goalKey,
                                                    e.target.value
                                                );

                                            }}
                                        />

                                    </Box>

                                </Box>

                            </Box>

                        );

                    })

                )}

            </Stack>

        </Box>

    );

}