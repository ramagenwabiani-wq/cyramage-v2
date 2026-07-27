document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.getElementById("mobileMenuButton");
    const navigation = document.getElementById("mainNavigation");

    if (menuButton && navigation) {

        menuButton.addEventListener("click", function () {

            navigation.classList.toggle("open");

            const expanded =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute(
                "aria-expanded",
                !expanded
            );

        });

    }

});
