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
    constructor({ username, img, followers_count, repos_count }) {
        this.username = username;
        this.img = img;
        this.followers_count = followers_count;
        this.repos_count = repos_count;
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
    constructor({ name, description, likes, created_at, languages }) {
        this.name = name;
        this.description = description;
        this.username = null;
        this.likes = likes;
        this.created_at = created_at;
        this.languages = languages;
    }
}
export class RepositoryFounded {
    /**
     * @param {Object} p
     * @param {string} p.username
     * @param {string} p.name
     * @param {string} p.description
     * @param {Number} p.likes
     * @param {string[]} p.languages
     * @param {string} p.created_at
     * */
    constructor({ username, name, description, likes, languages, created_at }) {
        this.username = username;
        this.name = name;
        this.description = description;
        this.likes = likes;
        this.languages = languages;
        this.created_at = created_at;
    }
}
export class RepositoryInfo {
    /**
     * @param {Object} p
     * @param {string} p.name
     * @param {string} p.description
     * @param {Number} p.likes
     * @param {string[]} p.languages
     * @param {Number} p.commits_count
     * @param {Number} p.contributors_count
     * @param {?string} p.readme
     * @param {{ title: string, author: string, created_at: string, hash: string }} p.last_commit
     * @param {{ name: string, type: string }[]} p.branches
     * @param {{ id: string, last_commit_created_at: string, last_commit_hash: string, last_commit_title: string, name: string, path: string, size: string, url: string }[]} p.files
     * */
    constructor({
        name,
        description,
        likes,
        languages,
        commits_count,
        contributors_count,
        readme,
        last_commit,
        branches,
        files,
    }) {
        this.name = name;
        this.description = description;
        this.likes = likes;
        this.languages = languages;
        this.commits_count = commits_count;
        this.contributors_count = contributors_count;
        this.readme = readme;
        this.last_commit = last_commit;
        this.branches = branches;
        this.files = files;
    }
}
export class CommitData {
    /**
     * @param {Object} p
     * @param {string} p.title
     * @param {string} p.hash
     * @param {string} p.author
     * @param {string} p.created_at
     * */
    constructor({ title, hash, author, created_at }) {
        this.title = title;
        this.hash = hash;
        this.author = author;
        this.created_at = created_at;
    }
}
export class CommitFullData {
    /**
     * @param {Object} p
     * @param {string} p.title
     * @param {string} p.hash
     * @param {string} p.author
     * @param {string} p.branch
     * @param {string} p.content
     * @param {string} p.next_commit_hash
     * @param {string} p.prev_commit_hash
     * @param {string} p.created_at
     * @param {{name: string, size: string, type: string }[]} p.files
     * */
    constructor({ title, hash, author, branch, content, next_commit_hash, prev_commit_hash, created_at, files }) {
        this.title = title
        this.hash = hash
        this.author = author
        this.branch = branch
        this.content = content
        this.next_commit_hash = next_commit_hash
        this.prev_commit_hash = prev_commit_hash
        this.created_at = created_at
        this.files = files
    }
}
