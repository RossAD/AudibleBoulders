CREATE DATABASE app;

USE app;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  github_username varchar(39) NOT NULL UNIQUE,
  name varchar(256),
  signature varchar(200),
  PRIMARY KEY (id)
);

CREATE TABLE projects (
  id int NOT NULL AUTO_INCREMENT,
  repo varchar(200) NOT NULL,
  branch varchar(200),
  last_commit varchar(200),
  PRIMARY KEY (id)
);

CREATE TABLE users_projects (
  id int NOT NULL AUTO_INCREMENT,
  users_id int NOT NULL,
  projects_id int NOT NULL,
  set_up tinyint,
  up_to_date tinyint,
  last_pulled_commit varchar(200),
  PRIMARY KEY (id),
  FOREIGN KEY (users_id)
    REFERENCES users(id),
  FOREIGN KEY (projects_id)
    REFERENCES projects(id)
);

CREATE TABLE diffs (
  id int NOT NULL AUTO_INCREMENT,
  users_projects_id int NOT NULL,
  file varchar(200),
  mod_type varchar(20),
  commit_message varchar(200),
  PRIMARY KEY (id),
  FOREIGN KEY (users_projects_id)
    REFERENCES users_projects(id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < src/server/schema.sql
 *  from project root to create the database and the tables.*/
