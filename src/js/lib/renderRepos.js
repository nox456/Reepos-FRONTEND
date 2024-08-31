import langColors from "./langColors.js";

/**
 * @typedef {Object} Repository
 * @property {?string} user - User owner name
 * @property {string} name - Repository name
 * @property {string} description - Repository description
 * @property {int} likes - Repository likes
 * @property {string[]} languages - Repository languages
 * */
/**
 * Show the repos in the view
 * @param {Repository[]} repos - Repositories array
 * @param {HTMLElement} $container - Container element of repos
 * @param {boolean} showUser - Show user owner
 * */
export default async function renderRepos(repos,$container) {
    return new Promise((resolve) => {
        const lang_list = new Set()
        repos.forEach(repo => {
            const $article = document.createElement("article")
            const date = new Date(repo.created_at)
            const date_formatted = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}`
            $article.classList.add("repository")
            $article.innerHTML = `
                <header>
                    <svg viewBox="0 0 24 24"><path d="M19 2.01H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.998 5 19.815 5 19.01c0-.101.009-.191.024-.273.112-.575.583-.717.987-.727H20c.018 0 .031-.009.049-.01H21V4.01c0-1.103-.897-2-2-2zm0 14H5v-11c0-.806.55-.988 1-1h7v7l2-1 2 1v-7h2v12z"></path></svg>
                    <h2>
                        <a href="../pages/repository?repoName=${repo.name}&username=${repo.username}" >${repo.name}</a>
                    </h2>
                    <span>${date_formatted}</span>
                </header>
                <main>
                    <p>${repo.description}</p>
                </main>
                <footer>
                    <section>
                        <svg viewBox="0 0 24 24"><path d="M4 21h1V8H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2zM20 8h-7l1.122-3.368A2 2 0 0 0 12.225 2H12L7 7.438V21h11l3.912-8.596L22 12v-2a2 2 0 0 0-2-2z"></path></svg>
                        <span>${repo.likes}</span>
                    </section>
                    <section>
                        <ul></ul>
                    </section>
                </footer>
            `
            if (repo.user) {
                const headerLink = $article.querySelector("header > h2")
                const usernameLink = document.createElement("a")
                usernameLink.href = `../pages/profile?username=${repo.user}`
                usernameLink.innerText = repo.user
                headerLink.insertAdjacentElement("afterbegin",usernameLink)
                usernameLink.insertAdjacentHTML("afterend","<span> / </span>")
            }
            const $list = $article.querySelector("ul")
            repo.languages.forEach(lang => {
                const $lang = document.createElement("li")
                const $color = document.createElement("div")

                $color.style.backgroundColor = langColors[lang]

                $lang.insertAdjacentElement("afterbegin",$color)
                $lang.insertAdjacentText("beforeend", lang)

                $list.appendChild($lang)
                
                lang_list.add(lang)
            })

            $container.appendChild($article)
        })
        resolve(lang_list)
    })
}
