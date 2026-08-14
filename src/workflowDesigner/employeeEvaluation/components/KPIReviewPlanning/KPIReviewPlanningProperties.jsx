import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Stack,
    Typography,
} from "@mui/material";


export default function KPIReviewPlanningProperties({
    component,
    onChange,
}) {

    const settings = component?.settings || {};


    function updateSetting(field, value) {

        onChange({
            ...component,

            settings: {
                ...settings,
                [field]: value,
            },

        });

    }


    return (
        <Box>

            <Typography
                variant="subtitle1"
                fontWeight={600}
                gutterBottom
            >
                Q3 KPI Review & Planning
            </Typography>


            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Configure which KPI proposal and finalization
                capabilities are available to each role.
            </Typography>


            <Stack spacing={2}>

                {/* EMPLOYEE */}

                <Typography
                    variant="subtitle2"
                    fontWeight={600}
                >
                    Employee View
                </Typography>


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowEmployeeAddKpi ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowEmployeeAddKpi",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow Employee to Add KPI"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowEmployeeDeleteKpi ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowEmployeeDeleteKpi",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow Employee to Delete KPI"
                />


                <Divider />


                {/* SUPERVISOR */}

                <Typography
                    variant="subtitle2"
                    fontWeight={600}
                >
                    Supervisor View
                </Typography>


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowSupervisorAddKpi ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowSupervisorAddKpi",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow Supervisor to Add KPI"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowSupervisorDeleteKpi ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowSupervisorDeleteKpi",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow Supervisor to Delete KPI"
                />


                <Divider />


                {/* HR */}

                <Typography
                    variant="subtitle2"
                    fontWeight={600}
                >
                    HR View
                </Typography>


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.showEmployeeSuggestion ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showEmployeeSuggestion",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Show Employee KPI Suggestions"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.showSupervisorSuggestion ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showSupervisorSuggestion",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Show Supervisor KPI Suggestions"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowHrEditFinalKpi ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowHrEditFinalKpi",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow HR to Edit Final KPI"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowHrAddKpi ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowHrAddKpi",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow HR to Add KPI"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowHrDeleteKpi ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowHrDeleteKpi",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow HR to Delete KPI"
                />

            </Stack>

        </Box>
    );
}