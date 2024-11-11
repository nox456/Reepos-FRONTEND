import fetchServer from "./lib/fetch.js";
import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import timeago from "./lib/timeago.js"

headerSearch();
userImage();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const repoName = urlParams.get("repoName");
const fileId = urlParams.get("fileId");
const username = urlParams.get("username");

const file_response = await fetchServer(
    `/files?repoName=${repoName}&fileId=${fileId}&username=${username}`,
    { method: "GET" },
);

const file = file_response.result.data

const extension = file.name.slice(file.name.lastIndexOf(".") + 1)

const $pre = document.querySelector("body > main > pre")
$pre.classList.add("line-numbers")
const $code = document.createElement("code")

if (extension == "html") {
    const $script = document.createElement("script")
    $script.type = "text/plain"
    $script.classList.add("language-markup")
    $script.classList.add("line-numbers")
    $script.innerHTML = file.content
    $pre.remove()
    document.querySelector("body > main").insertAdjacentElement("afterbegin",$script)
} else {
    $code.innerHTML = file.content
    $code.classList.add(`language-${extension}`)
}
$pre.appendChild($code)

document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="../css/prism.css">`)

await import("../js/lib/prism.js")

const $name_size = document.querySelector("body > main > section > p:nth-of-type(1)")
$name_size.insertAdjacentText("beforeend",`${file.name} - ${file.size}`)

const $lines = document.querySelector("body > main > section > p:nth-of-type(2)")
$lines.insertAdjacentText("beforeend",file.content ? file.content.split("\n").length - 1 : "null")

const $commit_title = document.querySelector("main > section > p:nth-of-type(3) > a")
$commit_title.href = `../pages/commit?hash=${file.last_commit.hash}&repoName=${repoName}&username=${username}`
$commit_title.insertAdjacentText("beforeend",file.last_commit.title)

const $commit_date = document.querySelector("main > section > p:nth-of-type(3) > span")

const date = new Date(file.last_commit.created_at)
$commit_date.insertAdjacentText("beforeend",timeago({
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDate()
}))

const $download = document.querySelector("main > section > a")
$download.href = file.url
