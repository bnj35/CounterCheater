-- script pour tester les routes de l'API avec des données

-- Insert test users
INSERT INTO users (id, email, username, steam_profile_url, participation_count, role) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'admin@counter-cheater.com', 'AdminUser', 'https://steamcommunity.com/id/adminuser/', 15, 'admin'),
('550e8400-e29b-41d4-a716-446655440002', 'john.doe@email.com', 'JohnDoe_CS', 'https://steamcommunity.com/id/johndoe/', 8, 'user'),
('550e8400-e29b-41d4-a716-446655440003', 'alice.smith@email.com', 'AliceSmith', 'https://steamcommunity.com/id/alicesmith/', 12, 'user'),
('550e8400-e29b-41d4-a716-446655440004', 'moderator@counter-cheater.com', 'ModeratorPro', 'https://steamcommunity.com/id/modpro/', 25, 'moderator'),
('550e8400-e29b-41d4-a716-446655440005', 'reporter@email.com', 'ReporterGamer', 'https://steamcommunity.com/id/reporter/', 3, 'user');

-- Insert test cheaters
INSERT INTO cheaters (id, steam_profile_url, complaint_count, status) VALUES
('660e8400-e29b-41d4-a716-446655440001', 'https://steamcommunity.com/id/suspect_player1/', 5, 'confirmed'),
('660e8400-e29b-41d4-a716-446655440002', 'https://steamcommunity.com/id/wallhacker_pro/', 8, 'confirmed'),
('660e8400-e29b-41d4-a716-446655440003', 'https://steamcommunity.com/id/aimbotter123/', 3, 'pending'),
('660e8400-e29b-41d4-a716-446655440004', 'https://steamcommunity.com/id/suspicious_guy/', 2, 'under_review'),
('660e8400-e29b-41d4-a716-446655440005', 'https://steamcommunity.com/id/speedhacker/', 1, 'rejected');

-- Insert test complaints
INSERT INTO complaints (id, user_id, cheater_id, video_url, description, created_at) VALUES
('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 'https://youtube.com/watch?v=evidence1', 'Clear wallhack usage on Dust2, tracks enemies through walls consistently', '2024-01-15 10:30:00'),
('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440001', 'https://youtube.com/watch?v=evidence2', 'Impossible flick shots and prefiring unknown positions', '2024-01-16 14:45:00'),
('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440002', 'https://youtube.com/watch?v=evidence3', 'Aimbot detected - inhuman reaction times and perfect accuracy', '2024-01-17 09:15:00'),
('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', 'https://youtube.com/watch?v=evidence4', 'Spinbot and rage hacking in competitive match', '2024-01-18 16:20:00'),
('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', 'https://youtube.com/watch?v=evidence5', 'Speed hacking and bhop scripts, moving unrealistically fast', '2024-01-19 11:10:00');