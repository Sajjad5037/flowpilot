import { useState } from "react";

import {
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
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

        currentTitle: "R1 Pass",
        currentExpectation: "25%",

        employeeProposalTitle: "R1 Pass Rate",
        employeeSuggestedExpectation: "35%",
        employeeProposalChange: "35%",

        supervisorProposalTitle: "R1 Pass Rate",
        supervisorSuggestedExpectation: "30%",
        supervisorProposalChange: "30%",
    },

    {
        id: "kpi-2",

        currentTitle: "R2 Pass",
        currentExpectation: "50%",

        employeeProposalTitle: "R2 Pass Rate",
        employeeSuggestedExpectation: "55%",
        employeeProposalChange: "55%",

        supervisorProposalTitle: "R2 Pass Rate",
        supervisorSuggestedExpectation: "50%",
        supervisorProposalChange: "50%",
    },

    {
        id: "kpi-3",

        currentTitle: "90-day retention",
        currentExpectation: "70%",

        employeeProposalTitle: "90-Day Retention Rate",
        employeeSuggestedExpectation: "70%",
        employeeProposalChange: "70%",

        supervisorProposalTitle: "90-Day Retention Rate",
        supervisorSuggestedExpectation: "75%",
        supervisorProposalChange: "75%",
    },

    {
        id: "kpi-4",

        currentTitle: "Days to hire",
        currentExpectation:
            "30 days for low to mid-level, 60 days for senior or highly technical.",

        employeeProposalTitle: "Days to Hire",
        employeeSuggestedExpectation: "25 days",
        employeeProposalChange: "25 days",

        supervisorProposalTitle: "Time To Hire",
        supervisorSuggestedExpectation: "25 days",
        supervisorProposalChange: "25 days",
    },

    {
        id: "kpi-5",

        currentTitle: "Head Hunting Script",
        currentExpectation:
            "Testing 2 or more scripts at all times per role",

        employeeProposalTitle: "Head Hunting Scripts",
        employeeSuggestedExpectation:
            "Continue testing multiple scripts",
        employeeProposalChange:
            "Continue testing multiple scripts",

        supervisorProposalTitle: "Head Hunting Script",
        supervisorSuggestedExpectation:
            "2+ scripts per role",
        supervisorProposalChange:
            "2+ scripts per role",
    },
];

export default function KPIReviewPlanning({
    component,
    previewMode = "employee",
    responses = {},
    onResponsesChange,
    employeeResponses = {},
    supervisorResponses = {},
    hrResponses = {},
}) {

    const settings = component?.settings || {};
    const employeeProposals =
        employeeResponses?.kpi_review_planning?.employee_proposals || [];

    const supervisorProposals =
        supervisorResponses?.kpi_review_planning?.supervisor_proposals || [];

    const hrMatrixRows = Array.from(
        {
            length: Math.max(
                employeeProposals.length,
                supervisorProposals.length
            ),
        },
        (_, index) => ({
            id: `hr-row-${index}`,
            employee: employeeProposals[index] || {
                title: "",
                proposed: "",
            },
            supervisor: supervisorProposals[index] || {
                title: "",
                proposed: "",
            },
        })
    );
    const [finalAgreedKpis, setFinalAgreedKpis] = useState(
        hrResponses?.kpi_review_planning?.final_agreed_kpis || []
    );
    const [employeeKpis, setEmployeeKpis] = useState([
        {
            id: "employee-1",
            title: "",
            proposed: "",
        },
        {
            id: "employee-2",
            title: "",
            proposed: "",
        },
    ]);
    const [supervisorKpis, setSupervisorKpis] = useState([
        {
            id: "supervisor-1",
            title: "",
            proposed: "",
        },
        {
            id: "supervisor-2",
            title: "",
            proposed: "",
        },
    ]);


    /*
     * ---------------------------------------------------------
     * EMPLOYEE VIEW
     * ---------------------------------------------------------
     *
     * Employee proposes changes to the current KPIs.
     *
     * In the real evaluation this data will eventually be
     * loaded from / saved to the backend.
     *
     * For now these are preview values only.
     */

    if (previewMode === "employee") {

        return (
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    borderRadius: 2,
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                >
                    Proposed KPI Change Details (Q3 Review)
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        fontStyle: "italic",
                    }}
                >
                    Review the current KPIs and propose any changes
                    to KPI titles or expectations for Q3.
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    This section is for the employee to propose KPI title or
                    expectation changes before supervisor review.
                </Typography>

                <ProposalHeader
                    firstColumn="Proposed KPI Change Title"
                    secondColumn="Employee Proposed Change"
                />


                {employeeKpis.map((kpi) => (

                    <ProposalRow
                        key={kpi.id}
                        title={kpi.title}
                        proposed={kpi.proposed}
                        onDelete={() => {
                            setEmployeeKpis((prev) =>
                                prev.filter((row) => row.id !== kpi.id)
                            );
                        }}
                        onChange={(field, value) => {
                            const updatedRows = employeeKpis.map((row) =>
                                row.id === kpi.id
                                    ? { ...row, [field]: value }
                                    : row
                            );

                            setEmployeeKpis(updatedRows);

                            if (typeof onResponsesChange === "function") {
                                onResponsesChange({
                                    ...responses,
                                    kpi_review_planning: {
                                        ...(responses?.kpi_review_planning || {}),
                                        employee_proposals: updatedRows,
                                    },
                                });
                            }
                        }}
                    />

                ))}


                <Box sx={{ mt: 2 }}>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            setEmployeeKpis((prev) => [
                                ...prev,
                                {
                                    id: `employee-${Date.now()}-${Math.random()}`,
                                    title: "",
                                    proposed: "",
                                },
                            ]);
                        }}
                    >
                        + Add KPI
                    </Button>

                </Box>

            </Paper>
        );
    }


    /*
     * ---------------------------------------------------------
     * SUPERVISOR VIEW
     * ---------------------------------------------------------
     *
     * Supervisor gets the same proposal-style experience,
     * but the proposed change belongs to the supervisor.
     */

    if (previewMode === "supervisor") {

        return (
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    borderRadius: 2,
                }}
            >

                <Typography
                    variant="h6"
                    fontWeight={600}
                    gutterBottom
                >
                    Proposed KPI Change Details (Q3 Review)
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        mb: 2,
                        fontStyle: "italic",
                    }}
                >
                    Review the current KPIs and propose any changes
                    to KPI titles or expectations for Q3.
                </Typography>


                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    Review the employee proposal and confirm or adjust the KPI
                    target before HR sees the final recommendation.
                </Typography>

                <ProposalHeader
                    firstColumn="Proposed KPI Change Title"
                    secondColumn="Supervisor Proposed Change"
                />


                {supervisorKpis.map((kpi) => (

                    <ProposalRow
                        key={kpi.id}
                        title={kpi.title}
                        proposed={kpi.proposed}
                        onDelete={() => {
                            setSupervisorKpis((prev) =>
                                prev.filter((row) => row.id !== kpi.id)
                            );
                        }}
                        onChange={(field, value) => {
                            const updatedRows = supervisorKpis.map((row) =>
                                row.id === kpi.id
                                    ? { ...row, [field]: value }
                                    : row
                            );

                            setSupervisorKpis(updatedRows);

                            if (typeof onResponsesChange === "function") {
                                onResponsesChange({
                                    ...responses,
                                    kpi_review_planning: {
                                        ...(responses?.kpi_review_planning || {}),
                                        supervisor_proposals: updatedRows,
                                    },
                                });
                            }
                        }}
                    />

                ))}


                <Box sx={{ mt: 2 }}>

                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            setSupervisorKpis((prev) => [
                                ...prev,
                                {
                                    id: `supervisor-${Date.now()}-${Math.random()}`,
                                    title: "",
                                    proposed: "",
                                },
                            ]);
                        }}
                    >
                        + Add KPI
                    </Button>

                </Box>

            </Paper>
        );
    }


    /*
     * ---------------------------------------------------------
     * HR VIEW
     * ---------------------------------------------------------
     *
     * HR gets the consolidated view:
     *
     * Current KPI
     * Current Expectation
     * Employee Suggestion
     * Suggested Expectation
     * Supervisor Suggestion
     * Suggested Expectation
     *
     * Then HR can define the final agreed Q3 KPI.
     */

    return (
        <Paper
            variant="outlined"
            sx={{
                p: 2,
                borderRadius: 2,
            }}
        >

            <Typography
                variant="h6"
                fontWeight={600}
                gutterBottom
            >
                Q3 KPI Review & Planning
            </Typography>


            <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
            >
                This HR view compares the employee and supervisor proposals side
                by side before the final Q3 KPI targets are agreed.
            </Typography>


            {/* ------------------------------------------------
                CONSOLIDATED MATRIX
            ------------------------------------------------ */}

            {/* ------------------------------------------------
    CONSOLIDATED MATRIX
------------------------------------------------ */}

<Box
    sx={{
        border: "1px solid #D6E0EC",
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 1px 3px rgba(15, 23, 42, 0.04)",
    }}
>

    {/* Table Header */}

    <Box
        sx={{
            width: "100%",
        }}
    >

        <Box
            sx={{
                display: "grid",

                gridTemplateColumns:
                    "minmax(0, 1.05fr) minmax(0, 1.65fr) minmax(0, 1.35fr) minmax(0, 1.15fr) minmax(0, 1.35fr) minmax(0, 1.15fr)",

                backgroundColor: "#F4F7FB",

                borderBottom:
                    "1px solid #CBD5E1",
            }}
        >

            <HeaderCell>
                Current KPI Title
            </HeaderCell>

            <HeaderCell>
                Current Expectation
            </HeaderCell>

            <HeaderCell>
                Employee KPI Suggestion
            </HeaderCell>

            <HeaderCell>
                Suggested Expectation
            </HeaderCell>

            <HeaderCell>
                Supervisor KPI Suggestion
            </HeaderCell>

            <HeaderCell>
                Suggested Expectation
            </HeaderCell>

        </Box>


        {/* Table Rows */}

        {hrMatrixRows.map((row, index) => (

    <Box
        key={row.id}
        sx={{
            display: "grid",

            gridTemplateColumns:
                "minmax(0, 1.05fr) minmax(0, 1.65fr) minmax(0, 1.35fr) minmax(0, 1.15fr) minmax(0, 1.35fr) minmax(0, 1.15fr)",

            backgroundColor:
                index % 2 === 0
                    ? "#FFFFFF"
                    : "#FAFCFE",

                borderBottom:
                index === hrMatrixRows.length - 1
                    ? "none"
                    : "1px solid #E2E8F0",
        }}
    >

        {/* Current KPI Title */}

        <BodyCell>

            <TextField
                fullWidth
                size="small"
                defaultValue={previewKpis[index]?.currentTitle || ""}
                variant="outlined"
            />

        </BodyCell>


        {/* Current Expectation */}

        <BodyCell>

            <TextField
                fullWidth
                size="small"
                defaultValue={previewKpis[index]?.currentExpectation || ""}
                variant="outlined"
                multiline
                minRows={1}
            />

        </BodyCell>


        {/* Employee KPI Suggestion */}

        <BodyCell>

            <TextField
                fullWidth
                size="small"
                defaultValue={
                    row.employee.title
                }
                variant="outlined"
            />

        </BodyCell>


        {/* Employee Suggested Expectation */}

        <BodyCell>

            <TextField
                fullWidth
                size="small"
                defaultValue={
                    row.employee.proposed
                }
                variant="outlined"
            />

        </BodyCell>


        {/* Supervisor KPI Suggestion */}

        <BodyCell>

            <TextField
                fullWidth
                size="small"
                defaultValue={
                    row.supervisor.title
                }
                variant="outlined"
            />

        </BodyCell>


        {/* Supervisor Suggested Expectation */}

        <BodyCell>

            <TextField
                fullWidth
                size="small"
                defaultValue={
                    row.supervisor.proposed
                }
                variant="outlined"
            />

        </BodyCell>

    </Box>

))}

    </Box>

</Box>


            <Divider sx={{ my: 3 }} />


            {/* ------------------------------------------------
                FINAL AGREED Q3 TARGETS
            ------------------------------------------------ */}

            <Box>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 1.5 }}
                >

                    <Typography
                        variant="subtitle1"
                        fontWeight={600}
                    >
                        Final Agreed Q3 Targets & Expectations
                    </Typography>


                    <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                            setFinalAgreedKpis((prev) => [
                                ...prev,
                                {
                                    id: `final-${Date.now()}-${Math.random()}`,
                                    title: "",
                                    expectation: "",
                                },
                            ]);
                        }}
                    >
                        + Add KPI
                    </Button>

                </Stack>


                <Box
                    sx={{
                        border: "1px solid",
                        borderColor: "primary.light",
                        borderRadius: 1,
                    }}
                >

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr) auto",
                            backgroundColor: "primary.50",
                            borderBottom: "1px solid",
                            borderColor: "primary.light",
                        }}
                    >

                        <HeaderCell>
                            Final Agreed KPI
                        </HeaderCell>

                        <HeaderCell>
                            Agreed Expectation
                        </HeaderCell>

                        <HeaderCell>
                            Action
                        </HeaderCell>

                    </Box>


                    {finalAgreedKpis.map((kpi) => (

                        <Box
                            key={kpi.id}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr) auto",
                                borderBottom: "1px solid",
                                borderColor: "primary.light",
                            }}
                        >

                            <BodyCell>

                                <TextField
                                    fullWidth
                                    size="small"
                                    value={kpi.title}
                                    onChange={(event) => {
                                        const updatedRows = finalAgreedKpis.map((row) =>
                                            row.id === kpi.id
                                                ? { ...row, title: event.target.value }
                                                : row
                                        );

                                        setFinalAgreedKpis(updatedRows);

                                        if (typeof onResponsesChange === "function") {
                                            onResponsesChange({
                                                ...responses,
                                                kpi_review_planning: {
                                                    ...(responses?.kpi_review_planning || {}),
                                                    final_agreed_kpis: updatedRows,
                                                },
                                            });
                                        }
                                    }}
                                />

                            </BodyCell>


                            <BodyCell>

                                <TextField
                                    fullWidth
                                    size="small"
                                    value={kpi.expectation}
                                    onChange={(event) => {
                                        const updatedRows = finalAgreedKpis.map((row) =>
                                            row.id === kpi.id
                                                ? { ...row, expectation: event.target.value }
                                                : row
                                        );

                                        setFinalAgreedKpis(updatedRows);

                                        if (typeof onResponsesChange === "function") {
                                            onResponsesChange({
                                                ...responses,
                                                kpi_review_planning: {
                                                    ...(responses?.kpi_review_planning || {}),
                                                    final_agreed_kpis: updatedRows,
                                                },
                                            });
                                        }
                                    }}
                                />

                            </BodyCell>


                            <BodyCell>

                                <IconButton
                                    color="error"
                                    size="small"
                                    aria-label="Delete KPI"
                                    onClick={() => {
                                        setFinalAgreedKpis((prev) =>
                                            prev.filter(
                                                (row) => row.id !== kpi.id
                                            )
                                        );
                                    }}
                                >
                                    ×
                                </IconButton>

                            </BodyCell>

                        </Box>

                    ))}

                </Box>

            </Box>


            <Divider sx={{ my: 3 }} />


            <Stack spacing={2}>

                <FormControl
                    fullWidth
                    size="small"
                >

                    <InputLabel>
                        Final Q3 KPI Rating
                    </InputLabel>

                    <Select
                        label="Final Q3 KPI Rating"
                        value={responses?.kpi_review_planning?.final_q3_kpi_rating || ""}
                        onChange={(event) => {
                            onResponsesChange?.({
                                ...responses,
                                kpi_review_planning: {
                                    ...(responses?.kpi_review_planning || {}),
                                    final_q3_kpi_rating: event.target.value,
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

            </Stack>

        </Paper>
    );
}


/*
 * ---------------------------------------------------------
 * Proposal Header
 * ---------------------------------------------------------
 */

function ProposalHeader({
    firstColumn,
    secondColumn,
}) {

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                backgroundColor: "primary.50",
                borderRadius: 1,
                mb: 1,
            }}
        >

            <Box
                sx={{
                    p: 1.25,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                }}
            >
                {firstColumn}
            </Box>


            <Box
                sx={{
                    p: 1.25,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                }}
            >
                {secondColumn}
            </Box>

        </Box>
    );
}


/*
 * ---------------------------------------------------------
 * Proposal Row
 * ---------------------------------------------------------
 */

function ProposalRow({
    title,
    proposed,
    onDelete,
    onChange,
}) {

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr auto",
                gap: 1,
                mb: 1,
                alignItems: "center",
            }}
        >

            <TextField
                fullWidth
                size="small"
                value={title}
                onChange={(event) =>
                    onChange?.("title", event.target.value)
                }
            />


            <TextField
                fullWidth
                size="small"
                value={proposed}
                onChange={(event) =>
                    onChange?.("proposed", event.target.value)
                }
            />


            <IconButton
                color="error"
                size="small"
                aria-label="Delete KPI"
                onClick={onDelete}
            >
                ×
            </IconButton>

        </Box>
    );
}


/*
 * ---------------------------------------------------------
 * HR table cells
 * ---------------------------------------------------------
 */

function HeaderCell({ children }) {

    return (
        <Box
            sx={{
                p: 1.5,
                minWidth: 0,
                overflowWrap: "anywhere",

                minHeight: 62,

                display: "flex",
                alignItems: "center",

                borderRight:
                    "1px solid #D6E0EC",

                fontWeight: 700,

                fontSize: "0.78rem",

                lineHeight: 1.35,

                color: "#1E3A5F",

                letterSpacing: "0.01em",
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
                minWidth: 0,
                width: "100%",
                overflowWrap: "anywhere",

                minHeight: 72,

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",

                borderRight:
                    "1px solid #E2E8F0",
            }}
        >
            {children}
        </Box>
    );
}