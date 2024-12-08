import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import langColors from "./lib/langColors.js";
import { MarkdownBlock } from "../js/lib/renderMd.js";
import foldersTree from "./lib/foldersTree.js";
import renderFiles from "./lib/renderFiles.js";
import timeago from "./lib/timeago.js";
import RepositoryService from "./services/repository.service.js"
import UserService from "./services/user.service.js"

const userAuthenticated = await UserService.isAuthenticated()

headerSearch();
userImage(userAuthenticated);

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?") + 1),
);
document.title = `${urlParams.get("username")} / ${urlParams.get("repoName")} - Reepos`;

const repo_info = await RepositoryService.info(
    urlParams.get("repoName"),
    urlParams.get("username"),
);


const user_profile = await UserService.getProfile(urlParams.get("username"));

const isLiked = await RepositoryService.checkLike(
    urlParams.get("repoName"),
    urlParams.get("username"),
);

const $main = document.querySelector("body > main");

const $section1 = $main.querySelector("section:nth-child(1)");
if (userAuthenticated.username == urlParams.get("username")) {
    const $config = document.createElement("a");
    $config.href = `../pages/config?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`;
    $config.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path
                d="M12 16c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.084 0 2 .916 2 2s-.916 2-2 2-2-.916-2-2 .916-2 2-2z"
            ></path>
            <path
                d="m2.845 16.136 1 1.73c.531.917 1.809 1.261 2.73.73l.529-.306A8.1 8.1 0 0 0 9 19.402V20c0 1.103.897 2 2 2h2c1.103 0 2-.897 2-2v-.598a8.132 8.132 0 0 0 1.896-1.111l.529.306c.923.53 2.198.188 2.731-.731l.999-1.729a2.001 2.001 0 0 0-.731-2.732l-.505-.292a7.718 7.718 0 0 0 0-2.224l.505-.292a2.002 2.002 0 0 0 .731-2.732l-.999-1.729c-.531-.92-1.808-1.265-2.731-.732l-.529.306A8.1 8.1 0 0 0 15 4.598V4c0-1.103-.897-2-2-2h-2c-1.103 0-2 .897-2 2v.598a8.132 8.132 0 0 0-1.896 1.111l-.529-.306c-.924-.531-2.2-.187-2.731.732l-.999 1.729a2.001 2.001 0 0 0 .731 2.732l.505.292a7.683 7.683 0 0 0 0 2.223l-.505.292a2.003 2.003 0 0 0-.731 2.733zm3.326-2.758A5.703 5.703 0 0 1 6 12c0-.462.058-.926.17-1.378a.999.999 0 0 0-.47-1.108l-1.123-.65.998-1.729 1.145.662a.997.997 0 0 0 1.188-.142 6.071 6.071 0 0 1 2.384-1.399A1 1 0 0 0 11 5.3V4h2v1.3a1 1 0 0 0 .708.956 6.083 6.083 0 0 1 2.384 1.399.999.999 0 0 0 1.188.142l1.144-.661 1 1.729-1.124.649a1 1 0 0 0-.47 1.108c.112.452.17.916.17 1.378 0 .461-.058.925-.171 1.378a1 1 0 0 0 .471 1.108l1.123.649-.998 1.729-1.145-.661a.996.996 0 0 0-1.188.142 6.071 6.071 0 0 1-2.384 1.399A1 1 0 0 0 13 18.7l.002 1.3H11v-1.3a1 1 0 0 0-.708-.956 6.083 6.083 0 0 1-2.384-1.399.992.992 0 0 0-1.188-.141l-1.144.662-1-1.729 1.124-.651a1 1 0 0 0 .471-1.108z"
            ></path>
        </svg>
    `;
    $section1
        .querySelector("div:nth-of-type(2)")
        .insertAdjacentElement("afterbegin", $config);
}

const $image = $section1.querySelector("div:nth-of-type(1) img");
const $username = $section1.querySelector("div:nth-of-type(1) a");
const $repoName = $section1.querySelector("div:nth-of-type(1) span");

const $likes = $section1.querySelector("div:nth-of-type(2) button");

$image.src = user_profile.user_img;
$section1.classList.remove("loading");
$username.querySelector("div:last-child").remove();
$username.insertAdjacentText("beforeend", urlParams.get("username"));
$username.href = `../pages/profile?username=${urlParams.get("username")}`;
$repoName.innerText = urlParams.get("repoName");
$likes.querySelector("span").innerText = repo_info.likes;

if (isLiked) {
    $likes.classList.add("liked");
}

$likes.addEventListener("click", async () => {
    const username = userAuthenticated.username;
    const userOwnerName = urlParams.get("username");
    const repoName = urlParams.get("repoName");
    if (isLiked) {
        await RepositoryService.removeLike({
            repoName,
            userOwnerName,
            username,
        });
    } else {
        await RepositoryService.like(repoName, username, userOwnerName);
    }
});

const $section2 = $main.querySelector("section:nth-of-type(2)");

const $branches = $section2.querySelector("article:nth-of-type(1) p");

$section2.classList.remove("loading");
$branches.querySelector("span:nth-child(1)").innerText =
    repo_info.branches.length;

$branches.querySelector("span:nth-child(2)").innerText =
    repo_info.branches.length > 1 ? "Ramas" : "Rama";

const $branches_dialog = document.querySelector("dialog#branches");

$branches_dialog.querySelector("header > p > span:first-child").innerText =
    repo_info.branches.length;
$branches_dialog.querySelector("header > p > span:last-child").innerText =
    repo_info.branches.length > 1 ? "Ramas" : "Rama";

repo_info.branches.forEach((branch) => {
    const $branch = document.createElement("li");
    if (branch.type == "primary") {
        $branch.classList.add("primary");
    }
    $branch.innerText = branch.name;
    $branches_dialog.querySelector("ul").appendChild($branch);
});

const $commits = $section2.querySelector("article:nth-of-type(2)");

$commits
    .querySelector("span")
    .insertAdjacentText("afterbegin", repo_info.commits_count);

$commits.querySelector("a").href =
    `../pages/commits?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`;
$commits.querySelector("a").innerText =
    repo_info.commits_count > 1 ? "Commits" : "Commit";

const $contributors = $section2.querySelector("article:nth-of-type(3)");

$contributors
    .querySelector("span")
    .insertAdjacentText(
        "afterbegin",
        repo_info.contributors_count,
    );
$contributors.querySelector("a").href =
    `../pages/contributors?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`;
$contributors.querySelector("a").innerText =
    repo_info.contributors_count > 1
        ? "Contribuidores"
        : "Contribuidor";

const $download = $section2.querySelector("& > button");

$download.addEventListener("click", async () => {
    await RepositoryService.download(
        urlParams.get("repoName"),
        urlParams.get("username"),
    );
});

const $section3 = $main.querySelector("section:nth-of-type(3)");

const $aside = $section3.querySelector("& > aside");

const $description = $aside.querySelector("& > p");

$aside.classList.remove("loading");
$description.innerText = repo_info.description;

const $languages = $aside.querySelector("& > ul");

repo_info.languages.forEach((lang) => {
    const $li = document.createElement("li");
    const $color = document.createElement("div");
    $color.style.backgroundColor = langColors[lang];
    $li.appendChild($color);
    $li.insertAdjacentText("beforeend", lang);

    $languages.appendChild($li);
});

const $section3_main = $section3.querySelector("& > main");

const $last_commit_section = $section3_main.querySelector(
    "& > section:first-child",
);

const $last_commit_author =
    $last_commit_section.querySelector("span:first-child");
$section3_main.classList.remove("loading");
$last_commit_author.innerText = repo_info.last_commit.author;

const $last_commit_title = $last_commit_section.querySelector(
    "& > p:nth-of-type(1) > a",
);
$last_commit_title.href = `../pages/commit?hash=${repo_info.last_commit.hash}&repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`;
$last_commit_title.innerText = repo_info.last_commit.title;

const $last_commit_created_at = $last_commit_section.querySelector(
    "& > p:nth-of-type(2) > span",
);

const created_at = new Date(repo_info.last_commit.created_at);
const created_at_relative = timeago({
    year: created_at.getFullYear(),
    month: created_at.getMonth() + 1,
    day: created_at.getDate(),
});

$last_commit_created_at.innerText = created_at_relative;

const $section4 = $main.querySelector("section:nth-of-type(4)");
if (repo_info.readme) {
    const $readme = new MarkdownBlock();

    $readme.mdContent = repo_info.readme;

    $section4.appendChild($readme);
} else {
    const $no_readme_message = document.createElement("h1");
    $no_readme_message.innerText = "Este repositorio no posee un README.md";
    $section4.appendChild($no_readme_message);
}

const files = repo_info.files;

let tree = {};

let allFolders = [];

files.forEach((file) => {
    const folders = file.path.split("/", file.path.split("/").length - 1);
    folders.forEach((folder) => {
        if (!allFolders.some((f) => f.name == folder)) {
            const prevFolders = folders.slice(0, folders.indexOf(folder));
            allFolders.push({
                name: folder,
                prevFolder: prevFolders[prevFolders.length - 1] || "/",
                insideFolders: [],
                files: [],
            });
        }
    });
});

allFolders.forEach((folder, index) => {
    allFolders.forEach((f) => {
        if (f.prevFolder == folder.name) {
            allFolders[index].insideFolders.push(f.name);
        }
    });
});

files.forEach((file) => {
    const folderName =
        file.path.split("/", file.path.split("/").length - 1).at(-1) || "/";
    if (folderName == "/") {
        tree[file.name] = file;
    }
    allFolders.forEach((folder) => {
        if (folder.name == folderName) {
            allFolders[allFolders.indexOf(folder)].files.push(file);
        }
    });
});

for (const folder of allFolders.filter((f) => f.prevFolder == "/")) {
    tree = { ...foldersTree(folder, tree, allFolders), ...tree };
}

renderFiles(tree, null, "/", {
    repoName: urlParams.get("repoName"),
    username: urlParams.get("username"),
});
