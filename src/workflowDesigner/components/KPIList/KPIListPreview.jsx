import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

export default function KPIListPreview({

    component,
    responses,
    onResponsesChange

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
    function updateKPIField(kpiKey, fieldName, value) {

        onResponsesChange({

            ...responses,

            kpi_list: {

                ...(responses?.kpi_list || {}),

                [kpiKey]: {

                    ...(responses?.kpi_list?.[kpiKey] || {}),

                    [fieldName]: value

                }

            }

        });

    }

    return (

        <Box
            sx={{
                mb: 4
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                mb={3}
            >
                {component.title || "Proposed KPIs"}
            </Typography>

            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: "1px solid #D1D5DB",
                    borderRadius: 2
                }}
            >

                <Table>

                    <TableHead>

                        <TableRow>

                            {fields.kpiTitle && (

                                <TableCell
                                    sx={{
                                        bgcolor: "#EEF2F7",
                                        fontWeight: 700,
                                        width: "50%"
                                    }}
                                >
                                    Proposed KPI Title
                                </TableCell>

                            )}

                            {fields.expectation && (

                                <TableCell
                                    sx={{
                                        bgcolor: "#EEF2F7",
                                        fontWeight: 700,
                                        width: "50%"
                                    }}
                                >
                                    Expectation / Target
                                </TableCell>

                            )}

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {kpis.map((kpi, index) => {

                            const kpiKey = `kpi_${index + 1}`;

                            return (

                                <TableRow key={kpi.id}>

                                    {fields.kpiTitle && (

                                        <TableCell>

                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder="e.g. Sprint Velocity"
                                                value={
                                                    responses?.kpi_list?.[kpiKey]?.title || ""
                                                }
                                                onChange={(e) => {

                                                    updateKPIField(
                                                        kpiKey,
                                                        "title",
                                                        e.target.value
                                                    );

                                                }}
                                            />

                                        </TableCell>

                                    )}

                                    {fields.expectation && (

                                        <TableCell>

                                            <TextField
                                                fullWidth
                                                size="small"
                                                placeholder="e.g. 90% completion rate"
                                                value={
                                                    responses?.kpi_list?.[kpiKey]?.expectation || ""
                                                }
                                                onChange={(e) => {

                                                    updateKPIField(
                                                        kpiKey,
                                                        "expectation",
                                                        e.target.value
                                                    );

                                                }}
                                            />

                                        </TableCell>

                                    )}

                                </TableRow>

                            );

                        })}

                    </TableBody>

                </Table>

            </TableContainer>

        </Box>

    );

}