import renderRepos from "./renderRepos.js"

export default function filterRepos(repos,$reposContainer,lang_list) {
    const $input = document.querySelector("main form input")
    const $date = document.querySelector("main form #date")
    const $likes = document.querySelector("main form #likes")
    const $languages = document.querySelector("main form #languages")

    let allRepos = repos

    // Name filter
    $input.addEventListener("input", async () => {
        const value = $input.value
        if (value == "") {
            $reposContainer.innerHTML = ""
            allRepos = repos
            const lang_list = await renderRepos(repos)
            $languages.innerHTML = `
                <option selected hidden value="none">Lenguajes</option>
                <option value="none">Todos</option>
            `
            // Add languages to language select
            lang_list.forEach(lang => {
                const $option = document.createElement("option")
                $option.innerText = lang

                $languages.appendChild($option)
            })
        } else {
            let reposFiltered
            if ($languages.value == "none") {
                reposFiltered = repos.filter(repo => repo.name.toLowerCase().includes(value.toLowerCase()))
            } else {
                reposFiltered = allRepos.filter(repo => repo.name.toLowerCase().includes(value.toLowerCase()))
            }
            $reposContainer.innerHTML = ""
            const lang_list = await renderRepos(reposFiltered)
            allRepos = reposFiltered
            $languages.innerHTML = `
                <option selected hidden value="none">Lenguajes</option>
                <option value="none">Todos</option>
            `

            // Add languages to language select
            lang_list.forEach(lang => {
                const $option = document.createElement("option")
                $option.innerText = lang

                $languages.appendChild($option)
            })
        }
    })

    // Date sorter
    $date.addEventListener("change",  async () => {
        const value = $date.value
        const reposSorted = allRepos.sort((repoA,repoB) => {
            const dateA = new Date(repoA.created_at)
            const dateB = new Date(repoB.created_at)
            if (value == "new") return dateA > dateB ? -1 : 1
            if (value == "old") return dateA < dateB ? -1 : 1
        })
        $reposContainer.innerHTML = ""

        allRepos = reposSorted
        await renderRepos(reposSorted)
    })

    // Likes sorter
    $likes.addEventListener("change",async () => {
        const value = $likes.value
        const reposSorted = allRepos.sort((repoA,repoB) => {
            return value == "greater" ? repoB.likes - repoA.likes : repoA.likes - repoB.likes
        })
        $reposContainer.innerHTML = ""
        allRepos = reposSorted
        await renderRepos(reposSorted)
    })

    // Languages filter
    $languages.addEventListener("change", async () => {
        const value = $languages.value
        if (value == "none") {
            $reposContainer.innerHTML = ""
            allRepos = repos
            const lang_list = await renderRepos(repos)
            $languages.innerHTML = `
                <option selected hidden value="none">Lenguajes</option>
                <option value="none">Todos</option>
            `
            // Add languages to language select
            lang_list.forEach(lang => {
                const $option = document.createElement("option")
                $option.innerText = lang

                $languages.appendChild($option)
            })
        } else {
            const reposFiltered = repos.filter(r => r.languages.includes(value))
            $reposContainer.innerHTML = ""
            allRepos = reposFiltered
            await renderRepos(reposFiltered)
        }
    }) 

    // Add languages to language select
    lang_list.forEach(lang => {
        const $option = document.createElement("option")
        $option.innerText = lang

        $languages.appendChild($option)
    })
}
