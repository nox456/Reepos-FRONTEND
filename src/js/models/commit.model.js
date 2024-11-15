import fetchServer from "../lib/fetch.js";

export default class Commit {
    /**
     * Get information of a commit
     * */
    static async info(hash, repoName, username) {
        return await fetchServer(
            `/commits/info?hash=${hash}&repoName=${repoName}&username=${username}`,
            { method: "GET" },
        );
    }
    /**
     * Get commits from a repository
     * */
    static async getAll(repoName, username) {
        return await fetchServer(
            `/commits?repoName=${repoName}&username=${username}`,
            { method: "GET" },
        );
    }
}
