import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getEvaluationByToken,
    submitEvaluation
} from "../services/evaluationAssignmentService";
import EmployeeFormPreview
from "../workflowDesigner/components/EmployeeFormPreview/EmployeeFormPreview";
import EmployeeEvaluationForm
from "../workflowDesigner/employeeEvaluation/runtime/EmployeeEvaluationForm";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    Typography
} from "@mui/material";
import nurpLogo from "./assests/nurp-logo.png";

export default function PublicEvaluation() {

    const { accessToken } = useParams();

    const [loading, setLoading] = useState(true);

    const [assignment, setAssignment] = useState(null);

    const [submitted, setSubmitted] = useState(false);

    const [errorMessage, setErrorMessage] = useState("");

    const [employeeResponses, setEmployeeResponses] = useState({});

    const [supervisorResponses, setSupervisorResponses] = useState({});

    const [hrResponses, setHrResponses] = useState({});

    useEffect(() => {

        loadAssignment();

    }, []);

    async function loadAssignment() {

    try {

        console.log("Access Token:", accessToken);

        const data = await getEvaluationByToken(accessToken);

        console.log("Assignment from API:", data);
        console.log("Employee Responses:");
        console.log(data.employee_responses);

        console.log("Supervisor Responses:");
        console.log(data.supervisor_responses);

        console.log("Performance & Core Values:");
        console.log(
            data.supervisor_responses?.performance_and_core_values
        );

        setAssignment(data);
        console.log(
            "SUPERVISOR COMPONENTS:",
            data.workflow_json?.stages?.supervisor
        );

        // Load employee responses
        setEmployeeResponses(
            data.employee_responses || {}
        );

        // Load supervisor responses
        setSupervisorResponses(
            data.supervisor_responses || {}
        );

        setHrResponses(
            data.hr_responses || {}
        );

    }

    catch (error) {

        console.error(error);

        if (error.response?.status === 403) {

            setErrorMessage(
                "This evaluation has already been submitted."
            );

        }

        else if (error.response?.status === 404) {

            setErrorMessage(
                "Evaluation not found."
            );

        }

        else {

            setErrorMessage(
                "Unable to load evaluation."
            );

        }

    }

    finally {

        setLoading(false);

    }

}
 async function handleSubmitEvaluation() {

    try {

        console.log("====================================");
        console.log("Submitting Evaluation");
        console.log("Current Stage:", assignment.current_stage);

        let dataToSubmit = {};

        if (
            assignment?.workflow_json?.type === "employee_evaluation"
        ) {

            if (assignment.access_stage === "employee") {

                console.log("Employee Responses:");
                console.log(employeeResponses);

                dataToSubmit = employeeResponses;

            }
            else if (assignment.access_stage === "supervisor") {

                console.log("Supervisor Responses:");
                console.log(supervisorResponses);

                dataToSubmit = supervisorResponses;

            }
            else if (assignment.access_stage === "hr") {

                console.log("HR Responses:");
                console.log(hrResponses);

                dataToSubmit = hrResponses;

            }

        }
        else {

            // Preserve the existing sequential workflow exactly.

            const legacySubmissionStage =
                assignment.access_stage || assignment.current_stage;

            if (legacySubmissionStage === "employee") {

                console.log("Employee Responses:");
                console.log(employeeResponses);

                dataToSubmit = employeeResponses;

            }
            else if (legacySubmissionStage === "supervisor") {

                console.log("Supervisor Responses:");
                console.log(supervisorResponses);

                dataToSubmit = supervisorResponses;

            }
            else if (legacySubmissionStage === "hr") {

                console.log("HR Responses:");
                console.log(hrResponses);

                dataToSubmit = hrResponses;

            }
        }

        console.log("------------------------------------");
        console.log("Final Payload Being Submitted:");
        console.log(dataToSubmit);
        console.log("------------------------------------");

        await submitEvaluation(

            assignment.id,

            dataToSubmit,

            assignment?.workflow_json?.type === "employee_evaluation"
                ? assignment.access_stage
                : null,

            assignment?.workflow_json?.type === "employee_evaluation"
                ? null
                : accessToken

        );

       console.log("Submission Successful");

        setSubmitted(true);

            }

    catch (error) {

        console.error("Submission Failed");
        console.error(error);

        alert(
            "Failed to submit evaluation."
        );

    }

}

    const workflowComponents = [
        ...(assignment?.workflow_json?.stages?.employee || []),
        ...(assignment?.workflow_json?.stages?.supervisor || []),
    ];
    const goalComponent = workflowComponents.find(
        component => component.id === "goal_list"
    );
    const kpiComponent = workflowComponents.find(
        component => component.id === "kpi_list"
    );
    const supervisorGoals = Object.values(
        supervisorResponses?.goal_list || {}
    );
    const supervisorKpis = Object.values(
        supervisorResponses?.kpi_list || {}
    );
    const goalFieldsComplete = !goalComponent || (
        supervisorGoals.length > 0 &&
        supervisorGoals.every(goal => goal?.review?.trim())
    );
    const kpiFields = kpiComponent?.fields || {
        kpiTitle: true,
        expectation: true,
    };
    const kpiFieldsComplete = !kpiComponent || (
        supervisorKpis.length > 0 &&
        supervisorKpis.every(kpi => (
            (!kpiFields.kpiTitle || kpi?.title?.trim()) &&
            (!kpiFields.expectation || kpi?.expectation?.trim())
        ))
    );
    const performanceComponent = workflowComponents.find(
        component => component.id === "performance_and_core_values"
    );
    const performanceResponses =
    supervisorResponses?.performance_and_core_values || {};

    const performanceFields = performanceComponent?.fields || [];

    const performanceFieldsComplete =
        !performanceComponent ||
        performanceFields.length === 0 ||
        performanceFields.every(field => {
            const value =
                performanceResponses?.[field.id];

            return (
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ""
            );
        });
    const isGoalKpiSupervisorStage =
        assignment?.workflow_json?.type !== "employee_evaluation" &&
        assignment?.current_stage === "supervisor";
    const requiredSupervisorFieldsComplete =
        goalFieldsComplete &&
        kpiFieldsComplete &&
        performanceFieldsComplete;
    console.log("SUPERVISOR SUBMIT VALIDATION DEBUG", {
        isGoalKpiSupervisorStage,
        goalFieldsComplete,
        kpiFieldsComplete,
        performanceFieldsComplete,
        requiredSupervisorFieldsComplete,
        supervisorResponses,
    });
    const employeeGoals = Object.values(
        employeeResponses?.goal_list || {}
    );
    const employeeKpis = Object.values(
        employeeResponses?.kpi_list || {}
    );
    const goalFields = goalComponent?.fields || {
        goalTitle: true,
        goalDescription: true,
    };
    const employeeGoalFieldsComplete = !goalComponent || (
        employeeGoals.length > 0 &&
        employeeGoals.every(goal => (
            (!goalFields.goalTitle || goal?.proposal?.trim()) &&
            (!goalFields.goalDescription || goal?.description?.trim())
        ))
    );
    const employeeKpiFieldsComplete = !kpiComponent || (
        employeeKpis.length > 0 &&
        employeeKpis.every(kpi => (
            (!kpiFields.kpiTitle || kpi?.title?.trim()) &&
            (!kpiFields.expectation || kpi?.expectation?.trim())
        ))
    );
    const isGoalKpiEmployeeStage =
        assignment?.workflow_json?.type !== "employee_evaluation" &&
        (assignment?.current_stage === "employee" ||
            assignment?.access_stage === "employee");
    const requiredEmployeeFieldsComplete =
        employeeGoalFieldsComplete &&
        employeeKpiFieldsComplete;

    if (submitted) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgcolor="#F8FAFC"
                p={3}
            >

                <Paper
                    elevation={4}
                    sx={{
                        p: 6,
                        maxWidth: 600,
                        width: "100%",
                        textAlign: "center",
                        borderRadius: 3
                    }}
                >

                    <Typography
                        variant="h3"
                        color="success.main"
                        gutterBottom
                    >
                        ✅ Evaluation Submitted
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{ mt: 3 }}
                    >
                        Thank you for completing your evaluation.
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 2, mb: 5 }}
                    >
                        This evaluation has been recorded successfully.
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={() => window.close()}
                    >
                        Close Window
                    </Button>

                </Paper>

            </Box>

        );

    }

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={8}
            >

                <CircularProgress />

            </Box>

        );

    }

    if (!assignment) {

        return (

            <Box p={5}>

                <Alert severity="error">

                    {errorMessage || "Evaluation not found."}

                </Alert>

            </Box>

        );

    }

    const isEmployeeEvaluation =
        assignment?.workflow_json?.type === "employee_evaluation";
    const employee = {
        full_name: assignment.employee_name,
        supervisor_name: assignment.supervisor_name,
        department: assignment.department,
        designation: assignment.designation,
    };
    const employeeInformationComplete = Boolean(
        employee.full_name?.trim() &&
        employee.supervisor_name?.trim() &&
        employee.department?.trim() &&
        employee.designation?.trim()
    );
    const isGoalKpiHrStage =
        !isEmployeeEvaluation &&
        (assignment.current_stage === "hr" ||
            assignment.access_stage === "hr");
    const hrGoalEntries = Object.entries(
        hrResponses?.goal_list || {}
    );
    const hrGoalCount = goalComponent
        ? Math.max(
            Object.keys(employeeResponses?.goal_list || {}).length,
            Object.keys(supervisorResponses?.goal_list || {}).length,
            1
        )
        : 0;
    const hrGoalsToValidate = goalComponent
        ? (hrGoalEntries.length > 0
            ? hrGoalEntries.map(([, goal]) => goal)
            : Array.from(
                { length: hrGoalCount },
                () => ({})
            ))
        : [];
    const goalsComplete = !goalComponent || (
        hrGoalsToValidate.length > 0 &&
        hrGoalsToValidate.every(goal => goal?.final_goal?.trim())
    );
    const employeeKpiKeys = Object.keys(
        employeeResponses?.kpi_list || {}
    );
    const supervisorKpiKeys = Object.keys(
        supervisorResponses?.kpi_list || {}
    );
    const authoritativeKpiKeys = new Set([
        ...employeeKpiKeys,
        ...supervisorKpiKeys,
        ...Object.keys(hrResponses?.kpi_list || {}),
    ]);
    if (authoritativeKpiKeys.size === 0 && kpiComponent) {
        authoritativeKpiKeys.add("kpi_1");
    }
    const hrKpisToValidate = kpiComponent
        ? Array.from(authoritativeKpiKeys).map(kpiKey =>
            hrResponses?.kpi_list?.[kpiKey] || {}
        )
        : [];
    const kpisComplete = !kpiComponent || (
        hrKpisToValidate.length > 0 &&
        hrKpisToValidate.every(kpi => (
            kpi?.title?.trim() &&
            kpi?.expectation?.trim()
        ))
    );
    const requiredHrFieldsComplete =
        employeeInformationComplete &&
        goalsComplete &&
        kpisComplete;

    if (isEmployeeEvaluation) {

        const reviewCycleTitle = getReviewCycleTitle(
            assignment.review_cycle
        );

        const viewerStage =
            assignment.access_stage || assignment.current_stage;

        const formTitle =
            viewerStage === "employee"
                ? "EMPLOYEE EVALUATION FORM"
                : viewerStage === "supervisor"
                    ? "SUPERVISOR REVIEW FORM"
                    : viewerStage === "hr"
                        ? "HR Master Sheet"
                        : "EMPLOYEE EVALUATION FORM";

            console.log(
                "FORM VIEWER DEBUG:",
                {
                    access_stage: assignment.access_stage,
                    current_stage: assignment.current_stage,
                    viewerStage,
                    formTitle,
                }
            );

        return (

            <Box
                sx={{
                    minHeight: "100vh",
                    bgcolor: "#F1F5F9",
                    px: {
                        xs: 2,
                        sm: 4,
                    },
                    py: {
                        xs: 3,
                        sm: 6,
                    },
                }}
            >

                <Box
                    sx={{
                        width: "100%",
                        maxWidth: 1160,
                        mx: "auto",
                    }}
                >

                    <Box
                        sx={{
                            position: "relative",
                            textAlign: "center",
                            mb: 3,
                            pr: {
                                xs: 0,
                                sm: 18,
                            },
                        }}
                    >

                        <Typography
                            sx={{
                                color: "#0F172A",
                                fontSize: {
                                    xs: 25,
                                    sm: 32,
                                },
                                fontWeight: 800,
                                letterSpacing: 1.5,
                            }}
                        >
                            {formTitle}
                        </Typography>

                        <Typography
                            sx={{
                                color: "#334155",
                                fontSize: {
                                    xs: 16,
                                    sm: 20,
                                },
                                fontWeight: 700,
                                letterSpacing: 1,
                                mt: 1,
                            }}
                        >
                            {reviewCycleTitle
                                ? `${reviewCycleTitle} EVALUATION`
                                : "EVALUATION"}
                        </Typography>

                        <Box
                            component="img"
                            src={nurpLogo}
                            alt="NURP Logo"
                            sx={{
                                position: {
                                    xs: "static",
                                    sm: "absolute",
                                },
                                width: {
                                    xs: 110,
                                    sm: 135,
                                },
                                maxWidth: "100%",
                                height: "auto",
                                objectFit: "contain",
                                right: 0,
                                top: "50%",
                                transform: {
                                    xs: "none",
                                    sm: "translateY(-50%)",
                                },
                                mt: {
                                    xs: 2,
                                    sm: 0,
                                },
                            }}
                        />

                    </Box>

                    <Stack
                        direction={{
                            xs: "column",
                            sm: "row",
                        }}
                        justifyContent="space-between"
                        alignItems={{
                            xs: "stretch",
                            sm: "center",
                        }}
                        spacing={2}
                        sx={{
                            mb: 2.5,
                        }}
                    >

                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                        >

                            <Box
                                sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: "50%",
                                    bgcolor: "#F59E0B",
                                }}
                            />

                            <Typography
                                sx={{
                                    color: "#475569",
                                    fontSize: 14,
                                    fontWeight: 600,
                                }}
                            >
                                Status: {getEmployeeEvaluationStatus(assignment)}
                            </Typography>

                        </Stack>

                        <Button
                            variant="contained"
                            onClick={handleSubmitEvaluation}
                            sx={{
                                alignSelf: {
                                    xs: "stretch",
                                    sm: "auto",
                                },
                                px: 3,
                                bgcolor: "#0F172A",
                                "&:hover": {
                                    bgcolor: "#1E293B",
                                },
                            }}
                        >
                            Save Evaluation
                        </Button>

                    </Stack>

                    <Box
                        sx={{
                            borderBottom: "1px solid #CBD5E1",
                            mb: 3,
                        }}
                    />

                    {console.log("PUBLIC EVALUATION RESPONSES:", {
                        employeeResponses: assignment.employee_responses,
                        supervisorResponses,
                        hrResponses: assignment.hr_responses,
                    })}
                    <EmployeeEvaluationForm
                        workflow={assignment.workflow_json}
                        previewMode={assignment.access_stage || assignment.current_stage}
                        employee={{
                            full_name: assignment.employee_name,
                            email: assignment.employee_email,
                            supervisor_name: assignment.supervisor_name,
                            department: assignment.department,
                            review_cycle: assignment.review_cycle,
                            review_cycle_months:
                                assignment.review_cycle_months,
                            finalized_goals: assignment.finalized_goals,
                            finalized_kpis: assignment.finalized_kpis || [],
                        }}
                        responses={
                            assignment.access_stage === "hr"
                                ? hrResponses
                                : assignment.access_stage === "supervisor"
                                ? supervisorResponses
                                : employeeResponses
                        }
                        onResponsesChange={
                            assignment.access_stage === "hr"
                                ? setHrResponses
                                : assignment.access_stage === "supervisor"
                                ? setSupervisorResponses
                                : setEmployeeResponses
                        }
                        employeeResponses={assignment.employee_responses || {}}
                        supervisorResponses={supervisorResponses}
                        hrResponses={assignment.hr_responses || {}}
                    />

                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        sx={{
                            mt: 3,
                        }}
                    >

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSubmitEvaluation}
                            disabled={
                                submitted || (
                                    isGoalKpiSupervisorStage &&
                                    !requiredSupervisorFieldsComplete
                                )
                            }
                        >
                            {submitted
                                ? "Evaluation Submitted"
                                : "Submit Evaluation"}
                        </Button>

                    </Stack>

                </Box>

            </Box>

        );

    }

    return (

        <Box
            p={5}
            maxWidth={1000}
            mx="auto"
        >

            <Paper
                elevation={3}
                sx={{ p: 4 }}
            >

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 4
                    }}
                >

                    <Box
                        component="img"
                        src={nurpLogo}
                        alt="NURP Logo"
                        sx={{
                            width: 140,
                            height: "auto",
                            objectFit: "contain",
                            mt: 1,
                            mr: 1,
                            alignSelf: "center"
                        }}
                    />

                </Box>

                {assignment?.workflow_json?.type === "employee_evaluation" ? (

                    <EmployeeEvaluationForm
                        workflow={assignment.workflow_json}
                        employee={{
                            full_name: assignment.employee_name,
                            email: assignment.employee_email,
                            supervisor_name: assignment.supervisor_name,
                            department: assignment.department,
                            review_cycle: assignment.review_cycle,
                        }}
                    />

                ) : (

                    <EmployeeFormPreview
                        workflow={assignment.workflow_json}
                        previewMode={
                            assignment.access_stage || assignment.current_stage
                        }
                        reviewCycle={assignment.review_cycle}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        hrResponses={hrResponses}
                        employee={employee}
                        setEmployeeResponses={setEmployeeResponses}
                        setSupervisorResponses={setSupervisorResponses}
                        setHrResponses={setHrResponses}
                    />

                )}
                <Box
                    mt={4}
                    pt={3}
                    sx={{
                        borderTop: "1px solid #E5E7EB"
                    }}
                >

                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="flex-end"
                    >

                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => {

                                console.log("Save Draft");

                            }}
                        >
                            Save Draft
                        </Button>

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleSubmitEvaluation}
                            disabled={
                                submitted || (
                                    (isGoalKpiEmployeeStage &&
                                        !requiredEmployeeFieldsComplete) ||
                                    (isGoalKpiSupervisorStage &&
                                        !requiredSupervisorFieldsComplete) ||
                                    (isGoalKpiHrStage &&
                                        !requiredHrFieldsComplete)
                                )
                            }
                        >
                            {submitted
                                ? "Evaluation Submitted"
                                : "Submit Evaluation"}
                        </Button>

                    </Stack>

                </Box>


            </Paper>

        </Box>

    );

}

function getReviewCycleTitle(reviewCycle) {
    if (!reviewCycle) {
        return "";
    }

    return reviewCycle.split(" (")[0];
}

function getEmployeeEvaluationStatus(assignment) {
    if (assignment.current_stage === "employee") {
        return "Pending Employee Input";
    }

    if (assignment.status === "completed") {
        return "Completed";
    }

    return assignment.status || "Pending";
}