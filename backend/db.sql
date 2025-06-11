CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    age DATE NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255),
    filename VARCHAR(255) NOT NULL,
    category_id UUID REFERENCES categories(id)
);

CREATE TABLE favourites (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    photo_id UUID REFERENCES photos(id) ON DELETE CASCADE,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, photo_id)
);

INSERT INTO users (id, username, email, age, is_admin, password) VALUES
    (uuid_generate_v4(), 'john_user', 'john@example.com', '1990-05-15', FALSE, 'hashed_password1'),
    (uuid_generate_v4(), 'jane_user', 'jane@example.com', '1992-08-21', FALSE, 'hashed_password2'),
    (uuid_generate_v4(), 'artwojciech', 'artwojciech@interia.pl', '2003-09-15', TRUE, 'hashed_admin_password');

INSERT INTO categories (id, name) VALUES
    (uuid_generate_v4(), 'cars'),
    (uuid_generate_v4(), 'concerts'),
    (uuid_generate_v4(), 'photoshoots'),
    (uuid_generate_v4(), 'sport'),
    (uuid_generate_v4(), 'street'),
    (uuid_generate_v4(), 'wildlife');


INSERT INTO photos (id, title, filename, category_id) VALUES
(uuid_generate_v4(), '', 'uploads/cars/DSC_2183.png', (SELECT id FROM categories WHERE name = 'cars')),
(uuid_generate_v4(), '', 'uploads/cars/DSC_2330.png', (SELECT id FROM categories WHERE name = 'cars'));

INSERT INTO photos (id, title, filename, category_id) VALUES
(uuid_generate_v4(), '', 'uploads/concerts/koncert_przyklad.jpg', (SELECT id FROM categories WHERE name = 'concerts'));

INSERT INTO photos (id, title, filename, category_id) VALUES
(uuid_generate_v4(), '', 'uploads/photoshoots/_DSC1308.png', (SELECT id FROM categories WHERE name = 'photoshoots')),
(uuid_generate_v4(), '', 'uploads/photoshoots/_DSC1643.png', (SELECT id FROM categories WHERE name = 'photoshoots')),
(uuid_generate_v4(), '', 'uploads/photoshoots/_DSC1715.png', (SELECT id FROM categories WHERE name = 'photoshoots')),
(uuid_generate_v4(), '', 'uploads/photoshoots/_DSC1724.png', (SELECT id FROM categories WHERE name = 'photoshoots')),
(uuid_generate_v4(), '', 'uploads/photoshoots/_DSC1738.png', (SELECT id FROM categories WHERE name = 'photoshoots')),
(uuid_generate_v4(), '', 'uploads/photoshoots/_DSC1752.png', (SELECT id FROM categories WHERE name = 'photoshoots'));

INSERT INTO photos (id, title, filename, category_id) VALUES
(uuid_generate_v4(), '', 'uploads/sport/sport_przyklad.jpg', (SELECT id FROM categories WHERE name = 'sport'));

INSERT INTO photos (id, title, filename, category_id) VALUES
(uuid_generate_v4(), '', 'uploads/street/_DSC1060.png', (SELECT id FROM categories WHERE name = 'street')),
(uuid_generate_v4(), '', 'uploads/street/_DSC1132.png', (SELECT id FROM categories WHERE name = 'street')),
(uuid_generate_v4(), '', 'uploads/street/DSC_1762.png', (SELECT id FROM categories WHERE name = 'street')),
(uuid_generate_v4(), '', 'uploads/street/DSC_1783.png', (SELECT id FROM categories WHERE name = 'street')),
(uuid_generate_v4(), '', 'uploads/street/DSC_1789.png', (SELECT id FROM categories WHERE name = 'street')),
(uuid_generate_v4(), '', 'uploads/street/DSC_1802.png', (SELECT id FROM categories WHERE name = 'street')),
(uuid_generate_v4(), '', 'uploads/street/DSC_1809.png', (SELECT id FROM categories WHERE name = 'street'));

INSERT INTO photos (id, title, filename, category_id) VALUES
(uuid_generate_v4(), '', 'uploads/wildlife/DSC_2006.png', (SELECT id FROM categories WHERE name = 'wildlife')),
(uuid_generate_v4(), '', 'uploads/wildlife/DSC_2010.png', (SELECT id FROM categories WHERE name = 'wildlife')),
(uuid_generate_v4(), '', 'uploads/wildlife/DSC_2024_01.png', (SELECT id FROM categories WHERE name = 'wildlife')),
(uuid_generate_v4(), '', 'uploads/wildlife/DSC_2027.png', (SELECT id FROM categories WHERE name = 'wildlife'));







