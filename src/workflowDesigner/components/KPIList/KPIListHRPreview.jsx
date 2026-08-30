import {
    Box,
    Button,
    IconButton,
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

    const employeeKpiKeys = Object.keys(
        employeeResponses?.kpi_list || {}
    );
    const supervisorKpiKeys = Object.keys(
        supervisorResponses?.kpi_list || {}
    );
    const employeeKpiCount = employeeKpiKeys.length;
    const supervisorKpiCount = supervisorKpiKeys.length;
    const initialKpiCount = Math.max(
        employeeKpiCount,
        supervisorKpiCount,
        1
    );

    // Authoritative KPI keys come from employee/supervisor data, never from HR's own responses.
    const authoritativeKpiKeySet = new Set([
        ...employeeKpiKeys,
        ...supervisorKpiKeys,
        ...Object.keys(responses?.kpi_list || {})
    ]);
    const authoritativeKpiKeys = authoritativeKpiKeySet.size > 0
        ? Array.from(authoritativeKpiKeySet).sort(
            (a, b) => parseInt(a.replace("kpi_", ""), 10) -
                parseInt(b.replace("kpi_", ""), 10)
        )
        : Array.from(
            { length: initialKpiCount },
            (_, index) => `kpi_${index + 1}`
        );

    const kpis = authoritativeKpiKeys.map(
        kpiKey => [kpiKey, responses?.kpi_list?.[kpiKey] || {}]
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

        <Box
            sx={{
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 2,
                p: {
                    xs: 2.5,
                    sm: 3,
                },
                mb: 4,
            }}
        >

            <Typography
                component="h2"
                sx={{
                    color: "#0F172A",
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    mb: 0.5,
                }}
            >
                {component.title || "KPI Alignment Review"}
            </Typography>

            <Typography
                sx={{
                    color: "#64748B",
                    fontSize: 14,
                    lineHeight: 1.5,
                    mb: 2.5,
                }}
            >
                Review the employee's KPIs, the supervisor's recommendations,
                and provide HR's final KPI review.
            </Typography>

            <Box
                sx={{
                    border: "1px solid #DCE3EC",
                    overflowX: "auto",
                    mb: 3,
                }}
            >
                <Box sx={{ minWidth: 760 }}>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                            bgcolor: "#F8FAFC",
                        }}
                    >
                        {[
                            "Employee KPI Suggestion",
                            "Suggested Expectation",
                            "Supervisor KPI Suggestion",
                            "Suggested Expectation",
                        ].map((label, index) => (
                            <Box
                                key={`${label}-${index}`}
                                sx={{
                                    color: "#0F172A",
                                    fontSize: 13,
                                    fontWeight: 700,
                                    px: 1.5,
                                    py: 1.25,
                                    borderRight: index < 3
                                        ? "1px solid #DCE3EC"
                                        : "none",
                                }}
                            >
                                {label}
                            </Box>
                        ))}
                    </Box>

                    {kpis.map(([kpiKey]) => (
                        <Box
                            key={`comparison-${kpiKey}`}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                                borderTop: "1px solid #DCE3EC",
                            }}
                        >
                            {[
                                employeeResponses?.kpi_list?.[kpiKey]?.title || "--",
                                employeeResponses?.kpi_list?.[kpiKey]?.expectation || "--",
                                supervisorResponses?.kpi_list?.[kpiKey]?.title || "--",
                                supervisorResponses?.kpi_list?.[kpiKey]?.expectation || "--",
                            ].map((value, index) => (
                                <Typography
                                    key={`${kpiKey}-${index}`}
                                    sx={{
                                        color: "#334155",
                                        fontSize: 14,
                                        lineHeight: 1.45,
                                        px: 1.5,
                                        py: 1.25,
                                        borderRight: index < 3
                                            ? "1px solid #DCE3EC"
                                            : "none",
                                    }}
                                >
                                    {value}
                                </Typography>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>

            <Box
                sx={{
                    bgcolor: "#F8FBFF",
                    border: "1px solid #B9D7FF",
                    borderRadius: 2,
                    p: 2,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            sm: "row",
                        },
                        alignItems: {
                            xs: "stretch",
                            sm: "center",
                        },
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 2,
                    }}
                >
                    <Typography
                        sx={{
                            color: "#0F172A",
                            fontSize: 14,
                            fontWeight: 700,
                        }}
                    >
                        Final Agreed Targets & Expectations
                    </Typography>

                    <Button
                        variant="outlined"
                        onClick={addKPI}
                        sx={{
                            alignSelf: {
                                xs: "flex-start",
                                sm: "auto",
                            },
                            borderColor: "#6EE7B7",
                            color: "#047857",
                            textTransform: "none",
                            "&:hover": {
                                borderColor: "#34D399",
                                bgcolor: "#F0FDF4",
                            },
                        }}
                    >
                        + Add KPI
                    </Button>
                </Box>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "minmax(0, 1fr) minmax(0, 2fr) 40px",
                        },
                        bgcolor: "#E7F0FD",
                        borderRadius: 1.5,
                        px: 1.25,
                        py: 1,
                        mb: 1.25,
                    }}
                >
                    <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                        Final Agreed KPI
                    </Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 700 }}>
                        Agreed Expectation
                    </Typography>
                </Box>

                <Box sx={{ display: "grid", gap: 1.25 }}>
                    {kpis.map(([kpiKey], index) => (
                        <Box
                            key={`final-${kpiKey}`}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "minmax(0, 1fr) minmax(0, 2fr) 40px",
                                },
                                gap: 1.25,
                                alignItems: "center",
                            }}
                        >
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="HR KPI Title"
                                value={responses?.kpi_list?.[kpiKey]?.title || ""}
                                onChange={(event) => {
                                    onResponsesChange({
                                        ...responses,
                                        kpi_list: {
                                            ...(responses?.kpi_list || {}),
                                            [kpiKey]: {
                                                ...(responses?.kpi_list?.[kpiKey] || {}),
                                                title: event.target.value,
                                            },
                                        },
                                    });
                                }}
                            />

                            <TextField
                                fullWidth
                                size="small"
                                placeholder="HR KPI Expectation"
                                value={responses?.kpi_list?.[kpiKey]?.expectation || ""}
                                onChange={(event) => {
                                    onResponsesChange({
                                        ...responses,
                                        kpi_list: {
                                            ...(responses?.kpi_list || {}),
                                            [kpiKey]: {
                                                ...(responses?.kpi_list?.[kpiKey] || {}),
                                                expectation: event.target.value,
                                            },
                                        },
                                    });
                                }}
                            />

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
                    ))}
                </Box>
            </Box>

        </Box>

    );

}