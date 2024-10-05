import renderCommits from "./renderCommits.js"

export default function filterCommits(commits,$container) {
    const $filter_form = document.querySelector("main > section:nth-of-type(2) > form:first-child")

    const $filter_input = $filter_form.querySelector("input")
    const $filter_select = $filter_form.querySelector("select")

    $filter_select.addEventListener("change", () => {
        if ($filter_select.value == "title") {
            $filter_input.placeholder = "Título..."
        } else {
            $filter_input.placeholder = "Hash..."
        }
    })

    $filter_form.addEventListener("submit",e => {
        e.preventDefault()

        let commitsFiltered
        if ($filter_select.value == "title") {
            commitsFiltered = commits.filter(c => c.title.toLowerCase().includes($filter_input.value.toLowerCase()))
        } else {
            commitsFiltered = commits.filter(c => c.hash.slice(0,7) == $filter_input.value.toLowerCase() || c.hash == $filter_input.value.toLowerCase())
        }
        
        $container.innerHTML = ""
        renderCommits(commitsFiltered,$container)
    })

    $filter_input.addEventListener("input",() => {
        if ($filter_input.value == "") {
            $container.innerHTML = ""
            renderCommits(commits,$container)
        }
    })

    const authors = new Set(commits.map(c => c.author))

    const $authors_select = document.querySelector("main > section:nth-of-type(2) > form:last-child > select")

    authors.forEach(author => {
        const $option = document.createElement("option")

        $option.innerText = author

        $authors_select.appendChild($option)
    })

    $authors_select.addEventListener("change",() => {
        let commitsFiltered
        if ($authors_select.value == "none") {
            commitsFiltered = commits
        } else {
            commitsFiltered = commits.filter(c => c.author == $authors_select.value)
        }

        $container.innerHTML = ""
        renderCommits(commitsFiltered,$container)
    })
}
