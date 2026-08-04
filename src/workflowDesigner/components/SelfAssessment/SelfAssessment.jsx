import {
    Paper,
    Typography,
    Divider,
    Box
} from "@mui/material";

export default function SelfAssessment({

    component

}) {

    const questions = component.questions || [];

    return (

        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid #E5E7EB",
                borderRadius: 3
            }}
        >

            <Typography
                variant="h6"
                fontWeight={700}
            >
                {component.title || "Self Assessment"}
            </Typography>

            <Typography
                variant="body2"
                color="text.secondary"
                mb={2}
            >
                {component.description ||
                    "Employees answer configurable self-assessment questions."}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography
                variant="subtitle2"
                gutterBottom
            >
                Questions
            </Typography>

            {questions.length === 0 ? (

                <Typography color="text.secondary">

                    No questions added yet.

                </Typography>

            ) : (

                questions.map((question, index) => (

                    <Box
                        key={question.id}
                        sx={{ mb: 1 }}
                    >

                        <Typography>

                            {index + 1}. {question.text}

                        </Typography>

                    </Box>

                ))

            )}

        </Paper>

    );

}