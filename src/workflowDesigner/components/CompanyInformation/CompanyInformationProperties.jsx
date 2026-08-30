import {
    Paper,
    Typography,
    Divider,
    Stack,
    TextField,
    Button,
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

    const coreValues = Array.isArray(component.coreValues)
        ? component.coreValues.map(coreValue => ({
            name: coreValue?.name || "",
            description: coreValue?.description || ""
        }))
        : typeof component.coreValues === "string"
            ? component.coreValues
                .split(/\s*\|\s*|\r?\n/)
                .map(name => name.trim())
                .filter(Boolean)
                .map(name => ({
                    name,
                    description: ""
                }))
            : [];

    function updateCoreValue(index, fieldName, value) {

        const updatedCoreValues = coreValues.map(
            (coreValue, coreValueIndex) =>
                coreValueIndex === index
                    ? {
                        ...coreValue,
                        [fieldName]: value
                    }
                    : coreValue
        );

        updateField("coreValues", updatedCoreValues);

    }

    function removeCoreValue(index) {

        updateField(
            "coreValues",
            coreValues.filter(
                (_, coreValueIndex) => coreValueIndex !== index
            )
        );

    }

    function addCoreValue() {

        updateField("coreValues", [
            ...coreValues,
            {
                name: "",
                description: ""
            }
        ]);

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

                <Stack spacing={2}>

                    <Typography fontWeight={600}>
                        Core Values
                    </Typography>

                    {coreValues.map((coreValue, index) => (

                        <Stack
                            key={index}
                            spacing={1.5}
                            sx={{
                                border: "1px solid #E5E7EB",
                                borderRadius: 2,
                                p: 2
                            }}
                        >

                            <TextField
                                label="Name"
                                fullWidth
                                value={coreValue.name}
                                onChange={(e) =>
                                    updateCoreValue(
                                        index,
                                        "name",
                                        e.target.value
                                    )
                                }
                            />

                            <TextField
                                label="Description"
                                multiline
                                minRows={2}
                                fullWidth
                                value={coreValue.description}
                                onChange={(e) =>
                                    updateCoreValue(
                                        index,
                                        "description",
                                        e.target.value
                                    )
                                }
                            />

                            <Button
                                variant="outlined"
                                color="error"
                                sx={{ alignSelf: "flex-start" }}
                                onClick={() => removeCoreValue(index)}
                            >
                                Remove
                            </Button>

                        </Stack>

                    ))}

                    <Button
                        variant="outlined"
                        sx={{ alignSelf: "flex-start" }}
                        onClick={addCoreValue}
                    >
                        + Add Core Value
                    </Button>

                </Stack>

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