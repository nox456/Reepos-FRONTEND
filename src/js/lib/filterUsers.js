import renderUsers from "./renderUsers.js";

/**
 * @typedef {Object} User
 * @property {string} username - User name
 * @property {string} img - User image url
 * @property {int} followers_count - Followers count
 * @property {int} repos_count - Repositories count
 * */
/**
 * Filter users by followers
 * @param {User[]} users - Users array
 * @param {HTMLElement} $container - Users element container
 * @param {HTMLElement} $filtersContainer - Filters element container
 * */
export default function filterUsers(users, $container,$filtersContainer) {
    const $followers = $filtersContainer.querySelector("select");

    $followers.addEventListener("change", async () => {
        const value = $followers.value;
        const usersSorted = users.sort((userA, userB) => {
            return value == "greater"
                ? userB.followers_count - userA.followers_count
                : userA.followers_count - userB.followers_count;
        });
        $container.innerHTML = ""
        await renderUsers(usersSorted, $container)
    });
    const $input = $filtersContainer.querySelector("input")
    if ($input) {
        $input.addEventListener("input",async () => {
            const name = $input.value
            const usersFiltered = users.filter(u => {
                return u.username.toLowerCase().includes(name.toLowerCase())
            })
            $container.innerHTML = ""
            await renderUsers(usersFiltered,$container)
        }) 
    }
}
