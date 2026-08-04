import {
    Paper,
    Typography,
    Divider,
    Stack,
    TextField,
    FormControlLabel,
    Checkbox
} from "@mui/material";

export default function CompanyInformationProperties({

    component,
    onChange

}) {

    function updateField(fieldName, value) {

        onChange({

            ...component,

            [fieldName]: value

        });

    }

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >
                Company Information
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 1 }}
            >
                Configure the information displayed to employees before they begin the evaluation.
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Stack spacing={3}>

                <TextField
                    label="Mission Statement"
                    multiline
                    minRows={4}
                    fullWidth
                    value={component.mission || ""}
                    onChange={(e) =>
                        updateField("mission", e.target.value)
                    }
                />

                <TextField
                    label="Core Values"
                    multiline
                    minRows={3}
                    fullWidth
                    value={component.coreValues || ""}
                    onChange={(e) =>
                        updateField("coreValues", e.target.value)
                    }
                />

                <Divider />

                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                >
                    Visibility
                </Typography>

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={component.showMission ?? true}
                            onChange={(e) =>
                                updateField(
                                    "showMission",
                                    e.target.checked
                                )
                            }
                        />
                    }
                    label="Show Mission Statement"
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={component.showCoreValues ?? true}
                            onChange={(e) =>
                                updateField(
                                    "showCoreValues",
                                    e.target.checked
                                )
                            }
                        />
                    }
                    label="Show Core Values"
                />

            </Stack>

        </Paper>

    );

}