export default function renderFiles(fileTree) {
    const $section = document.querySelector("main > ul")
    Object.keys(fileTree).sort((a,b) => {
        if (a.includes(".")) {
            return 1
        } else {
            return -1
        }
    }).forEach(key => {
        const isDirectory = !key.includes(".")
        const $li = document.createElement("li")
        const $div1 = document.createElement("div")



        const $div2 = document.createElement("div")
        if (isDirectory) {
            const $name = document.createElement("span")
            $name.innerText = key
            $name.addEventListener("click", () => {
                $section.innerHTML = ""
                renderFiles(fileTree[key])
            })
            $div1.insertAdjacentHTML("afterbegin", `
                <svg viewBox="0 0 24 24">
                    <path
                        d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"
                    ></path>
                </svg>
            `)
            $div1.appendChild($name)
            $li.appendChild($div1)
        } else {
            const $name = document.createElement("a")
            $name.href = "../../pages/file"
            $name.innerText = key
            const $last_commit_title = document.createElement("a")
            $last_commit_title.href = `../../pages/commit`
            $last_commit_title.innerText = fileTree[key].last_commit_title
            const $size = document.createElement("span")
            $size.innerText = fileTree[key].size
            const $last_commit_created_at = document.createElement("span")
            $last_commit_created_at.innerText = fileTree[key].last_commit_created_at
            $div1.insertAdjacentHTML("afterbegin", `
                <svg viewBox="0 0 24 24">
                    <path
                        d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm8 7h-1V4l5 5h-4z"
                    ></path>
                </svg>
            `)
            $div2.appendChild($size)
            $div2.appendChild($last_commit_created_at)
            $div1.appendChild($name)
            $li.appendChild($div1)
            $li.appendChild($last_commit_title)
        }
        $li.appendChild($div2)
        $section.appendChild($li)
    })
}
