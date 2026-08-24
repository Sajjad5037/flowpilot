import { useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Stack,
    Tab,
    Tabs,
    TextField,
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
    const [employeeTab, setEmployeeTab] = useState("active");
    const [search, setSearch] = useState("");

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

    const visibleEmployees = employees
        .filter(employee =>
            employeeTab === "active"
                ? employee.is_active === true
                : employee.is_active === false
        )
        .filter(employee => {
            const searchValue = search.toLowerCase();

            return [
                employee.full_name,
                employee.fullName,
                employee.email,
                employee.department,
                employee.designation,
                employee.role
            ].some(value =>
                value?.toLowerCase().includes(searchValue)
            );
        });

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

            <Tabs
                value={employeeTab}
                onChange={(_, value) => setEmployeeTab(value)}
                sx={{ mb: 2 }}
            >
                <Tab value="active" label="Active Employees" />
                <Tab value="inactive" label="Inactive Employees" />
            </Tabs>

            <TextField
                fullWidth
                placeholder="Search employees..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                sx={{
                    mb: 3,
                    maxWidth: 450
                }}
            />

            <>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <Box
                        sx={{
                            "& > .MuiTextField-root": {
                                display: "none"
                            }
                        }}
                    >
                        <EmployeesTable
                            employees={visibleEmployees}
                            onEdit={handleEditEmployee}
                            onDelete={handleDeleteEmployee}
                        />
                    </Box>
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