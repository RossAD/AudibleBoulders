DROP DATABASE IF EXISTS app;

CREATE DATABASE app;

USE app;

CREATE TABLE users (
  github_id int NOT NULL,
  github_handle varchar(64) NOT NULL,
  github_name varchar(256),
  github_avatar varchar(256),
  github_token varchar(256) NOT NULL,
  PRIMARY KEY (github_id)
);

CREATE TABLE dashboards (
  id int NOT NULL AUTO_INCREMENT,
  org_name varchar(256) NOT NULL,
  repo_name varchar(256) NOT NULL,
  branch_name varchar(256) NOT NULL,
  last_commit_sha1 varchar(64),
  last_commit_msg varchar(256),
  PRIMARY KEY (id)
);

CREATE TABLE users_dashboards (
  id int NOT NULL AUTO_INCREMENT,
  users_github_id int NOT NULL,
  dashboards_id int NOT NULL,
  set_up tinyint,
  last_pulled_commit_sha1 varchar(64),
  last_pulled_commit_msg varchar(256),
  commit_branch varchar(256),
  signature_hash varchar(128) NOT NULL UNIQUE,
  PRIMARY KEY (id),
  FOREIGN KEY (users_github_id)
    REFERENCES users(github_id),
  FOREIGN KEY (dashboards_id)
    REFERENCES dashboards(id)
);

CREATE TABLE diffs (
  id int NOT NULL AUTO_INCREMENT,
  file varchar(256) NOT NULL,
  mod_type varchar(32) NOT NULL,
  users_dashboards_signature_hash varchar(128) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (users_dashboards_signature_hash)
    REFERENCES users_dashboards(signature_hash)
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < src/server/schema.sql
 *  from project root to create the database and the tables.*/
