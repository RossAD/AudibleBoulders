var express = require('express');
var path = require('path');
var compression = require('compression');
var bodyparser = require('body-parser');
var db = require('./db');

require('./config/middleware.js')(app, express);
require('./config/routes.js')(app, express);

import React from 'react'
// we'll use this to render our app to an html string
import { renderToString } from 'react-dom/server'
// and these to match the url to routes and then render
import { match, RouterContext } from 'react-router'
import routes from './app/routes'

var app = express();
app.use(compression());

app.use(bodyparser.urlencoded({extended : true}));
app.use(bodyparser.json());

// add path.join here
app.use(express.static(path.join(__dirname, 'public')));

var router = express.Router();

// Test Response for functionality
// router.get('/', function(req, res){
//   res.json({message : 'Welcome to our Awesome server!'});
// });

// Routes for GitHelperServer


app.use('/api', router);

app.get('*', (req, res) => {
  // match the routes to the url
  match({ routes: routes, location: req.url }, (err, redirect, props) => {
    // `RouterContext` is the what `Router` renders. `Router` keeps these
    // `props` in its state as it listens to `browserHistory`. But on the
    // server our app is stateless, so we need to use `match` to
    // get these props before rendering.
    const appHtml = renderToString(<RouterContext {...props}/>)

    // dump the HTML into a template, lots of ways to do this, but none are
    // really influenced by React Router, so we're just using a little
    // function, `renderPage`
    res.send(renderPage(appHtml))
  })
})

function renderPage(appHtml) {
  return `
    <!doctype html public="storage">
    <html>
    <meta charset=utf-8/>
    <title>Gitspy</title>
    <link rel=stylesheet href=/index.css>
    <div id=app>${appHtml}</div>
    <script src="/bundle.js"></script>
   `
}

var PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Production Express server running at localhost:' + PORT)
});
