-- Drop indexes
DROP INDEX IF EXISTS idx_users_email;
DROP INDEX IF EXISTS idx_users_username;

-- Drop the public_profiles view
DROP VIEW IF EXISTS auth.public_profiles;

-- Drop the Row-Level Security policy on the users table
DROP POLICY IF EXISTS "Users can select and update their own accounts/profiles" ON auth.users;

-- Drop the auth.uid() function
DROP FUNCTION IF EXISTS auth.fn_uid();

-- Drop the users table
DROP TABLE IF EXISTS auth.users CASCADE;

-- Drop Schema auth
DROP SCHEMA IF EXISTS auth CASCADE;