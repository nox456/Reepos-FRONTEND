import fetchServer from "../lib/fetch.js";

/**
 * @class User data model
 * */
export default class User {
    /**
     * @param {string} username
     * @param {?string} password
     * */
    constructor(username, password) {
        this.username = username;
        this.password = password || null;
    }
    /**
     * Signup (register) a new user
     * */
    async signUp() {
        return await fetchServer("/auth/signup", {
            cookies: true,
            body: { username: this.username, password: this.password },
            method: "POST",
        });
    }
    /**
     * Signin (login) an existing user
     * */
    async signIn() {
        return await fetchServer("/auth/signin", {
            cookies: true,
            body: { username: this.username, password: this.password },
            method: "POST",
        });
    }
    /**
     * Logout user
     * */
    static async logout() {
        return await fetchServer("/auth/logout", {
            method: "GET",
            cookies: true,
        });
    }
    /**
     * Check if there's a user authenticated (logged)
     * */
    static async isAuthenticated() {
        return await fetchServer("/auth/is-authenticated", {
            method: "GET",
            cookies: true,
        });
    }
    /**
     * Search users by username
     * */
    async search() {
        return await fetchServer(`/users/search?username=${this.username}`, {
            method: "GET",
        });
    }
    /**
     * Get profile info of an user
     * */
    async profile() {
        return await fetchServer(`/users/profile?username=${this.username}`, {
            method: "GET",
        });
    }
    /**
     * Change username
     * */
    static async changeUsername(newUsername, password) {
        return await fetchServer("/users/change-username", {
            method: "PUT",
            cookies: true,
            body: {
                password,
                newUsername,
            },
        });
    }
    /**
     * Change password
     * */
    static async changePassword(password, newPassword) {
        return await fetchServer("/users/change-password", {
            method: "PUT",
            cookies: true,
            body: {
                password,
                newPassword,
            },
        });
    }
    /**
     * Delete an user
     * */
    static async delete(password) {
        return await fetchServer("/users/delete", {
            body: {
                password,
            },
            method: "DELETE",
            cookies: true,
        });
    }
    /**
     * Change description
     * */
    static async changeDescription(newDescription) {
        return await fetchServer("/users/change-description", {
            method: "PUT",
            cookies: true,
            body: {
                newDescription,
            },
        });
    }
    /**
     * Change user image
     * */
    static async changeImage(image) {
        return await fetchServer("/users/upload-image", {
            body: image,
            cookies: true,
            method: "POST",
        });
    }
    /**
     * Get followers
     * */
    async getFollowers() {
        return await fetchServer(`/users/followers?username=${this.username}`, {
            method: "GET",
        });
    }
    /**
     * Unfollow an user
     * */
    async unfollow() {
        return await fetchServer("/users/unfollow", {
            cookies: true,
            method: "PUT",
            body: {
                username: this.username,
            },
        });
    }
    /**
     * Follow an user
     * */
    async follow() {
        return await fetchServer("/users/follow-user", {
            cookies: true,
            method: "POST",
            body: {
                username: this.username
            },
        });
    }
}
