import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


export default function GoalSelfEvaluationProperties({
    component,
    onChange,
}) {

    const settings =
        component?.settings || {};


    function updateSetting(
        field,
        value
    ) {

        onChange({

            ...component,

            settings: {

                ...settings,

                [field]: value,

            },

        });

    }


    return (

        <Stack spacing={3}>

            {/* ================================= */}
            {/* HEADER */}
            {/* ================================= */}

            <Box>

                <Typography
                    fontWeight={700}
                    color="#0F172A"
                >
                    Quarterly Goals Self-Evaluation
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    mt={0.5}
                >
                    Configure how finalized goals will
                    appear in the employee evaluation.
                </Typography>

            </Box>


            <Divider />


            {/* ================================= */}
            {/* GOAL DISPLAY */}
            {/* ================================= */}

            <Box>

                <Typography
                    fontSize={15}
                    fontWeight={700}
                    color="#0F172A"
                    mb={1}
                >
                    Goal Display
                </Typography>


                <Stack>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    settings.showTargetDescription !==
                                    false
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        "showTargetDescription",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label="Show Target Description"
                    />


                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    settings.showMonthlyProgress !==
                                    false
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        "showMonthlyProgress",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label="Show Monthly Progress"
                    />

                </Stack>

            </Box>


            <Divider />


            {/* ================================= */}
            {/* EMPLOYEE */}
            {/* ================================= */}

            <Box>

                <Typography
                    fontSize={15}
                    fontWeight={700}
                    color="#0F172A"
                    mb={1}
                >
                    Employee Evaluation
                </Typography>


                <Stack>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    settings.allowEmployeeRating !==
                                    false
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        "allowEmployeeRating",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label="Allow Employee Self-Rating"
                    />


                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    settings.allowEmployeeNotes !==
                                    false
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        "allowEmployeeNotes",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label="Allow Employee Notes"
                    />

                </Stack>

            </Box>


            <Divider />


            {/* ================================= */}
            {/* SUPERVISOR */}
            {/* ================================= */}

            <Box>

                <Typography
                    fontSize={15}
                    fontWeight={700}
                    color="#0F172A"
                    mb={1}
                >
                    Supervisor Evaluation
                </Typography>


                <Stack>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    settings.allowSupervisorRating !==
                                    false
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        "allowSupervisorRating",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label="Allow Supervisor Rating"
                    />


                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    settings.allowSupervisorNotes !==
                                    false
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        "allowSupervisorNotes",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label="Allow Supervisor Notes"
                    />

                </Stack>

            </Box>


            <Divider />


            {/* ================================= */}
            {/* HR */}
            {/* ================================= */}

            <Box>

                <Typography
                    fontSize={15}
                    fontWeight={700}
                    color="#0F172A"
                    mb={1}
                >
                    HR Review
                </Typography>


                <Stack>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    settings.showEmployeeRating !==
                                    false
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        "showEmployeeRating",
                                        event.target.checked
                                    )
                                }
                                label="Show Employee Rating"
                            />
                        }
                    />


                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    settings.showSupervisorRating !==
                                    false
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        "showSupervisorRating",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label="Show Supervisor Rating"
                    />


                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={
                                    settings.allowFinalAgreedRating !==
                                    false
                                }
                                onChange={(event) =>
                                    updateSetting(
                                        "allowFinalAgreedRating",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                        label="Allow Final Agreed Rating"
                    />

                </Stack>

            </Box>


            <Divider />


            {/* ================================= */}
            {/* WEIGHTS */}
            {/* ================================= */}

            <Box>

                <Typography
                    fontSize={14}
                    fontWeight={700}
                    color="#0F172A"
                    mb={2}
                >
                    Evaluation Configuration
                </Typography>


                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        label="Section Weight"
                        value={
                            settings.sectionWeight ||
                            "50%"
                        }
                        onChange={(event) =>
                            updateSetting(
                                "sectionWeight",
                                event.target.value
                            )
                        }
                    />


                    <TextField
                        fullWidth
                        label="Goal Weight"
                        value={
                            settings.goalWeight ||
                            "12.5%"
                        }
                        onChange={(event) =>
                            updateSetting(
                                "goalWeight",
                                event.target.value
                            )
                        }
                    />


                    <TextField
                        fullWidth
                        label="Total Points"
                        value={
                            settings.totalPoints ||
                            "9.375 pts"
                        }
                        onChange={(event) =>
                            updateSetting(
                                "totalPoints",
                                event.target.value
                            )
                        }
                    />

                </Stack>

            </Box>

        </Stack>

    );

}