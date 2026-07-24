import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";

import SupervisorsTable from "../../components/supervisor/SupervisorsTable";
import { getSupervisors } from "../../services/supervisorService";
import AddSupervisorDialog from "../../components/supervisor/AddSupervisorDialog";

export default function Supervisors() {
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddDialog, setOpenAddDialog] = useState(false);

  useEffect(() => {
    loadSupervisors();
  }, []);

  async function loadSupervisors() {
    setLoading(true);

    const data = await getSupervisors();

    setSupervisors(data);

    setLoading(false);
  }

  function handleAddSupervisor() {
  setOpenAddDialog(true);
}

function handleCloseDialog() {
  setOpenAddDialog(false);
}

function handleSupervisorSaved(supervisor) {
  setSupervisors((prev) => [...prev, supervisor]);
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
          Supervisors
        </Typography>

        <Button
          variant="contained"
          onClick={handleAddSupervisor}
        >
          + Add Supervisor
        </Button>
      </Stack>

      <>
        {loading ? (
            <CircularProgress />
        ) : (
            <SupervisorsTable supervisors={supervisors} />
        )}

        <AddSupervisorDialog
            open={openAddDialog}
            onClose={handleCloseDialog}
            onSaved={handleSupervisorSaved}
        />
        </>
    </Box>
  );
}