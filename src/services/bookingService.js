// src/services/bookingService.js
import { supabase } from "./supabase.js";

export async function getUserBookings(userId) {
  const { data, error } = await supabase.from("bookings").select("*").eq("user_id", userId);
  if (error) throw error;
  return data;
}

export async function getBookingById(bookingId) {
  const { data, error } = await supabase.from("bookings").select("*").eq("id", bookingId).single();
  if (error) throw error;
  return data;
}

export async function createBooking(booking) {
  const { data, error } = await supabase.from("bookings").insert([booking]);
  if (error) throw error;
  return data;
}