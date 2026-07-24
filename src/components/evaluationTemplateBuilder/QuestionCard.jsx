import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    Radio,
    Stack,
    TextField,
    Typography
} from "@mui/material";

export default function QuestionCard({
    question,
    selected,
    onClick
}) {
    function renderQuestionPreview() {

    switch (question.type) {

        case "short_text":

            return (
                <TextField
                    placeholder={question.placeholder || "Short text answer"}
                    defaultValue={question.defaultValue || ""}
                    inputProps={{
                        maxLength: question.maxLength || undefined
                    }}
                    disabled
                />
            );

        case "long_text":

            return (
                <TextField
                    multiline
                    rows={question.rows || 4}
                    placeholder={question.placeholder || "Long text answer"}
                    defaultValue={question.defaultValue || ""}
                    inputProps={{
                        maxLength: question.maxLength || undefined
                    }}
                    disabled
                />
            );

        case "number":

            return (
                <TextField
                    fullWidth
                    disabled
                    type="number"
                    placeholder="Enter a number"
                />
            );

        case "yes_no":

            return (
                <Stack direction="row" spacing={2}>
                    <Box
                        sx={{
                            px: 3,
                            py: 1,
                            border: "1px solid #ccc",
                            borderRadius: 1
                        }}
                    >
                        Yes
                    </Box>

                    <Box
                        sx={{
                            px: 3,
                            py: 1,
                            border: "1px solid #ccc",
                            borderRadius: 1
                        }}
                    >
                        No
                    </Box>
                </Stack>
            );

        case "rating": {

            const min = question.min ?? 1;
            const max = question.max ?? 5;

            const stars = [];

            for (let i = min; i <= max; i++) {
                stars.push("☆");
            }

            return (
                <Stack spacing={1}>
                    {question.lowLabel && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                        >
                            {question.lowLabel}
                        </Typography>
                    )}

                    <Typography fontSize={28}>
                        {stars.join(" ")}
                    </Typography>

                    {question.highLabel && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            align="right"
                        >
                            {question.highLabel}
                        </Typography>
                    )}
                </Stack>
            );
        }
        case "multiple_choice":

            return (
                <Stack spacing={1}>
                    {(question.options || []).map((option, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Radio disabled />}
                            label={option}
                        />
                    ))}
                </Stack>
            );
        case "dropdown":

            return (
                <TextField
                    select
                    fullWidth
                    disabled
                    value=""
                >
                </TextField>
            );

        default:

            return (
                <TextField
                    fullWidth
                    disabled
                    placeholder="Short text answer"
                />
            );

    }

}

    return (

        <Box
            onClick={onClick}
            sx={{
                border: selected ? "2px solid #1976d2" : "1px solid #E5E7EB",
                borderRadius: 3,
                p: 3,
                mb: 3,
                bgcolor: selected ? "#EAF4FF" : "#FAFAFA",
                cursor: "pointer",
                transition: "all 0.2s ease"
            }}
        >

            <Stack
                spacing={2}
            >

                <Typography
                    variant="h6"
                >
                    {question.label}
                </Typography>

                {renderQuestionPreview()}

                {question.helpText && (

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {question.helpText}

                    </Typography>

                )}

                <Divider />

                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                >

                    <Checkbox
                        checked={question.required}
                        disabled
                    />

                    <Typography
                        variant="body2"
                    >
                        Required
                    </Typography>

                </Stack>

            </Stack>

        </Box>

    );

}