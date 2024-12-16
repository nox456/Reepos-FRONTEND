import userImage from "./lib/userImage.js";
import headerSearch from "./lib/headerSearch.js";
import renderContributors from "./lib/renderContributors.js";
import filterContributors from "./lib/filterContributors.js";
import UserService from "./services/user.service.js"
import ContributorService from "./services/contributor.service.js";

const user = await UserService.isAuthenticated()

userImage(user);
headerSearch();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const repoName = urlParams.get("repoName");
const username = urlParams.get("username");

const user_profile = await UserService.getProfile(username);

const contributors = await ContributorService.getAll(repoName, username);

const $section1 = document.querySelector("body > main > section:first-child");

$section1.classList.remove("loading");

const $image = $section1.querySelector("& > div > a:first-child");

$image.href = `../pages/profile?username=${username}`;
$image.querySelector("img").src = user_profile.user_img == "" ?  "../resources/images/default_user_image.png" : user_profile.user_img;
$image.querySelector("div").innerText = user_profile.user_name;

$section1.querySelector("a:nth-child(2)").innerText = repoName;
$section1.querySelector("a:nth-child(2)").href =
    `../pages/repository?repoName=${repoName}&username=${username}`;

const $section2 = document.querySelector(
    "body > main > section:nth-of-type(2)",
);

const $form = $section2.querySelector("form");

const $list = document.querySelector("body > main > ul");

renderContributors(contributors, $list, {
    username,
    repoName,
});

filterContributors(contributors, $list, $form, {
    username,
    repoName,
});
