USE test;

INSERT into users (github_handle, github_name, github_id, github_avatar, github_token) VALUES ("alberthuynh91", "Albert Huynh", "5342581", "albert.jpg", "e5886e015c68c1181f0edd5f6ed514b39bb4d59a");
INSERT into users (github_handle, github_name, github_id, github_avatar, github_token) VALUES ("rhombus33", "Diamond Wheeler", "456", "diamond.jpg", "e5886e015c68c1181f0edd5f6ed514b39bb4d59a");
INSERT into dashboards (id, branch_name, org_name, repo_name, last_commit_msg) VALUES (1, "master", "AudibleBoulders", "AudibleBoulders", "b7169004de5e0bdb17e97270e7e6c408f83b7bb2");
INSERT into dashboards (id, branch_name, org_name, repo_name, last_commit_msg) VALUES (2, "master", "GigglingGoiters", "GigglingGoiters", "0e3efd7fccbaed84df99279de7b576f8a6f0546e");
INSERT into users_dashboards (id, users_github_id, dashboards_id, signature_hash, set_up, last_pulled_commit_msg) VALUES (1, 5342581, 1, 53425811, 0, 'somehashsdfdfsdfa');
INSERT into users_dashboards (id, users_github_id, dashboards_id, signature_hash, set_up, last_pulled_commit_msg) VALUES (2, 456, 2, 0, 0, 'somehashsdfdfsdfa');
INSERT into diffs (file, mod_type, users_dashboards_signature_hash) VALUES ("routes.js", "M", "53425811");
INSERT into diffs (file, mod_type, users_dashboards_signature_hash) VALUES ("home.js", "A", "53425811");
INSERT into diffs (file, mod_type, users_dashboards_signature_hash) VALUES ("index.js", "RM", "53425811");

-- To populate this test data, run the following commands from project root:
-- mysql -u root < src/server/schema.sql
-- mysql -u root < src/server/test-data/test-data.sql
