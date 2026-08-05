import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import EvaluationTemplates from "../workflowDesigner/pages/EvaluationTemplates";
import MeetingReadiness from "../pages/MeetingReadiness";
import WorkflowDesigner from "../workflowDesigner/pages/WorkflowDesigner";
import WorkflowEditor from "../workflowDesigner/WorkflowEditor";
import EvaluationAssignments from "../pages/EvaluationAssignments";
import EvaluationMasterSheets from "../pages/EvaluationMasterSheets";
import Dashboard from "../pages/Dashboard";
import MasterSheetViewer from "../pages/MasterSheetViewer";
import Templates from "../pages/Templates";
import Employees from "../pages/Employees";
import Supervisors from "../pages/Supervisors";
import Evaluations from "../pages/Evaluations";
import Notifications from "../pages/Notifications";
import MeetingQueue from "../pages/MeetingQueue";
import Analytics from "../pages/Analytics";
import DemoScenarios from "../pages/DemoScenarios";
import ReviewCycles from "../pages/ReviewCycles";
import EvaluationTemplateBuilder from "../pages/EvaluationTemplateBuilder";
import PublicEvaluation from "../pages/PublicEvaluation";
function Layout({ children }) {
  return (
    <MainLayout
      sidebar={<Sidebar />}
      topbar={<Topbar />}
    >
      {children}
    </MainLayout>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Application Routes */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
          path="/evaluation-assignments"
          element={
              <Layout>
                  <EvaluationAssignments />
              </Layout>
          }
      />
      <Route
          path="/master-sheet/:assignmentId"
          element={
              <Layout>
                  <MasterSheetViewer />
              </Layout>
          }
      />
      <Route
          path="/evaluation/:accessToken"
          element={<PublicEvaluation />}
      />
      <Route
          path="/evaluations"
          element={
              <Layout>
                  <Evaluations />
              </Layout>
          }
      />

      <Route
        path="/review-cycles"
        element={
          <Layout>
            <ReviewCycles />
          </Layout>
        }
      />

      <Route
        path="/templates"
        element={
          <Layout>
            <EvaluationTemplates />
          </Layout>
        }
      />
      <Route
          path="/workflow-designer"
          element={
              <Layout>
                  <WorkflowDesigner />
              </Layout>
          }
      />

      <Route
          path="/workflow-editor/:id"
          element={
              <Layout>
                  <WorkflowEditor />
              </Layout>
          }
      />

      <Route
        path="/employees"
        element={
          <Layout>
            <Employees />
          </Layout>
        }
      />
      <Route
          path="/master-sheets"
          element={
              <Layout>
                  <EvaluationMasterSheets />
              </Layout>
          }
      />
      

      <Route
        path="/supervisors"
        element={
          <Layout>
            <Supervisors />
          </Layout>
        }
      />
      <Route
          path="/meeting-readiness"
          element={
              <Layout>
                  <MeetingReadiness />
              </Layout>
          }
      />

      

      <Route
        path="/notifications"
        element={
          <Layout>
            <Notifications />
          </Layout>
        }
      />

      <Route
        path="/meeting-queue"
        element={
          <Layout>
            <MeetingQueue />
          </Layout>
        }
      />

      <Route
        path="/analytics"
        element={
          <Layout>
            <Analytics />
          </Layout>
        }
      />

      <Route
        path="/demo-scenarios"
        element={
          <Layout>
            <DemoScenarios />
          </Layout>
        }
      />
      <Route
          path="/evaluation-templates/:id/builder"
          element={<EvaluationTemplateBuilder />}
      />

      {/* 404 */}
      <Route
        path="*"
        element={
          <Layout>
            <h1>404 - Page Not Found</h1>
          </Layout>
        }
      />
    </Routes>
  );
}