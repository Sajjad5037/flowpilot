import {
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function getColor(status) {
  switch (status) {
    case "Completed":
      return "success";

    case "Awaiting Response":
      return "warning";

    case "Overdue":
      return "error";

    default:
      return "default";
  }
}

export default function NotificationTable({ notifications }) {
  console.log("Notifications prop:", notifications);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Recipient</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Evaluation</TableCell>
            <TableCell>Link Sent</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {notifications.map((notification) => (
            <TableRow key={notification.id}>
              <TableCell>{notification.recipient}</TableCell>

              <TableCell>{notification.role}</TableCell>

              <TableCell>{notification.evaluation}</TableCell>

              <TableCell>{notification.linkSent}</TableCell>

              <TableCell>
                <Chip
                  label={notification.status}
                  color={getColor(notification.status)}
                  size="small"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}