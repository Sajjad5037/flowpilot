import {
    Box,
    Button,
    Grid,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { useEffect, useState } from "react";

import { getEmployees } from "../services/employeeService";
import evaluationTemplateService from "../services/evaluationTemplateService";
import { sendEvaluation } from "../services/evaluationAssignmentService";

export default function EvaluationAssignments() {

    const [employee, setEmployee] = useState("");
    const [supervisor, setSupervisor] = useState("");
    const [hr, setHr] = useState("");
    const [template, setTemplate] = useState("");
    const [employees, setEmployees] = useState([]);
    const [templates, setTemplates] = useState([]);

    const selectedEmployee = employees.find(
        e => e.id === Number(employee)
    );

    useEffect(() => {

        loadData();

    }, []);

    async function loadData() {

        try {

            const employeeData = await getEmployees();

            const templateData =
                await evaluationTemplateService.getAll();

            setEmployees(employeeData);

            setTemplates(templateData);

        }

        catch (error) {

            console.error(error);

        }

    }
    async function handleSendEvaluation() {

        try {

            await sendEvaluation({

                employeeId: employee,

                supervisorId: supervisor,

                hrId: hr,

                templateId: template

            });

            alert("Evaluation sent successfully.");

            setEmployee("");
            setSupervisor("");
            setHr("");
            setTemplate("");

        }

        catch (error) {

            console.error(error);

            alert("Failed to send evaluation.");

        }

    }

    return (

    <Box p={4}>

        <Typography
            variant="h4"
            fontWeight={700}
            mb={1}
        >
            Employee Evaluation Management
        </Typography>

        <Typography
            color="text.secondary"
            mb={4}
        >
            Select an employee, supervisor, HR reviewer and evaluation template,
            then send the evaluation.
        </Typography>

        <Paper
            elevation={2}
            sx={{
                p: 4,
                maxWidth: 900
            }}
        >

            <Stack spacing={3}>

                <Grid
                    container
                    spacing={3}
                >

                    {/* Employee */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            select
                            fullWidth
                            label="Employee"
                            value={employee}
                            onChange={(event) => {
                                setEmployee(event.target.value);
                                setTemplate("");
                            }}
                        >

                            <MenuItem value="">
                                Select Employee
                            </MenuItem>

                            {employees
                                .filter(e => e.role === "Employee" && e.is_active === true)
                                .map(employee => (

                                    <MenuItem
                                        key={employee.id}
                                        value={employee.id}
                                    >
                                        {employee.full_name}
                                    </MenuItem>

                                ))}

                        </TextField>

                    </Grid>

                    {/* Supervisor */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            select
                            fullWidth
                            label="Supervisor"
                            value={supervisor}
                            onChange={(event) =>
                                setSupervisor(event.target.value)
                            }
                        >

                            <MenuItem value="">
                                Select Supervisor
                            </MenuItem>

                            {employees
                                .filter(e => e.role === "Supervisor")
                                .map(supervisor => (

                                    <MenuItem
                                        key={supervisor.id}
                                        value={supervisor.id}
                                    >
                                        {supervisor.full_name}
                                    </MenuItem>

                                ))}

                        </TextField>

                    </Grid>

                    {/* Reviewer */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            select
                            fullWidth
                            label="Reviewer"
                            value={hr}
                            onChange={(event) =>
                                setHr(event.target.value)
                            }
                        >

                            <MenuItem value="">
                                Select Reviewer
                            </MenuItem>

                            {employees
                                .filter(e => e.role === "Reviewer")
                                .map(reviewer => (

                                    <MenuItem
                                        key={reviewer.id}
                                        value={reviewer.id}
                                    >
                                        {reviewer.full_name}
                                    </MenuItem>

                                ))}

                        </TextField>

                    </Grid>

                    {/* Evaluation Template */}

                    <Grid size={{ xs: 12, md: 6 }}>

                        <TextField
                            select
                            fullWidth
                            label="Evaluation Template"
                            value={template}
                            onChange={(event) =>
                                setTemplate(event.target.value)
                            }
                        >

                            <MenuItem value="">
                                Select Evaluation Template
                            </MenuItem>

                            {templates
                                .filter(template => {

                                    if (!selectedEmployee) {
                                        return true;
                                    }

                                    if (selectedEmployee.is_existing_employee) {
                                        return template.workflow_type === "employee_evaluation";
                                    }

                                    return template.workflow_type === "goal_kpi_setting";

                                })
                                .map(template => (

                                <MenuItem
                                    key={template.id}
                                    value={template.id}
                                >
                                    {template.name}
                                </MenuItem>

                                ))}

                        </TextField>

                    </Grid>

                </Grid>

                <Box>

                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleSendEvaluation}
                    >
                        Send Evaluation
                    </Button>

                </Box>

            </Stack>

        </Paper>

    </Box>

);

}