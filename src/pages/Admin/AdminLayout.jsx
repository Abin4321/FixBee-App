import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminLayout() {
  const [open, setOpen] = useState(true);

  return (
    <div className="relative flex min-h-screen text-white overflow-hidden">

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]" />

      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/30 blur-[180px] rounded-full top-[-200px] left-[-200px] animate-pulse" />
        <div className="absolute w-[500px] h-[500px] bg-purple-600/30 blur-[180px] rounded-full bottom-[-200px] right-[-200px] animate-pulse" />
      </div>

      {/* Sidebar */}
      <motion.div
        animate={{ width: open ? 240 : 80 }}
        transition={{ duration: 0.3 }}
        className="bg-black/30 backdrop-blur-xl border-r border-white/10 p-5"
      >
        <button
          onClick={() => setOpen(!open)}
          className="mb-8 text-gray-400 hover:text-white transition"
        >
          ☰
        </button>

        <nav className="space-y-5 text-sm">
          <NavLink to="/admin" end className="block hover:text-indigo-400">
            Dashboard
          </NavLink>
          <NavLink to="/admin/bookings" className="block hover:text-indigo-400">
            Bookings
          </NavLink>
          <NavLink to="/admin/customers" className="block hover:text-indigo-400">
            Customers
          </NavLink>
          <NavLink to="/admin/analytics" className="block hover:text-indigo-400">
            Analytics
          </NavLink>
          <NavLink to="/admin/settings" className="block hover:text-indigo-400">
            Settings
          </NavLink>
        </nav>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}