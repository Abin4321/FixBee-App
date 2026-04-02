// src/services/adminService.js
import { supabase } from "./supabase.js";

export async function getDashboardStats() {
  const { data, error } = await supabase.from("bookings").select("*");
  if (error) throw error;
  return data;
}

export async function getRecentBookings() {
  const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(5);
  if (error) throw error;
  return data;
}

export async function getAllBookings() {
  const { data, error } = await supabase.from("bookings").select("*");
  if (error) throw error;
  return data;
}

export async function getAllCustomers() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "customer");   // ✅ FIXED

  if (error) throw error;
  return data;
}

export async function getAllTechnicians() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "technician");   // ✅ FIXED

  if (error) throw error;
  return data;
}

export async function getAllServices() {
  const { data, error } = await supabase.from("services").select("*");
  if (error) throw error;
  return data;
}

export async function addService(service) {
  const { data, error } = await supabase.from("services").insert([service]);
  if (error) throw error;
  return data;
}