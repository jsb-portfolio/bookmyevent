CREATE TABLE venues (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,

    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE VIEW public_venues AS
SELECT
    venues.id,
    venues.name,
    venues.address
FROM venues;

CREATE INDEX idx_venues_user_id ON venues(user_id);