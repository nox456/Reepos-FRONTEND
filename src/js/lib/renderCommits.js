import timeago from "./timeago.js"

export default function renderCommits(commits,$container,info) {
    commits.forEach(commit => {
        const $element = document.createElement("li")
        
        const date = new Date(commit.created_at)
        const relativeDate = timeago({
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getTime()
        })
        $element.innerHTML = `
            <section>
                <a href="../pages/commit?hash=${commit.hash}&username=${info.username}&repoName=${info.repoName}">${commit.title}</a>
                <p>
                    <span>${commit.author}</span>
                    -
                    <span>${relativeDate}</span>
                </p>
            </section>
            <span>${commit.hash.slice(0,7)}</span>
        `

        $container.appendChild($element)
    })
}
