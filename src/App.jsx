import { Routes, Route } from "react-router-dom";

// Admin pages
import AdminLayout from "./pages/Admin/AdminLayout.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Bookings from "./pages/Admin/Bookings.jsx";
import Customers from "./pages/Admin/Customers.jsx";
import Technicians from "./pages/Admin/Technicians.jsx";
import Services from "./pages/Admin/Services.jsx";
import Analytics from "./pages/Admin/Analytics.jsx";
import Messages from "./pages/Admin/Messages.jsx";
import Notifications from "./pages/Admin/Notifications.jsx";
import Settings from "./pages/Admin/Settings.jsx";

// Auth pages
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPass.jsx";

// Shared pages
import Loading from "./pages/Shared/Loading.jsx";
import Unauthorized from "./pages/Shared/Unauthorized.jsx";
import NotFound from "./pages/Shared/NotFound.jsx";

// User pages
import UserDashboard from "./pages/User/Dashboard.jsx";
import ServicesPage from "./pages/User/Services.jsx";
import BookService from "./pages/User/BookService.jsx";
import MyBookings from "./pages/User/MyBookings.jsx";
import BookingSuccess from "./pages/User/BookingSuccess.jsx";
import UserChat from "./pages/User/Chat.jsx";
import UserNotifications from "./pages/User/Notifications.jsx";
import UserProfile from "./pages/User/Profile.jsx";

// Worker pages
import WorkerDashboard from "./pages/Worker/Dashboard.jsx";
import TechnicianTasks from "./pages/Worker/TechnicianTasks.jsx";
import WorkerChat from "./pages/Worker/Chat.jsx";
import WorkerNotifications from "./pages/Worker/Notifications.jsx";
import WorkerProfile from "./pages/Worker/Profile.jsx";

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Shared */}
      <Route path="/loading" element={<Loading />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/not-found" element={<NotFound />} />

      {/* User Routes */}
      <Route path="/user/dashboard" element={<UserDashboard />} />
      <Route path="/user/services" element={<ServicesPage />} />
      <Route path="/user/book-service" element={<BookService />} />
      <Route path="/user/mybookings" element={<MyBookings />} />
      <Route path="/user/bookingsuccess" element={<BookingSuccess />} />
      <Route path="/user/chat" element={<UserChat />} />
      <Route path="/user/notifications" element={<UserNotifications />} />
      <Route path="/user/profile" element={<UserProfile />} />

      {/* Worker Routes */}
      <Route path="/worker/dashboard" element={<WorkerDashboard />} />
      <Route path="/worker/tasks" element={<TechnicianTasks />} />
      <Route path="/worker/chat" element={<WorkerChat />} />
      <Route path="/worker/notifications" element={<WorkerNotifications />} />
      <Route path="/worker/profile" element={<WorkerProfile />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="bookings" element={<Bookings />} />
        <Route path="customers" element={<Customers />} />
        <Route path="technicians" element={<Technicians />} />
        <Route path="services" element={<Services />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="messages" element={<Messages />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      {/* Catch all */}
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;