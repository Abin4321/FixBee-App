// src/services/workerService.js
import { supabase } from "./supabase.js";

export async function getWorkerBookings(workerId) {
  const { data, error } = await supabase.from("bookings").select("*").eq("technician_id", workerId);
  if (error) throw error;
  return data;
}

export async function updateBookingStatus(bookingId, status) {
  const { data, error } = await supabase.from("bookings").update({ status }).eq("id", bookingId);
  if (error) throw error;
  return data;
}