import File from "../models/file.model.js";
import showErrorModal from "../lib/errorModal.js";
import { FileData } from "../lib/types.js";

export default class FileService {
    /**
     * @param {Object} p
     * @param {string} p.repoName
     * @param {string} p.username
     * @param {string} p.fileId
     * @returns {Promise<FileData>}
     * */
    static async info({ repoName, username, fileId }) {
        const res = await File.info({ repoName, username, fileId });
        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else {
            return new FileData(res.result.data);
        }
    }
    /**
     * @param {FormData} file
     * @returns {Promise<?string>}
     * */
    static async upload(file) {
        const res = await File.upload(file)
        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
            return res.result.message
        }
    }
}
