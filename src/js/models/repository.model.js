import fetchServer from "../lib/fetch.js";

/**
 * @class Repository data model
 * */
export default class Repository {
    /**
     * Create a repository
     * */
    static async create({ repoData: { name, description, languages } }) {
        return await fetchServer("/repositories/create", {
            body: { repoData: { name, description, languages } },
            method: "POST",
            cookies: true,
        });
    }
    /**
     * Get repositories from user
     * */
    static async getAll(username) {
        return await fetchServer(`/repositories?username=${username}`, {
            method: "GET",
        });
    }
    /**
     * Get repository's information
     * */
    static async info(repoName, username) {
        return await fetchServer(
            `/repositories/info?repoName=${repoName}&username=${username}`,
            { method: "GET" },
        );
    }
    /**
     * Search repositories by name
     * */
    static async search(repoName) {
        return await fetchServer(`/repositories/search?repoName=${repoName}`, {
            method: "GET",
        });
    }
    /**
     * Check if a repository is liked
     * */
    static async checkLike(repoName, username) {
        return await fetchServer(
            `/repositories/like?repoName=${repoName}&userOwnerName=${username}`,
            {
                method: "GET",
                cookies: true,
            },
        );
    }
    /**
     * Like a repository
     * */
    static async like({ repoName, userOwnerName, username }) {
        return await fetchServer("/repositories/like", {
            method: "PUT",
            body: { repoName, username, userOwnerName },
        });
    }
    /**
     * Remove a like from a repository
     * */
    static async removeLike({ repoName, userOwnerName, username }) {
        return await fetchServer("/repositories/remove-like", {
            method: "PUT",
            body: {
                repoName,
                userOwnerName,
                username,
            },
        });
    }
    /**
     * Delete zip file in backend
     * */
    static async zip(fileName) {
        return await fetchServer("/repositories/zip", {
            method: "DELETE",
            body: { fileName },
        });
    }
    /**
     * Download repository
     * */
    static async download(repoName, username) {
        return await fetchServer(
            `/repositories/download?repoName=${repoName}&username=${username}`,
            {
                method: "GET",
            },
        );
    }
    /**
     * Delete temp folder in backend
     * */
    static async temp(repoName) {
        return await fetchServer("/repositories/temp", {
            body: { repoName },
            method: "DELETE",
        });
    }
    /**
     * Upload to cloud storage
     * */
    static async upload(repoName) {
        return await fetchServer("/repositories/upload-cloud", {
            method: "POST",
            body: { repoName },
            cookies: true,
        });
    }
    /**
     * Delete repository from database
     * */
    static async db(repoName) {
        return await fetchServer("/repositories/db", {
            method: "DELETE",
            body: { repoName },
            cookies: true,
        });
    }
    /**
     * Delete a repository
     * */
    static async delete(repoName, password) {
        return await fetchServer(`/repositories/`, {
            method: "DELETE",
            body: {
                repoName,
                password,
            },
            cookies: true,
        });
    }
    /**
     * Change name of a repository
     * */
    static async changeName(repoName, newRepoName) {
        return await fetchServer(`/repositories/change-name`, {
            method: "PUT",
            body: { newRepoName, repoName },
            cookies: true,
        });
    }
    /**
     * Change description of a repository
     * */
    static async changeDescription(repoName, newDescription) {
        return await fetchServer(`/repositories/change-description`, {
            method: "PUT",
            body: { newDescription, repoName },
            cookies: true,
        });
    }
}
