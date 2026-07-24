import {
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function LongTextProperties({
    question,
    onQuestionChange
}) {

    return (

        <Stack spacing={2} mt={2}>

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Placeholder
            </Typography>

            <TextField
                fullWidth
                value={question.placeholder || ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        placeholder: event.target.value
                    })
                }
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Default Value
            </Typography>

            <TextField
                fullWidth
                value={question.defaultValue || ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        defaultValue: event.target.value
                    })
                }
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Rows
            </Typography>

            <TextField
                fullWidth
                type="number"
                value={question.rows || 4}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        rows: Number(event.target.value)
                    })
                }
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Maximum Length
            </Typography>

            <TextField
                fullWidth
                type="number"
                value={question.maxLength || ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        maxLength: Number(event.target.value)
                    })
                }
            />

        </Stack>

    );

}