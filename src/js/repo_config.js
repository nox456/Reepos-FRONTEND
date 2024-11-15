import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import showErrorModal from "./lib/errorModal.js";
import fetchServer from "./lib/fetch.js";
import User from "./models/user.model.js";
import Repository from "./models/repository.model.js";

headerSearch();
userImage();

const urlParams = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const user_response = await User.profile(urlParams.get("username"));

const repo_response = await Repository.info(
    urlParams.get("repoName"),
    urlParams.get("username"),
);

if (user_response.code != 200) {
    showErrorModal(user_response.result.message, {
        href: "../pages/dashboard",
        message: "Dashboard",
    });
}

const $section1 = document.querySelector("main > section:first-of-type");

$section1.classList.remove("loading");

const $title = $section1.querySelector("a:first-child");

$title.href = `../pages/profile?username=${urlParams.get("username")}`;
$title.querySelector("button > img").src = user_response.result.data.user_img;
$title.querySelector("div").innerText = urlParams.get("username");

const $repoName = $section1.querySelector("a:nth-of-type(2)");
$repoName.href = `../pages/repository?username=${urlParams.get("username")}&repoName=${urlParams.get("repoName")}`;
$repoName.innerText = urlParams.get("repoName");

const $aside = document.querySelector("main > section > aside");

const $button_general = $aside.querySelector("button:nth-of-type(1)");
const $button_security = $aside.querySelector("button:nth-of-type(2)");

const $main = document.querySelector("main > section > main");

$main.querySelector("form > input").value = urlParams.get("repoName");
$main.querySelector("form > textarea").innerText =
    repo_response.result.data.description;

$button_general.addEventListener("click", () => {
    if (!$button_general.classList.contains("selected")) {
        $button_general.classList.add("selected");
    }
    if ($button_security.classList.contains("selected")) {
        $button_security.classList.remove("selected");
    }
    $main.innerHTML = `
        <h2>Nombre del Repositorio</h2>
        <form>
            <input type="text" value="${urlParams.get("repoName")}">
            <button type="submit" class="disabled">Renombrar</button>
        </form>
        <hr>
        <h2>Descripción del Repositorio</h2>
        <form>
            <textarea>${repo_response.result.data.description}</textarea>
            <button type="submit" class="disabled">Actualizar</button>
        </form>
    `;
});

$button_security.addEventListener("click", () => {
    if (!$button_security.classList.contains("selected")) {
        $button_security.classList.add("selected");
    }
    if ($button_general.classList.contains("selected")) {
        $button_general.classList.remove("selected");
    }
    $main.innerHTML = `
        <h2>Eliminar Repositorio</h2>
        <form>
            <input type="password" placeholder="Contraseña...">
            <button type="submit" class="disabled">Eliminar</button>
        </form>
    `;
    const $delete_input = $main.querySelector("form > input");
    $delete_input.addEventListener("input", () => {
        if ($delete_input.value != "") {
            $main.querySelector("form > button").classList.remove("disabled");
        } else {
            $main.querySelector("form > button").classList.add("disabled");
        }
    });

    const $delete_form = $main.querySelector("form");
    $delete_form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const value = $delete_input.value;
        const res = await Repository.delete(urlParams.get("repoName"), value)

        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: `../pages/config?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`,
                message: "Recargar",
            });
        } else {
            location.href = "../pages/dashboard";
        }
    });
});

const $name_input = $main.querySelector("form > input");

$name_input.addEventListener("input", () => {
    if ($name_input.value != urlParams.get("repoName")) {
        $main
            .querySelector("form:nth-of-type(1) > button")
            .classList.remove("disabled");
    }
});

const $description = $main.querySelector("form > textarea");

$description.addEventListener("input", () => {
    if ($description.value != repo_response.result.data.description) {
        $main
            .querySelector("form:nth-of-type(2) > button")
            .classList.remove("disabled");
    }
});

const $name_form = $main.querySelector("form:nth-of-type(1)");

$name_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = $name_input.value;

    const res = await Repository.changeName(urlParams.get("repoName"), value)

    if (res.code != 200) {
        showErrorModal(res.result.message, {
            href: "../pages/dashboard",
            message: "Dashboard",
        });
    } else {
        location.href = `../pages/config?repoName=${value}&username=${urlParams.get("username")}`;
    }
});

const $description_form = $main.querySelector("form:nth-of-type(2)");

$description_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const value = $description.value;

    const res = await Repository.changeDescription(urlParams.get("repoName"), value)
    

    if (res.code != 200) {
        showErrorModal(res.result.message, {
            href: "../pages/dashboard",
            message: "Dashboard",
        });
    } else {
        location.href = `../pages/config?repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`;
    }
});
