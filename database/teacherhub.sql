CREATE SCHEMA teacherhub;

SET SCHEMA 'teacherhub';


-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE professor (
    id_professor BYTEA PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE subject (
    id_subject BYTEA PRIMARY KEY,
    name VARCHAR(50)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE professor_subject (
    id BYTEA PRIMARY KEY,
    id_professor BYTEA,
    id_subject BYTEA,
    FOREIGN KEY (id_professor) REFERENCES professor (id_professor),
    FOREIGN KEY (id_subject) REFERENCES subject (id_subject)
);

CREATE TABLE role (
  id INT PRIMARY KEY,
  role VARCHAR(50)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE student (
    id_student BYTEA PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    hash varchar(16) NOT NULL,
    is_active boolean,
    id_role INT,
    FOREIGN KEY (id_role) REFERENCES role (id)
);

CREATE TABLE auth_code (
  id_student BYTEA PRIMARY KEY,
  date_time timestamp NOT NULL,
  code varchar(6) NOT NULL,
  FOREIGN KEY (id_student) REFERENCES student (id_student)
);

-- SQLINES LICENSE FOR EVALUATION USE ONLY
CREATE TABLE grade (
    id BYTEA PRIMARY KEY,
    id_student BYTEA,
    id_professor_subject BYTEA,
    comment text,
    is_positive boolean,
    note int,
    FOREIGN KEY (id_student) REFERENCES student (id_student),
    FOREIGN KEY (id_professor_subject) REFERENCES professor_subject(id)
);