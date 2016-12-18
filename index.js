
/**
 * Module dependencies.
 */

var repo = process.argv[2] || 'segmentio/analytics.js';
var github = require('./lib/github');
var co = require('co');
var fs = require('fs');

/**
 * Do stuff.
 */

co(function *(){
  var stargazers = yield github.getStargazers(repo);
  for (var i = 0; i < stargazers.length; i++) {
    try {
      var user = yield github.getEmail(stargazers[i]);
      var line = [user.username, user.email, user.location, user.name, user.hireable].join(',') + '\n';
      fs.appendFileSync('output.csv', line, { encoding: 'utf8' });
    } catch (e) {
      console.error(e);
    }
  }
});
