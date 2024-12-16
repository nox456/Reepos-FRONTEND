import userImage from "./lib/userImage.js";
import headerSearch from "./lib/headerSearch.js";
import timeago from "./lib/timeago.js";
import { MOD_ICONS, MOD_COLORS, MOD_DESCRIPT } from "./lib/modifications.js";
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

$section1.classList.remove("loading");

const $title = $section1.querySelector("a:first-child");

$title.href = `../pages/profile?username=${urlParams.get("username")}`;
$title.querySelector("button > img").src = user_profile.user_img;
$title.querySelector("div").innerText = urlParams.get("username");

const $repoName = $section1.querySelector("a:nth-of-type(2)");
$repoName.href = `../pages/repository?username=${urlParams.get("username")}&repoName=${urlParams.get("repoName")}`;
$repoName.innerText = urlParams.get("repoName");

$section1.querySelector("a:nth-of-type(3)").href =
    `../pages/commits?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`;

const $commitHash = $section1.querySelector("span:last-child");

$commitHash.innerText = urlParams.get("hash").slice(0, 7);

const commit= await CommitService.info(
    urlParams.get("hash"),
    urlParams.get("repoName"),
    urlParams.get("username"),
);

const $section2 = document.querySelector(
    "body > main > section:nth-of-type(2)",
);

const $section2_header = $section2.querySelector("header");

const $commit_title = $section2_header.querySelector("h1");
$commit_title.innerText = commit.title;

const $commit_branch = $section2_header.querySelector(
    "& > p > span:first-of-type",
);
$commit_branch.insertAdjacentText("beforeend", commit.branch);

const $commit_date = $section2_header.querySelector(
    "& > p > span:nth-of-type(2)",
);

const date = new Date(commit.created_at);
const relative_date = timeago({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
});
$commit_date.insertAdjacentText("beforeend", relative_date);

const $commit_author = $section2_header.querySelector(
    "& > p > span:nth-of-type(3)",
);
$commit_author.insertAdjacentText("beforeend", commit.author);

const $commit_hash = $section2_header.querySelector(
    "& > p > span:nth-of-type(4)",
);
$commit_hash.insertAdjacentText("beforeend", commit.hash);

const $commit_content = $section2.querySelector("main > aside");
if (commit.content == "") {
    $commit_content.innerText = "No hay contenido...";
    $commit_content.style.display = "flex";
    $commit_content.style.justifyContent = "center";
    $commit_content.style.alignItems = "center";
} else {
    $commit_content.innerText = commit.content;
}

commit.files.forEach((file) => {
    const $element = document.createElement("li");
    const $name = document.createElement("span");
    $name.innerText = file.name;

    const $size = document.createElement("span");
    $size.innerText = file.size;

    const $mod = document.createElement("span");
    $mod.title = MOD_DESCRIPT[file.type];
    $mod.innerHTML = `
            <div style="border-color: ${MOD_COLORS[file.type]}">
                <svg
                    viewBox="0 0 24 24"
                    style="color: ${MOD_COLORS[file.type]}"
                >
                    ${MOD_ICONS[file.type]}
                </svg>
            </div>
    `;
    $element.appendChild($name);
    $element.appendChild($size);
    $element.appendChild($mod);

    $section2.querySelector("main > ul").appendChild($element);
});

const $prev_commit = $section2.querySelector("footer > a:first-child");

if (commit.prev_commit_hash) {
    $prev_commit.href = `../pages/commit?hash=${commit.prev_commit_hash}&repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`;
} else {
    $prev_commit.setAttribute("disabled", "true");
}

const $next_commit = $section2.querySelector("footer > a:last-child");

if (commit.next_commit_hash) {
    $next_commit.href = `../pages/commit?hash=${commit.next_commit_hash}&repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`;
} else {
    $next_commit.setAttribute("disabled", "true");
}
