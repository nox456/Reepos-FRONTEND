import beforeLevel from "./beforeLevel.js";
import timeago from "./timeago.js";

export default function renderFiles(fileTree, allTree, folder, info) {
    const urlParams = new URLSearchParams(
        location.href.slice(location.href.indexOf("?")),
    );
    const $section = document.querySelector("main > ul");
    $section.classList.remove("loading")
    $section.innerHTML = ""
    if (allTree) {
        const $go_back_button = document.createElement("button");
        $go_back_button.innerHTML = `
            <svg viewBox="0 0 24 24"><path d="M12.707 17.293 8.414 13H18v-2H8.414l4.293-4.293-1.414-1.414L4.586 12l6.707 6.707z"></path></svg>
        `;
        const level = beforeLevel(allTree,folder,"/")
        $go_back_button.addEventListener("click", () => {
            $section.innerHTML = "";
            renderFiles(level.content, allTree, level.name, info);
        })
        if (folder != "/") {
            $section.appendChild($go_back_button)
        }
    }
    Object.keys(fileTree)
        .sort((a) => {
            if (a.includes(".")) {
                return 1;
            } else {
                return -1;
            }
        })
        .forEach((key) => {
            const isDirectory = !key.includes(".");
            const $li = document.createElement("li");
            const $div1 = document.createElement("div");

            const $div2 = document.createElement("div");
            if (isDirectory) {
                const $name = document.createElement("span");
                $name.innerText = key;
                $name.addEventListener("click", () => {
                    $section.innerHTML = "";
                    renderFiles(fileTree[key], allTree || fileTree, key, info);
                });
                $div1.insertAdjacentHTML(
                    "afterbegin",
                    `
                <svg viewBox="0 0 24 24">
                    <path
                        d="M20 5h-9.586L8.707 3.293A.997.997 0 0 0 8 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V7c0-1.103-.897-2-2-2z"
                    ></path>
                </svg>
            `,
                );
                $div1.appendChild($name);
                $li.appendChild($div1);
            } else {
                const $name = document.createElement("a");
                $name.href = `../../pages/file?repoName=${info.repoName}&fileId=${fileTree[key].id}&username=${info.username}`;
                $name.innerText = key;
                const $last_commit_title = document.createElement("a");
                $last_commit_title.href = `../../pages/commit?hash=${fileTree[key].last_commit_hash}&repoName=${urlParams.get("repoName")}&username=${urlParams.get("username")}`;
                $last_commit_title.innerText = fileTree[key].last_commit_title;
                const $size = document.createElement("span");
                $size.innerText = fileTree[key].size;
                const $last_commit_created_at = document.createElement("span");
                const created_at = new Date(
                    fileTree[key].last_commit_created_at,
                );
                const created_at_relative = timeago({
                    year: created_at.getFullYear(),
                    month: created_at.getMonth() + 1,
                    day: created_at.getDate(),
                });
                $last_commit_created_at.innerText = created_at_relative;
                $div1.insertAdjacentHTML(
                    "afterbegin",
                    `
                <svg viewBox="0 0 24 24">
                    <path
                        d="M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm8 7h-1V4l5 5h-4z"
                    ></path>
                </svg>
            `,
                );
                $div2.appendChild($size);
                $div2.appendChild($last_commit_created_at);
                $div1.appendChild($name);
                $li.appendChild($div1);
                $li.appendChild($last_commit_title);
            }
            $li.appendChild($div2);
            $section.appendChild($li);
        });
}
