DROP DATABASE IF EXISTS test;

CREATE DATABASE test;

USE test;

DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id int NOT NULL AUTO_INCREMENT,
  git_handle varchar(39) NOT NULL UNIQUE,
  name varchar(256),
  signature varchar(200),
  github_id varchar(200),
  github_avatar varchar(200),
  git_token varchar(200),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS dashboards;

CREATE TABLE dashboards (
  id int NOT NULL AUTO_INCREMENT,
  repo_link varchar(200) NOT NULL,
  branch varchar(200),
  org_name varchar(200),
  repo_name varchar(200),
  last_commit varchar(200),
  PRIMARY KEY (id)
);

DROP TABLE IF EXISTS users_dashboards;

CREATE TABLE users_dashboards (
  id int NOT NULL AUTO_INCREMENT,
  users_id int NOT NULL,
  dashboards_id int NOT NULL,
  set_up tinyint,
  up_to_date tinyint,
  last_pulled_commit varchar(200),
  PRIMARY KEY (id),
  FOREIGN KEY (users_id)
    REFERENCES users(id),
  FOREIGN KEY (dashboards_id)
    REFERENCES dashboards(id)
);

DROP TABLE IF EXISTS diffs;

CREATE TABLE diffs (
  id int NOT NULL AUTO_INCREMENT,
  users_dashboards_id int NOT NULL,
  file varchar(200),
  mod_type varchar(20),
  commit_message varchar(200),
  PRIMARY KEY (id),
  FOREIGN KEY (users_dashboards_id)
    REFERENCES users_dashboards(id)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < src/server/schema.sql
 *  from project root to create the database and the tables.*/
