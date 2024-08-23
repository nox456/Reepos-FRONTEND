export default function headerSearch() {
    const $form = document.querySelector("header form")

    const $input = $form.querySelector("input")

    const $select = $form.querySelector("select")

    $select.addEventListener("change", () => {
        const value = $select.value
        $input.placeholder = `Explora ${value.toLowerCase()}...`
    })

    $form.addEventListener("submit", async (e) => {
        e.preventDefault()
        const value = $select.value
        if (value == "repositories") {
            location.href = `../../pages/search_${value}?repoName=${$input.value}`
        } else {
            location.href = `../../pages/search_${value}?username=${$input.value}`
        }
    })
}
