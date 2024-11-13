import headerSearch from "./lib/headerSearch.js"
import userImage from "./lib/userImage.js"
import showErrorModal from "./lib/errorModal.js"
import renderUsers from "./lib/renderUsers.js"
import filterUsers from "./lib/filterUsers.js"
import User from "./models/user.model.js"

headerSearch()
userImage()

const urlParams = new URLSearchParams(location.href.slice(location.href.indexOf("?") + 1))

const user = new User(urlParams.get("username"))
const res = await user.getFollowers()

if (res.code != 200) {
    showErrorModal(res.result.message, {href: `../pages/profile?username=${urlParams.get("username")}`, message: "Perfil"})
} else {
    document.title = `Seguidores de ${urlParams.get("username")} - Reepos`
    document.querySelector("main > h1").innerHTML = `
        Seguidores de 
        <a href="../pages/profile?username=${urlParams.get("username")}">${urlParams.get("username")}</span>`
    const $section = document.querySelector("main > section")
    $section.innerHTML = ""
    await renderUsers(res.result.data,$section)

    const $form = document.querySelector("main > form")

    filterUsers(res.result.data,$section,$form)
}
