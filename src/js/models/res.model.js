export default class Res {
    constructor({ code, result: { message, data } }) {
        this.code = code;
        this.result = { message, data };
    }
}
