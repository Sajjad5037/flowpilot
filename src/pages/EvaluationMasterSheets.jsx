import { useEffect, useState } from "react";

import {
    Box,
    Button,
    Chip,
    Dialog,
    DialogContent,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import {
    getEvaluationMasterSheetPdf,
    getEvaluationMasterSheets
} from "../services/evaluationMasterSheetService";
import MasterSheetViewer
from "./MasterSheetViewer";

export default function EvaluationMasterSheets() {

    const [masterSheets, setMasterSheets] = useState([]);

    const [search, setSearch] = useState("");
    
    const [selectedAssignmentId, setSelectedAssignmentId] = useState(null);

    const [openViewer, setOpenViewer] = useState(false);

   
    useEffect(() => {

        loadMasterSheets();

    }, []);
    
    async function handleDownloadPdf(sheet) {
        try {
            const assignmentId = sheet.assignment_id;
            const pdfBlob = await getEvaluationMasterSheetPdf(
                assignmentId
            );
            const objectUrl = URL.createObjectURL(pdfBlob);
            const downloadLink = document.createElement("a");

            downloadLink.href = objectUrl;
            downloadLink.download =
                `evaluation-master-sheet-${assignmentId}.pdf`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
            URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error(
                "Failed to download evaluation master sheet PDF:",
                error
            );

            alert(
                "Failed to download evaluation master sheet PDF."
            );
        }
    }
    async function loadMasterSheets() {

        try {

            const data =
                await getEvaluationMasterSheets();

            setMasterSheets(data);

        }

        catch (error) {

            console.error(error);

            alert("Failed to load master sheets.");

        }

    }

    const filteredSheets =
        masterSheets.filter(sheet =>

            sheet.employee_name
                .toLowerCase()
                .includes(search.toLowerCase())

        );

    return (

        <Box p={4}>

            <Typography
                variant="h4"
                fontWeight={700}
                mb={1}
            >
                Evaluation Master Sheets
            </Typography>

            <Typography
                color="text.secondary"
                mb={4}
            >
                Latest completed evaluation for each employee.
            </Typography>

            {masterSheets.length > 0 && (

                <TextField
                    fullWidth
                    label="Search Employee"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    sx={{
                        mb: 4,
                        maxWidth: 450
                    }}
                />

            )}

            <TableContainer
                component={Paper}
            >

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>

                                <strong>Employee</strong>

                            </TableCell>

                            <TableCell>

                                <strong>Supervisor</strong>

                            </TableCell>

                            <TableCell>

                                <strong>Status</strong>

                            </TableCell>

                            <TableCell
                                align="center"
                            >

                                <strong>Action</strong>

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {filteredSheets.length === 0 ? (

                            <TableRow>

                                <TableCell
                                    colSpan={4}
                                    align="center"
                                >

                                    No completed evaluations found.

                                </TableCell>

                            </TableRow>

                        ) : (

                            filteredSheets.map(sheet => (

                                <TableRow
                                    key={sheet.assignment_id}
                                >

                                    <TableCell>

                                        {sheet.employee_name}

                                    </TableCell>

                                    <TableCell>

                                        {sheet.supervisor_name}

                                    </TableCell>

                                    <TableCell>

                                        <Chip
                                            label={sheet.status}
                                            size="small"
                                            sx={{
                                                bgcolor:
                                                    sheet.status === "completed"
                                                        ? "#DCFCE7"
                                                        : "#FEF3C7",

                                                color:
                                                    sheet.status === "completed"
                                                        ? "#166534"
                                                        : "#92400E",

                                                fontWeight: 600,
                                                textTransform: "capitalize"
                                            }}
                                        />

                                    </TableCell>

                                    <TableCell align="center">

                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                gap: 1
                                            }}
                                        >

                                            <Button
                                                variant="contained"
                                                onClick={() => {

                                                    setSelectedAssignmentId(
                                                        sheet.assignment_id
                                                    );

                                                    setOpenViewer(true);

                                                }}
                                            >
                                                View
                                            </Button>

                                            <Button
                                                variant="outlined"
                                                onClick={() =>
                                                    handleDownloadPdf(sheet)
                                                }
                                            >
                                                Download PDF
                                            </Button>

                                        </Box>

                                    </TableCell>

                                </TableRow>

                            ))

                        )}

                    </TableBody>

                </Table>

            </TableContainer>
            <Dialog
                open={openViewer}
                onClose={() => setOpenViewer(false)}
                fullWidth
                maxWidth="xl"
            >

                <IconButton
                    onClick={() => setOpenViewer(false)}
                    sx={{
                        position: "absolute",
                        right: 12,
                        top: 12,
                        zIndex: 10
                    }}
                >

                    <CloseIcon />

                </IconButton>

                <DialogContent sx={{ p: 0 }}>

                    {selectedAssignmentId && (

                        <MasterSheetViewer
                            assignmentId={selectedAssignmentId}
                        />

                    )}

                </DialogContent>

            </Dialog>

        </Box>

    );

}