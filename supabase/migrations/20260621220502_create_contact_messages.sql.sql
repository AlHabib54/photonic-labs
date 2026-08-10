CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "insert_contact_messages" ON contact_messages
  FOR INSERT TO anon WITH CHECK (true);

CREATE INDEX contact_messages_created_at_idx ON contact_messages (created_at DESC);
