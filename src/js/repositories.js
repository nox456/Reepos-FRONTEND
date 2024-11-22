import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import showErrorModal from "./lib/errorModal.js";
import renderRepos from "./lib/renderRepos.js";
import filterRepos from "./lib/filterRepos.js";
import RepositoryService from "./services/repository.service.js";
import UserService from "./services/user.service.js";

const user = await UserService.isAuthenticated();

headerSearch();
userImage(user);

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const [repos, message] = await RepositoryService.getAll(
    urlParams.get("username"),
);

if (repos.length == 0) {
    showErrorModal(message, {
        href: `../pages/profile?username=${urlParams.get("username")}`,
        message: "Perfil",
    });
} else {
    document.title = `Repositorios de ${urlParams.get("username")}`;
    document.querySelector("main > h1").innerHTML = `
        Repositorios de
        <a href="../pages/profile?username=${urlParams.get("username")}">${urlParams.get("username")}</a>
    `;
    const $section = document.querySelector("main > section");
    $section.innerHTML = "";
    const $form = document.querySelector("main > form");

    const lang_list = await renderRepos(repos, $section);
    filterRepos(repos, $section, lang_list, $form);
}
