import {
    Box,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function EmployeeKPIList({
    component,
    responses = {},
    onResponsesChange,
}) {
    const fields =
        component?.fields &&
        !Array.isArray(component.fields) &&
        Object.keys(component.fields).length > 0
            ? component.fields
            : {
                kpiTitle: true,
                expectation: true,
            };

    const responseKpis = responses?.kpi_list || {};
    const kpiEntries = Object.entries(responseKpis);
    const kpis = kpiEntries.length > 0
        ? kpiEntries
        : [["kpi_1", {}]];

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

    function updateKpiField(kpiIndex, fieldName, value) {
        const updatedKpis = kpis.map(([kpiKey, kpi], index) => (
            index === kpiIndex
                ? [kpiKey, { ...kpi, [fieldName]: value }]
                : [kpiKey, kpi]
        ));

        updateKpis(updatedKpis);
    }

    function addKpi() {
        updateKpis([
            ...kpis,
            ["kpi_new", {}],
        ]);
    }

    function removeKpi(kpiIndex) {
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: {
                        xs: "column",
                        sm: "row",
                    },
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 2.5,
                }}
            >
                <Box>
                    <Typography
                        component="h2"
                        sx={{
                            color: "#0F172A",
                            fontSize: 18,
                            fontWeight: 700,
                            lineHeight: 1.35,
                        }}
                    >
                        {component.title || "3. Proposed Key Performance Indicators (KPIs)"}
                    </Typography>

                    <Typography
                        sx={{
                            color: "#64748B",
                            fontSize: 14,
                            lineHeight: 1.5,
                            mt: 0.5,
                        }}
                    >
                        {component.description ||
                            "Propose ongoing recurring metrics and minimum target expectations."}
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    onClick={addKpi}
                    sx={{
                        alignSelf: {
                            xs: "flex-start",
                            sm: "auto",
                        },
                        flexShrink: 0,
                        borderColor: "#D8B4FE",
                        color: "#7C3AED",
                        textTransform: "none",
                        "&:hover": {
                            borderColor: "#A855F7",
                            bgcolor: "#FAF5FF",
                        },
                    }}
                >
                    + Add KPI
                </Button>
            </Box>

            <TableContainer
                sx={{
                    border: "1px solid #DCE3EC",
                    borderRadius: 0,
                    overflowX: "auto",
                }}
            >
                <Table
                    size="small"
                    sx={{
                        minWidth: 560,
                    }}
                >
                    <TableHead>
                        <TableRow
                            sx={{
                                backgroundColor: "#F8FAFC",
                            }}
                        >
                            {fields.kpiTitle && (
                                <TableCell
                                    sx={{
                                        color: "#0F172A",
                                        fontSize: 13,
                                        fontWeight: 700,
                                        borderRight: "1px solid #DCE3EC",
                                        borderBottom: "1px solid #DCE3EC",
                                        px: 1.5,
                                        py: 1.25,
                                    }}
                                >
                                    Proposed KPI Title
                                </TableCell>
                            )}

                            {fields.expectation && (
                                <TableCell
                                    sx={{
                                        color: "#0F172A",
                                        fontSize: 13,
                                        fontWeight: 700,
                                        borderBottom: "1px solid #DCE3EC",
                                        px: 1.5,
                                        py: 1.25,
                                    }}
                                >
                                    Target Expectation
                                </TableCell>
                            )}

                            <TableCell
                                sx={{
                                    width: 40,
                                    p: 0.5,
                                    borderBottom: "1px solid #DCE3EC",
                                }}
                            />
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {kpis.map(([kpiKey], index) => (
                            <TableRow key={kpiKey}>
                                {fields.kpiTitle && (
                                    <TableCell
                                        sx={{
                                            borderRight: "1px solid #DCE3EC",
                                            borderBottom: "1px solid #DCE3EC",
                                            px: 1.25,
                                            py: 0.75,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="standard"
                                            placeholder="e.g. Sprint Velocity"
                                            value={kpis[index][1]?.title || ""}
                                            onChange={(event) => {
                                                updateKpiField(
                                                    index,
                                                    "title",
                                                    event.target.value
                                                );
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            sx={{
                                                borderBottom: "1px solid #CBD5E1",
                                                "& .MuiInputBase-input": {
                                                    color: "#334155",
                                                    fontSize: 14,
                                                    px: 0.5,
                                                    py: 0.75,
                                                },
                                                "& .MuiInputBase-input::placeholder": {
                                                    color: "#94A3B8",
                                                    opacity: 1,
                                                },
                                            }}
                                        />
                                    </TableCell>
                                )}

                                {fields.expectation && (
                                    <TableCell
                                        sx={{
                                            borderBottom: "1px solid #DCE3EC",
                                            px: 1.25,
                                            py: 0.75,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            size="small"
                                            variant="standard"
                                            placeholder="e.g. 90% completion rate"
                                            value={kpis[index][1]?.expectation || ""}
                                            onChange={(event) => {
                                                updateKpiField(
                                                    index,
                                                    "expectation",
                                                    event.target.value
                                                );
                                            }}
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            sx={{
                                                borderBottom: "1px solid #CBD5E1",
                                                "& .MuiInputBase-input": {
                                                    color: "#334155",
                                                    fontSize: 14,
                                                    px: 0.5,
                                                    py: 0.75,
                                                },
                                                "& .MuiInputBase-input::placeholder": {
                                                    color: "#94A3B8",
                                                    opacity: 1,
                                                },
                                            }}
                                        />
                                    </TableCell>
                                )}

                                <TableCell
                                    align="center"
                                    sx={{
                                        p: 0.5,
                                        borderBottom: "1px solid #DCE3EC",
                                    }}
                                >
                                    <IconButton
                                        size="small"
                                        aria-label={`Remove KPI ${index + 1}`}
                                        onClick={() => removeKpi(index)}
                                        sx={{
                                            color: "#DC2626",
                                            "&:hover": {
                                                backgroundColor: "#FEE2E2",
                                            },
                                        }}
                                    >
                                        <CloseIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
