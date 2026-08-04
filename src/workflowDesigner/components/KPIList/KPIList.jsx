import {
    Paper,
    Typography,
    Divider,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

export default function KPIList({

    component

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

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid #E5E7EB",
                borderRadius: 3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >
                {component.title || "Proposed KPIs"}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >
                {component.description ||
                    "Employees propose KPIs for the upcoming quarter."}
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 2
                }}
            >

                <Table>

                    <TableHead>

                        <TableRow>

                            {fields.kpiTitle && (

                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        bgcolor: "#F3F4F6",
                                        py: 1.25,
                                        px: 2
                                    }}
                                >
                                    Proposed KPI Title
                                </TableCell>

                            )}

                            {fields.expectation && (

                                <TableCell
                                    sx={{
                                        fontWeight: 700,
                                        bgcolor: "#F3F4F6",
                                        py: 1.25,
                                        px: 2
                                    }}
                                >
                                    Expectation / Target
                                </TableCell>

                            )}

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {kpis.map(kpi => (

                            <TableRow key={kpi.id}>

                                {fields.kpiTitle && (

                                    <TableCell>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            placeholder="e.g. Sprint Velocity"
                                            variant="outlined"
                                            sx={{
                                                "& .MuiOutlinedInput-root": {
                                                    borderRadius: 2
                                                }
                                            }}
                                        />

                                    </TableCell>

                                )}

                                {fields.expectation && (

                                    <TableCell
                                        sx={{
                                            p: 1
                                        }}
                                    >

                                        <TextField
                                            fullWidth
                                            placeholder="e.g. 90% completion rate"
                                            variant="outlined"
                                        />

                                    </TableCell>

                                )}

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

        </Paper>

    );

}