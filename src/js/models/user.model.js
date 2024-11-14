import fetchServer from "../lib/fetch.js";

/**
 * @class User data model
 * */
export default class User {
    /**
     * Signup (register) a new user
     * */
    static async signUp(username,password) {
        return await fetchServer("/auth/signup", {
            cookies: true,
            body: { username, password },
            method: "POST",
        });
    }
    /**
     * Signin (login) an existing user
     * */
    static async signIn(username,password) {
        return await fetchServer("/auth/signin", {
            cookies: true,
            body: { username, password },
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
    static async search(username) {
        return await fetchServer(`/users/search?username=${username}`, {
            method: "GET",
        });
    }
    /**
     * Get profile info of an user
     * */
    static async profile(username) {
        return await fetchServer(`/users/profile?username=${username}`, {
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
    static async getFollowers(username) {
        return await fetchServer(`/users/followers?username=${username}`, {
            method: "GET",
        });
    }
    /**
     * Unfollow an user
     * */
    static async unfollow(username) {
        return await fetchServer("/users/unfollow", {
            cookies: true,
            method: "PUT",
            body: {
                username,
            },
        });
    }
    /**
     * Follow an user
     * */
    static async follow(username) {
        return await fetchServer("/users/follow-user", {
            cookies: true,
            method: "POST",
            body: {
                username
            },
        });
    }
}
