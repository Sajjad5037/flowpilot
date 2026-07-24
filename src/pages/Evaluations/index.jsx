import { useState } from "react";

import {
    Box,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";

import GoalKpiEvaluation from "../../components/evaluation/GoalKpiEvaluation";


const templates = [
    {
        id: 1,
        name: "Quarterly Goal & KPI Setting",
        type: "goal_kpi",
    },
    {
        id: 2,
        name: "Annual Performance Review",
        type: "annual",
    },
    {
        id: 3,
        name: "Leadership Assessment",
        type: "leadership",
    },
];

export default function Evaluations() {

    const [selectedTemplate, setSelectedTemplate] =
      useState("goal_kpi");

    return (

        <Box p={4}>

            <Typography
                variant="h4"
                mb={3}
            >
                Evaluations
            </Typography>

            <TextField
                select
                fullWidth
                label="Evaluation Template"
                value={selectedTemplate}
                onChange={(e) =>
                    setSelectedTemplate(e.target.value)
                }
                sx={{ mb: 4 }}
            >

                {templates.map(template => (

                   <MenuItem
                      key={template.id}
                      value={template.type}
                  >
                      {template.name}
                  </MenuItem> 

                ))}

            </TextField>

            <Box sx={{ mt: 2 }}>
              {selectedTemplate === "goal_kpi" && (
                <GoalKpiEvaluation />
              )}

              {selectedTemplate === "annual" && (
                <Typography variant="h5">
                  Annual Performance Review Preview Coming Soon
                </Typography>
              )}

              {selectedTemplate === "leadership" && (
                <Typography variant="h5">
                  Leadership Assessment Preview Coming Soon
                </Typography>
              )}
            </Box>

        </Box>

    );

}