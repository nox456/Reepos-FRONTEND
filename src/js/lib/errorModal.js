/**
 * Show modal with error message and link
 * @param {string} message - Modal message
 * @param {Object} link - Modal link object
 * @param {string} link.href - Link href
 * @param {string} link.message - Link message
 * */
export default function showErrorModal(message,link) {
    const $dialog = document.createElement("dialog")

    const $message = document.createElement("p")
    $message.innerText = message

    const $link = document.createElement("a")
    $link.classList.add("link")
    $link.href = link.href
    $link.innerText = link.message

    $dialog.appendChild($message)
    $dialog.appendChild($link)

    document.body.insertAdjacentElement("afterbegin",$dialog)
    $dialog.showModal()
}
