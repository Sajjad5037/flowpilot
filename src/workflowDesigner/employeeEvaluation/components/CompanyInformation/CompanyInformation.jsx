import {
    Card,
    CardContent,
    Grid,
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

        <Grid
            container
            spacing={2}
        >

            {/* ================================= */}
            {/* MISSION STATEMENT                 */}
            {/* ================================= */}

            <Grid
                item
                xs={12}
                md={4}
            >

                <Card
                    elevation={0}
                    sx={{
                        height: "100%",
                        border:
                            "1px solid #D9E2EC",
                        borderRadius: 2.5,
                        bgcolor: "#FFFFFF",
                    }}
                >

                    <CardContent
                        sx={{
                            p: 2,
                            "&:last-child": {
                                pb: 2,
                            },
                        }}
                    >

                        <Typography
                            fontSize={14}
                            fontWeight={700}
                            color="#7C3AED"
                            mb={1}
                        >
                            Mission Statement
                        </Typography>


                        <Typography
                            variant="body2"
                            color="#334155"
                            lineHeight={1.65}
                            fontSize={13}
                        >
                            {missionStatement}
                        </Typography>

                    </CardContent>

                </Card>

            </Grid>


            {/* ================================= */}
            {/* CORE VALUES                       */}
            {/* ================================= */}

            <Grid
                item
                xs={12}
                md={4}
            >

                <Card
                    elevation={0}
                    sx={{
                        height: "100%",
                        border:
                            "1px solid #D9E2EC",
                        borderRadius: 2.5,
                        bgcolor: "#FFFFFF",
                    }}
                >

                    <CardContent
                        sx={{
                            p: 2,
                            "&:last-child": {
                                pb: 2,
                            },
                        }}
                    >

                        <Typography
                            fontSize={14}
                            fontWeight={700}
                            color="#7C3AED"
                            mb={1}
                        >
                            Core Values
                        </Typography>


                        <Stack spacing={0.7}>

                            {coreValues.map(
                                (value, index) => (

                                    <Typography
                                        key={index}
                                        variant="body2"
                                        color="#334155"
                                        lineHeight={1.5}
                                        fontSize={13}
                                    >

                                        <strong>
                                            {value.name}:
                                        </strong>{" "}

                                        {value.description}

                                    </Typography>

                                )
                            )}

                        </Stack>

                    </CardContent>

                </Card>

            </Grid>


            {/* ================================= */}
            {/* SELF-RATING GUIDE                 */}
            {/* ================================= */}

            <Grid
                item
                xs={12}
                md={4}
            >

                <Card
                    elevation={0}
                    sx={{
                        height: "100%",
                        border:
                            "1px solid #D9E2EC",
                        borderRadius: 2.5,
                        bgcolor: "#FFFFFF",
                    }}
                >

                    <CardContent
                        sx={{
                            p: 2,
                            "&:last-child": {
                                pb: 2,
                            },
                        }}
                    >

                        <Typography
                            fontSize={14}
                            fontWeight={700}
                            color="#7C3AED"
                            mb={1}
                        >
                            Self-Rating Guide
                        </Typography>


                        <Stack spacing={0.5}>

                            {ratingGuide.map(
                                (item, index) => (

                                    <Typography
                                        key={index}
                                        variant="body2"
                                        color="#334155"
                                        lineHeight={1.45}
                                        fontSize={12.5}
                                    >

                                        <strong>
                                            {item.rating}:
                                        </strong>{" "}

                                        {item.description}

                                    </Typography>

                                )
                            )}

                        </Stack>

                    </CardContent>

                </Card>

            </Grid>

        </Grid>

    );

}