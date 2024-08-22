import fetchServer from "./lib/fetch.js";

const $form = document.querySelector("form");
const $username = $form.querySelector("#username"); const $password = $form.querySelector("#password");

const pageName = location.pathname.slice(
    location.pathname.lastIndexOf("/") + 1,
);

$form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = $username.value;
    const password = $password.value;

    const res = await fetchServer(`/auth/${pageName}`, {
        cookies: true,
        body: { username, password },
        method: "POST",
    });

    if (res.code != 200) {
        const $error_message = document.querySelector("#error-message")
        $error_message.innerText = res.result.message
    } else {
        location.href = "../pages/dashboard"
    }
});
