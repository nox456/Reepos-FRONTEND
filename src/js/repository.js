import fetchServer from "./lib/fetch.js"
import headerSearch from "./lib/headerSearch.js"
import userImage from "./lib/userImage.js"

headerSearch()
userImage()

const urlParams = new URLSearchParams(location.href.slice(location.href.indexOf("?") + 1))
const repo_response = await fetchServer(`/repositories/info?username=${urlParams.get("username")}&repoName=${urlParams.get("repoName")}`,{
    method: "GET"
})
const user_response = await fetchServer(`/users/profile?username=${urlParams.get("username")}`, {
    method: "GET"
})

const $main = document.querySelector("body > main")

const $section1 = $main.querySelector("section:nth-child(1)")

const $image = $section1.querySelector("div:nth-of-type(1) img")

$image.src = user_response.result.data.user_img
