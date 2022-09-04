CREATE DATABASE fullstack;

CREATE TABLE todo (
    task_id SERIAL PRIMARY KEY,
    task VARCHAR(255)
);