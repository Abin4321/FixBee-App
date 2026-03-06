import { supabase } from "./supabase";

export async function getDashboardStats() {
  const { count: bookings } = await supabase
    .from("bookings")
    .select("*", { count: "exact", head: true });

  const { count: customers } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "customer");

  const { count: technicians } = await supabase
    .from("users")
    .select("*", { count: "exact", head: true })
    .eq("role", "technician");

  return { bookings, customers, technicians };
}

export async function getAllBookings() {
  const { data } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  return data;
}

export async function getAllCustomers() {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("role", "customer");

  return data;
}