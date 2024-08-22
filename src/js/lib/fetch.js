import { SERVER_HOST } from "../config.js";

/**
 * @typedef {Object} ServerResult
 * @property {string} message - Server message
 * @property {*} data - Server data
 *
 * @typedef {Object} FetchResult
 * @property {int} code - Response status
 * @property {ServerResult} result - Server result object
 * */
/**
 * Make a request to server
 * @param {string} endpoint - Endpoint url
 * @param {Object} options
 * @param {string} options.method - Request method
 * @param {boolean} options.cookies - Send cookies?
 * @param {*} options.body - Request body
 * @return {Promise<FetchResult>} Fetch result object
 * @async
 * */
export default async function fetchServer(endpoint, options) {
    const {method,body,cookies} = options
    const res = await fetch(`${SERVER_HOST}${endpoint}`, {
        method,
        headers:
            method == "GET" ? null : { "Content-Type": "application/json" },
        credentials: cookies ? "include" : "omit",
        body: JSON.stringify(body)
    });
    const result = await res.json()
    return {
        code: res.status,
        result
    }
}
