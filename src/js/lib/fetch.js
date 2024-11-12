import { SERVER_HOST } from "../config.js";
import Res from "../models/res.model.js";

/**
 * Make a request to server
 * @param {string} endpoint - Endpoint url
 * @param {Object} options
 * @param {string} options.method - Request method
 * @param {boolean} options.cookies - Send cookies?
 * @param {*} options.body - Request body
 * @return {Promise<Res>} Fetch result object
 * @async
 * */
export default async function fetchServer(endpoint, options) {
    const { method, body, cookies } = options;
    const reqBody = body instanceof FormData ? body : JSON.stringify(body);
    const res = await fetch(`${SERVER_HOST}${endpoint}`, {
        method,
        headers:
            method == "GET" || body instanceof FormData
                ? undefined
                : { "Content-Type": "application/json" },
        credentials: cookies ? "include" : "omit",
        body: method == "GET" ? undefined : reqBody,
    });
    const result = await res.json();
    return new Res({ code: res.status, result });
}
