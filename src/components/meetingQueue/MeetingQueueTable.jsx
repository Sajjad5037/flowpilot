import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button,
} from "@mui/material";

function getColor(status) {
  switch (status) {
    case "Scheduled":
      return "primary";

    case "Completed":
      return "success";

    case "Rescheduled":
      return "warning";

    default:
      return "default";
  }
}

export default function MeetingQueueTable({ meetings }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell>Supervisor</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Time</TableCell>
            <TableCell>Meeting Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {meetings.map((meeting) => (
            <TableRow key={meeting.id}>
              <TableCell>{meeting.employee}</TableCell>

              <TableCell>{meeting.supervisor}</TableCell>

              <TableCell>{meeting.date}</TableCell>

              <TableCell>{meeting.time}</TableCell>

              <TableCell>{meeting.meetingType}</TableCell>

              <TableCell>
                <Chip
                  label={meeting.status}
                  color={getColor(meeting.status)}
                  size="small"
                />
              </TableCell>

              <TableCell align="center">
                <Button
                  variant="outlined"
                  size="small"
                >
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}