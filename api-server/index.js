var express = require('express');
var axios = require('axios');
var Promise = require("bluebird");
var pretty = require('express-prettify');
var cache = require('apicache').middleware;
var app = express();

app.use(pretty({ query: 'pretty' }));

var API_URL = 'https://api.github.com';
var API_TOKEN = 'token f6e4d10c1141bbc2082b73173900ac8f27aa04e3';

axios.defaults.headers.common['Authorization'] = API_TOKEN;

function getPeople() {
  function getPeopleInPage(page) {
    return axios.get(API_URL + '/orgs/angular/members', { params: { page: page } })
      .then(function(members) {
        var promises = members.data.map(function(member) {
          return axios.get(API_URL + '/users/' + member.login)
            .then(function(users) {
              return users.data;
            })
        });

        return Promise.all(promises);
      })
      .then(function(peopleInPage) {
        if (peopleInPage.length >= 30) {
          return getPeopleInPage(page + 1)
            .then(function(people) {
              return peopleInPage.concat(people);
            });
        }
        return peopleInPage;
      })
  }

  var startTime = Date.now();
  console.log('Started processing users...');
  return getPeopleInPage(1)
    .then(function(people) {
      var result = people.filter(Boolean);
      var ellapsed = (Date.now() - startTime) / 1000;
      console.log('Processed ' + result.length + ' users in ' + ellapsed + ' seconds');
      return result;
    });
}

function getContributorMappings() {
  var startTime = Date.now();
  console.log('Started processing repos...');
  return axios.get(API_URL + '/orgs/angular')
    .then(function(response) {
      var reposCount = response.data.public_repos;
      var promises = [];

      for (var i = 0; i <= (reposCount - 1) / 30; i++) {
        promises.push(getRepositories(i))
      }

      return Promise.all(promises)
        .then(function(pages) {
          return pages.reduce(function(a, b) {
            return a.concat(b);
          }, []);
        });
    })
    .then(function(repos) {
      var ellapsed = (Date.now() - startTime) / 1000;
      console.log('Processed ' + repos.length + ' repos in ' + ellapsed + ' seconds');
      return repos;
    });
}

function getRepositories(page) {
  return axios.get(API_URL + '/orgs/angular/repos', { params: { page: page } })
    .then(function(repositories) {
      var promises = repositories.data.map(function(repo) {
        return populateRepoWithContributors(repo);
      });

      return Promise.all(promises);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function populateRepoWithContributors(repository) {
  return axios.get(API_URL + '/repos/angular/' + repository.name + '/stats/contributors')
    .then(function(response) {
      var contributors = response.data;
      var contributions = contributors ? contributors.map(function(contribution) {
        return {
          total: contribution.total,
          author: contribution.author.id
        };
      }) : null
      return {
        id: repository.id,
        contributions: contributions || []
      };
    })
    .catch(function(error) {
      console.log(error);
    });
}



// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/repos', cache('12 hours'), function (req, res) {
  getContributorMappings().then(function(response) {
    res.json(response);
  })
});

app.get('/people', cache('12 hours'), function (req, res) {
  getPeople().then(function(response) {
    res.json(response);
  })
});

app.get('/contributors', cache('12 hours'), function (req, res) {
  var promises = [getContributorMappings(), getPeople()];
  Promise.all(promises)
    .then(function(response) {
      var contributorMappings = response[0];
      var people = response[1];
      return people.map(function(user) {
        user.contributions = contributorMappings.reduce(function(contributions, repo) {
          var contributionsByUser = repo.contributions.find(function(contrib) {
            return contrib.author === user.id;
          })
          if (contributionsByUser) {
            contributions.push({
              repositoryId: repo.id,
              contributions: contributionsByUser.total
            });
          }

          return contributions
        }, []);

        return user;
      });
    }).then(function(response) {
      res.json(response);
    }).catch(function(error) {
      console.log(error);
      res.json([]);
    });
});

app.listen(8080, function () {
  console.log('Listening on port 8080!');
});
