import {
    Box,
    Link,
    Typography,
} from "@mui/material";

export default function SelfAssessment({
    component,
}) {

    const settings = component?.settings || {};

    const title =
        settings.title ||
        "Instructions for Employee Self-Assessment";

    const instructions =
        settings.instructions ||
        "Please complete all highlighted fields below. Evaluate your quarterly goals, outline any extra projects completed, provide feedback for moving forward, and propose your initial Q3 goal ideas.";

    const tutorialText =
        settings.tutorialText ||
        "Employee Eval Prep Tutorial";

    const tutorialUrl =
        settings.tutorialUrl || "#";

    const note =
        settings.note ||
        "Ratings and inputs provided here will be reviewed and discussed during your 1:1 evaluation meeting with your supervisor.";


    return (

        <Box
            sx={{
                width: "100%",
                bgcolor: "#FFFFFF",
                px: 2.5,
                py: 2,
            }}
        >

            <Typography
                sx={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: "#1E3A8A",
                    mb: 1,
                }}
            >
                {title}
            </Typography>


            <Typography
                sx={{
                    fontSize: 13,
                    color: "#334155",
                    lineHeight: 1.6,
                    mb: 2,
                }}
            >
                {instructions}
            </Typography>


            <Typography
                sx={{
                    fontSize: 13,
                    color: "#334155",
                    lineHeight: 1.6,
                    mb: 2,
                }}
            >
                Click{" "}

                <Link
                    href={tutorialUrl}
                    underline="always"
                >
                    here
                </Link>

                {" "}for a tutorial on how to complete this evaluation copy –{" "}

                <Link
                    href={tutorialUrl}
                    underline="always"
                    sx={{
                        fontWeight: 600,
                    }}
                >
                    {tutorialText}
                </Link>

            </Typography>


            <Typography
                sx={{
                    fontSize: 13,
                    color: "#475569",
                    lineHeight: 1.6,
                }}
            >
                <strong>Note:</strong>{" "}
                {note}
            </Typography>

        </Box>

    );

}