import user from "../is_authenticated.js";
import fetchServer from "./fetch.js";

/**
 * Render the user image with a loader in the header
 * */
export default function userImage() {
    const $user_button = document.querySelector("header > div:last-child > button");
    const $user_image = $user_button.querySelector("img");

    const urlParam = new URLSearchParams(
        location.href.slice(location.href.indexOf("?")),
    );

    if (urlParam.get("username") == user.username) {
        $user_image.src = "../../resources/images/user_profile_menu.png"
    } else {
        $user_image.src =
            user.img == "" ? "../resources/images/default_user_image.png" : user.img;
    }
    $user_button.classList.remove("loading")

    const $menu = document.createElement("div")
    $menu.id = "menu-profile"

    const $logout_button = document.createElement("button")
    $logout_button.innerText = "Cerrar Sesión"

    $logout_button.addEventListener("click", async () => {
        await fetchServer("/auth/logout", {
            method: "GET",
            cookies: true
        })
        location.href = "../../index.html"
    })

    if (urlParam.get("username") == user.username) {
        const $change_username = document.createElement("a")
        $change_username.href = '../../pages/change_username'
        $change_username.innerText = "Cambiar nombre de usuario"

        const $change_password = document.createElement("a")
        $change_password.href = '../../pages/change_password'
        $change_password.innerText = "Cambiar contraseña"

        const $delete_account = document.createElement("a")
        $delete_account.href = '../../pages/delete_account'
        $delete_account.innerText = "Eliminar cuenta"

        $menu.appendChild($change_username)
        $menu.insertAdjacentHTML("beforeend","<hr>")
        $menu.appendChild($change_password)
        $menu.insertAdjacentHTML("beforeend","<hr>")
        $menu.appendChild($delete_account)
        $menu.insertAdjacentHTML("beforeend","<hr>")
    } else {
        const $profile_link = document.createElement("a")
        $profile_link.href = `../../pages/profile?username=${user.username}`
        $profile_link.innerText = "Ver perfil"

        $menu.appendChild($profile_link)
        $menu.insertAdjacentHTML("beforeend","<hr>")
    }


    $menu.appendChild($logout_button)

    $user_button.addEventListener("click",() => {
        document.body.appendChild($menu)
    })
    document.body.addEventListener("click", e => {
        if (e.target != $menu && e.target != $user_image && Array.from(document.body.children).includes($menu))  {
            $menu.remove()
        }
    })
}
