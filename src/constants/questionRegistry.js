import ShortTextProperties from "../components/evaluationTemplateBuilder/ShortTextProperties";
import LongTextProperties from "../components/evaluationTemplateBuilder/LongTextProperties";
import RatingProperties from "../components/evaluationTemplateBuilder/RatingProperties";
import MultipleChoiceProperties from "../components/evaluationTemplateBuilder/MultipleChoiceProperties";

export const QUESTION_REGISTRY = {
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

};

export const QUESTION_DEFAULTS = Object.fromEntries(
    Object.entries(QUESTION_REGISTRY).map(([key, value]) => [
        key,
        value.defaults
    ])
);