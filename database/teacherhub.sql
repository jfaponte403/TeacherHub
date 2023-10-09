CREATE SCHEMA teacherhub;

USE teacherhub;


CREATE TABLE professor (
    id_professor BINARY(16) PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

CREATE TABLE subject (
    id_subject BINARY(16) PRIMARY KEY,
    name VARCHAR(50)
);

CREATE TABLE professor_subject (
    id BINARY(16) PRIMARY KEY,
    id_professor BINARY(16),
    id_subject BINARY(16),
    FOREIGN KEY (id_professor) REFERENCES professor (id_professor),
    FOREIGN KEY (id_subject) REFERENCES subject (id_subject)
);
CREATE TABLE student (
    id_student BINARY(16) PRIMARY KEY,
    first_name VARCHAR(50),
    email varchar(255),
    password varchar(255),
    hash varchar(16)
);

CREATE TABLE grade (
    id BINARY(16) PRIMARY KEY,
    id_student BINARY(16),
    id_professor_subject int,
    comment text,
    is_positive boolean,
    note int,
    FOREIGN KEY (id_student) REFERENCES student (id_student),
    FOREIGN KEY (id_professor_subject) REFERENCES professor_subject (id_professor_subject)
);


