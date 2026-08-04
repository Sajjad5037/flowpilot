import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getEvaluationByToken,
    submitEvaluation
} from "../services/evaluationAssignmentService";
import EmployeeFormPreview
from "../workflowDesigner/components/EmployeeFormPreview/EmployeeFormPreview";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    Typography
} from "@mui/material";

export default function PublicEvaluation() {

    const { accessToken } = useParams();

    const [loading, setLoading] = useState(true);

    const [assignment, setAssignment] = useState(null);

    const [employeeResponses, setEmployeeResponses] = useState({});

    const [supervisorResponses, setSupervisorResponses] = useState({});

    useEffect(() => {

        loadAssignment();

    }, []);

    async function loadAssignment() {

    try {

        console.log("Access Token:", accessToken);

        const data = await getEvaluationByToken(accessToken);

        console.log("Assignment from API:", data);

        setAssignment(data);

        // Load employee responses
        setEmployeeResponses(
            data.employee_responses || {}
        );

        // Load supervisor responses
        setSupervisorResponses(
            data.supervisor_responses || {}
        );

    }

    catch (error) {

        console.error(error);

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

            console.log("HR Stage");

            dataToSubmit = {};

        }

        console.log("------------------------------------");
        console.log("Final Payload Being Submitted:");
        console.log(dataToSubmit);
        console.log("------------------------------------");

        await submitEvaluation(

            assignment.id,

            dataToSubmit

        );

        console.log("Submission Successful");

        alert(
            "Evaluation submitted successfully."
        );

    }

    catch (error) {

        console.error("Submission Failed");
        console.error(error);

        alert(
            "Failed to submit evaluation."
        );

    }

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

                    Evaluation not found.

                </Alert>

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

                <Typography
                    variant="h4"
                    gutterBottom
                >
                    Performance Evaluation
                </Typography>

                <Typography
                    variant="h6"
                    mb={2}
                >
                    Employee:
                    {" "}
                    {assignment.employee_name}
                </Typography>

                <Typography
                    color="primary"
                    mb={4}
                >
                    Current Stage:
                    {" "}
                    {assignment.current_stage}
                </Typography>

                <EmployeeFormPreview
                    workflow={assignment.workflow_json}
                    previewMode={assignment.current_stage}
                    employeeResponses={employeeResponses}
                    supervisorResponses={supervisorResponses}
                    setEmployeeResponses={setEmployeeResponses}
                    setSupervisorResponses={setSupervisorResponses}
                />
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
                        >
                            Submit Evaluation
                        </Button>

                    </Stack>

                </Box>


            </Paper>

        </Box>

    );

}