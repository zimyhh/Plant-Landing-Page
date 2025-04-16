document.addEventListener("DOMContentLoaded", () => {
    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = document.querySelector(".dropdown-menu");
    const dropdownLink = document.querySelector(".dropdown > a");
    let isMenuVisible = false;

    // Предотвращаем стандартное поведение ссылки
    dropdownLink.addEventListener("click", (event) => {
        event.preventDefault();
        dropdownLink.classList.toggle("active");

        if (isMenuVisible) {
            dropdownMenu.style.opacity = "0"; // Прозрачность 0
            setTimeout(() => {
                dropdownMenu.style.display = "none"; // Скрываем меню после анимации
            }, 400); // Время совпадает с transition в CSS
        } else {
            dropdownMenu.style.display = "block"; // Показываем меню
            setTimeout(() => {
                dropdownMenu.style.opacity = "1"; // Прозрачность 1
            }, 10); // Небольшая задержка для плавного появления
        }
        isMenuVisible = !isMenuVisible; // Переключаем состояние
    });

    // Динамическое создание элементов меню
    for (let i = 1; i <= 5; i++) {
        const link = document.createElement("a");
        link.href = `#item${i}`;
        link.className = "dropdown-link";
        link.textContent = `Item ${i}`;
        dropdownMenu.appendChild(link);
    }

    // Динамическое создание карточек продуктов
    const productGrid = document.querySelector(".product-grid");
    const products = [
        { name: "Peperomia Ginny", price: "$25" },
        { name: "Large Majesty Palm", price: "$52" },
        { name: "Pet Friendly Plant", price: "$30" },
        { name: "Duo Friendly Plant", price: "$40" },
        { name: "Bird’s Nest Fern", price: "$45" },
    ];

    products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="primary">Buy</button>
        `;
        productGrid.appendChild(card);
    });
});