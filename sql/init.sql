-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    steam_profile_url VARCHAR(255),
    participation_count INTEGER DEFAULT 0,
    role VARCHAR(50) DEFAULT 'user'
);

-- Create cheaters table
CREATE TABLE cheaters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    steam_profile_url VARCHAR(255) NOT NULL,
    video_url VARCHAR(255),
    complaint_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending'
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_cheaters_steam_url ON cheaters(steam_profile_url);
CREATE INDEX idx_cheaters_status ON cheaters(status);