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
-- Service Project Table
-- ========================================
CREATE TABLE service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    project_date DATE NOT NULL,
    CONSTRAINT fk_service_project_organization
        FOREIGN KEY (organization_id)
        REFERENCES organization (organization_id)
        ON DELETE CASCADE
); 

-- ========================================
-- Sample Service Projects
-- ========================================

INSERT INTO service_project (organization_id, title, description, location, project_date)
VALUES
-- Organization 1
(1, 'Community Clean-Up', 'Volunteers clean streets, parks, and public spaces to improve the local environment.', 'Lagos, Nigeria', '2026-08-10'),
(1, 'School Supply Drive', 'Collection and distribution of school supplies for underprivileged children.', 'Ibadan, Nigeria', '2026-08-18'),
(1, 'Food Bank Distribution', 'Distribution of food packages to low-income families.', 'Abuja, Nigeria', '2026-09-05'),
(1, 'Tree Planting Initiative', 'Planting trees to promote environmental sustainability.', 'Enugu, Nigeria', '2026-09-20'),
(1, 'Health Awareness Campaign', 'Community outreach focusing on hygiene and disease prevention.', 'Port Harcourt, Nigeria', '2026-10-02'),

-- Organization 2
(2, 'Blood Donation Drive', 'Organizing blood donations to support local hospitals.', 'Kano, Nigeria', '2026-08-12'),
(2, 'Beach Clean-Up', 'Removing waste from beaches to protect marine life.', 'Lagos, Nigeria', '2026-08-30'),
(2, 'Youth Coding Workshop', 'Teaching programming basics to secondary school students.', 'Benin City, Nigeria', '2026-09-08'),
(2, 'Senior Citizen Support', 'Providing companionship and assistance to elderly residents.', 'Jos, Nigeria', '2026-09-25'),
(2, 'Community Library Setup', 'Establishing a small library with donated books.', 'Owerri, Nigeria', '2026-10-10'),

-- Organization 3
(3, 'Free Medical Outreach', 'Offering free medical consultations and basic medications.', 'Uyo, Nigeria', '2026-08-15'),
(3, 'Orphanage Visit', 'Providing food, clothing, and recreational activities for children.', 'Calabar, Nigeria', '2026-08-28'),
(3, 'Career Mentorship Program', 'Professionals mentor university students on career development.', 'Nsukka, Nigeria', '2026-09-12'),
(3, 'Water Sanitation Project', 'Installing clean water facilities in underserved communities.', 'Makurdi, Nigeria', '2026-09-30'),
(3, 'Community Sports Festival', 'Sports competition promoting youth engagement and teamwork.', 'Asaba, Nigeria', '2026-10-18');

CREATE TABLE category (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (project_id, category_id),
    CONSTRAINT fk_project_category_project
        FOREIGN KEY (project_id)
        REFERENCES service_project (project_id)
        ON DELETE CASCADE,
    CONSTRAINT fk_project_category_category
        FOREIGN KEY (category_id)
        REFERENCES category (category_id)
        ON DELETE CASCADE
);

-- ========================================
-- Insert Categories
-- ========================================

INSERT INTO category (name)
VALUES
('Education'),
('Health'),
('Environment'),
('Community Development'),
('Youth Empowerment');


-- ========================================
-- Associate Projects with Categories
-- ========================================

INSERT INTO project_category (project_id, category_id)
VALUES
(1, 3),   -- Community Clean-Up → Environment
(2, 1),   -- School Supply Drive → Education
(3, 4),   -- Food Bank Distribution → Community Development
(4, 3),   -- Tree Planting Initiative → Environment
(5, 2),   -- Health Awareness Campaign → Health

(6, 2),   -- Blood Donation Drive → Health
(7, 3),   -- Beach Clean-Up → Environment
(8, 1),   -- Youth Coding Workshop → Education
(9, 4),   -- Senior Citizen Support → Community Development
(10, 1),  -- Community Library Setup → Education

(11, 2),  -- Free Medical Outreach → Health
(12, 4),  -- Orphanage Visit → Community Development
(13, 5),  -- Career Mentorship Program → Youth Empowerment
(14, 4),  -- Water Sanitation Project → Community Development
(15, 5);  -- Community Sports Festival → Youth Empowerment