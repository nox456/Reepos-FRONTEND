import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import renderUsers from "./lib/renderUsers.js";
import renderRepos from "./lib/renderRepos.js";
import showErrorModal from "./lib/errorModal.js";
import filterUsers from "./lib/filterUsers.js";
import filterRepos from "./lib/filterRepos.js";
import User from "./models/user.model.js";
import Repository from "./models/repository.model.js";
import UserService from "./services/user.service.js";

const user = await UserService.isAuthenticated();

headerSearch();
userImage(user);

const urlParam = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const searchParameter = location.href.slice(
    location.href.indexOf("_") + 1,
    location.href.indexOf("?"),
);

const $section = document.querySelector("main > section");
const $filtersContainer = document.querySelector("main > aside > form");
let res;

if (searchParameter == "users") {
    const users = await UserService.search(urlParam.get("username"));
    await renderUsers(users, $section);
    filterUsers(users, $section, $filtersContainer);
} else {
    res = await Repository.search(urlParam.get("repoName"));

    $section.innerHTML = "";
    if (res.code == 200) {
        const lang_list = await renderRepos(res.result.data, $section, true);
        filterRepos(res.result.data, $section, lang_list, $filtersContainer);
    } else if (res.code == 404) {
        const $message = document.createElement("p");
        $message.innerText = `No se encontraron repositorios con el nombre: ${urlParam.get("repoName")}`;
        $section.appendChild($message);
    } else {
        showErrorModal(res.result.message, {
            href: "../pages/dashboard.html",
            message: "Dashboard",
        });
    }
}
