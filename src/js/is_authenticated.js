import fetchServer from "./lib/fetch.js";
import showErrorModal from "./lib/errorModal.js";

const res = await fetchServer("/auth/is-authenticated", {
    method: "GET",
    cookies: true,
});

if (res.code != 200) {
    showErrorModal("Usuario no autorizado!", {
        message: "Iniciar Sesión",
        href: "../pages/signin.html",
    });
}
