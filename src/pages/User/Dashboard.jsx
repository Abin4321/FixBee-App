import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";
import { motion } from "framer-motion";

import { getUserBookings } from "../../services/bookingService.js";
import { getCurrentUser } from "../../services/auth.js";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    paid: 0
  });

  const [bookings, setBookings] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* -----------------------------
     GET USER
  ------------------------------*/

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {

    const { data } = await supabase.auth.getUser();

    if (data.user) {
      setUser(data.user);
      fetchBookings(data.user.id);
    }

  }

  /* -----------------------------
     FETCH BOOKINGS
  ------------------------------*/

  async function fetchBookings(userId) {

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setBookings(data);

    calculateStats(data);
    prepareChart(data);

    setLoading(false);
  }

  /* -----------------------------
     CALCULATE STATS
  ------------------------------*/

  function calculateStats(data) {

    const total = data.length;

    const pending = data.filter(
      (b) => b.status === "pending"
    ).length;

    const completed = data.filter(
      (b) => b.status === "completed"
    ).length;

    const paid = data.filter(
      (b) => b.paid === true
    ).length;

    setStats({
      total,
      pending,
      completed,
      paid
    });

  }

  /* -----------------------------
     PREPARE CHART DATA
  ------------------------------*/

  function prepareChart(data) {

    const grouped = {};

    data.forEach((b) => {

      const date = b.service_date;

      if (!grouped[date]) {
        grouped[date] = 0;
      }

      grouped[date]++;

    });

    const formatted = Object.keys(grouped).map((date) => ({
      date,
      bookings: grouped[date]
    }));

    setChartData(formatted);

  }

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 space-y-10">

      {/* HEADER */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-between items-center"
      >

        <div>
          <h1 className="text-3xl font-bold">
            Welcome back 👋
          </h1>
          <p className="text-gray-500">
            Manage your bookings and services
          </p>
        </div>

      </motion.div>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <StatCard
          title="Total Bookings"
          value={stats.total}
          color="blue"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          color="yellow"
        />

        <StatCard
          title="Completed"
          value={stats.completed}
          color="green"
        />

        <StatCard
          title="Paid"
          value={stats.paid}
          color="purple"
        />

      </div>

      {/* CHART */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Booking Activity
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={chartData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="bookings"
              stroke="#3B82F6"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* BOOKINGS LIST */}

      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Recent Bookings
        </h2>

        <div className="space-y-4">

          {bookings.slice(0,5).map((b) => (

            <div
              key={b.id}
              className="flex justify-between items-center border p-4 rounded-lg"
            >

              <div>

                <p className="font-semibold">
                  {b.service}
                </p>

                <p className="text-sm text-gray-500">
                  {b.service_date} • {b.service_time}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold">
                  ₹{b.price}
                </p>

                <span className={`text-xs px-2 py-1 rounded
                  ${b.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"}
                `}>

                  {b.status}

                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

/* -----------------------------
   STAT CARD COMPONENT
------------------------------*/

function StatCard({ title, value, color }) {

  const colors = {
    blue: "bg-blue-100 text-blue-700",
    yellow: "bg-yellow-100 text-yellow-700",
    green: "bg-green-100 text-green-700",
    purple: "bg-purple-100 text-purple-700"
  };

  return (

    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-6 rounded-xl shadow ${colors[color]}`}
    >

      <p className="text-sm">{title}</p>

      <h2 className="text-3xl font-bold">
        {value}
      </h2>

    </motion.div>

  );

}