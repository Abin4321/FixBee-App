// src/services/chatService.js
import { supabase } from "./supabase.js";

export async function getMessages(bookingId) {
  const { data, error } = await supabase.from("messages").select("*").eq("booking_id", bookingId).order("created_at", { ascending: true });
  if (error) throw error;
  return data;
}

export async function sendMessage(message) {
  const { data, error } = await supabase.from("messages").insert([message]);
  if (error) throw error;
  return data;
}