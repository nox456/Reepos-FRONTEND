import userImage from "./lib/userImage.js";
import headerSearch from "./lib/headerSearch.js";
import fetchServer from "./lib/fetch.js";
import showErrorModal from "./lib/errorModal.js";
import filterCommits from "./lib/filterCommits.js";
import renderCommits from "./lib/renderCommits.js"

userImage();
headerSearch();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const user_response = await fetchServer(`/users/profile?username=${urlParams.get("username")}`, {method: "GET"})

if (user_response.code != 200) {
    showErrorModal(user_response.result.message, {href: "../pages/dashboard", message: "Dashboard"})
}

const $section1 = document.querySelector("main > section:first-of-type")

const $img = $section1.querySelector("div:first-of-type > a:first-of-type > button > img")

$section1.classList.remove("loading")
$img.src = user_response.result.data.user_img

const $username = $section1.querySelector("div:first-of-type > a:first-of-type")

$username.querySelector("div").innerText = user_response.result.data.user_name
$username.href = `../pages/profile?username=${user_response.result.data.user_name}`

const $repo_name = $section1.querySelector("div:first-of-type > a:nth-of-type(2)")

$repo_name.innerText = urlParams.get("repoName")
$repo_name.href = `../pages/repository?username=${user_response.result.data.user_name}&repoName=${urlParams.get("repoName")}`

const res = await fetchServer(
    `/commits?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`,
    { method: "GET" },
);

if (res.code != 200) {
    showErrorModal(res.result.message,{href: "../pages/dashboard", message: "Dashboard"}) 
} else {
    const commits = res.result.data
    const $ul = document.querySelector("main > ul")

    renderCommits(commits,$ul,{username: urlParams.get("username"),repoName: urlParams.get("repoName")})

    filterCommits(commits,$ul, {username: urlParams.get("username"),repoName: urlParams.get("repoName")})
}
