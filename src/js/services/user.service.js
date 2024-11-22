import User from "../models/user.model.js";
import showErrorModal from "../lib/errorModal.js";
import { UserAuthenticated, UserData, UserProfile, UserSearched } from "../lib/types.js";

export default class UserService {
    /**
     * @param {string} username
     * @param {string} password
     * @param {boolean} isNewUser
     * @returns {Promise<UserData>}
     * */
    static async sign(username, password, isNewUser) {
        let res;
        if (isNewUser) {
            res = await User.signUp(username, password);
        } else {
            res = await User.signIn(username, password);
        }
        if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../index",
                message: "Inicio",
            });
        } else if (res.code != 200) {
            const $error_message = document.querySelector("#error-message");
            $error_message.innerText = res.result.message;
        } else {
            location.href = "../pages/dashboard";
        }
        return new UserData(res.result.data)
    }
    /**
     * @returns {Promise<UserAuthenticated>}
     * */
    static async isAuthenticated() {
        const res = await User.isAuthenticated();
        if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../index",
                message: "Inicio",
            });
        } else if (res.code != 200) {
            showErrorModal("Usuario no autorizado!", {
                href: "../../pages/signin",
                message: "Inicia Sesión",
            });
        }
        return new UserAuthenticated(res.result.data);
    }
    /**
     * @param {string} username
     * @returns {Promise<UserProfile>}
     * */
    static async getProfile(username) {
        const res = await User.profile(username)
        if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../index",
                message: "Inicio"
            })
        } else if (res.code != 200) {
            showErrorModal(res.result.message, {
                href: "../../pages/dashboard",
                message: "Dashboard"
            })
        } else {
            return new UserProfile(res.result.data)
        }
    }
    /**
     * @param {string} username
     * @returns {Promise<UserSearched[]>}
     * */
    static async search(username) {
        const res = await User.search(username)
        const $section = document.querySelector("main > section");
        if (res.code == 500) {
            showErrorModal(res.result.message, {
                href: "../../index",
                message: "Inicio"
            })
        } else if (res.code == 404) {
            $section.innerHTML = "";
            const $message = document.createElement("p");
            $message.innerText = `No se encontraron usuarios con el nombre: ${username}`;
            $section.appendChild($message);
        } else {
            $section.innerHTML = "";
            return res.result.data.map(u => new UserSearched(u))
        }
    }
}
