import ShortTextProperties from "../components/evaluationTemplateBuilder/ShortTextProperties";
import LongTextProperties from "../components/evaluationTemplateBuilder/LongTextProperties";
import RatingProperties from "../components/evaluationTemplateBuilder/RatingProperties";
import MultipleChoiceProperties from "../components/evaluationTemplateBuilder/MultipleChoiceProperties";
import CheckboxGroupProperties
from "../components/evaluationTemplateBuilder/CheckboxGroupProperties";
import DropdownProperties from "../components/evaluationTemplateBuilder/DropdownProperties";
import NumberProperties from "../components/evaluationTemplateBuilder/NumberProperties";
import DateProperties from "../components/evaluationTemplateBuilder/DateProperties";
import HeadingProperties from "../components/evaluationTemplateBuilder/HeadingProperties";
import ParagraphProperties from "../components/evaluationTemplateBuilder/ParagraphProperties";


export const QUESTION_REGISTRY = {
    heading: {

        defaults: {
            text: "Heading",
            level: "h2"
        },

        properties: HeadingProperties

    },
    paragraph: {

        defaults: {

            text: ""

        },

        properties: ParagraphProperties

    },
    
    short_text: {
        defaults: {
            placeholder: "",
            defaultValue: "",
            maxLength: null
        },
        properties: ShortTextProperties
    },

    long_text: {
        defaults: {
            placeholder: "",
            defaultValue: "",
            rows: 4,
            maxLength: null
        },
        properties: LongTextProperties
    },

    rating: {
        defaults: {
            min: 1,
            max: 5,
            lowLabel: "Poor",
            highLabel: "Excellent"
        },
        properties: RatingProperties
    },
    multiple_choice: {

        defaults: {
            options: [
                "Option 1",
                "Option 2"
            ]
        },

        properties: MultipleChoiceProperties

    },
    date: {

        defaults: {
            defaultValue: ""
            
        },

        properties: DateProperties

    },
    checkbox: {

        defaults: {

            options: [
                "Option 1",
                "Option 2"
            ]

        },

        properties: CheckboxGroupProperties

    },
    dropdown: {

        defaults: {

            options: [
                "Option 1",
                "Option 2"
            ]

        },

        properties: DropdownProperties

    },
    number: {

        defaults: {
            min: null,
            max: null,
            step: 1,
            defaultValue: ""
        },

        properties: NumberProperties

    },

};

export const QUESTION_DEFAULTS = Object.fromEntries(
    Object.entries(QUESTION_REGISTRY).map(([key, value]) => [
        key,
        value.defaults
    ])
);


----
export const QUESTION_TYPES = [
    // Content Components
    {
        value: "heading",
        label: "Content — Heading"
    },
    {
        value: "paragraph",
        label: "Content — Paragraph"
    },

    // Question Components
    {
        value: "short_text",
        label: "Question — Short Text"
    },
    {
        value: "long_text",
        label: "Question — Long Text"
    },
    {
        value: "number",
        label: "Question — Number"
    },
    {
        value: "yes_no",
        label: "Question — Yes / No"
    },
    {
        value: "rating",
        label: "Question — Rating"
    },
    {
        value: "multiple_choice",
        label: "Question — Multiple Choice"
    },
    {
        value: "checkbox",
        label: "Question — Checkbox Group"
    },
    {
        value: "dropdown",
        label: "Question — Dropdown"
    },
    {
        value: "date",
        label: "Question — Date"
    }
];

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

                {!["heading", "paragraph"].includes(question.type) && (
                    <Typography>
                        {question.label}
                    </Typography>
                )}

                {renderQuestionPreview()}

                {question.helpText && (

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >

                        {question.helpText}

                    </Typography>

                )}

                {!["heading", "paragraph"].includes(question.type) && (
                    <Divider />
                )}

                {!["heading", "paragraph"].includes(question.type) && (

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

import { useState } from "react";
import { QUESTION_TYPES } from "../../constants/questionTypes";
import { QUESTION_DEFAULTS } from "../../constants/questionRegistry";

import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    ListSubheader,
    MenuItem,
    Stack,
    TextField
} from "@mui/material";

export default function AddQuestionDialog({
    open,
    onClose,
    onSave
}) {

    
    const [form, setForm] = useState({
        type: "short_text",
        label: "",
        helpText: "",
        required: true
    });
    const selectedTypeLabel =
        QUESTION_TYPES.find(type => type.value === form.type)?.label || "Question";

    const buttonText =
        ["heading", "paragraph", "divider"].includes(form.type)
            ? `Create ${selectedTypeLabel}`
            : `Create ${selectedTypeLabel} Question`;

    function handleChange(event) {

        const { name, value } = event.target;

        setForm(prev => ({
            ...prev,
            [name]: value
        }));

    }

    function handleCheckbox(event) {

        setForm(prev => ({
            ...prev,
            required: event.target.checked
        }));

    }

    function resetForm() {

        setForm({
            type: "short_text",
            label: "",
            helpText: "",
            required: true
        });

    }

    function handleSave() {

        if (!form.label.trim()) return;

        const question = {
            id: crypto.randomUUID(),
            ...form,
            ...(QUESTION_DEFAULTS[form.type] || {})
        };

        onSave(question);

        resetForm();
        onClose();

    }

    function handleCancel() {

        resetForm();
        onClose();

    }

    return (

        <Dialog
            open={open}
            onClose={handleCancel}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>

                Add Component

            </DialogTitle>

            <DialogContent>

                <Stack
                    spacing={3}
                    mt={1}
                >

                    <TextField
                        select
                        fullWidth
                        label="Question Type"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                    >

                        <ListSubheader>
                            Content
                        </ListSubheader>

                        <MenuItem value="heading">
                            Heading
                        </MenuItem>

                        <MenuItem value="paragraph">
                            Paragraph
                        </MenuItem>

                        <ListSubheader>
                            Questions
                        </ListSubheader>

                        <MenuItem value="short_text">
                            Short Text
                        </MenuItem>

                        <MenuItem value="long_text">
                            Long Text
                        </MenuItem>

                        <MenuItem value="number">
                            Number
                        </MenuItem>

                        <MenuItem value="yes_no">
                            Yes / No
                        </MenuItem>

                        <MenuItem value="rating">
                            Rating
                        </MenuItem>

                        <MenuItem value="multiple_choice">
                            Multiple Choice
                        </MenuItem>

                        <MenuItem value="checkbox">
                            Checkbox Group
                        </MenuItem>

                        <MenuItem value="dropdown">
                            Dropdown
                        </MenuItem>

                        <MenuItem value="date">
                            Date
                        </MenuItem>

                        <ListSubheader>
                            Evaluation
                        </ListSubheader>

                        <MenuItem
                            disabled
                        >
                            Rating Scale (Coming Soon)
                        </MenuItem>

                        <MenuItem
                            disabled
                        >
                            Quarter Goal (Coming Soon)
                        </MenuItem>

                        <MenuItem
                            disabled
                        >
                            KPI Table (Coming Soon)
                        </MenuItem>

                        <MenuItem
                            disabled
                        >
                            Leadership Block (Coming Soon)
                        </MenuItem>

                    </TextField>

                    <TextField
                        fullWidth
                        label="Question Label"
                        name="label"
                        value={form.label}
                        onChange={handleChange}
                    />

                    <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Help Text"
                        name="helpText"
                        value={form.helpText}
                        onChange={handleChange}
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={form.required}
                                onChange={handleCheckbox}
                            />
                        }
                        label="Required"
                    />

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button onClick={handleCancel}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                >
                    {buttonText}
                </Button>

            </DialogActions>

        </Dialog>

    );

}


import {
    Box,
    Divider,
    TextField,
    Typography,
    Checkbox,
    FormControlLabel
} from "@mui/material";
import { QUESTION_REGISTRY } from "../../constants/questionRegistry";
import { QUESTION_TYPES } from "../../constants/questionTypes";

console.log("QUESTION_REGISTRY =", QUESTION_REGISTRY);
console.log("Registry Keys =", Object.keys(QUESTION_REGISTRY));

export default function PropertiesPanel({
    selectedSection,
    selectedQuestion,
    onQuestionChange,
    onSectionChange
}) {
    const detailsTitle =
    ["heading", "paragraph", "divider"].includes(selectedQuestion.type)
        ? `${QUESTION_TYPES.find(type => type.value === selectedQuestion.type)?.label} Details`
        : "Question Details";

    const labelFieldLabel =
        selectedQuestion.type === "heading"
            ? "Heading Text"
            : selectedQuestion.type === "paragraph"
                ? "Paragraph Text"
                : "Question Label";

    // Nothing selected
    if (!selectedSection && !selectedQuestion) {

        return (

            <Box
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    bgcolor: "#fff",
                    height: "100%",
                    p: 3
                }}
            >

                <Typography variant="h6">
                    Properties
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                    fontWeight={600}
                    gutterBottom
                >
                    Nothing Selected
                </Typography>

                <Typography color="text.secondary">
                    Select a section or question to edit its properties.
                </Typography>

            </Box>

        );

    }

    // Question selected
    if (selectedQuestion) {

        return (

            <Box
                sx={{
                    border: "1px solid #E5E7EB",
                    borderRadius: 3,
                    bgcolor: "#fff",
                    height: "100%",
                    p: 3
                }}
            >

                <Typography variant="h6">
                    Properties
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                >
                    {detailsTitle}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle2" color="text.secondary">
                    {labelFieldLabel}
                </Typography>

                <TextField
                    fullWidth
                    value={selectedQuestion.label}
                    onChange={(event) =>
                        onQuestionChange(selectedQuestion.id, {
                            label: event.target.value
                        })
                    }
                    sx={{ mb: 2 }}
                />

                <Typography variant="subtitle2" color="text.secondary">
                    Question Type
                </Typography>

                <Typography mb={2}>
                    {
                        QUESTION_TYPES.find(
                            item => item.value === selectedQuestion.type
                        )?.label || selectedQuestion.type
                    }
                </Typography>

                {!["heading", "paragraph"].includes(selectedQuestion.type) && (
                    <>
                        <Typography variant="subtitle2" color="text.secondary">
                            Help Text
                        </Typography>

                        <TextField
                            fullWidth
                            multiline
                            rows={3}
                            value={selectedQuestion.helpText || ""}
                            onChange={(event) =>
                                onQuestionChange(selectedQuestion.id, {
                                    helpText: event.target.value
                                })
                            }
                            sx={{ mb: 2 }}
                        />
                    </>
                )}

                {!["heading", "paragraph"].includes(selectedQuestion.type) && (
                    <>
                        <Typography variant="subtitle2" color="text.secondary">
                            Required
                        </Typography>

                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={selectedQuestion.required}
                                    onChange={(event) =>
                                        onQuestionChange(selectedQuestion.id, {
                                            required: event.target.checked
                                        })
                                    }
                                />
                            }
                            label="Required"
                        />
                    </>
                )}
                {renderQuestionTypeProperties()}

            </Box>

        );

    }
function renderQuestionTypeProperties() {

    console.log("Question Type:", selectedQuestion.type);
    console.log("Registry Entry:", QUESTION_REGISTRY[selectedQuestion.type]);

    const PropertiesComponent =
        QUESTION_REGISTRY[selectedQuestion.type]?.properties;

    console.log("Properties Component:", PropertiesComponent);

    if (!PropertiesComponent) {
        return null;
    }

    return (
        <PropertiesComponent
            question={selectedQuestion}
            onQuestionChange={onQuestionChange}
        />
    );
}
    

    // Section selected
    return (

        <Box
            sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 3,
                bgcolor: "#fff",
                height: "100%",
                p: 3
            }}
        >

            <Typography variant="h6">
                Properties
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography
                fontWeight={600}
                gutterBottom
            >
                Section Settings
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" color="text.secondary">
                Section Name
            </Typography>

            <TextField
                fullWidth
                value={selectedSection.name}
                onChange={(event) =>
                    onSectionChange(selectedSection.id, {
                        name: event.target.value
                    })
                }
            />

        </Box>

    );

}