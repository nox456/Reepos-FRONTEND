import userImage from "./lib/userImage.js";
import headerSearch from "./lib/headerSearch.js";
import fetchServer from "./lib/fetch.js";
import showErrorModal from "./lib/errorModal.js";
import user from "./is_authenticated.js";
import timeago from "./lib/timeago.js"

userImage();
headerSearch();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const $section1 = document.querySelector("main > section:first-of-type")

const $img = $section1.querySelector("div:first-of-type > a:first-of-type > button > img")

$section1.classList.remove("loading")
$img.src = user.img

const $username = $section1.querySelector("div:first-of-type > a:first-of-type")

$username.querySelector("div").innerText = user.username
$username.href = `../pages/profile?username=${user.username}`

const $repo_name = $section1.querySelector("div:first-of-type > a:nth-of-type(2)")

$repo_name.innerText = urlParams.get("repoName")
$repo_name.href = `../pages/repository?username=${user.username}&repoName=${urlParams.get("repoName")}`

const res = await fetchServer(
    `/commits?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`,
    { method: "GET" },
);

if (res.code != 200) {
    showErrorModal(res.result.message,{href: "../pages/dashboard", message: "Dashboard"}) 
} else {
    const commits = res.result.data
    const $ul = document.querySelector("main > ul")

    commits.forEach(commit => {
        const $element = document.createElement("li")
        
        const date = new Date(commit.created_at)
        const relativeDate = timeago({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getTime()
        })
        $element.innerHTML = `
            <section>
                <a href="../pages/commit?hash=${commit.hash}">${commit.title}</a>
                <p>
                    <span>${commit.author}</span>
                    -
                    <span>${relativeDate}</span>
                </p>
            </section>
            <span>${commit.hash.slice(0,7)}</span>
        `

        $ul.appendChild($element)
    })
}
