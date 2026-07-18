import { Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";
import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";

import Dashboard from "../pages/Dashboard";
import ReviewCycles from "../pages/ReviewCycles";
import Templates from "../pages/Templates";
import Employees from "../pages/Employees";
import Supervisors from "../pages/Supervisors";
import Reviews from "../pages/Reviews";
import Notifications from "../pages/Notifications";
import MeetingQueue from "../pages/MeetingQueue";
import Analytics from "../pages/Analytics";
import DemoScenarios from "../pages/DemoScenarios";

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
            <Templates />
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
        path="/supervisors"
        element={
          <Layout>
            <Supervisors />
          </Layout>
        }
      />

      <Route
        path="/reviews"
        element={
          <Layout>
            <Reviews />
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