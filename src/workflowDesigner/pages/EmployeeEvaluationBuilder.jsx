import {
    Box,
    Button,
    Stack,
    Typography
} from "@mui/material";
import EmployeeInformation
    from "../employeeEvaluation/components/EmployeeInformation";

import { useLocation } from "react-router-dom";

export default function EmployeeEvaluationBuilder() {

    const location = useLocation();

    const workflow = location.state;

    return (

        <Box p={4}>

            <Stack spacing={3}>

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Employee Evaluation Builder
                    </Typography>

                    <Typography
                        color="text.secondary"
                        mt={1}
                    >
                        {workflow?.name || "Employee Evaluation"}
                    </Typography>

                </Box>

                <Stack
                    direction="row"
                    spacing={2}
                >

                    <Button
                        variant="contained"
                    >
                        Employee
                    </Button>

                    <Button
                        variant="outlined"
                    >
                        Supervisor
                    </Button>

                    <Button
                        variant="outlined"
                    >
                        HR
                    </Button>

                </Stack>

                <EmployeeInformation />

            </Stack>

        </Box>

    );
}