import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://njnluxdbvpccsawgdzxw.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qbmx1eGRidnBjY3Nhd2dkenh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0NTQwMjgsImV4cCI6MjEwMjAzMDAyOH0.fWI2XWRHZ4V-e28eBdjO1z36aptIx_Bx6DrGE_ZEqo8";

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabase);
}

export async function signUp(email: string, password: string) {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  if (!supabase) return { error: new Error("Supabase not configured") };
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getUser() {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

export async function joinWaitlist(email: string) {
  if (!supabase) return { error: new Error("Supabase not configured") };
  const { error } = await supabase.from("waitlist").insert({ email: email.trim().toLowerCase() });
  return { error };
}

export async function saveSymptom(entry: {
  user_id: string;
  severity: number;
  symptoms: string[];
  bowel_movement: string;
  stress_level: number;
  foods: string[];
  notes?: string;
}) {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };
  const { data, error } = await supabase.from("symptoms").insert(entry).select().single();
  return { data, error };
}

export async function getSymptoms(userId: string) {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };
  const { data, error } = await supabase
    .from("symptoms")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return { data, error };
}

export async function syncSymptomsToCloud(
  userId: string,
  entries: Array<{
    severity: number;
    symptoms: string[];
    bowel: string;
    stress: number;
    foods: string[];
    createdAt: string;
  }>
) {
  if (!supabase || entries.length === 0) return { error: null };
  const rows = entries.map(e => ({
    user_id: userId,
    severity: e.severity,
    symptoms: e.symptoms,
    bowel_movement: e.bowel,
    stress_level: e.stress,
    foods: e.foods,
    created_at: e.createdAt,
  }));
  const { error } = await supabase.from("symptoms").upsert(rows, { onConflict: "id", ignoreDuplicates: true });
  return { error };
}

export async function getSubscription(userId: string) {
  if (!supabase) return { data: null, error: new Error("Supabase not configured") };
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .eq("status", "active")
    .maybeSingle();
  return { data, error };
}

export async function getStreak(userId: string) {
  if (!supabase) return 0;
  const { data } = await supabase
    .from("symptoms")
    .select("created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(30);

  if (!data || data.length === 0) return 0;

  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < data.length; i++) {
    const entryDate = new Date(data[i].created_at);
    entryDate.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today.getTime() - entryDate.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === i) streak++;
    else break;
  }
  return streak;
}
