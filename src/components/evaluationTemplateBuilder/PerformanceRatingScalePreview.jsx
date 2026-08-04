import {
    Box,
    Paper,
    Stack,
    Typography
} from "@mui/material";

const LEVELS = [
    {
        score: 5,
        title: "Outstanding",
        description:
            "Consistently exceeds expectations."
    },
    {
        score: 4,
        title: "Exceeds Expectations",
        description:
            "Frequently exceeds expectations."
    },
    {
        score: 3,
        title: "Meets Expectations",
        description:
            "Consistently meets expectations."
    },
    {
        score: 2,
        title: "Needs Improvement",
        description:
            "Performance is inconsistent."
    },
    {
        score: 1,
        title: "Unsatisfactory",
        description:
            "Does not meet expectations."
    }
];

export default function PerformanceRatingScalePreview() {

    return (

        <Stack spacing={2}>

            <Typography
                variant="h6"
                fontWeight={700}
            >
                Performance Rating Scale
            </Typography>

            {LEVELS.map(level => (

                <Paper
                    key={level.score}
                    variant="outlined"
                    sx={{
                        p:2
                    }}
                >

                    <Stack direction="row" spacing={2}>

                        <Box
                            sx={{
                                width:40,
                                height:40,
                                borderRadius:"50%",
                                bgcolor:"#1976d2",
                                color:"#fff",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                                fontWeight:700
                            }}
                        >
                            {level.score}
                        </Box>

                        <Box>

                            <Typography
                                fontWeight={700}
                            >
                                {level.title}
                            </Typography>

                            <Typography
                                color="text.secondary"
                            >
                                {level.description}
                            </Typography>

                        </Box>

                    </Stack>

                </Paper>

            ))}

        </Stack>

    );

}