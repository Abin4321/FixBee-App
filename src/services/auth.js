// src/services/auth.js
import { supabase } from "./supabase.js";

// LOGIN
export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data.user;
}

// SIGN UP
export async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });
  if (error) throw error;
  return data.user;
}

// RESET PASSWORD
export async function sendPasswordResetEmail(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
  return data;
}

// GET CURRENT USER (SESSION)
export function getCurrentUser() {
  return supabase.auth.getUser();
}

// LOGOUT
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// GET PROFILE (needed by AuthContext.jsx)
export async function getProfile(user) {
  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) throw error;
  return data;
}