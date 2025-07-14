-- Clear existing data to prevent conflicts
TRUNCATE TABLE "complaints", "cheaters", "users" RESTART IDENTITY CASCADE;

-- Insert test users based on the new schema
INSERT INTO "users" (id, email, username, name, steam_profile_url, steam_id, participation_count, role, "emailVerified", image, "createdAt", "updatedAt") VALUES
('clxoy85ex000010yohze975cd', 'admin@counter-cheater.com', 'AdminUser', 'Admin User', 'https://steamcommunity.com/id/adminuser/', '76561197960287930', 15, 'admin', true, 'https://i.pravatar.cc/150?u=admin', NOW() - INTERVAL '30 day', NOW() - INTERVAL '1 day'),
('clxoy85ex000110yohqabc123', 'john.doe@email.com', 'JohnDoe_CS', 'John Doe', 'https://steamcommunity.com/id/johndoe/', '76561197960287931', 8, 'user', true, 'https://i.pravatar.cc/150?u=john', NOW() - INTERVAL '25 day', NOW() - INTERVAL '5 day'),
('clxoy85ex000210yohtest456', 'alice.smith@email.com', 'AliceSmith', 'Alice Smith', 'https://steamcommunity.com/id/alicesmith/', '76561197960287932', 12, 'user', false, 'https://i.pravatar.cc/150?u=alice', NOW() - INTERVAL '20 day', NOW() - INTERVAL '2 day'),
('clxoy85ex000310yohmod789', 'moderator@counter-cheater.com', 'ModeratorPro', 'Moderator Pro', 'https://steamcommunity.com/id/modpro/', '76561197960287933', 25, 'moderator', true, 'https://i.pravatar.cc/150?u=moderator', NOW() - INTERVAL '15 day', NOW() - INTERVAL '3 day'),
('clxoy85ex000410yohrep101', 'reporter@email.com', 'ReporterGamer', 'Reporter Gamer', 'https://steamcommunity.com/id/reporter/', '76561197960287934', 3, 'user', true, 'https://i.pravatar.cc/150?u=reporter', NOW() - INTERVAL '10 day', NOW() - INTERVAL '4 day');

-- Insert test cheaters
INSERT INTO "cheaters" (id, steam_profile_url, complaint_count, status) VALUES
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c51', 'https://steamcommunity.com/id/suspect_player1/', 5, 'confirmed'),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c52', 'https://steamcommunity.com/id/wallhacker_pro/', 8, 'confirmed'),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c53', 'https://steamcommunity.com/id/aimbotter123/', 3, 'pending'),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c54', 'https://steamcommunity.com/id/suspicious_guy/', 2, 'under_review'),
('8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c55', 'https://steamcommunity.com/id/speedhacker/', 1, 'rejected');

-- Insert test complaints with correct foreign keys
INSERT INTO "complaints" (id, user_id, cheater_id, video_url, description, status, priority, created_at) VALUES
('comp001', 'clxoy85ex000110yohqabc123', '8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c51', 'https://youtube.com/watch?v=evidence1', 'Clear wallhack usage on Dust2.', 'resolved', 'high', NOW() - INTERVAL '20 day'),
('comp002', 'clxoy85ex000210yohtest456', '8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c51', 'https://youtube.com/watch?v=evidence2', 'Impossible flick shots.', 'resolved', 'medium', NOW() - INTERVAL '19 day'),
('comp003', 'clxoy85ex000410yohrep101', '8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c52', 'https://youtube.com/watch?v=evidence3', 'Aimbot detected.', 'in-progress', 'high', NOW() - INTERVAL '18 day'),
('comp004', 'clxoy85ex000110yohqabc123', '8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c53', 'https://youtube.com/watch?v=evidence4', 'Spinbot and rage hacking.', 'pending', 'high', NOW() - INTERVAL '17 day'),
('comp005', 'clxoy85ex000310yohmod789', '8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c54', 'https://youtube.com/watch?v=evidence5', 'Speed hacking and bhop scripts.', 'pending', 'low', NOW() - INTERVAL '16 day'),
('comp006', 'clxoy85ex000010yohze975cd', '8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c55', 'https://youtube.com/watch?v=evidence6', 'Wallhack on Mirage.', 'resolved', 'medium', NOW() - INTERVAL '15 day'),
('comp007', 'clxoy85ex000110yohqabc123', '8a1b2c3d-4e5f-6a7b-8c9d-0e1f2a3b4c52', 'https://youtube.com/watch?v=evidence7', 'Triggerbot, fires instantly.', 'in-progress', 'high', NOW() - INTERVAL '14 day');