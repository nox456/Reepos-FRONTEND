import headerSearch from "./lib/search.js";
import user from "./is_authenticated.js";
import fetchServer from "./lib/fetch.js";
import renderRepos from "./lib/renderRepos.js";
import filterRepos from "./lib/filterRepos.js";

headerSearch();

const $user_link = document.querySelector("header > div:last-child > a");
const $user_image = $user_link.querySelector("img");

$user_link.href = `../pages/profile?username=${user.username}`;

$user_image.src =
    user.img == "" ? "../resources/images/default_user_image.png" : user.img;
$user_link.classList.remove("loading")

const res = await fetchServer(`/repositories?username=${user.username}`, {
    method: "GET",
    cookies: true,
});

const $section = document.body.querySelector("main > section")
if (res.code != 200) {
    $section.innerHTML = ""
    const $message = document.createElement("h1")
    $message.innerText = res.result.message

    $section.appendChild($message)
} else {
    const repos = res.result.data.map(r => {
        r.username = user.username
        return r
    })
    $section.innerHTML = ""
    const lang_list = await renderRepos(repos)

    filterRepos(repos,$section,lang_list)
}
