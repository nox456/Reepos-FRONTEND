import userImage from "./lib/userImage.js";
import headerSearch from "./lib/headerSearch.js";
import showErrorModal from "./lib/errorModal.js";
import renderContributors from "./lib/renderContributors.js";
import filterContributors from "./lib/filterContributors.js";
import Contributor from "./models/contributor.model.js";
import UserService from "./services/user.service.js"

const user = await UserService.isAuthenticated()

userImage(user);
headerSearch();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const repoName = urlParams.get("repoName");
const username = urlParams.get("username");

const user_profile = await UserService.getProfile(username);

const contributors_response = await Contributor.getAll(repoName, username);

if (contributors_response.code != 200) {
    showErrorModal(contributors_response.result.message, {
        href: "../pages/dashboard.html",
        message: "Dashboard",
    });
}

const $section1 = document.querySelector("body > main > section:first-child");

$section1.classList.remove("loading");

const $image = $section1.querySelector("& > div > a:first-child");

$image.href = `../pages/profile?username=${username}`;
$image.querySelector("img").src = user_profile.user_img;
$image.querySelector("div").innerText = user_profile.user_name;

$section1.querySelector("a:nth-child(2)").innerText = repoName;
$section1.querySelector("a:nth-child(2)").href =
    `../pages/repository?repoName=${repoName}&username=${username}`;

const $section2 = document.querySelector(
    "body > main > section:nth-of-type(2)",
);

const $form = $section2.querySelector("form");

const $list = document.querySelector("body > main > ul");

renderContributors(contributors_response.result.data, $list, {
    username,
    repoName,
});

filterContributors(contributors_response.result.data, $list, $form, {
    username,
    repoName,
});
