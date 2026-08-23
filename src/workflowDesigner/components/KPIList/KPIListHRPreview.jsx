import {
    Box,
    Button,
    IconButton,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function KPIListHRPreview({

    component,
    employeeResponses,
    supervisorResponses,
    responses,
    onResponsesChange

}) {

    const responseKpis = responses?.kpi_list || {};
    const kpiEntries = Object.entries(responseKpis);
    const employeeKpiCount = Object.keys(
        employeeResponses?.kpi_list || {}
    ).length;
    const supervisorKpiCount = Object.keys(
        supervisorResponses?.kpi_list || {}
    ).length;
    const initialKpiCount = Math.max(
        employeeKpiCount,
        supervisorKpiCount,
        1
    );
    const kpis = kpiEntries.length > 0
        ? kpiEntries
        : Array.from(
            { length: initialKpiCount },
            (_, index) => [`kpi_${index + 1}`, {}]
        );

    function updateKpis(updatedKpis) {
        onResponsesChange?.({
            ...responses,
            kpi_list: updatedKpis.reduce((kpiList, [, kpi]) => {
                const kpiKey = `kpi_${Object.keys(kpiList).length + 1}`;
                kpiList[kpiKey] = kpi;
                return kpiList;
            }, {}),
        });
    }

    function addKPI() {
        updateKpis([
            ...kpis,
            ["kpi_new", {}],
        ]);
    }

    function removeKPI(kpiIndex) {
        updateKpis(
            kpis.filter(([,], index) => index !== kpiIndex)
        );
    }
    return (

        <Box sx={{ mb: 4 }}>

            <Typography
                variant="h5"
                sx={{
                    fontWeight: 700,
                    mb: 1
                }}
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

                {kpis.map(([kpiKey], index) => (

                    <Box key={kpiKey}>

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 1,
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight={700}
                            >
                                KPI {index + 1}
                            </Typography>

                            <IconButton
                                size="small"
                                aria-label={`Remove KPI ${index + 1}`}
                                onClick={() => removeKPI(index)}
                                sx={{
                                    color: "#DC2626",
                                    "&:hover": {
                                        backgroundColor: "#FEE2E2",
                                    },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>

                    <Paper
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
                                Employee KPI Title & Expectation
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "#F3F4F6",
                                    borderRight: "1px solid #D1D5DB",
                                    fontWeight: 700
                                }}
                            >
                                Supervisor KPI Title & Expectation
                            </Box>

                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "#F3F4F6",
                                    fontWeight: 700
                                }}
                            >
                                Final Set KPI & Expectation
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

                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        Title
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        mb={2}
                                    >
                                        {
                                            employeeResponses?.kpi_list?.[kpiKey]?.title ||

                                            "No employee KPI title."
                                        }
                                    </Typography>

                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        Expectation
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {
                                            employeeResponses?.kpi_list?.[kpiKey]?.expectation ||

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

                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        Title
                                    </Typography>

                                    <Typography
                                        color="text.secondary"
                                        mb={2}
                                    >
                                        {
                                            supervisorResponses?.kpi_list?.[kpiKey]?.title ||
                                            "No supervisor KPI title."
                                        }
                                    </Typography>

                                    <Typography
                                        variant="subtitle1"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        Expectation
                                    </Typography>

                                    <Typography color="text.secondary">
                                        {
                                            supervisorResponses?.kpi_list?.[kpiKey]?.expectation ||
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
                                        value={
                                            responses?.kpi_list?.[kpiKey]?.title || ""
                                        }
                                        onChange={(e) => {

                                            onResponsesChange({

                                                ...responses,

                                                kpi_list: {

                                                    ...(responses?.kpi_list || {}),

                                                    [kpiKey]: {

                                                        ...(responses?.kpi_list?.[kpiKey] || {}),

                                                        title: e.target.value

                                                    }

                                                }

                                            });

                                        }}
                                    />

                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={3}
                                        label="HR KPI Expectation"
                                        value={
                                            responses?.kpi_list?.[kpiKey]?.expectation || ""
                                        }
                                        onChange={(e) => {

                                            onResponsesChange({

                                                ...responses,

                                                kpi_list: {

                                                    ...(responses?.kpi_list || {}),

                                                    [kpiKey]: {

                                                        ...(responses?.kpi_list?.[kpiKey] || {}),

                                                        expectation: e.target.value

                                                    }

                                                }

                                            });

                                        }}
                                    />

                                    

                                </Stack>

                            </Box>

                        </Box>

                    </Paper>

                    </Box>

                ))}

            </Stack>

            <Button
                variant="outlined"
                onClick={addKPI}
            >
                + Add KPI
            </Button>

        </Box>

    );

}