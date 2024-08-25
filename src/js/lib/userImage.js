import user from "../is_authenticated.js";

export default function userImage() {
    const $user_link = document.querySelector("header > div:last-child > a");
    const $user_image = $user_link.querySelector("img");

    $user_link.href = `../pages/profile?username=${user.username}`;

    $user_image.src =
        user.img == "" ? "../resources/images/default_user_image.png" : user.img;
    $user_link.classList.remove("loading")
}
