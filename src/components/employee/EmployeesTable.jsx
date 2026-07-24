import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EmployeesTable({
    employees
}) {

    return (

        <>

            <TextField
                fullWidth
                placeholder="Search employees..."
                sx={{ mb: 3 }}
            />

            <TableContainer component={Paper}>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Name</TableCell>

                            <TableCell>Email</TableCell>

                            <TableCell>Slack ID</TableCell>

                            <TableCell>Department</TableCell>

                            <TableCell>Role</TableCell>

                            <TableCell>Template</TableCell>

                            <TableCell align="center">
                                Actions
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {employees.map(employee => (

                            <TableRow key={employee.id}>

                                <TableCell>
                                    {employee.fullName}
                                </TableCell>

                                <TableCell>
                                    {employee.email}
                                </TableCell>

                                <TableCell>
                                    {employee.slackId}
                                </TableCell>

                                <TableCell>
                                    {employee.department}
                                </TableCell>

                                <TableCell>
                                    {employee.jobTitle}
                                </TableCell>

                                <TableCell>
                                    {employee.template}
                                </TableCell>

                                <TableCell align="center">

                                    <IconButton>

                                        <EditIcon />

                                    </IconButton>

                                    <IconButton color="error">

                                        <DeleteIcon />

                                    </IconButton>

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </TableContainer>

        </>

    );

}