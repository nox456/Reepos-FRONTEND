import headerSearch from "../js/lib/headerSearch.js";
import userImage from "../js/lib/userImage.js";
import showErrorModal from "./lib/errorModal.js";
import fetchServer from "./lib/fetch.js";
import user from "./is_authenticated.js";

headerSearch();
userImage();

const $form = document.querySelector("main > section > form");

const $password = $form.querySelector("input[type=password]:nth-child(2)");

$form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const password = $password.value;

    let res;
    let newUsername

    if (location.href.includes("username")) {
        const $new_username = $form.querySelector("input[type=text]");
        newUsername = $new_username.value;

        res = await fetchServer("/users/change-username", {
            method: "PUT",
            cookies: true,
            body: {
                password,
                newUsername,
            },
        });
    } else {
        const $newPassword = document.querySelector(
            "input[type=password]:nth-child(1)",
        );
        const newPassword = $newPassword.value;

        res = await fetchServer("/users/change-password", {
            method: "PUT",
            cookies: true,
            body: {
                password,
                newPassword,
            },
        });
    }

    if (res.code == 200) {
        const $dialog = document.createElement("dialog");
        const $message = document.createElement("p");
        $message.innerText = location.href.includes("username")
            ? "Nombre de usuario cambiado!"
            : "Contraseña Cambiada!";

        const $link = document.createElement("a");
        $link.href = `../pages/profile?username=${location.href.includes("username") ? newUsername : user.username}`;
        $link.innerText = "Perfil";
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
