import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/supabase";
import { getBookingById } from "../../services/bookingService.js";
import { getCurrentUser } from "../../services/auth.js";
import { useLocation } from "react-router-dom";

export default function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Booking ID passed via location.state
    if (!location.state || !location.state.bookingId) {
      navigate("/user/bookings");
      return;
    }
    fetchBooking(location.state.bookingId);
  }, [location, navigate]);

  async function fetchBooking(id) {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select("*, services(name, price)")
        .eq("id", id)
        .single();
      if (error) throw error;
      setBooking(data);
    } catch (err) {
      console.error(err);
      navigate("/user/bookings");
    }
    setLoading(false);
  }

  if (loading)
    return (
      <div className="p-8 text-center">
        <p>Loading booking details...</p>
      </div>
    );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <motion.div
        className="bg-green-50 border-l-4 border-green-500 text-green-700 p-6 rounded-xl shadow-lg text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-3xl font-bold mb-2">🎉 Booking Successful!</h2>
        <p className="mb-4">
          Your service has been booked successfully. Below are the details:
        </p>

        <div className="bg-white rounded-lg shadow p-4 text-left max-w-md mx-auto">
          <p>
            <span className="font-semibold">Service:</span> {booking.services?.name || booking.service}
          </p>
          <p>
            <span className="font-semibold">Date:</span> {booking.service_date}
          </p>
          <p>
            <span className="font-semibold">Time:</span> {booking.service_time}
          </p>
          <p>
            <span className="font-semibold">Address:</span> {booking.address}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ${booking.services?.price || booking.price}
          </p>
          {booking.notes && (
            <p>
              <span className="font-semibold">Notes:</span> {booking.notes}
            </p>
          )}
          <p>
            <span className="font-semibold">Status:</span>{" "}
            <span className="text-blue-600">{booking.status}</span>
          </p>
        </div>

        <motion.button
          onClick={() => navigate("/user/bookings")}
          className="mt-6 px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg font-bold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Go to My Bookings
        </motion.button>
      </motion.div>
    </div>
  );
}