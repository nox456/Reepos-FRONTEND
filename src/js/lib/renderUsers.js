/**
 * @typedef {Object} User
 * @property {string} username - User name
 * @property {string} img - User image url
 * @property {int} followers_count - Followers count
 * @property {int} repos_count - Repositories count
 * */
/**
 * Show users elements in view
 * @param {User[]} users - Users array
 * @param {HTMLElement} $container - Container element of users
 * */
export default function renderUsers(users, $container) {
    for (const user of users) {
        const $article = document.createElement("article");
        $article.innerHTML = `
            <a href="../../pages/profile?username=${user.username}">
                <img src="${user.img == "" ? "../../resources/images/default_user_image.png" : user.img}" alt="Imagen de usuario"/>
                <p>${user.username}</p>
            </a>
            <div>
                <svg
                    viewBox="0 0 24 24"
                >
                    <path
                        d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"
                    ></path>
                </svg>
                <p>${user.followers_count}</p>
            </div>
            <div>
                <svg viewBox="0 0 24 24">
                    <path
                        d="M19 2.01H6c-1.206 0-3 .799-3 3v14c0 2.201 1.794 3 3 3h15v-2H6.012C5.55 19.998 5 19.815 5 19.01c0-.101.009-.191.024-.273.112-.575.583-.717.987-.727H20c.018 0 .031-.009.049-.01H21V4.01c0-1.103-.897-2-2-2zm0 14H5v-11c0-.806.55-.988 1-1h7v7l2-1 2 1v-7h2v12z"
                    ></path>
                </svg>
                <p>${user.repos_count}</p>
            </div>
        `;
        $container.appendChild($article);
    }
}
