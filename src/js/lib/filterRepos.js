import renderRepos from "./renderRepos.js";

/**
 * @typedef {Object} Repository
 * @property {string} name - Repository name
 * @property {string} description- Repository description
 * @property {int} likes - Repository likes
 * @property {string[]} languages - Repository languages
 * */
/**
 * Add functionality to the filters of repos
 * @param {Repository[]} repos - Repositories array
 * @param {HTMLElement} $reposContainer - The element container of repos
 * @param {string[]} lang_list - List of all languages present in repos
 * @param {HTMLElement} $filtersContainer - The element container of filters
 * */
export default function filterRepos(repos, $reposContainer, lang_list,$filtersContainer) {
    const $input = $filtersContainer.querySelector("input");
    const $date = $filtersContainer.querySelector("#date");
    const $likes = $filtersContainer.querySelector("#likes");
    const $languages = $filtersContainer.querySelector("#languages");

    let allRepos = repos;

    // Name filter
    $input?.addEventListener("input", async () => {
        const value = $input.value;
        if (value == "") {
            $reposContainer.innerHTML = "";
            allRepos = repos;
            const lang_list = await renderRepos(repos,$reposContainer);
            $languages.innerHTML = `
                <option selected hidden value="none">Lenguajes</option>
                <option value="none">Todos</option>
            `;
            // Add languages to language select
            lang_list.forEach((lang) => {
                const $option = document.createElement("option");
                $option.innerText = lang;

                $languages.appendChild($option);
            });
        } else {
            let reposFiltered;
            if ($languages.value == "none") {
                reposFiltered = repos.filter((repo) =>
                    repo.name.toLowerCase().includes(value.toLowerCase()),
                );
            } else {
                reposFiltered = allRepos.filter((repo) =>
                    repo.name.toLowerCase().includes(value.toLowerCase()),
                );
            }
            $reposContainer.innerHTML = "";
            const lang_list = await renderRepos(reposFiltered,$reposContainer);
            allRepos = reposFiltered;
            $languages.innerHTML = `
                <option selected hidden value="none">Lenguajes</option>
                <option value="none">Todos</option>
            `;

            // Add languages to language select
            lang_list.forEach((lang) => {
                const $option = document.createElement("option");
                $option.innerText = lang;

                $languages.appendChild($option);
            });
        }
    });

    // Date sorter
    $date.addEventListener("change", async () => {
        const value = $date.value;
        const reposSorted = allRepos.sort((repoA, repoB) => {
            const dateA = new Date(repoA.created_at);
            const dateB = new Date(repoB.created_at);
            if (value == "new") return dateA > dateB ? -1 : 1;
            if (value == "old") return dateA < dateB ? -1 : 1;
        });
        $reposContainer.innerHTML = "";

        allRepos = reposSorted;
        await renderRepos(reposSorted,$reposContainer);
    });

    // Likes sorter
    $likes.addEventListener("change", async () => {
        const value = $likes.value;
        const reposSorted = allRepos.sort((repoA, repoB) => {
            return value == "greater"
                ? repoB.likes - repoA.likes
                : repoA.likes - repoB.likes;
        });
        $reposContainer.innerHTML = "";
        allRepos = reposSorted;
        await renderRepos(reposSorted,$reposContainer);
    });

    // Languages filter
    $languages.addEventListener("change", async () => {
        const value = $languages.value;
        if (value == "none") {
            $reposContainer.innerHTML = "";
            allRepos = repos;
            const lang_list = await renderRepos(repos,$reposContainer);
            $languages.innerHTML = `
                <option selected hidden value="none">Lenguajes</option>
                <option value="none">Todos</option>
            `;
            // Add languages to language select
            lang_list.forEach((lang) => {
                const $option = document.createElement("option");
                $option.innerText = lang;

                $languages.appendChild($option);
            });
        } else {
            const reposFiltered = repos.filter((r) =>
                r.languages.includes(value),
            );
            $reposContainer.innerHTML = "";
            allRepos = reposFiltered;
            await renderRepos(reposFiltered,$reposContainer);
        }
    });

    // Add languages to language select
    lang_list.forEach((lang) => {
        const $option = document.createElement("option");
        $option.innerText = lang;

        $languages.appendChild($option);
    });
}
