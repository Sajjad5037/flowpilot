import {
    Box,
    Divider,
    Stack,
    Typography,
} from "@mui/material";

export default function EmployeeInformation() {

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: 2,
                px: 3,
                py: 2.5,
            }}
        >

            {/* Employee and Supervisor */}

            <Stack
                direction={{
                    xs: "column",
                    md: "row",
                }}
                spacing={{
                    xs: 2,
                    md: 8,
                }}
            >

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

            </Stack>

            <Divider sx={{ my: 2 }} />

            {/* Additional Information */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row",
                }}
                spacing={{
                    xs: 2,
                    sm: 4,
                }}
            >

                <InformationItem
                    label="Department"
                    value="Department"
                />

                <InformationItem
                    label="Review Cycle"
                    value="Review Cycle"
                />

                <InformationItem
                    label="Employment Type"
                    value="Employment Type"
                />

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
                        Due Date
                    </Box>

                </Box>

            </Stack>

        </Box>
    );
}


function InformationItem({ label, value }) {

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