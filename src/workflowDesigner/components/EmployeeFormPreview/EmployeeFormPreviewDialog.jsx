import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Dialog,
    Box
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import EmployeeFormPreview from "./EmployeeFormPreview";

export default function EmployeeFormPreviewDialog({

    open,

    workflow,

    previewMode,

    isBuilderPreview,

    employeeResponses,

    supervisorResponses,

    hrResponses,

    setEmployeeResponses,

    setSupervisorResponses,

    setHrResponses,

    onClose

}) {

    return (

        <Dialog
            fullScreen
            open={open}
            onClose={onClose}
        >

            <AppBar
                position="sticky"
                color="inherit"
                elevation={1}
            >

                <Toolbar>

                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            fontWeight: 700
                        }}
                    >
                        Employee Evaluation Preview
                    </Typography>

                    <IconButton
                        edge="end"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>

                </Toolbar>

            </AppBar>

            <Box
                sx={{
                    bgcolor: "#F5F7FB",
                    minHeight: "100vh",
                    p: 4
                }}
            >

                <Box
                    sx={{
                        maxWidth: 900,
                        mx: "auto",
                        bgcolor: "#FFFFFF",
                        borderRadius: 3,
                        p: 5,
                        boxShadow: 2
                    }}
                >

                    <EmployeeFormPreview
                        workflow={workflow}
                        previewMode={previewMode}
                        isBuilderPreview={isBuilderPreview}
                        employeeResponses={employeeResponses}
                        supervisorResponses={supervisorResponses}
                        hrResponses={hrResponses}
                        setEmployeeResponses={setEmployeeResponses}
                        setSupervisorResponses={setSupervisorResponses}
                        setHrResponses={setHrResponses}
                    />

                </Box>

            </Box>

        </Dialog>

    );

}