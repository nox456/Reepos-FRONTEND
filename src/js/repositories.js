import headerSearch from "./lib/headerSearch.js"
import userImage from "./lib/userImage.js"
import showErrorModal from "./lib/errorModal.js"
import renderRepos from "./lib/renderRepos.js"
import filterRepos from "./lib/filterRepos.js"
import Repository from "./models/repository.model.js"

headerSearch()
userImage()

const urlParams = new URLSearchParams(location.href.slice(location.href.indexOf("?")))

const res = await Repository.getAll(urlParams.get("username"))

if (res.code != 200) {
    showErrorModal(res.result.message,{href: `../pages/profile?username=${urlParams.get("username")}`,message: "Perfil"})
} else {
    document.title = `Repositorios de ${urlParams.get("username")}`
    document.querySelector("main > h1").innerHTML = `
        Repositorios de
        <a href="../pages/profile?username=${urlParams.get("username")}">${urlParams.get("username")}</a>
    `
    const $section = document.querySelector("main > section")
    $section.innerHTML = ""
    const $form = document.querySelector("main > form")

    const lang_list = await renderRepos(res.result.data,$section)
    filterRepos(res.result.data,$section,lang_list,$form)
}
