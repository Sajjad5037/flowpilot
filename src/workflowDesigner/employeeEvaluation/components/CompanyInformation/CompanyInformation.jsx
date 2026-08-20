import {
    Box,
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

export default function CompanyInformation({
    component,
}) {

    const missionStatement =
        component?.settings?.missionStatement ||
        "We're building the future of wealth-tech by making advanced trading tools accessible to every investor. Our mission is to combine sophistication with simplicity in a trading platform that delivers verified, high-performance results without requiring Wall Street expertise.";

    const coreValues =
        component?.settings?.coreValues?.length
            ? component.settings.coreValues
            : [
                {
                    name: "Transparency",
                    description:
                        "Open, honest, and factual communication.",
                },
                {
                    name: "Results",
                    description:
                        "Doing whatever it takes to achieve outcomes.",
                },
                {
                    name: "Growth",
                    description:
                        "Proactively finding long-term solutions.",
                },
                {
                    name: "Integrity",
                    description:
                        "Doing what is right even when no one is watching.",
                },
            ];

    const ratingGuide =
        component?.settings?.ratingGuide?.length
            ? component.settings.ratingGuide
            : [
                {
                    rating: "1. Poor",
                    description:
                        "Substantially below required targets.",
                },
                {
                    rating: "2. Below Expectation",
                    description:
                        "Inconsistent completion.",
                },
                {
                    rating: "3. Meets Expectation",
                    description:
                        "Consistently hit targets.",
                },
                {
                    rating: "4. Above Expectation",
                    description:
                        "Exceeded targets.",
                },
                {
                    rating: "5. Fully Sent",
                    description:
                        "Exceptional impact & high standard.",
                },
            ];

    return (
        <Box
            sx={{
                width: "100%",
                py: 0,
            }}
        >

            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(3, minmax(0, 1fr))",
                    },
                    gap: 3,
                    alignItems: "stretch",
                }}
            >

                {/* ================================ */}
                {/* MISSION STATEMENT                 */}
                {/* ================================ */}

                    <Card
                        elevation={0}
                        sx={{
                            width: "100%",
                            height: "100%",
                            minWidth: 0,
                            minHeight: 235,

                            display: "flex",

                            backgroundColor: "#FFFFFF",

                            border:
                                "1px solid #D9E2EC",

                            borderRadius: "12px",

                            boxShadow:
                                "0 2px 8px rgba(15, 23, 42, 0.06)",
                        }}
                    >

                        <CardContent
                            sx={{
                                width: "100%",
                                p: 2.5,

                                "&:last-child": {
                                    pb: 2.5,
                                },
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#7C3AED",
                                    mb: 1.25,
                                }}
                            >
                                Mission Statement
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: 13,
                                    lineHeight: 1.7,
                                    color: "#334155",
                                }}
                            >
                                {missionStatement}
                            </Typography>

                        </CardContent>

                    </Card>


                {/* ================================ */}
                {/* CORE VALUES                       */}
                {/* ================================ */}

                    <Card
                        elevation={0}
                        sx={{
                            width: "100%",
                            height: "100%",
                            minWidth: 0,
                            minHeight: 235,

                            display: "flex",

                            backgroundColor: "#FFFFFF",

                            border:
                                "1px solid #D9E2EC",

                            borderRadius: "12px",

                            boxShadow:
                                "0 2px 8px rgba(15, 23, 42, 0.06)",
                        }}
                    >

                        <CardContent
                            sx={{
                                width: "100%",
                                p: 2.5,

                                "&:last-child": {
                                    pb: 2.5,
                                },
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#7C3AED",
                                    mb: 1.25,
                                }}
                            >
                                Core Values
                            </Typography>

                            <Stack spacing={0.8}>

                                {coreValues.map(
                                    (value, index) => (

                                        <Typography
                                            key={index}
                                            sx={{
                                                fontSize: 13,
                                                lineHeight: 1.55,
                                                color: "#334155",
                                            }}
                                        >

                                            <Box
                                                component="span"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: "#334155",
                                                }}
                                            >
                                                {value.name}:
                                            </Box>{" "}

                                            {value.description}

                                        </Typography>

                                    )
                                )}

                            </Stack>

                        </CardContent>

                    </Card>


                {/* ================================ */}
                {/* SELF-RATING GUIDE                 */}
                {/* ================================ */}

                    <Card
                        elevation={0}
                        sx={{
                            width: "100%",
                            height: "100%",
                            minWidth: 0,
                            minHeight: 235,

                            display: "flex",

                            backgroundColor: "#FFFFFF",

                            border:
                                "1px solid #D9E2EC",

                            borderRadius: "12px",

                            boxShadow:
                                "0 2px 8px rgba(15, 23, 42, 0.06)",
                        }}
                    >

                        <CardContent
                            sx={{
                                width: "100%",
                                p: 2.5,

                                "&:last-child": {
                                    pb: 2.5,
                                },
                            }}
                        >

                            <Typography
                                sx={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#7C3AED",
                                    mb: 1.25,
                                }}
                            >
                                Self-Rating Guide
                            </Typography>

                            <Stack spacing={0.65}>

                                {ratingGuide.map(
                                    (item, index) => (

                                        <Typography
                                            key={index}
                                            sx={{
                                                fontSize: 12.5,
                                                lineHeight: 1.5,
                                                color: "#334155",
                                            }}
                                        >

                                            <Box
                                                component="span"
                                                sx={{
                                                    fontWeight: 700,
                                                    color: "#334155",
                                                }}
                                            >
                                                {item.rating}:
                                            </Box>{" "}

                                            {item.description}

                                        </Typography>

                                    )
                                )}

                            </Stack>

                        </CardContent>

                    </Card>

            </Box>

        </Box>
    );
}