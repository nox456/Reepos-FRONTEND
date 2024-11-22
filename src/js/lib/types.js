export class Res {
    /**
     * @param {number} code
     * @param {{message: string, data: *}}
     * */
    constructor(code, { message, data }) {
        this.code = code;
        this.result = { message, data };
    }
}
export class UserData {
    /**
     * @param {string} username
     * @param {string} password
     * */
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
export class UserAuthenticated {
    /**
     * @param {Object} result
     * @param {string} result.id
     * @param {string} result.username
     * @param {string} result.password
     * @param {string} result.description
     * @param {string} result.img
     * @param {string} result.created_at
     * @param {string[]} result.followers
     * */
    constructor({
        id,
        username,
        password,
        description,
        img,
        created_at,
        followers,
    }) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.description = description;
        this.img = img;
        this.created_at = created_at;
        this.followers = followers;
    }
}
export class UserProfile {
    /**
     * @param {Object} result
     * @param {string} result.user_name
     * @param {string} result.user_description
     * @param {string} result.user_img
     * @param {number} result.repos_count
     * @param {number} result.followers_count
     * @param {number} result.followed_count
     * */
    constructor({
        user_name,
        user_description,
        user_img,
        repos_count,
        followers_count,
        followed_count,
    }) {
        this.user_name = user_name;
        this.user_description = user_description;
        this.user_img = user_img;
        this.repos_count = repos_count;
        this.followers_count = followers_count;
        this.followed_count = followed_count;
    }
}
export class UserSearched {
    /**
     * @param {Object} result
     * @param {string} result.username
     * @param {string} result.img
     * @param {number} result.followers_count
     * @param {number} result.repos_count
     * */
    constructor({username,img,followers_count,repos_count}) {
        this.username = username
        this.img = img
        this.followers_count = followers_count
        this.repos_count = repos_count
    }
}
export class RepositoryData {
    /**
     * @param {Object} p
     * @param {string} p.description
     * @param {string} p.username
     * @param {number} p.likes
     * @param {string} p.created_at
     * @param {string[]} p.languages
     * */
    constructor({name,description,likes,created_at,languages}) {
        this.name = name
        this.description = description
        this.username = null
        this.likes = likes
        this.created_at = created_at
        this.languages = languages
    }
}
