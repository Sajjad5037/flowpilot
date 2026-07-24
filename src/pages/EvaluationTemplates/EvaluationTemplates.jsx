import { useEffect, useState } from "react";

import {
    Box,
    Typography,
    Grid,
    Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import TemplateCard from "../../components/evaluationTemplates/TemplateCard";
import CreateTemplateDialog from "../../components/evaluationTemplates/CreateTemplateDialog";

import {
    getTemplates
} from "../../services/evaluationTemplateService";

export default function EvaluationTemplates() {

    const [templates, setTemplates] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        loadTemplates();

    }, []);
    function handleCreateTemplate(template) {

        console.log(template);

        setDialogOpen(false);

        navigate("/evaluation-templates/1/builder");

    }

    async function loadTemplates() {

        const data = await getTemplates();

        setTemplates(data);

    }

    return (

        <Box>

            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={5}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >

                        Evaluation Templates

                    </Typography>

                    <Typography
                        color="text.secondary"
                    >

                        Create and manage reusable evaluation forms.

                    </Typography>

                </Box>

                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setDialogOpen(true)}
                >
                    Create Template
                </Button>
                <CreateTemplateDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onCreate={handleCreateTemplate}
                />


            </Box>

            <Grid
                container
                spacing={3}
            >

                {templates.map(template => (

                    <Grid
                        key={template.id}
                        size={{ xs: 12, md: 6 }}
                    >

                        <TemplateCard
                            template={template}
                        />

                    </Grid>

                ))}

            </Grid>

        </Box>

    );

}