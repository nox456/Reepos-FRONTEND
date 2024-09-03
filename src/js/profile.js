import showErrorModal from "./lib/errorModal.js";
import fetchServer from "./lib/fetch.js";
import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import user from "./is_authenticated.js";

headerSearch();
userImage();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const res1 = await fetchServer(
    `/users/profile?username=${urlParams.get("username")}`,
    {
        method: "GET",
    },
);

const $section1 = document.querySelector("main > section:nth-child(1)");
const $section2 = document.querySelector("main > section:nth-child(2)");
if (res1.code != 200) {
    showErrorModal(res1.result.message, {
        message: "Dashboard",
        href: "../pages/dashboard.html",
    });
} else {
    const { data } = res1.result;

    const $header = $section1.querySelector("header");
    $header.classList.remove("loading");
    console.log(res1.result.data);
    $header.querySelector("img").src =
        data.user_img == ""
            ? "../resources/images/default_user_image_big.png"
            : data.user_img;

    const $main = $section1.querySelector("main");

    $main.querySelector("h1").innerText = data.user_name;

    const $textarea = $main.querySelector("form textarea");
    $textarea.innerText =
        data.user_description == ""
            ? "No hay biografía..."
            : data.user_description;

    const $repos_count = $section1.querySelector("footer article:nth-child(1)")

    $repos_count.insertAdjacentText("beforeend",data.repos_count)

    const $follwers_count = $section1.querySelector("footer article:nth-child(2)")

    $follwers_count.insertAdjacentText("beforeend",`${data.followers_count}/${data.followed_count}`)

    $follwers_count.insertAdjacentHTML("beforeend","<span>(Seguidores/Seguidos)</span>")

    const $edit_description_button = $main.querySelector("& > button");
    const $change_image_form = $header.querySelector("form");
    if (urlParams.get("username") == user.username) {
        const $description_form = $main.querySelector("form");

        $edit_description_button.addEventListener("click", () => {
            $textarea.innerText =
                $textarea.innerText == "No hay biografía..."
                    ? ""
                    : data.user_description;
            $textarea.removeAttribute("disabled");
            const end = data.user_description.length;
            $textarea.setSelectionRange(end, end);
            $textarea.focus();
            $edit_description_button.style.display = "none";

            $description_form.querySelector("button").style.display = "block";
        });
        const $submit_button = $description_form.querySelector("button");
        $textarea.addEventListener("input", () => {
            if ($textarea.value == "") {
                $submit_button.setAttribute("disabled", "true");
            } else {
                $submit_button.removeAttribute("disabled");
            }
        });
        $description_form.addEventListener("submit", async (e) => {
            const newDescription = $textarea.value;
            e.preventDefault();

            const res = await fetchServer("/users/change-description", {
                method: "PUT",
                cookies: true,
                body: {
                    newDescription,
                },
            });
            if (res.code != 200) {
                showErrorModal(res.result.message, {
                    message: "Aceptar",
                    href: `../pages/profile?username=${data.user_name}`,
                });
            } else {
                location.reload();
            }
        });
        const $change_image_input =
            $change_image_form.querySelector("& > input");
        $change_image_input.addEventListener("change", async () => {
            const formData = new FormData();
            formData.append("user_image", $change_image_input.files[0]);

            const res = await fetchServer("/users/upload-image", {
                body: formData,
                cookies: true,
                method: "POST",
            });

            if (res.code != 200) {
                showErrorModal(res.result.message, {
                    message: "Aceptar",
                    href: `../pages/profile?username=${user.user_name}`,
                });
            } else {
                location.reload()
            }
        });
    } else {
        $edit_description_button.style.display = "none";
        $change_image_form.style.display = "none";
    }
}
