import {
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function NumberProperties({
    question,
    onQuestionChange
}) {

    return (

        <Stack spacing={2} mt={2}>

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Default Value
            </Typography>

            <TextField
                fullWidth
                type="number"
                value={question.defaultValue ?? ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        defaultValue: event.target.value === ""
                            ? ""
                            : Number(event.target.value)
                    })
                }
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Minimum Value
            </Typography>

            <TextField
                fullWidth
                type="number"
                value={question.min ?? ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        min: event.target.value === ""
                            ? null
                            : Number(event.target.value)
                    })
                }
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Maximum Value
            </Typography>

            <TextField
                fullWidth
                type="number"
                value={question.max ?? ""}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        max: event.target.value === ""
                            ? null
                            : Number(event.target.value)
                    })
                }
            />

            <Typography
                variant="subtitle2"
                color="text.secondary"
            >
                Step
            </Typography>

            <TextField
                fullWidth
                type="number"
                value={question.step ?? 1}
                onChange={(event) =>
                    onQuestionChange(question.id, {
                        step: event.target.value === ""
                            ? 1
                            : Number(event.target.value)
                    })
                }
            />

        </Stack>

    );

}