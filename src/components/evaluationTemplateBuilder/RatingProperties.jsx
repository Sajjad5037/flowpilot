import {
    Divider,
    TextField,
    Typography
} from "@mui/material";

export default function RatingProperties({
    question,
    onQuestionChange
}) {

    return (
        <>
            <Divider sx={{ my: 2 }} />

            <Typography
                fontWeight={600}
                gutterBottom
            >
                Rating Settings
            </Typography>

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Minimum Rating
            </Typography>

            <TextField
                fullWidth
                type="number"
                value={question.min ?? 1}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        min: Number(event.target.value)
                    })
                }
                sx={{ mb: 2 }}
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Maximum Rating
            </Typography>

            <TextField
                fullWidth
                type="number"
                value={question.max ?? 5}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        max: Number(event.target.value)
                    })
                }
                sx={{ mb: 2 }}
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Low Label
            </Typography>

            <TextField
                fullWidth
                value={question.lowLabel || ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        lowLabel: event.target.value
                    })
                }
                sx={{ mb: 2 }}
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                High Label
            </Typography>

            <TextField
                fullWidth
                value={question.highLabel || ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        highLabel: event.target.value
                    })
                }
            />
        </>
    );
}