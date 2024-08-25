import headerSearch from "./lib/search.js";
import userImage from "./lib/userImage.js";
import langColors from "./lib/langColors.js";

headerSearch()
userImage()

const $languages = document.querySelector("main > form > ul")

Object.keys(langColors).forEach(lang => {
    const $input = document.createElement("input")
    $input.type = "checkbox"
    $input.value = lang
    $input.id = lang
    $input.addEventListener("click", () => {
        if ($input.checked) {
            $input.style.backgroundColor = langColors[lang]
        } else {
            $input.style.backgroundColor = "transparent"
        }
    })

    const $label = document.createElement("label")
    $label.htmlFor = lang
    $label.innerText = lang

    $languages.appendChild($input)
    $languages.appendChild($label)
})
