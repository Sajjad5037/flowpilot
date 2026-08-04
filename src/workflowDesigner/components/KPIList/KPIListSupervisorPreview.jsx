import {
    Box,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function KPIListSupervisorPreview({

    component,
    employeeResponses,
    responses,
    onResponsesChange

}) {

    const kpis = component.kpis || [

        {
            id: crypto.randomUUID()
        }

    ];
    function updateSupervisorKPI(kpiKey, field, value) {

    onResponsesChange({

        ...responses,

        kpi_list: {

            ...(responses?.kpi_list || {}),

            [kpiKey]: {

                ...(responses?.kpi_list?.[kpiKey] || {}),

                [field]: value

            }

        }

    });

}
    return (

        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h6"
                fontWeight={700}
                mb={1}
            >
                {component.title || "KPI Alignment"}
            </Typography>

            <Typography
                color="text.secondary"
                mb={3}
            >
                Review the employee's proposed KPIs and provide the supervisor KPI
                title and expectation alongside them.
            </Typography>

            <Stack spacing={4}>

                {kpis.map((kpi, index) => {

                    const kpiKey = `kpi_${index + 1}`;

                    return (

                        <Paper
                            key={kpi.id}
                            variant="outlined"
                        >

                            <Box
                                sx={{
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr"
                                }}
                            >

                                {/* Header */}

                                <Box
                                    sx={{
                                        p: 2,
                                        bgcolor: "#F3F4F6",
                                        borderRight: "1px solid #D1D5DB",
                                        fontWeight: 700
                                    }}
                                >
                                    Employee KPI Title & Expectation
                                </Box>

                                <Box
                                    sx={{
                                        p: 2,
                                        bgcolor: "#F3F4F6",
                                        fontWeight: 700
                                    }}
                                >
                                    Supervisor KPI Title & Expectation
                                </Box>

                                {/* Employee */}

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
                                                employeeResponses?.kpi_list?.[kpiKey]?.title ||

                                                "No KPI title submitted."
                                            }
                                        </Typography>

                                        <Typography fontWeight={700}>
                                            Expectation
                                        </Typography>

                                        <Typography color="text.secondary">

                                            {
                                                employeeResponses?.kpi_list?.[kpiKey]?.expectation ||

                                                "No KPI expectation submitted."
                                            }

                                        </Typography>

                                    </Paper>

                                </Box>

                                {/* Supervisor */}

                                <Box
                                    sx={{
                                        p: 2,
                                        borderTop: "1px solid #D1D5DB"
                                    }}
                                >

                                    <Stack spacing={2}>

                                        <TextField
                                            fullWidth
                                            label="Supervisor KPI Title"
                                            value={
                                                responses?.kpi_list?.[kpiKey]?.title || ""
                                            }
                                            onChange={(e) => {

                                                updateSupervisorKPI(
                                                    kpiKey,
                                                    "title",
                                                    e.target.value
                                                );

                                            }}
                                        />

                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={3}
                                            label="Supervisor Expectation"
                                            value={
                                                responses?.kpi_list?.[kpiKey]?.expectation || ""
                                            }
                                            onChange={(e) => {

                                                updateSupervisorKPI(
                                                    kpiKey,
                                                    "expectation",
                                                    e.target.value
                                                );

                                            }}
                                        />

                                    </Stack>

                                </Box>

                            </Box>

                        </Paper>

                    );

                })}

            </Stack>

        </Box>

    );

}