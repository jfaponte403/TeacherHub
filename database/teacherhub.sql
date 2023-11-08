CREATE DATABASE teacherhub;
CREATE TABLE teacher (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(180)
);

CREATE TABLE subject (
    id_subject VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(50) UNIQUE
);

CREATE TABLE professor_subject (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    id_professor VARCHAR(36) REFERENCES professor ON DELETE CASCADE,
    id_subject VARCHAR(36) REFERENCES subject ON DELETE CASCADE,
    teacher_subject_id VARCHAR(36),
    CONSTRAINT fkne476kmtxd9kekl4lpd79or1y UNIQUE (teacher_subject_id)
);
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    role VARCHAR(50)
);

CREATE TABLE student (
    id_student VARCHAR(36) NOT NULL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    hash VARCHAR(16) NOT NULL,
    is_active BOOLEAN,
    id_role INTEGER REFERENCES role ON DELETE CASCADE
);

CREATE TABLE auth_code (
    id_student VARCHAR(36) NOT NULL PRIMARY KEY REFERENCES student ON DELETE CASCADE,
    date_time TIMESTAMP NOT NULL,
    code VARCHAR(6) NOT NULL
);

CREATE TABLE grade (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    id_student VARCHAR(36) REFERENCES student ON DELETE CASCADE,
    id_professor_subject VARCHAR(36) REFERENCES professor_subject ON DELETE CASCADE,
    comment TEXT,
    is_positive BOOLEAN,
    note REAL,
    id_professor BOOLEAN NOT NULL
);