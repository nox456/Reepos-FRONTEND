export default function renderContributors(contributors, $container, info) {
    contributors.forEach((contributor) => {
        const $element = document.createElement("li");
        const $name = document.createElement("span");
        $name.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
        ${contributor.name}
    `;
        const $last_commit = document.createElement("a");
        $last_commit.innerText = contributor.last_commit.title;
        $last_commit.href = `../../pages/commit?hash=${contributor.last_commit.hash}&username=${info.username}&repoName=${info.repoName}`;
        const $commits = document.createElement("span");
        $commits.innerHTML = `
        ${contributor.commits_created}
        <svg viewBox="0 0 24 24"><path d="M12 6c-2.967 0-5.431 2.167-5.909 5H2v2h4.092c.479 2.832 2.942 4.998 5.909 4.998s5.43-2.166 5.909-4.998H22v-2h-4.09c-.478-2.833-2.942-5-5.91-5zm0 9.998c-2.205 0-3.999-1.794-3.999-3.999S9.795 8 12 8c2.206 0 4 1.794 4 3.999s-1.794 3.999-4 3.999z"></path></svg>
    `;

        $element.appendChild($name);
        $element.appendChild($last_commit);
        $element.appendChild($commits);
        $container.appendChild($element);
    });
}
