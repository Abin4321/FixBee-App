import { Routes, Route } from "react-router-dom";

/* ROUTE GUARDS */
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import RoleRoute from "./components/RoleRoute.jsx";

/* LAYOUTS */
import UserLayout from "./layouts/UserLayout.jsx";
import WorkerLayout from "./layouts/WorkerLayout.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";

/* ADMIN PAGES */
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Bookings from "./pages/Admin/Bookings.jsx";
import Customers from "./pages/Admin/Customers.jsx";
import Technicians from "./pages/Admin/Technicians.jsx";
import Services from "./pages/Admin/Services.jsx";
import Analytics from "./pages/Admin/Analytics.jsx";
import Messages from "./pages/Admin/Messages.jsx";
import Notifications from "./pages/Admin/Notifications.jsx";
import Settings from "./pages/Admin/Settings.jsx";

/* AUTH PAGES */
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";
import ForgotPassword from "./pages/Auth/ForgotPass.jsx";

/* SHARED PAGES */
import Unauthorized from "./pages/Shared/Unauthorized.jsx";
import NotFound from "./pages/Shared/NotFound.jsx";

/* USER PAGES */
import UserDashboard from "./pages/User/Dashboard.jsx";
import ServicesPage from "./pages/User/Services.jsx";
import UserAnalytics from "./pages/User/Analytics.jsx";
import BookService from "./pages/User/BookService.jsx";
import MyBookings from "./pages/User/MyBookings.jsx";
import BookingSuccess from "./pages/User/BookingSuccess.jsx";
import UserChat from "./pages/User/Chat.jsx";
import UserNotifications from "./pages/User/Notifications.jsx";
import UserProfile from "./pages/User/Profile.jsx";

/* WORKER PAGES */
import WorkerDashboard from "./pages/Worker/Dashboard.jsx";
import TechnicianTasks from "./pages/Worker/TechnicianTasks.jsx";
import WorkerChat from "./pages/Worker/Chat.jsx";
import WorkerNotifications from "./pages/Worker/Notifications.jsx";
import WorkerProfile from "./pages/Worker/Profile.jsx";

function App() {

  return (

    <Routes>

      {/* AUTH ROUTES */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* SHARED */}
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="/*" element={<NotFound />} />

      {/* ================= USER ROUTES ================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute role="customer" />}>

          <Route path="/user" element={<UserLayout />}>

            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="analytics" element={<UserAnalytics />} />
            <Route path="book-service" element={<BookService />} />
            <Route path="mybookings" element={<MyBookings />} />
            <Route path="bookingsuccess" element={<BookingSuccess />} />
            <Route path="chat" element={<UserChat />} />
            <Route path="notifications" element={<UserNotifications />} />
            <Route path="profile" element={<UserProfile />} />

          </Route>

        </Route>
      </Route>

      {/* ================= WORKER ROUTES ================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute role="technician" />}>

          <Route path="/worker" element={<WorkerLayout />}>

            <Route path="dashboard" element={<WorkerDashboard />} />
            <Route path="tasks" element={<TechnicianTasks />} />
            <Route path="chat" element={<WorkerChat />} />
            <Route path="notifications" element={<WorkerNotifications />} />
            <Route path="profile" element={<WorkerProfile />} />

          </Route>

        </Route>
      </Route>

      {/* ================= ADMIN ROUTES ================= */}

      <Route element={<ProtectedRoute />}>
        <Route element={<RoleRoute role="admin" />}>

          <Route path="/admin" element={<AdminLayout />}>

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

        </Route>
      </Route>

      {/* DEFAULT */}
      <Route path="/" element={<Login />} />

    </Routes>

  );

}

export default App;