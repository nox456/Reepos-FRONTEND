import userImage from "./lib/userImage.js"
import headerSearch from "./lib/headerSearch.js"
import fetchServer from "./lib/fetch.js"

userImage()
headerSearch()

const urlParams = new URLSearchParams(location.href.slice(location.href.indexOf("?")))

const user_response = await fetchServer(`/users/profile?username=${urlParams.get("username")}`, {
    method: "GET"
})

const $section1 = document.querySelector("main > section:first-of-type")

$section1.classList.remove("loading")

const $title = $section1.querySelector("a:first-child")

$title.href = `../pages/profile?username=${urlParams.get("username")}`
$title.querySelector("button > img").src = user_response.result.data.user_img
$title.querySelector("div").innerText = urlParams.get("username")

const $repoName = $section1.querySelector("a:nth-of-type(2)")
$repoName.href = `../pages/repository?username=${urlParams.get("username")}&repoName=${urlParams.get(("repoName"))}`
$repoName.innerText = urlParams.get("repoName")

const $commitHash = $section1.querySelector("span:last-child")

$commitHash.innerText = urlParams.get("hash").slice(0,7)
