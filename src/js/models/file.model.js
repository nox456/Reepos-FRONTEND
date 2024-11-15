import fetchServer from "../lib/fetch.js";

export default class File {
    /**
     * Get information of a file
     * */
    static async info({ repoName, username, fileId }) {
        return await fetchServer(
            `/files?repoName=${repoName}&fileId=${fileId}&username=${username}`,
            { method: "GET" },
        );
    }
    /**
     * Upload file to cloud storage
     * */
    static async upload(file) {
        return await fetchServer("/files/upload", {
            body: file,
            method: "POST",
        });
    }
}
