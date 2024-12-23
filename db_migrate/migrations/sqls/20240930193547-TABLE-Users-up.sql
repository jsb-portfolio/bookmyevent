-- Create 'auth' Schema 
CREATE SCHEMA IF NOT EXISTS auth;

-- USERS TABLE
--  Create Users Table under the 'auth' schema
CREATE TABLE auth.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    avatar_url TEXT,

    hashed_password TEXT,

    email_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT email_valid CHECK (position('@' in email) > 0),  -- Ensure email is valid
    CONSTRAINT username_valid CHECK (char_length(username) >= 5)  -- non-empty username
);

-- Function auth.uid()
CREATE OR REPLACE FUNCTION auth.fn_uid()
    RETURNS UUID AS $$
    BEGIN
        RETURN current_setting('fn_uid')::UUID;
    END;
    $$ LANGUAGE plpgsql;

-- Enable Row-Level Security (RLS) for Users Table
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
-- Policy: Users can only select and update their own records
CREATE POLICY "Users can select and update their own accounts/profiles" ON auth.users
    USING (auth.fn_uid() = id)
    WITH CHECK (auth.fn_uid() = id);


-- PUBLIC_PROFILES VIEW
-- Create a view for public access that hides user_id
CREATE VIEW auth.public_profiles AS
    SELECT username, avatar_url
    FROM auth.users;
-- Grant SELECT access to the public_profiles view
GRANT SELECT ON auth.public_profiles TO PUBLIC;


-- Create Indexes for Performance Optimization
CREATE INDEX idx_users_email ON auth.users(email);
CREATE INDEX idx_users_username ON auth.users(username);
