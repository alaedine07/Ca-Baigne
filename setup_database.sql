CREATE DATABASE weird_database;
CREATE user weird_manager WITH encrypted password 'weird_manager';
GRANT ALL PRIVILEGES ON DATABASE weird_database TO weird_manager;
