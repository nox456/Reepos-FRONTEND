/**
 * Change the placeholder and href of the header search input
 * */
export default function headerSearch() {
    const $form = document.querySelector("header form");

    const $input = $form.querySelector("input");

    const $select = $form.querySelector("select");

    $select.addEventListener("change", () => {
        const value = $select.value;
        $input.placeholder = `Explora ${value == "repositories" ? "repositorios" : "usuarios"}...`;
    });

    $form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const value = $select.value;
        if (value == "repositories") {
            location.href = `../../pages/search_${value}?repoName=${$input.value}`;
        } else {
            location.href = `../../pages/search_${value}?username=${$input.value}`;
        }
    });

    const $search_button = document.querySelector("header > button");
    const $dialog = document.createElement("dialog");
    $dialog.id = "dialog-search-form";
    $form.id = "search-form";
    $dialog.innerHTML = $form.outerHTML

    const $submit_button = document.createElement("button");
    $submit_button.setAttribute("form", "search-form");

    $submit_button.classList.add("link");
    $submit_button.innerText = "Buscar";

    $dialog.appendChild($submit_button);

    $search_button.addEventListener("click", () => {
        document.body.insertAdjacentElement("afterbegin", $dialog);
        $dialog.showModal();
    });
    document.body.addEventListener("click", (e) => {
        if (
            e.target == $dialog &&
            e.target.closest("button") != $search_button &&
            Array.from(document.body.children).includes($dialog)
        ) {
            $dialog.close();
            $dialog.remove()
        }
    });
}
