document.addEventListener("DOMContentLoaded", () => {

    const sliders = document.querySelectorAll(".ba-slider");

    sliders.forEach((slider) => {

        const range = slider.querySelector('input[type="range"]');
        const before = slider.querySelector(".image-before");
        const line = slider.querySelector(".slider-line");
        const button = slider.querySelector(".slider-button");

        function updateSlider() {

            const value = range.value;

            before.style.width = `${value}%`;

            line.style.left = `${value}%`;

            button.style.left = `${value}%`;
        }

        range.addEventListener("input", updateSlider);

        updateSlider();
    });

});