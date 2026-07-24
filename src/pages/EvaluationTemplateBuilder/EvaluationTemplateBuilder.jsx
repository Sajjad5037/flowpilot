import { useState } from "react";

import {
    Box,
    Grid
} from "@mui/material";

import BuilderHeader from "../../components/evaluationTemplateBuilder/BuilderHeader";
import SectionsPanel from "../../components/evaluationTemplateBuilder/SectionsPanel";
import BuilderCanvas from "../../components/evaluationTemplateBuilder/BuilderCanvas";
import PropertiesPanel from "../../components/evaluationTemplateBuilder/PropertiesPanel";
import AddSectionDialog from "../../components/evaluationTemplateBuilder/AddSectionDialog";
import AddQuestionDialog from "../../components/evaluationTemplateBuilder/AddQuestionDialog";

export default function EvaluationTemplateBuilder() {

    const [sections, setSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [questionDialogOpen, setQuestionDialogOpen] = useState(false);

    function handleAddSection(section) {

        setSections(prev => [...prev, section]);
        setSelectedSection(section);

    }

    function handleQuestionChange(questionId, updates) {

        const updatedSections = sections.map(section => {

            if (section.id !== selectedSection.id) {
                return section;
            }

            const updatedQuestions = section.questions.map(question => {

                if (question.id !== questionId) {
                    return question;
                }

                return {
                    ...question,
                    ...updates
                };

            });

            return {
                ...section,
                questions: updatedQuestions
            };

        });

        setSections(updatedSections);

        const updatedSection = updatedSections.find(
            section => section.id === selectedSection.id
        );

        setSelectedSection(updatedSection);

        const updatedQuestion = updatedSection.questions.find(
            question => question.id === questionId
        );

        setSelectedQuestion(updatedQuestion);

    }

    function handleSectionChange(sectionId, updates) {

    const updatedSections = sections.map(section => {

        if (section.id !== sectionId) {
            return section;
        }

        return {
            ...section,
            ...updates
        };

    });

    setSections(updatedSections);

    const updatedSection = updatedSections.find(
        section => section.id === sectionId
    );

    setSelectedSection(updatedSection);

}

    function handleAddQuestion(question) {

        const updatedSections = sections.map(section => {

            if (section.id !== selectedSection.id) {
                return section;
            }

            const updatedSection = {
                ...section,
                questions: [
                    ...section.questions,
                    question
                ]
            };

            setSelectedSection(updatedSection);

            return updatedSection;

        });

        setSections(updatedSections);

    }

    return (

        <Box>

            <BuilderHeader />

            <Grid
                container
                spacing={3}
            >

                <Grid
                    size={{ xs: 12, md: 3 }}
                >

                    <SectionsPanel
                        sections={sections}
                        selectedSection={selectedSection}
                        onSelect={(section) => {
                            setSelectedSection(section);
                            setSelectedQuestion(null);
                        }}
                        onAddSection={() => setDialogOpen(true)}
                    />

                </Grid>

                <Grid
                    size={{ xs: 12, md: 6 }}
                >

                    <BuilderCanvas
                        selectedSection={selectedSection}
                        selectedQuestion={selectedQuestion}
                        onSelectQuestion={setSelectedQuestion}
                        onAddQuestion={() => setQuestionDialogOpen(true)}
                    />

                </Grid>

                <Grid
                    size={{ xs: 12, md: 3 }}
                >

                    <PropertiesPanel
                        selectedSection={selectedSection}
                        selectedQuestion={selectedQuestion}
                        onQuestionChange={handleQuestionChange}
                        onSectionChange={handleSectionChange}
                    />

                </Grid>

            </Grid>

            <AddSectionDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                onSave={handleAddSection}
            />

            <AddQuestionDialog
                open={questionDialogOpen}
                onClose={() => setQuestionDialogOpen(false)}
                onSave={handleAddQuestion}
            />

        </Box>

    );

}