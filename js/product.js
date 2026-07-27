"use strict";


/* =========================================================
   PRODUCT IMAGE GALLERY
========================================================= */

const mainProductImage = document.getElementById("mainProductImage");
const thumbnailButtons = document.querySelectorAll(".thumbnail-button");

thumbnailButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const newImage = button.dataset.image;
        const newAlt = button.dataset.alt;

        if (!newImage || !mainProductImage) {
            return;
        }

        thumbnailButtons.forEach((thumbnail) => {
            thumbnail.classList.remove("active");
        });

        button.classList.add("active");

        mainProductImage.classList.add("changing");

        window.setTimeout(() => {
            mainProductImage.src = newImage;
            mainProductImage.alt = newAlt || "CyRamage product image";
            mainProductImage.classList.remove("changing");
        }, 160);
    });
});


/* =========================================================
   IMAGE LIGHTBOX
========================================================= */

const imageExpandButton = document.getElementById("imageExpandButton");
const imageLightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

function openLightbox() {
    if (
        !imageLightbox ||
        !lightboxImage ||
        !mainProductImage
    ) {
        return;
    }

    lightboxImage.src = mainProductImage.src;
    lightboxImage.alt = mainProductImage.alt;

    imageLightbox.classList.add("active");
    imageLightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lightbox-open");
}

function closeLightbox() {
    if (!imageLightbox) {
        return;
    }

    imageLightbox.classList.remove("active");
    imageLightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lightbox-open");
}

if (imageExpandButton) {
    imageExpandButton.addEventListener("click", openLightbox);
}

if (mainProductImage) {
    mainProductImage.addEventListener("click", openLightbox);
}

if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
}

if (imageLightbox) {
    imageLightbox.addEventListener("click", (event) => {
        if (event.target === imageLightbox) {
            closeLightbox();
        }
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeLightbox();
    }
});


/* =========================================================
   QUANTITY SELECTOR
========================================================= */

const quantityInput = document.getElementById("quantity");
const decreaseQuantity = document.getElementById("decreaseQuantity");
const increaseQuantity = document.getElementById("increaseQuantity");

function normaliseQuantity() {
    if (!quantityInput) {
        return 1;
    }

    const minimum = Number(quantityInput.min) || 1;
    const maximum = Number(quantityInput.max) || 10;

    let quantity = Number.parseInt(quantityInput.value, 10);

    if (Number.isNaN(quantity)) {
        quantity = minimum;
    }

    quantity = Math.min(Math.max(quantity, minimum), maximum);
    quantityInput.value = String(quantity);

    return quantity;
}

if (decreaseQuantity) {
    decreaseQuantity.addEventListener("click", () => {
        const currentQuantity = normaliseQuantity();

        quantityInput.value = String(
            Math.max(currentQuantity - 1, Number(quantityInput.min) || 1)
        );
    });
}

if (increaseQuantity) {
    increaseQuantity.addEventListener("click", () => {
        const currentQuantity = normaliseQuantity();

        quantityInput.value = String(
            Math.min(currentQuantity + 1, Number(quantityInput.max) || 10)
        );
    });
}

if (quantityInput) {
    quantityInput.addEventListener("change", normaliseQuantity);
}


/* =========================================================
   SIMPLE CART STORAGE
========================================================= */

const addToCartButton = document.getElementById("addToCartButton");
const buyNowButton = document.getElementById("buyNowButton");
const cartCount = document.getElementById("cartCount");
const cartMessage = document.getElementById("cartMessage");

const product = {
    id: "cyramage-bath-gel-200ml",
    name: "CyRamage Signature Bath Gel",
    price: 10.99,
    image: "images/bath-gel-front.png",
    page: "bath-gel.html",
    size: "200 ml"
};

function getCart() {
    try {
        const savedCart = localStorage.getItem("cyramageCart");

        if (!savedCart) {
            return [];
        }

        const parsedCart = JSON.parse(savedCart);

        return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
        console.error("Unable to read cart:", error);
        return [];
    }
}

function saveCart(cart) {
    try {
        localStorage.setItem("cyramageCart", JSON.stringify(cart));
        updateCartCount();
    } catch (error) {
        console.error("Unable to save cart:", error);
    }
}

function updateCartCount() {
    if (!cartCount) {
        return;
    }

    const cart = getCart();

    const totalQuantity = cart.reduce((total, item) => {
        return total + Number(item.quantity || 0);
    }, 0);

    cartCount.textContent = String(totalQuantity);
}

function addProductToCart(quantity) {
    const cart = getCart();

    const existingItem = cart.find((item) => {
        return item.id === product.id;
    });

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity
        });
    }

    saveCart(cart);

    if (cartMessage) {
        cartMessage.textContent =
            `${quantity} × ${product.name} added to your basket.`;
    }
}

if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
        const quantity = normaliseQuantity();
        addProductToCart(quantity);
    });
}

if (buyNowButton) {
    buyNowButton.addEventListener("click", () => {
        const quantity = normaliseQuantity();
        addProductToCart(quantity);

        window.location.href = "cart.html";
    });
}

updateCartCount();


/* =========================================================
   MOBILE MENU
========================================================= */

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mainNavigation = document.getElementById("mainNavigation");

if (mobileMenuButton && mainNavigation) {
    mobileMenuButton.addEventListener("click", () => {
        const isOpen = mainNavigation.classList.toggle("open");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );
    });
}


/* =========================================================
   NEWSLETTER PLACEHOLDER
========================================================= */

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (newsletterMessage) {
            newsletterMessage.textContent =
                "Thank you for joining the CyRamage newsletter.";
        }

        newsletterForm.reset();
    });
}
/* ==========================
   PRODUCT IMAGE ARROWS
========================== */

const images = [
    "images/bath-gel-front.png",
    "images/bath-gel-back.png",
    "images/bath-gel-pouring.png",
    "images/bath-gel-closeup.png",
    "images/bath-gel-lather.png",
    "images/bath-gel-lifestyle.png"
];

let currentImage = 0;

const prevButton = document.getElementById("prevImage");
const nextButton = document.getElementById("nextImage");

function showImage(index) {
    if (!mainProductImage) return;

    currentImage = (index + images.length) % images.length;
    mainProductImage.src = images[currentImage];
}

if (prevButton) {
    prevButton.addEventListener("click", () => {
        showImage(currentImage - 1);
    });
}

if (nextButton) {
    nextButton.addEventListener("click", () => {
        showImage(currentImage + 1);
    });
}
