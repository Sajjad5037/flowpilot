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
                mb: 4,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 2,
                    mb: 2,
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        {component.title || "3. Proposed Key Performance Indicators (KPIs)"}
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 0.75 }}
                    >
                        {component.description ||
                            "Propose ongoing recurring metrics and minimum target expectations."}
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    onClick={addKpi}
                    sx={{
                        flexShrink: 0,
                    }}
                >
                    + Add KPI
                </Button>
            </Box>

            <TableContainer
                sx={{
                    border: "1px solid #D1D5DB",
                    borderRadius: 2,
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
                                backgroundColor: "#EEF2F7",
                            }}
                        >
                            {fields.kpiTitle && (
                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        borderRight: "1px solid #D1D5DB",
                                    }}
                                >
                                    Proposed KPI Title
                                </TableCell>
                            )}

                            {fields.expectation && (
                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                    }}
                                >
                                    Target Expectation
                                </TableCell>
                            )}

                            <TableCell
                                sx={{
                                    width: 48,
                                    p: 0.5,
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
                                            borderRight: "1px solid #E5E7EB",
                                            p: 1,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="e.g. Sprint Velocity"
                                            value={kpis[index][1]?.title || ""}
                                            onChange={(event) => {
                                                updateKpiField(
                                                    index,
                                                    "title",
                                                    event.target.value
                                                );
                                            }}
                                        />
                                    </TableCell>
                                )}

                                {fields.expectation && (
                                    <TableCell
                                        sx={{
                                            p: 1,
                                        }}
                                    >
                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="e.g. 90% completion rate"
                                            value={kpis[index][1]?.expectation || ""}
                                            onChange={(event) => {
                                                updateKpiField(
                                                    index,
                                                    "expectation",
                                                    event.target.value
                                                );
                                            }}
                                        />
                                    </TableCell>
                                )}

                                <TableCell
                                    align="center"
                                    sx={{
                                        p: 0.5,
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
