const $branches_button = document.querySelector("main > section:nth-of-type(2) > article:first-child")

const $branches_dialog = document.querySelector("dialog#branches")

$branches_button.addEventListener("click", () => {
    $branches_dialog.style.display = "block"
    $branches_dialog.showModal()
})

$branches_dialog.querySelector("header > svg:last-child").addEventListener("click", () => {
    $branches_dialog.style.display = "none"
    $branches_dialog.close()
})
