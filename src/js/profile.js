import showErrorModal from "./lib/errorModal.js";
import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import renderRepos from "./lib/renderRepos.js"
import renderUsers from "./lib/renderUsers.js"
import User from "./models/user.model.js";
import Repository from "./models/repository.model.js";
import UserService from "./services/user.service.js"
import RepositoryService from "./services/repository.service.js";

const userAuthenticated = await UserService.isAuthenticated()

headerSearch();
userImage(userAuthenticated);

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);
const user_profile = await UserService.getProfile(urlParams.get("username"))

const $section1 = document.querySelector("main > section:nth-child(1)");
const $section2 = document.querySelector("main > section:nth-child(2)");

    document.title = `${user_profile.user_name} - Reepos`
    const $header = $section1.querySelector("header");
    $header.classList.remove("loading");

    $header.querySelector("img").src =
        user_profile.user_img == ""
            ? "../resources/images/default_user_image_big.png"
            : user_profile.user_img;

    const $main = $section1.querySelector("main");

    $main.querySelector("h1").innerText = user_profile.user_name;

    const $textarea = $main.querySelector("form textarea");
    $textarea.innerText =
        user_profile.user_description == ""
            ? "No hay biografía..."
            : user_profile.user_description;

    const $repos_count = $section1.querySelector("footer article:nth-child(1)")

    $repos_count.insertAdjacentText("beforeend",user_profile.repos_count)

    const $follwers_count = $section1.querySelector("footer article:nth-child(2)")

    $follwers_count.insertAdjacentText("beforeend",`${user_profile.followers_count}/${user_profile.followed_count}`)

    $follwers_count.insertAdjacentHTML("beforeend","<span>(Seguidores/Seguidos)</span>")

    const $edit_description_button = $main.querySelector("& > button");
    const $change_image_form = $header.querySelector("form");

    const $follow_button = $section1.querySelector("footer > button")

    if (urlParams.get("username") == userAuthenticated.username) {
        const $description_form = $main.querySelector("form");

        $edit_description_button.addEventListener("click", () => {
            $textarea.innerText =
                $textarea.innerText == "No hay biografía..."
                    ? ""
                    : user_profile.user_description;
            $textarea.removeAttribute("disabled");
            const end = user_profile.user_description.length;
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

            const res = await User.changeDescription(newDescription)
            if (res.code != 200) {
                showErrorModal(res.result.message, {
                    message: "Aceptar",
                    href: `../pages/profile?username=${user_profile.user_name}`,
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

            const res = await User.changeImage(formData)

            if (res.code != 200) {
                showErrorModal(res.result.message, {
                    message: "Aceptar",
                    href: `../pages/profile?username=${userAuthenticated.user_name}`,
                });
            } else {
                location.reload()
            }
        });

        $follow_button.remove()

    } else {
        $edit_description_button.style.display = "none";
        $change_image_form.style.display = "none";

        const res = await User.getFollowers(urlParams.get("username"))

        if (res.result.data.some(u => u.username == userAuthenticated.username)) {
            $follow_button.innerText = "Dejar de seguir"
        } else {
            $follow_button.innerText = "Seguir"
        }

        $follow_button.addEventListener("click", async () => {
            if ($follow_button.innerText == "Seguir") {
                await User.follow(urlParams.get("username"))

                location.reload()
            } else {
                await User.unfollow(urlParams.get("username"))

                location.reload()
            }
        })
    }

    const [repos,message] = await RepositoryService.getAll(urlParams.get("username"))

    const $repos_container = $section2.querySelector("div:nth-child(1) > div")

    $repos_container.innerHTML = ""

    if (repos.length == 0) {
        $repos_container.insertAdjacentHTML("afterbegin",`<h2>${message}</h2>`)
        $section2.querySelector("div:nth-child(1) > a").remove()
    } else {
        await renderRepos(repos.slice(0,3),$section2.querySelector("div:nth-child(1) > div"))
        if (repos.length < 4) {
            $section2.querySelector("div:nth-child(1) > a").remove()
        } else {
            $section2.querySelector("div:nth-child(1) >  a").href = `../pages/repositories?username=${urlParams.get("username")}`
        }
    }

    const $followers_container = $section2.querySelector("div:nth-child(2) > div")

    const res2 = await User.getFollowers(urlParams.get("username"))

    $followers_container.innerHTML = ""

    if (res2.result.data.length == 0) {
        $followers_container.insertAdjacentHTML("afterbegin","<h2>No hay seguidores...</h2>")                
        $section2.querySelector("div:nth-child(2) > a").remove()
    } else {
        await renderUsers(res2.result.data.slice(0,3),$followers_container)
        if (res2.result.data.length < 4) {
            $section2.querySelector("div:nth-child(2) > a").remove()
        } else {
            $section2.querySelector("div:nth-child(2) > a").href = `../pages/followers?username=${urlParams.get("username")}`
        }
    }
