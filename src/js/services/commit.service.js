import Commit from "../models/commit.model.js";
import showErrorModal from "../lib/errorModal.js";
import { CommitData, CommitFullData } from "../lib/types.js";

export default class CommitService {
    /**
     * @param {string} repoName
     * @param {string} username
     * @return {Promise<CommitData[]>}
     * */
    static async getAll(repoName, username) {
        const res = await Commit.getAll(repoName, username);
        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else {
            return res.result.data.map((c) => new CommitData(c));
        }
    }
    /**
     * @param {string} hash
     * @param {string} repoName
     * @param {string} username
     * @returns {Promise<CommitFullData>}
     * */
    static async info(hash, repoName, username) {
        const res = await Commit.info(hash, repoName, username)
        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard"
            })
        } else {
            return new CommitFullData(res.result.data)
        }
    }
}
