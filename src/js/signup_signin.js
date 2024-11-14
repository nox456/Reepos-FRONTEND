import User from "./models/user.model.js";

const $form = document.querySelector("form");
const $username = $form.querySelector("#username");
const $password = $form.querySelector("#password");

const pageName = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1,
);

$form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = pageName == "signup" ? await User.signUp($username.value, $password.value) : await User.signIn($username.value, $password.value);

    if (res.code != 200) {
        const $error_message = document.querySelector("#error-message");
        $error_message.innerText = res.result.message;
    } else {
        location.href = "../pages/dashboard";
    }
});
