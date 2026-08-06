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

    employees,
    onEdit,
    onDelete

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

                            <TableCell>Role</TableCell>

                            <TableCell>Department</TableCell>
                            
                            <TableCell>Designation</TableCell>

                            <TableCell>Slack ID</TableCell>

                            <TableCell>Email</TableCell>
                            
                            <TableCell align="center">
                                Actions
                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {employees.map((employee) => (

                            <TableRow key={employee.id}>

                                <TableCell>
                                    {employee.full_name ?? employee.fullName}
                                </TableCell>

                                <TableCell>
                                    {employee.role}
                                </TableCell>

                                <TableCell>
                                    {employee.department}
                                </TableCell>

                                <TableCell>
                                    {employee.designation}
                                </TableCell>

                                <TableCell>
                                    {employee.slack_id ?? employee.slackId}
                                </TableCell>

                                <TableCell>
                                    {employee.email}
                                </TableCell>

                                <TableCell align="center">

                                    <IconButton
                                        color="primary"
                                        onClick={() => onEdit(employee)}
                                    >

                                        <EditIcon />

                                    </IconButton>

                                    <IconButton
                                        color="error"
                                        onClick={() => onDelete(employee.id)}
                                    >

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