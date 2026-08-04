import {
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function ParagraphProperties({
    question,
    onQuestionChange
}) {

    return (

        <Stack spacing={2} mt={2}>

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Paragraph Text
            </Typography>

            <TextField
                fullWidth
                multiline
                rows={6}
                value={question.text || ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        text: event.target.value
                    })
                }
            />

        </Stack>

    );

}