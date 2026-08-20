import {
    Box,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


export default function ProfessionalAttributesCoreValues({
    component,
    previewMode = "employee",
}) {

    return (

        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor: "#FFFFFF",
            }}
        >

            <Stack
                direction="row"
                spacing={2}
            >

                <Box sx={{ flex: 1, minWidth: 0 }}>

                    <Typography
                        variant="caption"
                        fontWeight={600}
                        color="#0F172A"
                        sx={{
                            display: "block",
                            mb: 0.75,
                        }}
                    >
                        Professional Attributes to Work On *
                    </Typography>

                    <TextField
                        fullWidth
                        aria-label="Professional Attributes to Work On"
                        defaultValue="N/A"
                        size="small"
                    />

                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>

                    <Typography
                        variant="caption"
                        fontWeight={600}
                        color="#0F172A"
                        sx={{
                            display: "block",
                            mb: 0.75,
                        }}
                    >
                        Core Values to Work On *
                    </Typography>

                    <TextField
                        fullWidth
                        aria-label="Core Values to Work On"
                        defaultValue="N/A"
                        size="small"
                    />

                </Box>

            </Stack>

        </Paper>

    );

}
