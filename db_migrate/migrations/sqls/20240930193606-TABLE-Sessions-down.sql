-- Drop indexes
DROP INDEX IF EXISTS idx_sessions_user_id;
DROP INDEX IF EXISTS idx_sessions_expires_at;

-- Drop the Row-Level Security policy on the sessions table
DROP POLICY IF EXISTS "Users can manage their own sessions" ON auth.sessions;

-- Drop the sessions table
DROP TABLE IF EXISTS auth.sessions CASCADE;
