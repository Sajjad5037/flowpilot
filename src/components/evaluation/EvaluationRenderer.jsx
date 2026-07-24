import {
  Card,
  CardContent,
  Typography,
  Divider,
} from "@mui/material";

export default function EvaluationRenderer({
  template,
}) {
  if (!template) {
    return null;
  }

  return (
    <>
      <Typography
        variant="h4"
        mb={1}
      >
        {template.name}
      </Typography>

      <Typography
        color="text.secondary"
        mb={3}
      >
        {template.description}
      </Typography>

      {template.sections.map((section) => (
        <Card
          key={section.id}
          sx={{ mb: 3 }}
        >
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
            >
              {section.title}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {section.questions.map((question) => (
              <Typography
                key={question.id}
                sx={{ mb: 2 }}
              >
                • {question.title}
                <br />
                <small>{question.type}</small>
              </Typography>
            ))}
          </CardContent>
        </Card>
      ))}
    </>
  );
}