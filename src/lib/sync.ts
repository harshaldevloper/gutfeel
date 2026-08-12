import { getUser, syncSymptomsToCloud } from "./supabase";
import { loadEntries } from "./storage";

/** Push local symptom logs to Supabase when user is signed in. */
export async function syncLocalDataToCloud(): Promise<{ synced: boolean; error?: string }> {
  const user = await getUser();
  if (!user) return { synced: false };

  const entries = await loadEntries();
  if (entries.length === 0) return { synced: false };

  const { error } = await syncSymptomsToCloud(
    user.id,
    entries.map(e => ({
      severity: e.severity,
      symptoms: e.symptoms,
      bowel: e.bowel,
      stress: e.stress,
      foods: e.foods,
      createdAt: e.createdAt,
    }))
  );

  if (error) return { synced: false, error: error.message };
  return { synced: true };
}
