// src/pages/User/BookService.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { getAllServices } from "../../services/adminService.js";
import { createBooking } from "../../services/bookingService.js";
import { getCurrentUser } from "../../services/auth.js";

export default function BookService() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState("");
  const [serviceDate, setServiceDate] = useState("");
  const [serviceTime, setServiceTime] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch services from Supabase
  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("active", true)
        .order("name", { ascending: true });

      if (error) throw error;
      setServices(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load services");
    }
    setLoading(false);
  }

  // Handle booking submission
  async function handleSubmit(e) {
    e.preventDefault();
    if (!selectedService || !serviceDate || !serviceTime || !address) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) throw new Error("User not logged in");

      const { data, error } = await supabase
        .from("bookings")
        .insert([
          {
            user_id: userData.user.id,
            service: services.find((s) => s.id === selectedService)?.name,
            service_date: serviceDate,
            service_time: serviceTime,
            price: services.find((s) => s.id === selectedService)?.price,
            address,
            notes,
            status: "pending",
            paid: false,
          },
        ]);

      if (error) throw error;

      // Clear form
      setSelectedService("");
      setServiceDate("");
      setServiceTime("");
      setAddress("");
      setNotes("");

      toast.success("Service booked successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to book service");
    }
    setSubmitting(false);
  }

  if (loading) return <p className="p-4">Loading services...</p>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.h2
        className="text-3xl font-bold text-center mb-8 text-gradient"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Book a Service
      </motion.h2>

      <motion.form
        className="bg-white rounded-xl shadow-lg p-6 space-y-6"
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Service Selection */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Select Service <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">-- Choose a service --</option>
            {services.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} (${s.price})
              </option>
            ))}
          </select>
        </div>

        {/* Service Date */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Service Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={serviceDate}
            onChange={(e) => setServiceDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Service Time */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Service Time <span className="text-red-500">*</span>
          </label>
          <input
            type="time"
            value={serviceTime}
            onChange={(e) => setServiceTime(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Address <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Notes */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">Additional Notes</label>
          <textarea
            placeholder="Any extra info..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <motion.button
            type="submit"
            className={`px-8 py-3 font-bold text-white rounded-lg shadow-lg ${
              submitting ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            whileHover={{ scale: submitting ? 1 : 1.05 }}
            whileTap={{ scale: submitting ? 1 : 0.95 }}
            disabled={submitting}
          >
            {submitting ? "Booking..." : "Book Service"}
          </motion.button>
        </div>
      </motion.form>

      {/* Services Preview */}
      <motion.div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4 text-center">Available Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {services.map((s) => (
            <motion.div
              key={s.id}
              className="p-4 border rounded-xl shadow hover:shadow-lg transition-all duration-300"
              whileHover={{ scale: 1.03 }}
            >
              <h4 className="text-lg font-bold">{s.name}</h4>
              <p className="text-gray-600 mt-1">${s.price}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}