import {
    Divider,
    IconButton,
    Stack,
    TextField,
    Typography,
    Button
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function MultipleChoiceProperties({
    question,
    onQuestionChange
}) {

    const options = question.options || [];

    function updateOption(index, value) {

        const updated = [...options];
        updated[index] = value;

        onQuestionChange(question.id, {
            options: updated
        });

    }

    function addOption() {

        onQuestionChange(question.id, {
            options: [...options, `Option ${options.length + 1}`]
        });

    }

    function removeOption(index) {

        const updated = options.filter((_, i) => i !== index);

        onQuestionChange(question.id, {
            options: updated
        });

    }

    return (
        <>
            <Divider sx={{ my: 2 }} />

            <Typography
                fontWeight={600}
                gutterBottom
            >
                Multiple Choice Options
            </Typography>

            <Stack spacing={2}>

                {options.map((option, index) => (

                    <Stack
                        key={index}
                        direction="row"
                        spacing={1}
                        alignItems="center"
                    >

                        <TextField
                            fullWidth
                            label={`Option ${index + 1}`}
                            value={option}
                            onChange={(event) =>
                                updateOption(index, event.target.value)
                            }
                        />

                        <IconButton
                            color="error"
                            onClick={() => removeOption(index)}
                            disabled={options.length <= 2}
                        >
                            <DeleteIcon />
                        </IconButton>

                    </Stack>

                ))}

                <Button
                    variant="outlined"
                    onClick={addOption}
                >
                    + Add Option
                </Button>

            </Stack>
        </>
    );

}