const userFormEl = document.querySelector('#user-form');
const languageButtonsEl = document.querySelector('#language-buttons');
const nameInputEl = document.querySelector('#username');
const repoContainerEl = document.querySelector('#repos-container');
const repoSearchTerm = document.querySelector('#repo-search-term');

const formSubmitHandler = function (event) {
  event.preventDefault();

  const username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a GitHub username');
  }
};

const buttonClickHandler = function (event) {
  const language = event.target.getAttribute('data-language');

  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = '';
  }
};

const getUserRepos = function (user) {
  const apiUrl = `https://api.github.com/users/${user}/repos`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert(`Error:${response.statusText}`);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to GitHub');
    });
};

const getFeaturedRepos = function (language) {
  const apiUrl = `https://api.github.com/search/repositories?q=${language}+is:featured&sort=help-wanted-issues`;

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert(`Error:${response.statusText}`);
    }
  });
};

const displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No repositories found.';
    return;
  }

  repoSearchTerm.textContent = searchTerm;

  for (let repoObj of repos) {
    const repoName = `${repoObj.owner.login}/${repoObj.name}`;

    const repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    const titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    const statusEl = document.createElement('span');
    statusEl.classList = 'flex-row align-center';

    if (repoObj.open_issues_count > 0) {
      statusEl.innerHTML =
        `<i class='fas fa-times status-icon icon-danger'></i>${repoObj.open_issues_count} issue(s)`;
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};

userFormEl.addEventListener('submit', formSubmitHandler);
languageButtonsEl.addEventListener('click', buttonClickHandler);
