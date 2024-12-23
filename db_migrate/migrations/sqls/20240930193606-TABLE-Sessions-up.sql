-- Create Sessions Table in the 'auth' schema
CREATE TABLE auth.sessions (
    id TEXT PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL,
    fresh BOOLEAN DEFAULT TRUE
);

-- Create Policies for Sessions
ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can manage their own sessions" ON auth.sessions
    USING (auth.fn_uid() = user_id)
    WITH CHECK (auth.fn_uid() = user_id);

-- Create Indexes for Performance Optimization
CREATE INDEX idx_sessions_user_id ON auth.sessions(user_id);
CREATE INDEX idx_sessions_expires_at ON auth.sessions(expires_at);
