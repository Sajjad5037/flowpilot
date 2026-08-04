import {
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function DateProperties({
    question,
    onQuestionChange
}) {

    return (

        <Stack spacing={2} mt={2}>

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Default Date
            </Typography>

            <TextField
                fullWidth
                type="date"
                value={question.defaultValue || ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        defaultValue: event.target.value
                    })
                }
                InputLabelProps={{
                    shrink: true
                }}
            />

        </Stack>

    );

}