import {
    Box,
    Grid,
    TextField,
    Typography
} from "@mui/material";

export default function EmployeeInformationPreview({

    component,
    previewMode,
    employee,
    responses,
    employeeResponses,
    onResponsesChange

}) {

    const fields = component.fields || {};
    const isEmployee = previewMode === "employee";
    const isSupervisor = previewMode === "supervisor";
    const isHR = previewMode === "hr";

    console.log(
        "EmployeeInformation responses:",
        responses
    );

    function renderField(label, fieldKey) {
    const isActualEmployeeEvaluation =
        (previewMode === "employee" || previewMode === "supervisor") &&
        employee;

    const employeeValue = {
        employee_name: employee?.full_name,
        supervisor: employee?.supervisor_name,
        department: employee?.department,
        position: employee?.designation,
    }[fieldKey];

    const isBackendEmployeeField =
        isActualEmployeeEvaluation &&
        [
            "employee_name",
            "supervisor",
            "department",
            "position",
        ].includes(fieldKey);

    return (

        <Box sx={{ mb: 3 }}>

            <Typography
                variant="body1"
                fontWeight={600}
                sx={{ mb: 1 }}
            >
                {label}
            </Typography>

            <TextField
                fullWidth
                variant="outlined"
                value={
                    (isActualEmployeeEvaluation || isHR)
                        ? (employeeValue || "")
                        : previewMode === "employee"
                        ? (responses?.employee_information?.[fieldKey] || "")
                        : (employeeResponses?.employee_information?.[fieldKey] || "")
                }
                onChange={(e) => {

                    onResponsesChange({
                        ...responses,
                        employee_information: {
                            ...(responses?.employee_information || {}),
                            [fieldKey]: e.target.value
                        }
                    });

                }}
                disabled={previewMode !== "employee"}
                InputProps={
                    isActualEmployeeEvaluation
                        ? { readOnly: true }
                        : undefined
                }
                sx={
                    isBackendEmployeeField
                        ? {
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#F8FAFC",
                                "& fieldset": {
                                    borderColor: "#CBD5E1",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#94A3B8",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#CBD5E1",
                                    borderWidth: 1,
                                },
                            },
                        }
                        : undefined
                }
            />

        </Box>

    );

}

        return (

            <Box
                sx={{
                    mb: 4
                }}
            >

                {(fields.employeeName ?? true) && (

                    <Box>

                        {renderField("Employee Name", "employee_name")}

                    </Box>

                )}

                {(fields.supervisor ?? true) && (

                    <Box>

                        {renderField("Supervisor", "supervisor")}

                    </Box>

                )}

                {(fields.department ?? true) && (

                    <Box>

                        {renderField("Department", "department")}

                    </Box>

                )}

                {(fields.position ?? true) && (

                    <Box>

                        {renderField("Position", "position")}

                    </Box>

                )}

                {(fields.phoneNumber ?? false) && (

                    <Box>

                        {renderField("Phone Number", "phone_number")}

                    </Box>

                )}

                {(fields.employeeId ?? false) && (

                    <Box>

                        {renderField("Employee ID", "employee_id")}

                    </Box>

                )}

                {(fields.officeLocation ?? false) && (

                    <Box>

                        {renderField("Office Location", "office_location")}

                    </Box>

                )}

                {(fields.costCentre ?? false) && (

                    <Box>

                        {renderField("Cost Center", "cost_center")}

                    </Box>

                )}

            </Box>

        );

}