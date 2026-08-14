import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


export default function KPIResultsProperties({
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
                KPI Results
            </Typography>


            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                Configure how finalized KPIs are displayed
                and evaluated for each role.
            </Typography>


            <Stack spacing={2}>


                {/* GENERAL */}

                <Typography
                    variant="subtitle2"
                    fontWeight={600}
                >
                    General
                </Typography>


                <TextField
                    fullWidth
                    size="small"
                    label="Section Title"
                    value={
                        settings.sectionTitle ||
                        "KPI Results"
                    }
                    onChange={(event) =>
                        updateSetting(
                            "sectionTitle",
                            event.target.value
                        )
                    }
                />


                <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Section Weight (%)"
                    value={
                        settings.sectionWeight ?? 50
                    }
                    onChange={(event) =>
                        updateSetting(
                            "sectionWeight",
                            event.target.value
                        )
                    }
                    inputProps={{
                        min: 0,
                        max: 100,
                    }}
                />


                <Divider />


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
                                settings.showEmployeeKpiTitle ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showEmployeeKpiTitle",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Show KPI Title"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.showEmployeeExpectation ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showEmployeeExpectation",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Show Expectation"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.showEmployeeMonthlyProgress ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showEmployeeMonthlyProgress",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Show Monthly Progress"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.showEmployeeQ2Average ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showEmployeeQ2Average",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Show Q2 Average"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowEmployeeRating ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowEmployeeRating",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow Employee KPI Rating"
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
                                settings.showSupervisorKpiTitle ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showSupervisorKpiTitle",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Show KPI Title"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.showSupervisorExpectation ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showSupervisorExpectation",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Show Expectation"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.showSupervisorMonthlyProgress ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showSupervisorMonthlyProgress",
                                    true
                                )
                            }
                        />
                    }
                    label="Show Monthly Progress"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.showSupervisorQ2Average ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "showSupervisorQ2Average",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Show Q2 Average"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowSupervisorRating ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowSupervisorRating",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow Supervisor KPI Rating"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowSupervisorComments ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowSupervisorComments",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow Supervisor Comments"
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
                                settings.allowHrKpiEditing ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowHrKpiEditing",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow HR to Edit KPI Information"
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


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowHrComments ??
                                true
                            }
                            onChange={(event) =>
                                updateSetting(
                                    "allowHrComments",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Allow HR Comments"
                />


                <FormControlLabel
                    control={
                        <Checkbox
                            checked={
                                settings.allowFinalAgreedRating ??
                                true
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
    );
}