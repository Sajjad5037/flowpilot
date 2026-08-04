import {
    Box,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function KPIListHRPreview({

    component,
    employeeResponses,
    responses

}) {

    const kpis = component.kpis || [

        {
            id: crypto.randomUUID()
        }

    ];
    const kpiKey = (index) => `kpi_${index + 1}`;
    return (

        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={1}
            >
                {component.title || "KPI Alignment Review"}
            </Typography>

            <Typography
                color="text.secondary"
                mb={3}
            >
                Review the employee's KPIs, the supervisor's recommendations,
                and provide HR's final KPI review.
            </Typography>

            <Stack spacing={4}>

                {kpis.map((kpi, index) => (

                    <Paper
                        key={kpi.id}
                        variant="outlined"
                    >

                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr 1fr"
                            }}
                        >

                            {/* HEADER */}

                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "#F3F4F6",
                                    borderRight: "1px solid #D1D5DB",
                                    fontWeight: 700
                                }}
                            >
                                Employee KPI
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "#F3F4F6",
                                    borderRight: "1px solid #D1D5DB",
                                    fontWeight: 700
                                }}
                            >
                                Supervisor KPI
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "#F3F4F6",
                                    fontWeight: 700
                                }}
                            >
                                HR Review
                            </Box>

                            {/* EMPLOYEE */}

                            <Box
                                sx={{
                                    p: 2,
                                    borderRight: "1px solid #D1D5DB",
                                    borderTop: "1px solid #D1D5DB"
                                }}
                            >

                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        bgcolor: "#F9FAFB",
                                        borderLeft: "4px solid #64748B"
                                    }}
                                >

                                    <Typography fontWeight={700}>
                                        Title
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        mb={2}
                                    >
                                        {
                                            employeeResponses?.kpi_list?.[kpiKey(index)]?.title ||

                                            "No employee KPI title."
                                        }
                                    </Typography>

                                    <Typography fontWeight={700}>
                                        Expectation
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {
                                            employeeResponses?.kpi_list?.[kpiKey(index)]?.expectation ||

                                            "No employee KPI expectation."
                                        }
                                    </Typography>

                                </Paper>

                            </Box>

                            {/* SUPERVISOR */}

                            <Box
                                sx={{
                                    p: 2,
                                    borderRight: "1px solid #D1D5DB",
                                    borderTop: "1px solid #D1D5DB"
                                }}
                            >

                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        bgcolor: "#EFF6FF",
                                        borderLeft: "4px solid #2563EB"
                                    }}
                                >

                                    <Typography fontWeight={700}>
                                        Title
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        mb={2}
                                    >
                                        {
                                            responses?.kpi_list?.[kpiKey(index)]?.title ||

                                            "No supervisor KPI title."
                                        }
                                    </Typography>

                                    <Typography fontWeight={700}>
                                        Expectation
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {
                                            responses?.kpi_list?.[kpiKey(index)]?.expectation ||

                                            "No supervisor KPI expectation."
                                        }
                                    </Typography>

                                </Paper>

                            </Box>

                            {/* HR */}

                            <Box
                                sx={{
                                    p: 2,
                                    borderTop: "1px solid #D1D5DB"
                                }}
                            >

                                <Stack spacing={2}>

                                    <TextField
                                        fullWidth
                                        label="HR KPI Title"
                                    />

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="HR Expectation"
                                    />

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        label="HR Comments"
                                    />

                                </Stack>

                            </Box>

                        </Box>

                    </Paper>

                ))}

            </Stack>

        </Box>

    );

}