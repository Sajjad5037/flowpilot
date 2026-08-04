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

import PerformanceRatingScalePreview from "../components/evaluationTemplateBuilder/PerformanceRatingScalePreview";
import PerformanceRatingScaleProperties from "../components/evaluationTemplateBuilder/PerformanceRatingScaleProperties";
import InformationCardProperties from "../components/evaluationTemplateBuilder/InformationCardProperties";

export const QUESTION_REGISTRY = {
    heading: {

        defaults: {
            text: "Heading",
            level: "h2"
        },

        properties: HeadingProperties,

        hideStandardFields: true

    },
    paragraph: {

        defaults: {
            text: ""
        },

        properties: ParagraphProperties,

        hideStandardFields: true

    },
    performance_rating_scale: {

        defaults: {},

        preview: PerformanceRatingScalePreview,

        properties: PerformanceRatingScaleProperties,

        hideStandardFields: true

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
    information_card: {

        defaults: {

            title: "Information Card",

            content: "Enter content here..."

        },

        properties: InformationCardProperties,

        hideStandardFields: true

    },

};

export const QUESTION_DEFAULTS = Object.fromEntries(
    Object.entries(QUESTION_REGISTRY).map(([key, value]) => [
        key,
        value.defaults
    ])
);