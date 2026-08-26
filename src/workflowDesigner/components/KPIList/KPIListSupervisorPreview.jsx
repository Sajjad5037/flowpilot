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
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function KPIListSupervisorPreview({

    component,
    employeeResponses,
    supervisorResponses,
    responses,
    onResponsesChange

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

    const currentSupervisorResponses =
        supervisorResponses || responses || {};
    const responseKpis = currentSupervisorResponses.kpi_list || {};
    const kpiEntries = Object.entries(responseKpis);
    const kpis = kpiEntries.length > 0
        ? kpiEntries
        : [["kpi_1", {}]];

    function updateKpis(updatedKpis) {
        onResponsesChange?.({
            ...currentSupervisorResponses,
            kpi_list: updatedKpis.reduce((kpiList, [, kpi]) => {
                const kpiKey = `kpi_${Object.keys(kpiList).length + 1}`;
                kpiList[kpiKey] = kpi;
                return kpiList;
            }, {}),
        });
    }

    function updateSupervisorKPI(kpiIndex, field, value) {
        const updatedKpis = kpis.map(([kpiKey, kpi], index) => (
            index === kpiIndex
                ? [kpiKey, { ...kpi, [field]: value }]
                : [kpiKey, kpi]
        ));

        updateKpis(updatedKpis);
    }

    function addKPI() {
        const existingKpis = Object.entries(
            currentSupervisorResponses.kpi_list || {}
        );

        updateKpis([
            ...existingKpis,
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
                                            placeholder="Supervisor KPI Title"
                                            value={kpis[index][1]?.title || ""}
                                            onChange={(event) => {
                                                updateSupervisorKPI(
                                                    index,
                                                    "title",
                                                    event.target.value
                                                );
                                            }}
                                        />
                                    </TableCell>
                                )}

                                {fields.expectation && (
                                    <TableCell sx={{ p: 1 }}>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            multiline
                                            minRows={2}
                                            placeholder="Supervisor Expectation"
                                            value={kpis[index][1]?.expectation || ""}
                                            onChange={(event) => {
                                                updateSupervisorKPI(
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
                                    sx={{ p: 0.5 }}
                                >
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
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button
                variant="outlined"
                onClick={addKPI}
                sx={{ mt: 2 }}
            >
                + Add KPI
            </Button>

        </Box>

    );

}