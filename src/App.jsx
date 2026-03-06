import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TechnicianTasks from "./pages/TechnicianTasks";
import BookService from "./pages/BookService";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import BookingSuccess from "./pages/BookingSuccess";
import Notifications from "./pages/Notifications";
import Chat from "./pages/Chat";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleRoute from "./components/RoleRoute";

/* ADMIN MODULE */
import AdminLayout from "./pages/Admin/AdminLayout";
import AdminDashboard from "./pages/Admin/Dashboard";
import AdminBookings from "./pages/Admin/Bookings";
import AdminCustomers from "./pages/Admin/Customers";
import AdminAnalytics from "./pages/Admin/Analytics";
import AdminSettings from "./pages/Admin/Settings";

export default function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Login />} />

      {/* CUSTOMER ROUTES */}
      <Route
        path="/dashboard"
        element={
          <RoleRoute allowed={["customer"]}>
            <Dashboard />
          </RoleRoute>
        }
      />

      <Route path="/book" element={<ProtectedRoute><BookService /></ProtectedRoute>} />
      <Route path="/bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/chat/:bookingId" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
      <Route path="/booking-success" element={<ProtectedRoute><BookingSuccess /></ProtectedRoute>} />

      {/* ADMIN MODULE */}
      <Route
        path="/admin/*"
        element={
          <RoleRoute allowed={["admin"]}>
            <AdminLayout />
          </RoleRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="customers" element={<AdminCustomers />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* TECHNICIAN */}
      <Route
        path="/tasks"
        element={
          <RoleRoute allowed={["technician"]}>
            <TechnicianTasks />
          </RoleRoute>
        }
      />

    </Routes>
  );
}