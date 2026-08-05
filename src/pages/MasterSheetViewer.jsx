import { useEffect, useState } from "react";
import EmployeeFormPreview
from "../workflowDesigner/components/EmployeeFormPreview/EmployeeFormPreview";

import {
    Box,
    CircularProgress,
    Typography
} from "@mui/material";

import {
    getMasterSheet
} from "../services/masterSheetService";

export default function MasterSheetViewer({

    assignmentId

}) {

    
    const [loading, setLoading] = useState(true);

    const [masterSheet, setMasterSheet] = useState(null);

    useEffect(() => {

        loadMasterSheet();

    }, []);

    async function loadMasterSheet() {

        try {

            const data = await getMasterSheet(
                assignmentId
            );

            console.log("Master Sheet:");

            console.log(data);

            setMasterSheet(data);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Box
                display="flex"
                justifyContent="center"
                mt={8}
            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <Box
            sx={{
                px: 6,
                py: 4,
                maxWidth: 1400,
                mx: "auto"
            }}
        >

            <Typography
                variant="h4"
                fontWeight={700}
                mb={3}
            >
                Master Sheet Viewer
            </Typography>

            <EmployeeFormPreview
                workflow={masterSheet.workflow_json}
                previewMode="hr"
                employeeResponses={masterSheet.employee_responses}
                supervisorResponses={masterSheet.supervisor_responses}
                hrResponses={masterSheet.hr_responses}
            />

        </Box>

    );

}