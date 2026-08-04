import {
    Paper,
    Typography,
    Divider,
    Stack,
    TextField,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button
} from "@mui/material";

export default function KPIListProperties({

    component,

    onChange

}) {

    const fields = component.fields || {

        kpiTitle: true,

        expectation: true

    };

    const kpis = component.kpis || [

        {
            id: crypto.randomUUID()
        }

    ];

    function handleFieldChange(field) {

        onChange({

            ...component,

            kpis,

            fields: {

                ...fields,

                [field]: !fields[field]

            }

        });

    }

    function handleAddKPI() {

        onChange({

            ...component,

            fields,

            kpis: [

                ...kpis,

                {

                    id: crypto.randomUUID()

                }

            ]

        });

    }

    function handleDeleteKPI(kpiId) {

        if (kpis.length === 1) {

            return;

        }

        onChange({

            ...component,

            fields,

            kpis: kpis.filter(kpi => kpi.id !== kpiId)

        });

    }

    return (

        <Paper
            elevation={0}
            sx={{
                p: 2
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >
                Proposed KPIs
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2}>

                <TextField
                    label="Section Title"
                    value={
                        component.title ||
                        "Proposed KPIs"
                    }
                    onChange={(event) =>
                        onChange({

                            ...component,

                            kpis,

                            title: event.target.value

                        })
                    }
                />

                <TextField
                    label="Description"
                    multiline
                    rows={3}
                    value={
                        component.description ||
                        "Employees propose KPIs for the upcoming quarter."
                    }
                    onChange={(event) =>
                        onChange({

                            ...component,

                            kpis,

                            description: event.target.value

                        })
                    }
                />

                <Divider />

                <Typography
                    variant="subtitle2"
                    fontWeight={700}
                >
                    Fields
                </Typography>

                <FormGroup>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.kpiTitle}
                                onChange={() =>
                                    handleFieldChange("kpiTitle")
                                }
                            />
                        }
                        label="KPI Proposal"
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={fields.expectation}
                                onChange={() =>
                                    handleFieldChange("expectation")
                                }
                            />
                        }
                        label="Expectation / Target"
                    />

                </FormGroup>

                <Divider />

                <Typography
                    variant="subtitle2"
                    fontWeight={700}
                >
                    KPIs
                </Typography>

                {kpis.map((kpi, index) => (

                    <Stack
                        key={kpi.id}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                    >

                        <Typography
                            variant="body2"
                        >
                            KPI {index + 1}
                        </Typography>

                        <Button
                            size="small"
                            color="error"
                            disabled={kpis.length === 1}
                            onClick={() =>
                                handleDeleteKPI(kpi.id)
                            }
                        >
                            Delete
                        </Button>

                    </Stack>

                ))}

                <Button
                    variant="outlined"
                    onClick={handleAddKPI}
                >
                    + Add KPI
                </Button>

            </Stack>

        </Paper>

    );

}