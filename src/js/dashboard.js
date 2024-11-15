import headerSearch from "./lib/headerSearch.js";
import user from "./is_authenticated.js";
import renderRepos from "./lib/renderRepos.js";
import filterRepos from "./lib/filterRepos.js";
import userImage from "./lib/userImage.js";
import Repository from "./models/repository.model.js"

headerSearch();
userImage()

const res = await Repository.getAll(user.username)

const $section = document.body.querySelector("main > section")
const $filtersContainer = document.querySelector("main > form")
if (res.code != 200) {
    $section.innerHTML = ""
    const $message = document.createElement("h1")
    $message.innerText = res.result.message

    $section.appendChild($message)
} else {
    const repos = res.result.data.map(r => {
        r.username = user.username
        return r
    })
    $section.innerHTML = ""
    const lang_list = await renderRepos(repos,$section)

    filterRepos(repos,$section,lang_list,$filtersContainer)
}
