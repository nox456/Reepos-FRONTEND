import showErrorModal from "./lib/errorModal.js";
import User from "./models/user.model.js";

const res = await User.isAuthenticated()

if (res.code != 200) {
    showErrorModal("Usuario no autorizado!", {
        message: "Iniciar Sesión",
        href: "../pages/signin.html",
    });
}

const user = res.result.data
export default user
