# GitSpy
GitSpy gives your developer team a real-time view of what everyone is working on, before they have even pushed their work to GitHub. Communicate better and anticipate merge conflict before they happen.

You can start using GitSpy [**here**](http://www.gitspy.com)

<hr>

## Team
We are four passionate engineers who strive to create meaningful and innovative applications. GitSpy was fueled by our desire to optimize git workflow while also giving back to the open source community. Learn more about an individual team member by visiting their Github pages below.

  - __Product Owner__: [**Alice Yu**](https://github.com/yaliceme)
  - __Scrum Master__: [**Diamond Wheeler**](https://github.com/Rhombus33)
  - __Development Team Members__: [**Albert Huynh**](https://github.com/alberthuynh91), [**Ross Davis**](https://github.com/RossAD)1

<hr>

## Table of Contents
1. [Introduction](#Introduction)
1. [Requirements](#Requirements)
1. [Screenshots](#Screenshots)
1. [Development](#Development)
1. [Architecture](#Architecture)
1. [Technologies](#Technologies)
1. [Roadmap](#Roadmap)
1. [Contributing](#Contributing)

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
|POST|/api/users|Adds a new user|server/request-handlers/users.js|    |Send back the user object representing the new entry in the 'users' table that was created. also, redirect to /|Insert a new user into the users table, including an automatically generated hash signature (the signature doesn't need to be in v0)|
|POST|/api/dashboards/|Allows the user to join a dashboard(or create the dashboard and join if the dashboard does not yet exist)|server/request-handlers/dashboards.js|{users_id: 1, repo_link: 'github.com/user/repo.git', branch: 'master'}|{dashboard details}, redir to /:orgname/:reponame/setup|Find or create a dashboard in dashboards table, make a new users_dashboards record|
|GET|/api/dashboards/:githubId|Get a list of all the dashboards that a particular user is part of|server/request-handlers/dashboards-githubId.js|    |{dashboard 1 details}, {dashboard 2 details}|Queries users_dashboards where users_id matches userId, does a join to dashboards table to get dashboard details for each|
|GET|/api/dashboards/:orgname/:reponame|Gets all information for that particular dashboard|server/request-handlers/dashboards-org-repo.js|    |{dashboard: {id: 1, last_commit: 'somegithashkjsdflksdfj', repo_link: 'github.com/me/myrepo.git', branch: 'master, org_name: 'AudibleBoulders', repo_name: 'AudibleBoulders}, users: [{id: 1, github_username: 'yaliceme', name: 'Alice', set_up: true, up_to_date: true, diffs: [{id: 123, file: 'file/path/index.html', mod_type: 'deleted', commit_message: 'I made a commit'}]}]}|For 'dashboard' in response, query dashboards table for entry where org_name and repo_name match. For 'users' in response, do a join between dashboards, users_dashboards, users, and diffs, in order to get an array of user details associated with that dashboard|
|GET|/api/setup/:orgName/:repoName/:githubId|Get the custom info that the user needs for their commit hook setup instructions|server/request-handlers/setup.js|    |{signature}|     |
|POST|/api/commits|Pinged via the post-commit hook every time someone commits, updates their entries in the diffs table|server/request-handlers/commit.js|{users_id: 1, dashboards_id:1, diffs: [{file: 'file/path/index.html', mod_type: 'modified', commit_message: 'I made a commit' }], last_pulled_commit: 'somegithashsdfdfsjaksdlkjss'}|    |Based on the users_id and dashboards_id, find or create an entry in users_dashboards table, return its record id. Also delete all entries from diffs table where users_dashboards_id matches 3) iterate through req.body.diffs, make a new entry in diffs table for each diffs is an array of diff objects, each diff object has properties: file, mod_type, commit_message|


### Client Side Routes
|Route|Description|Related Server Endpoints|
|---|---|---|
|/#/login|Login page with tagline and brief description with Github login button|POST /api/users|
|/#/|Redirect to /#/login if not logged in. Otherwise, /#/ is a home page that shows a list of all GitSpy dashboards this user has added.|GET /api/dashboards/:userId|
|/#/add|A page that allows users to add public github repos to their dashboards. Once a user adds a repo, the repo becomes a dashboard they are now apart of. User is redirected to the newly created dashboard upon addition. |POST /api/dashboards|
|/#/:orgname/:reponame/setup|Displays the setup instructions and post-commit script that this user should use for the given dashboard|/api/setup/:userId/:dashboardId|
|/#/:orgname/:reponame|The dashboard page for a specific repo that displays the GitSpy dashboard for the given orgname/reponame, with collaborator names and file changes. |GET /api/dashboards/:orgname/:reponame|


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

<hr>

## Roadmap

View the project roadmap [here](https://github.com/AudibleBoulders/AudibleBoulders/issues)

<hr>

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.