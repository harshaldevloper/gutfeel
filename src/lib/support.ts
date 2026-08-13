import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { SupportCategory } from "@/lib/support-types";

export type { SupportCategory } from "@/lib/support-types";

/** Submit support ticket directly to Supabase (works on web + same API as mobile app). */
export async function submitSupportTicket(input: {
  email: string;
  subject: string;
  message: string;
  category: SupportCategory;
  user_id?: string;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    return { ok: false, error: "Support is temporarily unavailable" };
  }

  const { data, error } = await supabase
    .from("support_tickets")
    .insert({
      email: input.email.trim().toLowerCase(),
      subject: input.subject.trim(),
      message: input.message.trim(),
      category: input.category,
      user_id: input.user_id ?? null,
      status: "open",
    })
    .select("id")
    .single();

  if (error) return { ok: false, error: error.message };
  return { ok: true, id: data?.id };
}
