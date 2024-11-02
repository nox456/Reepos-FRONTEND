import userImage from "./lib/userImage.js";
import headerSearch from "./lib/headerSearch.js";
import fetchServer from "./lib/fetch.js";
import showErrorModal from "./lib/errorModal.js";

userImage();
headerSearch();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const repoName = urlParams.get("repoName");
const username = urlParams.get("username");

const user_response = await fetchServer(`/users/profile?username=${username}`, {
    method: "GET",
});

const contributors_response = await fetchServer(
    `/contributors?username=${username}&repoName=${repoName}`,
    { method: "GET" },
);

if (user_response.code != 200) {
    showErrorModal(user_response.result.message, {
        href: "../pages/dashboard.html",
        message: "Dashboard",
    });
}
if (contributors_response.code != 200) {
    showErrorModal(user_response.result.message, {
        href: "../pages/dashboard.html",
        message: "Dashboard",
    });
}

const $section1 = document.querySelector("body > main > section:first-child");

$section1.classList.remove("loading");

const $image = $section1.querySelector("& > div > a:first-child");

$image.href = `../pages/profile?username=${username}`;
$image.querySelector("img").src = user_response.result.data.user_img;
$image.querySelector("div").innerText = user_response.result.data.user_name;

$section1.querySelector("a:nth-child(2)").innerText = repoName;
$section1.querySelector("a:nth-child(2)").href =
    `../pages/repository?repoName=${repoName}&username=${username}`;

const $section2 = document.querySelector("body > main > section:nth-of-type(2)");

const $list = document.querySelector("body > main > ul");

console.log(contributors_response.result.data);

contributors_response.result.data.forEach(contributor => {
    const $element = document.createElement("li")
    const $name = document.createElement("span")
    $name.innerText = contributor.name
    const $last_commit = document.createElement("span")
    $last_commit.innerText = contributor.last_commit_title
    const $commits = document.createElement("span")
    $commits.innerText = contributor.commits_created

    $element.appendChild($name)
    $element.appendChild($last_commit)
    $element.appendChild($commits)
    $list.appendChild($element)
})
