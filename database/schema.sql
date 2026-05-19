CREATE DATABASE IF NOT EXISTS local_services_db;
USE local_services_db;

CREATE TABLE IF NOT EXISTS service_providers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    pincode VARCHAR(10) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    experience_years INT NOT NULL
);

INSERT INTO service_providers (name, category, pincode, phone, experience_years) VALUES
('Ramesh Kumar', 'Plumber', '400001', '9876543210', 5),
('Suresh Sharma', 'Electrician', '400001', '9876543211', 8),
('Dinesh Patel', 'Carpenter', '400001', '9876543212', 3),
('Mahesh Verma', 'Construction Worker', '400002', '9876543213', 10),
('Rajesh Singh', 'Plumber', '400002', '9876543214', 2),
('Vikram Joshi', 'Electrician', '400003', '9876543215', 7),
('Anil Yadav', 'Carpenter', '400003', '9876543216', 4);
