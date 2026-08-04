import {
    Stack,
    TextField,
    Typography,
    MenuItem
} from "@mui/material";

export default function HeadingProperties({
    question,
    onQuestionChange
}) {

    return (

        <Stack spacing={2} mt={2}>

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Heading Text
            </Typography>

            <TextField
                fullWidth
                value={question.text || ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        text: event.target.value
                    })
                }
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Heading Level
            </Typography>

            <TextField
                select
                fullWidth
                value={question.level || "h2"}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        level: event.target.value
                    })
                }
            >
                <MenuItem value="h1">H1</MenuItem>
                <MenuItem value="h2">H2</MenuItem>
                <MenuItem value="h3">H3</MenuItem>
            </TextField>

        </Stack>

    );

}