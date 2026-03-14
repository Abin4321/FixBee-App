// src/services/notification.js
import { supabase } from "./supabase.js";

export async function getNotifications(userId) {
  const { data, error } = await supabase.from("notifications").select("*").eq("user_id", userId);
  if (error) throw error;
  return data;
}

export async function markAsRead(notificationId) {
  const { data, error } = await supabase.from("notifications").update({ is_read: true }).eq("id", notificationId);
  if (error) throw error;
  return data;
}