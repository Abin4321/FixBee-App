import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setBookings(data);
    }
  }

  return (
    <div>
      <h1 className="text-2xl mb-6">Bookings</h1>

      <div className="bg-white/5 border border-white/10 p-6 rounded-xl">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400">
                <th>Service</th>
                <th>Status</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t border-white/10">
                  <td>{booking.service}</td>
                  <td>{booking.status}</td>
                  <td>{booking.user_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}