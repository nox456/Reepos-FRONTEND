import userImage from "./lib/userImage.js";
import headerSearch from "./lib/headerSearch.js";
import filterCommits from "./lib/filterCommits.js";
import renderCommits from "./lib/renderCommits.js";
import UserService from "./services/user.service.js"
import CommitService from "./services/commit.service.js";

const user = await UserService.isAuthenticated()

userImage(user);
headerSearch();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const user_profile = await UserService.getProfile(urlParams.get("username"));

const $section1 = document.querySelector("main > section:first-of-type");

const $img = $section1.querySelector(
    "div:first-of-type > a:first-of-type > button > img",
);

$section1.classList.remove("loading");
$img.src = user_profile.user_img;

const $username = $section1.querySelector(
    "div:first-of-type > a:first-of-type",
);

$username.querySelector("div").innerText = user_profile.user_name;
$username.href = `../pages/profile?username=${user_profile.user_name}`;

const $repo_name = $section1.querySelector(
    "div:first-of-type > a:nth-of-type(2)",
);

$repo_name.innerText = urlParams.get("repoName");
$repo_name.href = `../pages/repository?username=${user_profile.user_name}&repoName=${urlParams.get("repoName")}`;

const commits = await CommitService.getAll(
    urlParams.get("repoName"),
    urlParams.get("username"),
);

const $ul = document.querySelector("main > ul");

renderCommits(commits, $ul, {
    username: urlParams.get("username"),
    repoName: urlParams.get("repoName"),
});

filterCommits(commits, $ul, {
    username: urlParams.get("username"),
    repoName: urlParams.get("repoName"),
});
