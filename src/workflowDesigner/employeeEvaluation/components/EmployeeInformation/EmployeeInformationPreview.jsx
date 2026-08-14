import {
    Box,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

export default function EmployeeInformationPreview({
    component,
    previewMode = "employee",
}) {

    const fields = component?.fields || {
        employeeName: true,
        supervisor: true,
        department: true,
        reviewCycle: true,
        employmentType: true,
        dueDate: true,
    };

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 2,
                px: 3,
                py: 3,
            }}
        >

            {/* Employee Name / Supervisor */}

            {(fields.employeeName || fields.supervisor) && (

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={{
                        xs: 3,
                        md: 8,
                    }}
                >

                    {fields.employeeName && (

                        <Box sx={{ flex: 1 }}>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: "#94A3B8",
                                    fontWeight: 500,
                                    letterSpacing: 0.5,
                                    mb: 0.5,
                                }}
                            >
                                EMPLOYEE NAME
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 24,
                                    fontWeight: 700,
                                    color: "#0F172A",
                                }}
                            >
                                Employee Name
                            </Typography>

                        </Box>

                    )}

                    {fields.supervisor && (

                        <Box sx={{ flex: 1 }}>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: "#94A3B8",
                                    fontWeight: 500,
                                    letterSpacing: 0.5,
                                    mb: 0.5,
                                }}
                            >
                                SUPERVISOR
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 24,
                                    fontWeight: 700,
                                    color: "#0F172A",
                                }}
                            >
                                Supervisor Name
                            </Typography>

                        </Box>

                    )}

                </Stack>

            )}

            {(fields.employeeName || fields.supervisor) &&
                (fields.department ||
                    fields.reviewCycle ||
                    fields.employmentType ||
                    fields.dueDate) && (

                    <Divider sx={{ my: 2.5 }} />

                )}

            {/* Additional Information */}

            {(fields.department ||
                fields.reviewCycle ||
                fields.employmentType ||
                fields.dueDate) && (

                <Stack
                    direction={{
                        xs: "column",
                        sm: "row",
                    }}
                    spacing={{
                        xs: 2,
                        sm: 3,
                    }}
                >

                    {fields.department && (

                        <InformationItem
                            label="Department"
                            value="Department"
                        />

                    )}

                    {fields.reviewCycle && (

                        <InformationItem
                            label="Review Cycle"
                            value="Q2 2026 (Apr – Jun)"
                        />

                    )}

                    {fields.employmentType && (

                        <InformationItem
                            label="Employment Type"
                            value="Employee"
                        />

                    )}

                    {fields.dueDate && (

                        <Box sx={{ flex: 1 }}>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    color: "#94A3B8",
                                    mb: 0.5,
                                }}
                            >
                                Due Date
                            </Typography>

                            <Box
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    px: 1.5,
                                    py: 0.5,
                                    borderRadius: 10,
                                    bgcolor: "#FEF3C7",
                                    color: "#92400E",
                                    fontSize: 13,
                                    fontWeight: 600,
                                }}
                            >
                                July 15, 2026
                            </Box>

                        </Box>

                    )}

                </Stack>

            )}

            

        </Box>
    );
}


function InformationItem({
    label,
    value,
}) {

    return (

        <Box sx={{ flex: 1 }}>

            <Typography
                sx={{
                    fontSize: 13,
                    color: "#94A3B8",
                    mb: 0.5,
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#0F172A",
                }}
            >
                {value}
            </Typography>

        </Box>

    );
}