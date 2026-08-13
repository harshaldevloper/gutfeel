-- Run in Supabase SQL editor or: supabase db push
CREATE TABLE IF NOT EXISTS public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  category text NOT NULL DEFAULT 'general'
    CHECK (category IN ('general', 'bug', 'billing', 'feature', 'health')),
  status text NOT NULL DEFAULT 'open'
    CHECK (status IN ('open', 'in_progress', 'answered', 'closed')),
  admin_reply text,
  voice_reply_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS support_tickets_status_idx ON public.support_tickets(status);
CREATE INDEX IF NOT EXISTS support_tickets_email_idx ON public.support_tickets(email);
CREATE INDEX IF NOT EXISTS support_tickets_created_idx ON public.support_tickets(created_at DESC);

ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit support ticket"
  ON public.support_tickets FOR INSERT WITH CHECK (true);

CREATE POLICY "Users read own tickets"
  ON public.support_tickets FOR SELECT
  USING (
    auth.uid() = user_id
    OR lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );

CREATE OR REPLACE FUNCTION public.set_support_ticket_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.set_support_ticket_updated_at();
