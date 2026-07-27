function changeImage(img) {
    const mainImage = document.getElementById("mainImage");

    if (mainImage) {
        mainImage.src = img.src;
    }

    document.querySelectorAll(".thumbnail").forEach(t => {
        t.classList.remove("active");
    });

    img.classList.add("active");
}
