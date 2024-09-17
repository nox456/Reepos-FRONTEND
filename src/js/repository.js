import fetchServer from "./lib/fetch.js";
import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import user from "./is_authenticated.js";
import showErrorModal from "./lib/errorModal.js";

headerSearch();
userImage();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?") + 1),
);
const repo_response = await fetchServer(
    `/repositories/info?username=${urlParams.get("username")}&repoName=${urlParams.get("repoName")}`,
    {
        method: "GET",
    },
);
const user_response = await fetchServer(
    `/users/profile?username=${urlParams.get("username")}`,
    {
        method: "GET",
    },
);

const user_liked_response = await fetchServer(`/repositories/like?repoName=${urlParams.get("repoName")}&userOwnerName=${urlParams.get("username")}`, {
    method: "GET",
    cookies: true
})

const $main = document.querySelector("body > main");

const $section1 = $main.querySelector("section:nth-child(1)");

const $image = $section1.querySelector("div:nth-of-type(1) img");
const $username = $section1.querySelector("div:nth-of-type(1) a");
const $repoName = $section1.querySelector("div:nth-of-type(1) span");
const $config = $section1.querySelector("div:nth-of-type(2) a");
const $likes = $section1.querySelector("div:nth-of-type(2) button");

$image.src = user_response.result.data.user_img;
$username.innerText = urlParams.get("username");
$username.href = `../pages/profile?username=${urlParams.get("username")}`;
$repoName.innerText = urlParams.get("repoName");
$config.href = `../pages/config?repoName=${urlParams.get("repoName")}`;
$likes.querySelector("span").innerText = repo_response.result.data.likes;

if (user_liked_response.result.data) {
    $likes.classList.add("liked")
}

$likes.addEventListener("click", async () => {
    const username = user.username;
    const userOwnerName = urlParams.get("username");
    const repoName = urlParams.get("repoName")
    let res
    if ($likes.classList.contains("liked")) {
        res = await fetchServer("/repositories/remove-like", {
            method: "PUT",
            body: {
                repoName,
                userOwnerName,
                username
            }
        })
    } else {
        res = await fetchServer("/repositories/like", {
            method: "PUT",
            body: { repoName, username, userOwnerName },
        });
    }
    if (res.code != 200) {
        showErrorModal(res.result.message, {
            message: "Dashboard",
            href: "../pages/dashboard",
        });
    } else {
        location.reload();
    }
});
