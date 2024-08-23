import headerSearch from "./lib/search.js";
import user from "./is_authenticated.js"

headerSearch()

const $user_link = document.querySelector("header > div > a")
const $user_image = $user_link.querySelector("img")

$user_link.href = `../pages/profile?username=${user.username}`

$user_image.src = user.img == "" ? "../resources/images/default_user_image.png" : user.img
