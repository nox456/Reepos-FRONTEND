import headerSearch from "./lib/headerSearch.js"
import userImage from "./lib/userImage.js"
import fetchServer from "./lib/fetch.js"
import showErrorModal from "./lib/errorModal.js"
import renderUsers from "./lib/renderUsers.js"
import filterUsers from "./lib/filterUsers.js"

headerSearch()
userImage()

const urlParams = new URLSearchParams(location.href.slice(location.href.indexOf("?") + 1))

const res = await fetchServer(`/users/followers?username=${urlParams.get("username")}`, {
    method: "GET"
})

if (res.code != 200) {
    showErrorModal(res.result.message, {href: `../pages/profile?username=${urlParams.get("username")}`, message: "Perfil"})
} else {
    document.querySelector("main > h1").innerHTML = `
        Seguidores de 
        <a href="../pages/profile?username=${urlParams.get("username")}">${urlParams.get("username")}</span>`
    const $section = document.querySelector("main > section")
    $section.innerHTML = ""
    await renderUsers(res.result.data,$section)

    const $form = document.querySelector("main > form")

    filterUsers(res.result.data,$section,$form)
}
