import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/adminService";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const data = await getDashboardStats();
      setStats(data);
    }
    load();
  }, []);

  const cards = [
    {
      title: "Bookings",
      value: stats.bookings || 0,
      route: "/admin/bookings",
    },
    {
      title: "Customers",
      value: stats.customers || 0,
      route: "/admin/customers",
    },
    {
      title: "Technicians",
      value: stats.technicians || 0,
      route: "/admin/analytics",
    },
  ];

  return (
    <div className="relative">

      <h1 className="text-3xl font-semibold mb-10">
        Admin Overview
      </h1>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl transition"
          >
            <h2 className="text-lg text-gray-400">
              {card.title}
            </h2>
            <p className="text-4xl font-bold mt-4">
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

    </div>
  );
}