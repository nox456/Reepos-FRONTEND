import headerSearch from "../js/lib/headerSearch.js";
import userImage from "../js/lib/userImage.js";
import showErrorModal from "./lib/errorModal.js";
import User from "./models/user.model.js";
import UserService from "./services/user.service.js"

const user = await UserService.isAuthenticated()

headerSearch();
userImage(user);

const $form = document.querySelector("main > section > form");

let $password;
if (location.href.includes("delete")) {
    $password = $form.querySelector("input[type=password]");
} else {
    $password = $form.querySelector("input[type=password]:nth-child(2)");
}

$form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = $password.value;

    let res;
    let newUsername;

    if (location.href.includes("username")) {
        const $new_username = $form.querySelector("input[type=text]");
        newUsername = $new_username.value;

        res = await User.changeUsername(newUsername, password);
    } else if (location.href.includes("password")) {
        const $newPassword = document.querySelector(
            "input[type=password]:nth-child(1)",
        );
        const newPassword = $newPassword.value;

        res = await User.changePassword(password, newPassword);
    } else {
        res = await User.delete(password)
        await User.logout()
    }

    if (res.code == 200) {
        const $dialog = document.createElement("dialog");
        const $message = document.createElement("p");
        if (location.href.includes("username")) {
            $message.innerText = "Nombre de usuario cambiado!";
        } else if (location.href.includes("password")) {
            $message.innerText = "Contraseña Cambiada!";
        } else {
            $message.innerText = "Cuenta eliminada";
        }

        const $link = document.createElement("a");
        if (location.href.includes("username")) {
            $link.href = `../pages/profile?username=${newUsername}`;
        } else if (location.href.includes("password")) {
            $link.href = `../pages/profile?username=${user.username}`;
        } else {
            $link.href = `../index.html`;
        }
        if (location.href.includes("delete")) {
            $link.innerText = "Página Principal";
        } else {
            $link.innerText = "Perfil";
        }
        $link.classList.add("link");

        $dialog.appendChild($message);
        $dialog.appendChild($link);

        document.body.insertAdjacentElement("afterbegin", $dialog);
        $dialog.showModal();
    } else if (res.code == 400 || res.code == 403) {
        const $error_message = document.querySelector(
            "main > section > #error-message",
        );
        $error_message.innerText = res.result.message;
    } else {
        showErrorModal(res.result.message, {
            href: `../pages/profile?username=${user.username}`,
            message: "Perfil",
        });
    }
});
