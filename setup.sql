
-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');


-- ========================================
-- Project Table
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT, -- 1. Declare the column first (matching the SERIAL type)
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,

    -- 2. Define the foreign key relationship at the bottom
    FOREIGN KEY (organization_id) REFERENCES organization(organization_id)
);


-- ========================================
-- Insert sample data: Service Projects
-- ========================================
INSERT INTO service_project (organization_id, title, description, location, project_date) VALUES
(1, 'Community Park Cleanup', 'Volunteers will gather to plant trees, repaint benches, and clean up litter in the central park area.', 'Central Park, Downtown Sector', '2026-08-15'),

(2, 'Annual Food Drive', 'Sorting and packaging non-perishable food items for distribution to local families in need.', 'Community Food Bank Warehouse', '2026-09-05'),

(1, 'Tech Literacy for Seniors', 'A workshop dedicated to teaching senior citizens how to safely navigate smartphones, tablets, and video calls.', 'City Public Library, Room B', '2026-10-12'),

(3, 'Animal Shelter Refurbishment', 'Helping the local shelter repair outdoor kennels, build new cat trees, and organize the donation pantry.', 'Hope Animal Shelter, North District', '2026-11-20'),

(2, 'Winter Coat Collection', 'Collecting, sorting, and distributing winter coats and blankets to homeless shelters before the freeze.', 'St. Jude Community Center', '2026-12-01');