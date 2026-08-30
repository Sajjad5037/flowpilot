import {
    Paper,
    Typography,
    Divider,
    Box
} from "@mui/material";

export default function CompanyInformation({

    component

}) {

    const showMission =
        component?.showMission ?? true;

    const showCoreValues =
        component?.showCoreValues ?? true;

    const mission =
        component?.mission ||
        "Building the future of wealth-tech by combining sophistication with simplicity to deliver verified, high-performance trading results.";

    const coreValues =
        component?.coreValues ||
        "Transparency | Results | Growth | Integrity";

    const coreValueItems = Array.isArray(coreValues)
        ? coreValues.map(coreValue => ({
            name: coreValue?.name || "",
            description: coreValue?.description || ""
        }))
        : String(coreValues)
            .split(/\s*\|\s*|\r?\n/)
            .map(name => ({
                name: name.trim(),
                description: ""
            }))
            .filter(coreValue => coreValue.name);

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                mb: 3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
                gutterBottom
            >
                Company Information
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={3}
            >
                Displays the company mission and core values to employees before they begin the evaluation.
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Box
                sx={{
                    py: 1
                }}
            >

                {showMission && (

                    <>

                        <Typography
                            fontWeight={700}
                            mb={0.5}
                        >
                            Mission:
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                mb: 2,
                                lineHeight: 1.8
                            }}
                        >
                            {mission}
                        </Typography>

                    </>

                )}

                {showCoreValues && (

                    <>

                        <Typography
                            fontWeight={700}
                            mb={0.5}
                        >
                            Core Values:
                        </Typography>

                        <Box
                            sx={{
                                display: "grid",
                                gap: 0.75
                            }}
                        >

                            {coreValueItems.map((coreValue, index) => (

                                <Typography
                                    key={`${coreValue.name}-${index}`}
                                    variant="body1"
                                    sx={{ lineHeight: 1.8 }}
                                >
                                    <Box
                                        component="span"
                                        sx={{ fontWeight: 700 }}
                                    >
                                        {coreValue.name}:
                                    </Box>
                                    {coreValue.description && (
                                        <> {coreValue.description}</>
                                    )}
                                </Typography>

                            ))}

                        </Box>

                    </>

                )}

            </Box>

        </Paper>

    );

}