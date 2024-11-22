import headerSearch from "./lib/headerSearch.js";
import renderRepos from "./lib/renderRepos.js";
import filterRepos from "./lib/filterRepos.js";
import userImage from "./lib/userImage.js";
import RepositoryService from "./services/repository.service.js"
import UserService from "./services/user.service.js"

const user = await UserService.isAuthenticated()

headerSearch();
userImage(user)

let [repos,message] = await RepositoryService.getAll(user.username)

const $section = document.body.querySelector("main > section")
const $filtersContainer = document.querySelector("main > form")
if (repos.length == 0) {
    $section.innerHTML = ""
    const $message = document.createElement("h1")
    $message.innerText = message

    $section.appendChild($message)
} else {
    repos = repos.map(r => {
        r.username = user.username
        return r
    })
    $section.innerHTML = ""
    const lang_list = await renderRepos(repos,$section)

    filterRepos(repos,$section,lang_list,$filtersContainer)
}
