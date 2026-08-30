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
    const hasOptionalFields =
        (fields.phoneNumber ?? false) ||
        (fields.employeeId ?? false) ||
        (fields.officeLocation ?? false) ||
        (fields.costCentre ?? false);

    console.log(
        "EmployeeInformation responses:",
        responses
    );

    function renderField(label, fieldKey, prominent = false) {
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

        <Box sx={{ minWidth: 0 }}>

            <Typography
                sx={{
                    color: "#94A3B8",
                    fontSize: prominent ? 12 : 13,
                    fontWeight: prominent ? 700 : 500,
                    textTransform: prominent ? "uppercase" : "none",
                    letterSpacing: prominent ? 0.5 : 0,
                    mb: 0.5,
                }}
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
                    {
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "transparent",
                            borderRadius: 0,
                            "& fieldset": {
                                border: "none",
                            },
                            "&:hover fieldset": {
                                border: "none",
                            },
                            "&.Mui-focused fieldset": {
                                border: "none",
                            },
                            "&.Mui-disabled": {
                                backgroundColor: "transparent",
                            },
                        },
                        "& .MuiOutlinedInput-input": {
                            color: "#0F172A",
                            fontSize: prominent ? 24 : 14,
                            fontWeight: prominent ? 700 : 600,
                            lineHeight: 1.35,
                            p: 0,
                            WebkitTextFillColor: "#0F172A",
                        },
                    }
                }
            />

        </Box>

    );

}

        return (

            <Box
                sx={{
                    width: "100%",
                    bgcolor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: 2,
                    px: {
                        xs: 2,
                        sm: 3,
                    },
                    py: {
                        xs: 2.5,
                        sm: 3,
                    },
                    mb: 4,
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            sm: "repeat(2, minmax(0, 1fr))",
                            md: "repeat(4, minmax(0, 1fr))",
                        },
                        columnGap: 4,
                        rowGap: 3,
                        pb: hasOptionalFields ? 3 : 0,
                        borderBottom: hasOptionalFields
                            ? "1px solid #E2E8F0"
                            : "none",
                    }}
                >
                    {(fields.employeeName ?? true) && (
                        <Box>
                            {renderField("Employee Name", "employee_name", true)}
                        </Box>
                    )}

                    {(fields.supervisor ?? true) && (
                        <Box>
                            {renderField("Supervisor", "supervisor", true)}
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
                </Box>

                {hasOptionalFields && (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "1fr",
                                sm: "repeat(2, minmax(0, 1fr))",
                                md: "repeat(4, minmax(0, 1fr))",
                            },
                            gap: {
                                xs: 2.5,
                                sm: 3,
                            },
                            pt: 3,
                        }}
                    >
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
                )}

            </Box>

        );

}