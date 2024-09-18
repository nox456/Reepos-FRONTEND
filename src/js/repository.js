import fetchServer from "./lib/fetch.js";
import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import user from "./is_authenticated.js";
import showErrorModal from "./lib/errorModal.js";
import { SERVER_HOST } from "./config.js";

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

const $section2 = $main.querySelector("section:nth-of-type(2)");

const $branches = $section2.querySelector("article:nth-of-type(1) p")

$branches.querySelector("span:nth-child(1)").innerText = repo_response.result.data.branches.length

$branches.querySelector("span:nth-child(2)").innerText = repo_response.result.data.branches.length > 1 ? "Ramas" : "Rama"

const $branches_dialog = document.querySelector("dialog#branches")

$branches_dialog.querySelector("header > p > span:first-child").innerText = repo_response.result.data.branches.length
$branches_dialog.querySelector("header > p > span:last-child").innerText = repo_response.result.data.branches.length > 1 ? "Ramas" : "Rama"

repo_response.result.data.branches.forEach(branch => {
    const $branch = document.createElement("li")
    if (branch.type == "primary") {
        $branch.classList.add("primary")
    }
    $branch.innerText = branch.name
    $branches_dialog.querySelector("ul").appendChild($branch)
})

const $commits = $section2.querySelector("article:nth-of-type(2)")

$commits.querySelector("span").insertAdjacentText("afterbegin",repo_response.result.data.commits_count)

$commits.querySelector("a").href = `../pages/commits?repoName=${urlParams.get("repoName")}`
$commits.querySelector("a").innerText = repo_response.result.data.commits_count > 1 ? "Commits" : "Commit"

const $contributors = $section2.querySelector("article:nth-of-type(3)")

$contributors.querySelector("span").insertAdjacentText("afterbegin",repo_response.result.data.contributors_count)
$contributors.querySelector("a").href = `../pages/contributors?repoName=${urlParams.get("repoName")}`
$contributors.querySelector("a").innerText = repo_response.result.data.contributors_count > 1 ? "Contribuidores" : "Contribuidor"

const $download = $section2.querySelector("& > button")

$download.addEventListener("click", async () => {
    const $dialog = document.createElement("dialog")

    const $message = document.createElement("p")

    $message.innerText = "Procesando..."

    $dialog.appendChild($message)

    document.body.insertAdjacentElement("afterbegin",$dialog)

    $dialog.showModal()
    const res = await fetchServer(`/repositories/download?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}` ,{
        method: "GET"
    })

    const $button = document.createElement("button")
    $button.classList.add("link")
    if (res.code != 200) {
        $button.innerText = "Recargar"
        $message.innerText = res.result.message
        $button.addEventListener("click", () => {
            location.reload()
        })
    } else {
        $button.innerText = "Aceptar"
        $message.innerText = "Repositorio descargado!"
        location.href = `${SERVER_HOST}/${res.result.data}`
        $button.addEventListener("click", async () => {
            await fetchServer("/repositories/zip", {
                method: "DELETE",
                body: { fileName: res.result.data }
            })
            location.reload()
        })
    }
    $dialog.appendChild($button)
})
