USE app;

INSERT into users (id, github_username, name) VALUES (1, "yaliceme", "Alice Yu");
INSERT into users (id, github_username, name) VALUES (2, "rhombus33", "Diamond Wheeler");
INSERT into dashboards (id, repo_link, branch, org_name, repo_name, last_commit) VALUES (1, "https://github.com/AudibleBoulders/AudibleBoulders.git", "master", "AudibleBoulders", "AudibleBoulders", "b7169004de5e0bdb17e97270e7e6c408f83b7bb2");
INSERT into dashboards (id, repo_link, branch, org_name, repo_name, last_commit) VALUES (2, "https://github.com/GigglingGoiters/GigglingGoiters.git", "master", "GigglingGoiters", "GigglingGoiters", "0e3efd7fccbaed84df99279de7b576f8a6f0546e");
INSERT into users_dashboards (id, users_id, dashboards_id, set_up, up_to_date, last_pulled_commit) VALUES (1, 1, 1, 0, 0, 'somehashsdfdfsdfa');
INSERT into users_dashboards (id, users_id, dashboards_id, set_up, up_to_date, last_pulled_commit) VALUES (2, 1, 2, 0, 0, 'somehashsdfdfsdfa');
INSERT into users_dashboards (id, users_id, dashboards_id, set_up, up_to_date, last_pulled_commit) VALUES (3, 2, 1, 0, 0, 'somehashsdfdfsdfa');

-- To populate this test data, run the following commands from project root:
-- mysql -u root < src/server/schema.sql
-- mysql -u root < src/server/test-data/test-dashboards-userId.sql
