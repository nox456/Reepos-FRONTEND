import fetchServer from "./lib/fetch.js";
import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import user from "./is_authenticated.js";
import showErrorModal from "./lib/errorModal.js";
import { SERVER_HOST } from "./config.js";
import langColors from "./lib/langColors.js"
import { MarkdownBlock } from "../js/lib/renderMd.js";
import foldersTree from "./lib/foldersTree.js";
import renderFiles from "./lib/renderFiles.js";
import timeago from "./lib/timeago.js";

headerSearch();
userImage();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?") + 1),
);
document.title = `${urlParams.get("username")} / ${urlParams.get("repoName")} - Reepos`
const repo_response = await fetchServer(
    `/repositories/info?username=${urlParams.get("username")}&repoName=${urlParams.get("repoName")}`,
    {
        method: "GET",
    },
);

if (repo_response.code != 200) {
    showErrorModal(repo_response.result.message,{message: "Dashboard", href: "../pages/dashboard.html"})
}
const user_response = await fetchServer(
    `/users/profile?username=${urlParams.get("username")}`,
    {
        method: "GET",
    },
);
if (user_response.code != 200) {
    showErrorModal(user_response.result.message,{message: "Dashboard", href: "../pages/dashboard.html"})
}

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

if (user.username != urlParams.get("username")) {
    $config.remove()
} else {
    $config.href = `../pages/config?repoName=${urlParams.get("repoName")}`;
}

const $likes = $section1.querySelector("div:nth-of-type(2) button");

$image.src = user_response.result.data.user_img;
$section1.classList.remove("loading")
$username.querySelector("div:last-child").remove()
$username.insertAdjacentText("beforeend", urlParams.get("username"))
$username.href = `../pages/profile?username=${urlParams.get("username")}`;
$repoName.innerText = urlParams.get("repoName");
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

$section2.classList.remove("loading")
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

$commits.querySelector("a").href = `../pages/commits?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`
$commits.querySelector("a").innerText = repo_response.result.data.commits_count > 1 ? "Commits" : "Commit"

const $contributors = $section2.querySelector("article:nth-of-type(3)")

$contributors.querySelector("span").insertAdjacentText("afterbegin",repo_response.result.data.contributors_count)
$contributors.querySelector("a").href = `../pages/contributors?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`
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

const $section3 = $main.querySelector("section:nth-of-type(3)")

const $aside = $section3.querySelector("& > aside")

const $description = $aside.querySelector("& > p")

$aside.classList.remove("loading")
$description.innerText = repo_response.result.data.description

const $languages = $aside.querySelector("& > ul")

repo_response.result.data.languages.forEach(lang => {
    const $li = document.createElement("li")
    const $color = document.createElement("div")
    $color.style.backgroundColor = langColors[lang]
    $li.appendChild($color)
    $li.insertAdjacentText("beforeend", lang)

    $languages.appendChild($li)
})

const $section3_main = $section3.querySelector("& > main")

const $last_commit_section = $section3_main.querySelector("& > section:first-child")

const $last_commit_author = $last_commit_section.querySelector("span:first-child")
$section3_main.classList.remove("loading")
$last_commit_author.innerText = repo_response.result.data.last_commit.author

const $last_commit_title = $last_commit_section.querySelector("& > p:nth-of-type(1) > a")
$last_commit_title.href = `../pages/commit?hash=${repo_response.result.data.last_commit.hash}&repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`
$last_commit_title.innerText = repo_response.result.data.last_commit.title

const $last_commit_created_at = $last_commit_section.querySelector("& > p:nth-of-type(2) > span")

const created_at = new Date(repo_response.result.data.last_commit.created_at)
const created_at_relative = timeago({
    year: created_at.getFullYear(),
    month: created_at.getMonth() + 1,
    day: created_at.getDate()
})

$last_commit_created_at.innerText = created_at_relative


const $section4 = $main.querySelector("section:nth-of-type(4)")
if (repo_response.result.data.readme) {
    const $readme = new MarkdownBlock()

    $readme.mdContent = repo_response.result.data.readme

    $section4.appendChild($readme)
} else {
    const $no_readme_message = document.createElement("h1")    
    $no_readme_message.innerText = "Este repositorio no posee un README.md"
    $section4.appendChild($no_readme_message)
}


const files = repo_response.result.data.files

let tree = {}

let allFolders = []

files.forEach(file => {
    const folders = file.path.split("/", file.path.split("/").length - 1)
    folders.forEach((folder) => {
        if (!allFolders.some(f => f.name == folder)) {
            const prevFolders = folders.slice(0,folders.indexOf(folder))
            allFolders.push({
                name: folder,
                prevFolder: prevFolders[prevFolders.length - 1] || "/",
                insideFolders: [],
                files: []
            })
        }
    })
})

allFolders.forEach((folder,index) => {
    allFolders.forEach(f => {
        if (f.prevFolder == folder.name) {
            allFolders[index].insideFolders.push(f.name)
        }
    })
})

files.forEach(file => {
    const folderName = file.path.split("/", file.path.split("/").length - 1).at(-1) || "/"
    if (folderName == "/") {
        tree[file.name] = file
    }
    allFolders.forEach(folder => {
        if (folder.name == folderName) {
            allFolders[allFolders.indexOf(folder)].files.push(file)
        }
    })
})

for (const folder of allFolders.filter(f => f.prevFolder == "/")) {
    tree = {...foldersTree(folder,tree,allFolders), ...tree}
}

renderFiles(tree, null, "/")

