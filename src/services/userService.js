// src/services/userService.js
import { supabase } from "./supabase";

// Fetch user profile
export async function getUserProfile(userId) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
  return data;
}

// Update user profile
export async function updateUserProfile(userId, profileData) {
  const { data, error } = await supabase
    .from("profiles")
    .update(profileData)
    .eq("id", userId);

  if (error) {
    console.error("Error updating profile:", error);
    return null;
  }
  return data[0];
}