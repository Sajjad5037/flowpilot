import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SupervisorsTable({ supervisors }) {
  return (
    <>
      <TextField
        fullWidth
        placeholder="Search supervisors..."
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
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {supervisors.map((supervisor) => (
              <TableRow key={supervisor.id}>
                <TableCell>{supervisor.fullName}</TableCell>
                <TableCell>{supervisor.email}</TableCell>
                <TableCell>{supervisor.slackId}</TableCell>
                <TableCell>{supervisor.department}</TableCell>
                <TableCell>{supervisor.jobTitle}</TableCell>

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