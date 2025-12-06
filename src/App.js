import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import AuthTabs from "./components/auth/AuthTabs";
import JobDetails from "./pages/JobDetails";

// Admin
import AdminDashboard from "./components/admin/AdminDashboard";

// HR Modules
import ApplicationsList from "./components/hr/ApplicationsList";
import OfferForm from "./components/hr/OfferForm";
import InterviewScheduler from "./components/hr/InterviewScheduler";
import CandidatePipeline from "./components/hr/CandidatePipeline";
import OfferDashboard from "./components/hr/OfferDashboard";
import EmployeeDirectory from "./components/hr/EmployeeDirectory";
import AttendanceDashboard from "./components/hr/AttendanceDashboard";
import HRDashboard from "./components/hr/HRDashboard"
import ReactTraining from "./pages/ReactTraining"
import HRDemoPage from "./pages/HRDemoPage"
import CreateJob from "./components/hr/jobs/CreateJob";
import JobList from "./components/hr/jobs/JobList";
import EditJob from "./components/hr/jobs/EditJob";
import CandidateList from "./components/hr/CandidateList"

// User
import UserDashboard from "./components/user/UserDashboard";
import JobOpening from './components/user/ApplicationsList';
import Jobs from './components/user/Jobs';
import JobStatus from './components/user/JobStatus';
import ApplyJob from "./components/user/ApplyJob"

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <NavBar />

          <main className="container mt-5 pt-4">


            <Routes>
              <Route
                path="/job/:id"
                element={
                  <ProtectedRoute>
                    <JobDetails />
                  </ProtectedRoute>
                }
              />

              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<AuthTabs />} />
              <Route path="/training" element={<ReactTraining />} />
              <Route path="/demo" element={<HRDemoPage />} />


              {/* USER Dashboard */}
              <Route
                path="/user/dashboard"
                element={
                  <ProtectedRoute requiredRole="user">
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/user/apply/:id" element={<ProtectedRoute requiredRole="user">  <ApplyJob /></ProtectedRoute>} />
              <Route path="/user/job/open" element={<ProtectedRoute requiredRole="user"> <JobOpening /> </ProtectedRoute>} />
              <Route path="/user/jobs" element={<ProtectedRoute requiredRole="user"> <Jobs /> </ProtectedRoute>} />
              <Route path="/user/status" element={<ProtectedRoute requiredRole="user"> <JobStatus /> </ProtectedRoute>} />

              {/* ADMIN ROUTES */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* HR ROUTES */}
              <Route
                path="/hr/dashboard"
                element={
                  <ProtectedRoute requiredRole="hr">
                    <HRDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hr/offer"
                element={
                  <ProtectedRoute requiredRole="hr">
                    <CandidateList />
                  </ProtectedRoute>
                }
              />
              <Route path="/hr/create-job" element={<ProtectedRoute requiredRole="hr"> <CreateJob /> </ProtectedRoute>} />
              <Route path="/hr/jobs" element={<ProtectedRoute requiredRole="hr"> <JobList /> </ProtectedRoute>} />
              <Route path="/hr/edit-job/:id" element={<ProtectedRoute requiredRole="hr"> <EditJob /> </ProtectedRoute>} />
              <Route
                path="/hr/applications"
                element={
                  <ProtectedRoute requiredRole="hr">
                    <ApplicationsList />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/hr/offer/:id"
                element={
                  <ProtectedRoute requiredRole="hr">
                    <OfferForm />
                  </ProtectedRoute>
                }
              />
              {/* HR Dashboards */}
              <Route
                path="/hr/interviews"
                element={
                  <ProtectedRoute requiredRole="hr">
                    <InterviewScheduler />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/hr/pipeline"
                element={
                  <ProtectedRoute requiredRole="hr">
                    <CandidatePipeline />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/hr/offers"
                element={
                  <ProtectedRoute requiredRole="hr">
                    <OfferDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/hr/employees"
                element={
                  <ProtectedRoute requiredRole="hr">
                    <EmployeeDirectory />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/hr/attendance"
                element={
                  <ProtectedRoute requiredRole="hr">
                    <AttendanceDashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />

            </Routes>

          </main>

          <Footer />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
