import {
    Box,
    Button,
    Divider,
    TextField,
    Typography
} from "@mui/material";
export default function PerformanceAndCoreValuesProperties({

    component,
    onChange

}) {

    const fields = component.fields || [];

    

    return (

        <Box>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={2}
            >
                Performance & Core Values
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >
                Configure which supervisor evaluation sections will appear in the evaluation.
            </Typography>

            <TextField
                fullWidth
                label="Section Title"
                value={component.title || "Performance & Core Values"}
                onChange={(event) =>

                    onChange({

                        ...component,

                        title: event.target.value

                    })

                }
                sx={{ mb: 3 }}
            />

            <Divider sx={{ mb: 2 }} />

            
            <Box>

                <Typography
                    variant="subtitle2"
                    gutterBottom
                >
                    Supervisor Fields
                </Typography>

                {fields.map((field, index) => (

                    <Box
                        key={field.id}
                        sx={{
                            border: "1px solid #E5E7EB",
                            borderRadius: 2,
                            p: 2,
                            mb: 2
                        }}
                    >

                        <TextField
                            fullWidth
                            label="Field Label"
                            value={field.label}
                            onChange={(event) => {

                                const updatedFields = [...fields];

                                updatedFields[index].label =
                                    event.target.value;

                                onChange({

                                    ...component,

                                    fields: updatedFields

                                });

                            }}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            fullWidth
                            select
                            label="Field Type"
                            SelectProps={{
                                native: true
                            }}
                            value={field.type}
                            onChange={(event) => {

                                const updatedFields = [...fields];

                                updatedFields[index].type =
                                    event.target.value;

                                onChange({

                                    ...component,

                                    fields: updatedFields

                                });

                            }}
                        >

                            <option value="text">Text</option>

                            <option value="textarea">Long Text</option>

                            <option value="number">Number</option>

                        </TextField>

                    </Box>

                ))}
                <Button
                    variant="outlined"
                    fullWidth
                    onClick={() =>

                        onChange({

                            ...component,

                            fields: [

                                ...fields,

                                {

                                    id: crypto.randomUUID(),

                                    label: "New Field",

                                    type: "textarea"

                                }

                            ]

                        })

                    }
                >

                    + Add Supervisor Field

                </Button>

            </Box>
            

        </Box>

    );

}