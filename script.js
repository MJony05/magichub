let input = document.querySelector(".user__input");
let getApi = function (url) {
  fetch(url)
    .then((response) => response.json())
    .then((res) => console.log(res));
};
let user = document.querySelector(".user__info");
let main = document.querySelector(".main");
// getApi("https://api.github.com/users/IbrohimFayzullayev");
// getApi("https://api.github.com/users/IbrohimFayzullayev/repos");

const heading = document.querySelector(".heading__box");
let findUser = async function (url) {
  try {
    let a = await fetch(url);
    let obj = await a.json();
    let html = `
    <div class="user__img">
      <img class="user-img" src="${obj.avatar_url}" alt="" />
      <a href="${obj.html_url}" class="btn">View Profile</a>
    </div>
  
    <div class="user__about">
      <div class="statistics">
        <p class="stat stat__1">Public Repos: ${obj.public_repos}</p>
        <p class="stat stat__2">Public Gists: ${obj.public_gists}</p>
        <p class="stat stat__3">Followers: ${obj.followers}</p>
        <p class="stat stat__4">Following: ${obj.following}</p>
      </div>
      <div class="infoo">
        <div class="table__info">
          <p class="about__text">Company: ${obj.company}</p>
          <p class="about__text">Website/Blog:${obj.blog}</p>
          <p class="about__text">Location:${obj.location}</p>
          <p class="about__text yes__border">Member Since:${obj.created_a}</p>
        </div>
      </div>
    </div>`;
    user.insertAdjacentHTML("beforeend", html);
  } catch (error) {
    console.log(error);
  }
};

const addRepo = async function (url) {
  try {
    let a = await fetch(url);
    let r = await a.json();
    console.log(r);
    if (r.length > 0) {
      for (let repo of r) {
        let html = `<div class="box repo">
  <a href="${repo.html_url}" class="repo__name">${repo.name}</a>
  <div class="report">
    <p class="stat stat__1">Starts: ${repo}</p>
    <p class="stat stat__2">Watchers: 25</p>
    <p class="stat stat__3">Forks: 22</p>
  </div>
</div>`;
        main.insertAdjacentHTML("afterbegin", html);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
input.addEventListener("input", function () {
  main.innerHTML = "";
  user.innerHTML = "";
  // heading.innerHTML = "";
  findUser(
    `https://api.github.com/users/${input.value}?client_id=1e0cbfc2829e1f514397&client_secret=f4bb68f93fbf8e23c7dd9f162f5a2b7ed487a53f`
  );

  addRepo(
    `https://api.github.com/users/${input.value}/repos?client_id=1e0cbfc2829e1f514397&client_secret=f4bb68f93fbf8e23c7dd9f162f5a2b7ed487a53f`
  );
});
