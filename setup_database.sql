CREATE DATABASE cabaigne_database;
CREATE user cabaigne_manager WITH encrypted password 'cabaigne';
GRANT ALL PRIVILEGES ON DATABASE cabaigne_database TO cabaigne_manager;
