import headerSearch from "./lib/headerSearch.js";
import userImage from "./lib/userImage.js";
import fetchServer from "./lib/fetch.js";
import renderUsers from "./lib/renderUsers.js";
import showErrorModal from "./lib/errorModal.js";
import filterUsers from "./lib/filterUsers.js";

headerSearch();
userImage();

const urlParam = new URLSearchParams(
    location.href.slice(location.href.indexOf("?")),
);

const $section = document.querySelector("main > section");

const res = await fetchServer(
    `/users/search?username=${urlParam.get("username")}`,
    {
        method: "GET",
    },
);

$section.innerHTML = "";
if (res.code == 200) {
    renderUsers(res.result.data, $section);
    filterUsers(res.result.data, $section);
} else if (res.code == 404) {
    const $message = document.createElement("p");
    $message.innerText = `No se encontraron usuarios con el nombre: ${urlParam.get("username")}`;
    $section.appendChild($message);
} else {
    showErrorModal(res.result.message, {
        href: "../pages/dashboard.html",
        message: "Dashboard",
    });
}
