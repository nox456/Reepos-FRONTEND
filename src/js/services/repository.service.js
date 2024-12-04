import Repository from "../models/repository.model.js";
import showErrorModal from "../lib/errorModal.js";
import { RepositoryData, RepositoryFounded } from "../lib/types.js";

export default class RepositoryService {
    /**
     * @param {string} username
     * @returns {Promise<[RepositoryData[],string]>}
     * */
    static async getAll(username) {
        const res = await Repository.getAll(username);
        if (res.code == 200) {
            return [res.result.data.map((r) => new RepositoryData(r)), null];
        } else if (res.code == 404) {
            return [[], res.result.message];
        } else if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../index",
                message: "Inicio",
            });
        } else {
            location.reload();
        }
    }
    /**
     * @param {string} username
     * @returns {Promise<RepositoryFounded[]>}
     * */
    static async search(username) {
        const res = await Repository.search(username);

        if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else {
            return res.code == 404
                ? []
                : res.result.data.map((r) => new RepositoryFounded(r));
        }
    }
    /**
     *
     * */
}
