import UserService from "./services/user.service.js";

const $form = document.querySelector("form");
const $username = $form.querySelector("#username");
const $password = $form.querySelector("#password");

const pageName = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1,
);

$form.addEventListener("submit", async (e) => {
    e.preventDefault();
    await UserService.sign($username.value, $password.value, pageName.includes("signup"))
});
