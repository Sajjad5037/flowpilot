export const mockEvaluationTemplates = [
  {
    id: 1,
    name: "Annual Performance Review",
    description: "Annual employee performance review",
    sections: [
      {
        id: 1,
        title: "Communication",
        questions: [
          {
            id: 1,
            title: "Communication Skills",
            type: "rating",
          },
          {
            id: 2,
            title: "Comments",
            type: "long_text",
          },
        ],
      },
    ],
  },

  {
    id: 2,
    name: "Leadership Assessment",
    description: "Leadership competency evaluation",
    sections: [
      {
        id: 1,
        title: "Leadership",
        questions: [
          {
            id: 1,
            title: "Leadership Rating",
            type: "rating",
          },
        ],
      },
    ],
  },
];