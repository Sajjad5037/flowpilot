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

            if (assignment.current_stage === "employee") {

                console.log("Employee Responses:");
                console.log(employeeResponses);

                dataToSubmit = employeeResponses;

            }
            else if (assignment.current_stage === "supervisor") {

                console.log("Supervisor Responses:");
                console.log(supervisorResponses);

                dataToSubmit = supervisorResponses;

            }
            else if (assignment.current_stage === "hr") {

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
                : null

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

    if (isEmployeeEvaluation) {

        const reviewCycleTitle = getReviewCycleTitle(
            assignment.review_cycle
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
                            EMPLOYEE EVALUATION FORM
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
                            onClick={() => {

                                console.log("Save Draft");

                            }}
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
                            disabled={submitted}
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

                    <Box>

                        <Typography
                            variant="h4"
                            fontWeight={700}
                            gutterBottom
                        >
                            Performance Evaluation
                        </Typography>

                        <Typography
                            variant="h6"
                            mb={1}
                        >
                            Employee: {assignment.employee_name}
                        </Typography>

                        <Typography
                            color="primary"
                        >
                            Current Stage: {assignment.current_stage}
                        </Typography>

                    </Box>

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
                        previewMode={assignment.current_stage}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        hrResponses={hrResponses}
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
                            disabled={submitted}
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