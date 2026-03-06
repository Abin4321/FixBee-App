import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const cards = [
    { title: "Total Bookings", route: "/admin/bookings" },
    { title: "Customers", route: "/admin/customers" },
    { title: "Analytics", route: "/admin/analytics" },
  ];

  return (
    <div>

      <h1 className="text-3xl font-semibold mb-2">
        Admin Dashboard
      </h1>
      <p className="text-gray-400 mb-10">
        {time.toLocaleString()}
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(card.route)}
            className="cursor-pointer bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl"
          >
            <h2 className="text-lg">{card.title}</h2>
          </motion.div>
        ))}
      </div>

    </div>
  );
}