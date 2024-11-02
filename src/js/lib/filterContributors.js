import renderContributors from "./renderContributors.js"

export default function filterContributors(contributors,$container,$form, info) {
    const $select = $form.querySelector("select")

    $select.addEventListener("change",() => {
        const value = $select.value

        const contributorsOrdered = contributors.sort((a,b) => value == "more" ? b.commits_created - a.commits_created : a.commits_created - b.commits_created)

        $container.innerHTML = ""
        renderContributors(contributorsOrdered,$container, info)
    })

}
