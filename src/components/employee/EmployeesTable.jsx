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

            <TableContainer
                component={Paper}
                sx={{
                    overflowX: "auto",
                    border: "1px solid #E2E8F0",
                    borderRadius: 2,
                    boxShadow: "0 4px 14px rgba(15, 23, 42, 0.04)"
                }}
            >

                <Table
                    size="small"
                    sx={{
                        minWidth: 820,
                        "& .MuiTableCell-root": {
                            borderBottom: "1px solid #E2E8F0",
                            px: 2,
                            py: 1.5
                        },
                        "& .MuiTableRow-root:last-child .MuiTableCell-root": {
                            borderBottom: 0
                        }
                    }}
                >

                    <TableHead>

                        <TableRow
                            sx={{
                                bgcolor: "#F8FAFC",
                                "& .MuiTableCell-root": {
                                    color: "#475569",
                                    fontSize: 12,
                                    fontWeight: 700,
                                    letterSpacing: 0.4,
                                    textTransform: "uppercase",
                                    whiteSpace: "nowrap"
                                }
                            }}
                        >

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

                            <TableRow
                                key={employee.id}
                                hover
                                sx={{
                                    transition: "background-color 0.15s ease",
                                    "&:hover": {
                                        bgcolor: "#F8FAFC"
                                    }
                                }}
                            >

                                <TableCell sx={{ fontWeight: 600, color: "#0F172A" }}>
                                    {employee.full_name ?? employee.fullName}
                                </TableCell>

                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    {employee.role}
                                </TableCell>

                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    {employee.department}
                                </TableCell>

                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    {employee.designation}
                                </TableCell>

                                <TableCell sx={{ whiteSpace: "nowrap" }}>
                                    {employee.slack_id ?? employee.slackId}
                                </TableCell>

                                <TableCell
                                    title={employee.email}
                                    sx={{
                                        maxWidth: 240,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap"
                                    }}
                                >
                                    {employee.email}
                                </TableCell>

                                <TableCell
                                    align="center"
                                    sx={{ whiteSpace: "nowrap" }}
                                >

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