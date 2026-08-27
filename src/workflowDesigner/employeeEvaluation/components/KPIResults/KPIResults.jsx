import {
    Box,
    Button,
    Divider,
    FormControl,
    InputLabel,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";


const previewKpis = [
    {
        id: "kpi-1",
        title: "R1 Pass",
        expectation: "25%",
        april: "71.4%",
        may: "80%",
        june: "38%",
        q2Average: "63.30%",
        comments:
            "Strong performance across Q2, consistently meeting expectations.",
    },
    {
        id: "kpi-2",
        title: "R2 Pass",
        expectation: "50%",
        april: "60%",
        may: "66.7%",
        june: "54.5%",
        q2Average: "57.90%",
        comments:
            "Well above 50% baseline throughout the quarter.",
    },
    {
        id: "kpi-3",
        title: "90-day retention",
        expectation: "70%",
        april: "N/A",
        may: "100%",
        june: "100%",
        q2Average: "100%",
        comments:
            "100% retention achieved for both Colton and Bingham.",
    },
    {
        id: "kpi-4",
        title: "Days to hire",
        expectation: "30 mid / 60 senior",
        april: "N/A",
        may: "N/A",
        june: "11 days",
        q2Average: "Met Target",
        comments:
            "Fast turnaround time on David's recruitment process.",
    },
];


export default function KPIResults({
    component,
    previewMode = "employee",
    finalizedKpis = [],
    reviewCycle,
    reviewCycleMonths = [],
    responses = {},
    onResponsesChange,
    employeeResponses = {},
    supervisorResponses = {},
    hrResponses = {},
}) {

    const settings = component?.settings || {};
    const months =
        reviewCycleMonths.length === 3
            ? reviewCycleMonths
            : ["January", "February", "March"];

    const quarter =
        reviewCycle?.match(/^Q\d+/)?.[0] || "Q1";

    const averageLabel = `${quarter} Average`;
    const monthKeys = months.map(
        month => month.toLowerCase()
    );

    const latestMonthKey = monthKeys[monthKeys.length - 1];

    const hasAllLatestMonthValues =
        finalizedKpis.length > 0 &&
        finalizedKpis.every(
            kpi =>
                hrResponses?.kpi_results?.[kpi.id]?.[latestMonthKey] !== undefined &&
                hrResponses?.kpi_results?.[kpi.id]?.[latestMonthKey] !== null &&
                String(hrResponses.kpi_results[kpi.id][latestMonthKey]).trim() !== ""
        );

    const kpiResponses =
        responses?.kpi_results || {};

    const displayedKpiResponses =
        previewMode === "employee" ||
        previewMode === "supervisor"
            ? hrResponses?.kpi_results || {}
            : kpiResponses;

    function updateKpiMonth(
        kpiId,
        monthKey,
        value
    ) {
        if (!onResponsesChange) {
            return;
        }

        onResponsesChange({
            ...responses,
            kpi_results: {
                ...kpiResponses,
                [kpiId]: {
                    ...(kpiResponses[kpiId] || {}),
                    [monthKey]: value,
                },
            },
        });
    }


    function calculateKpiAverage(kpiId) {

        const sourceResponses =
            previewMode === "employee" ||
            previewMode === "supervisor"
                ? hrResponses?.kpi_results || {}
                : kpiResponses;

        const values = monthKeys
            .map(
                monthKey =>
                    sourceResponses?.[kpiId]?.[monthKey]
            )
            .map(value => Number(value))
            .filter(value => !Number.isNaN(value));

        if (values.length === 0) {
            return "";
        }

        const average =
            values.reduce(
                (sum, value) => sum + value,
                0
            ) / values.length;

        return average.toFixed(2);
    }


    function renderKpiTable({
        editable = false,
        showComments = false,
        showActions = false,
        showFooterActions = editable,
    } = {}) {

        const gridTemplateColumns = showComments
            ? "1.2fr 1.3fr 0.75fr 0.75fr 0.75fr 0.9fr 1.8fr 0.5fr"
            : "1.4fr 1.3fr 0.8fr 0.8fr 0.8fr 0.9fr";

        const minWidth = 0;

        return (
            <Box>

                <Box
                    sx={{
                        width: "100%",
                        minWidth: 0,
                        overflowX: "hidden",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 1,
                    }}
                >

                    <Box
                        sx={{
                            width: "100%",
                            minWidth: 0,
                            display: "grid",
                            gridTemplateColumns,
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

                        {months.map(
                            month => (
                                <HeaderCell key={month}>
                                    {month}
                                </HeaderCell>
                            )
                        )}

                        <HeaderCell>
                            {averageLabel}
                        </HeaderCell>

                        {showComments && (
                            <HeaderCell>
                                Comments & Notes
                            </HeaderCell>
                        )}

                        {showActions && (
                            <HeaderCell>
                                Action
                            </HeaderCell>
                        )}

                    </Box>


                    {(
                        finalizedKpis.length > 0
                            ? finalizedKpis.map((kpi) => ({
                                id: `finalized-kpi-${kpi.id}`,
                                kpiId: kpi.id,
                                title: kpi.title,
                                expectation: kpi.expectation,
                                comments: "",
                            }))
                            : previewKpis
                    ).map((kpi) => (

                        <Box
                            key={kpi.id}
                            sx={{
                                width: "100%",
                                minWidth: 0,
                                display: "grid",
                                gridTemplateColumns,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                            }}
                        >

                            <BodyCell>

                                {editable ? (
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={2}
                                        defaultValue={kpi.title}
                                        sx={{
                                            "& .MuiOutlinedInput-root": {
                                                alignItems: "flex-start",
                                            },
                                            "& .MuiInputBase-input": {
                                                overflowWrap: "anywhere",
                                            },
                                        }}
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
                                        value={
                                            kpiResponses?.[kpi.kpiId]?.[monthKeys[0]] || ""
                                        }
                                        onChange={(event) =>
                                            updateKpiMonth(
                                                kpi.kpiId,
                                                monthKeys[0],
                                                event.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {displayedKpiResponses?.[kpi.kpiId]?.[monthKeys[0]] || ""}
                                    </Typography>
                                )}

                            </BodyCell>


                            <BodyCell>

                                {editable ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={
                                            kpiResponses?.[kpi.kpiId]?.[monthKeys[1]] || ""
                                        }
                                        onChange={(event) =>
                                            updateKpiMonth(
                                                kpi.kpiId,
                                                monthKeys[1],
                                                event.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {displayedKpiResponses?.[kpi.kpiId]?.[monthKeys[1]] || ""}
                                    </Typography>
                                )}

                            </BodyCell>


                            <BodyCell>

                                {editable ? (
                                    <TextField
                                        fullWidth
                                        size="small"
                                        value={
                                            kpiResponses?.[kpi.kpiId]?.[monthKeys[2]] || ""
                                        }
                                        onChange={(event) =>
                                            updateKpiMonth(
                                                kpi.kpiId,
                                                monthKeys[2],
                                                event.target.value
                                            )
                                        }
                                    />
                                ) : (
                                    <Typography variant="body2">
                                        {displayedKpiResponses?.[kpi.kpiId]?.[monthKeys[2]] || ""}
                                    </Typography>
                                )}

                            </BodyCell>


                            <BodyCell>

                                <TextField
                                    fullWidth
                                    size="small"
                                    value={calculateKpiAverage(kpi.kpiId)}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            backgroundColor:
                                                previewMode === "hr"
                                                    ? "#FFFFFF"
                                                    : "#F3F4F6",
                                            cursor:
                                                previewMode === "hr"
                                                    ? "text"
                                                    : "default",
                                        },
                                        "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor:
                                                previewMode === "hr"
                                                    ? undefined
                                                    : "#D1D5DB",
                                        },
                                        "& .MuiInputBase-input": {
                                            fontSize: 13,
                                            color:
                                                previewMode === "hr"
                                                    ? "#000000"
                                                    : "#64748B",
                                            cursor:
                                                previewMode === "hr"
                                                    ? "text"
                                                    : "default",
                                        },
                                        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor:
                                                previewMode === "hr"
                                                    ? undefined
                                                    : "#D1D5DB",
                                        },
                                        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                            borderColor:
                                                previewMode === "hr"
                                                    ? undefined
                                                    : "#D1D5DB",
                                            borderWidth:
                                                previewMode === "hr"
                                                    ? undefined
                                                    : "1px",
                                        },
                                    }}
                                />

                            </BodyCell>

                            {showComments && (
                                <BodyCell>
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={2}
                                        size="small"
                                        defaultValue={kpi.comments}
                                    />
                                </BodyCell>
                            )}

                            {showActions && (
                                <BodyCell>
                                    <IconButton
                                        color="error"
                                        size="small"
                                        aria-label={`Delete ${kpi.title}`}
                                    >
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </BodyCell>
                            )}

                        </Box>

                    ))}

                </Box>


                {showFooterActions && (
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
                            value={
                                responses?.kpi_results?.overall_rating || ""
                            }
                            onChange={(event) => {
                                if (typeof onResponsesChange !== "function") {
                                    return;
                                }

                                onResponsesChange({
                                    ...responses,
                                    kpi_results: {
                                        ...(responses?.kpi_results || {}),
                                        overall_rating: event.target.value,
                                    },
                                });
                            }}
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
                sx={{
                    p: 3,
                    borderRadius: 2,
                }}
            >

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{ mb: 2 }}
                >

                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                    >

                        <Typography
                            variant="h6"
                            fontWeight={700}
                        >
                            2. KPI Results for {quarter}
                        </Typography>

                        <Typography
                            variant="body2"
                            sx={{
                                px: 1.5,
                                py: 0.75,
                                border: "1px solid #D6E0EC",
                                borderRadius: 1.5,
                                color: "#1E3A5F",
                            }}
                        >
                            Section Weight: <strong>50%</strong>
                        </Typography>

                    </Stack>

                    <Button
                        variant="outlined"
                        size="small"
                    >
                        + Add KPI
                    </Button>

                </Stack>

                {renderKpiTable({
                    editable: true,
                    showComments: true,
                    showActions: true,
                    showFooterActions: false,
                })}

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                    sx={{
                        textTransform: "uppercase",
                    }}
                >
                    Overall KPI Results Evaluation
                </Typography>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, 1fr)",
                        },
                        gap: 2,
                    }}
                >

                    <RatingSummaryCard
                        label="Employee Selection"
                        value={
                            employeeResponses?.kpi_results?.overall_rating
                                ? `${employeeResponses.kpi_results.overall_rating}. ${
                                      {
                                          "1": "Poor",
                                          "2": "Below Expectation",
                                          "3": "Meets Expectation",
                                          "4": "Above Expectation",
                                          "5": "Fully Meets",
                                      }[
                                          employeeResponses.kpi_results.overall_rating
                                      ]
                                  }`
                                : "Not Selected"
                        }
                    />

                    <RatingSummaryCard
                        label="Supervisor Selection"
                        value={
                            supervisorResponses?.kpi_results?.overall_rating
                                ? `${supervisorResponses.kpi_results.overall_rating}. ${
                                      {
                                          "1": "Poor",
                                          "2": "Below Expectation",
                                          "3": "Meets Expectation",
                                          "4": "Above Expectation",
                                          "5": "Fully Meets",
                                      }[
                                          supervisorResponses.kpi_results.overall_rating
                                      ]
                                  }`
                                : "Not Selected"
                        }
                    />

                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            borderRadius: 2,
                        }}
                    >

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 1 }}
                        >
                            Final Agreed Rating
                        </Typography>

                        <FormControl fullWidth size="small">

                            <Select
                                aria-label="Final Agreed Rating"
                                defaultValue="4"
                            >

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

                    <RatingSummaryCard
                        label="KPI Section Points"
                        value="37.5"
                        valueSx={{
                            textAlign: "center",
                            fontSize: "1.4rem",
                        }}
                    />

                </Box>

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
                    value={
                        responses?.kpi_results?.overall_rating || ""
                    }
                    disabled={!hasAllLatestMonthValues}
                    onChange={(event) => {
                        if (typeof onResponsesChange !== "function") {
                            return;
                        }

                        onResponsesChange({
                            ...responses,
                            kpi_results: {
                                ...(responses?.kpi_results || {}),
                                overall_rating: event.target.value,
                            },
                        });
                    }}
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


function RatingSummaryCard({
    label,
    value,
    valueSx,
}) {

    return (

        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 2,
            }}
        >

            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 1 }}
            >
                {label}
            </Typography>

            <Typography
                variant="body1"
                fontWeight={700}
                sx={valueSx}
            >
                {value}
            </Typography>

        </Paper>

    );

}