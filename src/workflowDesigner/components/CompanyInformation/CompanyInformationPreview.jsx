import {
    Box,
    Typography
} from "@mui/material";

export default function CompanyInformationPreview({

    component,
    previewMode,
    previewData

}) {
    const isEmployee = previewMode === "employee";
    const isSupervisor = previewMode === "supervisor";
    const isHR = previewMode === "hr";

    const showMission =
        component?.showMission ?? true;

    const showCoreValues =
        component?.showCoreValues ?? true;

    const mission =
        component?.mission ||
        previewData.company.mission;

    const coreValues =
        component?.coreValues ||
        previewData.company.coreValues;

    return (

        <Box
            sx={{
                mb: 4,
                bgcolor: "#EEF3FB",
                borderLeft: "4px solid #2563EB",
                borderRadius: 1,
                px: 2.5,
                py: 2
            }}
        >
            <Typography
                color="primary"
                fontWeight={700}
                mb={2}
            >
                {previewMode.toUpperCase()} PREVIEW
            </Typography>

            {showMission && (

                <Typography
                    variant="body1"
                    sx={{
                        mb: 1.5,
                        lineHeight: 1.8,
                        fontSize: "0.95rem"
                    }}
                >

                    <Box
                        component="span"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        Mission:
                    </Box>{" "}

                    {mission}

                </Typography>

            )}
            {isSupervisor && (

                <Typography
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >
                    ✓ Employees will have already reviewed this company information.
                </Typography>

            )}

            {isHR && (

                <Typography
                    color="text.secondary"
                    sx={{ mt: 2 }}
                >
                    ✓ Employee and Supervisor will have already reviewed this company information.
                </Typography>

            )}

            {showCoreValues && (

                <Typography
                    variant="body1"
                    sx={{
                        lineHeight: 1.8,
                        fontSize: "0.95rem"
                    }}
                >

                    <Box
                        component="span"
                        sx={{
                            fontWeight: 700
                        }}
                    >
                        Core Values:
                    </Box>{" "}

                    {coreValues}

                </Typography>

            )}

        </Box>

    );

}