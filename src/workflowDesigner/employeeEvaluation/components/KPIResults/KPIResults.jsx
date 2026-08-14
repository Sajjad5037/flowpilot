import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";


const previewKpis = [
    {
        id: "kpi-1",
        title: "R1 Pass",
        expectation: "25%",
        april: "71.4%",
        may: "80%",
        june: "38%",
        q2Average: "63.30%",
    },
    {
        id: "kpi-2",
        title: "R2 Pass",
        expectation: "50%",
        april: "60%",
        may: "66.7%",
        june: "54.5%",
        q2Average: "57.90%",
    },
    {
        id: "kpi-3",
        title: "90-day retention",
        expectation: "70%",
        april: "N/A",
        may: "100%",
        june: "100%",
        q2Average: "100%",
    },
    {
        id: "kpi-4",
        title: "Days to hire",
        expectation: "30 mid / 60 senior",
        april: "N/A",
        may: "N/A",
        june: "11 days",
        q2Average: "Met Target",
    },
];


export default function KPIResults({
    component,
    previewMode = "employee",
}) {

    const settings = component?.settings || {};


    function renderKpiTable({
        editable = false,
        showComments = false,
    } = {}) {

        return (
            <Box>

                <Box
                    sx={{
                        overflowX: "auto",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                    }}
                >

                    <Box
                        sx={{
                            minWidth: 950,
                            display: "grid",
                            gridTemplateColumns:
                                "1.5fr 1.4fr 0.8fr 0.8fr 0.8fr 1fr",
                            backgroundColor: "grey.100",
                            borderBottom: "1px solid",
                            borderColor: "divider",
                        }}
                    >

                        <HeaderCell>
                            KPI Title
                        </HeaderCell>

                        <HeaderCell>
                            Expectation
                        </HeaderCell>

                        <HeaderCell>
                            April
                        </HeaderCell>

                        <HeaderCell>
                            May
                        </HeaderCell>

                        <HeaderCell>
                            June
                        </HeaderCell>

                        <HeaderCell>
                            Q2 Average
                        </HeaderCell>

                    </Box>


                    {previewKpis.map((kpi) => (

                        <Box
                            key={kpi.id}
                            sx={{
                                minWidth: 950,
                                display: "grid",
                                gridTemplateColumns:
                                    "1.5fr 1.4fr 0.8fr 0.8fr 0.8fr 1fr",
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        >

                            <BodyCell>

                                {editable ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        defaultValue={kpi.title}
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {kpi.title}
                                    </Typography>
                                )}

                            </BodyCell>


                            <BodyCell>

                                {editable ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        defaultValue={kpi.expectation}
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {kpi.expectation}
                                    </Typography>
                                )}

                            </BodyCell>


                            <BodyCell>

                                {editable ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        defaultValue={kpi.april}
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {kpi.april}
                                    </Typography>
                                )}

                            </BodyCell>


                            <BodyCell>

                                {editable ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        defaultValue={kpi.may}
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {kpi.may}
                                    </Typography>
                                )}

                            </BodyCell>


                            <BodyCell>

                                {editable ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        defaultValue={kpi.june}
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {kpi.june}
                                    </Typography>
                                )}

                            </BodyCell>


                            <BodyCell>

                                <Typography
                                    variant="body2"
                                    fontWeight={600}
                                >
                                    {kpi.q2Average}
                                </Typography>

                            </BodyCell>

                        </Box>

                    ))}

                </Box>


                {editable && (
                    <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mt: 2 }}
                    >

                        <Button
                            variant="outlined"
                            size="small"
                        >
                            Add KPI
                        </Button>

                        <Button
                            variant="outlined"
                            color="error"
                            size="small"
                        >
                            Delete KPI
                        </Button>

                    </Stack>
                )}

            </Box>
        );
    }


    if (previewMode === "supervisor") {

        return (
            <Paper
                variant="outlined"
                sx={{ p: 3 }}
            >

                <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                >
                    Quarterly KPI Results
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 3,
                        fontStyle: "italic",
                    }}
                >
                    KPIs are based on the final KPI titles and expectations
                    agreed upon in the previous KPI-setting meeting and
                    will be loaded automatically into the evaluation.
                </Typography>


                {renderKpiTable()}


                <Divider sx={{ my: 3 }} />


                <Stack spacing={2}>

                    <FormControl fullWidth size="small">

                        <InputLabel>
                            Supervisor KPI Rating
                        </InputLabel>

                        <Select
                            label="Supervisor KPI Rating"
                            defaultValue=""
                        >
                            <MenuItem value="">
                                Select rating
                            </MenuItem>

                            <MenuItem value="1">
                                1. Poor
                            </MenuItem>

                            <MenuItem value="2">
                                2. Below Expectation
                            </MenuItem>

                            <MenuItem value="3">
                                3. Meets Expectation
                            </MenuItem>

                            <MenuItem value="4">
                                4. Above Expectation
                            </MenuItem>

                            <MenuItem value="5">
                                5. Fully Meets
                            </MenuItem>

                        </Select>

                    </FormControl>


                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label="Supervisor Comments"
                        placeholder="Enter comments about KPI performance..."
                    />

                </Stack>

            </Paper>
        );
    }


    if (previewMode === "hr") {

        return (
            <Paper
                variant="outlined"
                sx={{ p: 3 }}
            >

                <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                >
                    Quarterly KPI Results
                </Typography>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 3,
                        fontStyle: "italic",
                    }}
                >
                    KPIs are based on the final KPI titles and expectations
                    agreed upon in the previous KPI-setting meeting and
                    will be loaded automatically into the evaluation.
                </Typography>


                {renderKpiTable({
                    editable: true,
                })}


                <Divider sx={{ my: 3 }} />


                <Stack spacing={2}>

                    <TextField
                        fullWidth
                        multiline
                        minRows={3}
                        label="HR Comments"
                        placeholder="Enter HR comments..."
                    />


                    <FormControl fullWidth size="small">

                        <InputLabel>
                            Final Agreed KPI Rating
                        </InputLabel>

                        <Select
                            label="Final Agreed KPI Rating"
                            defaultValue=""
                        >

                            <MenuItem value="">
                                Select rating
                            </MenuItem>

                            <MenuItem value="1">
                                1. Poor
                            </MenuItem>

                            <MenuItem value="2">
                                2. Below Expectation
                            </MenuItem>

                            <MenuItem value="3">
                                3. Meets Expectation
                            </MenuItem>

                            <MenuItem value="4">
                                4. Above Expectation
                            </MenuItem>

                            <MenuItem value="5">
                                5. Fully Meets
                            </MenuItem>

                        </Select>

                    </FormControl>

                </Stack>

            </Paper>
        );
    }


    // Employee view
    return (
        <Paper
            variant="outlined"
            sx={{ p: 3 }}
        >

            <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
            >
                Quarterly KPI Results
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                    mb: 3,
                    fontStyle: "italic",
                }}
            >
                KPIs are based on the final KPI titles and expectations
                agreed upon in the previous KPI-setting meeting and
                will be loaded automatically into the evaluation.
            </Typography>


            {renderKpiTable()}


            <Divider sx={{ my: 3 }} />


            <FormControl fullWidth size="small">

                <InputLabel>
                    Overall KPI Performance Rating
                </InputLabel>

                <Select
                    label="Overall KPI Performance Rating"
                    defaultValue=""
                >

                    <MenuItem value="">
                        Select rating
                    </MenuItem>

                    <MenuItem value="1">
                        1. Poor
                    </MenuItem>

                    <MenuItem value="2">
                        2. Below Expectation
                    </MenuItem>

                    <MenuItem value="3">
                        3. Meets Expectation
                    </MenuItem>

                    <MenuItem value="4">
                        4. Above Expectation
                    </MenuItem>

                    <MenuItem value="5">
                        5. Fully Meets
                    </MenuItem>

                </Select>

            </FormControl>

        </Paper>
    );
}


function HeaderCell({ children }) {

    return (
        <Box
            sx={{
                p: 1.5,
                fontWeight: 600,
                fontSize: "0.85rem",
            }}
        >
            {children}
        </Box>
    );
}


function BodyCell({ children }) {

    return (
        <Box
            sx={{
                p: 1.5,
                display: "flex",
                alignItems: "center",
            }}
        >
            {children}
        </Box>
    );
}