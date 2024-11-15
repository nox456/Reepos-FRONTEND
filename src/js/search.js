import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import renderUsers from "./lib/renderUsers.js";
import renderRepos from "./lib/renderRepos.js"
import showErrorModal from "./lib/errorModal.js";
import filterUsers from "./lib/filterUsers.js";
import filterRepos from "./lib/filterRepos.js"
import User from "./models/user.model.js";
import Repository from "./models/repository.model.js"

headerSearch();
userImage();

const urlParam = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const searchParameter = location.href.slice(
    location.href.indexOf("_") + 1,
    location.href.indexOf("?"),
);

const $section = document.querySelector("main > section");
const $filtersContainer = document.querySelector("main > aside > form")
let res

if (searchParameter == "users") {
    res = await User.search(urlParam.get("username"))
} else {
    res = await Repository.search(urlParam.get("repoName"))
}


$section.innerHTML = "";
if (res.code == 200) {
    if (searchParameter == "repositories") {
        const lang_list = await renderRepos(res.result.data,$section,true)
        filterRepos(res.result.data,$section,lang_list,$filtersContainer)
    } else {
        await renderUsers(res.result.data, $section);
        filterUsers(res.result.data, $section,$filtersContainer);
    }
} else if (res.code == 404) {
    const $message = document.createElement("p");
    if (searchParameter == "repositories") {
        $message.innerText = `No se encontraron repositorios con el nombre: ${urlParam.get("repoName")}`;
    } else {
        $message.innerText = `No se encontraron usuarios con el nombre: ${urlParam.get("username")}`;
    }
    $section.appendChild($message);
} else {
    showErrorModal(res.result.message, {
        href: "../pages/dashboard.html",
        message: "Dashboard",
    });
}
