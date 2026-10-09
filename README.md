FlowPilot — Performance Review Workflow Automation Platform  FlowPilot is a full-stack performance management and workflow automation platform that digitizes the employee performance review lifecycle. It connects Goal & KPI Setting, multi-stage evaluations, HR finalization, monthly performance tracking, automated notifications, and reporting in a centralized system.  Built with React, FastAPI, and PostgreSQL, FlowPilot combines configurable evaluation forms with structured workflow orchestration and cycle-aware performance data. It is designed to reduce manual coordination, improve consistency across review stages, and provide a consolidated view of employee performance.
1. Project Summary
The Business Problem  Traditional performance review processes often depend on spreadsheets, email threads, manually maintained documents, and disconnected forms. These processes can make it difficult to coordinate employees, supervisors, and HR, maintain consistent evaluation records, and track progress against agreed goals.  FlowPilot addresses these challenges by connecting the performance review process through structured workflows, centralized data storage, configurable forms, and consolidated reporting.
The Solution  FlowPilot supports two connected business workflows:  1.
Goal & KPI Setting — Employees propose goals and KPIs, supervisors provide their input, and HR reviews and finalizes the agreed targets. 2.
Employee Evaluation — Finalized goals and KPIs are carried into the quarterly evaluation process, where employees and supervisors record performance information and HR reviews the results.  The platform also supports quarterly evaluation cycles, stage-specific access links, email notifications, Evaluation Master Sheets, and PDF report generation.
Core Capabilities
- Workflow automation: Structured evaluation stages for Employees, Supervisors, and HR.
- Configurable forms: Reusable form components driven by saved workflow configuration.
- Goal & KPI management: Separate employee and supervisor inputs followed by HR finalization.
- Cross-workflow data flow: Finalized goals and KPIs are used by the subsequent Employee Evaluation workflow.
- Quarterly cycle management: Assignments remain associated with their relevant evaluation cycle.
- Monthly performance tracking: Progress is recorded against finalized quarterly targets.
- Role-specific interfaces: Forms and responses are organized around the current workflow stage.
- Email notifications: Workflow-specific communication directs users to the relevant evaluation.
- Evaluation Master Sheets: Consolidated performance information for review and reporting.
- PDF generation: Structured evaluation information can be rendered into downloadable reports.
2. End-to-End Business Workflow  The following diagram illustrates how the two primary workflows connect.  ```mermaid
flowchart TD
    A["Goal & KPI Assignment Created"] --> B["Employee Proposes Goals & KPIs"]
    B --> C["Supervisor Reviews and Contributes"]
    C --> D["HR Reviews Both Submissions"]
    D --> E["HR Finalizes Goals & KPIs"]
    E --> F[("Finalized Goals & KPIs")]
    F --> G["Employee Evaluation Assignment"]
    G --> H["Employee Evaluation"]
    H --> I["Supervisor Evaluation"]
    I --> J["HR Review"]
    J --> K["Performance Records"]
    K --> L["Evaluation Master Sheet"]
    L --> M["PDF Report"]

---

---

## 3. Goal & KPI Setting Workflow  The Goal & KPI Setting workflow collects proposed targets from employees and supervisors before HR finalizes the agreed goals and KPIs.  ```mermaid
flowchart TD
    A["Create Goal & KPI Assignment"] --> B["Employee Stage"]
    B --> C["Employee Submits Proposed Goals & KPIs"]
    C --> D["Supervisor Stage"]
    D --> E["Supervisor Submits Input"]
    E --> F["HR Stage"]
    F --> G["Review Employee and Supervisor Responses"]
    G --> H["Finalize Goals & KPIs"]
    H --> I[("Persist Finalized Targets")]
Workflow responsibilities
Employee
- Proposes goals and KPIs.
- Completes the employee-stage form.
- Submits responses for supervisor review.
  Supervisor
- Provides independent input on goals and KPIs.
- Completes the supervisor-stage form.
- Submits responses for HR review.
  HR
- Reviews employee and supervisor submissions.
- Finalizes agreed goals and KPIs.
- Completes the HR stage of the workflow.  The finalized targets are stored as structured records and can subsequently be retrieved by the Employee Evaluation workflow.
4. Employee Evaluation Workflow  Employee Evaluation is a separate workflow associated with an evaluation cycle. It uses the finalized targets from Goal & KPI Setting and collects performance information through role-specific stages.  ```mermaid
flowchart TD
    A[("Finalized Goals & KPIs")] --> B["Create Employee Evaluation"]
    B --> C["Associate Evaluation Cycle"]
    C --> D["Employee Evaluation Stage"]
    D --> E["Supervisor Evaluation Stage"]
    E --> F["HR Review Stage"]
    F --> G["Consolidated Evaluation Information"]
    G --> H["Evaluation Master Sheet"]
    H --> I["PDF Reporting"]

---

---

## 5. Quarterly Evaluation Cycle Management  FlowPilot organizes performance evaluations around quarterly cycles.  | Quarter | Calendar months |
|---|---|
| Q1 | January – March |
| Q2 | April – June |
| Q3 | July – September |
| Q4 | October – December |  Each evaluation assignment can retain its associated evaluation cycle, allowing historical evaluations to remain connected to the appropriate review period.  The application derives the displayed monthly tracking period from the assignment's cycle dates and applies the cycle information when rendering the evaluation.  For example, a Q4 evaluation uses October, November, and December as its monthly tracking period when the cycle begins partway through September and the partial starting month is excluded from monthly tracking.

---

---

## 6. Configurable Form Builder  FlowPilot includes a configurable workflow and form-rendering architecture.  Rather than implementing every evaluation form as an independent hard-coded page, the platform stores workflow configuration as structured JSON and uses that configuration to render the relevant components.

### Configuration and rendering flow  ```mermaid
flowchart TD
    A["Administrator Configures Form"] --> B["Workflow and Component Configuration"]
    B --> C[("Save Template Configuration")]
    C --> D["Create Evaluation Assignment"]
    D --> E["Load Assignment Workflow"]
    E --> F["Resolve Current Stage"]
    F --> G["Render Configured Components"]
    G --> H["Collect Stage-Specific Responses"]
    H --> I["Validate and Submit"]
```  This architecture supports reusable components and role-specific form rendering while keeping the configured workflow structure separate from the runtime interface.

---

---

## 7. System Architecture  FlowPilot uses a React frontend, a FastAPI backend, and a PostgreSQL database. Backend routers expose the application's APIs, while service modules handle specific business operations and PDF templates support report rendering.  ```mermaid
flowchart TB
    U["Employees, Supervisors, HR, Administrators"]
    subgraph Frontend["Frontend — React / Vite"]
    UI["Pages and User Interfaces"]
    FB["Workflow and Form Builder"]
    RT["Evaluation Runtime"]
    MS["Master Sheet Viewer"]
    end
    subgraph Backend["Backend — Python / FastAPI"]
    API["REST API Layer"]
    WF["Workflow and Assignment Logic"]
    CYC["Evaluation Cycle Logic"]
    TGT["Finalized Target Service"]
    EM["Email Service"]
    PDF["PDF Rendering Service"]
    end
    DB[("PostgreSQL Database")]
    MAIL["Email Delivery Provider"]
    HTML["HTML PDF Templates"]
    OUT["Generated PDF"]
    U --> UI
    UI --> FB
    UI --> RT
    UI --> MS
    FB --> API
    RT --> API
    MS --> API
    API --> WF
    API --> CYC
    API --> TGT
    WF <--> DB
    CYC <--> DB
    TGT <--> DB
    WF --> EM
    EM --> MAIL
    API --> PDF
    PDF --> HTML
    PDF --> OUT
Architectural responsibilities
Frontend
- Displays assignment management and evaluation interfaces.
- Provides configurable form-building interfaces.
- Renders forms according to workflow configuration and stage.
- Presents consolidated Master Sheet information.
  Backend
- Exposes REST APIs.
- Manages evaluation assignments and workflow transitions.
- Retrieves and stores stage-specific responses.
- Associates assignments with evaluation cycles.
- Processes finalized goals and KPIs.
- Sends workflow email notifications.
- Generates PDF reports.
  Database
- Persists employee records, templates, assignments, evaluation cycles, responses, and finalized targets.
8. Data Model and Persistence  PostgreSQL provides persistent storage for the platform's core workflow and evaluation data.
Core entities  | Entity | Responsibility |
|---|---|
| employees | Stores employee and workflow participant records. |
| evaluation_templates | Stores reusable evaluation form and workflow configurations. |
| evaluation_assignments | Stores assignments, workflow snapshots, status, and cycle associations. |
| evaluation_assignment_links | Stores stage-specific access links. |
| evaluation_cycles | Defines quarterly evaluation periods. |
| evaluation_preview_responses | Stores evaluation preview data. |
| evaluation_activity_logs | Records workflow activity. |
| finalized_goals | Stores finalized goal records. |
| finalized_kpis | Stores finalized KPI records. |
Relationship overview  ```mermaid
erDiagram
    EMPLOYEES |
|--o{ EVALUATION_ASSIGNMENTS : participates
    EVALUATION_TEMPLATES |
|--o{ EVALUATION_ASSIGNMENTS : configures
    EVALUATION_CYCLES |
|--o{ EVALUATION_ASSIGNMENTS : groups
    EVALUATION_ASSIGNMENTS |
|--o{ EVALUATION_ASSIGNMENT_LINKS : provides
    EVALUATION_ASSIGNMENTS |
|--o{ EVALUATION_ACTIVITY_LOGS : records
    EVALUATION_ASSIGNMENTS |
|--o{ FINALIZED_GOALS : produces
    EVALUATION_ASSIGNMENTS |
|--o{ FINALIZED_KPIS : produces

---

---

## 9. Evaluation Assignment and Access Flow  An evaluation assignment connects the employee, supervisor, HR reviewer, template, workflow, and evaluation cycle.  Stage-specific links allow the relevant participant to open the evaluation associated with their stage.  ```mermaid
flowchart TD
    A["Create Assignment"] --> B["Load Employee, Supervisor and HR"]
    B --> C["Resolve Template and Workflow"]
    C --> D["Associate Evaluation Cycle"]
    D --> E["Create Stage Access Links"]
    E --> F["Send Relevant Notifications"]
    F --> G["Participant Opens Access Link"]
    G --> H["Resolve Assignment and Stage"]
    H --> I["Load Workflow and Saved Responses"]
    I --> J["Render Evaluation Form"]
    J --> K["Submit Stage Responses"]
    K --> L["Update Workflow State"]
```  The backend coordinates assignment creation, stage-specific access, response persistence, and workflow progression.

---

---

## 10. Evaluation Master Sheets and Reporting  Evaluation Master Sheets provide a consolidated view of performance information for HR and review purposes.  Depending on the assignment and available data, the Master Sheet can include:
- Employee and supervisor details.
- Department and review cycle.
- Finalized goals and KPIs.
- Employee evaluation responses.
- Supervisor evaluation responses. - HR responses.
- Monthly goal progress. - KPI review and planning information.
- Final agreed KPI targets.

### PDF generation pipeline  ```mermaid
flowchart LR
    A["Evaluation Assignment"] --> B["Retrieve Evaluation Data"]
    B --> C["Prepare Report Context"]
    C --> D["Render HTML Template"]
    D --> E["Playwright PDF Rendering"]
    E --> F["PDF Document"]
```  The backend prepares structured evaluation data, renders the HTML report template, and uses Playwright to generate the PDF.

---

---

## 11. Automated Email Notifications  FlowPilot integrates email notifications into the evaluation process to communicate workflow actions to the relevant participants.  Notification workflows support the Goal & KPI Setting and Employee Evaluation processes.  Typical recipients include:
- Employees
- Supervisors - HR reviewers  Email content is tailored to the relevant workflow and recipient. The application generates the appropriate evaluation link so the recipient can access the corresponding form.

---

---

## 12. API Architecture  The FastAPI backend exposes REST endpoints organized around the platform's business domains.  | API area | Responsibilities |
|---|---|
| Employees | Employee record management. |
| Evaluation Templates | Create, retrieve, update, activate, and deactivate templates. |
| Evaluation Assignments | Create assignments, retrieve assignment information, resolve access links, and submit responses. |
| Evaluation Cycles | Retrieve and manage quarterly cycle information. |
| Evaluation Master Sheets | Retrieve consolidated evaluation information and finalized targets. |
| Reporting | Generate evaluation reports and PDF documents. |  The API layer connects the React frontend to workflow logic, persistence, and reporting services.

---

---

## 13. Technology Stack

### Frontend
- React
- Vite
- JavaScript
- Material UI
- React Router

### Backend
- Python
- FastAPI - SQLAlchemy - REST APIs

### Database
- PostgreSQL

### Reporting and integrations
- Playwright - HTML templates
- Email delivery integration

### Deployment
- Vercel — frontend
- Railway — backend

---

---

## 14. Repository Structure  The project is organized into frontend and backend applications.  ```text
flowpilot/ ├── backend/ │   ├── routers/ │   │   ├── evaluation_assignment.py │   │   ├── evaluation_templates.py │   │   └── evaluation_master_sheet.py │   ├── models/ │   ├── schemas/ │   ├── services/ │   │   └── finalized_target_service.py │   ├── utils/ │   │   └── email_service.py │   ├── templates/ │   │   └── pdf/ │   └── main.py │ ├── front end/ │   └── src/ │       ├── pages/ │       ├── services/ │       ├── components/ │       └── workflowDesigner/ │ └── README.md ```  This is a high-level representation of the principal application areas, not an exhaustive listing of every source file.

---

---

## 15. Deployment Architecture  The application uses separate frontend and backend deployments.  ```mermaid
flowchart TB
    B["User's Browser"]
    V["Vercel — React / Vite"]
    R["Railway — FastAPI"]
    P[("PostgreSQL")]
    B --> V
    V -->|"HTTPS REST API requests"| R
    R <--> P
```  The frontend communicates with the FastAPI backend through REST APIs. The backend accesses PostgreSQL for persistent application data.  Deployment environments require the appropriate API URL, database configuration, and service credentials.

---

---

## 16. Engineering Highlights

### Configurable Workflow Architecture Built a configurable evaluation system in which saved workflow definitions determine the components rendered at runtime.

### Multi-Stage Workflow Orchestration Implemented separate Employee, Supervisor, and HR stages with stage-specific response handling and workflow progression.

### Cross-Workflow Data Integration Connected Goal & KPI finalization to Employee Evaluation so finalized performance targets can be reused instead of re-entered.

### Cycle-Aware Performance Data Associated evaluation assignments with quarterly cycles and used cycle information to drive the displayed review period.

### Structured Reporting Built consolidated Master Sheet functionality and PDF rendering from structured evaluation information.

### Full-Stack Integration Worked across React, FastAPI, SQLAlchemy, PostgreSQL, email integrations, and deployment configuration to implement and debug end-to-end business workflows.

---

---

## 17. My Responsibilities  My work on FlowPilot includes:
- Designing and developing the React frontend.
- Building FastAPI backend endpoints.
- Implementing SQLAlchemy database interactions.
- Developing evaluation assignment and workflow logic.
- Building configurable evaluation form components.
- Implementing quarterly evaluation cycle handling.
- Connecting finalized goals and KPIs to Employee Evaluations.
- Implementing stage-specific response handling and validation.
- Developing email notification workflows.
- Building Evaluation Master Sheet functionality.
- Implementing HTML-based PDF reporting.
- Debugging frontend, backend, database, and deployment issues.
- Deploying and maintaining the application using Vercel and Railway.

---

---

## 18. Project Value  FlowPilot demonstrates how a multi-stage business process can be transformed into a centralized, configurable software platform.  The project combines workflow automation, structured data management, configurable interfaces, quarterly performance tracking, notifications, and reporting in an end-to-end application.  It demonstrates practical full-stack engineering across frontend development, API design, database modeling, workflow orchestration, and production deployment.

---

---

## 19. Project Status  FlowPilot is an evolving performance review workflow automation platform.  Its architecture supp
