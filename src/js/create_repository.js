import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import langColors from "./lib/langColors.js";
import UserService from "./services/user.service.js"
import RepositoryService from "./services/repository.service.js"
import FileService from "./services/file.service.js";

const user = await UserService.isAuthenticated()

headerSearch();
userImage(user);

const $languages = document.querySelector("main > form > ul");

Object.keys(langColors).forEach((lang) => {
    const $input = document.createElement("input");
    $input.type = "checkbox";
    $input.value = lang;
    $input.id = lang;
    $input.addEventListener("click", () => {
        if ($input.checked) {
            $input.style.backgroundColor = langColors[lang];
        } else {
            $input.style.backgroundColor = "transparent";
        }
    });

    const $label = document.createElement("label");
    $label.htmlFor = lang;
    $label.innerText = lang;

    $languages.appendChild($input);
    $languages.appendChild($label);
});

const $form = document.querySelector("main > form");

const $file_input = $form.querySelector("input[type=file]");

$file_input.addEventListener("change", () => {
    const { files } = $file_input;
    const $button_submit = $form.querySelector("button[type=submit]");
    if (
        !Array.from(files).some((f) => f.webkitRelativePath.includes(".git/"))
    ) {
        $button_submit.setAttribute("disabled", "true");
        const $message = document.createElement("p");
        $message.innerText =
            "¡El directorio subido no es un repositorio de git! (No posee una carpeta .git)";
        $file_input.insertAdjacentElement("afterend", $message);
    } else {
        $button_submit.removeAttribute("disabled");
        const $message = document.querySelector("main > form > p");
        if ($message) {
            $message.remove();
        }
    }
});

const $name_input = $form.querySelector("input#name");
const $description_input = $form.querySelector("textarea#description");

$form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = $name_input.value;
    const description = $description_input.value;
    const languages = [];
    Array.from($languages.children).forEach(($lang) => {
        if ($lang.checked) {
            languages.push($lang.value);
        }
    });
    const files = Array.from($file_input.files).filter(
        (f) => !f.webkitRelativePath.includes("node_modules"),
    );

    const $dialog = document.createElement("dialog");
    $dialog.innerText = "Creando Repositorio...";

    document.body.insertAdjacentElement("afterbegin", $dialog);
    $dialog.showModal();
    for (const file of files) {
        const formData = new FormData();
        const path = file.webkitRelativePath.slice(
            file.webkitRelativePath.indexOf("/") + 1,
        );
        formData.append(
            "path",
            path.includes("/") ? path.slice(0, path.lastIndexOf("/")) : ".",
        );
        formData.append("repoName", name);

        formData.append("file", file);

        const message = await FileService.upload(formData)
        
        if (message) {
            await RepositoryService.temp(name)
            $dialog.innerText = message;

            $dialog.classList.add("error");
            const $button = document.createElement("button");
            $button.classList.add("link");
            $button.innerText = "Aceptar";

            $button.addEventListener("click", () => {
                location.reload();
            });

            $dialog.appendChild($button);
            return;
        }
    }
    const res1 = await RepositoryService.create({
        repoData: { name, description, languages },
    });
    if (res1) {
        await RepositoryService.temp(name)
        $dialog.innerText = res1;

        $dialog.classList.add("error");
        const $button = document.createElement("button");
        $button.classList.add("link");
        $button.innerText = "Aceptar";

        $button.addEventListener("click", () => {
            location.reload();
        });

        $dialog.appendChild($button);
        return;
    }
    $dialog.innerText = "Subiendo Archivos...";
    const res2 = await RepositoryService.upload(name)
    if (res2) {
        await RepositoryService.temp(name)
        await RepositoryService.db(name)
        $dialog.innerText = res2

        $dialog.classList.add("error");
        const $button = document.createElement("button");
        $button.classList.add("link");
        $button.innerText = "Aceptar";

        $button.addEventListener("click", () => {
            location.reload();
        });

        $dialog.appendChild($button);
        return;
    }
    await RepositoryService.temp(name)
    $dialog.innerText = "Repositorio Creado!";
    const $link = document.createElement("a");
    $link.classList.add("link");

    $link.href = "../pages/dashboard.html";
    $link.innerText = "Dashboard";
    $dialog.appendChild($link);
});
