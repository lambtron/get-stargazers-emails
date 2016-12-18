
/**
 * Module dependencies.
 */

var request = require('./request');

/**
 * Access token.
 */

var accessToken = '';

/**
 * Get stargazers from repo.
 */

exports.getStargazers = function *(repo) {
  var page = 0;
  var stargazers = [];
  do {
    var url = 'https://api.github.com/repos/' + repo + '/stargazers?page=' + page + '&access_token=' + accessToken;
    var res = yield request.get(url);
    var users = res.body;
    for (var i = 0; i < users.length; i++) {
      stargazers.push(users[i].login);
      // I can also get organizations and other stuff.
    }
    if (users.length < 25) break;
    page += 1;
  } while (true);
  return stargazers;
};

/**
 * Get forkers?
 */

exports.getForkers = function *(repo) {
};

/**
 * Get email from github usernane.
 */

exports.getEmail = function *(username) {
  var url = 'https://api.github.com/users/' + username + '?access_token=' + accessToken;
  var res = yield request.get(url);
  var user = res.body;
  return {
    username: user.login,
    email: user.email,
    location: user.location,
    name: user.name,
    hireable: user.hireable
  };
};

