-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    steam_profile_url VARCHAR(255),
    participation_count INTEGER DEFAULT 0,
    role VARCHAR(50) DEFAULT 'user'
);

-- Create cheaters table (sans video_url)
CREATE TABLE cheaters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    steam_profile_url VARCHAR(255) NOT NULL,
    complaint_count INTEGER DEFAULT 0,
    status VARCHAR(50) DEFAULT 'pending'
);

-- Create complaints table
CREATE TABLE complaints (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    cheater_id UUID REFERENCES cheaters(id) ON DELETE SET NULL,
    video_url VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    priority VARCHAR(50) DEFAULT 'medium',
    created_at TIMESTAMP DEFAULT NOW()
);
-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_cheaters_steam_url ON cheaters(steam_profile_url);
CREATE INDEX idx_cheaters_status ON cheaters(status);
CREATE INDEX idx_complaints_user_id ON complaints(user_id);
CREATE INDEX idx_complaints_cheater_id ON complaints(cheater_id);
CREATE INDEX idx_complaints_status ON complaints(status);
CREATE INDEX idx_complaints_priority ON complaints(priority);