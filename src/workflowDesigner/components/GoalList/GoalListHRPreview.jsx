import {
    Box,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function GoalListHRPreview({

    component,
    employeeResponses,
    supervisorResponses,
    responses,
    onResponsesChange

}) {

    const goals = component.goals || [];

    return (

        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 3
                }}
            >
                {component.title || "Goal Review"}
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
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: 3
                                    }}
                                >

                                    {/* Employee */}

                                    <Box>

                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1
                                            }}
                                        >
                                            Employee Response
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

                                                {

                                                    employeeResponses?.goal_list?.[goalKey]?.proposal ||

                                                    "No employee proposal."

                                                }

                                            </Typography>

                                        </Paper>

                                    </Box>

                                    {/* Supervisor */}

                                    <Box>

                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1
                                            }}
                                        >
                                            Supervisor Response
                                        </Typography>

                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2,
                                                bgcolor: "#EFF6FF",
                                                borderLeft: "4px solid #2563EB",
                                                minHeight: 220
                                            }}
                                        >

                                            <Typography>

                                                {

                                                    supervisorResponses?.goal_list?.[goalKey]?.review ||
                                                    "No supervisor review."

                                                }

                                            </Typography>

                                        </Paper>

                                    </Box>

                                    {/* HR */}

                                    <Box>

                                        <Typography
                                            variant="subtitle1"
                                            sx={{
                                                fontWeight: 700,
                                                mb: 1
                                            }}
                                        >
                                            Final Agreed Goal 
                                        </Typography>

                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={10}
                                            placeholder="Type Final agreed goal..."
                                            value={
                                                responses?.goal_list?.[goalKey]?.final_goal || ""
                                            }
                                            onChange={(e) => {

                                                onResponsesChange({

                                                    ...responses,

                                                    goal_list: {

                                                        ...(responses?.goal_list || {}),

                                                        [goalKey]: {

                                                            ...(responses?.goal_list?.[goalKey] || {}),

                                                            final_goal: e.target.value

                                                        }

                                                    }

                                                });

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