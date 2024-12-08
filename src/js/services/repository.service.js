import Repository from "../models/repository.model.js";
import { SERVER_HOST } from "../config.js";
import showErrorModal from "../lib/errorModal.js";
import {
    RepositoryData,
    RepositoryFounded,
    RepositoryInfo,
} from "../lib/types.js";

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
     * @param {string} name
     * */
    static async temp(name) {
        const res = await Repository.temp(name);
        if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        }
    }
    /**
     * @param {string} name
     * */
    static async upload(name) {
        const res = await Repository.upload(name);
        if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else if (res.code != 200) {
            return res.result.message;
        }
    }
    /**
     * @param {string} name
     * */
    static async db(name) {
        const res = await Repository.db(name);
        if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        }
    }
    /**
     * @param {Object} repoData
     * @param {string} repoData.name
     * @param {string} repoData.description
     * @param {string[]} repoData.languages
     * @returns {Promise<?string>}
     * */
    static async create(repoData) {
        const res = await Repository.create(repoData);
        if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else if (res.code != 200) {
            return res.result.message;
        }
    }
    /**
     * @param {string} repoName
     * @param {string} username
     * @returns {Promise<RepositoryInfo>}
     * */
    static async info(repoName, username) {
        const res = await Repository.info(repoName, username);
        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else {
            return new RepositoryInfo(res.result.data);
        }
    }
    /**
     * @param {string} repoName
     * @param {string} username
     * @returns {Promise<boolean>}
     * */
    static async checkLike(repoName, username) {
        const res = await Repository.checkLike(repoName, username);
        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else {
            return res.result.data;
        }
    }
    /**
     * @param {string} repoName
     * @param {string} userOwnerName
     * @param {string} username
     * */
    static async removeLike(repoName, userOwnerName, username) {
        const res = await Repository.removeLike(
            repoName,
            userOwnerName,
            username,
        );
        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else {
            location.reload();
        }
    }
    /**
     * @param {string} repoName
     * @param {string} userOwnerName
     * @param {string} username
     * */
    static async like(repoName, userOwnerName, username) {
        const res = await Repository.like({
            repoName,
            username,
            userOwnerName,
        });
        if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard",
            });
        } else {
            location.reload();
        }
    }
    /**
     * @param {string} repoName
     * @param {string} username
     * */
    static async download(repoName, username) {
        const $message = document.createElement("p");
        $message.innerText = "Procesando...";
        const $button = document.createElement("button");
        const $dialog = document.createElement("dialog");
        $dialog.appendChild($message);
        document.body.insertAdjacentElement("afterbegin", $dialog);
        $dialog.showModal();
        $button.classList.add("link");
        const res = await Repository.download(repoName, username);
        if (res.code != 200) {
            $button.innerText = "Recargar";
            $message.innerText = res.result.message;
            $button.addEventListener("click", () => {
                location.reload();
            });
        } else {
            $button.innerText = "Aceptar";
            $message.innerText = "Repositorio descargado!";
            location.href = `${SERVER_HOST}/${res.result.data}`;
            $button.addEventListener("click", async () => {
                await Repository.zip(res.result.data);
                location.reload();
            });
        }
        $dialog.appendChild($button);
    }
}
