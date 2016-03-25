USE test;

INSERT into users (id, git_handle, name, github_id, github_avatar) VALUES (1, "yaliceme", "Alice Yu", "123", "alice.jpg");
INSERT into users (id, git_handle, name, github_id, github_avatar) VALUES (2, "rhombus33", "Diamond Wheeler", "456", "diamond.jpg");
INSERT into dashboards (id, repo_link, branch, org_name, repo_name, last_commit) VALUES (1, "https://github.com/AudibleBoulders/AudibleBoulders.git", "master", "AudibleBoulders", "AudibleBoulders", "b7169004de5e0bdb17e97270e7e6c408f83b7bb2");
INSERT into dashboards (id, repo_link, branch, org_name, repo_name, last_commit) VALUES (2, "https://github.com/GigglingGoiters/GigglingGoiters.git", "master", "GigglingGoiters", "GigglingGoiters", "0e3efd7fccbaed84df99279de7b576f8a6f0546e");
INSERT into users_dashboards (id, users_id, dashboards_id, set_up, up_to_date, last_pulled_commit) VALUES (1, 1, 1, 0, 0, 'somehashsdfdfsdfa');
INSERT into users_dashboards (id, users_id, dashboards_id, set_up, up_to_date, last_pulled_commit) VALUES (2, 1, 2, 0, 0, 'somehashsdfdfsdfa');
INSERT into users_dashboards (id, users_id, dashboards_id, set_up, up_to_date, last_pulled_commit) VALUES (3, 2, 1, 0, 0, 'somehashsdfdfsdfa');
INSERT into diffs (users_dashboards_id, file, mod_type, commit_message) VALUES (1, "routes.js", "M", "add some routes");
INSERT into diffs (users_dashboards_id, file, mod_type, commit_message) VALUES (1, "server.js", "M", "require db in server");
INSERT into diffs (users_dashboards_id, file, mod_type, commit_message) VALUES (2, "recipe.js", "M", "did some recipe stuff");
INSERT into diffs (users_dashboards_id, file, mod_type, commit_message) VALUES (3, "gitspy.js", "M", "all the post commit stuff");

-- To populate this test data, run the following commands from project root:
-- mysql -u root < src/server/schema.sql
-- mysql -u root < src/server/test-data/test-data.sql
