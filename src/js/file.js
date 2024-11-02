import fetchServer from "./lib/fetch.js";
import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";

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

const $pre = document.createElement("pre")
$pre.classList.add("line-numbers")
const $code = document.createElement("code")

if (extension == "html") {
    $code.innerHTML = `<!--${file.content}-->`
    $code.classList.add("language-markup")
} else {
    $code.innerHTML = file.content
    $code.classList.add(`language-${extension}`)
}
$pre.appendChild($code)

document.querySelector("body > main").insertAdjacentElement("afterbegin",$pre)

document.head.insertAdjacentHTML("beforeend",`<link rel="stylesheet" href="../css/prism.css">`)

await import("../js/lib/prism.js")

console.log(file)
