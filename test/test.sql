-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Users'
--
-- ---

DROP TABLE IF EXISTS `Users`;

CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `github_username` VARCHAR NULL DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  `signature` VARCHAR NULL DEFAULT NULL,
  `token` VARCHAR NOT NULL DEFAULT 'NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Diffs'
--
-- ---

DROP TABLE IF EXISTS `Diffs`;

CREATE TABLE `Diffs` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `file` VARCHAR NULL DEFAULT NULL,
  `mod_type` VARCHAR NULL DEFAULT NULL,
  `commit_message` VARCHAR NULL DEFAULT NULL,
  `users_projects_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Projects'
--
-- ---

DROP TABLE IF EXISTS `Projects`;

CREATE TABLE `Projects` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `last_commit` VARCHAR NULL DEFAULT NULL,
  `repo` VARCHAR NULL DEFAULT NULL,
  `branch` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Users_Projects'
--
-- ---

DROP TABLE IF EXISTS `Users_Projects`;

CREATE TABLE `Users_Projects` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `users_id` INTEGER NULL DEFAULT NULL,
  `projects_id` INTEGER NULL DEFAULT NULL,
  `set_up` TINYINT NULL DEFAULT NULL,
  `up_to_date` TINYINT NULL DEFAULT NULL,
  `last_pulled_commit` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `Diffs` ADD FOREIGN KEY (users_projects_id) REFERENCES `Users_Projects` (`id`);
ALTER TABLE `Users_Projects` ADD FOREIGN KEY (users_id) REFERENCES `Users` (`id`);
ALTER TABLE `Users_Projects` ADD FOREIGN KEY (projects_id) REFERENCES `Projects` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Users` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Diffs` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Projects` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Users_Projects` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `Users` (`id`,`github_username`,`name`,`signature`,`token`) VALUES
-- ('','','','','');
-- INSERT INTO `Diffs` (`id`,`file`,`mod_type`,`commit_message`,`users_projects_id`) VALUES
-- ('','','','','');
-- INSERT INTO `Projects` (`id`,`last_commit`,`repo`,`branch`) VALUES
-- ('','','','');
-- INSERT INTO `Users_Projects` (`id`,`users_id`,`projects_id`,`set_up`,`up_to_date`,`last_pulled_commit`) VALUES
-- ('','','','','','');