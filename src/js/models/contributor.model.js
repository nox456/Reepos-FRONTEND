import fetchServer from "../lib/fetch.js";

export default class Contributor {
    /**
     * Get all contributors of a repository
     * */
    static async getAll(repoName, username) {
        return await fetchServer(
            `/contributors?username=${username}&repoName=${repoName}`,
            { method: "GET" },
        );
    }
}
