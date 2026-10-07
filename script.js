const whatsappNumber = "6285696925838";

const buyButtons = document.querySelectorAll(".buy-button");

buyButtons.forEach((button) => {
    button.addEventListener("click", () => {

        const rank = button.dataset.rank;
        const price = button.dataset.price;

        const message =
            `Min, mau beli rank ${rank} harga ${price}/bulan`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(
            whatsappURL,
            "_blank",
            "noopener,noreferrer"
        );
    });
});