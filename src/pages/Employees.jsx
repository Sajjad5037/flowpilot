import { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";

import EmployeesTable from "../components/employee/EmployeesTable";
import { getEmployees } from "../services/employeeService";
import AddEmployeeDialog from "../components/employee/AddEmployeeDialog";
export default function Employees() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddDialog, setOpenAddDialog] = useState(false);

    useEffect(() => {
        loadEmployees();
    }, []);

    async function loadEmployees() {
        setLoading(true);

        const data = await getEmployees();

        setEmployees(data);

        setLoading(false);
    }

    function handleAddEmployee() {
        setOpenAddDialog(true);
        }
    function handleCloseDialog() {
        setOpenAddDialog(false);
        }

    function handleEmployeeSaved(employee) {
        setEmployees((prev) => [
            ...prev,
            {
            id: Date.now(),
            ...employee,
            },
        ]);
        }
return (

        <Box p={4}>

            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
            >

                <Typography variant="h4">
                    Employees
                </Typography>

                <Button
                    variant="contained"
                    onClick={handleAddEmployee}
                >
                    + Add Employee
                </Button>

            </Stack>

            <>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <EmployeesTable employees={employees} />
                )}

                <AddEmployeeDialog
                    open={openAddDialog}
                    onClose={handleCloseDialog}
                    onSaved={handleEmployeeSaved}
                />
                </>


        </Box>

    );

}