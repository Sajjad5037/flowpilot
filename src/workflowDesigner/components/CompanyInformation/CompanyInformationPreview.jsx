import {
    Box,
    Typography
} from "@mui/material";
import { useLocation } from "react-router-dom";

export default function CompanyInformationPreview({

    component,
    previewMode,
    previewData

}) {
    const location = useLocation();
    const isActualEmployeeEvaluation =
        location.pathname.startsWith("/evaluation/");

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

    const coreValueItems = Array.isArray(coreValues)
        ? coreValues.map((coreValue) => ({
            name: coreValue?.name || "",
            description: coreValue?.description || "",
        }))
        : String(coreValues)
            .split(/\s*\|\s*|\r?\n/)
            .map((value) => {
                const separatorIndex = value.indexOf(":");

                if (separatorIndex >= 0) {
                    return {
                        name: value.slice(0, separatorIndex).trim(),
                        description: value.slice(separatorIndex + 1).trim(),
                    };
                }

                return {
                    name: value.trim(),
                    description: "",
                };
            })
            .filter((coreValue) => coreValue.name);

    return (

        <Box
            sx={{
                mb: 4,
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    md: showMission && showCoreValues
                        ? "repeat(2, minmax(0, 1fr))"
                        : "1fr",
                },
                gap: 3,
            }}
        >
            {!isActualEmployeeEvaluation && (
                <Typography
                    sx={{
                        gridColumn: "1 / -1",
                        color: "#7C3AED",
                        fontWeight: 700,
                    }}
                >
                    {previewMode.toUpperCase()} PREVIEW
                </Typography>
            )}

            {showMission && (

                <Box
                    sx={{
                        bgcolor: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: 2,
                        p: {
                            xs: 2.5,
                            sm: 3,
                        },
                    }}
                >
                    <Typography
                        component="h2"
                        sx={{
                            color: "#7C00E6",
                            fontSize: 17,
                            fontWeight: 700,
                            lineHeight: 1.3,
                            mb: 1.5,
                        }}
                    >
                        Mission Statement
                    </Typography>

                    <Typography
                        sx={{
                            color: "#334155",
                            fontSize: 14,
                            lineHeight: 1.65,
                            whiteSpace: "pre-line",
                        }}
                    >
                        {mission}
                    </Typography>

                </Box>

            )}
            {showCoreValues && (

                <Box
                    sx={{
                        bgcolor: "#FFFFFF",
                        border: "1px solid #E2E8F0",
                        borderRadius: 2,
                        p: {
                            xs: 2.5,
                            sm: 3,
                        },
                    }}
                >
                    <Typography
                        component="h2"
                        sx={{
                            color: "#7C00E6",
                            fontSize: 17,
                            fontWeight: 700,
                            lineHeight: 1.3,
                            mb: 1.5,
                        }}
                    >
                        Core Values
                    </Typography>

                    <Box
                        sx={{
                            display: "grid",
                            gap: 0.75,
                        }}
                    >
                        {coreValueItems.map((coreValue, index) => (
                            <Typography
                                key={`${coreValue.name}-${index}`}
                                sx={{
                                    color: "#334155",
                                    fontSize: 14,
                                    lineHeight: 1.5,
                                }}
                            >
                                <Box
                                    component="span"
                                    sx={{
                                        color: "#0F172A",
                                        fontWeight: 700,
                                    }}
                                >
                                    {coreValue.name}
                                    {coreValue.description ? ":" : ""}
                                </Box>
                                {coreValue.description && ` ${coreValue.description}`}
                            </Typography>
                        ))}
                    </Box>

                </Box>

            )}

            {isSupervisor && (

                <Typography
                    color="text.secondary"
                    sx={{ gridColumn: "1 / -1" }}
                >
                    ✓ Employees will have already reviewed this company information.
                </Typography>

            )}

            {isHR && (

                <Typography
                    color="text.secondary"
                    sx={{ gridColumn: "1 / -1" }}
                >
                    ✓ Employee and Supervisor will have already reviewed this company information.
                </Typography>

            )}

        </Box>

    );

}