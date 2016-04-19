# GitSpy
GitSpy gives your developer team a real-time view of what everyone is working on, before they have even pushed their work to GitHub. Communicate better and anticipate merge conflict before they happen.

You can start using GitSpy [**here**](http://www.gitspy.com)

<hr>

## Team
We are four passionate engineers who strive to create meaningful and innovative applications. GitSpy was fueled by our desire to optimize git workflow while also giving back to the open source community. Learn more about an individual team member by visiting their Github pages below.

  - __Product Owner__: [**Alice Yu**](https://github.com/yaliceme)
  - __Scrum Master__: [**Diamond Wheeler**](https://github.com/Rhombus33)
  - __Development Team Members__: [**Albert Huynh**](https://github.com/alberthuynh91), [**Ross Davis**](https://github.com/RossAD)

<hr>

## Table of Contents

1. [Introduction](#introduction)
1. [Requirements](#requirements)
1. [Screenshots](#screenshots)
1. [Development](#development)
1. [Architecture](#architecture)
1. [Technologies](#technologies)
1. [Roadmap](#roadmap)
1. [Contributing](#contributing)

<hr>

## Introduction

GitSpy is a free passive-communication tool for fast-moving software development teams. It gives you a real-time view of what your developer teammates are working on locally, and what files they are affecting.

Just login, add your team’s shared project repo, and run the GitSpy setup instructions on your local computer. Once everyone on your team has done that, you’ll have a shared dashboard that shows each developer’s status — their most recent rebase, and what files they’ve touched since. Your status will update immediately upon commit — you don’t even have to push to GitHub first!

With GitSpy, you’ll never again have to ask “What files are you touching?” and you’ll never again be surprised by a merge conflict.

<hr>

## Requirements

- Node v5.8.0
- Express v4.13.4
- MySQL v5.5

<hr>

## Screenshots
![](https://c2.staticflickr.com/2/1620/25572185764_c787ee8e59_b.jpg)

<hr>

## Development

### Installing Dependencies

From within the root directory:

```sh
sudo npm install -g bower
npm install
bower install
```

<hr>

## Architecture

### Database Schema
MySQL Database Schema
![](https://c2.staticflickr.com/2/1452/25900841110_fb4f304bf7_c.jpg)


### API Server Endpoints
|Request Type|URI|Description|Controller|Request Body|Response|Database Interactions|
|---|---|---|---|---|---|---|
|POST|/api/dashboards/|Allows the user to join a dashboard(or create the dashboard and join if the dashboard does not yet exist)|server/request-handlers/dashboards.js|{org_name: 'org', repo_name: 'repo'}|None|Find or create a dashboard in dashboards table, create a new users_dashboards record if none exists|
|GET|/api/dashboards/:githubId|Get a list of all the dashboards that a particular user is part of|server/request-handlers/dashboards-githubId.js| N/A|{dashboard 1 details}, {dashboard 2 details}|Queries users_dashboards where users_github_id matches githubId, does a join to dashboards table to get dashboard details for each|
|GET|/api/dashboards/:orgname/:reponame|Gets all information for that particular dashboard|server/request-handlers/dashboards-org-repo.js| N/A   |{dashboard: {id: 1, last_commit_sha1: 'somegithashkjsdflksdfj', last_commit_msg: 'Merged pull request #27 etc'}, users: [{github_id: 1234567, github_handle: 'yaliceme', github_name: 'Alice', github_avatar: 'profile.jpg', set_up: 1, last_pulled_commit_sha1: 'shashashasha', last_pulled_commit_msg: 'Merged pull request #26 etc etc', diffs: [{file: 'file/path/index.html', mod_type: 'deleted'}]}]}|For 'dashboard' in response, query dashboards table for entry where org_name and repo_name match. For 'users' in response, do a join between dashboards, users_dashboards, users, and diffs, in order to get an array of user details associated with that dashboard|
|DELETE|/api/users_dashboards/:githubId/:dashboardId|Disassociate a user from a particular dashboard|server/request-handlers/usersDashboards.js|N/A|None|Remove the users_dashboards record associated with that githubId and dashboardId combination|
|GET|/api/setup/:orgName/:repoName|Get the custom info that the user needs for their commit hook setup instructions|server/request-handlers/setup.js|N/A|{signature}|Query for the matching users_dashboards record and return the signature_hash field|
|POST|/api/commits|Pinged via the post-commit hook every time someone commits, updates their entries in the diffs table|server/request-handlers/commit.js|{signature_hash: 'sha1sha1sha1sha1', diffs: [{file: 'file/path/index.html', mod_type: 'modified'}], last_pulled_commit_sha1: 'somegithashsdfdfsjaksdlkjss', last_pulled_commit_msg: 'Merged some pull request', commit_branch: 'featurebranch'}|None|Delete all entries from diffs table where users_dashboards_signature_hash matches. iterate through new diffs, make a new entry in diffs table for each. diffs is an array of diff objects, each diff object has properties: file, mod_type, commit_message|


### Client Side Routes
|Route|Description|Related Server Endpoints|
|---|---|---|
|/#/login|Login page with tagline and brief description with Github login button|Handled via passport in config/auth.js|
|/#/|Redirect to /#/login if not logged in. Otherwise, /#/ is a home page that shows a list of all GitSpy dashboards this user has added.|GET /api/dashboards/:githubId|
|/#/add|A page that allows users to create/join a dashboard for a public github repo that they own or have collaborator access to. User is then redirected to this dashboard. |POST /api/dashboards|
|/#/:orgname/:reponame/setup|Displays the setup instructions and post-commit script that this user should use for the given dashboard|/api/setup/:orgName/:repoName|
|/#/:orgname/:reponame|The dashboard page for the repo with the given orgname/reponame, with collaborator names and file changes. |GET /api/dashboards/:orgname/:reponame|


<hr>

## Technologies

### Front End
- AngularJS
- Bootstrap

### Back End
- NodeJS
- ExpressJS
- Socket.IO
- MySQL

### Testing
- Mocha/Chai
- Karma
- JSHint

### Deployment
- DigitalOcean

<hr>

## Roadmap

View the project roadmap [here](https://github.com/AudibleBoulders/AudibleBoulders/issues)

<hr>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.