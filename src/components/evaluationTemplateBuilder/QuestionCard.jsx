import {
    Box,
    Checkbox,
    Divider,
    FormControlLabel,
    IconButton,
    Radio,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { QUESTION_REGISTRY } from "../../constants/questionRegistry";

export default function QuestionCard({
    question,
    questionNumber,
    selected,
    onClick,
    onRemove
}) {
    const hideStandardFields =
        QUESTION_REGISTRY[question.type]?.hideStandardFields ?? false;
    function renderQuestionPreview() {
        const PreviewComponent =
            QUESTION_REGISTRY[question.type]?.preview;

        if (PreviewComponent) {

            return (
                <PreviewComponent
                    question={question}
                />
            );

        }

    switch (question.type) {

        case "paragraph":

            return (

                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        whiteSpace: "pre-wrap"
                    }}
                >
                    {question.text || "Paragraph"}
                </Typography>

            );

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
            case "checkbox":

                return (

                    <Stack spacing={1}>

                        {(question.options || []).map((option, index) => (

                            <FormControlLabel
                                key={index}
                                control={<Checkbox disabled />}
                                label={option}
                            />

                        ))}

                    </Stack>

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
        case "date":

            return (

                <TextField
                    fullWidth
                    disabled
                    type="date"
                    value={question.defaultValue || ""}
                    placeholder="Select a date"
                    InputLabelProps={{
                        shrink: true
                    }}
                />

            );
            case "heading":

                return (

                    <Typography
                        variant={question.level || "h2"}
                        fontWeight={700}
                    >
                        {question.text || "Heading"}
                    </Typography>

                );

        case "number":

            return (

                <TextField
                    fullWidth
                    disabled
                    type="number"
                    value={question.defaultValue ?? ""}
                    inputProps={{
                        min: question.min ?? undefined,
                        max: question.max ?? undefined,
                        step: question.step ?? 1
                    }}
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

                <Stack spacing={1}>

                    <Box
                        sx={{
                            border: "1px solid #D1D5DB",
                            borderRadius: 1,
                            px: 2,
                            py: 1.5,
                            bgcolor: "#F9FAFB"
                        }}
                    >
                        <Typography color="text.secondary">
                            ▼ Select...
                        </Typography>
                    </Box>

                    {(question.options || []).map((option, index) => (

                        <Typography
                            key={index}
                            sx={{
                                pl: 2,
                                color: "text.secondary"
                            }}
                        >
                            {option}
                        </Typography>

                    ))}

                </Stack>

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

                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    {!hideStandardFields && (
                        <Typography>
                            {question.label}
                        </Typography>
                    )}

                    <IconButton
                        size="small"
                        color="error"
                        aria-label={`Remove Question ${questionNumber}`}
                        onClick={(event) => {
                            event.stopPropagation();
                            onRemove?.();
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Stack>

                {renderQuestionPreview()}

                {question.helpText && (

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {question.helpText}

                    </Typography>

                )}

                {!hideStandardFields && (
                    <Divider />
                )}

                {!hideStandardFields && (

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

                )}

            </Stack>

        </Box>

    );

}