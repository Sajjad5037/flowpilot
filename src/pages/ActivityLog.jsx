import { useEffect, useState } from "react";

import {
    Box,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

import { getAll } from "../services/evaluationActivityLogService";

const workflowLabels = {
    employee_evaluation: "Employee Evaluation",
    goal_kpi_setting: "Goal & KPI Settings"
};

const roleLabels = {
    employee: "Employee",
    supervisor: "Supervisor",
    hr: "HR"
};

const actionLabels = {
    submitted: "Submitted"
};

export default function ActivityLog() {

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedActivity, setSelectedActivity] = useState(null);
    const [search, setSearch] = useState("");

    useEffect(() => {

        getAll()
            .then(setActivities)
            .catch(() => setError("Unable to load activity log."))
            .finally(() => setLoading(false));

    }, []);

    const filteredActivities = activities.filter(activity => {

        const searchValue = search.toLowerCase();
        const workflow =
            workflowLabels[activity.workflow_type] || activity.workflow_type;

        return [
            activity.employee_name,
            activity.actor_name,
            workflow,
            activity.workflow_type
        ].some(value =>
            String(value || "").toLowerCase().includes(searchValue)
        );

    });

    return (

        <Box p={4}>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={1}
            >
                Activity Log
            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >
                Evaluation assignment activity history.
            </Typography>

            {loading ? (

                <CircularProgress />

            ) : error ? (

                <Typography color="error">
                    {error}
                </Typography>

            ) : activities.length === 0 ? (

                <Typography color="text.secondary">
                    No activity recorded yet.
                </Typography>

            ) : filteredActivities.length === 0 ? (

                <Typography color="text.secondary">
                    No activities found.
                </Typography>

            ) : (

                <>

                    <TextField
                        fullWidth
                        placeholder="Search activity..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        sx={{
                            mb: 3,
                            maxWidth: 450
                        }}
                    />

                <TableContainer component={Paper}>

                    <Table>

                        <TableHead>

                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Employee</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Workflow</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>

                        </TableHead>

                        <TableBody>

                            {filteredActivities.map(activity => (

                                <TableRow key={activity.id}>
                                    <TableCell>
                                        {activity.created_at
                                            ? new Date(activity.created_at).toLocaleString()
                                            : "-"}
                                    </TableCell>
                                    <TableCell>
                                        {activity.employee_name || activity.employee_id}
                                    </TableCell>
                                    <TableCell>
                                        {roleLabels[activity.actor_role] || activity.actor_role}
                                    </TableCell>
                                    <TableCell>
                                        {workflowLabels[activity.workflow_type] || activity.workflow_type}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            onClick={() => setSelectedActivity(activity)}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </TableContainer>

                </>

            )}

            <Dialog
                open={selectedActivity !== null}
                onClose={() => setSelectedActivity(null)}
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>Activity Details</DialogTitle>

                <DialogContent dividers>

                    {selectedActivity && (

                        <Box sx={{ display: "grid", gap: 1.5 }}>

                            <Typography>
                                <strong>Employee:</strong>{" "}
                                {selectedActivity.employee_name || selectedActivity.employee_id}
                            </Typography>

                            <Typography>
                                <strong>Actor:</strong>{" "}
                                {selectedActivity.actor_name || selectedActivity.actor_id}
                            </Typography>

                            <Typography>
                                <strong>Workflow:</strong>{" "}
                                {workflowLabels[selectedActivity.workflow_type] || selectedActivity.workflow_type}
                            </Typography>

                            <Typography>
                                <strong>Stage:</strong>{" "}
                                {selectedActivity.stage || "-"}
                            </Typography>

                            <Typography>
                                <strong>Action:</strong>{" "}
                                {actionLabels[selectedActivity.action] || selectedActivity.action}
                            </Typography>

                            <Typography>
                                <strong>Date:</strong>{" "}
                                {selectedActivity.created_at
                                    ? new Date(selectedActivity.created_at).toLocaleString()
                                    : "-"}
                            </Typography>

                            <Box>
                                <Typography fontWeight={700}>
                                    Details
                                </Typography>

                                {selectedActivity.details &&
                                Object.keys(selectedActivity.details).length > 0 ? (
                                    Object.entries(selectedActivity.details).map(([key, value]) => (
                                        <Typography key={key}>
                                            {key}: {String(value)}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography color="text.secondary">
                                        No additional details available.
                                    </Typography>
                                )}
                            </Box>

                        </Box>

                    )}

                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setSelectedActivity(null)}>
                        Close
                    </Button>
                </DialogActions>

            </Dialog>

        </Box>

    );

}
