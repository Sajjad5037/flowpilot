import { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Typography
} from "@mui/material";

import EmployeesTable from "../components/employee/EmployeesTable";
import {
    getEmployees,
    deleteEmployee
} from "../services/employeeService";
import AddEmployeeDialog from "../components/employee/AddEmployeeDialog";
export default function Employees() {

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

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

        setSelectedEmployee(null);

        setOpenAddDialog(true);

    }
   function handleCloseDialog() {

        setOpenAddDialog(false);

        setSelectedEmployee(null);

    }

    async function handleEmployeeSaved() {

        await loadEmployees();

        setOpenAddDialog(false);

        setSelectedEmployee(null);

    }
    function handleEditEmployee(employee) {
        console.log("EDIT CLICKED");
        console.log(employee);

        setSelectedEmployee(employee);

        setOpenAddDialog(true);

    }
    async function handleDeleteEmployee(employeeId) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteEmployee(employeeId);

            await loadEmployees();

        }

        catch (error) {

            console.error("Failed to delete employee:", error);

            alert("Failed to delete employee.");

        }

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
                    <EmployeesTable
                        employees={employees}
                        onEdit={handleEditEmployee}
                        onDelete={handleDeleteEmployee}
                    />
                )}

                <AddEmployeeDialog
                    open={openAddDialog}
                    onClose={handleCloseDialog}
                    onSaved={handleEmployeeSaved}
                    employee={selectedEmployee}
                />
                </>


        </Box>

    );

}