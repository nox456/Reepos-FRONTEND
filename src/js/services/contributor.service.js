import showErrorModal from "../lib/errorModal.js";
import Contributor from "../models/contributor.model.js";
import { ContributorData } from "../lib/types.js";

export default class ContributorService {
    /**
     * @param {string} repoName
     * @param {string} username
     * @returns {Promise<ContributorData[]>}
     * */
    static async getAll(repoName, username) {
        const res = await Contributor.getAll(repoName, username);
        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else {
            return res.result.data.map((c) => new ContributorData(c));
        }
    }
}
